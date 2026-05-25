import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { About } from '@/components/About';
import { Acquire } from '@/components/Acquire';
import { Footer } from '@/components/Footer';
import { getAllWorks } from '@/lib/works';

export const revalidate = 60;

export default async function Home() {
  const works = await getAllWorks();

  return (
    <main className="relative z-10 max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] pt-7">
      <Nav />
      <Hero />

      <section id="index" className="border-t border-ink/15 pt-24 pb-16">
        <div className="flex items-baseline gap-5 mb-16 font-mono text-[11px] tracking-[0.22em] uppercase text-pencil">
          <span
            className="font-display italic text-[56px] leading-none text-ink font-light"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 320', letterSpacing: '-0.02em' }}
          >
            I
          </span>
          <span className="pb-2">— Index of works · 2024 — 2026 · {works.length} paintings</span>
        </div>
        <Gallery works={works} />
      </section>

      <About />
      <Acquire />
      <Footer />
    </main>
  );
}
