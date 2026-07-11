import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { postsDataEs, postsDataEn } from '@/data/blog/posts';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? 'Blog de Estores y Cortinas | Estores Alicante' : 'Blinds & Curtains Blog | Estores Alicante',
    description: locale === 'es' 
      ? 'Consejos, guías e inspiración sobre estores a medida, cortinas y la decoración de ventanas en tu hogar en Alicante.'
      : 'Tips, guides and inspiration on made to measure blinds, curtains and window dressing in your home in Alicante.',
  };
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Blog');

  const isEs = locale === 'es';
  
  // Dynamically build post listing based on the imported postsDataEs / postsDataEn
  const sourceData = isEs ? postsDataEs : postsDataEn;
  const posts = Object.entries(sourceData).map(([slug, post], index) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    readTime: post.readTime,
    image: post.image,
    slug: slug,
    published: true
  }));

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A2E] to-[#252542] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumbs
            items={[
              { label: isEs ? 'Inicio' : 'Home', href: '/' },
              { label: 'Blog' }
            ]}
            light
          />
          <span className="inline-block bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 mt-4">
            {isEs ? 'Blog y Consejos' : 'Blog & Tips'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {t('h1')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? 'Consejos, guías y novedades sobre estores, cortinas y protección solar para tu hogar en Alicante.'
              : t('description')}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 border-b border-gray-100 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          {[
            { num: posts.length.toString(), label: isEs ? 'Artículos' : 'Articles' },
            { num: '5+', label: isEs ? 'Categorías' : 'Categories' },
            { num: isEs ? 'Gratis' : 'Free', label: isEs ? 'Sin registro' : 'No sign-up' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-2xl font-black text-[var(--color-primary)]">{stat.num}</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grid of Posts */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const postHref = `/blog/${post.slug}`;
            const isComingSoon = !post.published;

            return (
              <article key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col h-full group transition-all duration-300">
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-[var(--color-primary)] bg-orange-50 uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#1A1A2E] mb-3 leading-snug group-hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                    <Link href={postHref}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <Link href={postHref} className="text-sm font-bold text-[var(--color-primary)] hover:underline">
                      {t('read_more')} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#1A1A2E] to-[#252542] py-16 px-4 md:px-8 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
          {isEs ? '¿Necesitas asesoramiento profesional?' : 'Need professional advice?'}
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          {isEs
            ? 'Nuestros expertos te guiarán para elegir el estor perfecto para cada estancia de tu hogar.'
            : 'Our experts will guide you to choose the perfect blind for every room in your home.'}
        </p>
        <Link
          href="/presupuesto"
          className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-xl inline-block"
          style={{ color: '#ffffff' }}
        >
          {isEs ? 'Solicitar Presupuesto Gratis' : 'Request Free Quote'}
        </Link>
      </section>
    </main>
  );
}
