import { supabase } from './supabase';
import type {
    Project,
    Experience,
    Education,
    Organization,
    Language,
} from '../data/portfolio-data';

const MONTH_TO_INDEX: Record<string, number> = {
    jan: 1,
    january: 1,
    feb: 2,
    february: 2,
    mar: 3,
    march: 3,
    apr: 4,
    april: 4,
    may: 5,
    jun: 6,
    june: 6,
    jul: 7,
    july: 7,
    aug: 8,
    august: 8,
    sep: 9,
    sept: 9,
    september: 9,
    oct: 10,
    october: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12,
};

const parseMonthYearToken = (token: string): { year: number; month: number } | null => {
    const trimmed = token.trim().toLowerCase();
    if (!trimmed) return null;
    if (trimmed === 'present' || trimmed === 'current' || trimmed === 'now') {
        return { year: 9999, month: 12 };
    }

    // e.g. "Oct 2024", "July 2023", "2024"
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
        const year = Number(parts[0]);
        if (!Number.isNaN(year) && year > 1900 && year < 3000) {
            return { year, month: 12 };
        }
        return null;
    }

    const year = Number(parts[parts.length - 1]);
    if (Number.isNaN(year)) return null;

    const monthKey = parts.slice(0, -1).join(' ');
    const month = MONTH_TO_INDEX[monthKey] ?? MONTH_TO_INDEX[parts[0]];
    if (!month) return null;

    return { year, month };
};

const getExperienceSortValue = (period: string): number => {
    if (!period) return 0;
    const normalized = period.replace(/–/g, '-');
    const segments = normalized.split('-');
    const endToken = segments.length > 1 ? segments[segments.length - 1] : segments[0];
    const parsed = parseMonthYearToken(endToken);
    if (!parsed) return 0;
    return parsed.year * 100 + parsed.month;
};

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
    const mapped = data.map((r) => ({
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
    return mapped.sort((a, b) => {
        const delta = getExperienceSortValue(b.period) - getExperienceSortValue(a.period);
        if (delta !== 0) return delta;
        // deterministic fallback when periods can't be parsed or are equal
        return a.role.localeCompare(b.role);
    });
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

