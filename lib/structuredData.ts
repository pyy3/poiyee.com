/* Schema.org JSON-LD and plain-text summaries built from Sanity data.
   Every value comes from Site settings or an artwork; a missing field is
   left out rather than filled with text written here. */

import type { SiteSettings } from '@/lib/content';
import { plainText } from '@/lib/content';
import { dimensionsLabel, type Work } from '@/lib/works';

export const SITE_URL = 'https://poiyee.com';

export const ids = {
  website: `${SITE_URL}/#website`,
  person: `${SITE_URL}/#person`,
  artwork: (slug: string) => `${SITE_URL}/work/${slug}#artwork`,
};

export const workUrl = (w: Work) => `${SITE_URL}/work/${w.slug}`;

/* Serialised for a <script type="application/ld+json">. `<` is escaped so a
   value containing "</script>" cannot close the tag. */
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

/* Drops undefined, empty strings and empty arrays so absent data leaves no key. */
function compact<T extends Record<string, unknown>>(o: T): T {
  return Object.fromEntries(
    Object.entries(o).filter(
      ([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0),
    ),
  ) as T;
}

/* "Zürich, Switzerland" → locality "Zürich", country "Switzerland". */
function address(location?: string) {
  if (!location?.trim()) return undefined;
  const [locality, ...rest] = location.split(',').map((s) => s.trim());
  return compact({
    '@type': 'PostalAddress',
    addressLocality: locality,
    addressCountry: rest.join(', ') || undefined,
  });
}

export function siteJsonLd(s: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      compact({
        '@type': 'WebSite',
        '@id': ids.website,
        name: s.title,
        url: SITE_URL,
        publisher: { '@id': ids.person },
      }),
      compact({
        '@type': 'Person',
        '@id': ids.person,
        name: s.title,
        description: s.artistSummary,
        jobTitle: 'Painter',
        address: address(s.studioLocation),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'enquiries',
          url: `${SITE_URL}/contact`,
        },
        sameAs: s.instagram ? [s.instagram] : undefined,
        url: SITE_URL,
      }),
    ],
  };
}

const distance = (cm?: number) => (cm ? { '@type': 'Distance', name: `${cm} cm` } : undefined);

export function statementText(w: Work): string | undefined {
  return plainText(w.description).replace(/\s+/g, ' ').trim() || undefined;
}

export function artworkJsonLd(w: Work) {
  return {
    '@context': 'https://schema.org',
    ...compact({
      '@type': 'VisualArtwork',
      '@id': ids.artwork(w.slug),
      name: w.name,
      url: workUrl(w),
      image: w.media.map((m) => m.src),
      creator: { '@id': ids.person },
      artform: 'Painting',
      artMedium: w.medium,
      artworkSurface: w.medium?.toLowerCase().includes('canvas') ? 'Canvas' : undefined,
      height: distance(w.heightCm),
      width: distance(w.widthCm),
      dateCreated: w.year ? String(w.year) : undefined,
      description: statementText(w),
      offers: {
        '@type': 'Offer',
        url: workUrl(w),
        availability: w.isSold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      },
    }),
  };
}

export const availabilityLabel = (w: Work) => (w.isSold ? 'Sold' : 'Available');

/* First sentence of the statement, else a line built from the record:
   "Title — medium, dims, year. By Artist, Studio. Available." */
export function workDescription(w: Work, s: SiteSettings): string {
  const statement = statementText(w);
  if (statement) return statement.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? statement;
  const spec = [w.medium, dimensionsLabel(w), w.year].filter(Boolean).join(', ');
  const by = [s.title, s.studioLocation].filter(Boolean).join(', ');
  return [
    [w.name, spec].filter(Boolean).join(' — ') + '.',
    by ? `By ${by}.` : undefined,
    `${availabilityLabel(w)}.`,
  ]
    .filter(Boolean)
    .join(' ');
}
