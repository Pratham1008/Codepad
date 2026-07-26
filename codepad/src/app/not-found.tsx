import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-on-surface p-4 text-center">
      <div className="w-18 h-18 rounded-full bg-primary-container flex items-center justify-center mb-6">
        <SearchX className="text-primary" size={32} />
      </div>
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-on-surface mb-2">Page Not Found</h2>
      <p className="text-on-surface-variant mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/problems"
          className="border-2 border-outline text-on-surface px-6 py-3 rounded-lg font-semibold hover:bg-surface-container transition-colors"
        >
          Browse Problems
        </Link>
      </div>
    </div>
  );
}
