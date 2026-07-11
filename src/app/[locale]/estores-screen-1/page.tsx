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
    title: locale === 'es' ? `Estor Screen 1% a Medida | Estores en Alicante` : `Custom Screen 1% Blind | Blinds in Alicante`,
    description: locale === 'es' 
      ? `Estores enrollables screen del 1% de apertura. Privacidad máxima de día y protección térmica óptima en Alicante.`
      : `Screen roller blinds with 1% openness. Maximum daytime privacy and optimal thermal protection in Alicante.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-screen-1`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-screen-1' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-screen-1');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Estor Enrollable Screen 1%"
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
              { label: '1%' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? 'Estor Enrollable Screen 1%' : 'Screen 1% Roller Blind'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' 
              ? 'Protección solar extrema y alta opacidad (1% de apertura) sin llegar a ser opaco. La solución perfecta para dormir con luz muy atenuada.'
              : 'Extreme solar protection and high opacity (1% openness) without being blackout. The perfect solution to sleep with dimmed light.'}
          </p>
          <div className="pt-4">
            <Link href="#contact-form" className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg inline-block">
              {locale === 'es' ? 'Calcular Precio' : 'Calculate Price'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Technical Details */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: locale === 'es' ? 'Apertura: 1%' : 'Openness: 1%', icon: '☀️' },
            { label: locale === 'es' ? 'Privacidad: Alta' : 'Privacy: High', icon: '🔒' },
            { label: locale === 'es' ? 'Visibilidad: Baja' : 'Visibility: Low', icon: '👁️' },
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
              {locale === 'es' ? 'Privacidad Máxima con Screen 1%' : 'Maximum Privacy with Screen 1%'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'es' 
                ? 'El modelo Screen 1% (anteriormente modelo Navarra) ofrece una mayor opacidad que los screen tradicionales sin llegar a ser un tejido opaco. Proporciona el menor grado de apertura disponible en tejido screen (1%), lo que se traduce en un bloqueo casi total de los reflejos en las pantallas y del calor solar, y una privacidad máxima del interior manteniendo el paso de luz tamizada.'
                : 'The Screen 1% model (previously Navarra) provides higher opacity than traditional screen fabrics without being fully blackout. It features the tightest openness factor available in screen fabrics (1%), translating to an almost complete glare and heat reduction, while guaranteeing maximum privacy with filtered light.'}
            </p>
            <ul className="space-y-3">
              {[
                locale === 'es' ? 'Evita reflejos molestos en pantallas y ordenadores' : 'Prevents annoying screen reflections and glare',
                locale === 'es' ? 'Ideal para dormitorios que buscan luz muy atenuada' : 'Ideal for bedrooms requiring highly softened light',
                locale === 'es' ? 'Composición duradera de poliéster y PVC' : 'Durable composition of polyester and PVC'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <span className="text-orange-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-[#1A1A2E]">
              {locale === 'es' ? 'Especificaciones del Producto' : 'Product Specs'}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong><span>30% Poliéster - 70% PVC</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Apertura:' : 'Openness:'}</strong><span>1%</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Privacidad:' : 'Privacy:'}</strong><span>{locale === 'es' ? 'Alta' : 'High'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong><span>{locale === 'es' ? 'Baja' : 'Low'}</span></div>
              <div className="flex justify-between py-1"><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong><span>{locale === 'es' ? 'Manual (Cadena) o Motorizado' : 'Manual (Chain) or Motorised'}</span></div>
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
