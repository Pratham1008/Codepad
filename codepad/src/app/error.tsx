"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-background text-on-surface p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 text-error">Something went wrong!</h2>
      <p className="mb-4 text-on-surface-variant max-w-2xl font-mono text-sm break-words whitespace-pre-wrap text-left p-4 bg-surface-container rounded border border-error/50">
        {error.message || error.toString()}
        {"\n\n"}
        {error.stack}
      </p>
      <button
        className="bg-primary text-on-primary px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
