"use client";
import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { getProjectTree, readFile, writeFile, runProject } from "../actions";
import { createProject } from "../../dashboard/actions";
import { Play, Save, Loader2, CheckCircle2, Terminal as TermIcon, Info, Maximize, Minimize } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";

const SUPPORTED_LANGUAGES = [
  { id: "JAVA", label: "Java", monaco: "java" },
  { id: "C", label: "C", monaco: "c" },
  { id: "CPP", label: "C++", monaco: "cpp" },
  { id: "PYTHON", label: "Python", monaco: "python" },
  { id: "JAVASCRIPT", label: "JavaScript", monaco: "javascript" },
];

export function EditorClient({ 
  projectId, 
  initialProject 
}: { 
  projectId: string | null; 
  initialProject: { projectId?: string; name?: string; language?: string } | null;
}) {
  const router = useRouter();
  const { theme } = useTheme();

  // Create Project State
  const [createName, setCreateName] = useState("");
  const [createLang, setCreateLang] = useState("JAVA");

  // Editor State
  const [code, setCode] = useState("");
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  
  // Output State
  const [output, setOutput] = useState<{ stdout?: string, stderr?: string, exitCode?: number, executionTimeMs?: number, memoryUsageKb?: number } | null>(null);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [staticStdin, setStaticStdin] = useState("");

  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEditorReady(true), 50);
    return () => clearTimeout(t);
  }, []);

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
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

  // Load File Tree and default file
  useEffect(() => {
    if (projectId) {
      getProjectTree(projectId).then(tree => {
        if (tree && !tree.error) {
          // find first file
          let firstFile = null;
          const findFirst = (node: any) => {
            if (node.type === "file") {
              firstFile = node.path;
              return true;
            }
            if (node.children) {
              for (const child of node.children) {
                if (findFirst(child)) return true;
              }
            }
            return false;
          };
          findFirst(tree);
          
          if (firstFile) {
            setActiveFilePath(firstFile);
            readFile(projectId, firstFile).then(content => {
              if (typeof content === "string") {
                setCode(content);
              }
            });
          }
        }
      });
    }
  }, [projectId]);

  const handleCreateProject = async () => {
    if (!createName) return;
    setLoading(true);
    const res = await createProject({ name: createName, language: createLang });
    setLoading(false);
    if (res && 'projectId' in res) {
      router.push(`/editor/${res.projectId}`);
    }
  };

  const handleSave = async () => {
    if (!projectId || !activeFilePath) return;
    setSaving(true);
    setSaved(false);
    const res = await writeFile(projectId, activeFilePath, code);
    setSaving(false);
    if (!res.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleRunStatic = async () => {
    if (!projectId) return;
    setLoading(true);
    setActiveTab('console');
    setOutput(null);
    const res = await runProject(projectId, staticStdin);
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
    if (!projectId) return;
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
      const response = await fetch(`/api/projects/${projectId}/run/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
              } else if (currentEvent === "stdout" || currentEvent === "stderr") {
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

  const saveRef = useRef(handleSave);
  const runRef = useRef(handleRun);
  useEffect(() => {
    saveRef.current = handleSave;
    runRef.current = handleRun;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!saving) saveRef.current();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!loading) runRef.current();
      }
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [saving, loading, projectId, activeFilePath]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    editor.addAction({
      id: "save-project",
      label: "Save Project",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => {
        if (!saving) saveRef.current();
      }
    });

    editor.addAction({
      id: "run-project",
      label: "Run Project",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => {
        if (!loading) runRef.current();
      }
    });
  };

  const handleConsoleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!sessionId || !projectId) return;

    const line = currentLine;
    appendConsole(line + "\n");
    setCurrentLine("");

    try {
      await fetch(`/api/projects/${projectId}/run/stdin/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ line }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!projectId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full p-4 bg-background">
        <div className="bg-surface border border-outline-variant rounded-xl p-8 max-w-md w-full shadow-md text-on-surface">
          <h2 className="text-2xl font-bold mb-6 font-headline-md">Create New Project</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Project Name</label>
              <input 
                type="text" 
                value={createName} 
                onChange={e => setCreateName(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded p-2 text-on-surface focus:outline-none focus:border-primary"
                placeholder="My Awesome Project"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Language</label>
              <select 
                value={createLang}
                onChange={e => setCreateLang(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded p-2 text-on-surface focus:outline-none focus:border-primary"
              >
                {SUPPORTED_LANGUAGES.map(l => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleCreateProject}
              disabled={loading || !createName.trim()}
              className="w-full bg-primary text-on-primary py-2 rounded font-semibold hover:bg-orange-600 transition-colors mt-4 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Create Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeLangMeta = SUPPORTED_LANGUAGES.find(l => l.id === initialProject?.language) || SUPPORTED_LANGUAGES[0];
  const consoleText = consoleLines.join("\n");

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-background">
      
      <div className="h-auto min-h-[48px] py-2 md:py-0 md:h-12 border-b border-outline-variant bg-surface-container flex flex-wrap items-center justify-between px-4 shrink-0 gap-2 z-10">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="text-on-surface font-headline-sm font-semibold border-none px-2 py-1 flex-1 md:w-64 min-w-[120px]">
            {initialProject?.name || "Untitled Project"}
          </div>
          <div className="bg-surface-variant border border-outline-variant rounded px-2 py-1 text-sm text-on-surface-variant font-semibold shrink-0">
            {initialProject?.language || "JAVA"}
          </div>
          {activeFilePath && (
            <div className="text-sm text-on-surface-variant ml-4 flex items-center gap-2">
              <span className="font-code-sm">{activeFilePath}</span>
            </div>
          )}
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

            <div className="w-px h-6 bg-outline-variant mx-1 self-center hidden sm:block"></div>

            <button
              onClick={toggleFullscreen}
              className="hidden sm:flex items-center justify-center p-1.5 rounded hover:bg-surface-variant transition-colors text-on-surface-variant"
              title={isFullscreen ? "Exit Fullscreen (F11)" : "Fullscreen (F11)"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
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
          Console
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* @ts-ignore */}
        <PanelGroup direction="vertical" className="h-full">
          
          <Panel 
            defaultSize={70} 
            minSize={30} 
            className={`h-full ${activeTab === 'editor' ? 'block' : 'hidden md:block'}`}
          >
            <div className="h-full w-full bg-[#1e1e1e]">
              {!editorReady ? (
                <div className="w-full h-full flex items-center justify-center bg-surface text-on-surface-variant">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage={activeLangMeta.monaco}
                  language={activeLangMeta.monaco}
                  theme={theme === 'dark' ? "vs-dark" : "light"}
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    wordWrap: "on"
                  }}
                  onMount={handleEditorMount}
                />
              )}
            </div>
          </Panel>

          <PanelResizeHandle className="h-2 bg-surface-container border-y border-outline-variant flex items-center justify-center group cursor-row-resize hidden md:flex">
            <div className="w-8 h-1 rounded-full bg-outline-variant group-hover:bg-primary transition-colors"></div>
          </PanelResizeHandle>

          <Panel 
            defaultSize={30} 
            minSize={20} 
            className={`h-full bg-surface-container-lowest ${activeTab === 'console' ? 'block' : 'hidden md:block'}`}
          >
            <div className="h-full flex flex-col font-code-sm text-sm">
              <div className="bg-surface-container border-b border-outline-variant px-4 py-2 flex items-center gap-2 font-semibold text-on-surface-variant shrink-0">
                <TermIcon size={16} />
                Output Console
              </div>

              {interactiveMode ? (
                <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0a] text-[#d4d4d4]" ref={consoleRef}>
                  <pre className="whitespace-pre-wrap font-code-sm m-0 leading-relaxed">
                    {consoleText}
                    {streamRunning && <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle"></span>}
                  </pre>
                  
                  {streamRunning && sessionId && (
                    <div className="flex items-center mt-2">
                      <span className="text-primary mr-2">{">"}</span>
                      <input
                        ref={consoleInputRef}
                        type="text"
                        value={currentLine}
                        onChange={(e) => setCurrentLine(e.target.value)}
                        onKeyDown={handleConsoleKeyDown}
                        className="flex-1 bg-transparent outline-none border-none text-[#d4d4d4] font-code-sm placeholder-white/20"
                        placeholder="Type input and press Enter..."
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-hidden bg-background">
                  <div className="h-1/2 border-b border-outline-variant flex flex-col shrink-0">
                    <div className="px-4 py-1 text-xs font-semibold text-on-surface-variant bg-surface-container shrink-0">
                      Standard Input (Stdin)
                    </div>
                    <textarea
                      className="flex-1 bg-transparent p-4 resize-none outline-none text-on-surface font-code-sm"
                      placeholder="Paste input here..."
                      value={staticStdin}
                      onChange={(e) => setStaticStdin(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0a] text-[#d4d4d4] relative">
                    {loading && !interactiveMode && (
                      <div className="absolute inset-0 bg-[#0a0a0a]/50 flex items-center justify-center backdrop-blur-sm z-10">
                        <Loader2 className="animate-spin text-primary" size={24} />
                      </div>
                    )}
                    {output ? (
                      <div className="flex flex-col h-full">
                        {output.exitCode !== undefined && (
                          <div className="flex flex-wrap gap-3 mb-4 shrink-0 bg-[#1a1a1a] p-3 rounded-lg border border-white/5">
                            <div className={`px-2 py-1 rounded text-xs font-bold ${output.exitCode === 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                              Exit Code: {output.exitCode}
                            </div>
                            {output.executionTimeMs !== undefined && (
                              <div className="px-2 py-1 rounded text-xs font-bold bg-white/5 text-white/70">
                                Time: {output.executionTimeMs}ms
                              </div>
                            )}
                            {output.memoryUsageKb !== undefined && (
                              <div className="px-2 py-1 rounded text-xs font-bold bg-white/5 text-white/70">
                                Memory: {(output.memoryUsageKb / 1024).toFixed(2)} MB
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex-1 overflow-y-auto">
                          {output.stdout && (
                            <div className="mb-4">
                              <pre className="whitespace-pre-wrap m-0 font-code-sm">{output.stdout}</pre>
                            </div>
                          )}
                          {output.stderr && (
                            <div className="text-red-400">
                              <pre className="whitespace-pre-wrap m-0 font-code-sm">{output.stderr}</pre>
                            </div>
                          )}
                          {!output.stdout && !output.stderr && output.exitCode === 0 && (
                            <span className="text-white/30 italic">Process completed with no output.</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-white/30 italic">Output will appear here after execution...</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}
