'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/react';
import { workMeta, type Work } from '@/lib/works';
import { Headline } from './Headline';

/* The immersive homepage: a full-viewport hero, an intro band, and each work
   presented monumentally (edge-to-edge, with parallax and a scale annotation).
   A vertical index rail tracks progress and links into the sequence. */
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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const parallaxEls = Array.from(
      root.querySelectorAll<HTMLElement>('[data-parallax]'),
    );
    const progress = root.querySelector<HTMLElement>('[data-progress]');
    const railLinks = Array.from(root.querySelectorAll<HTMLElement>('[data-rail]'));
    const workEls = Array.from(root.querySelectorAll<HTMLElement>('[data-work]'));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        if (!reduce) {
          for (const el of parallaxEls) {
            const r = el.getBoundingClientRect();
            const off = (r.top + r.height / 2 - vh / 2) / vh;
            const amt = parseFloat(el.dataset.parallax || '0') * vh;
            const img = el.querySelector('img');
            if (img) img.style.transform = `translateY(${(-off * amt).toFixed(1)}px)`;
          }
        }
        const doc = document.documentElement;
        const p = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
        if (progress) progress.style.width = `${(p * 100).toFixed(2)}%`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-in')),
      { threshold: 0.22 },
    );
    workEls.forEach((w) => reveal.observe(w));

    const activate = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = workEls.indexOf(e.target as HTMLElement);
          railLinks.forEach((a) =>
            a.classList.toggle('rail-active', Number(a.dataset.rail) === i),
          );
        }),
      { threshold: 0.5 },
    );
    workEls.forEach((w) => activate.observe(w));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reveal.disconnect();
      activate.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [works.length]);

  return (
    <div ref={rootRef}>
      {/* scroll progress */}
      <div
        data-progress
        className="fixed left-0 top-0 z-50 h-0.5 w-0 bg-accent"
        aria-hidden
      />

      {/* vertical index rail */}
      <nav
        aria-label="Index of works"
        className="fixed right-[clamp(14px,3vw,36px)] top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-[clamp(4px,1.4vh,12px)] md:flex"
      >
        {works.map((w, i) => (
          <a
            key={w.slug}
            href={`#work-${i}`}
            data-rail={i}
            className="rail-link group flex items-center gap-3 font-mono text-[10px] tracking-[0.14em] text-pencil no-underline"
          >
            <span className="rail-label max-w-0 overflow-hidden whitespace-nowrap uppercase opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:opacity-100">
              {w.name}
            </span>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span className="rail-tick h-px w-[22px] bg-current transition-all duration-300" />
          </a>
        ))}
      </nav>

      {/* HERO */}
      <header className="relative h-screen min-h-[640px] overflow-hidden">
        <div data-parallax="0.16" className="absolute inset-x-0 -inset-y-[8%]">
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
        <section className="max-w-[1200px] px-[clamp(22px,4vw,54px)] py-[22vh]">
          <p className="font-display text-[clamp(28px,4vw,58px)] font-light leading-[1.14] tracking-[-0.02em]">
            <Headline value={intro} emphasis="font-semibold text-accent" />
          </p>
        </section>
      )}

      {/* WORKS */}
      <section id="index" aria-label="Index of works">
        {works.map((w, i) => {
          const { widthCm } = w;
          const barPx = Math.round(120 + (((widthCm ?? 120) - 90) / 120) * 120);
          return (
            <article
              key={w.slug}
              id={`work-${i}`}
              data-work
              className="work-section relative flex min-h-screen items-center px-[clamp(22px,4vw,54px)] py-[10vh]"
            >
              <Link
                href={`/work/${w.slug}`}
                aria-label={`View ${w.name}`}
                className="work-media group relative flex h-[82vh] w-full items-center justify-center"
              >
                {/* The whole photo, uncropped: the wall or easel around a painting is
                    part of how it is shown. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.media[0].src}
                  alt={w.name}
                  className="max-h-full max-w-full object-contain shadow-[0_40px_80px_-50px_rgba(14,20,27,0.45)] transition-transform duration-700 group-hover:scale-[1.015]"
                />
              </Link>

              {/* scale annotation */}
              {widthCm && (
                <div className="pointer-events-none absolute left-[clamp(22px,4vw,54px)] top-[9vh] z-[3] flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white mix-blend-difference">
                  <span>0</span>
                  <span className="scale-tick relative h-px bg-current" style={{ width: barPx }} />
                  <span>{widthCm} cm</span>
                </div>
              )}

              {/* caption: the name sits on a paper panel so it stays legible over
                  light and busy paintings */}
              <div className="pointer-events-none absolute inset-x-[clamp(22px,4vw,54px)] bottom-[6vh] z-[3] flex items-end justify-between gap-6">
                <div className="font-display text-[clamp(64px,12vw,190px)] font-light leading-[0.8] tracking-[-0.04em] text-ink">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pointer-events-auto max-w-[min(520px,70%)] bg-paper/90 px-5 py-4 text-right text-ink shadow-[0_18px_40px_-24px_rgba(14,20,27,0.45)] backdrop-blur-sm">
                  <Link
                    href={`/work/${w.slug}`}
                    className="font-display text-[clamp(22px,2.6vw,38px)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink no-underline"
                  >
                    {w.name}
                    {w.isSold && (
                      <span className="ml-3 whitespace-nowrap align-middle font-mono text-[11px] tracking-[0.2em] text-pencil">
                        · Sold
                      </span>
                    )}
                  </Link>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
                    {workMeta(w)}
                  </div>
                  <Link
                    href={`/work/${w.slug}`}
                    className="mt-3 inline-block border-b border-ink/40 pb-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink no-underline hover:border-accent hover:text-accent"
                  >
                    View work →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
