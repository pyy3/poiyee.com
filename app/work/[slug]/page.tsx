import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetail } from '@/components/WorkDetail';
import { Footer } from '@/components/Footer';
import { getAllWorks, getWorkWithNeighbours } from '@/lib/works';

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
  const data = await getWorkWithNeighbours(slug);
  if (!data) return { title: 'Work — poiyee' };
  const { work } = data;
  return {
    title: `${work.name} — poiyee`,
    description: work.meta,
    openGraph: {
      title: `${work.name} — poiyee`,
      description: work.meta,
      images: [{ url: work.media[0].src }],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getWorkWithNeighbours(slug);
  if (!data) notFound();

  return (
    <main className="relative">
      <WorkDetail
        work={data.work}
        prev={data.prev}
        next={data.next}
        index={data.index}
        total={data.total}
      />
      <Footer />
    </main>
  );
}
