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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 14V2h8l4 4v8H2Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="text-stamp">
            BLUEPRINT<span className="text-blue-bright">.DEV</span>
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
