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

const NAMESPACE = 'EstoresMotorizados';
const BG_IMAGE = '/images/estores-motorizados-domotica.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estores Motorizados en Alicante | A medida con Instalación` : `Motorized Blinds in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de estores motorizados a medida en Alicante. Control remoto y domótica con medición gratuita e instalación incluida.` : `Supply and installation of made to measure motorized blinds in Alicante. Remote control and smart home, free measurement and installation included.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-motorizados`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-motorizados' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-motorizados');
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Comodidad Absoluta",
        "desc": "Sube y baja tus estores con un mando a distancia o desde tu móvil sin moverte del sofá en Alicante.",
        "icon": "🎮",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Compatibilidad Domótica",
        "desc": "Conecta tus estores motorizados con Alexa, Google Home o Siri para control por voz.",
        "icon": "📱",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Ideal para Alturas",
        "desc": "La mejor solución para grandes ventanales o ventanas de difícil acceso en salones de doble altura.",
        "icon": "🏢",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Complete Comfort",
        "desc": "Raise and lower your blinds with a remote or your smartphone without moving from the sofa in Alicante.",
        "icon": "🎮",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Smart Home Compatible",
        "desc": "Connect your motorized blinds with Alexa, Google Home, or Siri for voice control.",
        "icon": "📱",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Perfect for High Windows",
        "desc": "The best solution for large windows or hard-to-reach spots in double-height living rooms.",
        "icon": "🏢",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "La mejor decisión para el gran ventanal de doble altura en nuestro chalet de Elche. Un toque de botón y listos.",
        "author": "Andrés F.",
        "city": "Elche"
    },
    {
        "text": "Los configuramos con el asistente de voz y es comodísimo. Gran servicio de instalación en Alicante.",
        "author": "Sonia T.",
        "city": "Alicante"
    },
    {
        "text": "Motores silenciosos y de gran calidad. Satisfechos con la compra para nuestro ático en Benidorm.",
        "author": "Peter M.",
        "city": "Benidorm"
    }
]
    : [
    {
        "text": "The best decision for the large double-height window in our Elche villa. One tap on a button and done.",
        "author": "Andrés F.",
        "city": "Elche"
    },
    {
        "text": "We configured them with the voice assistant and it is extremely convenient. Great installation service in Alicante.",
        "author": "Sonia T.",
        "city": "Alicante"
    },
    {
        "text": "Quiet and high-quality motors. Very satisfied with the purchase for our Benidorm penthouse.",
        "author": "Peter M.",
        "city": "Benidorm"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Qué tipo de alimentación usan los estores motorizados?",
        "a": "Ofrecemos dos sistemas: motores con batería recargable de litio (sin cables, la batería dura de 6 a 12 meses) y motores cableados para conectar directamente a la red eléctrica."
    },
    {
        "q": "¿Se pueden programar horarios de apertura y cierre?",
        "a": "Sí, mediante la integración con un hub domótico (puente wifi), puedes programar que los estores se abran o cierren automáticamente a horas específicas."
    },
    {
        "q": "¿La instalación incluye la configuración de los mandos en Alicante?",
        "a": "Sí, nuestro instalador profesional monta el estor, lo configura, programa los límites de recorrido y te enseña a manejar los mandos y la app."
    }
]
    : [
    {
        "q": "What power source do motorized blinds use?",
        "a": "We offer two systems: motors with rechargeable lithium batteries (wire-free, lasting 6 to 12 months per charge) and wired motors to connect directly to the electrical grid."
    },
    {
        "q": "Can you schedule automatic opening and closing times?",
        "a": "Yes, by integrating with a smart home hub (Wi-Fi bridge), you can schedule the blinds to operate automatically at specific times."
    },
    {
        "q": "Does the installation include remote control programming in Alicante?",
        "a": "Yes, our professional installer mounts the blind, programs the limit settings, and shows you how to use the remotes and the app."
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
              { label: locale === 'es' ? 'Estores Motorizados' : 'Motorised Blinds' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Estores Motorizados a Medida en Alicante` : `Custom Motorized Blinds in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `Controla la luz de tu hogar con la máxima comodidad en Alicante. Estores automáticos integrables con sistemas de domótica y Alexa.` : `Control your home light with maximum comfort in Alicante. Automatic blinds compatible with smart home systems and Alexa.`}
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
        initialCategory="motorizados" 
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
            {locale === 'es' ? `Estores Motorizados y Domótica a Medida en Alicante` : `Motorized Blinds & Smart Home Solutions in Alicante`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Comodidad inteligente para tus ventanas y ventanales` : `Smart comfort for your windows and large glazed areas`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Moderniza tu vivienda en Alicante con estores motorizados de última generación. Compatibles con Alexa, Google Home e integrables con sistemas de domótica general, permiten programar horarios de apertura y cierre para simular presencia o controlar la temperatura. Ideales para ventanales de gran tamaño en chalets o zonas altas de difícil acceso manual en oficinas de la provincia de Alicante.` : `Modernize your home in Alicante with state-of-the-art motorized blinds. Compatible with Alexa, Google Home, and integrable with general home automation systems, they let you schedule opening and closing times to simulate presence or control the temperature. Ideal for large windows in villas or high areas hard to reach manually in offices in the Alicante province.`}
          </p>
        </div>
      </section>
    </main>
  );
}
