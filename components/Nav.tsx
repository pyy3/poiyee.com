export function Nav() {
  return (
    <nav className="flex items-baseline justify-between text-[11px] tracking-[0.18em] uppercase font-mono">
      <a
        href="/"
        className="font-display italic text-[22px] normal-case tracking-[-0.01em] text-ink no-underline"
        style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}
      >
        poiyee
      </a>
      <ul className="flex gap-7 m-0 p-0 list-none">
        <li><a href="#index" className="text-ink no-underline hover:text-accent">Index</a></li>
        <li><a href="#about" className="text-ink no-underline hover:text-accent">About</a></li>
        <li><a href="#acquire" className="text-ink no-underline hover:text-accent">Acquire</a></li>
        <li><a href="/contact" className="text-ink no-underline hover:text-accent">Contact</a></li>
      </ul>
    </nav>
  );
}
