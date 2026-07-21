// Spanish Posts
import { postEs } from './es/como-elegir-estor-perfecto-salon';
import { postEs as diferenciaEs } from './es/diferencia-estores-translucidos-screen';
import { postEs as comoMedirEstoresEs } from './es/como-medir-estores';
import { postEs as tiposDeEstoresEs } from './es/tipos-de-estores';
import { postEs as comoElegirColorEstoresEs } from './es/como-elegir-color-estores';
import { postEs as dondeComprarEstoresAlicanteEs } from './es/donde-comprar-estores-alicante';
import { postEs as estoresMedidaVsEstandarEs } from './es/estores-medida-vs-estandar';
import { postEs as comoInstalarEstoresEs } from './es/como-instalar-estores';
import { postEs as mejoresMarcasEstoresEs } from './es/mejores-marcas-estores';
import { postEs as cuantoCuestanEstoresEs } from './es/cuanto-cuestan-estores-alicante';

// English Posts
import { postEn as livingRoomEn } from './en/how-to-choose-perfect-blind-living-room';
import { postEn as differenceEn } from './en/difference-translucent-screen-blinds';
import { postEn as measureEn } from './en/how-to-measure-blinds';
import { postEn as typesEn } from './en/types-of-blinds';
import { postEn as colorEn } from './en/how-to-choose-blinds-color';
import { postEn as whereToBuyEn } from './en/where-to-buy-blinds-alicante';
import { postEn as customVsStandardEn } from './en/custom-vs-standard-blinds';
import { postEn as installEn } from './en/how-to-install-blinds';
import { postEn as brandsEn } from './en/best-blinds-brands';
import { postEn as costEn } from './en/how-much-do-blinds-cost-alicante';

export interface BlogPost {
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  slug: string;
  content: string;
  toc?: { id: string; text: string }[];
}

export const postsDataEs: Record<string, BlogPost> = {
  'como-elegir-estor-perfecto-salon': postEs,
  'diferencia-estores-translucidos-screen': diferenciaEs,
  'como-medir-estores': comoMedirEstoresEs,
  'tipos-de-estores': tiposDeEstoresEs,
  'como-elegir-color-estores': comoElegirColorEstoresEs,
  'donde-comprar-estores-alicante': dondeComprarEstoresAlicanteEs,
  'estores-medida-vs-estandar': estoresMedidaVsEstandarEs,
  'como-instalar-estores': comoInstalarEstoresEs,
  'mejores-marcas-estores': mejoresMarcasEstoresEs,
  'cuanto-cuestan-estores-alicante': cuantoCuestanEstoresEs
};

export const postsDataEn: Record<string, BlogPost> = {
  'how-to-choose-perfect-blind-living-room': livingRoomEn,
  'difference-translucent-screen-blinds': differenceEn,
  'how-to-measure-blinds': measureEn,
  'types-of-blinds': typesEn,
  'how-to-choose-blinds-color': colorEn,
  'where-to-buy-blinds-alicante': whereToBuyEn,
  'custom-vs-standard-blinds': customVsStandardEn,
  'how-to-install-blinds': installEn,
  'best-blinds-brands': brandsEn,
  'how-much-do-blinds-cost-alicante': costEn
};

// Map slugs between languages for dynamic language switching
export const slugMap: Record<string, { es: string; en: string }> = {
  'como-elegir-estor-perfecto-salon': {
    es: 'como-elegir-estor-perfecto-salon',
    en: 'how-to-choose-perfect-blind-living-room'
  },
  'how-to-choose-perfect-blind-living-room': {
    es: 'como-elegir-estor-perfecto-salon',
    en: 'how-to-choose-perfect-blind-living-room'
  },
  'diferencia-estores-translucidos-screen': {
    es: 'diferencia-estores-translucidos-screen',
    en: 'difference-translucent-screen-blinds'
  },
  'difference-translucent-screen-blinds': {
    es: 'diferencia-estores-translucidos-screen',
    en: 'difference-translucent-screen-blinds'
  },
  'como-medir-estores': {
    es: 'como-medir-estores',
    en: 'how-to-measure-blinds'
  },
  'how-to-measure-blinds': {
    es: 'como-medir-estores',
    en: 'how-to-measure-blinds'
  },
  'tipos-de-estores': {
    es: 'tipos-de-estores',
    en: 'types-of-blinds'
  },
  'types-of-blinds': {
    es: 'tipos-de-estores',
    en: 'types-of-blinds'
  },
  'como-elegir-color-estores': {
    es: 'como-elegir-color-estores',
    en: 'how-to-choose-blinds-color'
  },
  'how-to-choose-blinds-color': {
    es: 'como-elegir-color-estores',
    en: 'how-to-choose-blinds-color'
  },
  'donde-comprar-estores-alicante': {
    es: 'donde-comprar-estores-alicante',
    en: 'where-to-buy-blinds-alicante'
  },
  'where-to-buy-blinds-alicante': {
    es: 'donde-comprar-estores-alicante',
    en: 'where-to-buy-blinds-alicante'
  },
  'estores-medida-vs-estandar': {
    es: 'estores-medida-vs-estandar',
    en: 'custom-vs-standard-blinds'
  },
  'custom-vs-standard-blinds': {
    es: 'estores-medida-vs-estandar',
    en: 'custom-vs-standard-blinds'
  },
  'como-instalar-estores': {
    es: 'como-instalar-estores',
    en: 'how-to-install-blinds'
  },
  'how-to-install-blinds': {
    es: 'como-instalar-estores',
    en: 'how-to-install-blinds'
  },
  'mejores-marcas-estores': {
    es: 'mejores-marcas-estores',
    en: 'best-blinds-brands'
  },
  'best-blinds-brands': {
    es: 'mejores-marcas-estores',
    en: 'best-blinds-brands'
  },
  'cuanto-cuestan-estores-alicante': {
    es: 'cuanto-cuestan-estores-alicante',
    en: 'how-much-do-blinds-cost-alicante'
  },
  'how-much-do-blinds-cost-alicante': {
    es: 'cuanto-cuestan-estores-alicante',
    en: 'how-much-do-blinds-cost-alicante'
  }
};
