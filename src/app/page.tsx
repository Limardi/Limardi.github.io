import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import LanguageSection from '@/components/LanguageSection';
import OrganizationSection from '@/components/OrganizationSection';

export default function Home() {
  return (
    <main>
      {/* Hero Section with cleaner layout */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-zinc-950 to-black">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        {/* Main Content Container */}
        <div className="w-full">
          {/* Tech Stack Scroll - Moved higher and made more subtle */}
          <div className="absolute top-0 w-full overflow-hidden py-4 select-none">
            <div className="flex animate-scroll-slow">
              <div className="flex shrink-0 items-center">
                {[
                  { text: 'HTML/CSS', icon: '🎨' },
                  { text: 'Git', icon: '📊' },
                  { text: 'JavaScript', icon: '💻' },
                  { text: 'C/C++', icon: '⚙️' },
                  { text: 'Unity', icon: '🎮' },
                  { text: 'React', icon: '⚛️' },
                  { text: 'Flutter', icon: '📱' },
                  { text: 'OpenCV', icon: '📷' },
                  { text: 'Arduino', icon: '🤖' },
                  { text: 'Verilog', icon: '⚡' }
                ].map((tech, index) => (
                  <div key={index} className="flex items-center px-8">
                    <span className="text-base font-medium text-zinc-600 whitespace-nowrap opacity-100 hover:opacity-100 transition-opacity">
                      {tech.icon} {tech.text}
                    </span>
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless scroll */}
              <div className="flex shrink-0 items-center">
                {[
                  { text: 'HTML/CSS', icon: '🎨' },
                  { text: 'Git', icon: '📊' },
                  { text: 'JavaScript', icon: '💻' },
                  { text: 'C/C++', icon: '⚙️' },
                  { text: 'Unity', icon: '🎮' },
                  { text: 'React', icon: '⚛️' },
                  { text: 'Flutter', icon: '📱' },
                  { text: 'OpenCV', icon: '📷' },
                  { text: 'Arduino', icon: '🤖' },
                  { text: 'Verilog', icon: '⚡' }
                ].map((tech, index) => (
                  <div key={`duplicate-${index}`} className="flex items-center px-8">
                    <span className="text-base font-medium text-zinc-600 whitespace-nowrap opacity-100 hover:opacity-100 transition-opacity">
                      {tech.icon} {tech.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center">
                {[
                  { text: 'HTML/CSS', icon: '🎨' },
                  { text: 'Git', icon: '📊' },
                  { text: 'JavaScript', icon: '💻' },
                  { text: 'C/C++', icon: '⚙️' },
                  { text: 'Unity', icon: '🎮' },
                  { text: 'React', icon: '⚛️' },
                  { text: 'Flutter', icon: '📱' },
                  { text: 'OpenCV', icon: '📷' },
                  { text: 'Arduino', icon: '🤖' },
                  { text: 'Verilog', icon: '⚡' }
                ].map((tech, index) => (
                  <div key={`duplicate-${index}`} className="flex items-center px-8">
                    <span className="text-base font-medium text-zinc-600 whitespace-nowrap opacity-100 hover:opacity-100 transition-opacity">
                      {tech.icon} {tech.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center">
                {[
                  { text: 'HTML/CSS', icon: '🎨' },
                  { text: 'Git', icon: '📊' },
                  { text: 'JavaScript', icon: '💻' },
                  { text: 'C/C++', icon: '⚙️' },
                  { text: 'Unity', icon: '🎮' },
                  { text: 'React', icon: '⚛️' },
                  { text: 'Flutter', icon: '📱' },
                  { text: 'OpenCV', icon: '📷' },
                  { text: 'Arduino', icon: '🤖' },
                  { text: 'Verilog', icon: '⚡' }
                ].map((tech, index) => (
                  <div key={`duplicate-${index}`} className="flex items-center px-8">
                    <span className="text-base font-medium text-zinc-600 whitespace-nowrap opacity-100 hover:opacity-100 transition-opacity">
                      {tech.icon} {tech.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Adjusted spacing */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
            <div className="flex flex-col items-center space-y-16">
              {/* Status Badge - Repositioned */}
              <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                  Available for Opportunities
                </span>
              </div>

              {/* Name and Title */}
              <div className="text-center space-y-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100">
                  Hi, I&apos;m{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Vincent
                  </span>
                </h1>
                <div className="space-y-2">
                  <p className="text-xl text-zinc-400 font-light">
                    Crafting innovative solutions at the intersection of
                  </p>
                  <p className="text-xl sm:text-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Electrical Engineering
                    </span>
                    {' '}and{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Computer Science Industry
                    </span>
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
                           hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center"
                >
                  Explore My Work
                  <span className="ml-2">→</span>
          </a>
          <a
                  href="https://github.com/Limardi" 
            target="_blank"
            rel="noopener noreferrer"
                  className="px-6 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl 
                           hover:bg-zinc-800/50 hover:border-blue-500/50 transition-all duration-300 
                           flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Areas of Expertise - Added more spacing */}
            <div className="mt-32 mb-16">
              <h2 className="text-2xl font-semibold text-center mb-4">Areas of Expertise</h2>
              <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
                Combining technical knowledge with practical experience to deliver innovative solutions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Expertise cards */}
                {[
                  {
                    title: 'Software Engineering',
                    description: 'Building robust and scalable applications',
                    icon: '💻'
                  },
                  {
                    title: 'Computer Vision',
                    description: 'Developing advanced visual recognition systems',
                    icon: '👁️'
                  },
                  {
                    title: 'Machine Learning',
                    description: 'Creating intelligent systems that learn',
                    icon: '🤖'
                  },
                  {
                    title: 'Full Stack',
                    description: 'End-to-end web development solutions',
                    icon: '🌐'
                  }
                ].map((item, index) => (
                  <div key={index} 
                       className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 
                                backdrop-blur-sm group hover:bg-zinc-800/50 transition-all duration-300
                                hover:border-blue-500/50">
                    <div className="space-y-4">
                      <div className="text-4xl">{item.icon}</div>
                      <h3 className="text-xl font-medium text-zinc-200">{item.title}</h3>
                      <p className="text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <ProjectsSection />
      </section>

      {/* Education Section */}
      <EducationSection />

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <ExperienceSection />
      </section>

      {/* Organization Section */}
      <section id="organizations" className="py-20">
        <OrganizationSection />
      </section>

      {/* Language Section */}
      <LanguageSection />

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <ContactSection />
      </section>
      </main>
  );
}