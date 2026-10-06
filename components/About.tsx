import Link from 'next/link';
import { getAbout, hasText } from '@/lib/content';
import { Headline, Prose } from './Headline';

/* About the practice — a large typographic statement in the Monument language,
   with a spec column of facts alongside. All text comes from the About page in
   Sanity; the section is hidden while that is empty. */
export async function About() {
  const { statement, bio, facts, portrait } = await getAbout();
  if (!hasText(statement) && !hasText(bio) && !facts?.length && !portrait?.src) return null;

  return (
    <section
      id="about"
      className="mx-auto max-w-[1300px] px-[clamp(22px,4vw,54px)] py-[16vh]"
    >
      <div className="mb-16 font-mono text-[11px] uppercase tracking-[0.22em] text-pencil">
        About the practice
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-[7fr_4fr]">
        <div>
          <p className="max-w-[24ch] font-display text-[clamp(30px,4.4vw,64px)] font-light leading-[1.1] tracking-[-0.02em]">
            <Headline value={statement} emphasis="font-semibold text-accent" />
          </p>

          {portrait?.src && (
            <figure className="mt-14 max-w-[460px]">
              {/* The whole photo, uncropped. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${portrait.src}?w=920&auto=format`}
                alt={portrait.alt ?? ''}
                width={portrait.dimensions?.width}
                height={portrait.dimensions?.height}
                loading="lazy"
                className="h-auto w-full shadow-[0_40px_80px_-50px_rgba(14,20,27,0.45)]"
              />
              {portrait.caption && (
                <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">
                  {portrait.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>

        <div className="space-y-5 text-[17px] leading-[1.7] text-ink/80 md:pt-3">
          <Prose value={bio} />

          {!!facts?.length && (
            <dl className="grid gap-5 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              {facts.map((f) => (
                <Fact key={f._key} label={f.label}>
                  {f.link ? (
                    <Link href={f.link} className="text-pencil no-underline hover:text-accent">
                      {f.value}
                    </Link>
                  ) : (
                    f.value
                  )}
                </Fact>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 border-t border-line pt-4">
      <dt className="text-ink">{label}</dt>
      <dd className="m-0 whitespace-pre-line text-right text-pencil">{children}</dd>
    </div>
  );
}
