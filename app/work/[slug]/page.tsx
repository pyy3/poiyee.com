import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetail } from '@/components/WorkDetail';
import { Footer } from '@/components/Footer';
import { getAllWorks, getWorkWithNeighbours, workMeta } from '@/lib/works';
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
  const [data, { title }] = await Promise.all([getWorkWithNeighbours(slug), getSiteSettings()]);
  if (!data) return {};
  const { work } = data;
  const pageTitle = [work.name, title].filter(Boolean).join(' — ');
  return {
    title: pageTitle,
    description: workMeta(work),
    openGraph: {
      title: pageTitle,
      description: workMeta(work),
      images: [{ url: work.media[0].src }],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [data, settings] = await Promise.all([getWorkWithNeighbours(slug), getSiteSettings()]);
  if (!data) notFound();

  return (
    <main className="relative">
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
