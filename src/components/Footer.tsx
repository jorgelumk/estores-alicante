import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  const t = useTranslations('Footer');
  const h = useTranslations('Header');

  const products = [
    { key: 'product_1', href: '/estores-enrollables' },
    { key: 'product_2', href: '/estores-screen' },
    { key: 'product_3', href: '/estores-opacos' },
    { key: 'product_4', href: '/estores-traslucidos' },
    { key: 'product_5', href: '/estores-motorizados' },
    { key: 'product_6', href: '/estores-sin-taladrar' },
    { key: 'product_7', href: '/estores-termicos' },
    { key: 'product_8', href: '/estores-paqueto' },
    { key: 'product_9', href: '/cortinas' },
    { key: 'product_10', href: '/cortinas-enrollables' },
  ];

  const cities = [
    { key: 'city_1', href: '/' },
    { key: 'city_2', href: '/elche' },
    { key: 'city_3', href: '/benidorm' },
    { key: 'city_4', href: '/torrevieja' },
  ];

  return (
    <footer className="bg-[#0f1623] text-white mt-auto">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] via-orange-400 to-[var(--color-primary)]" />

      {/* Main footer grid */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Column 1 — Brand */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-black text-base shadow-lg">E</div>
            <span className="text-xl font-black tracking-tight">{h('home')}</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            {t('about')}
          </p>
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
            {t('tagline')}
          </p>

          {/* Contact info */}
          <div className="space-y-2 pt-2">
            <a href={`tel:+34${siteConfig.phone}`} className="flex items-center gap-2.5 text-gray-300 text-sm hover:text-white transition-colors group">
              <span className="w-7 h-7 rounded-md bg-white/5 group-hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors">
                📞
              </span>
              {t('phone')}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-gray-300 text-sm hover:text-white transition-colors group">
              <span className="w-7 h-7 rounded-md bg-white/5 group-hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors">
                ✉️
              </span>
              {t('email')}
            </a>
            <p className="flex items-center gap-2.5 text-gray-400 text-sm">
              <span className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center">🕐</span>
              {t('schedule')}
            </p>
          </div>
        </div>

        {/* Column 2 — Products */}
        <div>
          <div className="text-sm font-extrabold uppercase tracking-widest text-gray-200 mb-5 pb-3 border-b border-white/10">
            {t('products_title')}
          </div>
          <ul className="space-y-2">
            {products.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href as Parameters<typeof Link>[0]['href']}
                  className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Cities */}
        <div>
          <div className="text-sm font-extrabold uppercase tracking-widest text-gray-200 mb-5 pb-3 border-b border-white/10">
            {t('cities_title')}
          </div>
          <ul className="space-y-2">
            {cities.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href as Parameters<typeof Link>[0]['href']}
                  className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Company & Legal */}
        <div>
          <div className="text-sm font-extrabold uppercase tracking-widest text-gray-200 mb-5 pb-3 border-b border-white/10">
            {t('links_title')}
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/quienes-somos" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('about_us')}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('blog')}
              </Link>
            </li>
            <li>
              <Link href="/presupuesto" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('quote')}
              </Link>
            </li>
            <li>
              <Link href="/mapa-del-sitio" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('sitemap')}
              </Link>
            </li>
          </ul>

          <div className="text-sm font-extrabold uppercase tracking-widest text-gray-200 mt-8 mb-5 pb-3 border-b border-white/10">
            {t('legal_title')}
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/aviso-legal" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('aviso_legal')}
              </Link>
            </li>
            <li>
              <Link href="/aviso-legal" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/aviso-legal" className="text-gray-400 text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0" />
                {t('cookies')}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {h('home')}. {t('rights')}</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Alicante · Elche · Benidorm · Torrevieja
          </p>
        </div>
      </div>
    </footer>
  );
}
