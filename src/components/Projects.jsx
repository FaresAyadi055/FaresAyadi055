import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import ProjectCard from './ProjectCard.jsx';
import projects from '../data/projects.json';

export default function Projects() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.userSelect = '';
  }, []);

  function scroll(direction) {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  return (
    <section id="projects" className="border-b border-ink-line/70">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="header" className="mb-14 flex items-end justify-between max-w-2xl">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-bright">Portfolio</p>
            <h2 className="mt-3 font-mono text-3xl font-semibold text-paper md:text-4xl">Projects</h2>
            <p className="mt-4 text-paper-dim">
              Selected work — each card links to a live site, demo, or source code.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll('left')}
              className="grid h-9 w-9 place-items-center rounded-sm border border-ink-line text-paper-dim outline-none transition-colors hover:border-blue-bright hover:text-blue-bright"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="grid h-9 w-9 place-items-center rounded-sm border border-ink-line text-paper-dim outline-none transition-colors hover:border-blue-bright hover:text-blue-bright"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
