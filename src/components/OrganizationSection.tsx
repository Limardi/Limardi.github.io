import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { Organization } from '@/data/portfolio-data';

interface OrganizationSectionProps {
  items: Organization[];
}

const OrganizationSection: React.FC<OrganizationSectionProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section id="organizations" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="03" title="Organizations" variant="serif" />

        <div className="space-y-4">
          {items.map((org, index) => (
            <Reveal key={org.slug} delay={index * 60}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">{org.name}</h3>
                    <p className="text-zinc-400">{org.role}</p>
                  </div>
                  <span className="text-sm text-zinc-500 whitespace-nowrap">{org.period}</span>
                </div>
                {org.responsibilities && org.responsibilities.length > 0 && (
                  <ul className="space-y-1.5">
                    {org.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="w-1 h-1 mt-1.5 rounded-full bg-zinc-500 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationSection;
