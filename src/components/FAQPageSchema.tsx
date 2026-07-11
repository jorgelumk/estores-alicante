export default function FAQPageSchema({ locale }: { locale: string }) {
  const faqsES = [
    {
      questionName: "¿Cuánto cuesta instalar un estor a medida en Alicante?",
      acceptedAnswerText: "El precio varía según las medidas y el tipo de tejido (screen, opaco, translúcido). Solicite presupuesto sin compromiso y le daremos un precio cerrado que incluye la instalación."
    },
    {
      questionName: "¿Trabajan en toda la provincia de Alicante?",
      acceptedAnswerText: "Sí, realizamos instalaciones en Alicante capital, Elche, Benidorm, Torrevieja y resto de la provincia."
    }
  ];

  const faqsEN = [
    {
      questionName: "How much does it cost to install a made to measure blind in Alicante?",
      acceptedAnswerText: "The price varies depending on the measurements and the type of fabric (screen, blackout, sheer). Request a free quote and we will give you a final price that includes installation."
    },
    {
      questionName: "Do you work all over the Alicante province?",
      acceptedAnswerText: "Yes, we install blinds in Alicante city, Elche, Benidorm, Torrevieja and the rest of the province."
    }
  ];

  const faqs = locale === 'es' ? faqsES : faqsEN;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.questionName,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.acceptedAnswerText
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
