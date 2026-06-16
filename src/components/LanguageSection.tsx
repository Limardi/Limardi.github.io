'use client';

import React from 'react';
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
    <section id="languages" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-2xl font-serif text-white">Languages</h2>

        {loading ? (
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="p-5 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-medium text-white mb-3">{lang.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">{lang.level}</p>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">{lang.percentage}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguageSection;