'use client';

import { useState } from 'react';

interface BlinItem {
  id: string;
  model: string;
  fabric: string;
  aperture: string;
  color: string;
  drive: string;
  width: string;
  height: string;
  installation: string;
  quantity: string;
}

const MODELOS: Record<string, { label: string; fabrics: string[]; apertures?: string[]; drives: string[] }> = {
  'screen-5': {
    label: 'Estor Screen 5%',
    fabrics: ['Screen 5% (Poliéster/PVC)'],
    apertures: ['5%'],
    drives: ['Cadena manual', 'Motor eléctrico'],
  },
  'screen-1': {
    label: 'Estor Screen 1%',
    fabrics: ['Screen 1% (Poliéster/PVC)'],
    apertures: ['1%'],
    drives: ['Cadena manual', 'Motor eléctrico'],
  },
  'screen-fiberglass': {
    label: 'Estor Screen Fiberglass',
    fabrics: ['Screen Fiberglass (Fibra de vidrio/PVC)'],
    apertures: ['1%', '3%', '5%'],
    drives: ['Cadena manual', 'Motor eléctrico'],
  },
  'translucido-valencia': {
    label: 'Estor Translúcido Valencia',
    fabrics: ['Translúcido Valencia (100% Poliéster)'],
    drives: ['Cadena manual', 'Motor eléctrico'],
  },
  'translucido-shantung': {
    label: 'Estor Translúcido Shantung',
    fabrics: ['Translúcido Shantung (100% Poliéster)'],
    drives: ['Cadena manual', 'Motor eléctrico'],
  },
  'opaco-oslo': {
    label: 'Estor Opaco Oslo',
    fabrics: ['Opaco Oslo (Fibra de vidrio/PVC)'],
    drives: ['Cadena manual', 'Motor eléctrico'],
  },
  'sin-taladrar-screen-5': {
    label: 'Estor sin Taladrar Screen 5%',
    fabrics: ['Screen 5% (Poliéster/PVC)'],
    apertures: ['5%'],
    drives: ['Cadena manual'],
  },
  'sin-taladrar-screen-1': {
    label: 'Estor sin Taladrar Screen 1%',
    fabrics: ['Screen 1% (Poliéster/PVC)'],
    apertures: ['1%'],
    drives: ['Cadena manual'],
  },
  'sin-taladrar-screen-fiberglass': {
    label: 'Estor sin Taladrar Screen Fiberglass',
    fabrics: ['Screen Fiberglass (Fibra de vidrio/PVC)'],
    apertures: ['1%', '3%', '5%'],
    drives: ['Cadena manual'],
  },
  'sin-taladrar-translucido-valencia': {
    label: 'Estor sin Taladrar Translúcido Valencia',
    fabrics: ['Translúcido Valencia (100% Poliéster)'],
    drives: ['Cadena manual'],
  },
  'sin-taladrar-translucido-shantung': {
    label: 'Estor sin Taladrar Translúcido Shantung',
    fabrics: ['Translúcido Shantung (100% Poliéster)'],
    drives: ['Cadena manual'],
  },
  'sin-taladrar-opaco-oslo': {
    label: 'Estor sin Taladrar Opaco Oslo',
    fabrics: ['Opaco Oslo (Fibra de vidrio/PVC)'],
    drives: ['Cadena manual'],
  },
};

const COLORES = [
  'Blanco', 'Marfil', 'Crema', 'Beige', 'Arena', 'Gris Perla',
  'Gris Claro', 'Gris Medio', 'Gris Oscuro', 'Antracita', 'Negro',
  'Marrón', 'Azul Acero', 'Verde Musgo', 'Otro (indicar en comentarios)',
];

const MUNICIPIOS_ALICANTE = [
  'Alicante (capital)', 'Elche', 'Torrevieja', 'Benidorm', 'Alcoy / Alcoi',
  'Villajoyosa', 'Orihuela', 'Santa Pola', 'Guardamar del Segura', 'Dénia',
  'Xàbia / Jávea', 'Calp / Calpe', 'Altea', 'Alfàs del Pi / Alfaz del Pi',
  'Finestrat', 'La Nucía', 'Benissa', 'Teulada-Moraira', 'Pego', 'Ondara',
  'El Campello', 'Mutxamel / Mutxamel', 'San Vicente del Raspeig',
  'Alicante - Playa de San Juan', 'Alicante - Vistahermosa', 'Novelda',
  'Petrer', 'Elda', 'Sax', 'Villena', 'Ibi', 'Cocentaina',
  'Crevillent', 'Rojales', 'Los Montesinos', 'Pilar de la Horadada',
  'Bigastro', 'Callosa de Segura', 'Almoradí', 'Dolores', 'Catral',
  'Otro municipio',
];

const newBlind = (): BlinItem => ({
  id: crypto.randomUUID(),
  model: '',
  fabric: '',
  aperture: '',
  color: '',
  drive: '',
  width: '',
  height: '',
  installation: 'sin-instalacion',
  quantity: '1',
});

interface Props {
  locale: string;
}

export default function PresupuestoForm({ locale }: Props) {
  const es = locale === 'es';
  const [blinds, setBlinds] = useState<BlinItem[]>([newBlind()]);
  const [personalData, setPersonalData] = useState({
    name: '', email: '', phone: '',
    street: '', number: '', postal: '', municipio: '',
    installation: 'sin-instalacion',
    comments: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // --- Blind helpers ---
  const updateBlind = (id: string, field: keyof BlinItem, value: string) => {
    setBlinds(prev => prev.map(b => {
      if (b.id !== id) return b;
      const updated = { ...b, [field]: value };
      // Reset dependent fields when model changes
      if (field === 'model') {
        updated.fabric = '';
        updated.aperture = '';
        updated.drive = '';
      }
      return updated;
    }));
  };

  const addBlind = () => setBlinds(prev => [...prev, newBlind()]);
  const removeBlind = (id: string) => setBlinds(prev => prev.filter(b => b.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'presupuesto',
          personalData,
          blinds,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        console.error('Error enviando presupuesto');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Error enviando presupuesto:', error);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center space-y-4">
        <span className="text-5xl block">✅</span>
        <h2 className="text-2xl font-extrabold text-green-800">
          {es ? '¡Solicitud recibida!' : 'Request received!'}
        </h2>
        <p className="text-green-700 max-w-md mx-auto">
          {es
            ? 'Te enviaremos el presupuesto personalizado en menos de 2 horas. ¡Gracias por confiar en nosotros!'
            : 'We\'ll send your personalised quote within 2 hours. Thank you for choosing us!'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── STEP 1: Blinds ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm">1</span>
          <h2 className="text-xl font-extrabold text-[#1A1A2E]">
            {es ? 'Configura tus estores' : 'Configure your blinds'}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {es
            ? 'Puedes añadir tantos estores como necesites. Cada uno puede tener su propia configuración.'
            : 'You can add as many blinds as you need. Each can have its own configuration.'}
        </p>

        {blinds.map((blind, idx) => {
          const modelData = blind.model ? MODELOS[blind.model] : null;
          return (
            <div key={blind.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5 relative">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#1A1A2E]">
                  {es ? `Estor ${idx + 1}` : `Blind ${idx + 1}`}
                </h3>
                {blinds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBlind(blind.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    {es ? '✕ Eliminar' : '✕ Remove'}
                  </button>
                )}
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {es ? 'Modelo *' : 'Model *'}
                </label>
                <select
                  required
                  value={blind.model}
                  onChange={e => updateBlind(blind.id, 'model', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white text-sm"
                >
                  <option value="">{es ? '— Selecciona modelo —' : '— Select model —'}</option>
                  <optgroup label={es ? 'Estores enrollables' : 'Roller blinds'}>
                    {Object.entries(MODELOS).filter(([k]) => !k.startsWith('sin-taladrar')).map(([key, m]) => (
                      <option key={key} value={key}>{m.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label={es ? 'Estores sin taladrar' : 'No-drill blinds'}>
                    {Object.entries(MODELOS).filter(([k]) => k.startsWith('sin-taladrar')).map(([key, m]) => (
                      <option key={key} value={key}>{m.label}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Aperture (only for screen models) */}
              {modelData?.apertures && modelData.apertures.length > 1 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {es ? 'Grado de apertura *' : 'Openness factor *'}
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {modelData.apertures.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => updateBlind(blind.id, 'aperture', a)}
                        className={`px-5 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                          blind.aperture === a
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow'
                            : 'border-gray-300 text-gray-700 hover:border-[var(--color-primary)]'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color info note */}
              {blind.model && (
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <span className="text-xl shrink-0">🎨</span>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {es
                      ? 'El color de la tela se elige cuando verificamos las medidas contigo, sin ningún suplemento adicional. Disponemos de más de 15 colores por modelo.'
                      : 'Fabric colour is chosen when we verify the measurements with you, at no extra charge. Over 15 colours available per model.'}
                  </p>
                </div>
              )}

              {/* Drive */}
              {modelData && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {es ? 'Accionamiento *' : 'Control type *'}
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {modelData.drives.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => updateBlind(blind.id, 'drive', d)}
                        className={`px-5 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                          blind.drive === d
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow'
                            : 'border-gray-300 text-gray-700 hover:border-[var(--color-primary)]'
                        }`}
                      >
                        {d === 'Cadena manual' ? `🔗 ${d}` : `⚡ ${d}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {blind.model && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {es ? 'Ancho (cm) *' : 'Width (cm) *'}
                    </label>
                    <input
                      type="number"
                      required
                      min={20}
                      max={300}
                      placeholder={es ? 'ej: 120' : 'e.g. 120'}
                      value={blind.width}
                      onChange={e => updateBlind(blind.id, 'width', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {es ? 'Alto (cm) *' : 'Height (cm) *'}
                    </label>
                    <input
                      type="number"
                      required
                      min={20}
                      max={350}
                      placeholder={es ? 'ej: 180' : 'e.g. 180'}
                      value={blind.height}
                      onChange={e => updateBlind(blind.id, 'height', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {es ? 'Cantidad *' : 'Quantity *'}
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={20}
                      value={blind.quantity}
                      onChange={e => updateBlind(blind.id, 'quantity', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add blind button */}
        <button
          type="button"
          onClick={addBlind}
          className="w-full py-3 rounded-xl border-2 border-dashed border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          {es ? 'Añadir otro estor' : 'Add another blind'}
        </button>
      </div>

      {/* ── STEP 2: Personal data ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm">2</span>
          <h2 className="text-xl font-extrabold text-[#1A1A2E]">
            {es ? 'Tus datos de contacto' : 'Your contact details'}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {es ? 'Nombre y apellidos *' : 'Full name *'}
              </label>
              <input
                type="text"
                required
                placeholder={es ? 'María García López' : 'John Smith'}
                value={personalData.name}
                onChange={e => setPersonalData(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {es ? 'Teléfono *' : 'Phone *'}
              </label>
              <input
                type="tel"
                required
                placeholder="+34 600 000 000"
                value={personalData.phone}
                onChange={e => setPersonalData(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {es ? 'Correo electrónico *' : 'Email address *'}
            </label>
            <input
              type="email"
              required
              placeholder="maria@ejemplo.com"
              value={personalData.email}
              onChange={e => setPersonalData(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {es ? 'Dirección de instalación *' : 'Installation address *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  required
                  placeholder={es ? 'Nombre de la calle' : 'Street name'}
                  value={personalData.street}
                  onChange={e => setPersonalData(p => ({ ...p, street: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder={es ? 'Nº / Piso / Puerta' : 'No. / Floor / Door'}
                  value={personalData.number}
                  onChange={e => setPersonalData(p => ({ ...p, number: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Postal + Municipio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {es ? 'Código postal *' : 'Postal code *'}
              </label>
              <input
                type="text"
                required
                maxLength={5}
                placeholder="03001"
                value={personalData.postal}
                onChange={e => setPersonalData(p => ({ ...p, postal: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {es ? 'Municipio *' : 'Town / City *'}
              </label>
              <select
                required
                value={personalData.municipio}
                onChange={e => setPersonalData(p => ({ ...p, municipio: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white text-sm"
              >
                <option value="">{es ? '— Selecciona municipio —' : '— Select town —'}</option>
                {MUNICIPIOS_ALICANTE.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── STEP 3: Installation preference ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm">3</span>
          <h2 className="text-xl font-extrabold text-[#1A1A2E]">
            {es ? '¿Quieres instalación?' : 'Do you want installation?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPersonalData(p => ({ ...p, installation: 'con-instalacion' }))}
            className={`rounded-xl border-2 p-6 text-left space-y-2 transition-all ${
              personalData.installation === 'con-instalacion'
                ? 'border-[var(--color-primary)] bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-3xl block">🔧</span>
            <p className="font-extrabold text-[#1A1A2E]">
              {es ? 'Sí, con instalación' : 'Yes, with installation'}
            </p>
            <p className="text-sm text-gray-500">
              {es
                ? 'Nuestro instalador profesional se desplaza a tu domicilio y lo deja todo montado.'
                : 'Our professional installer comes to your home and sets everything up.'}
            </p>
          </button>
          <button
            type="button"
            onClick={() => setPersonalData(p => ({ ...p, installation: 'sin-instalacion' }))}
            className={`rounded-xl border-2 p-6 text-left space-y-2 transition-all ${
              personalData.installation === 'sin-instalacion'
                ? 'border-[var(--color-primary)] bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-3xl block">📦</span>
            <p className="font-extrabold text-[#1A1A2E]">
              {es ? 'No, solo el producto' : 'No, product only'}
            </p>
            <p className="text-sm text-gray-500">
              {es
                ? 'Recibes el estor a medida en casa. Incluye instrucciones y soporte por WhatsApp.'
                : 'Receive the custom blind at home. Includes instructions and WhatsApp support.'}
            </p>
          </button>
        </div>
      </div>

      {/* ── Comments ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {es ? 'Comentarios adicionales (opcional)' : 'Additional comments (optional)'}
        </label>
        <textarea
          rows={4}
          placeholder={es
            ? 'Ej: ventanas de PVC, piso de alquiler, necesito colores especiales...'
            : 'E.g. PVC windows, rented flat, need special colours...'}
          value={personalData.comments}
          onChange={e => setPersonalData(p => ({ ...p, comments: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm resize-y"
        />
      </div>

      {/* ── Summary pill ── */}
      <div className="bg-[#1A1A2E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-lg">
            {es
              ? `${blinds.length} estor${blinds.length > 1 ? 'es' : ''} configurado${blinds.length > 1 ? 's' : ''}`
              : `${blinds.length} blind${blinds.length > 1 ? 's' : ''} configured`}
          </p>
          <p className="text-gray-400 text-sm">
            {es
              ? 'Recibirás el presupuesto en menos de 2 horas por email y WhatsApp'
              : 'You\'ll receive the quote within 2 hours by email and WhatsApp'}
          </p>
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="shrink-0 bg-[var(--color-primary)] hover:bg-[#c44105] text-white font-bold py-4 px-10 rounded-xl text-lg transition-all hover:scale-105 shadow-lg disabled:opacity-70 disabled:hover:scale-100"
        >
          {status === 'submitting'
            ? (es ? 'Enviando...' : 'Sending...')
            : (es ? 'Solicitar Presupuesto Gratis' : 'Get Free Quote')}
        </button>
      </div>
    </form>
  );
}
