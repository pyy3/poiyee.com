'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/react';
import { workMeta, type Work } from '@/lib/works';
import { Headline } from './Headline';

/* The homepage: a full-viewport hero, an intro band, then the works as a grid
   of cards. Each card shows the main photo — usually the painting in its
   setting (wall, beams, easel) — with the title below. */
export function MonumentHome({
  works,
  hero,
  title,
  headline,
  tags,
  intro,
}: {
  works: Work[];
  hero?: Work;
  title?: string;
  headline?: PortableTextBlock[];
  tags?: string[];
  intro?: PortableTextBlock[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImg = hero?.media[0]?.src;
  const heroTags = [title, ...(tags ?? [])].filter(Boolean);

  // Hero parallax and the scroll progress bar.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const parallax = root.querySelector<HTMLElement>('[data-parallax]');
    const progress = root.querySelector<HTMLElement>('[data-progress]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        if (parallax && !reduce) {
          const r = parallax.getBoundingClientRect();
          const off = (r.top + r.height / 2 - vh / 2) / vh;
          const img = parallax.querySelector('img');
          if (img) img.style.transform = `translateY(${(-off * 0.16 * vh).toFixed(1)}px)`;
        }
        const doc = document.documentElement;
        const p = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
        if (progress) progress.style.width = `${(p * 100).toFixed(2)}%`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* scroll progress */}
      <div
        data-progress
        className="fixed left-0 top-0 z-50 h-0.5 w-0 bg-accent"
        aria-hidden
      />

      {/* HERO */}
      <header className="relative h-screen min-h-[640px] overflow-hidden">
        <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
          {heroImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroImg} alt="" className="h-[116%] w-full object-cover" />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(8,14,20,0.34)] via-transparent to-[rgba(8,14,20,0.55)]" />
        <div className="absolute inset-x-[clamp(22px,4vw,54px)] bottom-[clamp(30px,7vh,80px)] z-[3] text-white">
          <h1 className="font-display text-[clamp(52px,9.5vw,168px)] font-normal leading-[0.9] tracking-[-0.03em] text-balance">
            <Headline value={headline} emphasis="font-extrabold" />
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-95">
            {heroTags.map((t, i) => (
              <span key={i} className="flex items-center gap-x-8">
                {i > 0 && <span className="h-px w-8 bg-current opacity-50" />}
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-[3] -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
          Scroll ↓
        </div>
      </header>

      {/* INTRO BAND */}
      {intro && (
        <section className="max-w-[1200px] px-[clamp(22px,4vw,54px)] pb-[10vh] pt-[18vh]">
          <p className="font-display text-[clamp(28px,4vw,58px)] font-light leading-[1.14] tracking-[-0.02em]">
            <Headline value={intro} emphasis="font-semibold text-accent" />
          </p>
        </section>
      )}

      {/* WORKS — card grid */}
      <section
        id="index"
        aria-label="Index of works"
        className="bg-paper-deep px-[clamp(22px,4vw,54px)] py-[10vh]"
      >
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <article key={w.slug} className="flex flex-col bg-white p-3 shadow-[0_1px_2px_rgba(14,20,27,0.06)]">
              <Link
                href={`/work/${w.slug}`}
                aria-label={`View ${w.name}`}
                className="group block aspect-[3/4] overflow-hidden bg-paper-deep"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${w.media[0].src}?w=900&auto=format`}
                  alt={w.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-1 flex-col px-1 pb-2 pt-4">
                <h2 className="m-0 font-display text-[clamp(24px,2.2vw,32px)] font-normal leading-[1.08] tracking-[-0.01em]">
                  <Link href={`/work/${w.slug}`} className="text-ink no-underline hover:text-accent">
                    {w.name}
                  </Link>
                </h2>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">
                  {workMeta(w)}
                  {w.isSold && <span className="whitespace-nowrap text-accent"> · Sold</span>}
                </div>
                <div className="mt-auto pt-5">
                  <Link
                    href={`/work/${w.slug}`}
                    className="inline-block border border-accent px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent no-underline transition-colors hover:bg-accent hover:text-white"
                  >
                    View work
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
