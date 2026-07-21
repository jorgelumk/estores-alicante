import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import type { Metadata } from 'next';
import { postsDataEs, postsDataEn, BlogPost } from '@/data/blog/posts';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from './ShareButtons';
import ArticleSchema from '@/components/ArticleSchema';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = locale === 'es' ? postsDataEs[slug] : postsDataEn[slug];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';

  if (!post) {
    return {
      title: locale === 'es' ? 'Artículo en desarrollo | Estores Alicante' : 'Article under development | Estores Alicante',
      description: locale === 'es' ? 'Este artículo del blog está en fase de redacción.' : 'This blog post is currently being written.',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${baseUrl}/${locale}/blog/${slug}`,
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.metaTitle,
        }
      ]
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Blog');

  // Check if post exists
  const post = locale === 'es' ? postsDataEs[slug] : postsDataEn[slug];

  // If the post is not found (for the example post list), show a placeholder or standard template
  if (!post) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <section className="py-24 px-4 md:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
          <span className="text-4xl">✍️</span>
          
          <Breadcrumbs
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: locale === 'es' ? 'Producto' : 'Product' }
            ]}
          />
          <h1 className="text-3xl font-extrabold text-[#1A1A2E]">
            {locale === 'es' ? 'Artículo en desarrollo' : 'Article under development'}
          </h1>
          <p className="text-gray-600 text-lg">
            {locale === 'es' 
              ? 'Estamos redactando este contenido para ofrecerte la mejor información sobre protección solar y decoración.'
              : 'We are currently writing this content to offer you the best information about solar protection and decoration.'}
          </p>
          <div className="pt-4">
            <Link href="/blog" className="inline-block bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-2.5 px-6 rounded-lg transition-transform hover:scale-105 shadow-md">
              ← {t('back_to_blog')}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Get related posts dynamically (excluding the current post)
  const sourceData = locale === 'es' ? postsDataEs : postsDataEn;
  const relatedPosts = Object.entries(sourceData)
    .filter(([postSlug]) => postSlug !== slug)
    .slice(0, 3)
    .map(([postSlug, postData], index) => ({
      id: index + 1,
      title: postData.title,
      excerpt: postData.excerpt,
      date: postData.date,
      category: postData.category,
      image: postData.image,
      slug: postSlug
    }));

  // Table of contents anchors based on the content headers
  const tocItems = post.toc || (locale === 'es' ? [
    { id: 'privacidad-y-luz', text: '1. Nivel de luz y privacidad' },
    { id: 'tipos-de-estores', text: '2. Tipos de estores recomendados' },
    { id: 'tejidos-y-materiales', text: '3. Elegir el tejido idóneo' },
    { id: 'medicion-e-instalacion', text: '4. Medición e instalación' },
    { id: 'colores-y-tendencias', text: '5. Colores y tendencias' },
    { id: 'conclusion', text: 'Resumen y Conclusión' }
  ] : [
    { id: 'privacidad-y-luz', text: '1. Light & privacy level' },
    { id: 'tipos-de-estores', text: '2. Recommended blind types' },
    { id: 'tejidos-y-materiales', text: '3. Choosing the right fabric' },
    { id: 'medicion-e-instalacion', text: '4. Measurement & installation' },
    { id: 'colores-y-tendencias', text: '5. Colors & trends' },
    { id: 'conclusion', text: 'Summary & Conclusion' }
  ]);

  // Breadcrumbs data
  const breadcrumbs = [
    { name: t('home'), url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: '' }
  ];

  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  // Breadcrumb schema JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      ...(crumb.url ? { 'item': `https://estoresalicante.com/${locale}${crumb.url}` } : {})
    }))
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumbs Navigation */}
      <div className="bg-white border-b-2 border-gray-100 py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex text-xs md:text-sm font-semibold tracking-wide text-gray-500">
            <ol className="inline-flex items-center space-x-1.5 md:space-x-2.5">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li className="inline-flex items-center">
                <span className="mx-1.5 text-gray-300 select-none">/</span>
                <Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">
                  Blog
                </Link>
              </li>
              <li className="inline-flex items-center min-w-0">
                <span className="mx-1.5 text-gray-300 select-none">/</span>
                <span className="text-[#1A1A2E] font-extrabold truncate max-w-[200px] md:max-w-[420px]" aria-current="page">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 2. Post Header */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-4xl mx-auto w-full text-center">
        <div className="space-y-4">
          <span className="bg-orange-100 text-[var(--color-primary)] text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#1A1A2E] leading-tight max-w-3xl mx-auto">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
            <span>📅 {post.date}</span>
            <span>•</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* 3. Main Hero Image */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto w-full mb-12">
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 4. Table of Contents & Share Container */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto w-full mb-12">
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start shadow-sm">
          {/* TOC Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1A1A2E] flex items-center gap-2 pb-2 border-b border-gray-200">
              <span>📋</span> {t('toc')}
            </h2>
            <nav aria-label="Table of contents">
              <ul className="grid grid-cols-1 gap-2 text-sm">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-gray-600 hover:text-[var(--color-primary)] hover:underline transition-colors font-semibold block py-0.5"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Share Column */}
          <div className="space-y-4 md:border-l md:border-gray-200 md:pl-8">
            <h3 className="text-lg font-bold text-[#1A1A2E] flex items-center gap-2 pb-2 border-b border-gray-200">
              <span>📢</span> {t('share')}
            </h3>
            <ShareButtons 
              title={post.title} 
              url={`/blog/${post.slug}`} 
              copiedText={t('copied')} 
            />
          </div>
        </div>
      </section>

      {/* 5. Post Content */}
      <section className="px-4 md:px-8 max-w-3xl mx-auto w-full pb-20">
        <article>
          <div 
            className="prose max-w-none text-gray-700
              [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-base md:[&>p]:text-lg
              [&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-extrabold [&>h2]:text-[#1A1A2E] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:scroll-mt-24
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1A1A2E] [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:scroll-mt-24
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:text-gray-600
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:text-gray-600
              [&_a:not([class*='bg-']):not([class*='inline-block'])]:text-[var(--color-primary)] [&_a:not([class*='bg-']):not([class*='inline-block'])]:font-semibold [&_a:not([class*='bg-']):not([class*='inline-block'])]:underline hover:[&_a:not([class*='bg-']):not([class*='inline-block'])]:text-[#c44105]
              [&_a[class*='bg-']]:!text-white [&_a[class*='bg-']]:!no-underline
              [&_strong]:font-bold [&_strong]:text-[#1A1A2E]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </section>

      {/* 6. High-Converting Call to Action (CTA) with background image */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden text-center text-white border-t border-b border-gray-800">
        <Image
          src="/images/cta-background-estores.jpg"
          alt="Estores en salón con vistas al mar"
          fill
          className="object-cover object-center pointer-events-none"
          priority
        />
        <div className="absolute inset-0 bg-black/65 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-3xl block">🏠</span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            {t('cta_post_title')}
          </h2>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {t('cta_post_subtitle')}
          </p>
          <div className="pt-4">
            <Link 
              href="/presupuesto" 
              className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-3.5 px-8 rounded-xl text-lg transition-transform hover:scale-105 shadow-lg inline-block"
              style={{ color: '#ffffff' }}
            >
              {t('cta_post_button')}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Related Posts */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] text-center mb-12">
          {t('related_posts')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => {
            const relatedHref = `/blog/${relatedPost.slug}`;

            return (
              <article key={relatedPost.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full group">
                <Link href={relatedHref as any} className="relative h-48 block w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-[10px] font-black text-[var(--color-primary)] bg-orange-50 uppercase tracking-widest px-2.5 py-1 rounded-full w-fit mb-3">
                    {relatedPost.category}
                  </span>
                  <Link href={relatedHref as any} className="hover:text-[var(--color-primary)] transition-colors">
                    <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 leading-snug">
                      {relatedPost.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{relatedPost.date}</span>
                    <Link href={relatedHref as any} className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
                      {t('read_more')} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
