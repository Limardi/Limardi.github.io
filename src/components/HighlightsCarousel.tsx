'use client';

import React, { useState } from 'react';
import SafeImage from './common/SafeImage';
import type { Project } from '@/data/portfolio-data';

// Short venue+year stamp shown on the image, distinct from the achievement
// pill below (e.g. "SIGGRAPH Asia 2026" + "Posters").
const VENUE: Record<string, string> = {
  camgraph: 'SIGGRAPH Asia 2026',
  'retrieval-based-pbr-textures': 'CVGIP 2026',
};

const ACHIEVEMENT: Record<string, string> = {
  camgraph: 'Accepted — Posters',
  'retrieval-based-pbr-textures': 'Outstanding Paper Award',
};

interface HighlightsCarouselProps {
  projects: Project[];
}

export default function HighlightsCarousel({ projects }: HighlightsCarouselProps) {
  const [index, setIndex] = useState(0);

  if (projects.length === 0) return null;

  const go = (next: number) => {
    setIndex((next + projects.length) % projects.length);
  };

  const handleSelect = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(`project-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="w-full max-w-md sm:max-w-xl mx-auto">
      <div className="relative flex items-center gap-3">
        {projects.length > 1 && (
          <button
            type="button"
            aria-label="Previous highlight"
            onClick={() => go(index - 1)}
            className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full bg-zinc-900 border border-white/15 text-zinc-300 text-xl transition-colors duration-200 ease-out-strong hover:text-white hover:border-white/30"
          >
            ‹
          </button>
        )}

        <div className="relative flex-1 overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out-strong"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map((project) => (
              <a
                key={project.slug}
                href={`#project-${project.slug}`}
                onClick={handleSelect(project.slug)}
                className="group w-full flex-shrink-0 text-left overflow-hidden rounded-3xl border border-amber-400/30 bg-white/5 shadow-[0_0_0_1px_rgba(251,191,36,0.12)] transition-[border-color,background-color] duration-300 ease-out-strong hover:border-amber-400/60 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-zinc-900">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="576px"
                    className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-sm text-white text-sm font-semibold">
                    {VENUE[project.slug] ?? project.category}
                  </span>
                </div>
                <div className="p-6 space-y-2.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-sm font-semibold leading-none">
                    {ACHIEVEMENT[project.slug] ?? 'Highlighted project'}
                  </span>
                  <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">{project.title}</p>
                  <p className="text-base text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {projects.length > 1 && (
          <button
            type="button"
            aria-label="Next highlight"
            onClick={() => go(index + 1)}
            className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full bg-zinc-900 border border-white/15 text-zinc-300 text-xl transition-colors duration-200 ease-out-strong hover:text-white hover:border-white/30"
          >
            ›
          </button>
        )}
      </div>

      {projects.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out-strong ${
                i === index ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
