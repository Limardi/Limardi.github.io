export interface PortfolioData {
  projects: Project[];
  experience: Experience[];
  education: Education;
  skills: Skill[];
  organizations: Organization[];
  languages: Language[];
  personal: PersonalInfo;
}

export interface Project {
  id: string;
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
  type: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  impact: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: number;
  tScore: number;
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
  id: string;
  name: string;
  role: string;
  period: string;
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
  about: string;
  interests: string[];
}