'use client';

import React from 'react';
import SectionHeader from './common/SectionHeader';
import { getLanguages } from '@/lib/queries';
import type { Language } from '@/data/portfolio-data';

const LanguageSection: React.FC = () => {
  const [languages, setLanguages] = React.useState<Language[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getLanguages().then((data) => {
      setLanguages(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="languages" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Language Proficiency" />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((lang, index) => (
              <div key={index} className="group relative bg-zinc-900/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)]">
                <div className="space-y-5 relative z-10">
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">{lang.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors tracking-wide">{lang.level}</span>
                      <span className="text-zinc-200">{lang.percentage}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-2.5 bg-zinc-800/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      {/* Glow Fill */}
                      <div
                        className="h-full bg-gradient-to-r from-zinc-400 to-zinc-100 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguageSection;