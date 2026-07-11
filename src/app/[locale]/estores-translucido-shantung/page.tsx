import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ProductCustomization from '@/components/ProductCustomization';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSchema from '@/components/ProductSchema';
import { products } from '@/data/products';

const BG_IMAGE = '/images/cortinas-enrollables-medida.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? `Estor Translúcido Shantung a Medida | Estores Alicante` : `Shantung Translucent Blind | Blinds in Alicante`,
    description: locale === 'es' 
      ? `Estores enrollables translúcidos modelo Shantung con textura rayada decorativa. Máxima elegancia y confort en Alicante.`
      : `Shantung translucent roller blinds with decorative striped texture. Maximum elegance and light diffusion in Alicante.`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com'}/${locale}/estores-translucido-shantung`,
      images: [{ url: BG_IMAGE, width: 800, height: 600, alt: 'estores-translucido-shantung' }]
    }
  };
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const product = products.find(p => p.slug === 'estores-translucido-shantung');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {product && <ProductSchema product={product} locale={locale} />}
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Estor Enrollable Translúcido Shantung"
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
              { label: locale === 'es' ? 'Estores Translúcidos' : 'Translucent Blinds', href: '/estores-traslucidos' },
              { label: 'Shantung' }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === 'es' ? 'Estor Enrollable Translúcido Shantung' : 'Shantung Translucent Roller Blind'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {locale === 'es' 
              ? 'El toque decorativo único del Shantung. Textura rayada que filtra la luz natural con un estilo elegante y sofisticado.'
              : 'The unique decorative touch of Shantung. Striped texture that filters natural light with a sophisticated style.'}
          </p>
          <div className="pt-4">
            <Link href="#contact-form" className="bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg inline-block">
              {locale === 'es' ? 'Presupuesto Gratis' : 'Free Quote'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Technical Details */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: locale === 'es' ? 'Textura Rayada' : 'Striped Texture', icon: '🎨' },
            { label: locale === 'es' ? '100% Poliéster' : '100% Polyester', icon: '🪡' },
            { label: locale === 'es' ? 'Privacidad: Alta' : 'Privacy: High', icon: '🔒' },
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
              {locale === 'es' ? 'La textura rayada del Shantung' : 'The Textured Charm of Shantung'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'es' 
                ? 'El estor translúcido Shantung incorpora una trama rayada que aporta relieve y carácter decorativo a cualquier habitación. Confeccionado en Alicante, es ideal para salones y dormitorios principales que buscan una estética textil más tradicional y distinguida.'
                : 'The Shantung translucent blind incorporates a subtle striped weave that provides relief and decorative depth. Crafted in Alicante, it is perfect for living rooms and bedrooms seeking a premium textile aesthetic.'}
            </p>
            <ul className="space-y-3">
              {[
                locale === 'es' ? 'Estética elegante de tejido natural rayado' : 'Elegant natural striped fabric aesthetics',
                locale === 'es' ? 'Total privacidad, no permite ver a través' : 'Total privacy, prevents direct visual access',
                locale === 'es' ? 'Gran resistencia al desgaste solar continuado' : 'Excellent resistance to continuous sun exposure'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <span className="text-orange-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-[#1A1A2E]">
              {locale === 'es' ? 'Especificaciones Técnicas' : 'Technical Specifications'}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong><span>100% Poliéster</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Textura:' : 'Texture:'}</strong><span>{locale === 'es' ? 'Rayado Shantung' : 'Shantung Striped'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Privacidad:' : 'Privacy:'}</strong><span>{locale === 'es' ? 'Alta' : 'High'}</span></div>
              <div className="flex justify-between border-b py-1"><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong><span>{locale === 'es' ? 'Nula' : 'None'}</span></div>
              <div className="flex justify-between py-1"><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong><span>{locale === 'es' ? 'Cadena o Motor' : 'Chain or Motor'}</span></div>
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
