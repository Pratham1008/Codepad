"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, CheckCircle2 } from "lucide-react";

const codeLines = [
  { text: 'function solve(input) {' },
  { text: '  const target = parseInt(input[0]);' },
  { text: '  let sum = 0;' },
  { text: '  for (let i = 1; i <= target; i++) {' },
  { text: '    sum += i;' },
  { text: '  }' },
  { text: '  return sum;' },
  { text: '}' }
];

export function HeroExecutionVFX() {
  const [step, setStep] = useState<"typing" | "running" | "accepted">("typing");
  const [typedLines, setTypedLines] = useState<number>(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const typeNextLine = (currentLine: number) => {
      if (currentLine <= codeLines.length) {
        setTypedLines(currentLine);
        timeout = setTimeout(() => typeNextLine(currentLine + 1), 300);
      } else {
        timeout = setTimeout(() => setStep("running"), 500);
      }
    };
    typeNextLine(1);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (step === "running") {
      timeout = setTimeout(() => setStep("accepted"), 1500);
    } else if (step === "accepted") {
      timeout = setTimeout(() => {
        setStep("typing");
        setTypedLines(0);
        // Restart typing after reset
        let t: ReturnType<typeof setTimeout>;
        const typeNextLine = (currentLine: number) => {
          if (currentLine <= codeLines.length) {
            setTypedLines(currentLine);
            t = setTimeout(() => typeNextLine(currentLine + 1), 300);
          } else {
            t = setTimeout(() => setStep("running"), 500);
          }
        };
        t = setTimeout(() => typeNextLine(1), 200);
        // We can't easily clean up `t` here, but the component is long-lived
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl border border-outline bg-surface-1 shadow-elevation-2 overflow-hidden h-[320px] flex flex-col">
      {/* Title bar */}
      <div className="bg-surface-2 h-10 border-b border-outline flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="flex-grow text-center text-xs text-on-surface-variant font-mono opacity-70">
          solve.ts
        </div>
      </div>
      
      {/* Code area */}
      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-12 bg-surface-1 border-r border-outline flex flex-col py-4 shrink-0 text-right pr-2 select-none text-on-surface-variant/50 font-mono text-sm">
          {codeLines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div className="p-4 flex-1 font-mono text-sm text-on-surface whitespace-pre">
          {codeLines.slice(0, typedLines).map((line, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-150">
              {line.text}
            </div>
          ))}
          {step === "typing" && typedLines < codeLines.length && (
            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
          )}
        </div>
      </div>

      {/* Terminal / Output panel */}
      <div className="h-16 border-t border-outline bg-surface-2 shrink-0 flex items-center px-4 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-on-surface font-mono text-sm"
            >
              <Loader2 className="animate-spin w-4 h-4 text-primary" />
              Running test cases...
            </motion.div>
          )}
          {step === "accepted" && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-accepted font-mono text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              Accepted (24/24 passed)
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
