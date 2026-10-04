import type { MetadataRoute } from 'next';
import { getAllWorks } from '@/lib/works';

const SITE = 'https://poiyee.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getAllWorks();
  return [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/contact` },
    ...works.map((w) => ({
      url: `${SITE}/work/${w.slug}`,
      lastModified: w.updatedAt,
    })),
  ];
}
