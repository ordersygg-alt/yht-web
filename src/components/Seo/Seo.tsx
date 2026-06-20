import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { SeoConfig } from '@/config/seo';
import { defaultSeo, pageSeo } from '@/config/seo';
import { companyInfo, type Product } from '@/data/products';

interface SeoProps { 
  path?: string; 
  config?: Partial<SeoConfig>;
  language?: string;
  geoTarget?: string;
}

const supportedLanguages = [
  { code: 'en', hreflang: 'en', name: 'English', market: 'International' },
  { code: 'zh', hreflang: 'zh', name: 'China', market: 'China' },
  { code: 'es', hreflang: 'es-ES', name: 'Español', market: 'Latin America' },
  { code: 'de', hreflang: 'de', name: 'Deutsch', market: 'Germany' },
  { code: 'fr', hreflang: 'fr', name: 'Français', market: 'France' },
];

export function Seo({ path = '/', config, language = 'en', geoTarget }: SeoProps) {
  const pageConfig = pageSeo[path] || {};
  const seo: SeoConfig = { ...defaultSeo, ...pageConfig, ...config };
  
  return (<Helmet>
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords.join(', ')} />
    <meta name="author" content={seo.author} />
    <meta name="theme-color" content="#3eaf7c" />
    
    {/* GEO Targeting */}
    {geoTarget && <meta name="geo.region" content={geoTarget} />}
    <meta name="geo.placename" content="Tianjin, China" />
    
    {/* Open Graph */}
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:type" content={seo.type} />
    <meta property="og:locale" content={language === 'en' ? 'en_US' : `${language}_${language.toUpperCase()}`} />
    {seo.image && <meta property="og:image" content={seo.image} />}
    <meta property="og:site_name" content={companyInfo.name} />
    
    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.description} />
    
    {/* Hreflang tags for multi-language SEO */}
    <link rel="canonical" href={`https://yuehaitong.com${path}`} />
    {supportedLanguages.map(lang => (
      <link 
        key={lang.code}
        rel="alternate" 
        hrefLang={lang.hreflang} 
        href={`https://yuehaitong.com/${lang.code}${path}`}
      />
    ))}
    <link rel="alternate" hrefLang="x-default" href={`https://yuehaitong.com${path}`} />
  </Helmet>);
}

export function SeoProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org', 
    '@type': 'Organization',
    name: companyInfo.name, 
    alternateName: companyInfo.nameCN,
    description: defaultSeo.description, 
    url: 'https://yuehaitong.com',
    logo: defaultSeo.image,
    contactPoint: { 
      '@type': 'ContactPoint', 
      telephone: companyInfo.phone, 
      email: companyInfo.email, 
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese', 'Spanish', 'German', 'French']
    },
    location: { 
      '@type': 'Place', 
      address: { 
        '@type': 'PostalAddress', 
        addressLocality: 'Tianjin', 
        addressRegion: 'Dongli District',
        addressCountry: 'CN',
        streetAddress: 'No.9912 Jinzhong Road'
      } 
    },
    sameAs: [
      'https://yuehaitong.en.alibaba.com/',
      'https://www.cn-yht.com'
    ]
  };
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

export function ProductSchema({ products }: { products: Product[] }) {
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.slice(0, 20).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images?.[0] || 'https://yuehaitong.com/images/products/default.jpg',
        brand: {
          '@type': 'Brand',
          name: 'Yuehaitong'
        },
        manufacturer: {
          '@type': 'Organization',
          name: companyInfo.name
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: companyInfo.name
          }
        }
      }
    }))
  };
  
  return <script type="application/ld+json">{JSON.stringify(productListSchema)}</script>;
}
