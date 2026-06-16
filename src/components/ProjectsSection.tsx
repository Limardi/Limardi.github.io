'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from './common/SafeImage';
import { getProjects } from '@/lib/queries';
import type { Project } from '@/data/portfolio-data';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  if (loading) {
    return (
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif text-white mb-12">Projects</h2>
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-2xl font-serif text-white">Projects</h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
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
            <Link
              href={`/projects/${project.id}`}
              key={project.id ?? index}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-colors"
            >
              <div className="relative aspect-[4/3] bg-zinc-900 flex-shrink-0">
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;