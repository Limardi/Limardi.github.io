// App-facing domain types. These are the camelCase shapes the UI consumes;
// raw snake_case database rows are mapped into these in src/lib/mappers.ts.
// `PortfolioData` is the single aggregate returned by getPortfolio() and is the
// intended seam for any future AI/RAG feature over the portfolio.

export interface PortfolioData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education | null;
  projects: Project[];
  organizations: Organization[];
  languages: Language[];
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  videoUrl?: string;
  type: string;
  // Only set for published papers/posters.
  authors?: string[];
  resultsFigure?: { src: string; caption: string };
}

export interface Experience {
  slug: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  // ISO dates (YYYY-MM-DD) when available; endDate null === "Present". Used for
  // reliable reverse-chronological ordering. Optional so the UI works before the
  // structured-dates migration is applied.
  startDate?: string | null;
  endDate?: string | null;
  description: string;
  achievements: string[];
  technologies: string[];
  impact: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: number | null;
  tScore: number | null;
  rankings: Ranking[];
  courses: string[];
  focus: string[];
}

export interface Ranking {
  region: string;
  rank: string;
  icon: string;
}

export interface Skill {
  category: string;
  skills: string[];
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Organization {
  slug: string;
  name: string;
  role: string;
  period: string;
  startDate?: string | null;
  endDate?: string | null;
  responsibilities: string[];
  impact: string[];
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
  certification?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin?: string;
  instagram?: string;
  about: string;
  interests: string[];
}
