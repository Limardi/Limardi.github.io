import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { Experience } from '@/data/portfolio-data';

interface ExperienceSectionProps {
  items: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="01" title="Experience" variant="serif" />

        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-white/10 hidden sm:block" />

          <div className="space-y-6">
            {items.map((exp, index) => (
              <Reveal key={exp.slug} delay={index * 60} className="relative sm:pl-14">
                <div className="absolute left-[15px] top-7 w-2 h-2 rounded-full bg-white/40 hidden sm:block" />

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-white">{exp.role}</h3>
                      <p className="text-zinc-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-zinc-500 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{exp.description}</p>
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
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
