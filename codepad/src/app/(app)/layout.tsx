import { AppNavigation } from "./AppNavigation";
import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-background overflow-hidden font-body-md text-on-surface">
      <Suspense fallback={<div className="hidden md:flex h-full w-[260px] bg-surface-container border-r border-outline-variant z-20 shrink-0"></div>}>
        <AppNavigation />
      </Suspense>
      <main className="flex-1 flex flex-col overflow-hidden relative z-0">
        <div className="absolute inset-0 bg-surface-container-lowest -z-10"></div>
        {children}
      </main>
    </div>
  );
}
