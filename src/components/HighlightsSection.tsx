import React from 'react';
import Link from 'next/link';
import SafeImage from './common/SafeImage';
import SectionHeader from './common/SectionHeader';
import Reveal from './common/Reveal';
import type { Project } from '@/data/portfolio-data';

interface HighlightsSectionProps {
  projects: Project[];
}

const HighlightsSection: React.FC<HighlightsSectionProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <section id="highlights" className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <SectionHeader eyebrow="Featured Work" title="Highlights" variant="serif" />

        <div className="space-y-16">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <Reveal key={project.slug} delay={index * 80}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`group grid md:grid-cols-2 gap-8 items-center ${
                    reversed ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="space-y-4">
                    {project.outcomes[0] && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                        {project.outcomes[0]}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-serif text-white">{project.title}</h3>
                    {project.authors && project.authors.length > 0 && (
                      <p className="text-sm text-zinc-500">{project.authors.join(', ')}</p>
                    )}
                    <p className="text-zinc-400 leading-relaxed">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                      View case study
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-out-strong group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
