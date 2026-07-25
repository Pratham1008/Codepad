import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] bg-background overflow-hidden font-body-md text-on-surface">
      <main className="flex-1 flex flex-col overflow-hidden relative z-0">
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
