import { motion } from 'framer-motion';
import { Eye, Zap, Battery, Gauge, ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';
import { translateProductSpecsReverse } from '@/data/specTranslator';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { t, language } = useLocale();

  const currentSpecs = language === 'zh'
    ? (product.specsCN || translateProductSpecsReverse(product.specs))
    : (product.specsEN || product.specs);

  const quickSpecs = [
    currentSpecs.motor && { icon: Zap, label: currentSpecs.motor },
    currentSpecs.battery && { icon: Battery, label: currentSpecs.battery },
    currentSpecs.speed && { icon: Gauge, label: currentSpecs.speed },
  ].filter(Boolean) as { icon: typeof Zap; label: string }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className='group relative bg-vp-bg-elv rounded-2xl overflow-hidden border border-vp-divider cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-500/30'
    >
      {/* Image container with overlay effects */}
      <div className='relative aspect-[4/3] overflow-hidden'>
        <img
          src={product.images[0]}
          alt={product.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
        />
        
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
        
        {/* Top badges */}
        <div className='absolute top-4 left-4 flex gap-2'>
          {product.price && (
            <span className='px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-semibold rounded-lg shadow-lg'>
              {product.price}
            </span>
          )}
        </div>

        {/* View details button - appears on hover */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <div className='flex gap-3'>
            <button className='px-5 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl'>
              <Eye className='w-4 h-4' />
              {t['view details']}
            </button>
          </div>
        </div>

        {/* Bottom specs strip */}
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          <div className='flex flex-wrap gap-2'>
            {quickSpecs.slice(0, 3).map((spec) => (
              <span
                key={spec.label}
                className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium rounded-lg border border-white/20'
              >
                <spec.icon className='w-3.5 h-3.5 text-blue-400' />
                {spec.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className='p-5'>
        <div className='flex items-start justify-between gap-3 mb-2'>
          <div>
            <h3 className='font-bold text-lg text-vp-c-text group-hover:text-blue-600 transition-colors line-clamp-1'>
              {language === 'zh' ? product.nameCN : product.name}
            </h3>
            <p className='text-sm text-vp-c-text-mute line-clamp-1 mt-0.5'>
              {language === 'zh' ? product.name : product.nameCN}
            </p>
          </div>
          <div className='shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300'>
            <ArrowRight className='w-4 h-4 text-blue-500 group-hover:text-white transition-colors' />
          </div>
        </div>
        
        <p className='text-sm text-gray-500 line-clamp-2 mt-3 leading-relaxed'>
        {language === 'zh' && product.descriptionCN ? product.descriptionCN : product.description}
      </p>
      </div>
    </motion.div>
  );
}
