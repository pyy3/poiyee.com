import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Headline } from '@/components/Headline';
import { PageSections } from '@/components/PageSections';
import { getSiteSettings, plainText } from '@/lib/content';
import { getAllPages, getPage, pageLanguages, SITE_URL, type ContentPage } from '@/lib/pages';

/* A content page from Sanity ("Pages" in Studio), e.g. /commissions.
   Static routes (contact, privacy, work, studio, api) are matched before this
   dynamic segment, so a page can never shadow them. */

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((p) => ({ slug: p.slug }));
}

const OG_LOCALE: Record<NonNullable<ContentPage['language']>, string> = { de: 'de_CH', en: 'en_US' };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [page, { title: siteTitle }] = await Promise.all([getPage(slug), getSiteSettings()]);
  if (!page) return {};
  const title = page.seoTitle || [page.title, siteTitle].filter(Boolean).join(' — ') || undefined;
  const description = page.seoDescription || plainText(page.intro) || undefined;
  const url = `${SITE_URL}/${page.slug}`;
  const languages = pageLanguages(page);
  const images = page.heroImage ? [{ url: page.heroImage.src, alt: page.heroImage.alt }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: page.language ? OG_LOCALE[page.language] : undefined,
      alternateLocale: page.translation?.language ? [OG_LOCALE[page.translation.language]] : undefined,
      images,
    },
    twitter: { title, description, images: images?.map((i) => i.url) },
  };
}

/* schema.org FAQPage for every question that has an answer. */
function faqJsonLd(page: ContentPage) {
  const questions = (page.sections ?? [])
    .flatMap((s) => (s._type === 'faqSection' ? (s.items ?? []) : []))
    .map((i) => ({ q: i.question?.trim(), a: plainText(i.answer).trim() }))
    .filter((i) => i.q && i.a);
  if (!questions.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(page.language && { inLanguage: page.language }),
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export default async function ContentPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const faq = faqJsonLd(page);
  const { heroImage } = page;

  // Nav and footer stay outside <main>: their labels are in the site's
  // language, while lang marks the page's own text.
  return (
    <>
      <Nav />
      <main lang={page.language} className="relative">

      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, '\\u003c') }}
        />
      )}

      {heroImage && (
        <div className="relative h-[72vh] min-h-[460px] overflow-hidden bg-paper-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${heroImage.src}?w=2400&auto=format`}
            alt={heroImage.alt ?? ''}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(8,14,20,0.35)] via-transparent to-transparent" />
        </div>
      )}

      {(page.title || page.intro) && (
        <header
          className={`mx-auto max-w-[1300px] px-[clamp(22px,4vw,54px)] pb-[6vh] ${heroImage ? 'pt-[10vh]' : 'pt-[24vh]'}`}
        >
          {page.title && (
            <h1 className="m-0 max-w-[16ch] font-display text-[clamp(44px,7.4vw,112px)] font-semibold leading-[0.95] tracking-[-0.035em] text-balance">
              {page.title}
            </h1>
          )}
          {page.intro && (
            <div className="mt-10 grid grid-cols-1 gap-x-14 md:grid-cols-[5fr_7fr]">
              <p className="m-0 max-w-[30ch] font-display text-[clamp(22px,2.8vw,36px)] font-light leading-[1.25] tracking-[-0.015em] text-ink/85 md:col-start-2">
                <Headline value={page.intro} emphasis="text-accent" />
              </p>
            </div>
          )}
        </header>
      )}

      <PageSections sections={page.sections} />
      </main>
      <Footer />
    </>
  );
}
