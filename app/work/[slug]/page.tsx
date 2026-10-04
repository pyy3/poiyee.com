import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetail } from '@/components/WorkDetail';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { getAllWorks, getWorkWithNeighbours } from '@/lib/works';
import { artworkJsonLd, workDescription, workUrl } from '@/lib/structuredData';
import { getSiteSettings } from '@/lib/content';

export const revalidate = 60;

export async function generateStaticParams() {
  const works = await getAllWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [data, settings] = await Promise.all([getWorkWithNeighbours(slug), getSiteSettings()]);
  if (!data) return {};
  const { work } = data;
  const pageTitle = [work.name, settings.title].filter(Boolean).join(' — ');
  const description = workDescription(work, settings);
  const shareImage = `${work.media[0].src}?w=1200&h=630&fit=crop&auto=format`;
  return {
    title: pageTitle,
    description,
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: {
      title: pageTitle,
      description,
      url: workUrl(work),
      type: 'article',
      siteName: settings.title,
      images: [{ url: shareImage, width: 1200, height: 630, alt: work.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [shareImage],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [data, settings] = await Promise.all([getWorkWithNeighbours(slug), getSiteSettings()]);
  if (!data) notFound();

  return (
    <main className="relative">
      <JsonLd data={artworkJsonLd(data.work)} />
      <WorkDetail
        work={data.work}
        prev={data.prev}
        next={data.next}
        index={data.index}
        total={data.total}
        title={settings.title}
        studioLocation={settings.studioLocation}
        acquireHeading={settings.acquireDetailHeading}
        acquireText={settings.acquireText}
      />
      <Footer />
    </main>
  );
}
