import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Zap, Battery, Gauge, MapPin, Weight, Ruler, ArrowRight, CircleDot, Box, GitFork, Cog, Circle, Wrench } from 'lucide-react';
import type { Product } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';
import { translateProductSpecsReverse } from '@/data/specTranslator';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const specIcons: Record<string, typeof Zap> = {
  motor: Zap,
  battery: Battery,
  speed: Gauge,
  range: MapPin,
  weight: Weight,
  size: Ruler,
  frame: Box,
  fork: GitFork,
  brake: CircleDot,
  derailleur: Cog,
  tire: Circle,
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, language } = useLocale();

  const specLabels: Record<string, string> = {
    motor: t.motor,
    battery: t.battery,
    speed: t['max speed'],
    range: t.range,
    weight: t.weight,
    size: t.size,
    frame: t.frame,
    fork: t.fork,
    brake: t.brake,
    derailleur: t.derailleur,
    tire: t.tire,
  };

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className='bg-vp-bg-elv rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-blue-900/20 border border-vp-divider'
        >
          {/* Header */}
          <div className='flex items-center justify-between p-5 border-b border-vp-divider bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900'>
            <div>
              <h2 className='font-bold text-xl text-vp-c-text'>{language === 'zh' ? product.nameCN : product.name}</h2>
              <p className='text-sm text-vp-c-text-mute mt-0.5'>{language === 'zh' ? product.name : product.nameCN}</p>
            </div>
            <button
              onClick={onClose}
              className='p-2.5 rounded-xl hover:bg-vp-control transition-colors text-vp-c-text-mute hover:text-vp-c-text'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {/* Image section */}
            <div className='relative aspect-square lg:aspect-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className='w-full h-full object-cover'
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className='absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110'
                  >
                    <ChevronLeft className='w-5 h-5 text-slate-700' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110'
                  >
                    <ChevronRight className='w-5 h-5 text-slate-700' />
                  </button>
                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-blue-500 w-6' : 'bg-white/60 hover:bg-white'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details section */}
            <div className='p-6 lg:p-8 overflow-y-auto max-h-[60vh]'>
              {product.price && (
                <div className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4'>
                  {product.price}
                </div>
              )}
              
              <p className='text-vp-c-text-mute mb-6 leading-relaxed'>{language === 'zh' && product.descriptionCN ? product.descriptionCN : product.description}</p>

              <h3 className='font-semibold text-lg mb-4 flex items-center gap-2'>
                <span className='w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full' />
                {t.specifications}
              </h3>
              
              <div className='grid grid-cols-1 gap-3'>
                {(Object.entries(language === 'zh' ? (product.specsCN || translateProductSpecsReverse(product.specs)) : (product.specsEN || product.specs)) as [string, string][]).map(([key, value]) => {
                  if (!value) return null;
                  const Icon = specIcons[key] || Wrench;
                  return (
                    <div key={key} className='flex items-center gap-3 p-3 rounded-xl bg-vp-bg-alt border border-vp-divider hover:border-blue-500/30 transition-colors'>
                      <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center'>
                        <Icon className='w-5 h-5 text-blue-600' />
                      </div>
                      <div className='flex-1'>
                        <div className='text-xs text-gray-500'>{specLabels[key] || key}</div>
                        <div className='font-medium text-vp-c-text'>{value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                to='/contact'
                onClick={onClose}
                className='mt-8 btn-vp btn-vp-primary w-full text-center gap-2'
              >
                {t['contact for quote']}
                <ArrowRight className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
