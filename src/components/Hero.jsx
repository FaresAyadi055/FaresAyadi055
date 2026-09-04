import { Button, Link } from 'react-aria-components';
import Reveal from './Reveal.jsx';

const CIRCUIT_PATH = 'M40 460 L180 460 L180 340 L300 340 L300 420 L520 420';

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-ink-line/70">
      {/* Schematic linework, decorative */}
      <svg
        className="pointer-events-none absolute -right-24 top-0 h-full w-full max-w-3xl opacity-70"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="420" cy="220" r="140" stroke="#1B3E63" strokeWidth="1" />
        <circle cx="420" cy="220" r="90" stroke="#1B3E63" strokeWidth="1" />
        <path d="M420 80v-40M420 360v40M280 220h-40M600 220h-40" stroke="#1B3E63" strokeWidth="1" />
        <path
          className="animate-[draw-line_2.4s_ease-out_forwards]"
          style={{ strokeDasharray: 1, strokeDashoffset: 1, pathLength: 1 }}
          d={CIRCUIT_PATH}
          stroke="#3E7CB1"
          strokeWidth="1.5"
        />

        {/* Signal pulses travel the trace once it's finished drawing, like current
            reaching production. Skipped entirely for reduced-motion users. */}
        {!prefersReducedMotion && (
          <>
            <circle r="4" fill="#6FB7E8">
              <animateMotion dur="3.6s" begin="2.4s" repeatCount="indefinite" path={CIRCUIT_PATH} />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.06;0.88;1"
                dur="3.6s"
                begin="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#F0BE7C">
              <animateMotion dur="3.6s" begin="4.2s" repeatCount="indefinite" path={CIRCUIT_PATH} />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.06;0.88;1"
                dur="3.6s"
                begin="4.2s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}

        <circle cx="40" cy="460" r="4" fill="#6FB7E8" className={prefersReducedMotion ? '' : 'animate-float-slow'} />
        <circle
          cx="300"
          cy="340"
          r="4"
          fill="#6FB7E8"
          className={prefersReducedMotion ? '' : 'animate-float-slow'}
          style={{ animationDelay: '1.2s' }}
        />
        <circle
          cx="520"
          cy="420"
          r="4"
          fill="#E0A458"
          className={prefersReducedMotion ? '' : 'animate-float-slow'}
          style={{ animationDelay: '2.4s' }}
        />
        <text x="300" y="326" fill="#6FB7E8" fontFamily="monospace" fontSize="10">
          API
        </text>
        <text x="30" y="480" fill="#6FB7E8" fontFamily="monospace" fontSize="10">
          CLIENT
        </text>
        <text x="500" y="440" fill="#E0A458" fontFamily="monospace" fontSize="10">
          DEPLOY
        </text>
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-28">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-blue-bright">
            Software Engineer
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-3xl font-mono text-4xl font-semibold leading-[1.15] text-paper md:text-6xl">
            Fares Ayadi
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-4 max-w-xl font-mono text-xl text-blue-bright md:text-2xl">
            Fullstack systems and automation, built to spec.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
            I design, build, and ship web applications, APIs, and automation pipelines for
            small and medium businesses — from first sketch to production deploy.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              onPress={() => scrollTo('contact')}
              className="rounded-sm bg-copper px-6 py-3 font-mono text-sm uppercase tracking-widest text-ink-deep outline-none transition-transform hover:scale-[1.02] data-[focus-visible]:scale-[1.02]"
            >
              Start a project
            </Button>
            <Link
              onPress={() => scrollTo('stack')}
              className="cursor-pointer rounded-sm border border-blue-line px-6 py-3 font-mono text-sm uppercase tracking-widest text-paper outline-none transition-colors hover:border-blue-bright hover:text-blue-bright data-[focus-visible]:border-blue-bright data-[focus-visible]:text-blue-bright"
            >
              View the stack
            </Link>
          </div>
        </Reveal>

        {/* Title block, like the corner of a real engineering drawing */}
        <Reveal delay={320}>
          <dl className="mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-3 border border-ink-line/70 bg-ink-panel/40 p-5 font-mono text-xs sm:grid-cols-4">
            <div>
              <dt className="text-paper-dim">Drawn by</dt>
              <dd className="mt-1 text-paper">Fullstack Eng.</dd>
            </div>
            <div>
              <dt className="text-paper-dim">Scope</dt>
              <dd className="mt-1 text-paper">Web / Automation</dd>
            </div>
            <div>
              <dt className="text-paper-dim">Clients</dt>
              <dd className="mt-1 text-paper">SMB</dd>
            </div>
            <div>
              <dt className="text-paper-dim">Status</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-blue-bright">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-bright opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-bright" />
                </span>
                Available
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
