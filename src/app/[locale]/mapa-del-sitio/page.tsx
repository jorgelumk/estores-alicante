import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { postsDataEs, postsDataEn } from '@/data/blog/posts';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  return {
    title: locale === 'es' ? 'Mapa del Sitio | Estores Alicante' : 'Sitemap | Estores Alicante',
    description: locale === 'es' 
      ? 'Mapa del sitio de Estores Alicante. Encuentra fácilmente todos nuestros productos, servicios, artículos de blog y enlaces.'
      : 'Sitemap for Estores Alicante. Easily find all our products, services, blog articles and links.',
    alternates: {
      canonical: `${baseUrl}/${locale}/mapa-del-sitio`,
    }
  };
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = locale === 'es' ? postsDataEs : postsDataEn;
  const publishedPosts = Object.values(posts);

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
          {locale === 'es' ? 'Mapa del Sitio' : 'Sitemap'}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-12">
          
          {/* Main Pages */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              {locale === 'es' ? 'Páginas Principales' : 'Main Pages'}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li><Link href="/" className="text-[var(--color-primary)] hover:underline font-medium">{locale === 'es' ? 'Inicio' : 'Home'}</Link></li>
              <li><Link href="/quienes-somos" className="text-[var(--color-primary)] hover:underline font-medium">{locale === 'es' ? 'Quiénes somos' : 'About us'}</Link></li>
              <li><Link href="/presupuesto" className="text-[var(--color-primary)] hover:underline font-medium">{locale === 'es' ? 'Presupuesto Online' : 'Online Quote'}</Link></li>
              <li><Link href="/blog" className="text-[var(--color-primary)] hover:underline font-medium">Blog</Link></li>
            </ul>
          </section>

          {/* Catalog */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              {locale === 'es' ? 'Catálogo de Estores y Cortinas' : 'Blinds and Curtains Catalog'}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {products.map(product => (
                <li key={product.id}>
                  <Link href={`/${product.slug}`} className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors">
                    {locale === 'es' ? product.name.es : product.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Installation Areas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              {locale === 'es' ? 'Zonas de Instalación' : 'Installation Areas'}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li><Link href="/" className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors">Alicante</Link></li>
              <li><Link href="/elche" className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors">Elche</Link></li>
              <li><Link href="/benidorm" className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors">Benidorm</Link></li>
              <li><Link href="/torrevieja" className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors">Torrevieja</Link></li>
            </ul>
          </section>

          {/* Blog Posts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              {locale === 'es' ? 'Artículos del Blog' : 'Blog Articles'}
            </h2>
            <ul className="grid grid-cols-1 gap-3">
              {publishedPosts.map(post => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
