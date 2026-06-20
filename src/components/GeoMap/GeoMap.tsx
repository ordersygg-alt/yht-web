import { MapPin } from 'lucide-react';
import { companyInfo } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

export default function GeoMap() {
  const { t, language } = useLocale();

  return (
    <div className='card-vp overflow-hidden'>
      <div className='relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'>
        {/* Stylized map background */}
        <div className='absolute inset-0 opacity-30'>
          <svg viewBox='0 0 100 100' className='w-full h-full' preserveAspectRatio='none'>
            <defs>
              <pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'>
                <path d='M 10 0 L 0 0 0 10' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-slate-400'/>
              </pattern>
            </defs>
            <rect width='100' height='100' fill='url(#grid)'/>
          </svg>
        </div>
        
        {/* Stylized location marker */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative'>
            <div className='absolute inset-0 bg-blue-500/30 rounded-full blur-2xl animate-pulse' />
            <div className='relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl'>
              <MapPin className='w-10 h-10 text-white' />
            </div>
            {/* Pulse rings */}
            <div className='absolute inset-0 rounded-full border-2 border-blue-500/50 animate-ping' />
            <div className='absolute inset-0 rounded-full border border-blue-500/30 animate-ping' style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
        
        {/* Info card */}
        <div className='absolute bottom-4 left-4 right-4'>
          <div className='bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20'>
            <div className='flex items-start gap-3'>
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0'>
                <MapPin className='w-5 h-5 text-white' />
              </div>
              <div>
                <h3 className='font-semibold text-sm mb-0.5'>{t['company location']}</h3>
                <p className='text-xs text-vp-c-text-mute'>{language === 'zh' ? companyInfo.addressCN : companyInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
