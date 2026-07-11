import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ProductCatalog from '@/components/ProductCatalog';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';

const NAMESPACE = 'CortinasEnrollables';
const BG_IMAGE = '/images/cortinas-enrollables-medida.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Cortinas Enrollables en Alicante | A medida con Instalación` : `Roller Curtains in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de cortinas enrollables a medida en Alicante. Estética minimalista con medición gratuita e instalación incluida.` : `Supply and installation of made to measure roller curtains in Alicante. Minimalist design, free measurement and installation included.`,
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Funcionalidad Moderna",
        "desc": "Combina el control preciso de luz de un estor con la estética minimalista y limpia de una cortina en Alicante.",
        "icon": "🔄",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Optimización de Espacio",
        "desc": "Se enrollan por completo en la parte superior, dejando libre todo el vano de la ventana.",
        "icon": "📏",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Higiene y Limpieza Rápida",
        "desc": "Tejidos técnicos lisos que no acumulan ácaros ni polvo, ideales para personas con alergias.",
        "icon": "🧼",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Modern Functionality",
        "desc": "Combines the precise light control of a blind with the clean, minimalist look of a curtain in Alicante.",
        "icon": "🔄",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Space Optimization",
        "desc": "They roll up completely at the top, leaving the window space entirely free.",
        "icon": "📏",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Hygienic & Fast Cleaning",
        "desc": "Technical smooth fabrics that do not collect dust mites or dust, ideal for allergy sufferers.",
        "icon": "🧼",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Buscábamos una cortina moderna y las enrollables screen en Alicante han sido un acierto absoluto.",
        "author": "Fernando T.",
        "city": "Alicante"
    },
    {
        "text": "Se limpian súper fácil y no ocupan nada de espacio. Instalación perfecta en nuestro chalet de Elche.",
        "author": "Paula M.",
        "city": "Elche"
    },
    {
        "text": "Muy prácticas para las habitaciones de los niños. El mecanismo de cadena es muy robusto.",
        "author": "Antonio R.",
        "city": "Alicante"
    }
]
    : [
    {
        "text": "We wanted a modern curtain, and the screen roller curtains in Alicante were a perfect hit.",
        "author": "Fernando T.",
        "city": "Alicante"
    },
    {
        "text": "They are super easy to clean and take up no space. Perfect installation in our Elche villa.",
        "author": "Paula M.",
        "city": "Elche"
    },
    {
        "text": "Very practical for children's bedrooms. The chain mechanism is highly robust.",
        "author": "Antonio R.",
        "city": "Alicante"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Qué diferencia hay entre cortina enrollable y estor enrollable?",
        "a": "En la práctica se refieren al mismo producto en el sector de la protección solar: un tubo superior que enrolla un tejido técnico mediante cadena o motor."
    },
    {
        "q": "¿Ofrecéis garantía de vuestras cortinas enrollables en Alicante?",
        "a": "Sí, todos nuestros productos cuentan con una garantía de 3 años ante cualquier fallo de los mecanismos o defectos de confección."
    },
    {
        "q": "¿Se pueden motorizar estas cortinas enrollables?",
        "a": "Totalmente. Podemos integrar motores tubulares a batería o cableados en el interior del tubo enrollador para accionamiento domótico o por mando."
    }
]
    : [
    {
        "q": "What is the difference between a roller curtain and a roller blind?",
        "a": "In practice, they refer to the same product in the sun protection industry: an upper tube that rolls up a fabric via a chain or motor."
    },
    {
        "q": "Do you offer a warranty on your roller curtains in Alicante?",
        "a": "Yes, all our products come with a 3-year warranty against any mechanism failure or manufacturing defects."
    },
    {
        "q": "Can these roller curtains be motorized?",
        "a": "Absolutely. We can integrate battery or wired tubular motors inside the roller tube for smart home or remote control operation."
    }
];

  return (
    <main className="flex min-h-screen flex-col bg-white">
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
              { label: locale === 'es' ? 'Cortinas Enrollables' : 'Roller Curtains' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Cortinas Enrollables a Medida en Alicante` : `Custom Roller Curtains in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `La funcionalidad del estor con la elegancia de la cortina en Alicante. Se enrollan ocupando el mínimo espacio y se limpian con facilidad.` : `The functionality of the blind with the elegance of the curtain in Alicante. They roll up taking minimum space and are easy to clean.`}
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
        initialCategory="all" 
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
            {locale === 'es' ? `Cortinas Enrollables a Medida: Diseño Moderno en Alicante` : `Custom Roller Curtains: Modern Design in Alicante`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Funcionalidad minimalista e higiene para ventanas` : `Minimalist functionality and hygiene for windows`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Las cortinas enrollables combinan la limpieza de líneas de un estor con la ligereza de una cortina. Son ideales para viviendas modernas en Alicante ya que no acumulan ácaros ni polvo y se limpian pasando sencillamente un paño húmedo. Disponibles en tejidos screen, translúcidos y opacos, son una alternativa compacta y práctica para cocinas, dormitorios infantiles o despachos.` : `Roller curtains combine the clean lines of a blind with the lightness of a curtain. They are ideal for modern homes in Alicante since they do not accumulate dust mites or dust and are cleaned simply by wiping with a damp cloth. Available in screen, translucent, and blackout fabrics, they are a compact and practical alternative for kitchens, children’s bedrooms, or offices.`}
          </p>
        </div>
      </section>
    </main>
  );
}
