import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { postsDataEs, postsDataEn } from '@/data/blog/posts';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  const today = new Date().toISOString().split('T')[0];

  // Mapeo de páginas estáticas y categorías (es -> en)
  const staticPages = [
    { es: '', en: '' },
    { es: '/elche', en: '/elche' },
    { es: '/benidorm', en: '/benidorm' },
    { es: '/torrevieja', en: '/torrevieja' },
    { es: '/estores-enrollables', en: '/roller-blinds' },
    { es: '/estores-screen', en: '/screen-blinds' },
    { es: '/estores-opacos', en: '/blackout-blinds' },
    { es: '/estores-traslucidos', en: '/translucent-blinds' },
    { es: '/estores-sin-taladrar', en: '/no-drill-blinds' },
    { es: '/estores-motorizados', en: '/motorised-blinds' },
    { es: '/estores-termicos', en: '/thermal-blinds' },
    { es: '/estores-paqueto', en: '/roman-blinds' },
    { es: '/cortinas', en: '/curtains' },
    { es: '/cortinas-enrollables', en: '/roller-curtains' },
    { es: '/presupuesto', en: '/quote' },
    { es: '/blog', en: '/blog' },
    { es: '/quienes-somos', en: '/about-us' },
    { es: '/mapa-del-sitio', en: '/sitemap' }
  ];

  // Mapeo de productos (es -> en)
  const productSlugs: Record<string, string> = {
    'estores-screen-1': 'screen-blinds-1',
    'estores-screen-5': 'screen-blinds-5',
    'estores-screen-fiberglass': 'fiberglass-screen-blinds',
    'estores-opaco-oslo': 'blackout-blinds-oslo',
    'estores-translucido-shantung': 'translucent-blinds-shantung',
    'estores-translucido-valencia': 'translucent-blinds-valencia',
    'estores-sin-taladrar-screen-1': 'no-drill-screen-blinds-1',
    'estores-sin-taladrar-screen-5': 'no-drill-screen-blinds-5',
    'estores-sin-taladrar-screen-fiberglass': 'no-drill-fiberglass-screen-blinds',
    'estores-sin-taladrar-opaco-oslo': 'no-drill-blackout-blinds-oslo',
    'estores-sin-taladrar-translucido-shantung': 'no-drill-translucent-blinds-shantung',
    'estores-sin-taladrar-translucido-valencia': 'no-drill-translucent-blinds-valencia'
  };

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Entradas estáticas en Español
  staticPages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/es${page.es}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.es === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${page.es === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });

  // 2. Entradas estáticas en Inglés (URLs traducidas)
  staticPages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/en${page.en}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.en === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${page.en === '' ? '0.9' : '0.7'}</priority>\n`;
    xml += '  </url>\n';
  });

  // 3. Productos en Español
  products.forEach((product) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/es/${product.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';
  });

  // 4. Productos en Inglés (URLs traducidas)
  products.forEach((product) => {
    const enSlug = productSlugs[product.slug] || product.slug;
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/en/${enSlug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  // 5. Entradas de Blog en Español
  Object.values(postsDataEs).forEach((post) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/es/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });

  // 6. Entradas de Blog en Inglés (URLs traducidas)
  Object.values(postsDataEn).forEach((post) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/en/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
