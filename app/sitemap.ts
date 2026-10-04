import type { MetadataRoute } from 'next';
import { getAllWorks } from '@/lib/works';
import { getAllPages, pageLanguages } from '@/lib/pages';

const SITE = 'https://poiyee.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [works, pages] = await Promise.all([getAllWorks(), getAllPages()]);
  return [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/contact` },
    ...works.map((w) => ({
      url: `${SITE}/work/${w.slug}`,
      lastModified: w.updatedAt,
    })),
    ...pages.map((p) => {
      const languages = pageLanguages(p);
      return {
        url: `${SITE}/${p.slug}`,
        lastModified: p._updatedAt,
        ...(languages && { alternates: { languages } }),
      };
    }),
  ];
}
