/* Content pages ("page" documents in Sanity), served at /<slug>. Only
   published pages are read; drafts stay private until published in Studio.
   Missing fields come back undefined and the part of the page that needs
   them is hidden. */

import { cache } from 'react';
import { groq } from 'next-sanity';
import type { PortableTextBlock } from '@portabletext/react';
import { client } from '@/sanity/lib/client';

export type PageLanguage = 'de' | 'en';

export type PageWork = {
  _id: string;
  title?: string;
  slug?: string;
  isSold?: boolean;
  year?: number;
  medium?: string;
  dimensions?: { width?: number; height?: number };
  photo?: { src: string; dimensions?: { width: number; height: number } };
};

export type PageSection =
  | { _type: 'textSection'; _key: string; heading?: string; body?: PortableTextBlock[] }
  | { _type: 'worksSection'; _key: string; heading?: string; works?: (PageWork | null)[] }
  | {
      _type: 'faqSection';
      _key: string;
      heading?: string;
      items?: { _key: string; question?: string; answer?: PortableTextBlock[] }[];
    }
  | {
      _type: 'ctaSection';
      _key: string;
      heading?: string;
      text?: string;
      buttonLabel?: string;
      enquiryKind?: 'acquisition' | 'commission' | 'studio-visit' | 'other';
    };

export type ContentPage = {
  _id: string;
  _updatedAt: string;
  title?: string;
  slug: string;
  language?: PageLanguage;
  seoTitle?: string;
  seoDescription?: string;
  heroImage?: { src: string; alt?: string; dimensions?: { width: number; height: number } };
  intro?: PortableTextBlock[];
  translation?: { slug?: string; language?: PageLanguage } | null;
  sections?: PageSection[];
};

const opts = { next: { revalidate: 60 } };

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    language,
    seoTitle,
    seoDescription,
    "heroImage": select(defined(heroImage.asset) => {
      "src": heroImage.asset->url,
      "alt": heroImage.alt,
      "dimensions": heroImage.asset->metadata.dimensions
    }),
    intro,
    "translation": translation->{ "slug": slug.current, language },
    sections[]{
      ...,
      _type == "worksSection" => {
        "works": works[]->{
          _id,
          title,
          "slug": slug.current,
          isSold,
          year,
          medium,
          dimensions,
          "photo": coalesce(
            media[isPrimary == true && defined(image.asset)][0],
            media[defined(image.asset)][0]
          ){ "src": image.asset->url, "dimensions": image.asset->metadata.dimensions }
        }
      }
    }
  }
`;

const allPagesQuery = groq`
  *[_type == "page" && defined(slug.current)]{
    _updatedAt,
    "slug": slug.current,
    language,
    "translation": translation->{ "slug": slug.current, language }
  }
`;

export type PageSummary = Pick<ContentPage, '_updatedAt' | 'slug' | 'language' | 'translation'>;

export const getPage = cache(async (slug: string): Promise<ContentPage | null> =>
  client.fetch<ContentPage | null>(pageQuery, { slug }, opts),
);

export const getAllPages = cache(async (): Promise<PageSummary[]> =>
  client.fetch<PageSummary[]>(allPagesQuery, {}, opts),
);

/* The page chosen in Site settings → Contact → Commissions page, if any. */
export const getCommissionsPageSlug = cache(async (): Promise<string | undefined> => {
  const slug = await client.fetch<string | null>(
    groq`*[_type == "siteSettings" && _id == "siteSettings"][0].commissionsPage->slug.current`,
    {},
    opts,
  );
  return slug ?? undefined;
});

export const SITE_URL = 'https://poiyee.com';

/* hreflang map for a page and its translation: { de: url, en: url }. A
   translation that is unpublished, or in the same language, is left out. */
export function pageLanguages(p: Pick<ContentPage, 'slug' | 'language' | 'translation'>) {
  const langs: Record<string, string> = {};
  if (p.language) langs[p.language] = `${SITE_URL}/${p.slug}`;
  const t = p.translation;
  if (t?.slug && t.language && t.language !== p.language) langs[t.language] = `${SITE_URL}/${t.slug}`;
  return Object.keys(langs).length > 1 ? langs : undefined;
}
