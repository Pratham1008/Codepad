"use client";

import { usePathname } from "next/navigation";

/**
 * Lightweight marketing background — pure CSS, no three.js, no motion.
 * Uses a subtle gradient glow + grid pattern overlay.
 */
export function GlobalBackground() {
  const pathname = usePathname();

  // Skip on heavy pages
  if (pathname?.startsWith("/editor") || pathname?.startsWith("/solve")) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* Static radial glow — GPU-friendly, no blur, no animation */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,122,204,0.08)_0%,_transparent_70%)]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,122,204,0.05)_0%,_transparent_70%)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-[0.04] dark:opacity-[0.08]" />
    </div>
  );
}
