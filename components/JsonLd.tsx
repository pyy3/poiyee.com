import { serializeJsonLd } from '@/lib/structuredData';

/* Server-rendered schema.org data for search engines and AI assistants. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
  );
}
