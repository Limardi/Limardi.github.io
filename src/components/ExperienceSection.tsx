'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { Experience } from '@/data/portfolio-data';

interface ExperienceSectionProps {
  items: Experience[];
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails =
    (exp.achievements && exp.achievements.length > 0) || (exp.technologies && exp.technologies.length > 0);

  return (
    <Reveal delay={index * 60} once={false} className="relative flex gap-3 sm:block sm:pl-14">
      {/* Mobile-only progression cue (desktop's connecting rail is hidden below sm:, so
          this replaces it rather than just letting chronology disappear). */}
      <div className="sm:hidden flex-shrink-0 w-7 h-7 mt-1 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-zinc-400 flex items-center justify-center">
        {index + 1}
      </div>
      <div className="absolute left-[15px] top-7 w-2 h-2 rounded-full bg-white/40 hidden sm:block" />

      <div className="flex-1 min-w-0 p-6 bg-white/5 border border-white/10 rounded-xl transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-medium text-white">{exp.role}</h3>
            <p className="text-zinc-400">{exp.company}</p>
          </div>
          <span className="text-sm text-zinc-500 whitespace-nowrap">{exp.period}</span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-3">{exp.description}</p>

        {hasDetails && (
          <>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="sm:hidden flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200 ease-out-strong mb-1 -mx-1 px-1 py-1"
            >
              {expanded ? 'Hide details' : 'Show details'}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ease-out-strong ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${expanded ? 'block' : 'hidden'} sm:block`}>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-1.5 mb-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="w-1 h-1 mt-1.5 rounded-full bg-zinc-500 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-white/5 text-zinc-400 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Reveal>
  );
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="01" title="Experience" variant="serif" />

        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-white/10 hidden sm:block" />

          <div className="space-y-6">
            {items.map((exp, index) => (
              <ExperienceCard key={exp.slug} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
