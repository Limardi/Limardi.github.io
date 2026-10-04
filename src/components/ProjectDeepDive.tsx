'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';

interface DeepDiveSection {
  title: string;
  items: string[];
  dotClassName: string;
}

interface ProjectDeepDiveProps {
  sections: DeepDiveSection[];
}

// Desktop: every section stacked and always expanded (unchanged from before).
// Mobile: a one-open-at-a-time accordion -- title always visible, body collapses --
// so a visitor isn't forced to scroll past 3 full-length glass cards to reach the
// floating action bar / end of the page.
export default function ProjectDeepDive({ sections }: ProjectDeepDiveProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (sections.length === 0) return null;

  return (
    <div className="space-y-4 sm:space-y-12">
      {sections.map((section, i) => {
        const open = openIndex === i;
        return (
          <div
            key={section.title}
            className="bg-zinc-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 shadow-inner overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="sm:hidden w-full flex items-center justify-between gap-4 p-6 text-left"
            >
              <span className="text-lg font-semibold text-white">{section.title}</span>
              <svg
                className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 ease-out-strong ${
                  open ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${open ? 'block' : 'hidden'} sm:block p-8 pt-0 sm:pt-8 md:p-12`}>
              <div className="hidden sm:block">
                <SectionHeader title={section.title} />
              </div>
              <ul className="space-y-4 sm:mt-8">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className={`w-1.5 h-1.5 mt-2.5 rounded-full flex-shrink-0 ${section.dotClassName}`} />
                    <span className="text-zinc-300 text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
