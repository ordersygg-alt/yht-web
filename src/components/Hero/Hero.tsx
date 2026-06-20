import { motion } from 'framer-motion';
import { ArrowRight, Zap, Battery, Shield, Cpu, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 gradient-bg'>
        {/* Animated orbs */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse' />
        <div className='absolute top-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
        <div className='absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div className='absolute inset-0 opacity-10' style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className='relative max-w-7xl mx-auto px-6 py-32 md:py-40'>
        <div className='text-center max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8'
          >
            <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium'>
              <span className='w-2 h-2 bg-blue-400 rounded-full animate-pulse' />
              {t['professional manufacturer']}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight'
          >
            <span className='text-white'>{t['drive your']}</span>
            <br />
            <span className='bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent'>
              {t['green journey']}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto'
          >
            {t.slogan}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4'
          >
            <Link
              to='/products'
              className='btn-vp btn-vp-primary flex items-center gap-2 text-base px-8 py-3.5'
            >
              {t['explore products']}
              <ArrowRight className='w-5 h-5' />
            </Link>
            <Link
              to='/about'
              className='px-8 py-3.5 rounded-xl font-medium text-white/80 hover:text-white transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
            >
              {t['learn more']}
            </Link>
          </motion.div>
        </div>

        {/* Stats section with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto'
        >
          {[
            { icon: Zap, label: '100K+', desc: t['annual output hero'], color: 'from-blue-400 to-blue-600' },
            { icon: Award, label: '12+', desc: t['years experience'], color: 'from-indigo-400 to-indigo-600' },
            { icon: Globe, label: '50+', desc: t.countries, color: 'from-purple-400 to-purple-600' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity' />
              <div className='relative glass rounded-2xl p-6 text-center'>
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className='w-7 h-7 text-white' />
                </div>
                <div className='text-3xl font-bold text-white mb-1'>{item.label}</div>
                <div className='text-sm text-white/60'>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech features strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='mt-20 flex flex-wrap justify-center gap-8 text-white/50 text-sm'
        >
          {[
            { icon: Cpu, key: 'smart bms' },
            { icon: Battery, key: '48v battery' },
            { icon: Shield, key: 'ce certified badge' },
            { icon: Zap, key: '500w motor' },
          ].map((item) => (
            <div key={item.key} className='flex items-center gap-2'>
              <item.icon className='w-4 h-4 text-blue-400' />
              <span>{t[item.key]}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2'
      >
        <div className='w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2'>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className='w-1.5 h-1.5 rounded-full bg-white/60'
          />
        </div>
      </motion.div>
    </section>
  );
}
