import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
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