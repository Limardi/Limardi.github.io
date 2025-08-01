import React from 'react';
import SectionHeader from './common/SectionHeader';
import Image from 'next/image';

const EducationSection: React.FC = () => {
  const rankings = [
    { region: 'Taiwan', rank: '#2', icon: '🇹🇼' },
    { region: 'Asia', rank: '#81', icon: '🌏' },
    { region: 'World', rank: '#267', icon: '🌍' }
  ];

  const courses = [
    'Data Structures',
    'Algorithms',
    'Computer Architecture',
    'Digital Design',
    'Programming Languages',
    'Operating Systems',
    'Database Systems',
    'Computer Networks'
  ];

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Education" />
        
        <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/90 border border-zinc-800/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              {/* Logo and Name */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/95 p-2 shadow-xl">
                  <Image 
                    src="/images/nthu.png"
                    alt="NTHU Logo"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-zinc-50 mb-2">
                    National Tsing Hua University
                  </h3>
                  <p className="text-lg text-zinc-400 font-medium">國立清華大學, Taiwan</p>
                </div>
              </div>

              {/* Degree Info */}
              <div className="space-y-6 mb-10">
                <div className="space-y-3">
                  <h4 className="text-2xl text-blue-400 font-bold">
                    B.S. in Electrical Engineering and Computer Science
                  </h4>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    Undergraduate student focusing on software development, 
                    computer systems, and electrical engineering fundamentals
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>September 2022 - Present</span>
                </div>
              </div>

              {/* Rankings */}
              <div className="grid grid-cols-3 gap-4">
                {rankings.map((item, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/10 text-center hover:bg-blue-500/20 transition-colors"
                  >
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-zinc-400 text-sm mb-2">{item.region} Rank</p>
                    <p className="text-3xl font-bold text-blue-400">{item.rank}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Stats */}
            <div className="lg:w-80 space-y-6 bg-zinc-800/30 p-8 rounded-2xl border border-zinc-700/30">
              <h4 className="text-xl font-semibold text-zinc-200">Academic Performance</h4>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">GPA</span>
                    <span className="text-2xl font-bold text-blue-400">3.5</span>
                  </div>
                  <div className="h-2 bg-blue-500/10 rounded-full">
                    <div className="h-full w-[87.5%] bg-blue-500 rounded-full"/>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">T-Score</span>
                    <span className="text-2xl font-bold text-blue-400">50.0</span>
                  </div>
                  <div className="h-2 bg-blue-500/10 rounded-full">
                    <div className="h-full w-[83.3%] bg-blue-500 rounded-full"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Relevant Coursework */}
          <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 lg:pt-10 border-t border-zinc-800">
            <h4 className="text-lg sm:text-xl font-semibold text-zinc-200 mb-4 sm:mb-6">Relevant Coursework</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {courses.map((course, index) => (
                <span 
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 