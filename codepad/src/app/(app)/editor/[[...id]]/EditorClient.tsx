"use client";

import { useEffect, useState, useRef, use } from "react";
import Editor from "@monaco-editor/react";
import { getSnippet, saveSnippet, runCode } from "../actions";
import { Play, Save, Loader2, CheckCircle2, Terminal as TermIcon, Info } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";






const BOILERPLATES: Record<string, string> = {
  "JAVA": `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hello from codepad");
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            System.out.println("Received: " + input);
        }
    }
}`,
  "C": `#include <stdio.h>

int main() {
    printf("Hello from codepad\\n");
    char input[100];
    if (scanf("%99s", input) == 1) {
        printf("Received: %s\\n", input);
    }
    return 0;
}`,
  "CPP": `#include <iostream>
#include <string>

using namespace std;

int main() {
    cout << "Hello from codepad\\n";
    string input;
    if (getline(cin, input)) {
        cout << "Received: " << input << "\\n";
    }
    return 0;
}`,
  "PYTHON": `def main():
    print("Hello from codepad")
    try:
        user_input = input()
        print(f"Received: {user_input}")
    except EOFError:
        pass

if __name__ == "__main__":
    main()`,
  "JAVASCRIPT": `const readline = require('readline');

console.log("Hello from codepad");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
    console.log("Received: " + line);
    rl.close();
});`
};

const SUPPORTED_LANGUAGES = [
  { id: "JAVA", label: "Java", monaco: "java" },
  { id: "C", label: "C", monaco: "c" },
  { id: "CPP", label: "C++", monaco: "cpp" },
  { id: "PYTHON", label: "Python", monaco: "python" },
  { id: "JAVASCRIPT", label: "JavaScript", monaco: "javascript" },
];

export function EditorClient({ 
  snippetId, 
  initialSnippet 
}: { 
  snippetId: string | null; 
  initialSnippet: { title?: string; language?: string; sourceCode?: string } | null;
}) {
  const router = useRouter();
  const { theme } = useTheme();

  const [code, setCode] = useState(initialSnippet?.sourceCode || (snippetId ? "" : BOILERPLATES["JAVA"]));
  const [language, setLanguage] = useState(initialSnippet?.language || "JAVA");
  const [title, setTitle] = useState(initialSnippet?.title || "Untitled Snippet");

  
  const [output, setOutput] = useState<{ stdout?: string, stderr?: string, exitCode?: number, executionTimeMs?: number, memoryUsageKb?: number } | null>(null);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [staticStdin, setStaticStdin] = useState("");

  
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [streamRunning, setStreamRunning] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'editor' | 'console'>('editor');

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLines]);

  
  useEffect(() => {
    if (interactiveMode && streamRunning) {
      consoleInputRef.current?.focus();
    }
  }, [interactiveMode, streamRunning]);

  const handleLanguageChange = (newLang: string) => {
    const isUnchangedBoilerplate = Object.values(BOILERPLATES).includes(code);
    if (!snippetId && isUnchangedBoilerplate) {
      setCode(BOILERPLATES[newLang]);
    }
    setLanguage(newLang);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const res = await saveSnippet(snippetId, { title, code, language });
    setSaving(false);
    if (!res.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (!snippetId && res.snippetId) {
        router.push(`/editor/${res.snippetId}`);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!saving) handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language, title, snippetId, saving]);

  const handleRunStatic = async () => {
    setLoading(true);
    setActiveTab('console');
    setOutput(null);
    const res = await runCode({ code, language, stdin: staticStdin });
    setLoading(false);
    if (!res.error) {
      setOutput(res);
    } else {
      setOutput({ stderr: res.error });
    }
  };

  const appendConsole = (text: string) => {
    if (!text) return;
    setConsoleLines(prev => {
      const next = [...prev];
      
      const combined = (next.pop() ?? "") + text;
      const split = combined.split("\n");
      return [...next, ...split];
    });
  };

  const handleRunStream = async () => {
    setLoading(true);
    setStreamRunning(true);
    setActiveTab('console');
    setOutput(null);
    setConsoleLines([]);
    setCurrentLine("");
    setSessionId(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      
      
      const response = await fetch(`/api/run/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceCode: code, language }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        appendConsole("\nFailed to start execution.");
        setLoading(false);
        setStreamRunning(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentEvent = "";
      let buffer = "";

      const finish = () => {
        setLoading(false);
        setStreamRunning(false);
        setSessionId(null);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          finish();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) {
            currentEvent = "";
            continue;
          }

          if (trimmedLine.startsWith("event:")) {
            currentEvent = trimmedLine.replace("event:", "").trim();
          } else if (trimmedLine.startsWith("data:")) {
            const rawData = trimmedLine.replace("data:", "").trim();
            if (!rawData) continue;

            try {
              const parsed = JSON.parse(rawData);

              if (currentEvent === "session") {
                setSessionId(parsed.sessionId);
              } else if (currentEvent === "stdout") {
                appendConsole(parsed.chunk ?? "");
              } else if (currentEvent === "stderr") {
                appendConsole(parsed.chunk ?? "");
              } else if (currentEvent === "done") {
                appendConsole("\n[Process exited]");
                finish();
              } else if (currentEvent === "error") {
                appendConsole("\n[Error] " + (parsed.chunk ?? "Unknown error"));
                finish();
              }
            } catch {
              appendConsole(rawData);
            }
          }
        }
      }
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        appendConsole(`\n[Connection error] ${error.message}`);
      }
      setLoading(false);
      setStreamRunning(false);
    }
  };

  const handleRun = () => {
    if (interactiveMode) {
      handleRunStream();
    } else {
      handleRunStatic();
    }
  };

  
  
  const handleConsoleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!sessionId) return;

    const line = currentLine;
    appendConsole(line + "\n");
    setCurrentLine("");

    try {
      await fetch(`/api/run/stdin/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ line }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const activeLangMeta = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0];
  const consoleText = consoleLines.join("\n");

  return (
    <div className="flex flex-col h-full bg-background">
      
      <div className="h-auto min-h-[48px] py-2 md:py-0 md:h-12 border-b border-outline-variant bg-surface-container flex flex-wrap items-center justify-between px-4 shrink-0 gap-2 z-10">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="bg-transparent text-on-surface font-headline-sm font-semibold border-none outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 flex-1 md:w-64 min-w-[120px]"
            placeholder="Snippet Title"
          />
          <select
            value={language}
            onChange={e => handleLanguageChange(e.target.value)}
            className="bg-surface-variant border border-outline-variant rounded px-2 py-1 text-sm text-on-surface-variant focus:outline-none focus:border-primary font-semibold shrink-0"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 relative group cursor-pointer">
            <label className="flex items-center gap-2 text-sm text-on-surface-variant font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={interactiveMode}
                onChange={(e) => setInteractiveMode(e.target.checked)}
                className="accent-primary w-4 h-4"
              />
              <span className="hidden sm:inline">Interactive Console</span>
              <span className="sm:hidden">Interactive</span>
            </label>
            <Info size={14} className="text-on-surface-variant hidden sm:block" />
            <div className="absolute right-0 top-6 w-64 bg-surface-container-highest border border-outline-variant rounded shadow p-2 text-xs text-on-surface opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden sm:block">
              <span className="font-semibold block mb-1">Tip:</span>
              Use Interactive Mode for real-time input prompts. Uncheck it (Static Mode) to paste bulk DSA-style input and view execution time/memory metrics.
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold bg-surface-container-highest border border-outline-variant hover:bg-surface-variant transition-colors"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} className="text-primary" /> : <Save size={16} />}
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleRun}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-1.5 rounded text-sm font-semibold bg-primary-container text-on-primary-container hover:bg-orange-600 transition-colors shadow-sm"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              Run
            </button>
          </div>
        </div>
      </div>

      <div className="flex md:hidden bg-surface-container border-b border-outline-variant shrink-0">
        <button 
          onClick={() => setActiveTab('editor')} 
          className={`flex-1 py-2 text-sm font-semibold text-center border-b-2 transition-colors ${activeTab === 'editor' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}
        >
          Code
        </button>
        <button 
          onClick={() => setActiveTab('console')} 
          className={`flex-1 py-2 text-sm font-semibold text-center border-b-2 transition-colors ${activeTab === 'console' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}
        >
          Output {output || streamRunning ? " (Active)" : ""}
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <PanelGroup orientation="horizontal" id="codepad-editor-layout" key={`editor-layout-${snippetId || 'new'}`}>
          
          <Panel defaultSize={60} minSize={30} className={`relative bg-background h-full mobile-panel ${activeTab === 'console' ? 'mobile-hidden' : 'mobile-visible'}`}>
            {loading && !code && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-40 backdrop-blur-sm">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            )}
            <Editor
              height="100%"
              language={activeLangMeta.monaco}
              theme={theme === "dark" ? "vs-dark" : "light"}
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-code-md)",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
              }}
            />
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-outline-variant/30 hover:bg-primary transition-colors cursor-col-resize z-10 hidden md:block" />

          
          <Panel defaultSize={40} minSize={20} className={`bg-surface-container-lowest flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.05)] h-full mobile-panel ${activeTab === 'editor' ? 'mobile-hidden' : 'mobile-visible'}`}>
            <div className="h-10 border-b border-outline-variant flex items-center px-4 bg-surface-container text-xs font-semibold uppercase tracking-wider text-on-surface-variant shrink-0 gap-2">
              <TermIcon size={16} />
              {interactiveMode ? "Interactive Console" : "Execution Output"}

              {output && output.exitCode !== undefined && !interactiveMode && (
                <div className="ml-auto flex items-center gap-2 text-xs">
                  <span className="text-on-surface-variant">{output.executionTimeMs}ms</span>
                  {output.memoryUsageKb !== undefined && output.memoryUsageKb > 0 && (
                    <span className="text-on-surface-variant">
                      {output.memoryUsageKb >= 1024
                        ? `${(output.memoryUsageKb / 1024).toFixed(1)}MB`
                        : `${output.memoryUsageKb}KB`}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded ${output.exitCode === 0 ? "bg-green-500/20 text-green-500" : "bg-error/20 text-error"}`}>
                    Exit Code: {output.exitCode}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              {!interactiveMode && (
                <div className="h-1/3 border-b border-outline-variant bg-surface-container-highest p-2 flex flex-col">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Standard Input (stdin)</label>
                  <textarea
                    value={staticStdin}
                    onChange={e => setStaticStdin(e.target.value)}
                    placeholder="Enter test cases here..."
                    className="flex-1 bg-background border border-outline-variant rounded p-2 text-sm font-code-sm text-on-surface resize-none focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              {interactiveMode ? (
                
                
                <div
                  ref={consoleRef}
                  onClick={() => consoleInputRef.current?.focus()}
                  className="flex-1 overflow-y-auto p-4 font-code-sm text-sm whitespace-pre-wrap text-on-surface cursor-text"
                >
                  {consoleText}
                  {sessionId && (
                    <span className="inline-flex items-center">
                      <input
                        ref={consoleInputRef}
                        type="text"
                        value={currentLine}
                        onChange={e => setCurrentLine(e.target.value)}
                        onKeyDown={handleConsoleKeyDown}
                        autoFocus
                        autoComplete="off"
                        spellCheck={false}
                        className="bg-transparent border-none outline-none font-code-sm text-sm text-on-surface p-0 m-0"
                        style={{ width: `${Math.max(currentLine.length, 1)}ch` }}
                      />
                      <span className="w-2 h-4 bg-primary animate-pulse inline-block ml-0.5" />
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 font-code-sm text-sm whitespace-pre-wrap">
                  {output?.stdout && <div className="text-on-surface">{output.stdout}</div>}
                  {output?.stderr && <div className="text-error mt-2">{output.stderr}</div>}
                  {!output?.stdout && !output?.stderr && !loading && (
                    <div className="text-on-surface-variant italic">No output produced.</div>
                  )}
                  {loading && <div className="text-on-surface-variant animate-pulse">Running code...</div>}
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
