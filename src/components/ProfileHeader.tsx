import React from 'react';
import HighlightsCarousel from './HighlightsCarousel';
import type { PersonalInfo, Project } from '@/data/portfolio-data';

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function LogoMark() {
  return (
    <svg viewBox="5 10 155 105" role="img" aria-label="Vincent Limardi" className="h-6 w-auto text-white">
      <path
        d="M21 24 L62 100 C78.5 76.5 91.5 47.5 103 24 V100 H145"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ProfileHeaderProps {
  personal: PersonalInfo;
  featuredProjects: Project[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ personal, featuredProjects }) => {
  return (
    <header className="relative min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <a href="#" className="flex-shrink-0" aria-label="Back to top">
          <LogoMark />
        </a>
        <div className="hidden sm:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-shrink-0 text-sm text-zinc-400 hover:text-white transition-colors duration-200 ease-out-strong"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] max-w-[90vw] rounded-full bg-amber-400/10 blur-[140px]"
        />

        <div className="relative text-center max-w-3xl space-y-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </p>
          <h1 className="text-5xl sm:text-7xl font-serif font-medium text-white leading-tight text-balance">
            I&apos;m {personal.name}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed text-balance">
            Building solutions at the intersection of technology and real-world impact.
          </p>
        </div>

        {/* Mobile: Highlighted comes before the CTAs (content before buttons). Desktop keeps
            the original headline -> CTAs -> Highlighted order via sm:order-none. */}
        {featuredProjects.length > 0 && (
          <div className="order-1 sm:order-none relative w-full max-w-[60rem] text-center pt-8 sm:pt-10">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Highlighted</p>
            <HighlightsCarousel projects={featuredProjects} />
          </div>
        )}

        <div className="order-2 sm:order-none relative flex flex-wrap items-center justify-center gap-4 pt-8 max-w-3xl">
          <a
            href="#projects"
            className="whitespace-nowrap px-6 py-3 text-sm font-medium text-zinc-950 bg-white rounded-lg transition-[transform,background-color] duration-200 ease-out-strong hover:bg-zinc-200 active:scale-[0.97]"
          >
            View Projects
          </a>
          <a
            href="/Vincent-Limardi-Resume.pdf"
            download
            className="whitespace-nowrap px-6 py-3 text-sm font-medium text-white border border-white/20 rounded-lg transition-[transform,background-color,border-color] duration-200 ease-out-strong hover:bg-white/10 hover:border-white/30 active:scale-[0.97]"
          >
            Download CV
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3 text-sm font-medium text-white border border-white/20 rounded-lg transition-[transform,background-color,border-color] duration-200 ease-out-strong hover:bg-white/10 hover:border-white/30 active:scale-[0.97]"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs">
        <span>Scroll to explore</span>
        <span
          aria-hidden
          className="w-px h-6 bg-gradient-to-b from-zinc-500 to-transparent animate-[scroll-hint_1.8s_ease-in-out_infinite]"
        />
      </div>
    </header>
  );
};

export default ProfileHeader;
