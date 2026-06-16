'use client';

import React from 'react';
import Image from 'next/image';
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif text-white mb-12">Education</h2>
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!education) return null;

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-2xl font-serif text-white">Education</h2>

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

        <div className="grid grid-cols-3 gap-4">
          {education.rankings.map((item, index) => (
            <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="text-xs text-zinc-500">{item.region} Rank</p>
              <p className="text-lg font-medium text-white">{item.rank}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {education.courses.map((course, index) => (
            <span key={index} className="px-3 py-1.5 text-xs bg-white/5 text-zinc-300 rounded-lg border border-white/10">
              {course}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;