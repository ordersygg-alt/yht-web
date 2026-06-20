import { useState } from 'react';
import { motion } from 'framer-motion';
import { Seo } from '@/components/Seo/Seo';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductModal from '@/components/ProductModal/ProductModal';
import { products, categories } from '@/data/products';
import type { Product } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { t, language } = useLocale();

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  return (<div className="min-h-screen">
    <Seo path="/products" />
    
    {/* Header section */}
    <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4'>
            {t.products}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.products}</h1>
          <p className="text-white/60 max-w-2xl mx-auto">{t['explore products']}</p>
        </motion.div>
      </div>
    </section>

    {/* Category filters */}
    <section className="py-8 bg-vp-bg border-b border-vp-divider sticky top-16 z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)} 
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-vp-bg-alt text-vp-c-text-mute hover:bg-vp-control hover:text-vp-c-text border border-vp-divider'
              }`}
            >
              {language === 'zh' ? cat.nameCN : cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* Products grid */}
    <section className="py-16 bg-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        {filteredProducts.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-vp-c-text-mute">
                {t['showing products']} {filteredProducts.length} {t['products count']}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.03 }}
                >
                  <ProductCard product={product} onClick={() => setSelectedProduct(product)}/>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-vp-c-text-mute text-lg">{t['no products found']}</p>
          </div>
        )}
      </div>
    </section>

    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>
  </div>);
}
