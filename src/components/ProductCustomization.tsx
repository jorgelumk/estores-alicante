'use client';

interface Props {
  locale: string;
  drive?: 'chain' | 'both'; // 'chain' = only manual, 'both' = chain + motor
  showNoDrill?: boolean;
  showScreenApertures?: boolean; // for screen products showing 1%/3%/5% options
}

export default function ProductCustomization({ locale, drive = 'both', showNoDrill = false, showScreenApertures = false }: Props) {
  const es = locale === 'es';

  const colors = [
    { name: es ? 'Blanco' : 'White', hex: '#F8F8F8', border: true },
    { name: es ? 'Marfil' : 'Ivory', hex: '#F5F0E8', border: true },
    { name: es ? 'Beige' : 'Beige', hex: '#D9C9A8', border: false },
    { name: es ? 'Gris Claro' : 'Light Grey', hex: '#C8C8C8', border: false },
    { name: es ? 'Gris Medio' : 'Mid Grey', hex: '#8A8A8A', border: false },
    { name: es ? 'Gris Oscuro' : 'Dark Grey', hex: '#555555', border: false },
    { name: es ? 'Antracita' : 'Anthracite', hex: '#333333', border: false },
    { name: es ? 'Negro' : 'Black', hex: '#1A1A1A', border: false },
  ];

  const measures = [
    { label: es ? 'Ancho' : 'Width', value: es ? 'Hasta 300 cm' : 'Up to 300 cm', icon: '↔️' },
    { label: es ? 'Alto' : 'Height', value: es ? 'Hasta 350 cm' : 'Up to 350 cm', icon: '↕️' },
    { label: es ? 'Acabado lateral' : 'Side finish', value: es ? 'Con o sin recorte' : 'Trimmed or full', icon: '✂️' },
  ];

  return (
    <section className="py-20 px-4 bg-[#F9F9FB] border-t border-gray-100">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase">
            {es ? 'Personalización' : 'Customisation'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
            {es ? 'Tu estor, a tu medida exacta' : 'Your blind, made to your exact size'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            {es
              ? 'Elige el color, el tamaño y el tipo de accionamiento. Fabricamos cada estor a medida en menos de 48 h.'
              : 'Choose the colour, size and control type. We manufacture each blind to measure in under 48 h.'}
          </p>
        </div>

        {/* 1. Colour Palette */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <h3 className="text-xl font-extrabold text-[#1A1A2E]">
              {es ? 'Color de tela' : 'Fabric colour'}
            </h3>
          </div>
          <p className="text-gray-500 text-sm">
            {es
              ? 'Amplia gama de colores para encajar con cualquier estancia. Consulta disponibilidad de colores especiales sin cargo adicional.'
              : 'Wide range of colours to match any room. Ask about special colours at no extra charge.'}
          </p>
          <div className="flex flex-wrap gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full shadow-md ${c.border ? 'ring-1 ring-gray-200' : ''}`}
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[11px] text-gray-500 font-medium">{c.name}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full shadow-md bg-gradient-to-br from-gray-100 via-amber-100 to-gray-300 flex items-center justify-center">
                <span className="text-lg">+</span>
              </div>
              <span className="text-[11px] text-gray-500 font-medium">{es ? 'Más colores' : 'More colours'}</span>
            </div>
          </div>
        </div>

        {/* 2. Size / Measurement */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📐</span>
            <h3 className="text-xl font-extrabold text-[#1A1A2E]">
              {es ? 'Medidas a tu ventana' : 'Made to your window'}
            </h3>
          </div>
          <p className="text-gray-500 text-sm">
            {es
              ? 'Indicamos las medidas exactas en el formulario de pedido. Si tienes dudas sobre cómo medir, te ayudamos por WhatsApp.'
              : 'You specify the exact measurements in the order form. If unsure how to measure, we help via WhatsApp.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {measures.map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-xl p-4 text-center space-y-1 border border-gray-100">
                <span className="text-2xl block">{m.icon}</span>
                <p className="font-bold text-sm text-[#1A1A2E]">{m.label}</p>
                <p className="text-xs text-gray-500">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Drive / Control */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-xl font-extrabold text-[#1A1A2E]">
              {es ? 'Tipo de accionamiento' : 'Control type'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Chain */}
            <div className="rounded-xl border border-gray-200 p-6 space-y-2 hover:border-[var(--color-primary)] transition-colors">
              <p className="text-2xl">🔗</p>
              <p className="font-extrabold text-[#1A1A2E]">{es ? 'Cadena manual' : 'Manual chain'}</p>
              <p className="text-sm text-gray-500">
                {es
                  ? 'Solución clásica, silenciosa y de larga duración. Compatible con todos los modelos.'
                  : 'Classic, silent and long-lasting. Compatible with all models.'}
              </p>
              <span className="inline-block mt-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {es ? 'Incluido' : 'Included'}
              </span>
            </div>

            {/* Motor */}
            {drive === 'both' && (
              <div className="rounded-xl border border-gray-200 p-6 space-y-2 hover:border-[var(--color-primary)] transition-colors">
                <p className="text-2xl">⚡</p>
                <p className="font-extrabold text-[#1A1A2E]">{es ? 'Motor eléctrico' : 'Electric motor'}</p>
                <p className="text-sm text-gray-500">
                  {es
                    ? 'Control con mando a distancia o app móvil. Compatible con Alexa, Google Home y Apple HomeKit.'
                    : 'Remote control or mobile app. Compatible with Alexa, Google Home and Apple HomeKit.'}
                </p>
                <span className="inline-block mt-1 text-xs font-bold text-[var(--color-primary)] bg-orange-50 px-2 py-0.5 rounded-full">
                  {es ? 'Disponible' : 'Available'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Installation type */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔧</span>
            <h3 className="text-xl font-extrabold text-[#1A1A2E]">
              {es ? 'Tipo de instalación' : 'Installation type'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Standard */}
            <div className={`rounded-xl border p-6 space-y-2 ${!showNoDrill ? 'border-[var(--color-primary)] bg-orange-50/30' : 'border-gray-200'}`}>
              <p className="text-2xl">🔩</p>
              <p className="font-extrabold text-[#1A1A2E]">{es ? 'Instalación estándar' : 'Standard installation'}</p>
              <p className="text-sm text-gray-500">
                {es
                  ? 'Soporte fijado con taladro al techo o pared. El más estable y duradero.'
                  : 'Bracket fixed by drilling to ceiling or wall. Most stable and durable.'}
              </p>
            </div>
            {/* No-Drill */}
            <div className={`rounded-xl border p-6 space-y-2 ${showNoDrill ? 'border-[var(--color-primary)] bg-orange-50/30' : 'border-gray-200'}`}>
              <p className="text-2xl">🧲</p>
              <p className="font-extrabold text-[#1A1A2E]">{es ? 'Sin taladrar' : 'No-drill'}</p>
              <p className="text-sm text-gray-500">
                {es
                  ? 'Soportes por presión o clip sobre la hoja de la ventana. Perfecto para alquileres y pisos de segunda mano.'
                  : 'Tension or clip brackets on the window sash. Perfect for rentals and second-hand flats.'}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Screen aperture (only for screen products) */}
        {showScreenApertures && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔆</span>
              <h3 className="text-xl font-extrabold text-[#1A1A2E]">
                {es ? 'Grado de apertura' : 'Openness factor'}
              </h3>
            </div>
            <p className="text-gray-500 text-sm">
              {es
                ? 'El porcentaje de apertura determina cuánta luz y visibilidad permites pasar a través de la tela.'
                : 'The openness percentage determines how much light and visibility you allow through the fabric.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { pct: '1%', desc: es ? 'Alta opacidad, privacidad máxima' : 'High opacity, maximum privacy', icon: '🌑' },
                { pct: '3%', desc: es ? 'Equilibrio entre luz y privacidad' : 'Balance of light and privacy', icon: '🌗' },
                { pct: '5%', desc: es ? 'Visibilidad media, más luminosidad' : 'Medium visibility, more brightness', icon: '🌕' },
              ].map((a) => (
                <div key={a.pct} className="rounded-xl border border-gray-200 p-5 text-center space-y-1 hover:border-[var(--color-primary)] transition-colors">
                  <span className="text-3xl block">{a.icon}</span>
                  <p className="font-extrabold text-xl text-[#1A1A2E]">{a.pct}</p>
                  <p className="text-xs text-gray-500">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-10 space-y-4">
          <p className="text-xl font-extrabold text-[#1A1A2E]">
            {es ? '¿Listo para pedir el tuyo?' : 'Ready to order yours?'}
          </p>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {es
              ? 'Rellena el formulario de abajo con tus medidas y opciones preferidas. Te enviamos un presupuesto sin compromiso en menos de 2 horas.'
              : 'Fill in the form below with your measurements and preferred options. We send you a no-commitment quote in under 2 hours.'}
          </p>
          <a
            href="#contact-form"
            className="inline-block bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg"
          >
            {es ? 'Pedir Presupuesto Gratis' : 'Get a Free Quote'}
          </a>
        </div>
      </div>
    </section>
  );
}
