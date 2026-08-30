export default function Footer() {
  return (
    <footer className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 font-mono text-xs text-paper-dim sm:flex-row sm:items-center">
        <p>FARESAYADI.DEV — Fullstack &amp; Automation Engineering</p>
        <p>© {new Date().getFullYear()} · Drawing revision 1.0 · All rights reserved</p>
      </div>
    </footer>
  );
}
