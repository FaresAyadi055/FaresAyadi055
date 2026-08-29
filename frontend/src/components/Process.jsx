const STEPS = [
  { step: '01', title: 'Scope', copy: 'A short call to define the problem, constraints, and a fixed-scope proposal.' },
  { step: '02', title: 'Design', copy: 'Data model, API shape, and UI sketch, reviewed with you before code is written.' },
  { step: '03', title: 'Build', copy: 'Iterative delivery with staging previews, so you see progress every week, not just at the end.' },
  { step: '04', title: 'Ship & support', copy: 'Deployed, documented, and handed off — with a support window for fixes and small changes.' },
];

export default function Process() {
  return (
    <section id="process" className="border-b border-ink-line/70">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-bright">Revision history</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold text-paper md:text-4xl">How a project runs</h2>
        </header>

        <ol className="grid gap-8 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.step} className="relative border-l border-ink-line/70 pl-6">
              <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full border border-blue-bright bg-ink-deep" />
              <span className="font-mono text-xs text-blue-bright">{s.step}</span>
              <h3 className="mt-2 font-mono text-base font-semibold text-paper">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
