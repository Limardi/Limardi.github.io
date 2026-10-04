'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import SafeImage from './common/SafeImage';
import type { Project } from '@/data/portfolio-data';

// Short-form recognition labels for the hero, distinct from the fuller
// `outcomes` text shown on each project's own detail page.
const ACCOLADES: Record<string, string> = {
  camgraph: 'SIGGRAPH Asia 2026 Posters',
  'retrieval-based-pbr-textures': 'CVGIP 2026 Outstanding Paper Award',
};

interface HighlightsCarouselProps {
  projects: Project[];
}

export default function HighlightsCarousel({ projects }: HighlightsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  if (projects.length === 0) return null;

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = (card?.offsetWidth ?? 240) + 16;
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto pt-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <Link
            key={project.slug}
            data-card
            href={`/projects/${project.slug}`}
            className="group flex-shrink-0 snap-start w-56 sm:w-60 text-left overflow-hidden rounded-xl border border-amber-400/25 bg-white/5 transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-1 hover:border-amber-400/60 hover:bg-white/[0.07]"
          >
            <div className="relative aspect-video overflow-hidden bg-zinc-900">
              <SafeImage
                src={project.image}
                alt={project.title}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.05]"
              />
            </div>
            <div className="p-3 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[11px] font-semibold leading-none">
                {ACCOLADES[project.slug] ?? project.category}
              </span>
              <p className="text-sm font-semibold text-white leading-snug">{project.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {projects.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous highlight"
            onClick={() => scrollByCard(-1)}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center rounded-full bg-zinc-900 border border-white/15 text-zinc-300 transition-colors duration-200 ease-out-strong hover:text-white hover:border-white/30"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next highlight"
            onClick={() => scrollByCard(1)}
            className="hidden sm:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center rounded-full bg-zinc-900 border border-white/15 text-zinc-300 transition-colors duration-200 ease-out-strong hover:text-white hover:border-white/30"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
