import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bike, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();
  const { t, language, setLanguage } = useLocale();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems = [
    { name: t.home, path: '/' },
    { name: t.products, path: '/products' },
    { name: t.about, path: '/about' },
    { name: t.contact, path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'zh', label: 'CH', full: 'China' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto h-full px-6 flex items-center justify-between'>
        <div className='flex items-center gap-8'>
          <Link to='/' className='flex items-center gap-3 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-vp-accent/30 rounded-xl blur-lg group-hover:bg-vp-accent/50 transition-all' />
              <div className='relative bg-gradient-to-br from-vp-accent to-blue-700 p-2 rounded-xl'>
                <Bike className='w-6 h-6 text-white' />
              </div>
            </div>
            <span className='font-bold text-lg tracking-tight'>
              <span className='text-blue-600'>YUEHAI</span>
              <span className='text-gray-900'>TONG</span>
            </span>
          </Link>

          <nav className='hidden lg:flex items-center gap-1'>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId='navbar-indicator'
                    className='absolute inset-0 border-2 border-blue-600 rounded-lg -z-10'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className='p-2.5 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200'
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
            </motion.div>
          </button>

          <div className='language-switcher relative'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLangMenuOpen(!isLangMenuOpen);
              }}
              className='flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200'
            >
              <Globe className='w-4 h-4' />
              <span>{languages.find(l => l.code === language)?.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute right-0 top-full mt-2 w-36 rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 overflow-hidden'
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'zh');
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-150 ${
                        language === lang.code
                          ? 'text-blue-600 bg-blue-50 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    >
                      {lang.full}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-2.5 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200'
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50'
          >
            <nav className='max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1'>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
