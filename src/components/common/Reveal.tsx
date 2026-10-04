'use client';

import React, { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: string;
  // 'scroll' (default): animates in via IntersectionObserver once the element
  // scrolls into view. 'mount': plays once, right after mount, regardless of
  // scroll position -- for content that's often already in the initial
  // viewport (e.g. inside the hero), where a scroll-gated reveal may never
  // visibly trigger.
  trigger?: 'scroll' | 'mount';
  // true (default): animates in once and stops watching. false: keeps
  // watching and animates back out (and back in) every time the element
  // crosses the viewport edge -- an exit transition, not just an entrance.
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
  distance = 'translate-y-2',
  trigger = 'scroll',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    let rafId: number | undefined;
    if (trigger === 'mount') {
      rafId = requestAnimationFrame(() => setVisible(true));
    }

    const el = ref.current;
    let io: IntersectionObserver | undefined;

    if (el && (trigger === 'scroll' || !once)) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (trigger === 'mount') {
              // The initial reveal is handled by the rAF above; from here on
              // just track entering/leaving the viewport for the exit animation.
              setVisible(entry.isIntersecting);
            } else if (once) {
              if (entry.isIntersecting) {
                setVisible(true);
                io?.disconnect();
                break;
              }
            } else {
              setVisible(entry.isIntersecting);
            }
          }
        },
        { rootMargin: '-40px', threshold: 0.05 }
      );
      io.observe(el);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io?.disconnect();
    };
  }, [trigger, once]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out-strong ${
        visible ? 'opacity-100 translate-y-0' : `opacity-0 ${distance}`
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
