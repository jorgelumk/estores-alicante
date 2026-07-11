import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { postsDataEs } from '@/data/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  
  // Static and Category pages
  const staticPages = [
    '', '/elche', '/benidorm', '/torrevieja', 
    '/estores-enrollables', '/estores-screen', '/estores-opacos', 
    '/estores-traslucidos', '/estores-sin-taladrar', '/estores-motorizados', 
    '/estores-termicos', '/estores-paqueto', '/cortinas', 
    '/cortinas-enrollables', '/presupuesto', '/blog', '/quienes-somos',
    '/mapa-del-sitio'
  ];

  const staticEntriesEs: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}/es${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/es${page}`,
        en: `${baseUrl}/en${page}`,
      },
    },
  }));

  const staticEntriesEn: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}/en${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 0.9 : 0.7,
    alternates: {
      languages: {
        es: `${baseUrl}/es${page}`,
        en: `${baseUrl}/en${page}`,
      },
    },
  }));

  // Dynamic Product pages
  const productEntriesEs: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/es/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        es: `${baseUrl}/es/${product.slug}`,
        en: `${baseUrl}/en/${product.slug}`,
      },
    },
  }));

  const productEntriesEn: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/en/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/es/${product.slug}`,
        en: `${baseUrl}/en/${product.slug}`,
      },
    },
  }));

  // Dynamic Blog pages
  const blogEntriesEs: MetadataRoute.Sitemap = Object.values(postsDataEs)
    .map((post) => ({
      url: `${baseUrl}/es/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/es/blog/${post.slug}`,
          en: `${baseUrl}/en/blog/${post.slug}`,
        },
      },
  }));

  const blogEntriesEn: MetadataRoute.Sitemap = Object.values(postsDataEs)
    .map((post) => ({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          es: `${baseUrl}/es/blog/${post.slug}`,
          en: `${baseUrl}/en/blog/${post.slug}`,
        },
      },
  }));

  return [
    ...staticEntriesEs,
    ...staticEntriesEn,
    ...productEntriesEs,
    ...productEntriesEn,
    ...blogEntriesEs,
    ...blogEntriesEn
  ];
}
