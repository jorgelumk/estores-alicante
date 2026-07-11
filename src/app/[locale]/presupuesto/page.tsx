import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import PresupuestoForm from '@/components/PresupuestoForm';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? 'Presupuesto de Estores en Alicante | A medida con Instalación' : 'Blinds Quote in Alicante | Custom with Installation',
    description: locale === 'es' 
      ? 'Pide tu presupuesto gratuito y sin compromiso para la instalación de estores y cortinas a medida en Alicante, Elche, Benidorm y Torrevieja.'
      : 'Request your free, no-obligation quote for made to measure blinds and curtains installation in Alicante, Elche, Benidorm and Torrevieja.',
  };
}

export default async function PresupuestoPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Presupuesto');
  const es = locale === 'es';
  
  return (
    <main className="flex min-h-screen flex-col bg-gray-50/60">

      {/* Hero strip */}
      <section className="bg-[#1A1A2E] py-14 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <Breadcrumbs
            light
            items={[
              { label: es ? 'Inicio' : 'Home', href: '/' },
              { label: t('h1') }
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {t('h1')}
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            {t('description')}
          </p>
          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {[
              { icon: '✓', text: es ? 'Presupuesto gratuito' : 'Free quote' },
              { icon: '⚡', text: es ? 'Respuesta en 2 h' : 'Reply within 2 h' },
              { icon: '📐', text: es ? 'A medida exacta' : 'Made to measure' },
              { icon: '🔧', text: es ? 'Instalación incluida' : 'Installation included' },
            ].map(p => (
              <span key={p.text} className="flex items-center gap-1.5 bg-white/10 text-sm font-semibold px-4 py-1.5 rounded-full">
                <span className="text-[var(--color-primary)]">{p.icon}</span> {p.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <PresupuestoForm locale={locale} />
        </div>
      </section>

      {/* Trust signals below */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">{t('contact_title')}</h2>
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">📞</span>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{t('contact_phone')}</p>
                  <p className="text-sm text-gray-500">{t('contact_hours')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl">✉️</span>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{t('contact_email')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="space-y-5 md:border-l md:border-gray-100 md:pl-12">
            {[
              { title: t('trust_1_title'), desc: t('trust_1_desc') },
              { title: t('trust_2_title'), desc: t('trust_2_desc') },
              { title: t('trust_3_title'), desc: t('trust_3_desc') },
            ].map((item) => (
              <div key={item.title} className="flex space-x-4">
                <div className="shrink-0 text-2xl bg-orange-100 text-[var(--color-primary)] p-3 rounded-lg h-12 w-12 flex items-center justify-center font-bold">✓</div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
