import Link from 'next/link';

/* Footer — an oversized wordmark and a plain link ledger. */
export function Footer() {
  return (
    <footer id="contact" className="px-[clamp(22px,4vw,54px)] pb-[8vh] pt-[14vh]">
      <div className="font-display text-[clamp(60px,15vw,240px)] font-extrabold leading-[0.82] tracking-[-0.04em]">
        poiyee
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
        <FooterCol title="Visit">
          <FooterLink href="/#index">Index of works</FooterLink>
          <FooterLink href="/#about">About</FooterLink>
          <FooterLink href="/#acquire">Acquire</FooterLink>
        </FooterCol>
        <FooterCol title="Enquire">
          <FooterLink href="/contact?kind=acquisition">Acquire a work</FooterLink>
          <FooterLink href="/contact?kind=commission">Commission</FooterLink>
          <FooterLink href="/contact?kind=studio-visit">Studio visit</FooterLink>
        </FooterCol>
        <FooterCol title="Contact">
          <FooterLink href="mailto:hello@poiyee.com">hello@poiyee.com</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">Newsletter</FooterLink>
        </FooterCol>
        <FooterCol title="Studio">
          <FooterLink href="/studio">Content studio →</FooterLink>
        </FooterCol>
      </div>

      <div className="mt-14 flex flex-wrap justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-pencil">
        <span>© {new Date().getFullYear()} poiyee · All works</span>
        <span>Zürich — and from there, by post</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="m-0 mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-pencil">
        {title}
      </h4>
      <ul className="m-0 grid list-none gap-2 p-0">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-ink no-underline hover:text-accent">
        {children}
      </Link>
    </li>
  );
}
