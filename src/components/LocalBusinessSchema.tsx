export default function LocalBusinessSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Estores Alicante",
    "image": "https://estoresalicante.com/logo.png",
    "@id": "https://estoresalicante.com",
    "url": "https://estoresalicante.com",
    "telephone": "+34900000000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Ejemplo 1",
      "addressLocality": "Alicante",
      "postalCode": "03001",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.34517,
      "longitude": -0.48149
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "availableLanguage": ["Spanish", "English"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "María G."
        },
        "datePublished": "2026-03-12",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Instalación perfecta y los estores son de muchísima calidad. Recomiendo 100%."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Carlos M."
        },
        "datePublished": "2026-05-20",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Muy profesionales, midieron todo y en pocos días lo teníamos instalado."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
