'use client';

import React from 'react';

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const ProfileHeader: React.FC = () => {
  return (
    <header className="relative min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <span className="font-serif text-lg font-medium text-white">VL</span>
        <div className="flex items-center gap-6">
          {navItems.slice(0, 3).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center max-w-2xl space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
              Available for opportunities
            </p>
            <h1 className="text-5xl sm:text-7xl font-serif font-medium text-white leading-tight">
              I&apos;m Vincent Limardi
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Building solutions at the intersection of technology and real-world impact.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-colors"
            >
              View Projects
            </a>
            <a
              href="https://github.com/Limardi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 text-xs">
        <span>Scroll to explore</span>
      </div>
    </header>
  );
};

export default ProfileHeader;