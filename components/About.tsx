export function About() {
  return (
    <section id="about" className="border-t border-ink/15 pt-24 pb-16">
      <div className="flex items-baseline gap-5 mb-16 font-mono text-[11px] tracking-[0.22em] uppercase text-pencil">
        <span
          className="font-display italic text-[56px] leading-none text-ink font-light"
          style={{ fontVariationSettings: '"opsz" 144, "wght" 320', letterSpacing: '-0.02em' }}
        >
          II
        </span>
        <span className="pb-2">— About the practice</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr_5fr] gap-16 items-start">
        <div
          className="font-display text-[clamp(20px,1.6vw,24px)] leading-[1.5] text-ink space-y-4"
          style={{ fontVariationSettings: '"opsz" 96, "wght" 360' }}
        >
          <p>
            poiyee paints in acrylic, building each canvas through{' '}
            <em className="text-accent italic">palette-knife layers</em> that hold the breath of a single
            morning and the weight of every one that came before.
          </p>
          <p>
            Her subjects return — water surfaces, distant horizons, the colour of light just before it
            changes. The work is not landscape, exactly. It is what the body remembers after looking.
          </p>
          <p>She lives and works in Zurich. Commissions and acquisitions are open by enquiry.</p>
        </div>

        <div />

        <dl className="font-mono text-[11px] tracking-[0.18em] uppercase text-pencil grid gap-6">
          <Fact label="Born">—</Fact>
          <Fact label="Lives & works">Zurich, Switzerland</Fact>
          <Fact label="Medium">Acrylic on canvas<br />Palette knife</Fact>
          <Fact label="Exhibitions">—</Fact>
          <Fact label="Representation">—</Fact>
          <Fact label="Press">—</Fact>
        </dl>
      </div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-ink mb-1">{label}</dt>
      <dd className="m-0 text-pencil">{children}</dd>
    </div>
  );
}
