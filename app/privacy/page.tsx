import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Prose } from '@/components/Headline';
import { getPrivacy, getSiteSettings } from '@/lib/content';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await getSiteSettings();
  const pageTitle = ['Privacy', title].filter(Boolean).join(' — ');
  return {
    title: pageTitle,
    alternates: { canonical: '/privacy' },
    openGraph: { title: pageTitle, url: 'https://poiyee.com/privacy' },
    twitter: { title: pageTitle },
  };
}

/* "2026-10-04" → "4 October 2026", read as a calendar date (no timezone shift). */
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default async function PrivacyPage() {
  const privacy = await getPrivacy();
  if (!privacy) notFound();
  const { title, updated, body } = privacy;

  return (
    <main className="relative mx-auto max-w-[1300px] px-[clamp(22px,4vw,54px)]">
      <Nav />

      <section className="pb-[12vh] pt-[24vh]">
        {updated && (
          <div className="mb-14 font-mono text-[11px] uppercase tracking-[0.22em] text-pencil">
            Last updated {formatDate(updated)}
          </div>
        )}

        {title && (
          <h1 className="m-0 font-display text-[clamp(40px,6vw,84px)] font-light leading-[0.98] tracking-[-0.03em] text-balance">
            {title}
          </h1>
        )}

        <div className="mt-10 grid max-w-[64ch] gap-5">
          <Prose value={body} className="m-0 text-[18px] leading-[1.7] text-ink/80" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
