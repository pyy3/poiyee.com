import Link from 'next/link';
import { getSiteSettings } from '@/lib/content';
import { CookieSettingsButton } from './ConsentBanner';

/* Footer — an oversized wordmark and a plain link ledger. */
export async function Footer() {
  const { title, contactEmail, instagram, newsletter, footerLine } = await getSiteSettings();
  return (
    <footer id="contact" className="px-[clamp(22px,4vw,54px)] pb-[8vh] pt-[14vh]">
      <div className="font-script text-[clamp(88px,20vw,320px)] font-normal leading-[1] pl-[0.1em]">
        {title}
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
        {(contactEmail || instagram || newsletter) && (
          <FooterCol title="Contact">
            {contactEmail && <FooterLink href={`mailto:${contactEmail}`}>{contactEmail}</FooterLink>}
            {instagram && <FooterLink href={instagram}>Instagram</FooterLink>}
            {newsletter && <FooterLink href={newsletter}>Newsletter</FooterLink>}
          </FooterCol>
        )}
        <FooterCol title="Studio">
          <FooterLink href="/studio">Content studio →</FooterLink>
        </FooterCol>
      </div>

      <div className="mt-14 flex flex-wrap justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-pencil">
        <span>© {new Date().getFullYear()} {title} · All works</span>
        {footerLine && <span>{footerLine}</span>}
        <span className="flex gap-6">
          <Link href="/privacy" className="text-pencil no-underline hover:text-accent">
            Privacy
          </Link>
          <CookieSettingsButton className="cursor-pointer border-0 bg-transparent p-0 uppercase tracking-[inherit] text-pencil hover:text-accent" />
        </span>
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
