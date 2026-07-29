"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Code, FolderTree, Cpu, Command, Bug, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "getting-started", title: "Getting Started", icon: <Code size={18} /> },
  { id: "editor", title: "The Editor", icon: <FolderTree size={18} /> },
  { id: "running-code", title: "Running Code", icon: <Terminal size={18} /> },
  { id: "diagnostics", title: "Diagnostics", icon: <Bug size={18} /> },
  { id: "languages", title: "Supported Languages", icon: <Cpu size={18} /> },
  { id: "shortcuts", title: "Shortcuts", icon: <Command size={18} /> },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-2 transition-colors relative"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check size={16} className="text-emerald-500" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
}

export function ClientDocsContent() {
  const [activeSection, setActiveSection] = useState<string>("getting-started");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-grow flex w-full max-w-7xl mx-auto px-4 lg:px-8">
      {/* Sticky Left Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden md:block border-r border-outline/30 py-8 pr-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="mb-6">
          <h3 className="font-bold text-on-surface text-sm mb-4">Documentation</h3>
        </div>
        
        <nav className="space-y-1 relative">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a 
                key={section.id} 
                href={`#${section.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150 relative",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-2"
                )}
              >
                <span className={isActive ? "opacity-100" : "opacity-70"}>{section.icon}</span>
                {section.title}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow py-8 md:pl-10 max-w-3xl">
        <div className="mb-10 border-b border-outline/30 pb-6">
          <h1 className="text-3xl font-bold text-on-surface mb-3">CodePad Documentation</h1>
          <p className="text-base text-on-surface-variant">
            Learn how to write, run, and debug code in the cloud.
          </p>
        </div>

        <div className="space-y-16">
          {/* Getting Started */}
          <section id="getting-started" className="scroll-mt-24" ref={(el) => { sectionRefs.current[0] = el; }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <Code className="text-primary" size={24} /> Getting Started
            </h2>
            <div className="text-on-surface-variant space-y-4 text-base leading-relaxed">
              <p>CodePad provides a secure, sandboxed environment to write and run code in 8 programming languages.</p>
              <h3 className="text-lg font-bold text-on-surface mt-6 mb-2">Creating a Project</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Click <strong>New Project</strong> from the dashboard or <code className="bg-surface-2 px-1.5 py-0.5 rounded text-sm text-primary">File</code> menu.</li>
                <li>Enter a project name and select your language.</li>
                <li>CodePad auto-generates the entry point (e.g., <code className="bg-surface-2 px-1.5 py-0.5 rounded text-sm text-primary">Main.java</code>).</li>
              </ol>
            </div>
          </section>

          {/* The Editor */}
          <section id="editor" className="scroll-mt-24" ref={(el) => { sectionRefs.current[1] = el; }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <FolderTree className="text-primary" size={24} /> The Editor
            </h2>
            <div className="text-on-surface-variant space-y-4 text-base leading-relaxed">
              <p>The editor is designed to feel like a native IDE with multi-file support.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create files and folders via right-click in the Explorer</li>
                <li>Rename, delete, and organize complex directory structures</li>
                <li>Your entire project compiles automatically — no manual linking needed</li>
              </ul>
            </div>
          </section>

          {/* Running Code */}
          <section id="running-code" className="scroll-mt-24" ref={(el) => { sectionRefs.current[2] = el; }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <Terminal className="text-primary" size={24} /> Running Code
            </h2>
            <div className="text-on-surface-variant space-y-4 text-base leading-relaxed">
              <div className="flex items-center gap-2">
                <p>Click <strong>Run</strong> or press</p>
                <kbd className="bg-surface-2 border border-outline px-2 py-1 rounded text-xs font-mono flex items-center gap-1 text-on-surface">
                  <span className="opacity-70">Ctrl + Enter</span>
                  <CopyButton text="Ctrl+Enter" />
                </kbd>
                <p>to execute.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-surface-1 border border-outline p-5 rounded-xl">
                  <h4 className="font-bold text-on-surface mb-2">Static Mode</h4>
                  <p className="text-sm">Runs code and returns final output. Use the Stdin button for input.</p>
                </div>
                <div className="bg-surface-1 border border-primary/30 p-5 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <h4 className="font-bold text-on-surface mb-2 relative z-10">Interactive Mode</h4>
                  <p className="text-sm relative z-10">Opens a live WebSocket terminal for real-time I/O streaming.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Diagnostics */}
          <section id="diagnostics" className="scroll-mt-24" ref={(el) => { sectionRefs.current[3] = el; }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <Bug className="text-primary" size={24} /> Diagnostics
            </h2>
            <div className="text-on-surface-variant space-y-4 text-base leading-relaxed">
              <p>Live language server diagnostics help you catch errors as you type.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>In-editor squigglies:</strong> Errors underlined directly in code. Hover for details.</li>
                <li><strong>Problems panel:</strong> Click the &quot;Problems&quot; tab to see all errors across your project.</li>
              </ul>
            </div>
          </section>

          {/* Languages */}
          <section id="languages" className="scroll-mt-24" ref={(el) => { sectionRefs.current[4] = el; }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <Cpu className="text-primary" size={24} /> Supported Languages
            </h2>
            <div className="overflow-x-auto mt-4 border border-outline rounded-xl shadow-elevation-1 bg-surface-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-2 border-b border-outline">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-on-surface">Language</th>
                    <th className="px-5 py-3 font-semibold text-on-surface">Version</th>
                    <th className="px-5 py-3 font-semibold text-on-surface">Entry Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline text-on-surface-variant">
                  {[
                    ["Java", "OpenJDK 21", "Auto-detected"],
                    ["Python", "3.12", "Any .py file"],
                    ["C++", "GCC 13 (C++17)", "All .cpp → a.out"],
                    ["JavaScript", "Node.js 24", "main.js"],
                    ["TypeScript", "esbuild / Node.js 24", "main.ts"],
                    ["Rust", "1.75", "main.rs"],
                    ["Kotlin", "1.9.23", "Solution.kt"],
                    ["C", "GCC 13", "main.c"],
                  ].map(([lang, ver, entry]) => (
                    <tr key={lang} className="hover:bg-surface-2 transition-colors">
                      <td className="px-5 py-3 font-medium">{lang}</td>
                      <td className="px-5 py-3">{ver}</td>
                      <td className="px-5 py-3">
                        <code className="bg-surface-2 px-2 py-1 rounded-md text-xs font-mono flex items-center gap-2 w-fit">
                          {entry}
                          <CopyButton text={entry} />
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Shortcuts */}
          <section id="shortcuts" className="scroll-mt-24" ref={(el) => { sectionRefs.current[5] = el; }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <Command className="text-primary" size={24} /> Keyboard Shortcuts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                { keys: "Ctrl + S", desc: "Save current file" },
                { keys: "Ctrl + Enter", desc: "Run code" },
                { keys: "F11", desc: "Toggle Fullscreen" },
                { keys: "Ctrl + Space", desc: "Trigger suggestions" },
              ].map((shortcut, i) => (
                <div key={i} className="flex justify-between items-center bg-surface-1 px-5 py-4 rounded-xl border border-outline shadow-elevation-1">
                  <span className="text-on-surface font-medium">{shortcut.desc}</span>
                  <kbd className="bg-surface-2 border border-outline px-2 py-1 rounded text-xs font-mono text-on-surface flex items-center gap-2">
                    {shortcut.keys}
                    <CopyButton text={shortcut.keys} />
                  </kbd>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
