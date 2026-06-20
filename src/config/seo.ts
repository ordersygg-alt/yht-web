export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  canonical?: string;
}

export const defaultSeo: SeoConfig = {
  title: 'YUEHAITONG - Electric Bicycle Manufacturer | 电动自行车制造商',
  description: 'Tianjin Yuehaitong Bicycle Co., Ltd. - Professional electric bicycle, tricycle, cargo bike manufacturer with CE, EN15194, UL certifications. Export to 50+ countries.',
  keywords: [
    'electric bicycle',
    'electric bike',
    'e-bike',
    'electric tricycle',
    'electric cargo bike',
    'electric mountain bike',
    'carbon fiber bicycle',
    'electric scooter',
    'bicycle manufacturer',
    'China bicycle factory',
    'CE certified e-bike',
    '电动自行车',
    '电动三轮车',
    '电动山地车',
    '自行车制造商',
    '天津自行车',
  ],
  image: '/',
  type: 'website',
  author: 'Yuehaitong Bicycle',
};

export const pageSeo: Record<string, Partial<SeoConfig>> = {
  '/': {
    title: 'YUEHAITONG - Professional Electric Bicycle Manufacturer | 电动自行车制造商',
    description: 'Tianjin Yuehaitong Bicycle Co., Ltd. - Leading electric bicycle manufacturer in China. Specializing in e-mountain bikes, tricycles, cargo bikes with global export.',
  },
  '/products': {
    title: 'Electric Bicycle Products | 电动自行车产品 - YUEHAITONG',
    description: 'Explore our complete range of electric bicycles: mountain bikes, tricycles, cargo bikes, folding bikes, city bikes, carbon fiber bikes, and scooters.',
    keywords: [
      'electric mountain bike',
      'electric tricycle',
      'electric cargo bike',
      'folding electric bike',
      'city electric bike',
      'carbon fiber e-bike',
      'electric scooter',
      'electric bicycle products',
      '电动山地车',
      '电动三轮车',
      '电动货运车',
      '电动折叠车',
      '电动城市车',
      '碳纤维自行车',
    ],
  },
  '/about': {
    title: 'About YUEHAITONG | 关于我们 - Electric Bicycle Manufacturer',
    description: 'Learn about Tianjin Yuehaitong Bicycle Co., Ltd. - 12+ years experience in electric bicycle manufacturing with advanced production facilities.',
    keywords: [
      'about yuehaitong',
      'bicycle company',
      'manufacturer profile',
      'company history',
      'China bicycle manufacturer',
      '关于跃海通',
      '公司简介',
      '自行车工厂',
    ],
  },
  '/contact': {
    title: 'Contact YUEHAITONG | 联系我们 - Electric Bicycle Supplier',
    description: 'Contact Tianjin Yuehaitong Bicycle Co., Ltd. for inquiries, quotes, or partnership opportunities. Professional e-bike supplier.',
    keywords: [
      'contact us',
      'bicycle supplier',
      'e-bike quote',
      'sales inquiry',
      'business partnership',
      '联系我们',
      '自行车供应商',
      '询价',
      '商务合作',
    ],
  },
};
