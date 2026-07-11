"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Optional: Reset form here if needed
    }, 1500);
  };

  return (
    <section className="bg-white py-20 px-4 border-t border-gray-100" id="contact-form">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={t('name_placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder={t('phone_placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('email_placeholder')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('address')}
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder={t('address_placeholder')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">
              {t('details')}
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              placeholder={t('details_placeholder')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all resize-y"
            ></textarea>
          </div>

          {status === 'success' ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold">
              ✓ {t('success')}
            </div>
          ) : (
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform hover:scale-[1.02] shadow-md disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === 'submitting' ? '...' : t('submit')}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
