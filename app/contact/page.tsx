import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Headline } from '@/components/Headline';
import { getSiteSettings, sharedSocial } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const { title, contactText } = settings;
  const social = sharedSocial(settings, 'https://poiyee.com/contact');
  const pageTitle = ['Contact', title].filter(Boolean).join(' — ');
  return {
    title: pageTitle,
    alternates: { canonical: '/contact' },
    description: contactText,
    openGraph: { ...social.openGraph, title: pageTitle, description: contactText },
    twitter: { ...social.twitter, title: pageTitle, description: contactText },
  };
}

export default async function ContactPage() {
  const { contactHeading, contactText, studioLocation } = await getSiteSettings();
  return (
    <main className="relative mx-auto max-w-[1300px] px-[clamp(22px,4vw,54px)]">
      <Nav />

      <section className="pb-[12vh] pt-[24vh]">
        <div className="mb-14 font-mono text-[11px] uppercase tracking-[0.22em] text-pencil">
          Contact
        </div>

        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[5fr_7fr]">
          <div>
            <h1 className="m-0 font-display text-[clamp(40px,6vw,84px)] font-light leading-[0.98] tracking-[-0.03em] text-balance">
              <Headline value={contactHeading} emphasis="font-extrabold" />
            </h1>
            {contactText && (
              <p className="mt-7 max-w-[42ch] text-[18px] leading-[1.6] text-ink/75">{contactText}</p>
            )}

            <div className="mt-10 grid gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              {studioLocation && (
                <div className="flex justify-between gap-6 border-t border-line pt-4">
                  <span className="text-ink">Studio</span>
                  <span>{studioLocation}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Suspense fallback={<div className="font-mono text-[11px] text-pencil">Loading form…</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
