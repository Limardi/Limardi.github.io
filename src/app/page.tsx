import ProfileHeader from '@/components/ProfileHeader';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import OrganizationSection from '@/components/OrganizationSection';
import ProjectsSection from '@/components/ProjectsSection';
import LanguageSection from '@/components/LanguageSection';
import ContactSection from '@/components/ContactSection';
import { getPortfolio } from '@/lib/queries';

// Incremental Static Regeneration: render content into the HTML and revalidate
// hourly. A failed revalidation keeps serving the last good render.
export const revalidate = 3600;

export default async function Home() {
  const data = await getPortfolio();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <ProfileHeader personal={data.personal} />
      <ExperienceSection items={data.experience} />
      <EducationSection education={data.education} />
      <OrganizationSection items={data.organizations} />
      <ProjectsSection projects={data.projects} />
      <LanguageSection items={data.languages} />
      <ContactSection personal={data.personal} />
    </main>
  );
}
