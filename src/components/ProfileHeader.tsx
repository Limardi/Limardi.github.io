'use client';

import React from 'react';

const ProfileHeader: React.FC = () => {
    return (
        <header className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-2xl" />
            </div>

            <div className="relative text-center space-y-8 animate-fade-in">
                {/* Badge */}
                <div className="flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border border-zinc-800 bg-zinc-900/60 text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Available for Opportunities
                    </span>
                </div>

                {/* Name */}
                <div className="space-y-4">
                    <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-zinc-100 leading-tight">
                        Hi, I&apos;m{' '}
                        <span className="gradient-text">Vincent</span>
                    </h1>

                    {/* Subtitle */}
                    <div className="space-y-1">
                        <p className="text-xl sm:text-2xl text-zinc-500">
                            Crafting innovative solutions at the intersection of
                        </p>
                        <p className="text-xl sm:text-2xl font-medium">
                            <span className="gradient-text">Real Life</span>
                            <span className="text-zinc-400"> and </span>
                            <span className="gradient-text">Technology</span>
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 pt-2">
                    <a
                        href="#experience"
                        className="px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
                    >
                        Explore My Work →
                    </a>
                    <a
                        href="https://github.com/Limardi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-lg font-medium text-sm text-zinc-200 border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-600 text-xs animate-bounce">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </header>
    );
};

export default ProfileHeader;
