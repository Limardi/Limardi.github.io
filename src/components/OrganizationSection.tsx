'use client';

import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import { SkeletonCard } from '@/components/common/Skeleton';
import { getOrganizations } from '@/lib/queries';
import type { Organization } from '@/data/portfolio-data';

const OrganizationSection: React.FC = () => {
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getOrganizations().then((data) => {
      setOrganizations(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="organizations" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionHeader eyebrow="03" title="Organizations" variant="serif" />

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="space-y-4">
            {organizations.map((org, index) => (
              <Reveal key={org.id ?? index} delay={index * 60}>
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
        )}
      </div>
    </section>
  );
};

export default OrganizationSection;
