import { motion } from 'framer-motion';
import { Building2, Users, Package, Globe, Award, TrendingUp } from 'lucide-react';
import { companyInfo } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

export default function CompanyStats() {
  const { t } = useLocale();

  const stats = [
    { icon: Building2, value: companyInfo.established.toString(), label: t['established year'], description: t['year founded short'] },
    { icon: Users, value: companyInfo.employees, label: t.employees, description: t['team size short'] },
    { icon: Package, value: t['annual output hero'] === '年产能' ? '10万+' : '100K+', label: t['annual output short'], description: t['production scale'] },
    { icon: Globe, value: '50+', label: t['countries short'], description: t['global markets short'] },
    { icon: Award, value: '3', label: t['certifications short'], description: 'CE/UL/EN', suffix: '+' },
    { icon: TrendingUp, value: '95%', label: t['response rate short'], description: t['customer service'] },
  ];

  return (
    <section className='py-24 bg-gradient-to-b from-slate-900/50 to-slate-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <span className='inline-block px-4 py-1.5 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full mb-4'>
            {t['why choose us']}
          </span>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4'>
            {t['why choose yuehaitong']} <span className='bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'>YUEHAITONG</span>?
          </h2>
          <p className='text-white/60 max-w-2xl mx-auto text-lg'>
            {t['stats description long']}
          </p>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className='bg-white/5 backdrop-blur-sm rounded-3xl p-6 text-center group border border-white/10 hover:border-blue-500/30 transition-all'
            >
              <div className='p-3 bg-blue-500/20 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform'>
                <stat.icon className='w-6 h-6 text-blue-400' />
              </div>
              <div className='text-2xl lg:text-3xl font-bold text-white mb-1'>
                {stat.value}
                {stat.suffix || ''}
              </div>
              <div className='text-sm font-medium text-white/70 mb-1'>{stat.label}</div>
              <div className='text-xs text-white/50'>{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
