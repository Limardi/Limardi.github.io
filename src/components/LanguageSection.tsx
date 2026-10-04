'use client';

import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { Language } from '@/data/portfolio-data';

function LanguageBar({ percentage }: { percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-white rounded-full transition-[width] duration-1000 ease-out-strong"
        style={{ width: active ? `${percentage}%` : '0%' }}
      />
    </div>
  );
}

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
                <h3 className="text-lg font-medium text-white mb-3">{lang.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">{lang.level}</p>
                <LanguageBar percentage={lang.percentage} />
                <p className="text-xs text-zinc-500 mt-2">{lang.percentage}%</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageSection;
