"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeTransition } from "@/components/theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function ClientNav({ initialIsLoggedIn }: { initialIsLoggedIn: boolean }) {
  const { theme, toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/problems", label: "Problems" },
    { href: "/docs", label: "Docs" },
    { href: "/pricing", label: "Pricing" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isDark = mounted && theme === 'dark';

  return (
    <>
      <nav className="bg-surface-1/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-outline/30 flex justify-between items-center px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-primary text-on-primary w-7 h-7 flex items-center justify-center rounded-md font-mono text-sm font-bold group-hover:shadow-[0_0_12px_rgba(0,122,204,0.4)] transition-shadow">{'/>'}</span>
          <span className="font-bold text-primary text-lg">CodePad</span>
        </Link>
        
        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                isActive(link.href)
                  ? "text-primary bg-primary/10"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href="/editor" tabIndex={-1}>
                <button className="hidden md:block text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-4 py-2 rounded-lg">Go to Editor</button>
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
              }} className="bg-primary text-on-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-150 active:scale-[0.97]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" tabIndex={-1}>
                <button className="hidden md:block text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors duration-150 px-4 py-2 rounded-lg">Sign In</button>
              </Link>
              <Link href="/auth" tabIndex={-1}>
                <button className="bg-primary text-on-primary text-sm font-semibold px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-150 active:scale-[0.97]">Get Started</button>
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-14 h-8 rounded-full bg-surface-2 border border-outline flex items-center px-1 focus:outline-primary"
          >
            <div
              className="w-6 h-6 rounded-full bg-surface-1 shadow-elevation-1 flex items-center justify-center text-on-surface absolute z-10 transition-[left] duration-200 ease-out"
              style={{
                left: isDark ? "calc(100% - 28px)" : "4px"
              }}
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </div>
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-on-surface-variant hover:bg-surface-2 p-2 rounded-full transition-colors" aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-surface-1/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-2"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
