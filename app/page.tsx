/* Phase 2 placeholder. Phase 3 will port the full prototype design here,
   driven by Sanity content (artworks, about, site settings). */

export default function Home() {
  return (
    <main className="min-h-screen px-[clamp(20px,4vw,56px)] py-16 relative z-10">
      <nav className="flex items-baseline justify-between text-[11px] tracking-[0.18em] uppercase font-mono">
        <a
          href="/"
          className="font-display italic text-[22px] normal-case tracking-[-0.01em] text-ink no-underline"
        >
          poiyee
        </a>
        <ul className="flex gap-7 m-0 p-0 list-none">
          <li><a href="/portfolio" className="text-ink no-underline">Index</a></li>
          <li><a href="/about" className="text-ink no-underline">About</a></li>
          <li><a href="/acquire" className="text-ink no-underline">Acquire</a></li>
          <li><a href="/contact" className="text-ink no-underline">Contact</a></li>
          <li><a href="/studio" className="text-accent no-underline">Studio →</a></li>
        </ul>
      </nav>

      <header className="mt-32 max-w-5xl">
        <h1
          className="font-display italic font-light text-[clamp(96px,21vw,320px)] leading-[0.86] tracking-[-0.045em] m-0 text-ink"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 320' }}
        >
          poiy<span className="text-accent">ee</span>.
        </h1>
        <p
          className="mt-11 max-w-[30ch] font-display italic text-[clamp(22px,2.4vw,32px)] leading-[1.35] font-light text-ink"
          style={{ fontVariationSettings: '"opsz" 96, "wght" 350' }}
        >
          A practice in pigment, weight and water — surfaces built up until the canvas itself begins to remember the sea.
        </p>
        <div className="mt-12 flex gap-6 flex-wrap text-[11px] tracking-[0.22em] uppercase text-pencil font-mono">
          <span>Phase 2 scaffold · Sanity + Stripe wired</span>
        </div>
      </header>

      <section className="mt-32 border-t border-ink/15 pt-16">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-pencil mb-6">
          — Next steps
        </div>
        <ul className="font-display text-[22px] leading-relaxed text-ink max-w-3xl space-y-3 list-none p-0 m-0">
          <li>
            <a href="/studio" className="text-accent no-underline">/studio</a>
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-pencil ml-4">
              add your first artwork
            </span>
          </li>
          <li>
            <span className="italic">Index, About, Acquire, Contact</span>
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-pencil ml-4">
              ported from prototype in Phase 3
            </span>
          </li>
        </ul>
      </section>
    </main>
  );
}
