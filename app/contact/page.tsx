import { Suspense } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'Contact — poiyee',
  description: 'Enquire about acquisitions, commissions, or a studio visit.',
  openGraph: {
    title: 'Contact — poiyee',
    description: 'Enquire about acquisitions, commissions, or a studio visit.',
    url: 'https://poiyee.com/contact',
    type: 'website',
    siteName: 'poiyee',
    images: [{ url: '/icons/og.png', width: 1200, height: 630, alt: 'poiyee — paintings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — poiyee',
    description: 'Enquire about acquisitions, commissions, or a studio visit.',
    images: ['/icons/og.png'],
  },
};

export default function ContactPage() {
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
              Write to <span className="font-extrabold">the studio</span>.
            </h1>
            <p className="mt-7 max-w-[42ch] text-[18px] leading-[1.6] text-ink/75">
              Acquisitions, commissions, exhibitions, studio visits — every enquiry is read in person
              and answered within a few days.
            </p>

            <div className="mt-10 grid gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              <div className="flex justify-between gap-6 border-t border-line pt-4">
                <span className="text-ink">Direct</span>
                <a href="mailto:hello@poiyee.com" className="text-pencil no-underline hover:text-accent">
                  hello@poiyee.com
                </a>
              </div>
              <div className="flex justify-between gap-6 border-t border-line pt-4">
                <span className="text-ink">Studio</span>
                <span>Zürich, Switzerland</span>
              </div>
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
