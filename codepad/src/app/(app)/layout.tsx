"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Code, Terminal, Settings, LogOut, PanelLeftClose, PanelLeftOpen, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { logout } from "@/app/auth/actions";
import { useTheme } from "next-themes";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navItems = [
    { name: "Snippets", href: "/dashboard", icon: <Code size={18} /> },
    { name: "Playground", href: "/editor", icon: <Terminal size={18} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body-md text-on-surface">
      
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 64 }}
        className="h-full bg-surface-container border-r border-outline-variant flex flex-col transition-all overflow-hidden whitespace-nowrap z-20"
      >
        <div className="h-12 border-b border-outline-variant flex items-center justify-between px-4">
          {sidebarOpen && (
            <span className="font-headline-sm font-bold text-primary flex items-center gap-2">
              <Code size={20} />
              CodePad
            </span>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant"
          >
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        </div>
        
        <div className="flex-1 py-4 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isActive ? "bg-primary-container text-on-primary-container" : "hover:bg-surface-variant text-on-surface-variant hover:text-on-surface"
                }`}>
                  {item.icon}
                  {sidebarOpen && <span className="font-semibold text-sm">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-outline-variant flex flex-col gap-2">
          <div className={`flex items-center ${sidebarOpen ? 'justify-between px-3 py-2' : 'justify-center'}`}>
            {sidebarOpen && <span className="text-sm font-semibold text-on-surface-variant">Theme</span>}
            {sidebarOpen ? (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative flex items-center w-14 h-7 bg-surface-variant border border-outline-variant rounded-full p-1 transition-colors hover:bg-surface-container-highest shrink-0"
                aria-label="Toggle Theme"
              >
                <Sun size={14} className="absolute left-1.5 text-on-surface-variant" />
                <Moon size={14} className="absolute right-1.5 text-on-surface-variant" />
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 z-10 ${
                    mounted && theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            ) : (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant"
                aria-label="Toggle Theme"
              >
                {mounted && theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-error hover:bg-error-container hover:text-on-error-container rounded transition-colors w-full text-left"
          >
            <LogOut size={18} />
            {sidebarOpen && "Sign Out"}
          </button>
        </div>
      </motion.aside>

      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-surface-container-lowest -z-10"></div>
        {children}
      </main>
    </div>
  );
}
