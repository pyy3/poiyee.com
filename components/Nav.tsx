import Link from 'next/link';
import { getSiteSettings } from '@/lib/content';

/* Fixed top bar, as two layers: the wordmark sits on its own paper panel so it
   reads over any painting; the links use mix-blend-difference to stay legible
   over both the hero images and the white sections. (Separate fixed elements:
   a blend inside one fixed container would also invert the panel.) */
export async function Nav() {
  const { title } = await getSiteSettings();
  return (
    <>
      <Link
        href="/"
        className="fixed left-[clamp(22px,4vw,54px)] top-[18px] z-40 bg-paper/90 px-3.5 pb-2 pt-1.5 font-wordmark text-[24px] italic leading-none tracking-[-0.01em] text-ink no-underline shadow-[0_10px_30px_-18px_rgba(14,20,27,0.45)] backdrop-blur-sm"
        style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}
      >
        {title}
      </Link>
      <nav className="fixed right-[clamp(22px,4vw,54px)] top-0 z-40 flex items-center gap-6 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white mix-blend-difference">
        <Link href="/#index" className="hidden text-white no-underline sm:inline hover:opacity-70">
          Index
        </Link>
        <Link href="/#about" className="hidden text-white no-underline sm:inline hover:opacity-70">
          About
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/60 px-4 py-2 text-white no-underline hover:bg-white hover:text-ink"
        >
          Enquire
        </Link>
      </nav>
    </>
  );
}
