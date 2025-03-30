import React from 'react';
import SectionHeader from './common/SectionHeader';

interface Organization {
  name: string;
  role: string;
  period: string;
  responsibilities: string[];
}

const OrganizationSection: React.FC = () => {
  const organizations: Organization[] = [
    {
      name: "EECS-GSA",
      role: "Member of Academic affair",
      period: "Mar 2024 - Present",
      responsibilities: [
        "Organizing 2 networking events for EECS international students in NTHU",
        "Active Support NTHU EECS international student community",
        "Actively supported students in the Electrical Engineering and Computer Science Global Studies",
        "Providing guidance on academic pathways and career prospects",
        "Organizing events and workshops aimed at enhancing student knowledge about the university, industry trends"
      ]
    },
    {
      name: "Indonesian Student Association in Hsinchu (PPI Hsinchu)",
      role: "Member of Academic and career affair",
      period: "Aug 2024 - Present",
      responsibilities: [
        "Organizing event and supporting Indonesian community in Hsinchu city",
        "Head of Division and Event for several events",
        "Member of Academic and Career division for Indonesian Student Association in H.H.H",
        "Academic Events for Indonesian students in Hsinchu City"
      ]
    },
    {
      name: "NTHU IBP Summer camp",
      role: "Teaching assistant Division",
      period: "June 2024 - July 2024",
      responsibilities: [
        "Create curriculum, prepare material and final project for Summer camp",
        "Teach basic C and arduino programming",
        "Assisted in teaching and mentoring international students in foundational C Programming",
        "Collaborated with a diverse team to design and conduct interactive workshops",
        "Fostering hands-on learning and encouraging problem-solving skills"
      ]
    }
  ];

  return (
    <section id="organizations" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Organizations" />
        
        <div className="space-y-6 sm:space-y-8">
          {organizations.map((org, index) => (
            <div key={index} className="glass-card p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="space-y-4 sm:space-y-6">
                {/* Header - stack on mobile */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-500">
                      {org.name}
                    </h3>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                      {org.role}
                    </p>
                  </div>
                  <span className="self-start px-3 sm:px-4 py-1 sm:py-1.5 bg-blue-50 dark:bg-blue-900/30 
                                 text-blue-600 dark:text-blue-400 
                                 rounded-full text-sm font-medium">
                    {org.period}
                  </span>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {org.responsibilities.map((responsibility, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationSection; 