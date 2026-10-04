'use client';

import React, { useRef, useState } from 'react';
import SafeImage from './common/SafeImage';
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

const SWIPE_THRESHOLD_PX = 40;

export default function HighlightsCarousel({ projects }: HighlightsCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (projects.length === 0) return null;

  const go = (next: number) => {
    setIndex((next + projects.length) % projects.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD_PX) go(index - 1);
    else if (delta < -SWIPE_THRESHOLD_PX) go(index + 1);
  };

  return (
    <>
      {/* Small/medium screens: one card at a time, with arrows + dots. */}
      <div className="lg:hidden w-full max-w-md sm:max-w-xl mx-auto">
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
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {projects.map((project) => (
                <HighlightCard key={project.slug} project={project} className="w-full flex-shrink-0" />
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
          <div className="flex items-center justify-center gap-1 pt-4">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                aria-label={`Show ${project.title}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className="p-2.5 -m-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out-strong ${
                    i === index ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Large screens: enough room to show every highlight at once, no arrows/dots needed. */}
      <div
        className="hidden lg:grid w-full max-w-3xl mx-auto gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        {projects.map((project) => (
          <HighlightCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
