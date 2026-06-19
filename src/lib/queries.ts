import { cache } from 'react';
import { supabase } from '@/lib/supabase/client';
import { periodRange, PRESENT } from '@/lib/period';
import {
  mapPersonalInfo,
  mapProject,
  mapExperience,
  mapEducation,
  mapSkill,
  mapOrganization,
  mapLanguage,
} from '@/lib/mappers';
import type {
  PortfolioData,
  PersonalInfo,
  Project,
  Experience,
  Education,
  Skill,
  Organization,
  Language,
} from '@/data/portfolio-data';

// ---------------------------------------------------------------------------
// Reliability: every query throws on a Supabase error instead of silently
// returning empty data. Combined with ISR (revalidate on the pages), a failed
// revalidation keeps serving the last good static render, and a failed build
// fails loudly rather than shipping a blank CV.
// ---------------------------------------------------------------------------
function fail(where: string, message: string): never {
  throw new Error(`[queries] ${where}: ${message}`);
}

// Reverse-chronological ordering. Prefers structured start_date / end_date when
// present (end_date null === ongoing), and falls back to parsing the free-text
// `period` label when an entry has no structured dates yet (before migration
// 0002 is applied). This keeps ordering correct in both states.
type DatedEntry = { period: string; startDate?: string | null; endDate?: string | null };

function rankOf(i: DatedEntry): { start: number; end: number } {
  if (i.startDate) {
    return {
      start: Date.parse(i.startDate),
      end: i.endDate ? Date.parse(i.endDate) : PRESENT,
    };
  }
  return periodRange(i.period);
}

function byRecencyDesc<T extends DatedEntry>(a: T, b: T): number {
  const ra = rankOf(a);
  const rb = rankOf(b);
  if (rb.end !== ra.end) return rb.end - ra.end;
  return rb.start - ra.start;
}

export const getPersonalInfo = cache(async (): Promise<PersonalInfo> => {
  const { data, error } = await supabase.from('personal_info').select('*').limit(1).single();
  if (error) fail('getPersonalInfo', error.message);
  return mapPersonalInfo(data);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await supabase.from('projects').select('*').order('sort_order');
  if (error) fail('getProjects', error.message);
  return data.map(mapProject);
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
  if (error) fail('getProjectBySlug', error.message);
  return data ? mapProject(data) : null;
});

export const getExperience = cache(async (): Promise<Experience[]> => {
  const { data, error } = await supabase.from('experience').select('*').order('sort_order');
  if (error) fail('getExperience', error.message);
  return data.map(mapExperience).sort(byRecencyDesc);
});

export const getEducation = cache(async (): Promise<Education | null> => {
  const { data, error } = await supabase.from('education').select('*').limit(1).maybeSingle();
  if (error) fail('getEducation', error.message);
  return data ? mapEducation(data) : null;
});

export const getSkills = cache(async (): Promise<Skill[]> => {
  const { data, error } = await supabase.from('skills').select('*').order('sort_order');
  if (error) fail('getSkills', error.message);
  return data.map(mapSkill);
});

export const getOrganizations = cache(async (): Promise<Organization[]> => {
  const { data, error } = await supabase.from('organizations').select('*').order('sort_order');
  if (error) fail('getOrganizations', error.message);
  return data.map(mapOrganization).sort(byRecencyDesc);
});

export const getLanguages = cache(async (): Promise<Language[]> => {
  const { data, error } = await supabase.from('languages').select('*').order('sort_order');
  if (error) fail('getLanguages', error.message);
  return data.map(mapLanguage);
});

// Single aggregate accessor: one parallel fetch for the whole homepage, and the
// stable seam a future AI/RAG feature can consume.
export const getPortfolio = cache(async (): Promise<PortfolioData> => {
  const [personal, experience, education, projects, organizations, languages, skills] =
    await Promise.all([
      getPersonalInfo(),
      getExperience(),
      getEducation(),
      getProjects(),
      getOrganizations(),
      getLanguages(),
      getSkills(),
    ]);
  return { personal, experience, education, projects, organizations, languages, skills };
});
