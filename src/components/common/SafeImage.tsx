'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type SafeImageProps = {
  src?: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  placeholderClassName?: string;
  iconClassName?: string;
};

const isValidImageSrc = (src?: string) => {
  if (!src) return false;
  const value = src.trim();
  return value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://');
};

export default function SafeImage({
  src,
  alt,
  fill = true,
  sizes,
  className,
  priority = false,
  placeholderClassName = 'absolute inset-0 flex items-center justify-center text-zinc-600',
  iconClassName = 'w-12 h-12',
}: SafeImageProps) {
  const normalizedSrc = useMemo(() => (src ? src.trim() : ''), [src]);
  const [failed, setFailed] = useState(false);

  if (!isValidImageSrc(normalizedSrc) || failed) {
    return (
      <div className={placeholderClassName}>
        <svg className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

