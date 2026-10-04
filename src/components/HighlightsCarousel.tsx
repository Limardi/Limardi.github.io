'use client';

import React from 'react';
import SafeImage from './common/SafeImage';
import Reveal from './common/Reveal';
import type { Project } from '@/data/portfolio-data';

// Single combined accolade label per project: "<achievement> — <venue + year>".
const ACCOLADES: Record<string, string> = {
  camgraph: 'Posters — SIGGRAPH Asia 2026',
  'retrieval-based-pbr-textures': 'Outstanding Paper Award — CVGIP 2026',
};

function scrollToProject(slug: string) {
  document.getElementById(`project-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

interface HighlightCardProps {
  project: Project;
  className?: string;
}

function HighlightCard({ project, className = '' }: HighlightCardProps) {
  return (
    <a
      href={`#project-${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToProject(project.slug);
      }}
      className={`group text-left overflow-hidden rounded-3xl border border-amber-400/30 bg-white/5 shadow-[0_0_0_1px_rgba(251,191,36,0.12)] transition-[border-color,background-color] duration-300 ease-out-strong hover:border-amber-400/60 hover:bg-white/[0.07] ${className}`}
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-zinc-900">
        <SafeImage
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 400px, 576px"
          className={`object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.05] ${
            project.slug === 'retrieval-based-pbr-textures' ? 'object-left' : ''
          }`}
        />
      </div>
      <div className="p-6 space-y-2.5">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs sm:text-sm font-semibold leading-tight">
          {ACCOLADES[project.slug] ?? 'Highlighted project'}
        </span>
        <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">{project.title}</p>
        <p className="text-base text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </a>
  );
}

interface HighlightsCarouselProps {
  projects: Project[];
}

export default function HighlightsCarousel({ projects }: HighlightsCarouselProps) {
  if (projects.length === 0) return null;

  return (
    <>
      {/* Small/medium screens: a vertical stack that slides up into view on scroll. */}
      <div className="lg:hidden w-full max-w-md sm:max-w-xl mx-auto flex flex-col gap-5">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 120} distance="translate-y-8">
            <HighlightCard project={project} className="w-full" />
          </Reveal>
        ))}
      </div>

      {/* Large screens: enough room to show every highlight at once, same scroll-reveal entrance. */}
      <div
        className="hidden lg:grid w-full max-w-3xl mx-auto gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 120} distance="translate-y-8">
            <HighlightCard project={project} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
