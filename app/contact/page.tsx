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
    <main className="relative z-10 max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] pt-7">
      <Nav />

      <section className="pt-24 pb-24">
        <div className="flex items-baseline gap-5 mb-14 font-mono text-[11px] tracking-[0.22em] uppercase text-pencil">
          <span
            className="font-display italic text-[56px] leading-none text-ink font-light"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 320', letterSpacing: '-0.02em' }}
          >
            ✉
          </span>
          <span className="pb-2">— Contact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-14 items-start">
          <div>
            <h1
              className="font-display italic font-light text-[clamp(40px,5vw,72px)] leading-none text-ink m-0"
              style={{ fontVariationSettings: '"opsz" 144, "wght" 340', letterSpacing: '-0.02em' }}
            >
              Write to&nbsp;the&nbsp;studio.
            </h1>
            <p
              className="mt-6 font-display text-[clamp(18px,1.4vw,22px)] leading-[1.5] text-pencil max-w-[40ch]"
              style={{ fontVariationSettings: '"opsz" 96, "wght" 360' }}
            >
              Acquisitions, commissions, exhibitions, studio visits — all enquiries are read in person and answered within a few days.
            </p>

            <div className="mt-10 font-mono text-[11px] tracking-[0.22em] uppercase text-pencil grid gap-3">
              <div>
                <span className="text-ink">Direct</span>{' '}
                <a href="mailto:hello@poiyee.com" className="text-pencil hover:text-accent no-underline ml-2">
                  hello@poiyee.com
                </a>
              </div>
              <div>
                <span className="text-ink">Studio</span>
                <span className="ml-2">Zurich, Switzerland</span>
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
