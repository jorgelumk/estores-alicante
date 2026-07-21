import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/quienes-somos': {
      es: '/quienes-somos',
      en: '/about-us'
    },
    '/presupuesto': {
      es: '/presupuesto',
      en: '/quote'
    },
    '/blog': {
      es: '/blog',
      en: '/blog'
    },
    '/mapa-del-sitio': {
      es: '/mapa-del-sitio',
      en: '/sitemap'
    },
    '/aviso-legal': {
      es: '/aviso-legal',
      en: '/legal-notice'
    },
    // Category Pages
    '/estores-enrollables': {
      es: '/estores-enrollables',
      en: '/roller-blinds'
    },
    '/estores-screen': {
      es: '/estores-screen',
      en: '/screen-blinds'
    },
    '/estores-opacos': {
      es: '/estores-opacos',
      en: '/blackout-blinds'
    },
    '/estores-traslucidos': {
      es: '/estores-traslucidos',
      en: '/translucent-blinds'
    },
    '/estores-sin-taladrar': {
      es: '/estores-sin-taladrar',
      en: '/no-drill-blinds'
    },
    '/estores-motorizados': {
      es: '/estores-motorizados',
      en: '/motorised-blinds'
    },
    '/estores-termicos': {
      es: '/estores-termicos',
      en: '/thermal-blinds'
    },
    '/estores-paqueto': {
      es: '/estores-paqueto',
      en: '/roman-blinds'
    },
    '/cortinas': {
      es: '/cortinas',
      en: '/curtains'
    },
    '/cortinas-enrollables': {
      es: '/cortinas-enrollables',
      en: '/roller-curtains'
    },
    // Individual Product Pages
    '/estores-screen-1': {
      es: '/estores-screen-1',
      en: '/screen-blinds-1'
    },
    '/estores-screen-5': {
      es: '/estores-screen-5',
      en: '/screen-blinds-5'
    },
    '/estores-screen-fiberglass': {
      es: '/estores-screen-fiberglass',
      en: '/fiberglass-screen-blinds'
    },
    '/estores-opaco-oslo': {
      es: '/estores-opaco-oslo',
      en: '/blackout-blinds-oslo'
    },
    '/estores-translucido-shantung': {
      es: '/estores-translucido-shantung',
      en: '/translucent-blinds-shantung'
    },
    '/estores-translucido-valencia': {
      es: '/estores-translucido-valencia',
      en: '/translucent-blinds-valencia'
    },
    '/estores-sin-taladrar-screen-1': {
      es: '/estores-sin-taladrar-screen-1',
      en: '/no-drill-screen-blinds-1'
    },
    '/estores-sin-taladrar-screen-5': {
      es: '/estores-sin-taladrar-screen-5',
      en: '/no-drill-screen-blinds-5'
    },
    '/estores-sin-taladrar-screen-fiberglass': {
      es: '/estores-sin-taladrar-screen-fiberglass',
      en: '/no-drill-fiberglass-screen-blinds'
    },
    '/estores-sin-taladrar-opaco-oslo': {
      es: '/estores-sin-taladrar-opaco-oslo',
      en: '/no-drill-blackout-blinds-oslo'
    },
    '/estores-sin-taladrar-translucido-shantung': {
      es: '/estores-sin-taladrar-translucido-shantung',
      en: '/no-drill-translucent-blinds-shantung'
    },
    '/estores-sin-taladrar-translucido-valencia': {
      es: '/estores-sin-taladrar-translucido-valencia',
      en: '/no-drill-translucent-blinds-valencia'
    },
    // Local Pages
    '/elche': {
      es: '/elche',
      en: '/elche'
    },
    '/benidorm': {
      es: '/benidorm',
      en: '/benidorm'
    },
    '/torrevieja': {
      es: '/torrevieja',
      en: '/torrevieja'
    }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
