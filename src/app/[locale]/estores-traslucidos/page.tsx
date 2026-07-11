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

const NAMESPACE = 'EstoresTraslucidos';
const BG_IMAGE = '/images/translucido_valencia.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estores Translúcidos en Alicante | A medida con Instalación` : `Translucent Blinds in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de estores translúcidos a medida en Alicante. Luminosidad y calidez con medición gratuita e instalación incluida.` : `Supply and installation of made to measure translucent blinds in Alicante. Brightness and warmth, free measurement and installation included.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-traslucidos`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-traslucidos' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-traslucidos');
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Luz Suave Difusa",
        "desc": "Tamiza la intensa claridad solar de Alicante creando ambientes cálidos y agradables.",
        "icon": "💡",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Intimidad Completa",
        "desc": "Deja pasar la claridad natural del sol pero impide que te vean desde el exterior.",
        "icon": "🔒",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Estilo y Calidez",
        "desc": "Tejidos elegantes con tacto textil que visten cualquier estancia con un toque acogedor.",
        "icon": "🎨",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Soft Diffuse Light",
        "desc": "Softens the intense solar brightness of Alicante, creating warm and pleasant rooms.",
        "icon": "💡",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Complete Privacy",
        "desc": "Allows natural sunlight to pass through but prevents anyone from seeing you from the outside.",
        "icon": "🔒",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Style & Warmth",
        "desc": "Elegant fabrics with a textile touch that dress any room with a cozy feeling.",
        "icon": "🎨",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Los estores translúcidos Valencia han dado muchísima calidez a mi salón en Alicante. La luz entra suave y agradable.",
        "author": "Carmen F.",
        "city": "Alicante"
    },
    {
        "text": "Excelente relación calidad-precio. Compramos para toda la planta superior en Elche y quedan elegantísimos.",
        "author": "Jorge D.",
        "city": "Elche"
    },
    {
        "text": "Un trato fantástico. Nos trajeron muestras físicas de colores a casa en Benidorm antes de confeccionar.",
        "author": "Nicole S.",
        "city": "Benidorm"
    }
]
    : [
    {
        "text": "The Valencia translucent blinds gave so much warmth to my living room in Alicante. The light is soft and beautiful.",
        "author": "Carmen F.",
        "city": "Alicante"
    },
    {
        "text": "Excellent value for money. We bought them for the whole upper floor in Elche and they look extremely elegant.",
        "author": "Jorge D.",
        "city": "Elche"
    },
    {
        "text": "Fantastic service. They brought physical color samples to our home in Benidorm before manufacturing.",
        "author": "Nicole S.",
        "city": "Benidorm"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Los estores translúcidos permiten ver el exterior?",
        "a": "No, no permiten la visibilidad hacia fuera ni hacia dentro. Solo dejan pasar la luz de forma difuminada para mantener la privacidad total."
    },
    {
        "q": "¿Son adecuados para salones y comedores en Alicante?",
        "a": "Sí, son la opción preferida para zonas de día donde se quiere aprovechar al máximo la luz solar sin sufrir el deslumbramiento directo."
    },
    {
        "q": "¿Cómo se limpian estos estores?",
        "a": "Al estar compuestos principalmente por poliéster de alta calidad, se limpian fácilmente pasando una esponja escurrida con agua tibia y jabón neutro."
    }
]
    : [
    {
        "q": "Do translucent blinds let you see outside?",
        "a": "No, they do not allow visibility in or out. They only let light pass in a diffused way to maintain total privacy."
    },
    {
        "q": "Are they suitable for living and dining rooms in Alicante?",
        "a": "Yes, they are the preferred option for daytime areas where you want to make the most of sunlight without direct glare."
    },
    {
        "q": "How do you clean these blinds?",
        "a": "Being composed primarily of high-quality polyester, they can be cleaned easily with a wrung-out sponge with warm water and mild soap."
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
              { label: locale === 'es' ? 'Estores Translúcidos' : 'Translucent Blinds' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Estores Translúcidos a Medida en Alicante` : `Custom Translucent Blinds in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `Luz natural y calidez en Alicante. Tamiza la claridad solar mediterránea protegiendo tu privacidad sin oscurecer tu hogar.` : `Natural light and warmth in Alicante. Soften the Mediterranean solar brightness, protecting your privacy without darkening your home.`}
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
        initialCategory="translucido" 
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
            {locale === 'es' ? `Luz Natural y Privacidad: Estores Translúcidos a Medida en Alicante` : `Natural Light & Privacy: Custom Translucent Blinds in Alicante`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Calidez decorativa para tus salones y estancias de día` : `Decorative warmth for your living rooms and daytime areas`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Los estores translúcidos (como el modelo Valencia o Shantung) difuminan la claridad del sol mediterráneo, creando ambientes luminosos, acogedores y confortables en Alicante. Son la opción más elegida para salones y oficinas de la provincia, ya que dejan pasar la luz natural pero impiden totalmente que se vea el interior desde la calle, vistiendo las ventanas con una amplia selección de texturas y tonalidades.` : `Translucent blinds (such as the Valencia or Shantung models) diffuse the brightness of the Mediterranean sun, creating bright, welcoming, and comfortable environments in Alicante. They are the preferred option for living rooms and offices in the province, as they let natural light pass through but completely prevent anyone from seeing inside from the street, dressing windows with a wide choice of textures and colors.`}
          </p>
        </div>
      </section>
    </main>
  );
}
