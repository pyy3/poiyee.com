import Link from 'next/link';
import { getSiteSettings } from '@/lib/content';

/* Fixed top bar. mix-blend-difference keeps it legible over both the dark hero
   images and the white sections below. */
export async function Nav() {
  const { title } = await getSiteSettings();
  return (
    <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(22px,4vw,54px)] py-6 text-white mix-blend-difference">
      <Link
        href="/"
        className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-white no-underline"
      >
        {title}
      </Link>
      <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
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
    </div>
  );
}
