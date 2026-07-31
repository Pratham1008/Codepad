"use client";

import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import React, { RefObject } from "react";

interface EditorBottomPanelProps {
  consoleHeight: number;
  bottomTab: 'problems' | 'output' | 'terminal';
  setBottomTab: (val: 'problems' | 'output' | 'terminal') => void;
  problems: any[];
  interactiveMode: boolean;
  staticStdin: string;
  setStaticStdin: (val: string) => void;
  loading: boolean;
  consoleText: string;
  streamRunning: boolean;
  sessionId: string | null;
  consoleInputRef: RefObject<HTMLInputElement | null>;
  currentLine: string;
  setCurrentLine: (val: string) => void;
  handleConsoleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  consoleRef: RefObject<HTMLDivElement | null>;
  output: { stdout?: string, stderr?: string, exitCode?: number, executionTimeMs?: number, memoryUsageKb?: number } | null;
  setShowStdinModal?: (val: boolean) => void;
}

export function EditorBottomPanel({
  consoleHeight,
  bottomTab,
  setBottomTab,
  problems,
  interactiveMode,
  staticStdin,
  setStaticStdin,
  loading,
  consoleText,
  streamRunning,
  sessionId,
  consoleInputRef,
  currentLine,
  setCurrentLine,
  handleConsoleKeyDown,
  consoleRef,
  output,
  setShowStdinModal
}: EditorBottomPanelProps) {
  return (
    <div style={{ height: consoleHeight }} className="shrink-0 overflow-hidden bg-[#1e1e1e] flex flex-col">
      
      {/* Bottom Panel Tabs */}
      <div className="h-[35px] bg-[#252526] border-t border-[#2b2b2b] flex items-center px-3 shrink-0 select-none">
        <div className="flex items-center gap-0">
          {([
            { id: 'problems' as const, label: 'PROBLEMS', count: problems.length },
            { id: 'output' as const, label: 'OUTPUT', count: 0 },
            { id: 'terminal' as const, label: 'TERMINAL', count: 0 },
          ]).map(tab => (
            <button key={tab.id}
              className={`px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase transition-colors border-b-2
                ${bottomTab === tab.id 
                  ? 'text-white border-b-[#007acc]' 
                  : 'text-[#858585] hover:text-[#cccccc] border-b-transparent'}`}
              onClick={() => setBottomTab(tab.id)}>
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1.5 px-1.5 py-0 rounded-full text-[10px] bg-[#007acc] text-white">{tab.count}</span>
              )}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        
        {/* Stdin input area (for static mode) - only show in output tab */}
        {bottomTab === 'output' && !interactiveMode && (
          <div className="flex items-center gap-2 text-[11px] text-[#858585]">
            <span>Stdin:</span>
            <button
              onClick={() => setShowStdinModal?.(true)}
              disabled={loading}
              className="bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-0.5 text-[12px] text-[#cccccc] hover:bg-[#2d2d2d] transition-colors outline-none focus:border-[#007acc] disabled:opacity-50 flex items-center justify-between min-w-[120px]"
            >
              <span className="truncate max-w-[80px]">{staticStdin ? staticStdin.replace(/\n/g, '↵ ') : "Enter input..."}</span>
              <span className="text-[#858585] ml-2">Edit</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Panel Content */}
      <div className="flex-1 overflow-auto min-h-0">
        
        {/* PROBLEMS tab */}
        {bottomTab === 'problems' && (
          <div className="p-3 text-[13px]">
            {problems.length === 0 ? (
              <div className="text-[#3fb950] flex items-center gap-2">
                <CheckCircle2 size={14} />
                No problems have been detected in the workspace.
              </div>
            ) : (
              <div className="space-y-1">
                {problems.map((p: any, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-[13px]">
                    <AlertTriangle size={14} className={String(p.severity).toLowerCase() === 'error' ? 'text-red-400 shrink-0 mt-0.5' : 'text-yellow-400 shrink-0 mt-0.5'} />
                    <span className="text-[#cccccc]">{p.message}</span>
                    <span className="text-[#858585] text-xs ml-auto shrink-0">Ln {p.line}, Col {p.column}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* OUTPUT tab */}
        {bottomTab === 'output' && (
          <div className="h-full flex flex-col">
            {interactiveMode ? (
              <div className="flex-1 p-3 overflow-y-auto bg-[#0d1117] text-[#d4d4d4]" ref={consoleRef}>
                <pre className="whitespace-pre-wrap m-0 leading-relaxed text-[13px] font-mono">
                  {consoleText}
                  {streamRunning && <span className="animate-pulse inline-block w-1.5 h-4 bg-[#007acc] ml-0.5 align-middle" />}
                </pre>
                {streamRunning && sessionId && (
                  <div className="flex items-center mt-2">
                    <span className="text-[#007acc] mr-2">{">"}</span>
                    <input ref={consoleInputRef} type="text" value={currentLine}
                      onChange={(e) => setCurrentLine(e.target.value)} onKeyDown={handleConsoleKeyDown}
                      className="flex-1 bg-transparent outline-none border border-transparent text-[#d4d4d4] font-mono text-[13px] placeholder-white/20 focus-visible:ring-2 focus-visible:ring-[#007acc] focus-visible:ring-offset-1 focus-visible:ring-offset-[#1e1e1e]"
                      placeholder="Type input and press Enter..." autoFocus />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 p-3 overflow-y-auto bg-[#0d1117] text-[#d4d4d4] relative min-h-0">
                {loading && (
                  <div className="absolute inset-0 bg-[#0d1117]/60 flex items-center justify-center backdrop-blur-sm z-10">
                    <Loader2 className="animate-spin text-[#007acc]" size={24} />
                  </div>
                )}
                {output ? (
                  <div>
                    {output.exitCode !== undefined && (
                      <div className="flex flex-wrap gap-2 mb-3 bg-[#161b22] p-2 rounded border border-[#30363d]">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${output.exitCode === 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          Exit Code: {output.exitCode}
                        </span>
                        {output.executionTimeMs !== undefined && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/5 text-white/70">
                            Time: {output.executionTimeMs}ms
                          </span>
                        )}
                        {output.memoryUsageKb !== undefined && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/5 text-white/70">
                            Memory: {(output.memoryUsageKb / 1024).toFixed(2)} MB
                          </span>
                        )}
                      </div>
                    )}
                    {output.stdout && <pre className="whitespace-pre-wrap m-0 font-mono text-[13px] mb-2">{output.stdout}</pre>}
                    {output.stderr && <pre className="whitespace-pre-wrap m-0 font-mono text-[13px] text-red-400">{output.stderr}</pre>}
                    {!output.stdout && !output.stderr && output.exitCode === 0 && (
                      <span className="text-white/30 italic text-[13px]">Process completed with no output.</span>
                    )}
                  </div>
                ) : (
                  <span className="text-white/30 italic text-[13px]">Run your project to see output here...</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* TERMINAL tab */}
        {bottomTab === 'terminal' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 p-3 overflow-y-auto bg-[#0d1117] text-[#d4d4d4]" ref={consoleRef}>
              <pre className="whitespace-pre-wrap m-0 leading-relaxed text-[13px] font-mono">
                {consoleText || "Terminal ready. Run your project to see output here."}
                {streamRunning && <span className="animate-pulse inline-block w-1.5 h-4 bg-[#007acc] ml-0.5 align-middle" />}
              </pre>
              {streamRunning && sessionId && (
                <div className="flex items-center mt-2">
                  <span className="text-[#007acc] mr-2">{"$"}</span>
                  <input ref={consoleInputRef} type="text" value={currentLine}
                    onChange={(e) => setCurrentLine(e.target.value)} onKeyDown={handleConsoleKeyDown}
                    className="flex-1 bg-transparent outline-none border border-transparent text-[#d4d4d4] font-mono text-[13px] placeholder-white/20 focus-visible:ring-2 focus-visible:ring-[#007acc] focus-visible:ring-offset-1 focus-visible:ring-offset-[#1e1e1e]"
                    placeholder="Type input..." autoFocus />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
