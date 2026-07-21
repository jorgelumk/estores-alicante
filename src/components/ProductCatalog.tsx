'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

import { Product, products } from '@/data/products';
import ItemListSchema from '@/components/ItemListSchema';

interface ProductCatalogProps {
  locale: string;
  initialCategory?: 'all' | 'screen' | 'translucido' | 'opaco' | 'motorizados' | 'termicos' | 'paqueto';
  initialNoDrill?: 'all' | 'standard' | 'nodrill';
  hideFilters?: boolean;
}

export default function ProductCatalog({
  locale,
  initialCategory = 'all',
  initialNoDrill = 'all',
  hideFilters = false,
}: ProductCatalogProps) {
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory && ['screen', 'translucido', 'opaco'].includes(initialCategory) ? [initialCategory] : []
  );
  const [selectedInstallTypes, setSelectedInstallTypes] = useState<string[]>(
    initialNoDrill === 'nodrill' ? ['nodrill'] : initialNoDrill === 'standard' ? ['standard'] : []
  );
  const [selectedDrives, setSelectedDrives] = useState<string[]>(
    initialCategory === 'motorizados' ? ['motor'] : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(130);
  const [selectedApertures, setSelectedApertures] = useState<string[]>([]);

  // Mobile Filters Drawer Toggle
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter Handler Functions
  const toggleFilter = (value: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (state.includes(value)) {
      setState(state.filter(v => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedInstallTypes([]);
    setSelectedDrives([]);
    setSelectedColors([]);
    setSelectedApertures([]);
    setMaxPrice(130);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Special category filters: termicos
      if (initialCategory === 'termicos' && p.category !== 'screen' && p.category !== 'opaco') {
        return false;
      }
      // Hard filter by initial category for category-specific landing pages
      if (initialCategory && ['screen', 'translucido', 'opaco'].includes(initialCategory)) {
        if (p.category !== initialCategory) return false;
      }

      // 1. Category Filter (Tejido)
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      // 2. Installation Type Filter
      if (selectedInstallTypes.length > 0) {
        const type = p.isNoDrill ? 'nodrill' : 'standard';
        if (!selectedInstallTypes.includes(type)) return false;
      }
      // 3. Drive Filter (Accionamiento)
      if (selectedDrives.length > 0) {
        const productDrives = p.drive.es.toLowerCase();
        const matches = selectedDrives.some(d => productDrives.includes(d.toLowerCase()));
        if (!matches) return false;
      }
      // 4. Color Filter
      if (selectedColors.length > 0) {
        const matches = selectedColors.some(c => p.colorsList.includes(c));
        if (!matches) return false;
      }
      // 5. Aperture Filter (For Screen Blinds)
      if (selectedApertures.length > 0) {
        if (!p.aperture) return false;
        const matches = selectedApertures.some(a => p.aperture?.includes(a));
        if (!matches) return false;
      }
      // 6. Price Range Filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [products, selectedCategories, selectedInstallTypes, selectedDrives, selectedColors, selectedApertures, maxPrice, initialCategory]);

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <ItemListSchema products={filteredProducts} locale={locale} />
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
            {locale === 'es' ? 'Colección de Estores a Medida' : 'Made to Measure Blinds Collection'}
          </h2>
          <p className="text-gray-600">
            {locale === 'es'
              ? 'Nuestra gama seleccionada de estores con descuentos excepcionales. Elige tu tipo de tejido e instalación.'
              : 'Our curated collection of roller blinds with exceptional discounts. Choose your fabric and installation type.'}
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        {!hideFilters && (
          <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-sm font-bold text-gray-800">
              {locale === 'es' 
                ? `${filteredProducts.length} productos encontrados` 
                : `${filteredProducts.length} products found`}
            </span>
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 bg-[#1A1A2E] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>🎛️</span>
              <span>{locale === 'es' ? 'Filtros' : 'Filters'}</span>
              { (selectedCategories.length + selectedInstallTypes.length + selectedDrives.length + selectedColors.length + selectedApertures.length) > 0 && (
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold">
                  {selectedCategories.length + selectedInstallTypes.length + selectedDrives.length + selectedColors.length + selectedApertures.length}
                </span>
              )}
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Filters Sidebar (Left Column - Desktop, Drawer/Collapsible - Mobile) */}
          {!hideFilters && (
            <aside className={`w-full lg:w-64 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-8 flex-shrink-0 lg:block ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center border-b pb-4">
              <div className="font-extrabold text-lg text-[#1A1A2E] flex items-center gap-2">
                <span>🎛️</span>
                <span>{locale === 'es' ? 'Filtros' : 'Filters'}</span>
              </div>
              <button 
                onClick={clearAllFilters}
                className="text-xs text-[var(--color-primary)] hover:underline font-semibold cursor-pointer"
              >
                {locale === 'es' ? 'Limpiar todo' : 'Clear all'}
              </button>
            </div>

            {/* Filter Group: Tipo de Tejido */}
            {!['screen', 'translucido', 'opaco'].includes(initialCategory || '') && (
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#1A1A2E] uppercase tracking-wider">
                {locale === 'es' ? 'Tipo de Tejido' : 'Fabric Type'}
              </div>
              <div className="space-y-2">
                {[
                  { id: 'screen', es: 'Screen', en: 'Screen' },
                  { id: 'translucido', es: 'Translúcidos', en: 'Translucent' },
                  { id: 'opaco', es: 'Opacos / Blackout', en: 'Blackout' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group text-sm text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item.id)}
                      onChange={() => toggleFilter(item.id, selectedCategories, setSelectedCategories)}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <span>{locale === 'es' ? item.es : item.en}</span>
                  </label>
                ))}
              </div>
            </div>
            )}

            {/* Filter Group: Tipo de Instalación */}
            <div className="space-y-3 border-t pt-5">
              <div className="font-bold text-sm text-[#1A1A2E] uppercase tracking-wider">
                {locale === 'es' ? 'Instalación' : 'Installation'}
              </div>
              <div className="space-y-2">
                {[
                  { id: 'standard', es: 'Estándar (Con taladro)', en: 'Standard (Drilling)' },
                  { id: 'nodrill', es: 'Sin Taladrar (Clips)', en: 'No-Drill (Clips)' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group text-sm text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedInstallTypes.includes(item.id)}
                      onChange={() => toggleFilter(item.id, selectedInstallTypes, setSelectedInstallTypes)}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <span>{locale === 'es' ? item.es : item.en}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Grado de Apertura (For Screen) */}
            <div className="space-y-3 border-t pt-5">
              <div className="font-bold text-sm text-[#1A1A2E] uppercase tracking-wider">
                {locale === 'es' ? 'Apertura (Screen)' : 'Openness (Screen)'}
              </div>
              <div className="space-y-2">
                {[
                  { id: '1%', es: '1% (Privacidad alta)', en: '1% (High Privacy)' },
                  { id: '5%', es: '5% (Luz / Vista media)', en: '5% (Medium view)' },
                  { id: 'fiberglass', es: 'Fibra de vidrio', en: 'Fiberglass' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group text-sm text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedApertures.includes(item.id)}
                      onChange={() => toggleFilter(item.id, selectedApertures, setSelectedApertures)}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <span>{locale === 'es' ? item.es : item.en}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Accionamiento */}
            <div className="space-y-3 border-t pt-5">
              <div className="font-bold text-sm text-[#1A1A2E] uppercase tracking-wider">
                {locale === 'es' ? 'Accionamiento' : 'Drive'}
              </div>
              <div className="space-y-2">
                {[
                  { id: 'Cadena', es: 'Cadena manual', en: 'Manual chain' },
                  { id: 'Motor', es: 'Motorizado / Domótica', en: 'Motorized / Smart' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group text-sm text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedDrives.includes(item.id)}
                      onChange={() => toggleFilter(item.id, selectedDrives, setSelectedDrives)}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <span>{locale === 'es' ? item.es : item.en}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Colores */}
            <div className="space-y-3 border-t pt-5">
              <div className="font-bold text-sm text-[#1A1A2E] uppercase tracking-wider">
                {locale === 'es' ? 'Color' : 'Color'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'blanco', es: 'Blanco', en: 'White', hex: '#FFFFFF', border: 'border-gray-300' },
                  { id: 'beige', es: 'Beige', en: 'Beige', hex: '#F5F5DC', border: 'border-gray-200' },
                  { id: 'gris', es: 'Gris', en: 'Grey', hex: '#808080', border: 'border-transparent' },
                  { id: 'negro', es: 'Negro', en: 'Black', hex: '#000000', border: 'border-transparent' },
                  { id: 'azul', es: 'Azul', en: 'Blue', hex: '#1E3A8A', border: 'border-transparent' },
                  { id: 'amarillo', es: 'Amarillo', en: 'Yellow', hex: '#FBBF24', border: 'border-transparent' },
                  { id: 'rojo', es: 'Rojo', en: 'Red', hex: '#DC2626', border: 'border-transparent' },
                  { id: 'verde', es: 'Verde', en: 'Green', hex: '#16A34A', border: 'border-transparent' }
                ].map(color => (
                  <button
                    key={color.id}
                    onClick={() => toggleFilter(color.id, selectedColors, setSelectedColors)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      selectedColors.includes(color.id)
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[#1A1A2E]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span 
                      className={`w-3.5 h-3.5 rounded-full border ${color.border}`} 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="truncate">{locale === 'es' ? color.es : color.en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Rango de Precio */}
            <div className="space-y-3 border-t pt-5">
              <div className="flex justify-between items-center text-sm font-bold text-[#1A1A2E] uppercase tracking-wider">
                <span>{locale === 'es' ? 'Precio Máx' : 'Max Price'}</span>
                <span className="text-[var(--color-primary)]">{maxPrice}€</span>
              </div>
              <input
                type="range"
                min="16"
                max="130"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>16€</span>
                <span>130€</span>
              </div>
            </div>
          </aside>
          )}

          {/* Product Grid Area (Right Column) */}
          <div className="flex-1 w-full">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm w-full space-y-4">
                <span className="text-5xl block">🔍</span>
                <h3 className="text-xl font-extrabold text-[#1A1A2E]">
                  {locale === 'es' ? 'No se encontraron estores' : 'No blinds found'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm">
                  {locale === 'es' 
                    ? 'No hay productos que cumplan con todos los filtros seleccionados. Intenta restablecer o modificar los criterios.' 
                    : 'There are no products matching all selected filters. Try resetting or modifying the criteria.'}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#1A1A2E] hover:bg-[var(--color-primary)] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  {locale === 'es' ? 'Ver todos los productos' : 'View all products'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {p.discount && (
                        <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                          {p.discount}
                        </span>
                      )}
                      {p.isNoDrill && (
                        <span className="absolute top-4 right-4 z-10 bg-[#1A1A2E] text-white text-[10px] font-bold px-2 py-1 rounded">
                          {locale === 'es' ? '¡Sin Taladrar!' : 'No-Drill!'}
                        </span>
                      )}
                      <Image
                        src={p.image}
                        alt={locale === 'es' ? p.name.es : p.name.en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                          <span>{locale === 'es' ? p.categoryLabel.es : p.categoryLabel.en}</span>
                          <span className="text-yellow-500">★ {p.rating} ({p.reviewsCount})</span>
                        </div>
                        <h3 className="text-base font-extrabold text-[#1A1A2E] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                          <Link href={`/${p.slug}` as any}>
                            {locale === 'es' ? p.name.es : p.name.en}
                          </Link>
                        </h3>
                        <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-50">
                          {p.aperture && (
                            <div><strong>{locale === 'es' ? 'Apertura:' : 'Openness:'}</strong> {p.aperture}</div>
                          )}
                          <div><strong>{locale === 'es' ? 'Visibilidad:' : 'Visibility:'}</strong> {locale === 'es' ? p.visibility.es : p.visibility.en}</div>
                          <div><strong>{locale === 'es' ? 'Privacidad:' : 'Privacy:'}</strong> {locale === 'es' ? p.privacy.es : p.privacy.en}</div>
                          <div className="truncate"><strong>{locale === 'es' ? 'Composición:' : 'Composition:'}</strong> {p.composition}</div>
                          <div><strong>{locale === 'es' ? 'Accionamiento:' : 'Drive:'}</strong> {locale === 'es' ? p.drive.es : p.drive.en}</div>
                          <div><strong>{locale === 'es' ? 'Envío:' : 'Shipping:'}</strong> {locale === 'es' ? p.shipping.es : p.shipping.en}</div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-2 justify-between">
                          <span className="text-xs text-gray-400">{locale === 'es' ? 'Desde:' : 'From:'}</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-[#1A1A2E]">
                              {p.price.toFixed(2)}€
                            </span>
                            {p.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {p.originalPrice.toFixed(2)}€
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/${p.slug}` as any}
                          className="block text-center w-full bg-[#1A1A2E] hover:bg-[var(--color-primary)] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
                        >
                          {locale === 'es' ? 'Personalizar y Comprar' : 'Customize & Buy'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
