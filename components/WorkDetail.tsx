'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/react';
import { dimensionsLabel, type Work } from '@/lib/works';
import { Headline, Prose } from './Headline';

type Props = {
  work: Work;
  prev: Work;
  next: Work;
  index: number;
  total: number;
  title?: string;
  studioLocation?: string;
  acquireHeading?: PortableTextBlock[];
  acquireText?: string;
};

/* A single work, presented monumentally: full-bleed hero, the complete canvas
   shown to scale, a short statement, a texture detail, specifications, and a
   prompt to enquire. Parallax + progress handled client-side. */
export function WorkDetail({
  work,
  prev,
  next,
  index,
  total,
  title,
  studioLocation,
  acquireHeading,
  acquireText,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { medium, year, heightCm, widthCm } = work;
  const dimensions = dimensionsLabel(work);
  const detail = work.media.find((m) => m.kind === 'detail') ?? work.media[1];
  const enquireHref = `/contact?kind=acquisition&work=${encodeURIComponent(work.slug)}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parallaxEls = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'));
    const progress = root.querySelector<HTMLElement>('[data-progress]');
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [work.slug]);

  return (
    <div ref={rootRef}>
      <div data-progress className="fixed left-0 top-0 z-50 h-0.5 w-0 bg-accent" aria-hidden />

      {/* top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(22px,4vw,54px)] py-6 text-white mix-blend-difference">
        <Link href="/" className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-white no-underline">
          {title}
        </Link>
        <Link href="/#index" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white no-underline hover:opacity-70">
          ← Index of works
        </Link>
      </div>

      {/* HERO */}
      <header className="relative h-screen min-h-[620px] overflow-hidden">
        <div data-parallax="0.16" className="absolute inset-x-0 -inset-y-[8%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={work.media[0].src} alt={work.name} className="h-[116%] w-full object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(8,14,20,0.3)] via-transparent to-[rgba(8,14,20,0.6)]" />
        <div className="absolute inset-x-[clamp(22px,4vw,54px)] bottom-[clamp(30px,7vh,72px)] z-[3] text-white">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] opacity-90">
            Work № {String(index + 1).padStart(2, '0')} · {work.isSold ? 'Sold' : 'Available'}
          </div>
          <h1 className="font-display text-[clamp(44px,8vw,132px)] font-semibold leading-[0.92] tracking-[-0.03em] text-balance">
            {work.name}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-90">
            {[medium, year, dimensions].filter(Boolean).map((part, i) => (
              <span key={i} className="flex items-center gap-x-7">
                {i > 0 && <span className="h-px w-7 bg-current opacity-50" />}
                {part}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* THE COMPLETE WORK, TO SCALE */}
      {heightCm && widthCm && (
      <section className="px-[clamp(22px,4vw,54px)] pb-[12vh] pt-[16vh]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-end gap-x-[clamp(28px,5vw,72px)] md:grid-cols-[auto_1fr]">
          <div className="hidden flex-col items-center self-stretch font-mono text-[10px] uppercase tracking-[0.16em] text-pencil md:flex">
            <span>{heightCm}</span>
            <span className="relative my-2 w-px flex-1 bg-line before:absolute before:left-[-4px] before:top-0 before:h-px before:w-[9px] before:bg-pencil after:absolute after:bottom-0 after:left-[-4px] after:h-px after:w-[9px] after:bg-pencil" />
            <span>cm</span>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work.media[0].src}
              alt={`${work.name}, full canvas`}
              className="w-full shadow-[0_50px_90px_-46px_rgba(14,20,27,0.5)]"
            />
            <svg
              className="absolute -right-16 bottom-0 hidden w-[52px] text-line lg:block"
              viewBox="0 0 40 110"
              fill="currentColor"
              aria-hidden
            >
              <circle cx="20" cy="12" r="9" />
              <rect x="11" y="24" width="18" height="52" rx="8" />
              <rect x="13" y="72" width="6" height="36" rx="3" />
              <rect x="21" y="72" width="6" height="36" rx="3" />
            </svg>
          </div>
          <div className="hidden md:block" />
          <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-pencil">
            <span>0</span>
            <span className="relative h-px flex-1 bg-line before:absolute before:left-0 before:top-[-4px] before:h-[9px] before:w-px before:bg-pencil after:absolute after:right-0 after:top-[-4px] after:h-[9px] after:w-px after:bg-pencil" />
            <span>{widthCm} cm</span>
          </div>
        </div>
      </section>
      )}

      {/* STATEMENT */}
      {(work.lede || work.description) && (
        <section className="mx-auto max-w-[900px] px-[clamp(22px,4vw,54px)] py-[8vh]">
          {work.lede && (
            <p className="mb-6 font-display text-[clamp(24px,3.2vw,42px)] font-light leading-[1.22] tracking-[-0.015em]">
              <Headline value={work.lede} emphasis="text-accent" />
            </p>
          )}
          <div className="space-y-5">
            <Prose value={work.description} className="text-[18px] leading-[1.7] text-ink/80" />
          </div>
        </section>
      )}

      {/* DETAIL CROP */}
      {detail && (
        <section className="relative my-[6vh] h-[86vh] min-h-[520px] overflow-hidden">
          <div data-parallax="0.12" className="absolute inset-x-0 -inset-y-[8%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={detail.src} alt={`${work.name} — detail`} className="h-[116%] w-full object-cover" />
          </div>
          {detail.caption && (
            <div className="absolute bottom-7 left-[clamp(22px,4vw,54px)] font-mono text-[11px] uppercase tracking-[0.18em] text-white mix-blend-difference">
              {detail.caption}
            </div>
          )}
        </section>
      )}

      {/* SPECIFICATIONS */}
      <section className="mx-auto max-w-[1000px] px-[clamp(22px,4vw,54px)] py-[6vh]">
        <h2 className="mb-8 font-display text-[26px] font-semibold tracking-[-0.01em]">Specifications</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
          {medium && <Spec label="Medium">{medium}</Spec>}
          {year && <Spec label="Year">{year}</Spec>}
          {dimensions && <Spec label="Dimensions">{dimensions}</Spec>}
          <Spec label="Orientation">{work.orient === 'landscape' ? 'Landscape' : 'Portrait'}</Spec>
          {work.editionInfo && <Spec label="Edition">{work.editionInfo}</Spec>}
          {work.framing && <Spec label="Framing">{work.framing}</Spec>}
          <Spec label="Availability">
            <span className={work.isSold ? 'text-pencil' : 'text-accent'}>
              {work.isSold ? 'Sold' : 'Available'}
            </span>
          </Spec>
          {studioLocation && <Spec label="Studio">{studioLocation}</Spec>}
        </dl>
      </section>

      {/* ENQUIRE */}
      <section className="bg-deep px-[clamp(22px,4vw,54px)] py-[14vh] text-center text-white">
        <h3 className="font-display text-[clamp(30px,5vw,64px)] font-light leading-none tracking-[-0.02em]">
          <Headline value={acquireHeading} emphasis="font-extrabold" />
        </h3>
        {acquireText && <p className="mx-auto mt-6 max-w-[44ch] text-white/75">{acquireText}</p>}
        <Link
          href={enquireHref}
          className="mt-9 inline-block rounded-full bg-white px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-deep no-underline hover:bg-accent hover:text-white"
        >
          Enquire to acquire →
        </Link>
      </section>

      {/* PREV / NEXT */}
      <nav className="grid grid-cols-2 border-t border-line" aria-label="More works">
        <WorkTeaser work={prev} kind="prev" label={`Previous · № ${String(((index - 1 + total) % total) + 1).padStart(2, '0')}`} />
        <WorkTeaser work={next} kind="next" label={`Next · № ${String(((index + 1) % total) + 1).padStart(2, '0')}`} />
      </nav>
    </div>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-5 border-t border-line py-[18px]">
      <dt className="text-pencil">{label}</dt>
      <dd className="m-0 text-right font-display font-medium">{children}</dd>
    </div>
  );
}

function WorkTeaser({ work, kind, label }: { work: Work; kind: 'prev' | 'next'; label: string }) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className={`group relative flex h-[38vh] min-h-[280px] items-end overflow-hidden px-[clamp(22px,4vw,54px)] py-8 text-white no-underline ${
        kind === 'next' ? 'justify-end text-right' : ''
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={work.media[0].src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover brightness-[0.62] transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-75"
      />
      <span className="relative z-[2]">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em]">
          {kind === 'prev' ? '← ' : ''}
          {label}
          {kind === 'next' ? ' →' : ''}
        </span>
        <span className="mt-1.5 block font-display text-[clamp(22px,3vw,40px)] font-semibold tracking-[-0.01em]">
          {work.name}
        </span>
      </span>
    </Link>
  );
}
