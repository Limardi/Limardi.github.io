import { supabase } from './supabase';
import type {
    Project,
    Experience,
    Education,
    Organization,
    Language,
} from '../data/portfolio-data';

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order');
    if (error) { console.error('getProjects:', error); return []; }
    return data.map((r) => ({
        id: r.slug,
        title: r.title,
        category: r.category,
        description: r.description,
        detailedDescription: r.detailed_description,
        technologies: r.technologies,
        challenges: r.challenges,
        solutions: r.solutions,
        outcomes: r.outcomes,
        githubUrl: r.github_url,
        liveUrl: r.live_url,
        image: r.image,
        type: r.type,
    }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('getProjectBySlug:', error);
        return null;
    }

    return {
        id: data.slug,
        title: data.title,
        category: data.category,
        description: data.description,
        detailedDescription: data.detailed_description,
        technologies: data.technologies,
        challenges: data.challenges,
        solutions: data.solutions,
        outcomes: data.outcomes,
        githubUrl: data.github_url,
        liveUrl: data.live_url,
        image: data.image,
        type: data.type,
    };
}

export async function getExperience(): Promise<Experience[]> {
    const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('sort_order');
    if (error) { console.error('getExperience:', error); return []; }
    return data.map((r) => ({
        id: r.slug,
        role: r.role,
        company: r.company,
        location: r.location,
        period: r.period,
        description: r.description,
        achievements: r.achievements,
        technologies: r.technologies,
        impact: r.impact,
    }));
}

export async function getEducation(): Promise<Education | null> {
    const { data, error } = await supabase
        .from('education')
        .select('*')
        .limit(1)
        .single();
    if (error) { console.error('getEducation:', error); return null; }
    return {
        institution: data.institution,
        degree: data.degree,
        period: data.period,
        gpa: data.gpa,
        tScore: data.t_score,
        rankings: data.rankings,
        courses: data.courses,
        focus: data.focus,
    };
}


export async function getOrganizations(): Promise<Organization[]> {
    const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('sort_order');
    if (error) { console.error('getOrganizations:', error); return []; }
    return data.map((r) => ({
        id: r.slug,
        name: r.name,
        role: r.role,
        period: r.period,
        responsibilities: r.responsibilities,
        impact: r.impact,
    }));
}

export async function getLanguages(): Promise<Language[]> {
    const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('sort_order');
    if (error) { console.error('getLanguages:', error); return []; }
    return data.map((r) => ({
        name: r.name,
        level: r.level,
        percentage: r.percentage,
        certification: r.certification,
    }));
}

