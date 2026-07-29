"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useReducedMotion, easings, getDuration } from "@/lib/motion-tokens";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  // Next.js App Router requires unique keys for exit animations.
  // The layout doesn't remount, so this component handles the AnimatePresence.
  
  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: getDuration("base", reducedMotion),
          ease: easings.easeOutExpo,
        }}
        className="flex flex-col flex-1 h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
