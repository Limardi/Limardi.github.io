'use client';

import React from 'react';
import { getExperience } from '@/lib/queries';
import type { Experience } from '@/data/portfolio-data';

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getExperience().then((data) => {
      setExperiences(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-2xl font-serif text-white">Experience</h2>

        {loading ? (
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-white/10 hidden sm:block" />

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.id ?? index} className="relative sm:pl-14">
                  {/* Timeline dot */}
                  <div className="absolute left-[15px] top-6 w-2 h-2 rounded-full bg-white/40 hidden sm:block" />

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;