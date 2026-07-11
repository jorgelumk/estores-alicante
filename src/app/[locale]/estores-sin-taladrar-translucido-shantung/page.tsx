import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ProductCustomization from '@/components/ProductCustomization';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSchema from '@/components/ProductSchema';
import { products } from '@/data/products';

const BG_IMAGE = '/images/estores_sin_taladrar.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estor sin Taladrar Translúcido Shantung | Estores Alicante` : `No-Drill Shantung Translucent Blind | Blinds in Alicante`,
    description: locale === 'es' 
      ? `Estor translúcido modelo Shantung sin taladrar la ventana. Instalación rápida sin agujeros por clips con textura rayada en Alicante.`
      : `Shantung translucent blind installed without drilling. Quick hole-free setup via clips with elegant striped texture in Alicante.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-sin-taladrar-translucido-shantung`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-sin-taladrar-translucido-shantung' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-sin-taladrar-translucido-shantung');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Estor sin taladrar Translúcido Shantung"
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
              { label: 'Shantung' }
            ]}
          />
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {locale === 'es' ? '¡Sin Agujeros!' : 'No Drilling Required!'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? 'Estor sin Taladrar Translúcido Shantung' : 'No-Drill Shantung Translucent Blind'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' 
              ? 'Textura rayada elegante y privacidad absoluta instalada directamente en el marco de tu ventana. Ideal para inquilinos y pisos de alquiler.'
              : 'Elegant striped texture and complete privacy installed directly on your window frame. Ideal for renters and temporary homes.'}
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
            { label: locale === 'es' ? '100% Poliéster' : '100% Polyester', icon: '🪡' },
            { label: locale === 'es' ? 'Textura: Rayado' : 'Texture: Striped', icon: '🎨' },
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
              {locale === 'es' ? 'Estor sin taladro con tejido Translúcido Shantung' : 'No-Drill Shantung Translucent Roller Blind'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'es' 
                ? 'El estor enrollable sin taladrar Translúcido Shantung se sujeta firmemente al perfil de tu ventana de aluminio o PVC usando prácticos soportes regulables. Olvídate de taladros y agujeros. Ofrece una privacidad alta con visibilidad nula al exterior.'
                : 'The Shantung Translucent no-drill blind attaches securely to your aluminum or PVC window sash using adjustable clip brackets. No drilling, no tools required. It offers high privacy with zero outdoor visibility.'}
            </p>
            <ul className="space-y-3">
              {[
                locale === 'es' ? 'Instalación limpia y rápida en menos de 5 minutos' : 'Clean and fast installation in under 5 minutes',
                locale === 'es' ? 'Se monta directo en la hoja de la ventana' : 'Mounts directly on the window frame sash',
                locale === 'es' ? 'Tejido translúcido rayado de alta calidad' : 'High quality striped translucent fabric'
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
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong><span>100% Poliéster</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Privacidad:' : 'Privacy:'}</strong><span>{locale === 'es' ? 'Alta' : 'High'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong><span>{locale === 'es' ? 'Nula' : 'None'}</span></div>
              <div className="flex justify-between py-1"><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong><span>{locale === 'es' ? 'Cadena manual' : 'Manual chain'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Personalisation Options */}
      <ProductCustomization locale={locale} drive="chain" showNoDrill={true} />

      {/* 5. Contact Form */}
      <ContactForm />
      
    </main>
  );
}
