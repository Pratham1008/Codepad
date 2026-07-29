"use client";

import Link from "next/link";
import { Zap, Bug, FolderTree, Code, Globe, Shield } from "lucide-react";
import { useEffect, useRef } from "react";
import { HeroExecutionVFX } from "@/components/HeroExecutionVFX";

export function ClientPageContent() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const hero = heroRef.current;
    if (hero) hero.addEventListener("pointermove", handlePointerMove);
    return () => {
      if (hero) hero.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const features = [
    { icon: <Zap size={24} />, title: "Lightning Fast Execution", desc: "Run code in secure, isolated containers. See output in milliseconds." },
    { icon: <Bug size={24} />, title: "Inline Diagnostics", desc: "Catch errors before you compile. Squiggly lines and hover hints guide you." },
    { icon: <FolderTree size={24} />, title: "Multi-File Projects", desc: "Manage complex projects with a file tree, tabbed editing, and cross-file references." },
    { icon: <Code size={24} />, title: "Algorithmic Challenges", desc: "Solve curated coding problems with automated test case judging." },
    { icon: <Globe size={24} />, title: "8 Languages Supported", desc: "Java, Python, C++, C, JavaScript, TypeScript, Rust, and Kotlin." },
    { icon: <Shield size={24} />, title: "Secure Sandbox", desc: "Code runs in isolated Docker containers with strict resource limits." },
  ];

  return (
    <>
      <main className="flex-grow pt-24 pb-16 px-6 lg:px-16 relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-12 mb-20 relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {/* Cursor Glow */}
          <div 
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 -z-20"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--primary), transparent 40%)`,
              opacity: 0.15
            }}
          />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(0,122,204,0.06)_0%,_transparent_60%)] -z-10 rounded-full" />

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 leading-tight">
            Code. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Execute.</span> Conquer.
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Write, run, and test code in 8 languages — right from your browser. Fast compilation, real-time diagnostics, and algorithmic challenges.
          </p>
        
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mt-10 z-10">
            <Link href="/auth">
              <button className="bg-primary text-on-primary font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(0,122,204,0.3)] hover:bg-primary/90 transition-colors duration-150 text-base active:scale-[0.97]">
                Start Coding Free
              </button>
            </Link>
            <Link href="/problems">
              <button className="border-2 border-outline-variant text-on-surface font-bold px-8 py-3 rounded-xl hover:bg-surface-2 transition-colors duration-150 text-base active:scale-[0.97]">
                Browse Problems
              </button>
            </Link>
          </div>
        
          {/* Language Strip */}
          <div className="flex flex-wrap gap-3 mt-12 items-center justify-center text-on-surface-variant opacity-80">
            {["Java", "Python", "C++", "C", "JavaScript", "TypeScript", "Rust", "Kotlin"].map((lang) => (
              <span 
                key={lang}
                className="text-xs uppercase tracking-wider bg-surface-2 px-3 py-1.5 rounded cursor-default border border-outline/30 font-medium hover:text-primary hover:-translate-y-0.5 transition-all duration-150"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* IDE Mockup Section */}
        <section className="w-full max-w-6xl mx-auto mb-24 relative z-10">
          <HeroExecutionVFX />
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full max-w-7xl mx-auto mb-20 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-on-background mb-4">
              Everything You Need to Code
            </h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              A complete development environment in your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="bg-surface-1 rounded-2xl p-8 border border-outline/50 relative overflow-hidden group cursor-default hover:-translate-y-1 hover:shadow-elevation-2 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5 border border-primary/20 shadow-sm relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 relative z-10">{feature.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
