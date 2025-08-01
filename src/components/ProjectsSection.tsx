'use client';

import React from 'react';
import SectionHeader from './common/SectionHeader';
import Image from 'next/image';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{project.icon}</span>
                  <span className="text-sm font-medium text-zinc-400">{project.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
                <p className="text-zinc-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 