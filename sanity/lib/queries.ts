import { groq } from 'next-sanity';

export const allArtworksQuery = groq`
  *[_type == "artwork"] | order(displayOrder asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    number,
    year,
    medium,
    dimensions,
    isAvailable,
    price,
    priceCurrency,
    editionInfo,
    "primary": media[isPrimary == true][0]{ image, caption } ,
    "media": media[]{
      _key,
      "src": image.asset->url,
      "lqip": image.asset->metadata.lqip,
      "dimensions": image.asset->metadata.dimensions,
      caption,
      kind,
      isPrimary
    },
    description
  }
`;

export const artworkBySlugQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    number,
    year,
    medium,
    dimensions,
    isAvailable,
    price,
    priceCurrency,
    editionInfo,
    description,
    stripePriceId,
    "media": media[]{
      _key,
      "src": image.asset->url,
      "lqip": image.asset->metadata.lqip,
      "dimensions": image.asset->metadata.dimensions,
      caption,
      kind,
      isPrimary
    }
  }
`;

export const aboutQuery = groq`
  *[_type == "about"][0]{
    bio,
    facts,
    "portrait": portrait.asset->url
  }
`;

export const allExhibitionsQuery = groq`
  *[_type == "exhibition"] | order(startDate desc) {
    _id,
    title,
    venue,
    city,
    startDate,
    endDate,
    description
  }
`;

export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "coverImage": coverImage.asset->url
  }
`;
