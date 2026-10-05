import React from 'react';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  variant?: 'sans' | 'serif';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  eyebrow,
  variant = 'sans',
}) => {
  if (variant === 'serif') {
    return (
      <div className="space-y-3 text-center sm:text-left">
        {eyebrow && (
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-white">{title}</h2>
      </div>
    );
  }

  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
          {title}
        </h2>
        <div className="h-px flex-1 bg-zinc-800/80" />
      </div>
    </div>
  );
};

export default SectionHeader;
