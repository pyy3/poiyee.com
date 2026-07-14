import Link from 'next/link';

/* Acquire — a full-width deep-water band for contrast and rhythm between the
   white sections. */
export function Acquire() {
  return (
    <section
      id="acquire"
      className="bg-deep px-[clamp(22px,4vw,54px)] py-[16vh] text-center text-white"
    >
      <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
        Acquire
      </div>
      <h3 className="mx-auto max-w-[14ch] font-display text-[clamp(36px,7vw,96px)] font-light leading-[0.98] tracking-[-0.03em] text-balance">
        Take <span className="font-extrabold">one</span> home.
      </h3>
      <p className="mx-auto mt-6 max-w-[46ch] text-white/75">
        Selected works are available as originals and as small archival editions. Shipping worldwide,
        crated and packed by hand from the Zürich studio.
      </p>
      <Link
        href="/contact?kind=acquisition"
        className="mt-9 inline-block rounded-full bg-white px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-deep no-underline transition-colors hover:bg-accent hover:text-white"
      >
        Enquire to acquire →
      </Link>
    </section>
  );
}
