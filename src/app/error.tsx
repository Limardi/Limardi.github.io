'use client';

import { useEffect } from 'react';

// Generic runtime error boundary.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-serif text-white">Something went wrong</h1>
        <p className="text-zinc-400 leading-relaxed">
          This page couldn&apos;t load its content right now. Please try again in a moment.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 text-sm font-medium text-zinc-950 bg-white rounded-lg transition-[transform,background-color] duration-200 ease-out-strong hover:bg-zinc-200 active:scale-[0.97]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
