'use client';

import React from 'react';
import SectionHeader from './common/SectionHeader';
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
    <section id="experience" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Experience" />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline Glow Line */}
            <div className="absolute left-[27px] sm:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block" />

            <div className="space-y-12 sm:space-y-16">
              {experiences.map((exp, index) => (
                <div key={exp.id ?? index} className="relative group">

                  {/* Timeline Marker Ring */}
                  <div className="absolute left-[19px] sm:left-[31px] top-8 w-4 h-4 rounded-full border-2 border-white/30 bg-zinc-900 shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:border-zinc-100 group-hover:scale-125 transition-all duration-300 z-10 hidden md:block" />

                  <div className="md:ml-24 flex flex-col bg-zinc-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] p-6 sm:p-10">
                    <div className="space-y-6">

                      {/* Header Stack */}
                      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-lg font-medium text-zinc-300">
                              {exp.company}
                            </span>
                            {exp.location && (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                <span className="text-sm font-medium text-zinc-500">
                                  {exp.location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Date Pill */}
                        <div className="flex-shrink-0">
                          <span className="inline-flex px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-zinc-200 tracking-wide uppercase">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      {/* Main Description */}
                      <p className="text-zinc-400 text-base leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements Checklist */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="pt-4 space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-4 pl-2">
                              {/* Apple Check Icon representation */}
                              <svg className="w-5 h-5 mt-0.5 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Footer */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="pt-6 mt-2 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800/80 text-zinc-300 border border-white/5 hover:bg-zinc-700/80 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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