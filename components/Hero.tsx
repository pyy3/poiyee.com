import Image from 'next/image';

type HeroProps = {
  lede?: string;
  heroSrc?: string;
  heroAlt?: string;
  heroRatio?: string; // e.g. "3/4" or "4/3"
};

export function Hero({
  lede = 'A practice in pigment, weight and water — surfaces built up until the canvas itself begins to remember the sea.',
  heroSrc = '/inspiration/05/art-05.jpeg',
  heroAlt = 'Cloud, Bay',
  heroRatio = '3/4',
}: HeroProps) {
  return (
    <header className="relative pt-20 pb-32">
      <h1
        className="font-display italic font-light text-[clamp(96px,21vw,320px)] leading-[0.86] tracking-[-0.045em] m-0 text-ink"
        style={{ fontVariationSettings: '"opsz" 144, "wght" 320' }}
      >
        poiy<span className="text-accent">ee</span>.
      </h1>

      <div className="mt-9 flex flex-wrap gap-y-6 gap-x-10 items-center text-[11px] tracking-[0.22em] uppercase text-pencil font-mono">
        <span>Paintings &nbsp;·&nbsp; Oil on canvas</span>
        <span className="inline-block w-9 h-px bg-pencil/60" />
        <span>Mumbai · India</span>
        <span className="inline-block w-9 h-px bg-pencil/60" />
        <span>2024 — present</span>
      </div>

      <p
        className="mt-11 max-w-[30ch] font-display italic text-[clamp(22px,2.4vw,32px)] leading-[1.35] font-light text-ink"
        style={{ fontVariationSettings: '"opsz" 96, "wght" 350' }}
      >
        {lede}
      </p>

      <a
        href="#index"
        aria-label={heroAlt}
        className="hidden md:block absolute right-[clamp(20px,4vw,56px)] top-[120px] w-[clamp(220px,26vw,380px)] bg-paper-deep overflow-hidden cursor-zoom-in"
        style={{
          aspectRatio: heroRatio,
          boxShadow: '0 1px 0 rgba(26,34,48,.04), 0 24px 60px -28px rgba(26,34,48,.35)',
          transform: 'rotate(2deg)',
          transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* unoptimized so local images outside next/image's static analysis still render via /public */}
        <Image src={heroSrc} alt="" fill sizes="(max-width: 768px) 0vw, 380px" className="object-cover" unoptimized />
      </a>
    </header>
  );
}
