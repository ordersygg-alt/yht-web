import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLocale();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'CH' },
  ];

  return (
    <div className='relative'>
      <button
        className='flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors'
      >
        <Globe className='w-5 h-5' />
        <span className='font-medium'>{languages.find(l => l.code === language)?.label}</span>
      </button>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='absolute right-0 top-full mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50'
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'zh')}
            className={language === lang.code ? 'w-full px-4 py-2 text-left text-sm bg-primary/10 text-primary font-medium' : 'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'}
          >
            {lang.label}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
