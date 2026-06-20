import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { Seo } from '@/components/Seo/Seo';
import GeoMap from '@/components/GeoMap/GeoMap';
import { companyInfo } from '@/data/products';
import { useLocale } from '@/hooks/useLocale';
import ContactForm from '@/components/ContactForm/ContactForm';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, language } = useLocale();

  const handleSubmit = () => { setIsSubmitted(true); };
  const handleReset = () => { setIsSubmitted(false); };

  return (<div className="min-h-screen">
    <Seo path="/contact" />
    
    {/* Header section */}
    <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4'>
            {t.contact}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.contact}</h1>
          <p className="text-white/60 max-w-2xl mx-auto">{t.description}</p>
        </motion.div>
      </div>
    </section>

    {/* Main content */}
    <section className="py-20 bg-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="card-vp p-8">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white"/>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{t['thank you']}</h2>
                  <p className="text-vp-c-text-mute mb-8">{t['your inquiry has been submitted']}</p>
                  <button onClick={handleReset} className="btn-vp btn-vp-secondary">{t['send another message']}</button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{t['send message']}</h2>
                    <p className="text-vp-c-text-mute">{t['contact description']}</p>
                  </div>
                  <ContactForm onSubmitSuccess={handleSubmit}/>
                </>
              )}
            </div>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {/* Contact information */}
            <div className="card-vp p-6">
              <h3 className="font-bold text-lg mb-6">{t['contact information']}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-0.5">{t.address}</div>
                    <div className="text-sm font-medium">{language === 'zh' ? companyInfo.addressCN : companyInfo.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-0.5">{t.phone}</div>
                    <div className="text-sm font-medium">{companyInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-0.5">{t.email}</div>
                    <div className="text-sm font-medium">{companyInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-0.5">{t['business hours']}</div>
                    <div className="text-sm font-medium">{t['monday friday']}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick quote */}
            <div className="card-vp p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20">
              <h3 className="font-bold text-lg mb-3">{t['get a quote']}</h3>
              <p className="text-sm text-vp-c-text-mute mb-5">{t.description}</p>
              <a href={`mailto:${companyInfo.email}`} className="btn-vp btn-vp-primary w-full text-center gap-2">
                <Mail className="w-4 h-4"/>
                {t['contact for quote']}
              </a>
            </div>

            {/* Response stats */}
            <div className="card-vp p-6">
              <h3 className="font-bold text-lg mb-4">{t['response stats']}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-vp-bg-alt">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{companyInfo.responseTime}</div>
                  <div className="text-xs text-vp-c-text-mute mt-1">{t['response time']}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-vp-bg-alt">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{companyInfo.responseRate}</div>
                  <div className="text-xs text-vp-c-text-mute mt-1">{t['response rate']}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Map section */}
    <section className="py-8 bg-vp-bg">
      <div className="max-w-7xl mx-auto px-6">
        <GeoMap />
      </div>
    </section>
  </div>);
}
