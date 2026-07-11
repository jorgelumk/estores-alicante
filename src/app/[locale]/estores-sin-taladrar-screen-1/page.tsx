import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ProductCustomization from '@/components/ProductCustomization';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSchema from '@/components/ProductSchema';
import { products } from '@/data/products';

const BG_IMAGE = '/images/screen_apartamento_benidorm.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estor sin Taladrar Screen 1% a Medida | Estores Alicante` : `No-Drill Screen 1% Blind | Blinds in Alicante`,
    description: locale === 'es' 
      ? `Estor screen 1% sin taladrar la ventana. Instalación rápida sin agujeros por clips, privacidad máxima al mejor precio de Alicante.`
      : `Screen 1% blind installed without drilling. Quick hole-free setup via clips, maximum privacy at the best price in Alicante.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-sin-taladrar-screen-1`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-sin-taladrar-screen-1' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-sin-taladrar-screen-1');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* JSON-LD Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": locale === 'es' ? "Estor sin taladrar Screen 1%" : "No-Drill Screen 1% Blind",
            "image": `https://estoresalicante.com/images/screen_apartamento_benidorm.jpg`,
            "description": locale === 'es' ? "Estor screen 1% sin taladrar la ventana. Instalación rápida sin agujeros por clips, privacidad máxima al mejor precio de Alicante." : "Screen 1% blind installed without drilling. Quick hole-free setup via clips, maximum privacy at the best price in Alicante.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "EUR",
              "price": "24.00",
              "availability": "https://schema.org/InStock",
              "url": `https://estoresalicante.com/${locale}/estores-sin-taladrar-screen-1`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.00",
              "reviewCount": "10"
            }
          })
        }}
      />
  
        
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Estor sin taladrar Screen 1%"
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
              { label: locale === 'es' ? 'Sin Taladrar' : 'No-Drill Blinds', href: '/estores-sin-taladrar' },
              { label: '1%' }
            ]}
          />
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {locale === 'es' ? '¡Sin Agujeros!' : 'No Drilling Required!'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? 'Estor sin Taladrar Screen 1%' : 'No-Drill Screen 1% Blind'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' 
              ? 'Protección solar screen de alta opacidad (1% de apertura) sin llegar a ser opaco, instalada directamente en el marco de tu ventana.'
              : 'High opacity screen solar protection (1% openness) without being blackout, installed directly on your window frame.'}
          </p>
          <div className="pt-4">
            <Link href="#contact-form" className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg inline-block">
              {locale === 'es' ? 'Comprar sin Taladros' : 'Buy No-Drill'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Technical Details */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: locale === 'es' ? 'Instalación: Clips' : 'Fitting: Easy Clips', icon: '🧲' },
            { label: locale === 'es' ? 'Apertura: 1%' : 'Openness: 1%', icon: '☀️' },
            { label: locale === 'es' ? 'Envío: 24 Horas' : 'Shipping: 24 Hours', icon: '⚡' },
            { label: locale === 'es' ? 'Garantía 3 Años' : '3-Year Warranty', icon: '🛡️' }
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 bg-white py-3 px-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-bold text-gray-800 text-sm md:text-base">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Description & Fabric Info */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E]">
              {locale === 'es' ? 'Estor sin taladro con tejido Screen 1%' : 'No-Drill Screen 1% Roller Blind'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'es' 
                ? 'El estor enrollable sin taladrar Screen 1% se sujeta firmemente al perfil de tu ventana de aluminio o PVC usando soportes regulables. Olvídate de taladros y agujeros. Ofrece una mayor opacidad que los screen tradicionales sin llegar a ser opaco, lo que garantiza total privacidad e intimidad.'
                : 'The Screen 1% no-drill blind attaches securely to your window sash using clip brackets. No drilling required. It offers higher opacity than traditional screen fabrics without being fully blackout, ensuring optimal privacy.'}
            </p>
            <ul className="space-y-3">
              {[
                locale === 'es' ? 'Instalación limpia y rápida en menos de 5 minutos' : 'Clean and fast installation in under 5 minutes',
                locale === 'es' ? 'Se monta directo en la hoja de la ventana' : 'Mounts directly on the window frame sash',
                locale === 'es' ? 'Tejido screen lavable de alta duración' : 'Highly durable, easy-to-clean screen fabric'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <span className="text-orange-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-[#1A1A2E]">
              {locale === 'es' ? 'Ficha de Características' : 'Technical Specifications'}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Tipo de Soporte:' : 'Bracket Type:'}</strong><span>{locale === 'es' ? 'Enganches de perfil (sin taladrar)' : 'Profile clips (no drilling)'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong><span>30% Poliéster - 70% PVC</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Apertura:' : 'Openness:'}</strong><span>1%</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong><span>{locale === 'es' ? 'Baja' : 'Low'}</span></div>
              <div className="flex justify-between py-1"><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong><span>{locale === 'es' ? 'Cadena manual' : 'Manual chain'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Personalisation Options */}
      <ProductCustomization locale={locale} drive="chain" showNoDrill={true} showScreenApertures={true} />

      {/* 5. Contact Form */}
      <ContactForm />
      
    </main>
  );
}
