import { useReducedMotion as useMotionReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
} as const;

export const springs = {
  bouncy: { type: "spring", stiffness: 300, damping: 20 },
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  gentle: { type: "spring", stiffness: 120, damping: 14 },
} as const;

export const durations = {
  instant: 0.1,
  fast: 0.18,
  base: 0.3,
  slow: 0.5,
  epic: 0.8,
} as const;

export const staggers = {
  tight: 0.04,
  comfortable: 0.08,
} as const;

/**
 * Global hook to determine if animations should be reduced or disabled.
 * Uses motion/react's built in useReducedMotion hook, but ensures hydration
 * safety by defaulting to true (reduced) until mounted.
 */
export function useReducedMotion() {
  const prefersReduced = useMotionReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Default to true during SSR to prevent layout jumps if they prefer reduced motion.
  // Once mounted, respect their actual preference.
  if (!isMounted) return true;
  return prefersReduced;
}

/**
 * Utility to get a duration respecting reduced motion
 */
export function getDuration(duration: keyof typeof durations, reducedMotion: boolean | null) {
  return reducedMotion ? durations.instant : durations[duration];
}
