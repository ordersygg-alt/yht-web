import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocaleProvider } from '@/hooks/useLocale';
import { SeoProvider, SchemaOrg } from '@/components/Seo/Seo';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

export default function App() {
  return (
    <LocaleProvider>
      <SeoProvider>
        <Router basename="/yht-web">
          <SchemaOrg />
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </SeoProvider>
    </LocaleProvider>
  );
}
