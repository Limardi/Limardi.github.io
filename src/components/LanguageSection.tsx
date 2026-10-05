import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { Language } from '@/data/portfolio-data';

interface LanguageSectionProps {
  items: Language[];
}

const LanguageSection: React.FC<LanguageSectionProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section id="languages" className="py-16 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="05" title="Languages" variant="serif" />

        <div className="grid md:grid-cols-3 gap-4">
          {items.map((lang, index) => (
            <Reveal key={index} delay={index * 60} once={false} className="h-full">
              <div className="h-full p-5 bg-white/5 border border-white/10 rounded-xl transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20">
                <h3 className="text-lg font-medium text-white mb-1.5">{lang.name}</h3>
                <p className="text-sm text-zinc-400">{lang.level}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageSection;
