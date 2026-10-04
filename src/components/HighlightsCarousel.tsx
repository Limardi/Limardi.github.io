'use client';

import React, { useEffect, useRef, useState } from 'react';
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

interface HighlightsCarouselProps {
  projects: Project[];
}

export default function HighlightsCarousel({ projects }: HighlightsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || projects.length <= 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { root, threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  if (projects.length === 0) return null;

  return (
    <Reveal trigger="mount" distance="translate-y-8" className="w-full">
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory w-fit max-w-full mx-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <a
            key={project.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            href={`#project-${project.slug}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToProject(project.slug);
            }}
            className="group snap-center flex-shrink-0 w-[28rem] max-w-[85vw] text-left overflow-hidden rounded-3xl border border-amber-400/30 bg-white/5 shadow-[0_0_0_1px_rgba(251,191,36,0.12)] transition-[border-color,background-color] duration-300 ease-out-strong hover:border-amber-400/60 hover:bg-white/[0.07]"
          >
            <div className="relative aspect-[2/1] overflow-hidden bg-zinc-900">
              <SafeImage
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 85vw, 448px"
                className={`object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.05] ${
                  project.slug === 'retrieval-based-pbr-textures' ? 'object-left' : ''
                }`}
              />
            </div>
            <div className="p-7 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-sm font-semibold leading-tight">
                {ACCOLADES[project.slug] ?? 'Highlighted project'}
              </span>
              <p className="text-2xl sm:text-3xl font-semibold text-white leading-snug">{project.title}</p>
              <p className="text-base text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>
            </div>
          </a>
        ))}
      </div>

      {projects.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={i === active}
              onClick={() =>
                cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
              }
              className="p-2.5 -m-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out-strong ${
                  i === active ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </Reveal>
  );
}
