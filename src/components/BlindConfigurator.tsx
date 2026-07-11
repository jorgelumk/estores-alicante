'use client';

import { useState, useMemo } from 'react';

interface BlindConfiguratorProps {
  locale: string;
  initialType?: BlindType;
  hideTypeSelector?: boolean;
}

type BlindType = 'standard' | 'nodrill';

// Swatch colors with display colors for the preview
const fabricColors = [
  { id: 'blanco-0202', label: { es: 'Blanco 0202', en: 'White 0202' }, hex: '#FFFFFF', border: '#E2E8F0' },
  { id: 'blanco-roto', label: { es: 'Blanco Roto', en: 'Off-White' }, hex: '#FAF9F6', border: '#E2E8F0' },
  { id: 'blanco-lino-0208', label: { es: 'Blanco Lino 0208', en: 'White Linen 0208' }, hex: '#F4F0EA', border: '#E2E8F0' },
  { id: 'blanco-perla-0207', label: { es: 'Blanco Perla 0207', en: 'White Pearl 0207' }, hex: '#F0EFEA', border: '#E2E8F0' },
  { id: 'lino-0808', label: { es: 'Lino 0808', en: 'Linen 0808' }, hex: '#D7CFC0' },
  { id: 'perla-0707', label: { es: 'Perla 0707', en: 'Pearl 0707' }, hex: '#C2C5C6' },
  { id: 'antracita-gris-1001', label: { es: 'Antracita Gris 1001', en: 'Anthracite Grey 1001' }, hex: '#63666A' },
  { id: 'antracita-bronce-1011', label: { es: 'Antracita Bronce 1011', en: 'Anthracite Bronze 1011' }, hex: '#4A4843' },
  { id: 'antracita-1010', label: { es: 'Antracita 1010', en: 'Anthracite 1010' }, hex: '#2D3033' },
];

export default function BlindConfigurator({
  locale,
  initialType = 'standard',
  hideTypeSelector = false,
}: BlindConfiguratorProps) {
  const [blindType, setBlindType] = useState<BlindType>(initialType);
  const [step, setStep] = useState(1);

  // Configuration State
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(150);
  const [selectedFabricColor, setSelectedFabricColor] = useState(fabricColors[0]);
  const [mechanismColor, setMechanismColor] = useState<string>('Blanco');
  const [supportType, setSupportType] = useState<string>('Soporte Pared-Techo 7cm');
  const [driveType, setDriveType] = useState<string>('Cadena de Plástico');
  const [drivePosition, setDrivePosition] = useState<string>('Derecha');
  const [rollDirection, setRollDirection] = useState<string>(initialType === 'nodrill' ? 'Pegado a pared' : 'Cascada'); // Default Pegado a pared for nodrill, Cascada for standard
  const [bottomFinish, setBottomFinish] = useState<string>('Oculto');

  // Contact Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Alicante');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Handle Switch between Standard and No-Drill
  const handleTypeChange = (type: BlindType) => {
    setBlindType(type);
    setStep(1);
    // Reset defaults based on type
    if (type === 'nodrill') {
      setWidth(Math.min(width, 120));
      setHeight(Math.min(height, 240));
      setMechanismColor('Blanco');
      setRollDirection('Pegado a pared');
    } else {
      setRollDirection('Cascada');
    }
  };

  // Limits & Messages
  const maxCategoryWidth = 200; // Translúcidos Valencia and Shantung max width is 200cm
  const widthLimit = blindType === 'standard' ? { min: 30, max: 270 } : { min: 30, max: 120 };
  const heightLimit = blindType === 'standard' ? { min: 60, max: 300 } : { min: 60, max: 240 };

  // Validation
  const isWidthValid = width >= widthLimit.min && width <= widthLimit.max;
  const isHeightValid = height >= heightLimit.min && height <= heightLimit.max;
  const isStep1Valid = isWidthValid && isHeightValid;

  // Total Steps count based on type (8 steps + contact, or 6 steps + contact)
  const totalSteps = blindType === 'standard' ? 9 : 7; // Last step is contact form

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Submit quote
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'presupuesto',
          personalData: {
            name,
            email,
            phone,
            municipio: city,
            comments: `Configurador interactivo. Tipo: ${blindType === 'standard' ? 'Estor Enrollable' : 'Estor Sin Taladrar'}`
          },
          blinds: [
            {
              model: selectedFabricColor.label.es,
              aperture: blindType,
              drive: driveType || drivePosition,
              width,
              height,
              quantity: 1
            }
          ],
        }),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        console.error('Error enviando formulario');
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setFormStatus('idle');
    }
  };

  // Swatch configuration based on blind type
  const mechanismColors = blindType === 'standard' 
    ? ['Blanco', 'Beige', 'Gris', 'Negro']
    : ['Blanco', 'Gris', 'Negro', 'Chocolate'];

  const driveOptions = ['Cadena de Plástico', 'Cadena de Metal', 'Motor pulsador (Red eléctrica)', 'Motor con mando (Red eléctrica)', 'Motor con mando (Batería)'];
  
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-5xl mx-auto my-8">
      {/* Configurator Header / Selector */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#252542] p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black">
            {locale === 'es' ? 'Configurador a Medida' : 'Custom Configurator'}
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            {locale === 'es' ? 'Diseña tu estor enrollable en tiempo real' : 'Design your roller blind in real-time'}
          </p>
        </div>
        {!hideTypeSelector && (
          <div className="flex bg-white/10 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => handleTypeChange('standard')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                blindType === 'standard' ? 'bg-[var(--color-primary)] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {locale === 'es' ? 'Estor Enrollable' : 'Roller Blind'}
            </button>
            <button
              onClick={() => handleTypeChange('nodrill')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                blindType === 'nodrill' ? 'bg-[var(--color-primary)] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {locale === 'es' ? 'Sin Taladrar' : 'No-Drill'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Live Preview Mockup */}
        <div className="lg:col-span-5 bg-gray-50 p-8 flex flex-col justify-between items-center border-r border-gray-100 min-h-[400px]">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {locale === 'es' ? 'Vista Previa Interactiva' : 'Interactive Preview'}
          </span>

          {/* Window / Blind Render Mock */}
          <div className="relative w-full max-w-[280px] h-[340px] bg-sky-200 border-8 border-gray-300 rounded-lg shadow-inner overflow-hidden flex flex-col justify-between mt-4">
            {/* Landscape background preview inside window */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-sky-100 to-amber-100 opacity-60 z-0" />
            
            {/* The Blind */}
            <div 
              className="w-full relative z-10 transition-all duration-500 ease-out shadow-lg"
              style={{
                height: `${(height / heightLimit.max) * 80 + 10}%`,
                backgroundColor: selectedFabricColor.hex,
                borderBottom: bottomFinish !== 'Oculto' ? `12px solid ${bottomFinish.includes('Níquel') ? '#C0C0C0' : '#ECECEC'}` : 'none'
              }}
            >
              {/* Fabric Texture details */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-black/10 mix-blend-overlay" />
            </div>

            {/* Bracket/Mechanism Render */}
            <div className="absolute -top-1 left-0 right-0 h-4 flex justify-between px-2 z-20">
              <div className="w-4 h-4 rounded-sm shadow-sm" style={{ backgroundColor: mechanismColor === 'Chocolate' ? '#5C4033' : mechanismColor === 'Gris' ? '#9CA3AF' : mechanismColor === 'Negro' ? '#1F2937' : mechanismColor === 'Beige' ? '#F5F5DC' : '#F9FAFB' }} />
              <div className="w-4 h-4 rounded-sm shadow-sm" style={{ backgroundColor: mechanismColor === 'Chocolate' ? '#5C4033' : mechanismColor === 'Gris' ? '#9CA3AF' : mechanismColor === 'Negro' ? '#1F2937' : mechanismColor === 'Beige' ? '#F5F5DC' : '#F9FAFB' }} />
            </div>

            {/* Chain/Cable Render */}
            <div 
              className={`absolute top-2 h-44 w-1.5 border-r border-dashed border-gray-400/80 z-20 ${
                drivePosition === 'Derecha' ? 'right-2' : 'left-2'
              }`}
            />
          </div>

          <div className="w-full text-center mt-6">
            <p className="text-sm font-extrabold text-[#1A1A2E]">
              {selectedFabricColor.label[locale === 'es' ? 'es' : 'en']}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {width} x {height} cm • {blindType === 'standard' ? (locale === 'es' ? 'Estor Estándar' : 'Standard Roller') : (locale === 'es' ? 'Instalación Clips' : 'No-Drill Clips')}
            </p>
          </div>
        </div>

        {/* Right Side: Step Wizard Options */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between">
          <div>
            {/* Step Counter Indicator */}
            {formStatus !== 'success' && (
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-[var(--color-primary)] uppercase tracking-wider">
                  {locale === 'es' ? `Paso ${step} de ${totalSteps}` : `Step ${step} of ${totalSteps}`}
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSteps }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx + 1 === step ? 'w-6 bg-[var(--color-primary)]' : idx + 1 < step ? 'w-2 bg-gray-600' : 'w-2 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Success screen */}
            {formStatus === 'success' ? (
              <div className="py-12 text-center space-y-6">
                <span className="text-6xl block">🎉</span>
                <h3 className="text-2xl font-black text-gray-900">
                  {locale === 'es' ? '¡Presupuesto Solicitado!' : 'Quote Requested!'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  {locale === 'es'
                    ? 'Hemos recibido tus opciones de personalización. Un asesor de mediciones e instalación te contactará de inmediato con el cálculo exacto de taller.'
                    : 'We have received your personalization options. A technician will contact you shortly with the exact workshop quote.'}
                </p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left max-w-sm mx-auto text-xs space-y-2">
                  <p><strong>{locale === 'es' ? 'Tipo:' : 'Type:'}</strong> {blindType === 'standard' ? 'Estor Enrollable' : 'Estor Sin Taladrar'}</p>
                  <p><strong>{locale === 'es' ? 'Medidas:' : 'Sizes:'}</strong> {width} x {height} cm</p>
                  <p><strong>{locale === 'es' ? 'Tejido:' : 'Fabric Color:'}</strong> {selectedFabricColor.label[locale === 'es' ? 'es' : 'en']}</p>
                  <p><strong>{locale === 'es' ? 'Mecanismo:' : 'Mechanism Color:'}</strong> {mechanismColor}</p>
                  {blindType === 'standard' && <p><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong> {driveType}</p>}
                  <p><strong>{locale === 'es' ? 'Caída:' : 'Roll:'}</strong> {rollDirection}</p>
                  <p><strong>{locale === 'es' ? 'Terminación:' : 'Bottom:'}</strong> {bottomFinish}</p>
                </div>
                <button
                  onClick={() => { setStep(1); setFormStatus('idle'); }}
                  className="bg-[#1A1A2E] hover:bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
                >
                  {locale === 'es' ? 'Configurar Otro Estor' : 'Configure Another'}
                </button>
              </div>
            ) : (
              <div className="space-y-6 min-h-[280px]">
                {/* Step 1: Dimensions */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '1. Medidas del estor' : '1. Blind Dimensions'}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                          {locale === 'es' ? 'Ancho (cm)' : 'Width (cm)'}
                        </label>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Number(e.target.value))}
                          className={`w-full p-4 rounded-xl border outline-none font-bold text-lg ${
                            isWidthValid ? 'border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]' : 'border-red-500 focus:ring-2 focus:ring-red-200'
                          }`}
                        />
                        <p className="text-[10px] text-gray-400 mt-2">
                          Min. {widthLimit.min} cm - Max. {widthLimit.max} cm 
                          {blindType === 'standard' && (locale === 'es' ? ' (Máx. 200cm en translúcidos Valencia/Shantung)' : ' (Max 200cm for translucent Valencia/Shantung)')}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                          {locale === 'es' ? 'Alto (cm)' : 'Height (cm)'}
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          className={`w-full p-4 rounded-xl border outline-none font-bold text-lg ${
                            isHeightValid ? 'border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]' : 'border-red-500 focus:ring-2 focus:ring-red-200'
                          }`}
                        />
                        <p className="text-[10px] text-gray-400 mt-2">
                          Min. {heightLimit.min} cm - Max. {heightLimit.max} cm
                        </p>
                      </div>
                    </div>

                    <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 text-xs text-gray-600 leading-relaxed mt-4">
                      <strong>{locale === 'es' ? 'NOTA:' : 'NOTE:'}</strong>{' '}
                      {blindType === 'standard'
                        ? (locale === 'es' 
                            ? 'El ancho que indiques será el ancho total del enrollable, incluidos sus soportes. De tejido tendrá 4 cm menos: 2 cm menos a cada lado.'
                            : 'The width indicated will be the total width including brackets. The fabric will be 4 cm narrower: 2 cm less on each side.')
                        : (locale === 'es'
                            ? 'El ancho que indiques será el ancho total del enrollable, incluidos sus soportes. De tejido tendrá 3,5 cm menos: 1,75 cm menos a cada lado.'
                            : 'The width indicated will be the total width including brackets. The fabric will be 3.5 cm narrower: 1.75 cm less on each side.')}
                    </div>
                  </div>
                )}

                {/* Step 2: Fabric Color */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '2. Color del tejido' : '2. Fabric Color'}</h3>
                      <button className="text-xs text-[var(--color-primary)] font-bold hover:underline">
                        {locale === 'es' ? 'Solicitar muestras gratis' : 'Request free swatches'}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {fabricColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedFabricColor(color)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-2 items-center justify-between h-24 ${
                            selectedFabricColor.id === color.id
                              ? 'border-[var(--color-primary)] ring-2 ring-orange-100'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full shadow-inner"
                            style={{ 
                              backgroundColor: color.hex, 
                              border: color.border ? `1px solid ${color.border}` : 'none' 
                            }}
                          />
                          <span className="text-[10px] font-bold text-center leading-tight text-gray-700">
                            {locale === 'es' ? color.label.es : color.label.en}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400">
                      {locale === 'es' ? '*Al elegir el color se cambia la imagen principal para ver cómo queda en el estor.' : '*Colors shown are indicative previews of original fabrics.'}
                    </p>
                  </div>
                )}

                {/* Step 3: Mechanism Color */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '3. Color de mecanismos' : '3. Mechanism Color'}</h3>
                    <p className="text-sm text-gray-500">
                      {locale === 'es' ? 'Elige el color del soporte lateral y cadena del enrollable:' : 'Choose the color of the side brackets and chain:'}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mechanismColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setMechanismColor(color)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            mechanismColor === color
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Bracket Type (Standard) / Roll direction (No-Drill) */}
                {step === 4 && blindType === 'standard' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '4. Tipo de soporte' : '4. Bracket Type'}</h3>
                    <p className="text-sm text-gray-500">
                      {locale === 'es' ? 'Selecciona la profundidad del anclaje a la pared o techo:' : 'Select brackets depth for wall or ceiling mounting:'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Soporte Pared-Techo 7cm', 'Soporte Pared 11 cm'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSupportType(opt)}
                          className={`p-5 rounded-xl border text-left transition-all ${
                            supportType === opt
                              ? 'border-[var(--color-primary)] ring-2 ring-orange-100 bg-orange-50/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className="font-bold text-gray-900">{opt}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {opt.includes('7cm') 
                              ? (locale === 'es' ? 'Soporte estándar para la mayoría de instalaciones en techo o pared sin obstáculos.' : 'Standard bracket for normal ceiling or wall mount.')
                              : (locale === 'es' ? 'Soporte extra largo ideal para salvar obstáculos como pomos de ventana o radiadores.' : 'Extra long bracket to clear handles or radiators.')}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Roll direction (No-Drill) */}
                {step === 4 && blindType === 'nodrill' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '4. Caída del tejido' : '4. Roll direction'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Pegado a pared', 'Cascada'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setRollDirection(opt)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            rollDirection === opt
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Drive (Standard) / Chain placement (No-Drill) */}
                {step === 5 && blindType === 'standard' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '5. Accionamiento' : '5. Control / Drive Option'}</h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {driveOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setDriveType(opt)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            driveType === opt
                              ? 'border-[var(--color-primary)] ring-2 ring-orange-100 bg-orange-50/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="font-bold text-gray-900 text-sm">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Chain placement (No-Drill) */}
                {step === 5 && blindType === 'nodrill' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '5. Posición de la cadena' : '5. Chain Position'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Izquierda', 'Derecha'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setDrivePosition(opt)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            drivePosition === opt
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6: Drive Position (Standard) / Bottom finish (No-Drill) */}
                {step === 6 && blindType === 'standard' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '6. Posición del accionamiento' : '6. Chain/Drive Position'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Izquierda', 'Derecha'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setDrivePosition(opt)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            drivePosition === opt
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6: Bottom finish (No-Drill) */}
                {step === 6 && blindType === 'nodrill' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '6. Terminación inferior' : '6. Bottom Finishing'}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['Oculto', 'Visto Blanco', 'Visto Níquel'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setBottomFinish(opt)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            bottomFinish === opt
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Roll Direction (Standard) / Contact Form (No-Drill) */}
                {step === 7 && blindType === 'standard' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '7. Caída del tejido' : '7. Roll direction'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Cascada', 'Pegado a pared'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setRollDirection(opt)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            rollDirection === opt
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Contact Form (No-Drill) */}
                {step === 7 && blindType === 'nodrill' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? 'Solicitar presupuesto' : 'Request Estimate'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder={locale === 'es' ? 'Nombre completo' : 'Full Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder={locale === 'es' ? 'Teléfono' : 'Phone'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder={locale === 'es' ? 'Correo electrónico' : 'Email Address'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none bg-white focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="Alicante">Alicante</option>
                      <option value="Elche">Elche</option>
                      <option value="Benidorm">Benidorm</option>
                      <option value="Torrevieja">Torrevieja</option>
                    </select>
                  </form>
                )}

                {/* Step 8: Bottom finish (Standard) */}
                {step === 8 && blindType === 'standard' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? '8. Terminación inferior' : '8. Bottom Finishing'}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['Oculto', 'Visto Blanco', 'Visto Níquel'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setBottomFinish(opt)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            bottomFinish === opt
                              ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 9: Contact Form (Standard) */}
                {step === 9 && blindType === 'standard' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">{locale === 'es' ? 'Solicitar presupuesto' : 'Request Estimate'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder={locale === 'es' ? 'Nombre completo' : 'Full Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder={locale === 'es' ? 'Teléfono' : 'Phone'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder={locale === 'es' ? 'Correo electrónico' : 'Email Address'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl outline-none bg-white focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="Alicante">Alicante</option>
                      <option value="Elche">Elche</option>
                      <option value="Benidorm">Benidorm</option>
                      <option value="Torrevieja">Torrevieja</option>
                    </select>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          {formStatus !== 'success' && (
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3.5 border border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl text-sm transition-all"
                >
                  {locale === 'es' ? 'Atrás' : 'Back'}
                </button>
              )}
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={step === 1 && !isStep1Valid}
                  className="flex-1 bg-[var(--color-primary)] hover:bg-[#c44105] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors text-center"
                >
                  {locale === 'es' ? 'Siguiente paso' : 'Next Step'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={formStatus === 'submitting' || !name || !email || !phone}
                  className="flex-1 bg-[#1A1A2E] hover:bg-[var(--color-primary)] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors text-center shadow-lg"
                >
                  {formStatus === 'submitting' 
                    ? '...' 
                    : (locale === 'es' ? 'Enviar mi configuración' : 'Send My Configuration')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
