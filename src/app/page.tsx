import ProfileHeader from '@/components/ProfileHeader';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import OrganizationSection from '@/components/OrganizationSection';
import ProjectsSection from '@/components/ProjectsSection';
import LanguageSection from '@/components/LanguageSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <ProfileHeader />
            <ExperienceSection />
            <EducationSection />
            <OrganizationSection />
            <ProjectsSection />
            <LanguageSection />
            <ContactSection />
        </main>
    );
}
