export function Footer() {
  return (
    <footer id="contact" className="border-t border-ink/15 pt-20 pb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
        <div>
          <div
            className="font-display italic text-[56px] leading-none text-ink"
            style={{ fontVariationSettings: '"opsz" 144, "wght" 320', letterSpacing: '-0.03em' }}
          >
            poiyee<span className="text-accent">.</span>
          </div>
          <p className="text-pencil max-w-[32ch] mt-4">
            Paintings, prints, and commissions. Zurich — and from there, by post.
          </p>
        </div>

        <FooterCol title="Visit">
          <FooterLink href="#index">Index of works</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#acquire">Acquire</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <FooterLink href="/contact?kind=acquisition">Acquire a work</FooterLink>
          <FooterLink href="/contact?kind=commission">Commission</FooterLink>
          <FooterLink href="/contact?kind=studio-visit">Studio visit</FooterLink>
          <FooterLink href="mailto:hello@poiyee.com">hello@poiyee.com</FooterLink>
        </FooterCol>

        <FooterCol title="Elsewhere">
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">Newsletter</FooterLink>
          <FooterLink href="/studio">Studio →</FooterLink>
        </FooterCol>
      </div>

      <div className="mt-14 flex justify-between font-mono text-[10.5px] tracking-[0.2em] uppercase text-pencil">
        <span>© {new Date().getFullYear()} poiyee · All works</span>
        <span>Made with ink &amp; oil</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-pencil m-0 mb-4 font-medium">
        {title}
      </h4>
      <ul className="list-none p-0 m-0 grid gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-ink no-underline hover:text-accent">
        {children}
      </a>
    </li>
  );
}
