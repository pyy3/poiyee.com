import { groq } from 'next-sanity';

const artworkFields = groq`
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  number,
  year,
  medium,
  dimensions,
  isSold,
  editionInfo,
  framing,
  lede,
  description,
  "media": media[defined(image.asset)]{
    _key,
    "src": image.asset->url,
    "dimensions": image.asset->metadata.dimensions,
    caption,
    kind,
    isPrimary
  }
`;

export const allArtworksQuery = groq`
  *[_type == "artwork" && count(media[defined(image.asset)]) > 0]
    | order(coalesce(displayOrder, 9999) asc, year desc) { ${artworkFields} }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title,
    studioLocation,
    contactEmail,
    instagram,
    newsletter,
    footerLine,
    heroHeadline,
    heroTags,
    "heroArtworkId": heroArtwork._ref,
    intro,
    acquireHeading,
    acquireDetailHeading,
    acquireText,
    contactHeading,
    contactText,
    seoTitle,
    seoDescription,
    artistSummary,
    "ogImage": ogImage.asset->url,
    consentText
  }
`;

export const aboutQuery = groq`
  *[_type == "about" && _id == "about"][0]{ statement, bio, facts[]{ _key, label, value } }
`;

export const privacyQuery = groq`
  *[_type == "privacy" && _id == "privacy"][0]{ title, updated, body }
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
