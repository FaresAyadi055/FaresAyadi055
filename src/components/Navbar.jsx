import { Button, Link } from 'react-aria-components';

const NAV_LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'stack', label: 'Stack' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink-deep/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm text-paper">
          <span className="grid h-8 w-8 place-items-center rounded-sm border border-blue-line text-blue-bright">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </span>
          <span className="text-stamp">
            FARESAYADI<span className="text-blue-bright">.DEV</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              onPress={() => scrollTo(link.id)}
              className="cursor-pointer font-mono text-xs uppercase tracking-widest text-paper-dim outline-none transition-colors hover:text-blue-bright data-[focus-visible]:text-blue-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          onPress={() => scrollTo('contact')}
          className="rounded-sm border border-copper px-4 py-2 font-mono text-xs uppercase tracking-widest text-copper outline-none transition-colors hover:bg-copper hover:text-ink-deep data-[focus-visible]:bg-copper data-[focus-visible]:text-ink-deep"
        >
          Start a project
        </Button>
      </div>
    </header>
  );
}
