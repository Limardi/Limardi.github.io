'use client';

import React from 'react';
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
        <h2 className="text-2xl font-serif text-white">Organizations</h2>

        {loading ? (
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
        ) : (
          <div className="space-y-4">
            {organizations.map((org, index) => (
              <div key={org.id ?? index} className="p-6 bg-white/5 border border-white/10 rounded-xl">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationSection;