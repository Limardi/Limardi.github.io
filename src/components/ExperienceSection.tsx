import React from 'react';
import SectionHeader from './common/SectionHeader';

interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
}

const ExperienceSection: React.FC = () => {
  const experiences: Experience[] = [
    {
      role: "Software Engineer Intern",
      company: "iCode Indonesia",
      location: "Jakarta",
      period: "July 2023 - Sept 2023",
      description: "Create a real-life problem solution using Computer vision and Machine Learning",
      achievements: [
        "Learn OpenCV and YOLO/v8 to create an AI model",
        "Utilize version control (git, github) for professional software development"
      ]
    },
    {
      role: "Undergraduate Research Assistant",
      company: "CGV & VM Lab",
      period: "Oct 2024 - Present",
      description: "Work under 2 projects for professor Hung Kuo Chu and professor Shih Hsuan Hung",
      achievements: [
        "Dataset Visualization for Structure from motion Camera Input",
        "Improving Physical based realistic material generation Pipeline"
      ]
    },
    {
      role: "Teaching Assistant",
      company: "NTHU IBP Summer camp",
      period: "June 2024 - July 2024",
      description: "Summer camp teaching assistant",
      achievements: [
        "Create curriculum, prepare material and final project for Summer camp",
        "Teach basic C and arduino programming"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Experience" />
        
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-card hover:shadow-lg transition-all duration-300">
              <div className="p-6 sm:p-8 border-l-4 border-blue-500 rounded-r-xl">
                <div className="space-y-4 sm:space-y-6">
                  {/* Header - stack on mobile */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-500">
                        {exp.role}
                      </h3>
                      <div className="space-y-0.5">
                        <p className="text-lg text-zinc-700 dark:text-zinc-300">
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="text-sm text-zinc-500">
                            {exp.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="self-start px-3 sm:px-4 py-1 sm:py-1.5 bg-blue-50 dark:bg-blue-900/30 
                                   text-blue-600 dark:text-blue-400 
                                   rounded-full text-sm font-medium">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 