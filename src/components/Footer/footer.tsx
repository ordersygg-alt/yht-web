import { Bike, Mail, Phone, MapPin, Video, Facebook, Instagram, Linkedin, Youtube, Music2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';

const Footer = () => {
  const { language, t } = useLocale();

  return (
    <footer className='bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Main footer content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10'>
          {/* Brand column */}
          <div className='space-y-6'>
            <Link to='/' className='flex items-center gap-3'>
              <div className='bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-xl'>
                <Bike className='w-6 h-6 text-white' />
              </div>
              <div>
                <span className='font-bold text-lg'>{t['brand name']}</span>
                <p className='text-xs text-white/50'>{t['brand subtitle']}</p>
              </div>
            </Link>
            <p className='text-sm text-white/60 leading-relaxed'>
              {t['footer description']}
            </p>
            <div className='flex items-center gap-3'>
              {['CE', 'EN15194', 'UL'].map((cert) => (
                <span key={cert} className='px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30'>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className='font-semibold text-sm uppercase tracking-wider text-white/80 mb-4'>
              {t['quick links']}
            </h3>
            <ul className='space-y-3'>
              {[
                { name: t.home, path: '/' },
                { name: t.products, path: '/products' },
                { name: t.about, path: '/about' },
                { name: t.contact, path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className='text-sm text-white/60 hover:text-blue-400 transition-colors'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className='font-semibold text-sm uppercase tracking-wider text-white/80 mb-4'>
              {t['contact info']}
            </h3>
            <ul className='space-y-4'>
              <li className='flex items-start gap-3'>
                <MapPin className='w-5 h-5 text-blue-400 shrink-0 mt-0.5' />
                <span className='text-sm text-white/60'>{language === 'zh' ? companyInfo.addressCN : companyInfo.address}</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='w-5 h-5 text-blue-400 shrink-0' />
                <span className='text-sm text-white/60'>{companyInfo.phone}</span>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='w-5 h-5 text-blue-400 shrink-0' />
                <span className='text-sm text-white/60'>{companyInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className='font-semibold text-sm uppercase tracking-wider text-white/80 mb-4'>
              {t['follow us']}
            </h3>
            <div className='flex gap-3'>
              {[

  { icon: Facebook, label: 'Facebook', key: 'social facebook', href: 'https://facebook.com/你的主页' },
  { icon: Instagram, label: 'Instagram', key: 'social instagram', href: 'https://instagram.com/你的主页' },
  { icon: Linkedin, label: 'LinkedIn', key: 'social linkedin', href: 'https://linkedin.com/company/你的公司' },
  { icon: MessageSquare, label: 'WhatsApp', key: 'social whatsapp', href: 'https://wa.me/你的号码' },
  { icon: Music2, label: 'TikTok', key: 'social tiktok', href: 'https://tiktok.com/@你的账号' },
  { icon: Youtube, label: 'YouTube', key: 'social youtube', href: 'https://youtube.com/你的频道' },

            ].map((social) => (
              <a
                key={social.label}
                /*href='#'*/
                href={social.href}
                className='w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-500/30 border border-white/10 hover:border-blue-500/30 flex items-center justify-center text-white/60 hover:text-blue-400 transition-all'
                aria-label={social.label}
                title={t[social.key]}
              >
                <social.icon />
              </a>
            ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40'>
          <p>© {new Date().getFullYear()} {language === 'zh' ? companyInfo.nameCN : companyInfo.name} {t['all rights reserved']}</p>
          <p>{t['professional e-bike oem manufacturer']}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
