import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ProductCatalog from '@/components/ProductCatalog';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSchema from '@/components/ProductSchema';
import { products } from '@/data/products';

const NAMESPACE = 'EstoresOpacos';
const BG_IMAGE = '/images/opaco_oslo.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estores Opacos en Alicante | A medida con Instalación` : `Blackout Blinds in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de estores opacos a medida en Alicante. Consigue oscuridad total, medición gratuita e instalación incluida.` : `Supply and installation of made to measure blackout blinds in Alicante. Complete darkness, free measurement and installation included.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-opacos`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-opacos' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-opacos');
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Bloqueo de Luz 100%",
        "desc": "Oscuridad total garantizada a cualquier hora del día en tu dormitorio en Alicante.",
        "icon": "🌙",
        "color": "bg-indigo-50 text-indigo-600"
    },
    {
        "title": "Privacidad Absoluta",
        "desc": "Impide por completo la visibilidad hacia el interior, tanto de día como de noche.",
        "icon": "🔒",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Aislamiento Térmico",
        "desc": "Barrera eficaz que frena el calor del verano alicantino y retiene el calor en invierno.",
        "icon": "🌡️",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "100% Light Blockout",
        "desc": "Total darkness guaranteed at any time of day in your Alicante bedroom.",
        "icon": "🌙",
        "color": "bg-indigo-50 text-indigo-600"
    },
    {
        "title": "Absolute Privacy",
        "desc": "Completely blocks any views inside, both day and night.",
        "icon": "🔒",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Thermal Barrier",
        "desc": "An effective barrier that stops Alicante summer heat and retains indoor warmth in winter.",
        "icon": "🌡️",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Buscábamos oscuridad total para el dormitorio principal en Alicante y con el estor opaco Oslo lo hemos conseguido. Descanso perfecto.",
        "author": "Julia R.",
        "city": "Alicante"
    },
    {
        "text": "Ideales para mi estudio de fotografía en Elche. Bloquean la luz al 100% a cualquier hora.",
        "author": "Óscar P.",
        "city": "Elche"
    },
    {
        "text": "El tejido opaco de fibra de vidrio y PVC se nota muy robusto. La instalación en Torrevieja fue rápida y limpia.",
        "author": "Sarah T.",
        "city": "Torrevieja"
    }
]
    : [
    {
        "text": "We wanted total darkness for the master bedroom in Alicante and we achieved it with the Oslo blackout blind. Perfect rest.",
        "author": "Julia R.",
        "city": "Alicante"
    },
    {
        "text": "Ideal for my photography studio in Elche. They block light 100% at any time.",
        "author": "Óscar P.",
        "city": "Elche"
    },
    {
        "text": "The fiberglass and PVC blackout fabric feels very robust. Installation in Torrevieja was fast and clean.",
        "author": "Sarah T.",
        "city": "Torrevieja"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Los estores opacos aíslan térmicamente del calor en Alicante?",
        "a": "Sí, al bloquear el paso directo de la luz solar y la radiación infrarroja, impiden que el cristal caliente el interior de la habitación, actuando como aislante."
    },
    {
        "q": "¿Cómo se limpian los estores opacos?",
        "a": "Los tejidos opacos fabricados con PVC y fibra de vidrio son extremadamente fáciles de limpiar. Se pueden lavar directamente frotando suavemente con un paño húmedo y jabón neutro."
    },
    {
        "q": "¿Son adecuados para dormitorios sin persianas?",
        "a": "Son la solución ideal. Reemplazan la función de la persiana ofreciendo opacidad completa y máxima intimidad."
    }
]
    : [
    {
        "q": "Do blackout blinds insulate from heat in Alicante?",
        "a": "Yes, by blocking direct sunlight and infrared radiation, they prevent the glass from heating the interior of the room, acting as an insulator."
    },
    {
        "q": "How do you clean blackout blinds?",
        "a": "Blackout fabrics made of PVC and fiberglass are extremely easy to clean. You can wipe them down gently with a damp cloth and mild soap."
    },
    {
        "q": "Are they suitable for bedrooms without shutters?",
        "a": "They are the ideal solution. They replace the shutter functionality, offering complete opacity and maximum privacy."
    }
];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt={t('h1')}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-white space-y-6">
          <Breadcrumbs
            light
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: locale === 'es' ? 'Estores Opacos' : 'Blackout Blinds' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Estores Opacos a Medida en Alicante` : `Custom Blackout Blinds in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `Consigue oscuridad total y privacidad absoluta en Alicante. La solución perfecta para dormitorios y salas de cine sin persianas.` : `Achieve total darkness and absolute privacy in Alicante. The perfect solution for bedrooms and media rooms without shutters.`}
          </p>
          <div className="pt-4">
            <Link href="/presupuesto" className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg inline-block">
              {t('cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick badges */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: locale === 'es' ? 'Medición Gratis' : 'Free Measurement', icon: '📐' },
            { label: locale === 'es' ? 'Instalación Incluida' : 'Installation Included', icon: '🛠️' },
            { label: locale === 'es' ? 'Confección a Medida' : 'Custom Confection', icon: '🪡' },
            { label: locale === 'es' ? '3 Años de Garantía' : '3-Year Warranty', icon: '🛡️' }
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 bg-white py-3 px-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-bold text-gray-800 text-sm md:text-base">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Catalog Section */}
      <ProductCatalog 
        locale={locale} 
        initialCategory="opaco" 
        initialNoDrill="all"
        hideFilters={false}
      />

      {/* 3. Advantages Section (Visual & Detailed) */}
      <section className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
              {locale === 'es' ? 'Ventajas destacadas de nuestros estores' : 'Key Advantages of Our Blinds'}
            </h2>
            <p className="text-gray-500">
              {locale === 'es' 
                ? 'Conoce por qué nuestros estores a medida en Alicante son la opción preferida para vestir ventanas con estilo y funcionalidad.'
                : 'Learn why our custom-made blinds in Alicante are the preferred choice for styling windows with performance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((b, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold">
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A2E] leading-snug">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className="pt-4">
                  <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
                    {locale === 'es' ? 'Garantía de calidad' : 'Quality guaranteed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-extrabold text-center text-[#1A1A2E] mb-16">{t('features_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '✨', title: t('feature_1_title'), desc: t('feature_1_desc') },
            { icon: '📐', title: t('feature_2_title'), desc: t('feature_2_desc') },
            { icon: '🛠️', title: t('feature_3_title'), desc: t('feature_3_desc') },
            { icon: '🛡️', title: t('feature_4_title'), desc: t('feature_4_desc') }
          ].map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <span className="block text-4xl mb-4">{feat.icon}</span>
              <h3 className="text-xl font-bold mb-3 text-[#1A1A2E]">{feat.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Process Steps */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-[#1A1A2E] mb-16">{t('process_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: t('step_1_title'), desc: t('step_1_desc'), icon: '📐' },
            { step: '2', title: t('step_2_title'), desc: t('step_2_desc'), icon: '🪡' },
            { step: '3', title: t('step_3_title'), desc: t('step_3_desc'), icon: '🛠️' }
          ].map((item) => (
            <div key={item.step} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative group">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#1A1A2E] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border-4 border-white group-hover:bg-[var(--color-primary)] transition-colors">
                {item.step}
              </div>
              <div className="text-3xl mt-4 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#1A1A2E]">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Reviews (Carousel) */}
      <ReviewsCarousel reviews={reviews} title={locale === 'es' ? 'Lo que opinan nuestros clientes en Alicante' : 'What our customers in Alicante say'} />

      {/* 7. FAQs Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] text-center mb-16">
            {locale === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details 
                key={i} 
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:ring-1 open:ring-[var(--color-primary)]"
              >
                <summary className="flex justify-between items-center font-extrabold text-base md:text-lg text-[#1A1A2E] cursor-pointer outline-none select-none">
                  <span>{faq.q}</span>
                  <span className="text-[var(--color-primary)] transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed border-t pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Form */}
      <ContactForm />
    
      {/* 9. SEO Content Section */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-[#1A1A2E]">
            {locale === 'es' ? `Oscuridad y Confort Térmico en Alicante con Estores Enrollables Opacos` : `Darkness and Thermal Comfort in Alicante with Blackout Roller Blinds`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `La solución definitiva para dormitorios sin persianas` : `The definitive solution for bedrooms without shutters`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Los estores opacos a medida en Alicante son indispensables para conseguir un descanso óptimo bloqueando el 100% de la luz solar y farolas exteriores. Fabricados con tejidos blackout de alta densidad (como el modelo Oslo), ofrecen privacidad absoluta tanto de día como de noche. Ideales para estancias con alta exposición solar donde se busca no solo oscuridad sino también aislamiento contra el calor en verano y el frío invernal.` : `Made-to-measure blackout blinds in Alicante are essential to achieve optimal rest by blocking 100% of solar light and street lamps. Made with high-density blackout fabrics (like the Oslo model), they offer absolute privacy day and night. Ideal for rooms with high sun exposure where you seek not only darkness but also insulation against summer heat and winter cold.`}
          </p>
        </div>
      </section>
    </main>
  );
}
