'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import SafeImage from './common/SafeImage';
import SectionHeader from './common/SectionHeader';
import Reveal from './common/Reveal';
import type { Project } from '@/data/portfolio-data';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const scoped = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);
    // Featured projects lead the grid; stable sort keeps the rest in their original order.
    return [...scoped].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [projects, activeCategory]);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <SectionHeader eyebrow="04" title="Projects" variant="serif" />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-full transition-[transform,background-color,color] duration-200 ease-out-strong active:scale-[0.97] ${
                activeCategory === category
                  ? 'bg-white text-zinc-950'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 50} className="h-full">
              <Link
                id={`project-${project.slug}`}
                href={`/projects/${project.slug}`}
                className={`group flex flex-col h-full scroll-mt-24 bg-white/5 border rounded-xl overflow-hidden transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-1 hover:bg-white/[0.07] active:scale-[0.99] ${
                  project.featured
                    ? 'border-amber-400/30 hover:border-amber-400/60'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative aspect-[4/3] bg-zinc-900 flex-shrink-0 overflow-hidden">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.04] ${
                      project.slug === 'retrieval-based-pbr-textures' ? 'object-left' : ''
                    }`}
                  />
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400/15 backdrop-blur-sm border border-amber-400/30 text-amber-300 text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-medium text-white truncate flex-1">{project.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-white/10 text-zinc-400 rounded flex-shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/5 text-zinc-400 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
