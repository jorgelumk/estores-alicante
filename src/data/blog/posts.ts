import { postEs } from './es/como-elegir-estor-perfecto-salon';
import { postEs as diferenciaEs } from './es/diferencia-estores-translucidos-screen';
import { postEn } from './en/how-to-choose-perfect-blind-living-room';
import { postEs as comoMedirEstoresEs } from './es/como-medir-estores';
import { postEs as tiposDeEstoresEs } from './es/tipos-de-estores';
import { postEs as comoElegirColorEstoresEs } from './es/como-elegir-color-estores';
import { postEs as dondeComprarEstoresAlicanteEs } from './es/donde-comprar-estores-alicante';
import { postEs as estoresMedidaVsEstandarEs } from './es/estores-medida-vs-estandar';
import { postEs as comoInstalarEstoresEs } from './es/como-instalar-estores';
import { postEs as mejoresMarcasEstoresEs } from './es/mejores-marcas-estores';
import { postEs as cuantoCuestanEstoresEs } from './es/cuanto-cuestan-estores-alicante';

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
  'how-to-choose-perfect-blind-living-room': postEn
};

// Map slugs between languages for dynamic lang switcher if needed
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
    en: 'diferencia-estores-translucidos-screen'
  },
  'como-medir-estores': {
    es: 'como-medir-estores',
    en: 'como-medir-estores'
  },
  'tipos-de-estores': {
    es: 'tipos-de-estores',
    en: 'tipos-de-estores'
  },
  'como-elegir-color-estores': {
    es: 'como-elegir-color-estores',
    en: 'como-elegir-color-estores'
  },
  'donde-comprar-estores-alicante': {
    es: 'donde-comprar-estores-alicante',
    en: 'donde-comprar-estores-alicante'
  },
  'estores-medida-vs-estandar': {
    es: 'estores-medida-vs-estandar',
    en: 'estores-medida-vs-estandar'
  },
  'como-instalar-estores': {
    es: 'como-instalar-estores',
    en: 'como-instalar-estores'
  },
  'mejores-marcas-estores': {
    es: 'mejores-marcas-estores',
    en: 'mejores-marcas-estores'
  },
  'cuanto-cuestan-estores-alicante': {
    es: 'cuanto-cuestan-estores-alicante',
    en: 'cuanto-cuestan-estores-alicante'
  }
};
