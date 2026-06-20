import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { locale, type LocaleType, type LocaleKeys } from '@/data/locale';

interface LocaleContextValue {
  language: LocaleType;
  t: Record<LocaleKeys, string>;
  setLanguage: (lang: LocaleType) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LocaleType>('en');

  const t = useMemo(() => {
    return locale[language] as Record<LocaleKeys, string>;
  }, [language]);

  const handleSetLanguage = useCallback((lang: LocaleType) => {
    setLanguage(lang);
  }, []);

  const value = useMemo(() => ({
    language,
    t,
    setLanguage: handleSetLanguage,
  }), [language, t, handleSetLanguage]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return {
    t: context.t,
    language: context.language,
    setLanguage: context.setLanguage,
  };
}
