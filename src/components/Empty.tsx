import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/useLocale';

export default function Empty() {
  const { t } = useLocale();
  return (
    <div className={cn('flex h-full items-center justify-center')}>{t.empty || 'Empty'}</div>
  )
}
