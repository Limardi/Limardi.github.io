// Single source of truth for converting raw Supabase rows (snake_case) into the
// app's domain types (camelCase). Every query maps through these helpers so the
// shape conversion lives in exactly one place.

import type {
  PersonalInfoRow,
  ProjectRow,
  ExperienceRow,
  EducationRow,
  SkillRow,
  OrganizationRow,
  LanguageRow,
} from '@/lib/database.types';
import type {
  PersonalInfo,
  Project,
  Experience,
  Education,
  Skill,
  Organization,
  Language,
  Ranking,
} from '@/data/portfolio-data';

export function mapPersonalInfo(r: PersonalInfoRow): PersonalInfo {
  return {
    name: r.name,
    title: r.title,
    location: r.location,
    email: r.email,
    phone: r.phone,
    github: r.github,
    linkedin: r.linkedin ?? undefined,
    instagram: r.instagram ?? undefined,
    about: r.about,
    interests: r.interests ?? [],
  };
}

export function mapProject(r: ProjectRow): Project {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    description: r.description,
    detailedDescription: r.detailed_description,
    technologies: r.technologies ?? [],
    challenges: r.challenges ?? [],
    solutions: r.solutions ?? [],
    outcomes: r.outcomes ?? [],
    githubUrl: r.github_url ?? undefined,
    liveUrl: r.live_url ?? undefined,
    image: r.image ?? '',
    videoUrl: r.video_url ?? undefined,
    type: r.type,
  };
}

export function mapExperience(r: ExperienceRow): Experience {
  return {
    slug: r.slug,
    role: r.role,
    company: r.company,
    location: r.location ?? undefined,
    period: r.period,
    startDate: r.start_date ?? null,
    endDate: r.end_date ?? null,
    description: r.description,
    achievements: r.achievements ?? [],
    technologies: r.technologies ?? [],
    impact: r.impact ?? [],
  };
}

export function mapEducation(r: EducationRow): Education {
  return {
    institution: r.institution,
    degree: r.degree,
    period: r.period,
    gpa: r.gpa ?? null,
    tScore: r.t_score ?? null,
    rankings: (r.rankings as Ranking[] | null) ?? [],
    courses: r.courses ?? [],
    focus: r.focus ?? [],
  };
}

export function mapSkill(r: SkillRow): Skill {
  return {
    category: r.category,
    skills: r.skills ?? [],
    proficiency: r.proficiency,
  };
}

export function mapOrganization(r: OrganizationRow): Organization {
  return {
    slug: r.slug,
    name: r.name,
    role: r.role,
    period: r.period,
    startDate: r.start_date ?? null,
    endDate: r.end_date ?? null,
    responsibilities: r.responsibilities ?? [],
    impact: r.impact ?? [],
  };
}

export function mapLanguage(r: LanguageRow): Language {
  return {
    name: r.name,
    level: r.level,
    percentage: r.percentage,
    certification: r.certification ?? undefined,
  };
}
