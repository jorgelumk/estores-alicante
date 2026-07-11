import { BlogPost } from '@/data/blog/posts';

interface ArticleSchemaProps {
  post: BlogPost;
  locale: string;
}

export default function ArticleSchema({ post, locale }: ArticleSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://estoresalicante.com';
  const url = `${baseUrl}/${locale}/blog/${post.slug}`;
  
  // Asumimos un formato simple para la fecha YYYY-MM-DD
  let datePublished = new Date().toISOString();
  try {
    if (post.date) {
      // Intentar formatear la fecha si existe (p. ej. "10 de Julio de 2026" a algo válido, o usar la actual)
      // Como es un string localizado, usaremos datePublished genérico si no parsea bien
    }
  } catch (e) {}

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      `${baseUrl}${post.image}`
    ],
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": [{
      "@type": "Person",
      "name": "Estores Alicante"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Estores Alicante",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
