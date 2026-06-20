import { motion } from 'framer-motion';
import { Grid3X3, Mountain, Truck, Layers, Building2, Gem, Zap, Flame, Sparkles, Circle, Wrench, Bike, Package } from 'lucide-react';
import { categories } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const iconMap: Record<string, typeof Grid3X3> = {
  Grid3X3,
  Mountain,
  Tricycle: Mountain,
  Truck,
  Layers,
  Building2,
  Gem,
  Zap,
  Flame,
  Sparkles,
  Circle,
  Wrench,
  Bike,
  Package,
};

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { language } = useLocale();

  return (
    <div className='flex flex-wrap justify-center gap-3 mb-12'>
      {categories.map((category, index) => {
        const Icon = iconMap[category.icon] || Grid3X3;
        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-5 py-3 rounded-2xl font-medium flex items-center gap-2 transition-all duration-300 ${
              activeCategory === category.id 
                ? 'btn-primary' 
                : 'btn-secondary hover:border-accent/50'
            }`}
          >
            <Icon className='w-5 h-5' />
            <span className='hidden sm:inline'>{language === 'zh' ? category.nameCN : category.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
