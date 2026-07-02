"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Code, ArrowRight, Terminal, Users, Zap, Cloud, Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeTransition } from "@/components/theme-provider";
import { AnimatePresence } from "motion/react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex-1 flex flex-col font-body-md overflow-x-hidden relative">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-surface-container/90 backdrop-blur-sm border-b border-outline-variant" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center w-full px-4 md:px-8 h-12 max-w-7xl mx-auto">
          <div className="font-headline-md text-2xl text-primary flex items-center gap-2 font-bold">
            <Code size={24} />
            CodePad
          </div>
          
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="relative flex items-center w-12 h-6 bg-surface-variant border border-outline-variant rounded-full p-1 transition-colors hover:bg-surface-container-highest shrink-0"
              aria-label="Toggle Theme"
            >
              <Sun size={12} className="absolute left-1 text-on-surface-variant" />
              <Moon size={12} className="absolute right-1 text-on-surface-variant" />
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 z-10 ${
                  mounted && theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors">
              Features
            </a>
            <button 
              onClick={toggleTheme}
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
            <Link
              href="/auth"
              className="bg-surface-variant border border-outline-variant rounded px-4 py-1.5 text-on-surface hover:bg-surface-container-highest transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface-container border-b border-outline-variant overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 gap-4">
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-on-surface-variant font-semibold hover:text-primary transition-colors py-2 border-b border-outline-variant/50"
                >
                  Features
                </a>
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary-container text-on-primary-container text-center font-semibold rounded px-4 py-2 mt-2 transition-colors"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      
      <main className="flex-grow pt-[120px] pb-24 px-4 flex flex-col items-center justify-center text-center relative max-w-5xl mx-auto w-full">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-code-sm text-on-surface-variant text-xs">v1.0.4 is live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-headline-lg text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] font-bold tracking-tight mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-br from-on-background to-on-surface-variant"
        >
          The Editor with an <br />
          <span className="text-primary drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">Ember Heart</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto mb-10"
        >
          A high-fidelity developer environment blending terminal aesthetics with modern warmth. High performance, isolated execution, and a design that gets out of your way.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/auth">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-container text-on-primary-container font-semibold text-lg px-8 py-4 rounded-lg shadow-[0_0_24px_rgba(249,115,22,0.25)] hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              Get Started for Free
              <ArrowRight size={20} />
            </motion.button>
          </Link>
          <Link href="/editor">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface-container-high border border-outline-variant text-on-surface font-semibold text-lg px-8 py-4 rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-2"
            >
              <Terminal size={20} />
              Open Playground
            </motion.button>
          </Link>
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 w-full max-w-5xl rounded-xl border border-outline-variant bg-surface-container-lowest shadow-2xl overflow-hidden relative group text-left"
        >
          <div className="absolute inset-0 shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="h-8 border-b border-outline-variant bg-surface-container flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
          </div>
          <div className="flex flex-col md:flex-row h-auto md:h-[400px]">
            <div className="md:w-12 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-low flex flex-row md:flex-col items-center justify-center md:py-4 p-2 gap-4 text-on-surface-variant">
              <Code size={20} />
              <Terminal size={20} />
            </div>
            <div className="flex-1 p-4 md:p-6 font-code-md text-xs md:text-sm text-on-surface-variant bg-background overflow-x-auto relative">
              <pre>
                <code>
                  <span className="text-primary-container">import</span> {"{ CodePad }"} <span className="text-primary-container">from</span> <span className="text-secondary">'@codepad/core'</span>;
                  {"\n\n"}
                  <span className="text-tertiary">const</span> editor = <span className="text-primary-container">new</span> CodePad({"{"}
                  {"\n  "}theme: <span className="text-secondary">'ember-dark'</span>,
                  {"\n  "}performanceMode: <span className="text-secondary">'ultra'</span>
                  {"\n"}{"}"});
                  {"\n\n"}
                  editor.<span className="text-secondary-fixed">initialize</span>().<span className="text-secondary-fixed">then</span>(() =&gt; {"{"}
                  {"\n  "}<span className="text-on-surface-variant opacity-50"></span>
                  {"\n  "}console.<span className="text-secondary-fixed">log</span>(<span className="text-secondary">'Ready to build.'</span>);
                  {"\n"}{"}"});
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </main>

      
      <section id="features" className="py-24 px-4 md:px-8 bg-surface-container-lowest border-y border-outline-variant">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-headline-lg text-[32px] md:text-[40px] font-bold text-on-surface mb-4"
            >
              Engineered for Focus
            </motion.h2>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto">
              Everything you need to write brilliant code, packed into a blazing fast interface.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Users size={28} className="text-primary" />}
              title="Save Snippets"
              description="Store your most brilliant code snippets and retrieve them instantly from your dashboard."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Zap size={28} className="text-primary" />}
              title="High Performance"
              description="A clean, distraction-free editor environment powered by Monaco Editor for the best coding experience."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Cloud size={28} className="text-primary" />}
              title="Cloud Execution"
              description="Run your code instantly in isolated cloud containers. No local setup required, just hit run."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-xs uppercase tracking-widest text-on-surface-variant">
            CodePad v1.0.4
          </div>
          <div className="flex gap-6 font-code-sm text-xs text-on-surface-variant">
            <span className="hover:text-on-surface transition-colors cursor-pointer">main</span>
            <span className="hover:text-on-surface transition-colors cursor-pointer">JavaScript</span>
            <span className="hover:text-on-surface transition-colors cursor-pointer">UTF-8</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-surface-container border border-outline-variant rounded-xl p-8 hover:border-primary transition-colors flex flex-col items-start group"
    >
      <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center mb-6 group-hover:bg-primary-container/20 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant">{description}</p>
    </motion.div>
  );
}
