import { getProjectBySlug, getProjects } from '@/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/common/SectionHeader';
import PBRProjectSection from '@/components/PBRProjectSection';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-24 pb-32 px-4 relative">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Back Link */}
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/40 hover:bg-zinc-800/80 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-full text-zinc-400 hover:text-zinc-100 transition-all duration-300 w-auto"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold text-sm">Back to Projects</span>
                </Link>

                {/* Hero Header */}
                <div className="space-y-6 text-center">
                    <div className="flex justify-center">
                        <span className="px-5 py-2 text-sm font-bold tracking-widest uppercase bg-white/5 backdrop-blur-md text-zinc-300 border border-white/10 rounded-full shadow-inner">
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Hero Media */}
                {project.title.toLowerCase().includes('pbr') || project.title.toLowerCase().includes('texture') ? (
                    <PBRProjectSection />
                ) : (
                    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    </div>
                )}

                {/* Overview & Tech Stack */}
                <div className="grid md:grid-cols-3 gap-12 pt-8">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-8 h-px bg-white/20" />
                            Overview
                        </h2>
                        <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {project.detailedDescription}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-8 h-px bg-white/20" />
                            Technologies
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 shadow-inner"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Deep Dive Cards */}
                <div className="space-y-12">
                    {project.challenges && project.challenges.length > 0 && (
                        <div className="bg-zinc-900/30 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner">
                            <SectionHeader title="The Challenges" />
                            <ul className="mt-8 space-y-4">
                                {project.challenges.map((c, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-red-400/50 flex-shrink-0" />
                                        <span className="text-zinc-300 text-lg leading-relaxed">{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.solutions && project.solutions.length > 0 && (
                        <div className="bg-zinc-900/30 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner">
                            <SectionHeader title="The Solutions" />
                            <ul className="mt-8 space-y-4">
                                {project.solutions.map((s, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-blue-400/50 flex-shrink-0" />
                                        <span className="text-zinc-300 text-lg leading-relaxed">{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.outcomes && project.outcomes.length > 0 && (
                        <div className="bg-zinc-900/30 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner">
                            <SectionHeader title="Key Outcomes" />
                            <ul className="mt-8 space-y-4">
                                {project.outcomes.map((o, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-emerald-400/50 flex-shrink-0" />
                                        <span className="text-zinc-300 text-lg leading-relaxed">{o}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Bar */}
            {(project.githubUrl || project.liveUrl) && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="flex items-center gap-4 px-6 py-4 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-full transition-colors flex items-center gap-2"
                            >
                                View Live Site
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}

                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 bg-transparent hover:bg-white/10 text-white font-bold rounded-full transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub Repo
                            </a>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
