import Link from "next/link";
import { Suspense } from "react";
import { DashboardList } from "./DashboardList";
import { DashboardSkeleton } from "./DashboardSkeleton";

export default function DashboardPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="font-headline-md text-2xl font-bold text-on-surface">Snippets Dashboard</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage and view your saved code snippets.</p>
        </div>
        <Link
          href="/editor"
          className="bg-primary text-on-primary font-semibold py-2 px-4 rounded hover:bg-orange-600 transition-colors shadow"
        >
          New Snippet
        </Link>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
