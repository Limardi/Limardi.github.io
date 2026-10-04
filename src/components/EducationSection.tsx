import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { Education } from '@/data/portfolio-data';

interface EducationSectionProps {
  education: Education | null;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  if (!education) return null;

  return (
    <section id="education" className="py-16 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="02" title="Education" variant="serif" />

        <Reveal once={false}>
          <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
              <Image
                src="/images/nthu.png"
                alt="NTHU"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-medium text-white">{education.institution}</h3>
              <div className="space-y-2.5">
                {education.degrees.map((d, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-zinc-300">{d.degree}</p>
                      <span className="text-sm text-zinc-500 whitespace-nowrap">{d.period}</span>
                    </div>
                    {d.focus && d.focus.length > 0 && (
                      <p className="text-sm text-zinc-500 mt-0.5">Research: {d.focus.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile: a compact stat row instead of cramming 3 bordered cards into 360px. */}
        <Reveal once={false} className="sm:hidden">
          <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-2 py-4">
            {education.rankings.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span aria-hidden className="h-10 w-px bg-white/10 flex-shrink-0" />}
                <div className="flex-1 flex flex-col items-center gap-0.5 text-center min-w-0">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[11px] text-zinc-500 truncate">{item.region}</span>
                  <span className="text-sm font-medium text-white">{item.rank}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        {/* Desktop/tablet: full card grid. */}
        <div className="hidden sm:grid grid-cols-3 gap-4">
          {education.rankings.map((item, index) => (
            <Reveal key={index} delay={index * 60} once={false} className="h-full">
              <div className="h-full p-4 bg-white/5 border border-white/10 rounded-xl text-center transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20">
                <p className="text-2xl mb-1">{item.icon}</p>
                <p className="text-xs text-zinc-500">{item.region} Rank</p>
                <p className="text-lg font-medium text-white">{item.rank}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-wrap gap-2">
            {education.courses.map((course, index) => (
              <span key={index} className="px-3 py-1.5 text-xs bg-white/5 text-zinc-300 rounded-lg border border-white/10">
                {course}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EducationSection;
