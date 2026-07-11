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

const NAMESPACE = 'EstoresPaqueto';
const BG_IMAGE = '/images/estores-paqueto-salon.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estores Paqueto en Alicante | A medida con Instalación` : `Roman Blinds in Alicante | Custom with Installation`,
    description: locale === 'es' ? `Confección e instalación de estores paqueto a medida en Alicante. Estilo textil clásico con medición gratuita e instalación incluida.` : `Supply and installation of made to measure roman blinds in Alicante. Classic textile style, free measurement and installation included.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-paqueto`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-paqueto' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-paqueto');
  const t = await getTranslations(NAMESPACE);

  const advantages = locale === 'es' 
    ? [
    {
        "title": "Caída Natural Elegante",
        "desc": "Al no llevar varillas, el tejido se recoge formando ondas suaves y muy decorativas en Alicante.",
        "icon": "🎐",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Tejidos Nobles y Cálidos",
        "desc": "Confeccionados con mezclas de lino y algodón de gran calidad para un tacto acogedor.",
        "icon": "🧶",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Fácil Desmontaje y Lavado",
        "desc": "Se desmontan en segundos gracias a su sistema de velcro superior para lavarlos en casa.",
        "icon": "🧼",
        "color": "bg-emerald-50 text-emerald-600"
    }
]
    : [
    {
        "title": "Elegant Natural Fall",
        "desc": "Without rods, the fabric gathers in soft, highly decorative folds in Alicante.",
        "icon": "🎐",
        "color": "bg-amber-50 text-amber-600"
    },
    {
        "title": "Warm Premium Fabrics",
        "desc": "Made with high-quality linen and cotton blends for a cozy feel.",
        "icon": "🧶",
        "color": "bg-blue-50 text-blue-600"
    },
    {
        "title": "Easy Care and Washing",
        "desc": "Detaches in seconds thanks to its upper velcro system to wash them at home.",
        "icon": "🧼",
        "color": "bg-emerald-50 text-emerald-600"
    }
];

  const reviews = locale === 'es'
    ? [
    {
        "text": "Los estores paqueto de lino quedan preciosos en el comedor. Tienen una caída muy elegante. Gran trabajo en Alicante.",
        "author": "Ana S.",
        "city": "Alicante"
    },
    {
        "text": "Súper cómodos de lavar. Se quita el velcro y a la lavadora. Encantada con la instalación en Elche.",
        "author": "Elena G.",
        "city": "Elche"
    },
    {
        "text": "Muy contentos con el resultado decorativo. Dan un aspecto muy hogareño y acogedor. Recomendables.",
        "author": "Roberto L.",
        "city": "Torrevieja"
    }
]
    : [
    {
        "text": "The linen roman blinds look beautiful in the dining room. They fold very elegantly. Great job in Alicante.",
        "author": "Ana S.",
        "city": "Alicante"
    },
    {
        "text": "Super easy to wash. Just pull the velcro and throw it in the washer. Thrilled with the installation in Elche.",
        "author": "Elena G.",
        "city": "Elche"
    },
    {
        "text": "Very happy with the decorative result. They give a very warm and welcoming look. Recommended.",
        "author": "Roberto L.",
        "city": "Torrevieja"
    }
];

  const faqs = locale === 'es'
    ? [
    {
        "q": "¿Cuál es la diferencia entre un estor paqueto y uno plegable?",
        "a": "El estor paqueto no tiene varillas horizontales, por lo que se recoge de forma más libre y ondulada, dando un aire más informal y clásico. El plegable lleva varillas que crean pliegues rectos y rígidos."
    },
    {
        "q": "¿Se pueden lavar en la lavadora?",
        "a": "Sí. Se retiran del riel que se sujeta con velcro, se quitan los cordones inferiores y se pueden lavar en la lavadora siguiendo las indicaciones del tejido (normalmente en frío o programa delicado)."
    },
    {
        "q": "¿Ofrecéis asesoramiento de tejidos a domicilio en Alicante?",
        "a": "Sí, cuando nuestro técnico acude a tu domicilio a tomar medidas en Alicante, lleva muestras de linos y tejidos para que puedas elegir el color y textura perfectos."
    }
]
    : [
    {
        "q": "What is the difference between a roman and a folding blind?",
        "a": "The roman (paqueto) blind does not have horizontal rods, so it gathers in a looser, wavy fashion, giving a classic look. The folding blind has rods that create straight, rigid panels."
    },
    {
        "q": "Can they be machine washed?",
        "a": "Yes. They pull off the velcro headrail, you unthread the cords at the back, and you can wash them in the washing machine following the fabric guidelines (usually cold/delicate program)."
    },
    {
        "q": "Do you offer in-home fabric advice in Alicante?",
        "a": "Yes, when our technician visits your home in Alicante, they bring linen and fabric samples so you can choose the perfect color and texture."
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
              { label: locale === 'es' ? 'Estores Paqueto' : 'Roman Blinds' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? `Estores Paqueto a Medida en Alicante` : `Custom Roman Blinds in Alicante`}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' ? `Aporta elegancia y calidez textil a tu hogar en Alicante. Estores sin varillas confeccionados a medida con tejidos de lino y algodón.` : `Bring elegance and textile warmth to your home in Alicante. Rodless roman blinds custom-made with linen and cotton fabrics.`}
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
            {locale === 'es' ? `Elegancia Textil Clásica: Estores Paqueto a Medida en Alicante` : `Classic Textile Elegance: Custom Roman Blinds in Alicante`}
          </h2>
          <h3 className="text-xl font-bold text-[var(--color-primary)]">
            {locale === 'es' ? `Estores sin varillas con linos y tejidos naturales` : `Rodless blinds with linen and natural fabrics`}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {locale === 'es' ? `Los estores paqueto aportan una caída suave y natural libre de varillas rígidas, dotando al salón o dormitorio en Alicante de una estética tradicional y acogedora. Confeccionados con tejidos nobles como linos y algodones, se sujetan fácilmente con velcro superior lo que agiliza el lavado doméstico. Perfectos para ambientes rústicos, clásicos o mediterráneos.` : `Roman (paqueto) blinds provide a soft, natural fold free of rigid rods, giving the living room or bedroom in Alicante a traditional and welcoming aesthetic. Made with fine fabrics like linen and cotton, they easily attach with a top velcro strip, speeding up home washing. Perfect for rustic, classic, or Mediterranean settings.`}
          </p>
        </div>
      </section>
    </main>
  );
}
