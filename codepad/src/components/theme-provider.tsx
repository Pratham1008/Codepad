"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

import { useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}


export function useThemeTransition() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = React.useCallback(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    root.classList.add("theme-transitioning");
    setTheme(nextTheme);

    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 300);
  }, [theme, systemTheme, setTheme]);

  // resolvedTheme is "dark" | "light" even when theme === "system" —
  // this is what Monaco needs to read, not the raw "system" string.
  return { theme, setTheme, toggleTheme, systemTheme, resolvedTheme };
}
