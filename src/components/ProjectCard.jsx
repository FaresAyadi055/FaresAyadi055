import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

function PreviewFrame({ url, isGithub, linkLabel }) {
  if (isGithub) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link relative flex h-40 items-center justify-center bg-ink-panel/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(111,183,232,0.15)] hover:bg-ink-panel/40"
      >
        <Github className="h-12 w-12 text-paper-dim/60 transition-colors group-hover/link:text-paper-dim/80" />
        <span className="absolute bottom-2 right-2 rounded-sm bg-ink-deep/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-bright backdrop-blur-sm">
          {linkLabel}
        </span>
      </a>
    );
  }

  if (!url) {
    return (
      <div className="flex h-40 items-center justify-center bg-ink-panel/30">
        <img src="/favicon.svg" alt="Preview unavailable" className="h-10 w-10 opacity-40" />
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link relative block h-40 overflow-hidden bg-ink-panel/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(111,183,232,0.15)]"
    >
      <iframe
        src={url}
        title="Project preview"
        sandbox="allow-scripts allow-same-origin"
        className="pointer-events-none absolute top-0 left-0 h-[167%] w-[150%] border-0"
        loading="lazy"
        style={{ transform: 'scale(0.6)', transformOrigin: 'top left' }}
      />
      <div className="absolute inset-0 bg-transparent transition-colors group-hover/link:bg-blue-bright/5" />
      <span className="absolute bottom-2 right-2 rounded-sm bg-ink-deep/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-bright backdrop-blur-sm">
        {linkLabel}
      </span>
    </a>
  );
}

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = project.description && project.description.length > 100;

  const previewUrl = project.productionUrl || project.demoUrl || project.githubUrl;
  const isGithubPreview = !project.productionUrl && !project.demoUrl && !!project.githubUrl;
  const linkLabel = project.productionUrl ? 'Live' : project.demoUrl ? 'Demo' : 'GitHub';

  return (
    <div className="flex w-[20rem] shrink-0 flex-col overflow-hidden rounded-sm border border-ink-line bg-ink-panel/30 transition-colors hover:border-blue-line">
      <div className="px-5 pt-5">
        <h3 className="font-mono text-base font-semibold text-paper">{project.title}</h3>

        {project.description && (
          <div className="mt-2">
            <p
              className={`text-sm leading-relaxed text-paper-dim transition-all duration-300 ${
                !expanded && isLong ? 'line-clamp-2' : ''
              }`}
            >
              {project.description}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-blue-bright outline-none hover:underline"
              >
                {expanded ? 'View less' : 'View more'}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 mx-5 overflow-hidden rounded-sm border border-ink-line/50">
        <PreviewFrame url={previewUrl} isGithub={isGithubPreview} linkLabel={linkLabel} />
      </div>

      <div className="flex items-center gap-4 px-5 py-3">
        <a
          href={project.productionUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 font-mono text-xs transition-colors ${
            project.productionUrl
              ? 'text-blue-bright hover:underline'
              : 'text-paper-dim/30 cursor-not-allowed pointer-events-none'
          }`}
        >
          <ExternalLink className="h-3 w-3" />
          Live
        </a>
        <a
          href={project.demoUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 font-mono text-xs transition-colors ${
            project.demoUrl
              ? 'text-blue-bright hover:underline'
              : 'text-paper-dim/30 cursor-not-allowed pointer-events-none'
          }`}
        >
          <ExternalLink className="h-3 w-3" />
          Demo
        </a>
        <a
          href={project.githubUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 font-mono text-xs transition-colors ${
            project.githubUrl
              ? 'text-blue-bright hover:underline'
              : 'text-paper-dim/30 cursor-not-allowed pointer-events-none'
          }`}
        >
          <Github className="h-3 w-3" />
          Code
        </a>
      </div>
    </div>
  );
}
