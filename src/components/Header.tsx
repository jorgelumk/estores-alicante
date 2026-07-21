"use client";

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/siteConfig';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const estoresLinks = [
    { href: '/estores-enrollables', label: t('estores_enrollables') },
    { href: '/estores-screen', label: t('estores_screen') },
    { href: '/estores-opacos', label: t('estores_opacos') },
    { href: '/estores-traslucidos', label: t('estores_traslucidos') },
    { href: '/estores-sin-taladrar', label: t('estores_sin_taladrar') },
    { href: '/estores-motorizados', label: t('estores_motorizados') },
    { href: '/estores-termicos', label: t('estores_termicos') },
    { href: '/estores-paqueto', label: t('estores_paqueto') },
  ];

  const cortinasLinks = [
    { href: '/cortinas', label: t('cortinas_medida') },
    { href: '/cortinas-enrollables', label: t('cortinas_enrollables') },
  ];

  const locationsLinks = [
    { href: '/elche', label: t('elche') },
    { href: '/benidorm', label: t('benidorm') },
    { href: '/torrevieja', label: t('torrevieja') },
  ];

  return (
    <header className="bg-[var(--color-primary)] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-90" onClick={closeMenus}>
          {t('home')}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
          {/* Estores Dropdown */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setActiveDropdown('estores')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-orange-200 transition-colors focus:outline-none cursor-pointer">
              {t('estores')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute top-full left-0 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-3 min-w-[220px] hidden group-hover:block transition-all duration-200 animate-fadeIn">
              {estoresLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href as any} 
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[var(--color-primary)] transition-colors"
                  onClick={closeMenus}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Cortinas Dropdown */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setActiveDropdown('cortinas')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-orange-200 transition-colors focus:outline-none cursor-pointer">
              {t('curtains')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute top-full left-0 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-3 min-w-[220px] hidden group-hover:block transition-all duration-200 animate-fadeIn">
              {cortinasLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href as any} 
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[var(--color-primary)] transition-colors"
                  onClick={closeMenus}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Ubicaciones Dropdown */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setActiveDropdown('locations')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-orange-200 transition-colors focus:outline-none cursor-pointer">
              {t('locations')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute top-full left-0 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-3 min-w-[200px] hidden group-hover:block transition-all duration-200 animate-fadeIn">
              {locationsLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href as any} 
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[var(--color-primary)] transition-colors"
                  onClick={closeMenus}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About us */}
          <Link href="/quienes-somos" className="hover:text-orange-200 transition-colors" onClick={closeMenus}>
            {t('about_us')}
          </Link>

          {/* Blog */}
          <Link href="/blog" className="hover:text-orange-200 transition-colors" onClick={closeMenus}>
            {t('blog')}
          </Link>

          {/* Phone Link */}
          <a href={`tel:+34${siteConfig.phone}`} className="flex items-center gap-1 hover:text-orange-200 transition-colors text-white font-bold" onClick={closeMenus}>
            <span className="text-base">📞</span>
            <span>{siteConfig.phoneFormatted.replace('+34 ', '')}</span>
          </a>

          {/* Quote Button */}
          <Link 
            href="/presupuesto" 
            className="hover:bg-gray-100 hover:text-[var(--color-primary)] transition-all font-bold text-[#1A1A2E] bg-white px-4 py-2 rounded-xl shadow-sm hover:scale-105"
            onClick={closeMenus}
          >
            {t('quote')}
          </Link>
        </nav>

        {/* Right Area: Lang & Mobile menu button */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex space-x-2 text-sm font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
            <Link href={pathname as any} locale="es" className={`hover:text-orange-200 transition-colors ${locale === 'es' ? 'text-orange-300 font-extrabold underline' : 'text-white'}`}>ES</Link>
            <span className="text-white/30">|</span>
            <Link href={pathname as any} locale="en" className={`hover:text-orange-200 transition-colors ${locale === 'en' ? 'text-orange-300 font-extrabold underline' : 'text-white'}`}>EN</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-white hover:text-orange-200 focus:outline-none p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--color-primary)] border-t border-white/10 px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Estores Mobile Dropdown */}
          <div className="space-y-2">
            <button 
              onClick={() => toggleDropdown('estores')}
              className="flex justify-between items-center w-full py-2 font-bold text-lg hover:text-orange-200 text-left cursor-pointer"
            >
              <span>{t('estores')}</span>
              <svg className={`w-4 h-4 transform transition-transform ${activeDropdown === 'estores' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {activeDropdown === 'estores' && (
              <div className="pl-4 space-y-2 border-l border-white/20 ml-2">
                {estoresLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href as any} 
                    className="block py-2 text-white/80 hover:text-white"
                    onClick={closeMenus}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cortinas Mobile Dropdown */}
          <div className="space-y-2">
            <button 
              onClick={() => toggleDropdown('cortinas')}
              className="flex justify-between items-center w-full py-2 font-bold text-lg hover:text-orange-200 text-left cursor-pointer"
            >
              <span>{t('curtains')}</span>
              <svg className={`w-4 h-4 transform transition-transform ${activeDropdown === 'cortinas' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {activeDropdown === 'cortinas' && (
              <div className="pl-4 space-y-2 border-l border-white/20 ml-2">
                {cortinasLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href as any} 
                    className="block py-2 text-white/80 hover:text-white"
                    onClick={closeMenus}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Locations Mobile Dropdown */}
          <div className="space-y-2">
            <button 
              onClick={() => toggleDropdown('locations')}
              className="flex justify-between items-center w-full py-2 font-bold text-lg hover:text-orange-200 text-left cursor-pointer"
            >
              <span>{t('locations')}</span>
              <svg className={`w-4 h-4 transform transition-transform ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {activeDropdown === 'locations' && (
              <div className="pl-4 space-y-2 border-l border-white/20 ml-2">
                {locationsLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href as any} 
                    className="block py-2 text-white/80 hover:text-white"
                    onClick={closeMenus}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About us */}
          <Link href="/quienes-somos" className="block py-2 font-bold text-lg hover:text-orange-200" onClick={closeMenus}>
            {t('about_us')}
          </Link>

          {/* Blog */}
          <Link href="/blog" className="block py-2 font-bold text-lg hover:text-orange-200" onClick={closeMenus}>
            {t('blog')}
          </Link>

          {/* Phone Link (Mobile) */}
          <a href={`tel:+34${siteConfig.phone}`} className="flex items-center gap-2 py-2 font-bold text-lg hover:text-orange-200 text-white" onClick={closeMenus}>
            <span className="text-xl">📞</span>
            <span>{siteConfig.phoneFormatted.replace('+34 ', '')}</span>
          </a>

          {/* Quote Button */}
          <div className="pt-4">
            <Link 
              href="/presupuesto" 
              className="block text-center font-bold text-[#1A1A2E] bg-white py-3 rounded-xl shadow-md hover:bg-gray-100"
              onClick={closeMenus}
            >
              {t('quote')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
