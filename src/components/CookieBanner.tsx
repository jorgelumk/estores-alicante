'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function CookieBanner() {
  const t = useTranslations('Cookies');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#1A1A2E]/95 backdrop-blur-md text-white border-t border-white/10 shadow-2xl animate-slideUp">
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <h4 className="text-lg font-bold flex items-center gap-2 text-orange-400">
            <span>🍪</span> {t('title')}
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {t('text')}{' '}
            <Link href="/blog" className="underline hover:text-orange-400 transition-colors">
              {t('policy')}
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
          <button 
            onClick={handleRejectAll}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-sm font-semibold transition-colors cursor-pointer"
          >
            {t('reject')}
          </button>
          <button 
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[#c44105] text-sm font-bold transition-all shadow-md cursor-pointer hover:scale-102"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
