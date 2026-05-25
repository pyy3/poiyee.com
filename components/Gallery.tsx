'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Work } from '@/lib/works';

const pad = (n: number) => String(n).padStart(2, '0');

export function Gallery({ works }: { works: Work[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [detail, setDetail] = useState(false);

  const current = openIdx !== null ? works[openIdx] : null;

  const close = useCallback(() => {
    setOpenIdx(null);
    setDetail(false);
  }, []);

  const goMedia = useCallback(
    (delta: number) => {
      if (!current) return;
      setMediaIdx((i) => {
        const next = i + delta;
        return Math.max(0, Math.min(current.media.length - 1, next));
      });
      setDetail(false);
    },
    [current],
  );

  useEffect(() => {
    document.body.style.overflow = openIdx !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openIdx]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') goMedia(-1);
      else if (e.key === 'ArrowRight') goMedia(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx, close, goMedia]);

  return (
    <>
      <div className="grid grid-cols-12 gap-x-9 gap-y-20 items-end">
        {works.map((w, i) => {
          const span = w.orient === 'landscape' ? 'col-span-6' : 'col-span-4';
          const primary = w.media[0];
          return (
            <button
              key={w.id}
              onClick={() => {
                setOpenIdx(i);
                setMediaIdx(0);
                setDetail(false);
              }}
              className={`group ${span} block text-left cursor-zoom-in`}
              aria-label={`View ${w.name}`}
            >
              <div
                className="relative bg-paper-deep overflow-hidden transition-transform duration-500"
                style={{
                  aspectRatio: w.ratio,
                  boxShadow: '0 1px 0 rgba(26,34,48,.04), 0 18px 40px -24px rgba(26,34,48,.28)',
                }}
              >
                <Image
                  src={primary.src}
                  alt={w.name}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  unoptimized
                />
                {w.media.length > 1 && (
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.18em] uppercase bg-ink/80 text-paper px-2 py-1 backdrop-blur-sm">
                    {pad(w.media.length)} media
                  </span>
                )}
                {w.isSold && (
                  <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase bg-accent text-paper px-2.5 py-1 backdrop-blur-sm">
                    Sold
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-6 items-baseline">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-pencil">№ {w.id}</div>
                  <div
                    className="font-display italic text-[17px] leading-tight text-ink"
                    style={{ fontVariationSettings: '"opsz" 36, "wght" 350' }}
                  >
                    {w.name}
                  </div>
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-pencil text-right">
                  {w.meta.split(' · ').slice(0, 2).join(' · ')}
                  <br />
                  {w.meta.split(' · ').slice(2).join(' · ')}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(251,250,247,0.96)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="fixed top-6 right-6 font-mono text-[11px] tracking-[0.22em] uppercase text-ink hover:text-accent px-3 py-2"
          >
            × &nbsp;Close
          </button>

          <div className="relative flex flex-col items-center gap-6 w-full px-6 pt-14">
            <div
              className="relative bg-paper-deep overflow-hidden"
              style={{
                maxWidth: 'min(92vw, 1200px)',
                maxHeight: '74vh',
                boxShadow: '0 1px 0 rgba(26,34,48,.04), 0 40px 80px -30px rgba(26,34,48,.5)',
              }}
            >
              <button
                onClick={() => goMedia(-1)}
                disabled={mediaIdx === 0}
                className="absolute top-1/2 left-3 -translate-y-1/2 z-10 w-11 h-11 bg-paper/90 border border-ink/25 text-ink hover:bg-ink hover:text-paper hover:border-ink disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center font-mono"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={() => goMedia(1)}
                disabled={mediaIdx === current.media.length - 1}
                className="absolute top-1/2 right-3 -translate-y-1/2 z-10 w-11 h-11 bg-paper/90 border border-ink/25 text-ink hover:bg-ink hover:text-paper hover:border-ink disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center font-mono"
                aria-label="Next"
              >
                →
              </button>
              <img
                src={current.media[mediaIdx].src}
                alt={current.name}
                style={{
                  maxWidth: 'min(92vw, 1200px)',
                  maxHeight: '74vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  transformOrigin: 'center center',
                  transform: detail ? 'scale(3)' : 'scale(1)',
                  transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 items-baseline justify-center max-w-[92vw] font-mono text-[11px] tracking-[0.22em] uppercase text-pencil">
              <span
                className="font-display italic text-[22px] normal-case tracking-[-0.005em] text-ink"
                style={{ fontVariationSettings: '"opsz" 96, "wght" 360' }}
              >
                {current.name}
              </span>
              {current.isSold && (
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase bg-accent text-paper px-2.5 py-1">
                  Sold
                </span>
              )}
              <span className="text-ink font-medium">
                {pad(mediaIdx + 1)} / {pad(current.media.length)}
              </span>
              <span>
                {current.meta}
                {current.media[mediaIdx].caption ? ` · ${current.media[mediaIdx].caption}` : ''}
              </span>
              <button
                onClick={() => setDetail((d) => !d)}
                className="border border-ink text-ink hover:bg-ink hover:text-paper px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase"
              >
                {detail ? '← Full view' : 'Detail →'}
              </button>
              {!current.isSold && (
                <a
                  href={`/contact?kind=acquisition&work=${encodeURIComponent(current.slug)}`}
                  className="border border-ink bg-ink text-paper hover:bg-accent hover:border-accent px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase no-underline"
                >
                  Enquire →
                </a>
              )}
            </div>

            {current.media.length > 1 && (
              <div className="flex gap-2.5 justify-center flex-wrap max-w-[92vw]">
                {current.media.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMediaIdx(i);
                      setDetail(false);
                    }}
                    className={`w-14 h-14 overflow-hidden border bg-paper-deep p-0 transition-all ${
                      i === mediaIdx
                        ? 'opacity-100 border-ink -translate-y-0.5'
                        : 'opacity-60 border-transparent hover:opacity-100'
                    }`}
                    aria-label={`Media ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
