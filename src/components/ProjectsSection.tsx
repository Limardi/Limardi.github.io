'use client';

import React from 'react';
import SectionHeader from './common/SectionHeader';
// import Image from 'next/image';

interface Project {
  title: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
  type: string;
  image: string;
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
      type: "Self Project",
      image: "/images/insta-clone.jpg"
    },
    {
      title: "Mini-chess AI",
      category: "Machine Learning",
      description: "Decision tree model to predict optimal chess moves, implementing machine learning algorithms. Focused on improving basic Machine Learning concepts and building ML models using C++.",
      icon: "🤖",
      tags: ["C++", "Machine Learning", "AI Algorithms"],
      type: "AI Project",
      image: "/images/mini-chess-ai.jpg"
    },
    {
      title: "Course-In",
      category: "Mobile Development",
      description: "Academic system information app for NTHU, featuring comprehensive API integration and database management. Developed using Flutter to create a seamless mobile experience.",
      icon: "📚",
      tags: ["Flutter", "API Integration", "Database"],
      type: "Mobile App",
      image: "/images/course-in.jpg"
    },
    {
      title: "Kitchen Learning",
      category: "Game Development",
      description: "Machine Learning project focused on creating AI agents for modern video games using Unity and reinforcement learning. Implemented ML-Agents to create AI agents with reinforcement learning (PPO) algorithm.",
      icon: "🎮",
      tags: ["Unity", "ML-Agents", "Reinforcement Learning"],
      type: "Game Dev",
      image: "/images/kitchen-learning.jpg"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="section-container">
        <SectionHeader title="Projects" />
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Project Display */}
          <div className="flex justify-center items-center min-h-[600px]">
            <div className="w-full max-w-4xl flex gap-8">
              {/* Left Project Card */}
              <div className="w-1/2 glass-card rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                  <div className="text-6xl">
                    {projects[currentProject].icon}
                  </div>
                  <div className="absolute bottom-4 left-4 text-sm font-medium text-zinc-300">
                    {projects[currentProject].category}
                  </div>
                </div>
              </div>
              
              {/* Right Project Details */}
              <div className="w-1/2 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                    {projects[currentProject].type}
                  </span>
                  <h3 className="text-3xl font-bold text-zinc-100">
                    {projects[currentProject].title}
                  </h3>
                </div>
                
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {projects[currentProject].description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {projects[currentProject].tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-600 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-600 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentProject 
                    ? 'bg-blue-500' 
                    : 'bg-zinc-600 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 