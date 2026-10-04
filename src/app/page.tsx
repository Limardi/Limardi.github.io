import ProfileHeader from '@/components/ProfileHeader';
import HighlightsSection from '@/components/HighlightsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import OrganizationSection from '@/components/OrganizationSection';
import ProjectsSection from '@/components/ProjectsSection';
import LanguageSection from '@/components/LanguageSection';
import ContactSection from '@/components/ContactSection';
import { portfolioData } from '@/data/portfolio-content';

export default function Home() {
  const data = portfolioData;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <ProfileHeader personal={data.personal} />
      <HighlightsSection projects={data.projects.filter((p) => p.featured)} />
      <ExperienceSection items={data.experience} />
      <EducationSection education={data.education} />
      <OrganizationSection items={data.organizations} />
      <ProjectsSection projects={data.projects} />
      <LanguageSection items={data.languages} />
      <ContactSection personal={data.personal} />
    </main>
  );
}
