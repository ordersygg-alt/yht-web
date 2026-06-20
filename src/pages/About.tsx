import { motion } from 'framer-motion';
import { Award, Factory, Truck, Zap } from 'lucide-react';
import { Seo } from '@/components/Seo/Seo';
import { companyInfo } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

export default function About() {
  const { t } = useLocale();

  const strengths = [
    { icon: Factory, title: t['advanced manufacturing'], description: t['automated production'], color: 'from-blue-500 to-blue-700' },
    { icon: Award, title: t['quality assurance'], description: t['ce certified'], color: 'from-indigo-500 to-indigo-700' },
    { icon: Truck, title: t['global shipping'], description: t['global logistics'], color: 'from-purple-500 to-purple-700' },
    { icon: Zap, title: t['efficient motor'], description: t['high performance motors'], color: 'from-cyan-500 to-cyan-700' },
  ];

  return (<div className="min-h-screen">
    <Seo path="/about" />
    
    {/* Header section */}
    <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4'>
            {t.about}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.about}</h1>
          <p className="text-white/60 max-w-2xl mx-auto">{t.description}</p>
        </motion.div>
      </div>
    </section>

    {/* Main content */}
    <section className="py-20 bg-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column - Company info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t['company profile']}</h2>
            <div className="space-y-6 text-vp-c-text-mute leading-relaxed">
              <p>{t.description}</p>
              <p className="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t.slogan}</p>
            </div>
            
            {/* Company stats */}
            <div className="mt-8 p-6 rounded-2xl bg-vp-bg-alt border border-vp-divider">
              <h3 className="font-semibold mb-4">{t['company info']}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t['year founded']}:</span>
                  <span className="font-medium">{companyInfo.established}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t['team size']}:</span>
                  <span className="font-medium">{t['employees value']}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t['business type']}:</span>
                  <span className="font-medium">{t['business type value']}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t['annual revenue']}:</span>
                  <span className="font-medium">{t['annual revenue value']}</span>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">{t['certifications title']}</h3>
              <div className="flex flex-wrap gap-3">
                {companyInfo.certifications.map((cert) => (
                  <span key={cert} className="badge badge-tip">{cert}</span>
                ))}
              </div>
            </div>
            
            {/* Service stats */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
              <h3 className="font-semibold mb-4">{t['service stats']}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{companyInfo.responseTime}</div>
                  <div className="text-xs text-vp-c-text-mute mt-1">{t['response time']}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{companyInfo.responseRate}</div>
                  <div className="text-xs text-vp-c-text-mute mt-1">{t['response rate']}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Core strengths */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="text-2xl font-bold">{t['core strengths']}</h3>
            <div className="space-y-6">
              {strengths.map((item) => (
                <div key={item.title} className="flex gap-5 p-5 rounded-2xl bg-vp-bg-alt border border-vp-divider hover:border-blue-500/30 transition-colors">
                  <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white"/>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-vp-c-text-mute">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Global markets */}
    <section className="py-20 bg-gradient-to-b from-vp-bg-alt to-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4'>
            {t['global markets']}
          </div>
          <h2 className="text-3xl font-bold mb-4">{t['global markets']}</h2>
          <p className="text-vp-c-text-mute">{t['global markets description']}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {companyInfo.markets.map((market, index) => (
            <motion.div 
              key={market.name} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card-vp p-5 text-center group hover:border-blue-500/30"
            >
              <div className="text-3xl mb-3">{market.name === 'North America' ? '🌎' : market.name === 'South America' ? '🌎' : market.name === 'Europe' ? '🇪🇺' : market.name === 'Southeast Asia' ? '🌏' : market.name === 'Middle East' ? '🏜️' : '🌍'}</div>
              <div className="text-sm font-medium group-hover:text-blue-600 transition-colors">{t[`market ${market.name.toLowerCase().replace(/\s+/g, ' ')}` as keyof typeof t] || market.name}</div>
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">{market.percentage}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>);
}
