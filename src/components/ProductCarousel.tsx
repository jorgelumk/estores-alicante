'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { products } from '@/data/products';

export default function ProductCarousel({ locale }: { locale: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Seleccionamos los primeros 5 productos
  const carouselProducts = products.slice(0, 5);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by one card width (assuming 320px + gap)
      const scrollAmount = clientWidth > 768 ? clientWidth / 3 : clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
            {locale === 'es' ? 'Los Más Visitados' : 'Most Visited Products'}
          </h2>
          <p className="text-gray-600">
            {locale === 'es'
              ? 'Descubre nuestra selección de estores favoritos por nuestros clientes.'
              : 'Discover our selection of blinds most loved by our customers.'}
          </p>
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg text-[#1A1A2E] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all ${!canScrollLeft ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
          >
            <span className="text-2xl leading-none">&lsaquo;</span>
          </button>
          
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg text-[#1A1A2E] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all ${!canScrollRight ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
          >
            <span className="text-2xl leading-none">&rsaquo;</span>
          </button>

          {/* Carousel Container */}
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {carouselProducts.map((p) => (
              <div key={p.id} className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start flex-none bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {p.discount && (
                    <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {p.discount}
                    </span>
                  )}
                  {p.isNoDrill && (
                    <span className="absolute top-4 right-4 z-10 bg-[#1A1A2E] text-white text-[10px] font-bold px-2 py-1 rounded">
                      {locale === 'es' ? '¡Sin Taladrar!' : 'No-Drill!'}
                    </span>
                  )}
                  <Image
                    src={p.image}
                    alt={locale === 'es' ? p.name.es : p.name.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                      <span>{locale === 'es' ? p.categoryLabel.es : p.categoryLabel.en}</span>
                      <span className="text-yellow-500">★ {p.rating} ({p.reviewsCount})</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#1A1A2E] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                      <Link href={`/${p.slug}` as any}>
                        {locale === 'es' ? p.name.es : p.name.en}
                      </Link>
                    </h3>
                    <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-50">
                      {p.aperture && (
                        <div><strong>{locale === 'es' ? 'Apertura:' : 'Openness:'}</strong> {p.aperture}</div>
                      )}
                      <div><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong> {locale === 'es' ? p.visibility.es : p.visibility.en}</div>
                      <div><strong>{locale === 'es' ? 'Privacidad:' : 'Privacy:'}</strong> {locale === 'es' ? p.privacy.es : p.privacy.en}</div>
                      <div className="truncate"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong> {p.composition}</div>
                      <div><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong> {locale === 'es' ? p.drive.es : p.drive.en}</div>
                      <div><strong>{locale === 'es' ? 'Envío:' : 'Shipping:'}</strong> {locale === 'es' ? p.shipping.es : p.shipping.en}</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2 justify-between">
                      <span className="text-xs text-gray-400">{locale === 'es' ? 'Desde:' : 'From:'}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#1A1A2E]">
                          {p.price.toFixed(2)}€
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {p.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/${p.slug}` as any}
                      className="block text-center w-full bg-[#1A1A2E] hover:bg-[var(--color-primary)] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
                    >
                      {locale === 'es' ? 'Personalizar y Comprar' : 'Customize & Buy'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
