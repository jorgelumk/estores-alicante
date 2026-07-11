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

const NAMESPACE = 'EstoresScreen';
const BG_IMAGE = '/images/estor_screen_fiberglass.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estores Screen en Alicante | A medida con Instalación` : `Screen Blinds in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de estores screen a medida en Alicante. Calidad directa de taller, medición gratuita e instalación incluida.` : `Supply and installation of made to measure screen blinds in Alicante. Direct workshop quality, free measurement and installation included.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-screen`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-screen' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-screen');
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Filtro Solar Avanzado",
        "desc": "Bloquea hasta el 95% de los rayos UV sin oscurecer tu estancia en Alicante.",
        "icon": "☀️",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Visibilidad Exterior",
        "desc": "Disfruta de las vistas de la Costa Blanca manteniendo tu privacidad interior.",
        "icon": "👁️",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Ahorro Energético",
        "desc": "Reduce la temperatura interior y ahorra hasta un 30% en aire acondicionado en Alicante.",
        "icon": "⚡",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Advanced Solar Filter",
        "desc": "Blocks up to 95% of UV rays without darkening your room in Alicante.",
        "icon": "☀️",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Exterior Visibility",
        "desc": "Enjoy Costa Blanca views while keeping complete privacy inside.",
        "icon": "👁️",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Energy Savings",
        "desc": "Reduce indoor temperature and save up to 30% on air conditioning in Alicante.",
        "icon": "⚡",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Los estores screen de fibra de vidrio son espectaculares para el sol de Alicante. La temperatura del salón ha bajado notablemente.",
        "author": "Ramón G.",
        "city": "Alicante"
    },
    {
        "text": "Instalamos screen del 1% en la oficina en Elche. Cero reflejos en las pantallas y una luz natural ideal.",
        "author": "Marta B.",
        "city": "Elche"
    },
    {
        "text": "El servicio técnico impecable. Nos recomendaron el screen de apertura 5% para no perder las vistas al mar en Benidorm.",
        "author": "David L.",
        "city": "Benidorm"
    }
]
    : [
    {
        "text": "The fiberglass screen blinds are amazing against the Alicante sun. The living room temperature dropped significantly.",
        "author": "Ramón G.",
        "city": "Alicante"
    },
    {
        "text": "We installed 1% screen blinds in our office in Elche. Zero glare on screens and perfect natural light.",
        "author": "Marta B.",
        "city": "Elche"
    },
    {
        "text": "Impeccable service. They recommended 5% openness so we wouldn't lose our sea views in Benidorm.",
        "author": "David L.",
        "city": "Benidorm"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Qué es el grado de apertura en un estor screen?",
        "a": "Es el porcentaje de tejido microperforado que determina la transparencia y paso de luz. Un 1% ofrece visibilidad baja y privacidad alta, mientras que un 5% da visibilidad media permitiendo ver más el exterior."
    },
    {
        "q": "¿Cómo protegen los estores screen del calor en Alicante?",
        "a": "Gracias a su composición que combina PVC y fibra de vidrio o poliéster, el tejido screen refleja la radiación solar infrarroja antes de que entre al hogar, reduciendo la temperatura de forma drástica."
    },
    {
        "q": "¿Se pueden ver las vistas del exterior con estos estores?",
        "a": "Sí, durante el día la visibilidad hacia el exterior es excelente gracias al efecto de filtro solar, mientras que desde fuera no se puede ver nada hacia el interior."
    }
]
    : [
    {
        "q": "What is the openness factor in a screen blind?",
        "a": "It is the percentage of micro-perforated fabric that determines transparency and light entry. 1% offers low visibility and high privacy, while 5% provides medium visibility letting you see more of the outside."
    },
    {
        "q": "How do screen blinds protect from heat in Alicante?",
        "a": "Due to their composition of PVC and fiberglass or polyester, screen fabrics reflect infrared solar radiation before it enters the home, dramatically reducing indoor temperatures."
    },
    {
        "q": "Can I see outside through these blinds?",
        "a": "Yes, during the day you have excellent outside visibility due to the solar filter effect, while people outside cannot see inside."
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
              { label: locale === 'es' ? 'Estores Screen' : 'Screen Blinds' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Estores Screen a Medida en Alicante` : `Custom Screen Blinds in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `La protección solar ideal para la Costa Blanca. Filtra el calor y la luz intensa de Alicante sin perder las vistas al exterior.` : `The perfect solar protection for the Costa Blanca. Filter heat and intense light in Alicante while keeping your views of the outside.`}
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
        initialCategory="screen" 
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
            {locale === 'es' ? `Comprar Estores Screen a Medida en Alicante con Máxima Protección Solar` : `Buy Custom Screen Blinds in Alicante for Maximum Solar Protection`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Filtro solar y visibilidad en tu ventana` : `Solar filter and visibility in your window`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Si buscas reducir el calor sin perder la luminosidad ni las vistas al exterior en Alicante, los estores enrollables screen son la solución perfecta. Fabricados con materiales compuestos de fibra de vidrio y PVC, actúan como un escudo térmico ideal para viviendas orientadas al sol y en zonas costeras como San Juan o Benidorm. Personaliza el grado de apertura (5% para mayor visibilidad o 1% para más opacidad y protección contra reflejos) y disfruta de un ambiente más fresco de forma del todo natural.` : `If you want to reduce heat without losing brightness or outside views in Alicante, screen roller blinds are the perfect solution. Made with fiberglass and PVC materials, they act as an ideal heat shield for sun-oriented homes and coastal areas like San Juan or Benidorm. Customize the openness factor (5% for more visibility or 1% for more opacity and glare protection) and enjoy a cooler environment naturally.`}
          </p>
        </div>
      </section>
    </main>
  );
}
