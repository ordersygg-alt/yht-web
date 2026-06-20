import { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLocale } from '@/hooks/useLocale';
import { products } from '@/data/products';
import SlideCaptcha from '@/components/SlideCaptcha/SlideCaptcha';

interface ContactFormProps {
  onSubmitSuccess: () => void;
}

const EMAILJS_PUBLIC_KEY = 'ssp-XkX7v05IzRs_8';
const EMAILJS_SERVICE_ID = 'service_i8n4n4y';
const EMAILJS_TEMPLATE_ID = 'template_6q5zlvd';

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    product: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const { t, language } = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const selectedProduct = products.find(p => p.id === formData.product);
      const productName = selectedProduct
        ? (language === 'zh' ? selectedProduct.nameCN : selectedProduct.name)
        : '-';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || '-',
        product: productName,
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error: any) {
      console.error('Email send failed:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <div>
          <label className='block text-sm font-medium mb-1.5 text-vp-c-text'>
            {t['name label']} <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder={t['your name']}
            required
            className='w-full px-4 py-3 bg-vp-bg-alt border border-vp-divider rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1.5 text-vp-c-text'>
            {t['email label']} <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder={t['your email']}
            required
            className='w-full px-4 py-3 bg-vp-bg-alt border border-vp-divider rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <div>
          <label className='block text-sm font-medium mb-1.5 text-vp-c-text'>{t['company label']}</label>
          <input
            type='text'
            name='company'
            value={formData.company}
            onChange={handleChange}
            placeholder={t['company name']}
            className='w-full px-4 py-3 bg-vp-bg-alt border border-vp-divider rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1.5 text-vp-c-text'>{t['interested product']}</label>
          <select
            name='product'
            value={formData.product}
            onChange={handleChange}
            className='w-full px-4 py-3 bg-vp-bg-alt border border-vp-divider rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all'
          >
            <option value=''>{t['select a product']}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {language === 'zh' ? p.nameCN : p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1.5 text-vp-c-text'>
          {t['message label']} <span className='text-red-500'>*</span>
        </label>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          placeholder={t['describe requirements']}
          required
          rows={5}
          className='w-full px-4 py-3 bg-vp-bg-alt border border-vp-divider rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none'
        />
      </div>

      <SlideCaptcha onVerify={setIsVerified} />

      {submitStatus === 'success' && (
        <div className='flex items-center justify-center gap-2 py-3 px-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-600'>
          <CheckCircle className='w-5 h-5' />
          <span className='text-sm font-medium'>{t['thank you']}</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className='flex items-center justify-center gap-2 py-3 px-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600'>
          <XCircle className='w-5 h-5' />
          <span className='text-sm font-medium'>{t['failed to send']}</span>
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting || !isVerified || submitStatus === 'error'}
        className='btn-vp btn-vp-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? (
          <>
            <Loader2 className='w-5 h-5 animate-spin' />
            {t.sending}
          </>
        ) : (
          <>
            <Send className='w-5 h-5' />
            {t['send message']}
          </>
        )}
      </button>
    </form>
  );
}
