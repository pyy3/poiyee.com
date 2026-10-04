/* Works data layer. Every painting comes from Sanity; there is no sample
   catalogue. An artwork with no photo is left out by the query itself. */

import type { PortableTextBlock } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { allArtworksQuery } from '@/sanity/lib/queries';

export type Media = {
  src: string;
  caption?: string;
  kind?: 'full' | 'detail' | 'install' | 'studio';
  isPrimary?: boolean;
};

export type Work = {
  /** Sanity document id. */
  docId: string;
  /** Last edit in Sanity (ISO timestamp). */
  updatedAt: string;
  id: string;
  slug: string;
  name: string;
  medium?: string;
  year?: number;
  /** Height × width in cm, as entered. */
  heightCm?: number;
  widthCm?: number;
  orient: 'landscape' | 'portrait';
  /** Primary photo first, then the rest in Studio order. */
  media: Media[];
  isSold?: boolean;
  editionInfo?: string;
  framing?: string;
  lede?: PortableTextBlock[];
  description?: PortableTextBlock[];
};

type SanityArtwork = {
  _id: string;
  _updatedAt: string;
  title?: string;
  slug?: string;
  number?: number;
  year?: number;
  medium?: string;
  dimensions?: { width?: number; height?: number; depth?: number };
  isSold?: boolean;
  editionInfo?: string;
  framing?: string;
  lede?: PortableTextBlock[];
  description?: PortableTextBlock[];
  media: Array<{
    _key: string;
    src: string;
    dimensions?: { width: number; height: number };
    caption?: string;
    kind?: Media['kind'];
    isPrimary?: boolean;
  }>;
};

function transform(a: SanityArtwork): Work {
  const primary = a.media.find((m) => m.isPrimary) ?? a.media[0];
  const media = [primary, ...a.media.filter((m) => m !== primary)];
  const px = primary.dimensions;

  return {
    docId: a._id,
    updatedAt: a._updatedAt,
    id: a.number ? String(a.number).padStart(2, '0') : a._id.slice(-4),
    slug: a.slug || a._id,
    name: a.title || 'Untitled',
    medium: a.medium,
    year: a.year,
    heightCm: a.dimensions?.height,
    widthCm: a.dimensions?.width,
    orient: px && px.width > px.height ? 'landscape' : 'portrait',
    isSold: a.isSold,
    editionInfo: a.editionInfo,
    framing: a.framing,
    lede: a.lede,
    description: a.description,
    media: media.map((m) => ({
      src: m.src,
      caption: m.caption,
      kind: m.kind,
      isPrimary: m.isPrimary,
    })),
  };
}

/* "Acrylic on canvas · 2025 · 120 × 90 cm", skipping whatever is missing. */
export function workMeta(w: Work): string {
  return [w.medium, w.year, dimensionsLabel(w)].filter(Boolean).join(' · ');
}

export function dimensionsLabel(w: Pick<Work, 'heightCm' | 'widthCm'>): string | undefined {
  return w.heightCm && w.widthCm ? `${w.heightCm} × ${w.widthCm} cm` : undefined;
}

export async function getAllWorks(): Promise<Work[]> {
  const works = await client.fetch<SanityArtwork[]>(
    allArtworksQuery,
    {},
    { next: { revalidate: 60 } },
  );
  return works.map(transform);
}

/* Returns the work plus its neighbours (wrapping around) for prev/next nav. */
export async function getWorkWithNeighbours(
  slug: string,
): Promise<{ work: Work; prev: Work; next: Work; index: number; total: number } | undefined> {
  const all = await getAllWorks();
  const i = all.findIndex((w) => w.slug === slug);
  if (i === -1) return undefined;
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  return { work: all[i], prev, next, index: i, total: all.length };
}
