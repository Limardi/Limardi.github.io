'use client';

import React from 'react';
import SectionHeader from './common/SectionHeader';
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
    <section id="organizations" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Organizations" />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {organizations.map((org, index) => (
              <div key={org.id ?? index} className="group relative flex flex-col bg-zinc-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] p-6 sm:p-10">
                <div className="space-y-6">
                  {/* Header Stack */}
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                        {org.name}
                      </h3>
                      <p className="text-lg font-medium text-zinc-300">
                        {org.role}
                      </p>
                    </div>

                    {/* Date Pill */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-zinc-200 tracking-wide uppercase">
                        {org.period}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities Checklist */}
                  <div className="pt-2 space-y-3">
                    {org.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-start gap-4 pl-2">
                        {/* Apple Check Icon representation */}
                        <svg className="w-5 h-5 mt-0.5 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                          {r}
                        </p>
                      </div>
                    ))}
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

export default OrganizationSection;