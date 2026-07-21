import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ProductCustomization from '@/components/ProductCustomization';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSchema from '@/components/ProductSchema';
import { products } from '@/data/products';

const BG_IMAGE = '/images/estor_screen_fiberglass.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estor Screen Fibra de Vidrio a Medida | Estores Alicante` : `Fiberglass Screen Blind | Blinds in Alicante`,
    description: locale === 'es' 
      ? `Consigue el mejor aislamiento térmico con nuestros estores screen de fibra de vidrio a medida. Resistente, seguro e ignífugo.`
      : `Get the best thermal insulation with our made-to-measure fiberglass screen blinds. Strong, safe, and fireproof.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-screen-fiberglass`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-screen-fiberglass' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-screen-fiberglass');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* JSON-LD Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": locale === 'es' ? "Estor Enrollable Screen Fiberglass" : "Fiberglass Screen Roller Blind",
            "image": `https://estoresalicante.com/images/estor_screen_fiberglass.jpg`,
            "description": locale === 'es' ? "Consigue el mejor aislamiento térmico con nuestros estores screen de fibra de vidrio a medida. Resistente, seguro e ignífugo." : "Get the best thermal insulation with our made-to-measure fiberglass screen blinds. Strong, safe, and fireproof.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "EUR",
              "price": "25.80",
              "availability": "https://schema.org/InStock",
              "url": `https://estoresalicante.com/${locale}/estores-screen-fiberglass`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.99",
              "reviewCount": "146"
            }
          })
        }}
      />
  
        
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Estor Enrollable Screen Fiberglass"
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
              { label: locale === 'es' ? 'Estores Screen' : 'Screen Blinds', href: '/estores-screen' },
              { label: 'Fiberglass' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? 'Estor Enrollable Screen Fiberglass' : 'Fiberglass Screen Roller Blind'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' 
              ? 'El tejido técnico de referencia con soporte de fibra de vidrio. Aislamiento térmico superior contra la radiación mediterránea.'
              : 'The benchmark technical fabric with fiberglass backing. Superior heat insulation against intensive sun radiation.'}
          </p>
          <div className="pt-4">
            <Link href={"#contact-form" as any} className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg inline-block">
              {locale === 'es' ? 'Presupuesto a Medida' : 'Custom Estimate'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Technical Details */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: locale === 'es' ? 'Fibra de Vidrio: 36%' : 'Fiberglass: 36%', icon: '🔬' },
            { label: locale === 'es' ? 'Ignífugo Clase M1' : 'Fireproof Class M1', icon: '🔥' },
            { label: locale === 'es' ? 'Aislante Térmico' : 'Thermal Insulator', icon: '🌡️' },
            { label: locale === 'es' ? 'Medición a Domicilio' : 'Free Measurement', icon: '📏' }
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
              {locale === 'es' ? 'La excelencia de la Fibra de Vidrio' : 'The Excellence of Fiberglass Screen'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'es' 
                ? 'Nuestra gama Fiberglass cuenta con un tejido compuesto por 36% fibra de vidrio y 64% PVC. Es el aislante térmico por excelencia para grandes ventanales en Alicante, protegiendo del calor exterior y bajando sustancialmente el consumo eléctrico.'
                : 'Our Fiberglass range features a composition of 36% fiberglass and 64% PVC. It is the ultimate heat insulator for large windows, protecting the interior from outdoor heat and substantially lowering electricity bills.'}
            </p>
            <ul className="space-y-3">
              {[
                locale === 'es' ? 'Tejido de alta estabilidad dimensional (no se deforma)' : 'High dimensional stability fabric (retains shape)',
                locale === 'es' ? 'Resistente a la humedad marina y salinidad' : 'Resistant to coastal moisture and salinity',
                locale === 'es' ? 'Disponible en varios factores de apertura (1%, 3%, 5%)' : 'Available in custom openness factors (1%, 3%, 5%)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <span className="text-orange-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-[#1A1A2E]">
              {locale === 'es' ? 'Detalles del Producto' : 'Product Information'}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong><span>36% Fibra de Vidrio - 64% PVC</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Apertura:' : 'Openness:'}</strong><span>1% | 3% | 5%</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Aislamiento:' : 'Insulation:'}</strong><span>{locale === 'es' ? 'Excelente' : 'Excellent'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Ignífugo:' : 'Fire Rating:'}</strong><span>Clase M1 / NFPA 701</span></div>
              <div className="flex justify-between py-1"><strong>{locale === 'es' ? 'Mecanismo:' : 'Drive:'}</strong><span>{locale === 'es' ? 'Cadena o Motor' : 'Chain or Motor'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Personalisation Options */}
      <ProductCustomization locale={locale} drive="both" showScreenApertures={true} />

      {/* 5. Contact Form */}
      <ContactForm />
      
    </main>
  );
}
