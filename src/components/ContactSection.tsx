import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import type { PersonalInfo } from '@/data/portfolio-data';

interface ContactSectionProps {
  personal: PersonalInfo;
}

interface Social {
  label: string;
  href: string;
  external: boolean;
  download?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  const socials: Social[] = [
    { label: 'Download CV', href: '/Vincent-Limardi-Resume.pdf', external: false, download: true },
    personal.linkedin && { label: 'LinkedIn', href: personal.linkedin, external: true },
    personal.instagram && { label: 'Instagram', href: personal.instagram, external: true },
    personal.phone && {
      label: 'Phone',
      href: `tel:${personal.phone.replace(/\s+/g, '')}`,
      external: false,
    },
  ].filter(Boolean) as Social[];

  return (
    <section id="contact" className="py-20 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <SectionHeader title="Let's talk" variant="serif" />
        </Reveal>

        <Reveal delay={80} className="mt-6">
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
            Always open to new opportunities, collaborations, or just a good conversation.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-8">
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-2 font-serif text-xl sm:text-2xl text-white break-all"
          >
            <span className="relative">
              {personal.email}
              <span
                aria-hidden
                className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out-strong group-hover:scale-x-100"
              />
            </span>
            <span
              aria-hidden
              className="flex-shrink-0 text-zinc-400 transition-[transform,color] duration-300 ease-out-strong group-hover:text-white group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>

        {socials.length > 0 && (
          <Reveal delay={240} className="mt-3">
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
              {socials.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <span aria-hidden className="h-3 w-px bg-white/15" />}
                  <a
                    href={s.href}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                    download={s.download}
                    className="transition-colors duration-200 ease-out-strong hover:text-white"
                  >
                    {s.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
