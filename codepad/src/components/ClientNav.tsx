"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeTransition } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function ClientNav({ initialIsLoggedIn }: { initialIsLoggedIn: boolean }) {
  const { theme, toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/30 flex justify-between items-center px-lg h-16 mx-auto">
      <div className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed">CodePad</div>
      
      <div className="hidden md:flex gap-md">
        <Link className="font-title-md text-title-md text-primary dark:text-primary-fixed border-b-2 border-primary pb-1 hover:bg-on-surface/[0.08] transition-colors duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" href="#features">Product</Link>
        <Link className="font-title-md text-title-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-on-surface/[0.08] transition-colors duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" href="/problems">Problems</Link>
        <a className="font-title-md text-title-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-on-surface/[0.08] transition-colors duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" href="#">Docs</a>
        <a className="font-title-md text-title-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-on-surface/[0.08] transition-colors duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" href="#">Pricing</a>
      </div>

      <div className="flex items-center gap-md">
        {isLoggedIn ? (
          <>
            <Link href="/editor" tabIndex={-1}>
              <button className="hidden md:block font-title-md text-title-md text-on-surface-variant hover:text-primary transition-colors px-md py-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">Go to Editor</button>
            </Link>
            <button onClick={async () => {
              try {
                await signOut(auth);
              } catch (e) {
                console.error("Firebase signout error:", e);
              }
              await fetch('/api/logout', { method: 'POST' }).catch((e) => {
                console.error("Logout API error:", e);
              });
              document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              setIsLoggedIn(false);
              router.refresh();
            }} className="bg-primary text-on-primary font-title-md text-title-md px-md py-sm rounded-lg hover:bg-primary/90 transition-colors duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth" tabIndex={-1}>
              <button className="hidden md:block font-title-md text-title-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-on-surface/[0.08] transition-colors duration-150 active:scale-[0.97] px-md py-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2">Sign In</button>
            </Link>
            <Link href="/auth" tabIndex={-1}>
              <button className="bg-primary text-on-primary font-title-md text-title-md px-md py-sm rounded-lg hover:bg-primary/90 transition-colors duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2">Get Started</button>
            </Link>
          </>
        )}
        <button onClick={toggleTheme} aria-label="Toggle theme" className="text-on-surface-variant hover:bg-on-surface/[0.08] p-sm rounded-full transition-colors duration-150 active:scale-[0.97] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2">
          {mounted && theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
}
