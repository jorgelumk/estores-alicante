import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import type {Metadata} from 'next';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

const BG_IMAGE = '/images/cortinas-medida-salon.jpg';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'es' ? 'Quiénes Somos | Estores en Alicante | A medida con Instalación' : 'About Us | Blinds in Alicante | Custom with Installation',
    description: locale === 'es' 
      ? 'Conoce a tu instalador local de estores a medida en Alicante. Trabajamos en colaboración con marcas líderes como Corticolors.'
      : 'Meet your local installer of made to measure blinds in Alicante. We collaborate with leading brands like Corticolors.',
  };
}

export default async function QuienesSomosPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('QuienesSomos');
  
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt={locale === 'es' ? 'Sobre Nosotros' : 'About Us'}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-4xl mx-auto text-white space-y-4">
          <Breadcrumbs
            light
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: t('h1') }
            ]}
          />
          <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {t('badge')}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t('h1')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: t('stat_years'), label: t('stat_years_label'), icon: '📅' },
            { stat: t('stat_installations'), label: t('stat_installations_label'), icon: '🏠' },
            { stat: t('stat_cities'), label: t('stat_cities_label'), icon: '📍' },
            { stat: t('stat_satisfaction'), label: t('stat_satisfaction_label'), icon: '✨' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2">
              <span className="text-3xl block">{item.icon}</span>
              <div className="text-2xl md:text-3xl font-black text-[#1A1A2E]">{item.stat}</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Detailed Info (Proximity & Workshop Grid) */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          
          {/* Proximity Column */}
          <div className="flex flex-col justify-between bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-6">
            <div className="space-y-4">
              <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">{t('local_tag')}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] leading-tight">{t('local_title')}</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t('local_desc_1')}</p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t('local_desc_2')}</p>
            </div>
            <div className="border-t border-gray-200/60 pt-6 flex items-center gap-4 text-sm text-gray-700">
              <span className="text-2xl">🚗</span>
              <span>{locale === 'es' ? 'Nos desplazamos gratis por toda la provincia' : 'Free home visits throughout the province'}</span>
            </div>
          </div>

          {/* Workshop Column */}
          <div className="flex flex-col justify-between bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">{t('manufacturer_tag')}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] leading-tight">{t('manufacturer_title')}</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t('manufacturer_desc_1')}</p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t('manufacturer_desc_2')}</p>
            </div>
            
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 text-xs text-emerald-800 space-y-2">
              <div className="font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                <span>🛡️</span> {t('manufacturer_rating')}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-semibold">
                <li>✓ {t('manufacturer_benefit_1')}</li>
                <li>✓ {t('manufacturer_benefit_2')}</li>
                <li>✓ {t('manufacturer_benefit_3')}</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Values Section */}
      <section className="bg-[#1A1A2E] text-white py-24 px-4 w-full">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">{t('values_tag')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">{t('values_title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('value_1_title'), desc: t('value_1_desc'), icon: '🎯' },
              { title: t('value_2_title'), desc: t('value_2_desc'), icon: '💎' },
              { title: t('value_3_title'), desc: t('value_3_desc'), icon: '🤝' },
              { title: t('value_4_title'), desc: t('value_4_desc'), icon: '🌱' }
            ].map((value, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4 hover:border-white/20 transition-all">
                <span className="text-3xl block">{value.icon}</span>
                <h3 className="font-extrabold text-xl">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Working Process */}
      <section className="py-24 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">{t('process_tag')}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">{t('process_title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            { step: '1', title: t('step_1_title'), desc: t('step_1_desc'), icon: '📞' },
            { step: '2', title: t('step_2_title'), desc: t('step_2_desc'), icon: '📏' },
            { step: '3', title: t('step_3_title'), desc: t('step_3_desc'), icon: '⚙️' },
            { step: '4', title: t('step_4_title'), desc: t('step_4_desc'), icon: '✨' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group hover:border-[var(--color-primary)] transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[var(--color-primary)] flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-extrabold text-[#1A1A2E] text-lg flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Form Section */}
      <ContactForm />
    </main>
  );
}
