/* Site-wide text from the two Sanity singletons. Missing documents or fields
   come back as undefined and the section that needs them is hidden; nothing
   falls back to copy written in code. */

import { cache } from 'react';
import type { PortableTextBlock } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { aboutQuery, privacyQuery, siteSettingsQuery } from '@/sanity/lib/queries';

export type SiteSettings = {
  title?: string;
  studioLocation?: string;
  contactEmail?: string;
  instagram?: string;
  newsletter?: string;
  footerLine?: string;
  heroHeadline?: PortableTextBlock[];
  heroTags?: string[];
  heroArtworkId?: string;
  intro?: PortableTextBlock[];
  acquireHeading?: PortableTextBlock[];
  acquireDetailHeading?: PortableTextBlock[];
  acquireText?: string;
  contactHeading?: PortableTextBlock[];
  contactText?: string;
  seoTitle?: string;
  seoDescription?: string;
  artistSummary?: string;
  ogImage?: string;
  consentText?: string;
};

export type About = {
  statement?: PortableTextBlock[];
  bio?: PortableTextBlock[];
  facts?: { _key: string; label: string; value: string }[];
};

const opts = { next: { revalidate: 60 } };

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const s = await client.fetch<SiteSettings | null>(siteSettingsQuery, {}, opts);
  if (!s) console.warn('[content] No "siteSettings" document in Sanity; site text will be empty.');
  return s ?? {};
});

export const getAbout = cache(async (): Promise<About> => {
  const a = await client.fetch<About | null>(aboutQuery, {}, opts);
  if (!a) console.warn('[content] No "about" document in Sanity; the About section is hidden.');
  return a ?? {};
});

export type Privacy = { title?: string; updated?: string; body?: PortableTextBlock[] };

export const getPrivacy = cache(async (): Promise<Privacy | null> =>
  client.fetch<Privacy | null>(privacyQuery, {}, opts),
);

export const hasText = (blocks?: PortableTextBlock[]) =>
  !!blocks?.some((b) => Array.isArray(b.children) && b.children.some((c) => c.text?.trim()));

/* Plain text of a headline, for alt text and metadata. */
export const plainText = (blocks?: PortableTextBlock[]) =>
  (blocks ?? [])
    .map((b) => (Array.isArray(b.children) ? b.children.map((c) => c.text ?? '').join('') : ''))
    .join(' ');

/* Open Graph / Twitter share fields for pages without their own image. Next.js
   replaces (doesn't merge) a parent's openGraph, so each page spreads these in.
   The image is served as a 1200×630 JPG: the uploaded PNG is ~600 KB, too heavy
   for WhatsApp previews. */
export function sharedSocial(s: SiteSettings, url: string, alt?: string) {
  const image = s.ogImage ? `${s.ogImage}?w=1200&h=630&fit=crop&fm=jpg&q=80` : undefined;
  return {
    openGraph: {
      type: 'website' as const,
      siteName: s.title,
      url,
      locale: 'en_US',
      images: image ? [{ url: image, width: 1200, height: 630, alt: alt ?? s.seoTitle }] : undefined,
    },
    twitter: { card: 'summary_large_image' as const, images: image ? [image] : undefined },
  };
}
