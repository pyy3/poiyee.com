/* About the practice — a large typographic statement in the Monument language,
   with a spec column of facts alongside. */
export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1300px] px-[clamp(22px,4vw,54px)] py-[16vh]"
    >
      <div className="mb-16 font-mono text-[11px] uppercase tracking-[0.22em] text-pencil">
        About the practice
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-[7fr_4fr]">
        <div className="max-w-[24ch]">
          <p className="font-display text-[clamp(30px,4.4vw,64px)] font-light leading-[1.1] tracking-[-0.02em]">
            The work is not landscape, exactly. It is what the body{' '}
            <span className="font-semibold text-accent">remembers after looking</span>.
          </p>
        </div>

        <div className="space-y-5 text-[17px] leading-[1.7] text-ink/80 md:pt-3">
          <p>
            poiyee paints in acrylic, building each canvas through palette-knife layers that hold the
            breath of a single morning and the weight of every one that came before.
          </p>
          <p>
            Her subjects return — water surfaces, distant horizons, the colour of light just before it
            changes. She lives and works in Zürich. Commissions and acquisitions are open by enquiry.
          </p>

          <dl className="grid gap-5 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
            <Fact label="Lives & works">Zürich, Switzerland</Fact>
            <Fact label="Medium">
              Acrylic on canvas
              <br />
              Palette knife
            </Fact>
            <Fact label="Enquiries">hello@poiyee.com</Fact>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 border-t border-line pt-4">
      <dt className="text-ink">{label}</dt>
      <dd className="m-0 text-right text-pencil">{children}</dd>
    </div>
  );
}
