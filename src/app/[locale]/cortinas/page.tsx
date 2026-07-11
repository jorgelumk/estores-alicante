import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import ProductCatalog from '@/components/ProductCatalog';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';

const NAMESPACE = 'Cortinas';
const BG_IMAGE = '/images/cortinas-medida-salon.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Cortinas a Medida en Alicante | Instalación Profesional` : `Custom Curtains in Alicante | Professional Installation`,
    description: locale === 'es' ? `Confección e instalación de cortinas a medida en Alicante. Gran variedad de tejidos, barras y rieles con medición gratuita e instalación incluida.` : `Supply and installation of made to measure curtains in Alicante. Wide variety of fabrics, rods and tracks, free measurement and installation included.`,
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Confección Artesanal",
        "desc": "Cortinas cosidas a la medida exacta de tus techos y ventanas en Alicante para una caída y vuelo perfectos.",
        "icon": "🪡",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Control Solar Decorativo",
        "desc": "Combina visillos translúcidos para el día con cortinas opacas para conseguir oscuridad total.",
        "icon": "☀️",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Cabezales Personalizados",
        "desc": "Ojales metálicos, onda perfecta, pliegues o tablas adaptadas a tu barra o riel decorativo.",
        "icon": "🎭",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Tailored Craftsmanship",
        "desc": "Curtains sewn to the exact measurements of your ceilings and windows in Alicante for a perfect gather and drape.",
        "icon": "🪡",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Decorative Solar Control",
        "desc": "Combine sheer translucent curtains for the day with heavy blackout drapes for total darkness.",
        "icon": "☀️",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Custom Headers",
        "desc": "Metal eyelets, wave fold, pinch pleats, or tab tops adapted to your decorative rod or track.",
        "icon": "🎭",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Confeccionaron unas cortinas de visillo a medida para mi salón de Alicante y han quedado de revista.",
        "author": "Isabel H.",
        "city": "Alicante"
    },
    {
        "text": "Las cortinas de terciopelo grueso que nos instalaron en Elche aíslan el frío y visten la estancia de forma espectacular.",
        "author": "Ricardo S.",
        "city": "Elche"
    },
    {
        "text": "Excelente trato y rapidez. Nos aconsejaron sobre el cabezal adecuado y la caída óptima.",
        "author": "Mary J.",
        "city": "Benidorm"
    }
]
    : [
    {
        "text": "They made custom sheer curtains for my Alicante living room and they look like they belong in a magazine.",
        "author": "Isabel H.",
        "city": "Alicante"
    },
    {
        "text": "The heavy velvet curtains they installed in Elche block the cold and dress the room spectacularly.",
        "author": "Ricardo S.",
        "city": "Elche"
    },
    {
        "text": "Excellent service and speed. They advised us on the proper heading and the best drape length.",
        "author": "Mary J.",
        "city": "Benidorm"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Ofrecéis el servicio de instalación de rieles y barras en Alicante?",
        "a": "Sí. Nos encargamos de todo: suministramos e instalamos los rieles técnicos, rieles decorativos o barras de madera/metal, y colgamos las cortinas planchadas y listas."
    },
    {
        "q": "¿Cómo elijo entre riel o barra decorativa?",
        "a": "Las barras son ideales para un look tradicional con ollados u anillas. Los rieles son perfectos para sistemas modernos de onda perfecta o cuando hay cajones de persiana que tapar."
    },
    {
        "q": "¿Cuánto tardan en confeccionarse las cortinas a medida?",
        "a": "El plazo habitual de confección en nuestros talleres es de 10 a 15 días laborables desde la toma de medidas definitiva en tu domicilio en Alicante."
    }
]
    : [
    {
        "q": "Do you install rods and tracks in Alicante?",
        "a": "Yes. We take care of everything: we supply and install technical tracks, decorative tracks, or wood/metal rods, and hang the curtains pressed and ready."
    },
    {
        "q": "How do I choose between a track or a decorative rod?",
        "a": "Rods are ideal for a traditional look with eyelets or rings. Tracks are perfect for modern wave fold systems or when there are shutter boxes to hide."
    },
    {
        "q": "How long does it take to make custom curtains?",
        "a": "The typical manufacturing time in our workshops is 10 to 15 working days from final measurement at your home in Alicante."
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
              { label: locale === 'es' ? 'Cortinas' : 'Curtains' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Cortinas a Medida en Alicante` : `Custom Curtains in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `Viste tus ventanas con la elegancia atemporal de nuestras cortinas confeccionadas a medida en Alicante. Medición a domicilio e instalación profesional.` : `Dress your windows with the timeless elegance of our custom-made curtains in Alicante. Home measurement and professional installation.`}
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
            {locale === 'es' ? `Cortinas a Medida en Alicante con Instalación Profesional` : `Custom-Made Curtains in Alicante with Professional Installation`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Confección de visillos y drapes para vestir tus salones` : `Confection of sheers and drapes to dress your rooms`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Completa la decoración de tu hogar con cortinas confeccionadas a medida en Alicante. Desde visillos ligeros que tamizan la luz hasta drapes opacos pesados que visten y aíslan el salón de corrientes de aire, contamos con un amplio catálogo de tejidos y sistemas de instalación (rieles de onda perfecta, barras de madera y metal). Medimos y dejamos todo perfectamente colgado sin molestias para ti.` : `Complete your home decoration with custom-made curtains in Alicante. From light sheers that soften light to heavy blackout drapes that dress and insulate the living room from drafts, we have a wide catalog of fabrics and installation systems (wave fold tracks, wood and metal rods). We measure and leave everything perfectly hung without hassle for you.`}
          </p>
        </div>
      </section>
    </main>
  );
}
