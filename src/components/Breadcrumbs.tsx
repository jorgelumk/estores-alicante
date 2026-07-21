import { Link } from '@/i18n/routing';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean; // If true, optimized for dark backgrounds (white text)
}

import { useLocale } from 'next-intl';

export default function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  const locale = useLocale();
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className={`flex mb-6 text-xs md:text-sm font-semibold tracking-wide justify-center ${
        light ? 'text-white/90' : 'text-gray-600'
      }`} 
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2.5">
        {items.map((item, index) => {
          const isHome = item.href === '/' || item.label.toLowerCase() === 'inicio' || item.label.toLowerCase() === 'home';
          const displayLabel = isHome ? (locale === 'en' ? 'Alicante Blinds' : 'Estores Alicante') : item.label;
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className={`mx-1.5 md:mx-2.5 select-none ${light ? 'text-white/50' : 'text-gray-400'}`}>/</span>
              )}
              {isLast || !item.href ? (
                <span className={light ? 'text-white font-black' : 'text-[#1A1A2E] font-black'} aria-current="page">
                  {displayLabel}
                </span>
              ) : (
                <Link
                  href={item.href as any}
                  className={`transition-colors duration-200 ${
                    light ? 'hover:text-white underline decoration-white/35 underline-offset-4' : 'hover:text-[var(--color-primary)]'
                  }`}
                >
                  {displayLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
