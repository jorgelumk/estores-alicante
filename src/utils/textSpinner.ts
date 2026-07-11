// src/utils/textSpinner.ts

import { siteConfig } from '@/config/siteConfig';

/**
 * Genera un hash simple basado en un string (la ciudad) para servir como semilla
 * y asegurar que el texto generado sea siempre idéntico para la misma web (SEO estático).
 */
function getDeterministicIndex(seed: string, optionsCount: number, offset: number): number {
  let hash = 0;
  const combinedSeed = seed + offset.toString();
  for (let i = 0; i < combinedSeed.length; i++) {
    hash = combinedSeed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % optionsCount;
}

/**
 * Procesa un texto en formato spintax:
 * "Nuestros estores {a medida|personalizados} son {perfectos|ideales} para tu casa en {city}."
 * 
 * Devuelve siempre el mismo texto para la misma ciudad (semilla estática).
 */
export function spinText(template: string): string {
  // Reemplazar la palabra clave {city}
  let processed = template.replace(/{city}/g, siteConfig.city);
  processed = processed.replace(/{province}/g, siteConfig.province);

  const regex = /\{([^{}]+)\}/g;
  let match;
  let offset = 0;

  // Seguimos buscando bloques {opcion1|opcion2|opcion3}
  while ((match = regex.exec(processed)) !== null) {
    const fullMatch = match[0];
    const options = match[1].split('|');
    
    // Determinamos de forma estática qué opción usar basándonos en la ciudad del siteConfig
    const selectedIdx = getDeterministicIndex(siteConfig.city, options.length, offset);
    const chosenOption = options[selectedIdx].trim();
    
    processed = processed.replace(fullMatch, chosenOption);
    
    // Reiniciamos la búsqueda de regex ya que el string ha cambiado de tamaño
    regex.lastIndex = 0;
    offset++;
  }

  return processed;
}
