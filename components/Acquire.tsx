/* eslint-disable @next/next/no-img-element */

export function Acquire() {
  return (
    <section id="acquire" className="border-t border-ink/15 pt-24 pb-16">
      <div className="flex items-baseline gap-5 mb-16 font-mono text-[11px] tracking-[0.22em] uppercase text-pencil">
        <span
          className="font-display italic text-[56px] leading-none text-ink font-light"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 320', letterSpacing: '-0.02em' }}
        >
          III
        </span>
        <span className="pb-2">— Acquire</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-14 items-end py-16">
        <div>
          <h3
            className="font-display italic font-light text-[clamp(36px,5vw,64px)] leading-none text-ink m-0 mb-4"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 360', letterSpacing: '-0.02em' }}
          >
            Take one home.
          </h3>
          <p className="text-pencil max-w-[38ch]">
            Selected works are available as originals and as small editioned prints on archival paper.
            Shipping worldwide, packed by hand.
          </p>
          <a
            href="#contact"
            className="inline-block mt-7 px-5 py-3.5 bg-ink text-paper hover:bg-accent font-mono text-[11px] tracking-[0.22em] uppercase no-underline transition-colors"
          >
            Enquire to acquire →
          </a>
        </div>

        <div className="relative h-[360px] hidden md:block">
          <div
            className="absolute left-0 top-5 w-1/2 overflow-hidden bg-paper-deep"
            style={{
              aspectRatio: '3/4',
              transform: 'rotate(-4deg)',
              boxShadow: '0 1px 0 rgba(26,34,48,.04), 0 24px 50px -24px rgba(26,34,48,.4)',
            }}
          >
            <img src="/inspiration/04/art-04.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute left-[28%] top-16 w-[46%] overflow-hidden bg-paper-deep z-10"
            style={{
              aspectRatio: '4/3',
              transform: 'rotate(2deg)',
              boxShadow: '0 1px 0 rgba(26,34,48,.04), 0 24px 50px -24px rgba(26,34,48,.4)',
            }}
          >
            <img src="/inspiration/01/art-01.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute right-0 top-0 w-1/2 overflow-hidden bg-paper-deep"
            style={{
              aspectRatio: '3/4',
              transform: 'rotate(5deg)',
              boxShadow: '0 1px 0 rgba(26,34,48,.04), 0 24px 50px -24px rgba(26,34,48,.4)',
            }}
          >
            <img src="/inspiration/07/art-08.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
