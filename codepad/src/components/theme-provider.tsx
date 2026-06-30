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

import { flushSync } from "react-dom";

export function useThemeTransition() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  const toggleTheme = React.useCallback(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    
    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  }, [theme, systemTheme, setTheme]);

  return { theme, setTheme, toggleTheme, systemTheme };
}
