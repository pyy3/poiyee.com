import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react';
import { dimensionsLabel } from '@/lib/works';
import type { PageSection, PageWork } from '@/lib/pages';
import { SoldBadge } from './SoldBadge';

/* The building blocks of a content page (/<slug>), in the Monument style:
   Bricolage headings, Space Mono labels, hairline rules on paper, and the
   deep-water band for the enquiry prompt. Every word comes from Sanity; an
   empty field hides its element and an empty section renders nothing. */

const gutter = 'px-[clamp(22px,4vw,54px)]';

const rich: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="m-0 text-[18px] leading-[1.7] text-ink/80">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="m-0 grid list-none gap-3 p-0 text-[18px] leading-[1.6] text-ink/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="m-0 grid list-none gap-0 p-0 text-[18px] leading-[1.6] text-ink/80 [counter-reset:step]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-accent">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="grid grid-cols-[3.2em_1fr] items-baseline border-t border-line py-4 [counter-increment:step] before:font-mono before:text-[11px] before:tracking-[0.16em] before:text-accent before:content-[counter(step,decimal-leading-zero)]">
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href: string | undefined = value?.href;
      if (!href) return <>{children}</>;
      return href.startsWith('/') ? (
        <Link href={href} className="text-accent underline-offset-4 hover:underline">
          {children}
        </Link>
      ) : (
        <a href={href} className="text-accent underline-offset-4 hover:underline">
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="grid gap-5">
      <PortableText value={value} components={rich} />
    </div>
  );
}

function SectionHeading({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <h2 className="m-0 font-display text-[clamp(28px,3.6vw,48px)] font-light leading-[1.02] tracking-[-0.025em] text-balance">
      {children}
    </h2>
  );
}

export function PageSections({ sections }: { sections?: PageSection[] }) {
  return <>{sections?.map((s) => <Section key={s._key} section={s} />)}</>;
}

function Section({ section: s }: { section: PageSection }) {
  switch (s._type) {
    case 'textSection':
      if (!s.heading && !s.body?.length) return null;
      return (
        <section className={`mx-auto max-w-[1300px] ${gutter} py-[8vh]`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 border-t border-line pt-10 md:grid-cols-[5fr_7fr]">
            <div>
              <SectionHeading>{s.heading}</SectionHeading>
            </div>
            <div className="max-w-[64ch]">
              <RichText value={s.body} />
            </div>
          </div>
        </section>
      );

    case 'worksSection': {
      const works = (s.works ?? []).filter((w): w is PageWork & { photo: NonNullable<PageWork['photo']> } =>
        Boolean(w?.photo?.src),
      );
      if (!works.length) return null;
      const cols =
        works.length >= 4 ? 'lg:grid-cols-4' : works.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
      return (
        <section className={`mx-auto max-w-[1300px] ${gutter} py-[8vh]`}>
          {s.heading && (
            <div className="mb-12 border-t border-line pt-10">
              <SectionHeading>{s.heading}</SectionHeading>
            </div>
          )}
          <ul className={`m-0 grid list-none grid-cols-1 items-end gap-x-8 gap-y-14 p-0 sm:grid-cols-2 ${cols}`}>
            {works.map((w) => (
              <WorkCard key={w._id} work={w} />
            ))}
          </ul>
        </section>
      );
    }

    case 'faqSection': {
      const items = (s.items ?? []).filter((i) => i.question);
      if (!items.length) return null;
      return (
        <section className={`mx-auto max-w-[1300px] ${gutter} py-[8vh]`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 border-t border-line pt-10 md:grid-cols-[5fr_7fr]">
            <div>
              <SectionHeading>{s.heading}</SectionHeading>
            </div>
            <div className="border-b border-line">
              {items.map((item) => (
                <details key={item._key} className="group border-t border-line first:border-t-0">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 font-display text-[clamp(19px,1.8vw,24px)] font-medium leading-[1.25] tracking-[-0.01em] marker:content-none hover:text-accent [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-[18px] font-normal text-pencil transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="max-w-[60ch] pb-8 pr-10">
                    <RichText value={item.answer} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'ctaSection':
      if (!s.heading && !s.text && !s.buttonLabel) return null;
      return (
        <section className={`mt-[8vh] bg-deep ${gutter} py-[14vh] text-center text-white`}>
          {s.heading && (
            <h2 className="m-0 font-display text-[clamp(30px,5vw,64px)] font-light leading-none tracking-[-0.02em] text-balance">
              {s.heading}
            </h2>
          )}
          {s.text && <p className="mx-auto mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-white/75">{s.text}</p>}
          {s.buttonLabel && (
            <Link
              href={`/contact?kind=${encodeURIComponent(s.enquiryKind ?? 'other')}`}
              className="mt-9 inline-block rounded-full bg-white px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-deep no-underline hover:bg-accent hover:text-white"
            >
              {s.buttonLabel}
            </Link>
          )}
        </section>
      );

    default:
      return null;
  }
}

/* One painting: the primary photo uncropped, with its title and specs. */
function WorkCard({ work: w }: { work: PageWork & { photo: NonNullable<PageWork['photo']> } }) {
  const dims = dimensionsLabel({ heightCm: w.dimensions?.height, widthCm: w.dimensions?.width });
  const meta = [w.medium, w.year, dims].filter(Boolean).join(' · ');
  const body = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${w.photo.src}?w=900&auto=format`}
        alt={w.title ?? ''}
        width={w.photo.dimensions?.width}
        height={w.photo.dimensions?.height}
        loading="lazy"
        className="block h-auto w-full shadow-[0_40px_70px_-44px_rgba(14,20,27,0.5)] transition-transform duration-700 group-hover:-translate-y-1"
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          {w.title && (
            <div className="font-display text-[20px] font-semibold leading-tight tracking-[-0.01em] text-ink group-hover:text-accent">
              {w.title}
            </div>
          )}
          {meta && (
            <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">{meta}</div>
          )}
        </div>
        {w.isSold && <SoldBadge />}
      </div>
    </>
  );
  return (
    <li>
      {w.slug ? (
        <Link href={`/work/${w.slug}`} className="group block no-underline">
          {body}
        </Link>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
}
