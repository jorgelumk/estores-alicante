import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ProductCustomization from '@/components/ProductCustomization';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSchema from '@/components/ProductSchema';
import { products } from '@/data/products';

const BG_IMAGE = '/images/estores-termicos-aislantes.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estor Opaco Oslo a Medida | Estores en Alicante` : `Oslo Blackout Blind | Blinds in Alicante`,
    description: locale === 'es' 
      ? `Estores enrollables opacos modelo Oslo. Bloqueo total de luz, ideales para un descanso óptimo en dormitorios sin persiana. Alicante.`
      : `Oslo blackout roller blinds. Total light block, ideal for bedrooms without blinds. Made to measure in Alicante.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-opaco-oslo`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-opaco-oslo' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-opaco-oslo');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* JSON-LD Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": locale === 'es' ? "Estor Enrollable Opaco Oslo" : "Oslo Blackout Roller Blind",
            "image": `https://estoresalicante.com/images/estores-termicos-aislantes.jpg`,
            "description": locale === 'es' ? "Estores enrollables opacos modelo Oslo. Bloqueo total de luz, ideales para un descanso óptimo en dormitorios sin persiana. Alicante." : "Oslo blackout roller blinds. Total light block, ideal for bedrooms without blinds. Made to measure in Alicante.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "EUR",
              "price": "24.20",
              "availability": "https://schema.org/InStock",
              "url": `https://estoresalicante.com/${locale}/estores-opaco-oslo`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.97",
              "reviewCount": "75"
            }
          })
        }}
      />
  
        
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Estor Enrollable Opaco Oslo"
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
              { label: locale === 'es' ? 'Estores Opacos' : 'Blackout Blinds', href: '/estores-opacos' },
              { label: 'Oslo' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? 'Estor Enrollable Opaco Oslo' : 'Oslo Blackout Roller Blind'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' 
              ? 'Ausencia total de luz e intimidad garantizada. La solución perfecta para estancias sin persianas exteriores.'
              : 'Complete darkness and guaranteed privacy. The perfect solution for rooms without external shutters.'}
          </p>
          <div className="pt-4">
            <Link href={"#contact-form" as any} className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg inline-block">
              {locale === 'es' ? 'Comprar a Medida' : 'Buy Custom Sizes'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Technical Details */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: locale === 'es' ? 'Bloqueo Luz: 100%' : '100% Light Block', icon: '🌙' },
            { label: locale === 'es' ? 'Fibra de Vidrio' : 'Fiberglass Base', icon: '🔬' },
            { label: locale === 'es' ? 'Privacidad: Total' : 'Privacy: Absolute', icon: '🔒' },
            { label: locale === 'es' ? 'Envío: 24 Horas' : 'Shipping: 24 Hours', icon: '⚡' }
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
              {locale === 'es' ? 'Oscuridad absoluta con el modelo Oslo' : 'Total Darkness with the Oslo Blackout'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'es' 
                ? 'El estor enrollable opaco Oslo incorpora un tejido técnico multicapa compuesto de 25% fibra de vidrio y 75% PVC. Esto le confiere una rigidez excepcional y una capacidad absoluta para evitar el paso de la luz, garantizando descanso y frescura en tu hogar.'
                : 'The Oslo blackout roller blind features a multi-layer technical fabric made of 25% fiberglass and 75% PVC. This gives it exceptional stiffness and an absolute capacity to block out all light, guaranteeing rest and cool interiors.'}
            </p>
            <ul className="space-y-3">
              {[
                locale === 'es' ? 'Oscuridad 100% garantizada para dormitorios' : '100% darkness guaranteed for bedrooms',
                locale === 'es' ? 'Ayuda a regular la temperatura de la habitación' : 'Helps regulate room temperature',
                locale === 'es' ? 'Ignífugo e impermeable de alta resistencia' : 'Highly durable, fireproof and waterproof fabric'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <span className="text-orange-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-[#1A1A2E]">
              {locale === 'es' ? 'Ficha de Características' : 'Feature Details'}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong><span>25% Fibra de Vidrio - 75% PVC</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Tipo de Bloqueo:' : 'Block Type:'}</strong><span>{locale === 'es' ? 'Opaco Total' : 'Total Blackout'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Privacidad:' : 'Privacy:'}</strong><span>{locale === 'es' ? 'Máxima (Noche y Día)' : 'Maximum (Day & Night)'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong><span>{locale === 'es' ? 'Nula' : 'None'}</span></div>
              <div className="flex justify-between py-1"><strong>{locale === 'es' ? 'Mecanismo:' : 'Drive:'}</strong><span>{locale === 'es' ? 'Cadena o Motorizado' : 'Chain or Motorised'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Personalisation Options */}
      <ProductCustomization locale={locale} drive="both" />

      {/* 5. Contact Form */}
      <ContactForm />
      
    </main>
  );
}
