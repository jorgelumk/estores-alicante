import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Categories English 301 redirects
      { source: '/en/estores-enrollables', destination: '/en/roller-blinds', permanent: true },
      { source: '/en/estores-screen', destination: '/en/screen-blinds', permanent: true },
      { source: '/en/estores-opacos', destination: '/en/blackout-blinds', permanent: true },
      { source: '/en/estores-traslucidos', destination: '/en/translucent-blinds', permanent: true },
      { source: '/en/estores-sin-taladrar', destination: '/en/no-drill-blinds', permanent: true },
      { source: '/en/estores-motorizados', destination: '/en/motorised-blinds', permanent: true },
      { source: '/en/estores-termicos', destination: '/en/thermal-blinds', permanent: true },
      { source: '/en/estores-paqueto', destination: '/en/roman-blinds', permanent: true },
      { source: '/en/cortinas', destination: '/en/curtains', permanent: true },
      { source: '/en/cortinas-enrollables', destination: '/en/roller-curtains', permanent: true },
      
      // Products English 301 redirects
      { source: '/en/estores-screen-1', destination: '/en/screen-blinds-1', permanent: true },
      { source: '/en/estores-screen-5', destination: '/en/screen-blinds-5', permanent: true },
      { source: '/en/estores-screen-fiberglass', destination: '/en/fiberglass-screen-blinds', permanent: true },
      { source: '/en/estores-opaco-oslo', destination: '/en/blackout-blinds-oslo', permanent: true },
      { source: '/en/estores-translucido-shantung', destination: '/en/translucent-blinds-shantung', permanent: true },
      { source: '/en/estores-translucido-valencia', destination: '/en/translucent-blinds-valencia', permanent: true },
      { source: '/en/estores-sin-taladrar-screen-1', destination: '/en/no-drill-screen-blinds-1', permanent: true },
      { source: '/en/estores-sin-taladrar-screen-5', destination: '/en/no-drill-screen-blinds-5', permanent: true },
      { source: '/en/estores-sin-taladrar-screen-fiberglass', destination: '/en/no-drill-fiberglass-screen-blinds', permanent: true },
      { source: '/en/estores-sin-taladrar-opaco-oslo', destination: '/en/no-drill-blackout-blinds-oslo', permanent: true },
      { source: '/en/estores-sin-taladrar-translucido-shantung', destination: '/en/no-drill-translucent-blinds-shantung', permanent: true },
      { source: '/en/estores-sin-taladrar-translucido-valencia', destination: '/en/no-drill-translucent-blinds-valencia', permanent: true },
      
      // Page English 301 redirects
      { source: '/en/quienes-somos', destination: '/en/about-us', permanent: true },
      { source: '/en/presupuesto', destination: '/en/quote', permanent: true },
      { source: '/en/mapa-del-sitio', destination: '/en/sitemap', permanent: true },
      { source: '/en/aviso-legal', destination: '/en/legal-notice', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
