import Reveal from './Reveal.jsx';

const SERVICES = [
  {
    mark: 'A',
    title: 'Fullstack web development',
    copy:
      'Marketing sites, dashboards, and web apps built with React, Vue, or Svelte on the front end and Flask, Hono, or a custom API on the back. Responsive, fast, and easy for your team to update.',
  },
  {
    mark: 'B',
    title: 'Business process automation',
    copy:
      'Scripted workflows that remove manual, repetitive work — data entry, report generation, file processing, and system-to-system syncing — using Python.',
  },
  {
    mark: 'C',
    title: 'APIs & backend systems',
    copy:
      'Clean, documented REST APIs backed by MySQL, PostgreSQL, MongoDB, or SQLite — sized to the business, not over-engineered for a scale you do not have yet.',
  },
  {
    mark: 'D',
    title: 'Data tooling & light ML',
    copy:
      'Reporting, dashboards, and forecasting built on NumPy, Pandas, Matplotlib, Scikit-learn, and PyTorch — turning spreadsheets and logs into decisions.',
  },
];

export default function Services() {
  return (
    <section id="services" className="border-b border-ink-line/70">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="header" className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-bright">Detail views</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold text-paper md:text-4xl">What I build</h2>
          <p className="mt-4 text-paper-dim">
            Four scopes of work, each delivered end-to-end: planning, build, testing, and handoff.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-sm border border-ink-line/70 bg-ink-line/70 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.mark}
              as="article"
              delay={i * 90}
              className="group bg-ink-deep p-8 transition-colors duration-300 hover:bg-ink-panel/40"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-blue-line font-mono text-sm text-blue-bright transition-colors duration-300 group-hover:border-blue-bright group-hover:text-paper">
                {service.mark}
              </span>
              <h3 className="mt-5 font-mono text-lg font-semibold text-paper">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">{service.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
