"use client";

import { AlertCircle } from "lucide-react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-[#8b95a5] max-w-md mb-6">
          We couldn&apos;t load the blog posts. This might be a temporary issue.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-[var(--pw-blue)] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-opacity-90 transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
