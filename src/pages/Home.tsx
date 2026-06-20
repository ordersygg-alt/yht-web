import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Battery, Shield, Factory, Award, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo/Seo';
import Hero from '@/components/Hero/Hero';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductModal from '@/components/ProductModal/ProductModal';
import { products, companyInfo } from '@/data/products';
import type { Product } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

const featuredProducts = products.slice(0, 6);

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { t, language } = useLocale();

  const features = [
    { icon: Factory, title: t['advanced manufacturing'], details: t['automated production'], color: 'from-blue-500 to-blue-700' },
    { icon: Award, title: t['international certifications'], details: t['ce certified'], color: 'from-indigo-500 to-indigo-700' },
    { icon: Truck, title: t['global shipping'], details: t['global logistics'], color: 'from-purple-500 to-purple-700' },
    { icon: Zap, title: t['efficient motor'], details: t['high performance motors'], color: 'from-cyan-500 to-cyan-700' },
    { icon: Battery, title: t['long range'], details: t['long range battery'], color: 'from-emerald-500 to-emerald-700' },
    { icon: Shield, title: t['quality assurance'], details: t['multi layer safety'], color: 'from-teal-500 to-teal-700' },
  ];

  return (<div className="min-h-screen">
    <Seo path="/" />
    <Hero />

    {/* Featured Products Section */}
    <section className="py-24 bg-vp-bg">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4'>
            {t['featured products']}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t['explore featured products']}</h2>
          <p className="text-vp-c-text-mute max-w-2xl mx-auto">{t['contact us today']}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (<motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.1 }}>
            <ProductCard product={product} onClick={() => setSelectedProduct(product)}/>
          </motion.div>))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
          <Link to="/products" className="btn-vp btn-vp-primary inline-flex items-center gap-2 px-8 py-3.5">
            {t['view all products']}
            <ArrowRight className="w-5 h-5"/>
          </Link>
        </motion.div>
        
      </div>
    </section>

    {/* Features Section */}
    <section className="py-24 bg-gradient-to-b from-vp-bg-alt to-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4'>
            {t['why choose yuehaitong']}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t['why choose yuehaitong']}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="feature-card group">
            <div className={`feature-icon bg-gradient-to-br ${feature.color}`}>
              <feature.icon className="w-7 h-7 text-white"/>
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
            <p className="text-sm text-vp-c-text-mute">{feature.details}</p>
          </motion.div>))}
        </div>
      </div>
    </section>

    {/* About Section */}
    <section className="py-24 bg-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4'>
              {t.about}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{language === 'zh' ? companyInfo.nameCN : companyInfo.name}</h2>
            <p className="text-vp-c-text-mute mb-6 leading-relaxed">{t.description}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {companyInfo.certifications.map((cert) => (<span key={cert} className="badge badge-tip">{cert}</span>))}
            </div>
            <Link to="/about" className="btn-vp btn-vp-primary inline-flex items-center gap-2 px-8 py-3.5">
              {t['learn more']}
              <ArrowRight className="w-5 h-5"/>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-vp p-8">
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: t.established, value: companyInfo.established, suffix: '' },
                { label: t['annual output'], value: '100K+', suffix: '' },
                { label: t.countries, value: '50+', suffix: '' },
                { label: t['certifications count'], value: '3+', suffix: '' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{item.value}{item.suffix}</div>
                  <div className="text-sm text-vp-c-text-mute">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>
  </div>);
}
