import React from 'react';
import SectionHeader from './common/SectionHeader';

const LanguageSection: React.FC = () => {
  const languages = [
    {
      name: "English",
      level: "IELTS - 6.5 (CEFR B2)",
      percentage: 85
    },
    {
      name: "Chinese",
      level: "TOCFL - B1",
      percentage: 70
    },
    {
      name: "Indonesian",
      level: "Native",
      percentage: 100
    }
  ];

  return (
    <section id="languages" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Language Proficiency" />
        
        <div className="grid md:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{lang.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">{lang.level}</span>
                    <span className="text-blue-500">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageSection; 