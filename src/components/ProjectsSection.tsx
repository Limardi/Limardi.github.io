'use client';

import React from 'react';
import SectionHeader from './common/SectionHeader';

interface Project {
  title: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
  type: string;
}

const ProjectsSection: React.FC = () => {
  const [currentProject, setCurrentProject] = React.useState(0);

  const projects: Project[] = [
    {
      title: "Insta-Clone",
      category: "Web Development",
      description: "Instagram clone web app built from scratch, featuring full-stack development with React. Implemented seamless UI design with Tailwind CSS and created responsive web applications, establishing a solid foundation in dynamic web development.",
      icon: "📱",
      tags: ["React", "Tailwind CSS", "Full Stack"],
      type: "Self Project"
    },
    {
      title: "Mini-chess AI",
      category: "Machine Learning",
      description: "Decision tree model to predict optimal chess moves, implementing machine learning algorithms. Focused on improving basic Machine Learning concepts and building ML models using C++.",
      icon: "🤖",
      tags: ["C++", "Machine Learning", "AI Algorithms"],
      type: "AI Project"
    },
    {
      title: "Course-In",
      category: "Mobile Development",
      description: "Academic system information app for NTHU, featuring comprehensive API integration and database management. Developed using Flutter to create a seamless mobile experience.",
      icon: "📚",
      tags: ["Flutter", "API Integration", "Database"],
      type: "Mobile App"
    },
    {
      title: "Kitchen Learning",
      category: "Game Development",
      description: "Machine Learning project focused on creating AI agents for modern video games using Unity and reinforcement learning. Implemented ML-Agents to create AI agents with reinforcement learning (PPO) algorithm.",
      icon: "🎮",
      tags: ["Unity", "ML-Agents", "Reinforcement Learning"],
      type: "Game Dev"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Projects" />
        
        {/* Project Carousel */}
        <div className="relative px-4 sm:px-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 sm:-translate-x-12 p-3 rounded-full bg-white/10 text-zinc-600 hover:text-blue-500 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 rounded-full bg-white/10 text-zinc-600 hover:text-blue-500 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Project Card */}
          <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Project Preview */}
              <div className="relative h-48 sm:h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className="text-6xl animate-float">{projects[currentProject].icon}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {projects[currentProject].category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-sm rounded-full border border-blue-500/20">
                      {projects[currentProject].type}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold group-hover:text-blue-500 transition-colors">
                    {projects[currentProject].title}
                  </h3>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {projects[currentProject].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[currentProject].tags.map((tech) => (
                    <span key={tech} 
                          className="px-3 py-1 rounded-full text-sm 
                                   bg-gradient-to-r from-blue-500/10 to-purple-500/10
                                   border border-blue-500/20 dark:border-purple-500/20
                                   text-blue-600 dark:text-blue-400
                                   hover:border-blue-500/40 dark:hover:border-purple-500/40 
                                   transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Navigation Dots */}
                <div className="flex justify-center gap-2 pt-4">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProject(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentProject === index 
                          ? 'bg-blue-500 w-4' 
                          : 'bg-zinc-300 dark:bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 