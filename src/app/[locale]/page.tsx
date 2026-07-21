import {getTranslations, setRequestLocale} from 'next-intl/server';
import FAQPageSchema from '@/components/FAQPageSchema';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ProductCarousel from '@/components/ProductCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';
import { siteConfig } from '@/config/siteConfig';
import { spinText } from '@/utils/textSpinner';
import { templatesEs } from '@/config/templatesEs';


export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Index');

  const products = [
    { title: t('service_1_title'), alt: t('service_1_alt'), img: '/images/estores-enrollables-medida.jpg' },
    { title: t('service_2_title'), alt: t('service_2_alt'), img: '/images/estor_screen_fiberglass.jpg' },
    { title: t('service_3_title'), alt: t('service_3_alt'), img: '/images/estores_opacos.jpg' },
    { title: t('service_4_title'), alt: t('service_4_alt'), img: '/images/estores-motorizados-domotica.jpg' },
    { title: t('service_5_title'), alt: t('service_5_alt'), img: '/images/estores-paqueto-salon.jpg' },
    { title: t('service_6_title'), alt: t('service_6_alt'), img: '/images/cortinas-medida-salon.jpg' },
  ];

  const processes = [
    { step: t('process_1_title'), desc: t('process_1_desc'), icon: '📝' },
    { step: t('process_2_title'), desc: t('process_2_desc'), icon: '⏱️' },
    { step: t('process_3_title'), desc: t('process_3_desc'), icon: '✅' },
    { step: t('process_4_title'), desc: t('process_4_desc'), icon: '📏' },
    { step: t('process_5_title'), desc: t('process_5_desc'), icon: '🛠️' },
  ];

  const values = [
    { title: t('value_1_title'), desc: t('value_1_desc'), icon: '🏭' },
    { title: t('value_2_title'), desc: t('value_2_desc'), icon: '📏' },
    { title: t('value_3_title'), desc: t('value_3_desc'), icon: '👨‍🔧' },
    { title: t('value_4_title'), desc: t('value_4_desc'), icon: '🗣️' },
  ];

  const reviews = [
    { text: t('review_1_text'), author: t('review_1_author'), city: t('review_1_city') },
    { text: t('review_2_text'), author: t('review_2_author'), city: t('review_2_city') },
    { text: t('review_3_text'), author: t('review_3_author'), city: t('review_3_city') },
  ];

  const faqs = [
    { q: t('faq_1_q'), a: t('faq_1_a') },
    { q: t('faq_2_q'), a: t('faq_2_a') },
    { q: t('faq_3_q'), a: t('faq_3_a') },
    { q: t('faq_4_q'), a: t('faq_4_a') },
    { q: t('faq_5_q'), a: t('faq_5_a') },
    { q: t('faq_6_q'), a: t('faq_6_a') },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <FAQPageSchema locale={locale} />
      
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="/images/hero-instalacion-estores-alicante.jpg"
          alt={t('h1')}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          
          <Breadcrumbs
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: locale === 'es' ? 'Producto' : 'Product' }
            ]}
            light
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md leading-tight">
            {locale === 'es' ? spinText(templatesEs.home.heroTitle) : t('h1')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium drop-shadow-md">
            {locale === 'es' ? spinText(templatesEs.home.heroSubtitle) : t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg">
              {t('hero_cta')}
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="bg-white hover:bg-gray-100 text-[#1A1A2E] font-bold py-4 px-8 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg">
              {locale === 'es' ? `Llamar al ${siteConfig.phoneFormatted}` : t('hero_cta_alt')}
            </a>
          </div>
          <p className="mt-8 text-sm md:text-base font-semibold text-yellow-400">
            {t('trust_signals')}
          </p>
        </div>
      </section>

      {/* 2. Values Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl mb-3">{v.icon}</span>
              <div className="text-lg font-bold text-[#1A1A2E]">{v.title}</div>
              <p className="text-sm text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A2E] mb-12">{t('services_title')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((p, i) => (
            <div key={i} className="group rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="relative h-40 sm:h-64 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-2xl font-bold text-[#1A1A2E] mb-2">{p.title}</h3>
                <Link href="/presupuesto" className="text-[var(--color-primary)] font-semibold text-sm sm:text-base hover:underline">
                  Ver más →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <ProductCarousel locale={locale} />

      {/* 4. SEO Content */}
      <section className="bg-gray-50 py-24 px-4 border-y border-gray-200">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Main Intro Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                {t('seo_h2_1')}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('seo_p_1')}
              </p>
            </div>
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-[#1A1A2E]">¿Qué incluye nuestro servicio?</h3>
              <div className="space-y-4">
                {[
                  { title: locale === 'es' ? 'Medición a domicilio gratis' : 'Free home measurement', desc: locale === 'es' ? 'Acudimos sin coste para tomar medidas' : 'We visit at no cost to take measurements', icon: '📏' },
                  { title: locale === 'es' ? 'Instalación profesional' : 'Professional installation', desc: locale === 'es' ? 'Olvídate de herramientas y manuales' : 'Forget about tools and manuals', icon: '🛠️' },
                  { title: locale === 'es' ? 'Garantía directa de taller' : 'Direct workshop guarantee', desc: locale === 'es' ? 'Materiales y mecanismos certificados' : 'Certified materials and mechanisms', icon: '🛡️' },
                  { title: locale === 'es' ? 'Atención Bilingüe' : 'Bilingual Support', desc: locale === 'es' ? 'Atendemos en español e inglés' : 'We serve in English and Spanish', icon: '🗣️' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="text-2xl p-2 bg-orange-50 text-[var(--color-primary)] rounded-lg">{item.icon}</span>
                    <div>
                      <div className="font-bold text-gray-900">{item.title}</div>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Types Grid */}
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">{t('seo_h3_1')}</h3>
              <p className="text-gray-600">{t('seo_p_2')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: locale === 'es' ? 'Estores Screen' : 'Screen Blinds', desc: locale === 'es' ? 'Protección solar ideal, reduce el calor y filtra rayos UV manteniendo la visibilidad exterior.' : 'Ideal sun protection, reduces heat and filters UV rays while keeping outdoor visibility.', icon: '☀️', tag: 'Top Ventas' },
                { title: locale === 'es' ? 'Estores Opacos' : 'Blackout Blinds', desc: locale === 'es' ? 'Bloqueo total de luz, proporcionando oscuridad absoluta para dormitorios y salas de proyección.' : 'Total light blocking, providing absolute darkness for bedrooms and media rooms.', icon: '🌙', tag: 'Dormitorios' },
                { title: locale === 'es' ? 'Estores Translúcidos' : 'Sheer Blinds', desc: locale === 'es' ? 'Tamizan la luz solar de forma suave y decorativa aportando una gran calidez a cualquier espacio.' : 'Filter sunlight in a soft and decorative way, bringing great warmth to any space.', icon: '💡', tag: 'Salones' },
                { title: locale === 'es' ? 'Estores Motorizados' : 'Motorised Blinds', desc: locale === 'es' ? 'Integración completa con sistemas de domótica, Alexa y Google Home para tu máxima comodidad.' : 'Complete integration with smart home systems, Alexa and Google Home for maximum comfort.', icon: '🔌', tag: 'Domótica' },
                { title: locale === 'es' ? 'Estores Térmicos' : 'Thermal Blinds', desc: locale === 'es' ? 'Materiales aislantes avanzados que ayudan a reducir significativamente la factura de aire acondicionado.' : 'Advanced insulating materials that help significantly reduce your air conditioning bill.', icon: '🌡️', tag: 'Ahorro' },
                { title: locale === 'es' ? 'Estores Sin Taladrar' : 'No-Drill Blinds', desc: locale === 'es' ? 'Instalación fácil por adhesivos o clips, la solución definitiva para inquilinos en pisos de alquiler.' : 'Easy installation using adhesives or clips, the definitive solution for tenants in rental properties.', icon: '🏢', tag: 'Sin Obras' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-4 right-4 bg-orange-50 text-[var(--color-primary)] text-xs font-bold px-2.5 py-1 rounded-full">
                    {item.tag}
                  </div>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                  <h4 className="text-xl font-bold text-[#1A1A2E] mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-gray-100">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">{t('seo_h3_2')}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{t('seo_p_3')}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: locale === 'es' ? 'Rápido' : 'Fast', desc: locale === 'es' ? 'Montaje en minutos' : 'Fitted in minutes', icon: '⚡' },
                { title: locale === 'es' ? 'Limpio' : 'Clean', desc: locale === 'es' ? 'Sin polvo ni suciedad' : 'No dust or mess', icon: '✨' },
                { title: locale === 'es' ? 'Garantizado' : 'Guaranteed', desc: locale === 'es' ? 'Instaladores certificados' : 'Certified installers', icon: '🛡️' },
                { title: locale === 'es' ? 'Seguro' : 'Safe', desc: locale === 'es' ? 'Soportes de alta resistencia' : 'Heavy-duty brackets', icon: '🔒' },
              ].map((benefit, idx) => (
                <div key={idx} className="bg-gray-50 p-5 rounded-xl text-center space-y-2 border border-gray-100">
                  <span className="text-3xl block">{benefit.icon}</span>
                  <div className="font-bold text-[#1A1A2E]">{benefit.title}</div>
                  <p className="text-xs text-gray-500">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location Coverage Details */}
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">{t('seo_h3_3')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('seo_p_4')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  city: 'Elche', 
                  sun: locale === 'es' ? 'Resistente a rayos UV intensos' : 'Resistant to intense UV rays',
                  type: locale === 'es' ? 'Ideal para villas y chalets' : 'Ideal for villas and chalets',
                  desc: locale === 'es' ? 'Soluciones robustas para grandes ventanales.' : 'Robust solutions for large windows.',
                  icon: '🌴',
                  href: '/elche'
                },
                { 
                  city: 'Benidorm', 
                  sun: locale === 'es' ? 'Tejidos anti-salinidad marina' : 'Anti-marine salinity fabrics',
                  type: locale === 'es' ? 'Apartamentos de alquiler vacacional' : 'Holiday rental apartments',
                  desc: locale === 'es' ? 'Protección solar screen frente al mar.' : 'Screen solar protection in front of the sea.',
                  icon: '🏖️',
                  href: '/benidorm'
                },
                { 
                  city: 'Torrevieja', 
                  sun: locale === 'es' ? 'Estores de bajo mantenimiento' : 'Low maintenance blinds',
                  type: locale === 'es' ? 'Especial para residentes extranjeros' : 'Special for foreign residents',
                  desc: locale === 'es' ? 'Atención multilingüe para tu tranquilidad.' : 'Multilingual service for your peace of mind.',
                  icon: '⛵',
                  href: '/torrevieja'
                },
              ].map((loc, idx) => (
                <Link key={idx} href={loc.href as any} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:border-[var(--color-primary)] hover:shadow-md transition-all block text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{loc.icon}</span>
                    <h4 className="text-xl font-bold text-[#1A1A2E]">{loc.city}</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span> {loc.sun}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span> {loc.type}
                    </li>
                  </ul>
                  <p className="text-xs text-gray-400 pt-2 border-t border-gray-50">{loc.desc}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Process */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A2E] mb-16">{t('process_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {processes.map((p, i) => (
            <div key={i} className="text-center relative z-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-16 h-16 bg-[#1A1A2E] text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{p.step}</h3>
              <p className="text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Reviews (Carousel) */}
      <ReviewsCarousel reviews={reviews} title={t('reviews_title')} />

      {/* 7. Coverage */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">{t('coverage_title')}</h2>
        <p className="text-lg text-gray-700 mb-6">{t('coverage_desc')}</p>
        <p className="text-xl font-semibold text-[var(--color-primary)]">{t('coverage_areas')}</p>
      </section>

      {/* 8. FAQs */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A2E] mb-12">{t('faq_title')}</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA with Background Image */}
      <section className="relative py-24 px-4 text-center text-white overflow-hidden">
        <Image
          src="/images/cta-background-estores.jpg"
          alt={t('cta_final_title')}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-md leading-tight">{t('cta_final_title')}</h2>
          <p className="text-xl mb-10 opacity-90 drop-shadow-md">{t('cta_final_desc')}</p>
          <Link href="/presupuesto" className="inline-block bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform hover:scale-105 shadow-xl">
            {t('hero_cta')}
          </Link>
        </div>
      </section>

      {/* 10. Contact Form */}
      <ContactForm />

    </main>
  );
}
