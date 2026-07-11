import { Product } from '@/data/products';

interface ItemListSchemaProps {
  products: Product[];
  locale: string;
}

export default function ItemListSchema({ products, locale }: ItemListSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": locale === 'es' ? product.name.es : product.name.en,
        "url": `${baseUrl}/${locale}/${product.slug}`,
        "image": `${baseUrl}${product.image}`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": product.price.toFixed(2),
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
