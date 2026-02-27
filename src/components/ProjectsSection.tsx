'use client';

import React, { useState, useMemo, useEffect } from 'react';
import SectionHeader from './common/SectionHeader';
import Image from 'next/image';
import { getProjects } from '@/lib/queries';
import type { Project } from '@/data/portfolio-data';
import Link from 'next/link';

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
      <section id="projects" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Projects" />
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Projects" />

        {/* Category Filter - Segmented Control Style */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <div className="flex flex-wrap justify-center p-1.5 bg-zinc-900/50 backdrop-blur-md rounded-full border border-white/5 shadow-inner">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                  ? 'bg-zinc-100 text-zinc-900 shadow-lg scale-100'
                  : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id ?? index}
              className="group relative flex flex-col bg-zinc-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              {/* Image Container with strict fixed aspect ratio and Apple-style inner shadow */}
              <div className="relative h-56 sm:h-64 w-full flex-shrink-0 overflow-hidden bg-zinc-900">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  </div>
                )}
                {/* Subtle inner shadow overlay */}
                <div className="absolute inset-0 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.4)] pointer-events-none" />

                {/* Category Pill floating on image */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white/90 border border-white/20 rounded-full text-xs font-semibold tracking-wide shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-1 p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Spacer to push technologies to bottom */}
                <div className="flex-1" />

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-300 bg-white/5 rounded-lg border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2.5 py-1 text-xs font-medium text-zinc-500 bg-transparent rounded-lg border border-white/5">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Ambient Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 from-white/5 to-transparent bg-gradient-to-b" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;