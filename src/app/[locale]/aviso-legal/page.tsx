import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  
  return {
    title: locale === 'es' ? 'Aviso Legal y Privacidad | Estores Alicante' : 'Legal Notice & Privacy | Estores Alicante',
    description: locale === 'es' 
      ? 'Aviso legal, política de privacidad y condiciones de uso de Estores Alicante.'
      : 'Legal notice, privacy policy and terms of use for Estores Alicante.',
    alternates: {
      canonical: `${baseUrl}/${locale}/aviso-legal`,
    },
    robots: {
      index: false,
      follow: true,
    }
  };
}

export default async function AvisoLegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEs = locale === 'es';

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A2E] mb-8 tracking-tight">
          {isEs ? 'Aviso Legal y Política de Privacidad' : 'Legal Notice & Privacy Policy'}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">{isEs ? '1. Datos Identificativos' : '1. Company Details'}</h2>
            <p>
              {isEs 
                ? 'En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos: la empresa titular de dominio web es Estores Alicante (en adelante, la Empresa), con correo electrónico de contacto: info@estoresalicante.com.'
                : 'In compliance with the duty of information contained in Article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce, the following details are provided: the company that owns the web domain is Estores Alicante (hereinafter, the Company), with contact email: info@estoresalicante.com.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">{isEs ? '2. Usuarios' : '2. Users'}</h2>
            <p>
              {isEs
                ? 'El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.'
                : 'Access and/or use of this portal attributes the condition of USER, who accepts, from such access and/or use, the General Conditions of Use reflected herein. These Conditions shall apply regardless of any General Contracting Conditions that may be mandatory.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">{isEs ? '3. Uso del Portal' : '3. Use of the Portal'}</h2>
            <p>
              {isEs
                ? 'El USUARIO asume la responsabilidad del uso del portal. El USUARIO se compromete a hacer un uso adecuado de los contenidos y servicios que la Empresa ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.'
                : 'The USER assumes responsibility for the use of the portal. The USER agrees to make appropriate use of the content and services that the Company offers through its portal and not to use them for illegal activities or those contrary to good faith and public order.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">{isEs ? '4. Protección de Datos (Política de Privacidad)' : '4. Data Protection (Privacy Policy)'}</h2>
            <p>
              {isEs
                ? 'Estores Alicante cumple con las directrices del Reglamento General de Protección de Datos (RGPD) y demás normativa vigente en cada momento, y vela por garantizar un correcto uso y tratamiento de los datos personales del usuario. Para utilizar algunos de los Servicios, los Usuarios deben proporcionar previamente ciertos datos de carácter personal. Los datos recogidos a través de los formularios serán incorporados a un fichero automatizado responsabilidad de la Empresa con la finalidad de atender las peticiones y enviar información de interés.'
                : 'Estores Alicante complies with the guidelines of the General Data Protection Regulation (GDPR) and other current regulations, ensuring proper use and treatment of the user’s personal data. To use some Services, Users must first provide certain personal data. The data collected will be used to respond to requests and send relevant information.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">{isEs ? '5. Propiedad Intelectual e Industrial' : '5. Intellectual and Industrial Property'}</h2>
            <p>
              {isEs
                ? 'Estores Alicante por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma. Todos los derechos reservados.'
                : 'Estores Alicante, either on its own behalf or as assignee, holds all intellectual and industrial property rights of its website, as well as the elements contained therein. All rights reserved.'}
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
