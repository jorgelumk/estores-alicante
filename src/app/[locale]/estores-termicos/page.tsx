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

const NAMESPACE = 'EstoresTermicos';
const BG_IMAGE = '/images/estores-termicos-aislantes.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estores Térmicos en Alicante | A medida con Instalación` : `Thermal Blinds in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de estores térmicos a medida en Alicante. Ahorro energético y aislamiento con medición gratuita e instalación incluida.` : `Supply and installation of made to measure thermal blinds in Alicante. Energy saving and insulation, free measurement and installation included.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-termicos`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-termicos' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-termicos');
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Aislamiento Frente al Calor",
        "desc": "Bloquea la entrada de radiación infrarroja solar durante los calurosos veranos de Alicante.",
        "icon": "🌡️",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Ahorro en Calefacción",
        "desc": "Actúa como barrera aislante en invierno evitando fugas de temperatura por el cristal.",
        "icon": "❄️",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Eficiencia Real",
        "desc": "Reduce de forma drástica el tiempo de uso del aire acondicionado y de la calefacción en Alicante.",
        "icon": "💰",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Heat Insulation",
        "desc": "Blocks solar infrared radiation entry during the hot Alicante summers.",
        "icon": "🌡️",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Heating Savings",
        "desc": "Acts as an insulating barrier in winter, preventing temperature leaks through the glass.",
        "icon": "❄️",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Real Efficiency",
        "desc": "Drastically reduces air conditioning and heating runtime in Alicante.",
        "icon": "💰",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Se nota muchísimo en el salón orientado al sur en Alicante. El cristal quema, pero el estor térmico frena todo el calor.",
        "author": "Manuel P.",
        "city": "Alicante"
    },
    {
        "text": "Gran ahorro de energía. En verano el aire acondicionado arranca la mitad de tiempo. Instalados en Elche.",
        "author": "Beatriz R.",
        "city": "Elche"
    },
    {
        "text": "Excelente asesoramiento técnico sobre la fibra de vidrio. El estor térmico nos ha solucionado el calor en Torrevieja.",
        "author": "Thomas W.",
        "city": "Torrevieja"
    }
]
    : [
    {
        "text": "It is very noticeable in our south-facing living room in Alicante. The glass burns, but the thermal blind stops all the heat.",
        "author": "Manuel P.",
        "city": "Alicante"
    },
    {
        "text": "Great energy savings. In summer, the air con runs half the time. Installed in Elche.",
        "author": "Beatriz R.",
        "city": "Elche"
    },
    {
        "text": "Excellent technical advice on fiberglass. The thermal blind solved our heat issues in Torrevieja.",
        "author": "Thomas W.",
        "city": "Torrevieja"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Cómo aísla térmicamente un estor?",
        "a": "Los estores térmicos están fabricados con tejidos técnicos compuestos por Fibra de Vidrio y PVC. Estos materiales tienen una conductividad térmica bajísima, por lo que absorben y disipan la radiación antes de que caliente el aire interior."
    },
    {
        "q": "¿Cuánto se puede llegar a ahorrar en aire acondicionado?",
        "a": "Estudios técnicos demuestran que un estor térmico screen o blackout de alta calidad puede reducir la temperatura interior en hasta 5ºC, lo que supone un ahorro de hasta el 30% en climatización."
    },
    {
        "q": "¿Hay modelos térmicos translúcidos?",
        "a": "La mayor eficacia térmica se consigue con estores opacos (barrera total) o screen con fibra de vidrio gruesa. Los modelos translúcidos sencillos ofrecen un aislamiento menor."
    }
]
    : [
    {
        "q": "How does a blind insulate thermally?",
        "a": "Thermal blinds are made with technical fabrics containing Fiberglass and PVC. These materials have very low thermal conductivity, absorbing and dissipating radiation before it heats the indoor air."
    },
    {
        "q": "How much can be saved on air conditioning?",
        "a": "Technical studies show that a high-quality thermal screen or blackout blind can reduce indoor temperatures by up to 5°C, representing savings of up to 30% on air conditioning."
    },
    {
        "q": "Are there translucent thermal options?",
        "a": "The highest thermal efficacy is achieved with blackout blinds (total barrier) or fiberglass screen blinds. Simple translucent models offer less insulation."
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
              { label: locale === 'es' ? 'Estores Térmicos' : 'Thermal Blinds' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Estores Térmicos a Medida en Alicante` : `Custom Thermal Blinds in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `Frena el calor del verano y el frío del invierno en Alicante. Reduce de forma real tu consumo de luz con estores térmicos de alta eficiencia.` : `Stop summer heat and winter cold in Alicante. Reduce your electricity bill with highly efficient thermal blinds.`}
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
        initialCategory="termicos" 
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
            {locale === 'es' ? `Ahorro Energético y Aislamiento con Estores Térmicos en Alicante` : `Energy Savings and Insulation with Thermal Blinds in Alicante`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Protección contra las temperaturas extremas de la Costa Blanca` : `Protection against the extreme temperatures of the Costa Blanca`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Los estores térmicos a medida (como los modelos confeccionados en fibra de vidrio y PVC) son el mejor aliado para combatir el calor extremo de los veranos de Alicante. Actúan bloqueando la radiación infrarroja solar, manteniendo las estancias hasta 5ºC más frescas de forma natural y permitiendo un ahorro directo de hasta el 30% en aire acondicionado. También reducen las fugas de calor en invierno.` : `Custom thermal blinds (like models made of fiberglass and PVC) are the best ally to fight the extreme heat of Alicante summers. They act by blocking solar infrared radiation, keeping rooms up to 5°C cooler naturally and allowing direct savings of up to 30% on air conditioning. They also reduce heat leaks in winter.`}
          </p>
        </div>
      </section>
    </main>
  );
}
