'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import { SkeletonCard } from '@/components/common/Skeleton';
import { getEducation } from '@/lib/queries';
import type { Education } from '@/data/portfolio-data';

const EducationSection: React.FC = () => {
  const [education, setEducation] = React.useState<Education | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getEducation().then((data) => {
      setEducation(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section id="education" className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <SectionHeader eyebrow="02" title="Education" variant="serif" />
          <SkeletonCard className="h-32" />
        </div>
      </section>
    );
  }

  if (!education) return null;

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="02" title="Education" variant="serif" />

        <Reveal>
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
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-medium text-white">{education.institution}</h3>
              <p className="text-zinc-400">{education.degree}</p>
              <p className="text-sm text-zinc-500">{education.period}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 gap-4">
          {education.rankings.map((item, index) => (
            <Reveal key={index} delay={index * 60} className="h-full">
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
