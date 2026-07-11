import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { postsDataEs } from '@/data/blog/posts';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  const today = new Date().toISOString().split('T')[0];

  // Páginas estáticas y categorías
  const staticPages = [
    '', '/elche', '/benidorm', '/torrevieja', 
    '/estores-enrollables', '/estores-screen', '/estores-opacos', 
    '/estores-traslucidos', '/estores-sin-taladrar', '/estores-motorizados', 
    '/estores-termicos', '/estores-paqueto', '/cortinas', 
    '/cortinas-enrollables', '/presupuesto', '/blog', '/quienes-somos',
    '/mapa-del-sitio'
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Entradas estáticas en Español
  staticPages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/es${page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });

  // 2. Entradas estáticas en Inglés
  staticPages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/en${page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${page === '' ? '0.9' : '0.7'}</priority>\n`;
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

  // 4. Productos en Inglés
  products.forEach((product) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/en/${product.slug}</loc>\n`;
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

  // 6. Entradas de Blog en Inglés
  Object.values(postsDataEs).forEach((post) => {
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
