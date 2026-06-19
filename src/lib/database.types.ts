// Types describing the Supabase Postgres schema (see supabase/schema.sql and
// supabase/migrations/). Kept in sync with the database by hand; if you adopt
// the Supabase CLI, this file can be regenerated with:
//   npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts
//
// `start_date` / `end_date` on experience & organizations are added by
// migration 0002_structured_dates.sql. They are typed here as nullable so the
// app compiles whether or not that migration has been applied yet.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      personal_info: {
        Row: {
          id: string;
          name: string;
          title: string;
          location: string;
          email: string;
          phone: string;
          github: string;
          linkedin: string | null;
          instagram: string | null;
          about: string;
          interests: string[];
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          title: string;
          location: string;
          email: string;
          phone: string;
          github: string;
          linkedin?: string | null;
          instagram?: string | null;
          about: string;
          interests?: string[];
          updated_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['personal_info']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          description: string;
          detailed_description: string;
          technologies: string[];
          challenges: string[];
          solutions: string[];
          outcomes: string[];
          github_url: string | null;
          live_url: string | null;
          image: string | null;
          video_url: string | null;
          type: string;
          sort_order: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          description: string;
          detailed_description: string;
          technologies?: string[];
          challenges?: string[];
          solutions?: string[];
          outcomes?: string[];
          github_url?: string | null;
          live_url?: string | null;
          image?: string | null;
          video_url?: string | null;
          type: string;
          sort_order?: number;
          created_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      experience: {
        Row: {
          id: string;
          slug: string;
          role: string;
          company: string;
          location: string | null;
          period: string;
          description: string;
          achievements: string[];
          technologies: string[];
          impact: string[];
          start_date: string | null;
          end_date: string | null;
          sort_order: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          role: string;
          company: string;
          location?: string | null;
          period: string;
          description: string;
          achievements?: string[];
          technologies?: string[];
          impact?: string[];
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          created_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['experience']['Insert']>;
      };
      education: {
        Row: {
          id: string;
          institution: string;
          degree: string;
          period: string;
          gpa: number | null;
          t_score: number | null;
          rankings: Json;
          courses: string[];
          focus: string[];
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          institution: string;
          degree: string;
          period: string;
          gpa?: number | null;
          t_score?: number | null;
          rankings?: Json;
          courses?: string[];
          focus?: string[];
          updated_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['education']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          category: string;
          skills: string[];
          proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
          sort_order: number;
        };
        Insert: {
          id?: string;
          category: string;
          skills?: string[];
          proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
          sort_order?: number;
        };
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      organizations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          role: string;
          period: string;
          responsibilities: string[];
          impact: string[];
          start_date: string | null;
          end_date: string | null;
          sort_order: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          role: string;
          period: string;
          responsibilities?: string[];
          impact?: string[];
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          created_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['organizations']['Insert']>;
      };
      languages: {
        Row: {
          id: string;
          name: string;
          level: string;
          percentage: number;
          certification: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          level: string;
          percentage: number;
          certification?: string | null;
          sort_order?: number;
        };
        Update: Partial<Database['public']['Tables']['languages']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience row aliases used across the data layer.
type Tables = Database['public']['Tables'];
export type PersonalInfoRow = Tables['personal_info']['Row'];
export type ProjectRow = Tables['projects']['Row'];
export type ExperienceRow = Tables['experience']['Row'];
export type EducationRow = Tables['education']['Row'];
export type SkillRow = Tables['skills']['Row'];
export type OrganizationRow = Tables['organizations']['Row'];
export type LanguageRow = Tables['languages']['Row'];
