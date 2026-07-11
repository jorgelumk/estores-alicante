import { Product } from '@/data/products';

interface ProductSchemaProps {
  product: Product;
  locale: string;
}

export default function ProductSchema({ product, locale }: ProductSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  const productUrl = `${baseUrl}/${locale}/${product.slug}`;
  const productName = locale === 'es' ? product.name.es : product.name.en;
  
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "image": `${baseUrl}${product.image}`,
    "description": `${productName}. ${locale === 'es' ? 'Composición' : 'Composition'}: ${product.composition}.`,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "EUR",
      "price": product.price.toFixed(2),
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "d"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toString(),
      "reviewCount": product.reviewsCount.toString()
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
