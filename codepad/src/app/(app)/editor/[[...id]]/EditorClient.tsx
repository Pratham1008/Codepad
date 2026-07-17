"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { getProjectTree, readFile, writeFile, runProject, runDiagnostics, createFile, renameFile, deleteFile } from "../actions";
import { FileExplorer, FileNode } from "./FileExplorer";
import { createProject, getProjects } from "../../dashboard/actions";
import { Play, Save, Loader2, CheckCircle2, Terminal as TermIcon, Files, Settings, Download, Search, X, AlertTriangle, FileCode, Maximize2, Minimize2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SUPPORTED_LANGUAGES = [
  { id: "JAVA", label: "Java", monaco: "java" },
  { id: "CPP", label: "C++", monaco: "cpp" },
  { id: "PYTHON", label: "Python", monaco: "python" },
];

function getLangFromPath(path: string) {
  if (path.endsWith('.java')) return 'java';
  if (path.endsWith('.cpp') || path.endsWith('.c') || path.endsWith('.h')) return 'cpp';
  if (path.endsWith('.py')) return 'python';
  if (path.endsWith('.js') || path.endsWith('.jsx')) return 'javascript';
  if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.xml')) return 'xml';
  if (path.endsWith('.md')) return 'markdown';
  return 'text';
}

function getFileName(path: string) {
  return path.split('/').pop() || path;
}

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

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // Editor State
  const [code, setCode] = useState("");
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [dirtyFiles, setDirtyFiles] = useState<Set<string>>(new Set());
  const [tree, setTree] = useState<FileNode | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [activityTab, setActivityTab] = useState<string>('explorer');

  // Modals
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const openProjectsModal = async () => {
    setShowProjectsModal(true);
    setLoadingProjects(true);
    setMenuOpen(null);
    const res = await getProjects();
    if (res && 'error' in res) {
      alert("Error loading projects: " + res.error);
    } else if (res) {
      setProjectsList(res);
    }
    setLoadingProjects(false);
  };

  // Bottom panel state
  const [bottomTab, setBottomTab] = useState<'problems' | 'output' | 'terminal'>('output');
  const [problems, setProblems] = useState<any[]>([]);

  const refreshTree = async () => {
    if (!projectId) return;
    const newTree = await getProjectTree(projectId);
    if (newTree && !newTree.error) {
      setTree(newTree);
      return newTree;
    }
    return null;
  };
  
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
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resizable sidebar (px)
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const sidebarDragging = useRef(false);

  const onSidebarDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    sidebarDragging.current = true;
    const startX = e.clientX;
    const startW = sidebarWidth;
    const onMove = (ev: MouseEvent) => {
      if (!sidebarDragging.current) return;
      setSidebarWidth(Math.min(450, Math.max(160, startW + (ev.clientX - startX))));
    };
    const onUp = () => {
      sidebarDragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [sidebarWidth]);

  // Resizable console height
  const [consoleHeight, setConsoleHeight] = useState(200);
  const consoleDragging = useRef(false);

  const onConsoleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    consoleDragging.current = true;
    const startY = e.clientY;
    const startH = consoleHeight;
    const onMove = (ev: MouseEvent) => {
      if (!consoleDragging.current) return;
      setConsoleHeight(Math.min(600, Math.max(80, startH + (startY - ev.clientY))));
    };
    const onUp = () => {
      consoleDragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [consoleHeight]);

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
    refreshTree().then(loadedTree => {
      if (loadedTree) {
        let firstFile: string | null = null;
        const findFirst = (node: any): boolean => {
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
        findFirst(loadedTree);
        
        if (firstFile) {
          openFile(firstFile);
        }
      }
    });
  }, [projectId]);

  const openFile = async (path: string) => {
    // Add to open tabs if not already open
    setOpenTabs(prev => prev.includes(path) ? prev : [...prev, path]);
    setActiveFilePath(path);

    // Load content if not already loaded
    if (!fileContents[path] && projectId) {
      const content = await readFile(projectId, path);
      if (typeof content === "string") {
        setFileContents(prev => ({ ...prev, [path]: content }));
        setCode(content);
      }
    } else {
      setCode(fileContents[path] || "");
    }
  };

  const closeTab = (path: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenTabs(prev => {
      const next = prev.filter(p => p !== path);
      if (activeFilePath === path) {
        const newActive = next.length > 0 ? next[next.length - 1] : null;
        setActiveFilePath(newActive);
        setCode(newActive ? (fileContents[newActive] || "") : "");
      }
      return next;
    });
    setDirtyFiles(prev => { const n = new Set(prev); n.delete(path); return n; });
  };

  const handleSelectFile = async (path: string) => {
    // Save current file before switching
    if (activeFilePath && projectId && dirtyFiles.has(activeFilePath)) {
      await writeFile(projectId, activeFilePath, code);
      setDirtyFiles(prev => { const n = new Set(prev); n.delete(activeFilePath!); return n; });
    }
    // Store current content
    if (activeFilePath) {
      setFileContents(prev => ({ ...prev, [activeFilePath!]: code }));
    }
    await openFile(path);
  };

  const handleCreateFile = async (path: string, type: string) => {
    if (!projectId) return;
    
    let cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    if (type === 'file' && !cleanPath.includes('.')) {
      const lang = initialProject?.language;
      if (lang === 'JAVA') cleanPath += '.java';
      else if (lang === 'CPP' || lang === 'C') cleanPath += '.cpp';
      else if (lang === 'PYTHON') cleanPath += '.py';
      else if (lang === 'JAVASCRIPT') cleanPath += '.js';
    }

    await createFile(projectId, cleanPath, type);
    
    if (type === 'file' && initialProject?.language === 'JAVA' && cleanPath.endsWith('.java')) {
      const fileName = cleanPath.split('/').pop() || '';
      const className = fileName.replace('.java', '');
      const template = `public class ${className} {\n    \n}\n`;
      await writeFile(projectId, cleanPath, template);
      setFileContents(prev => ({ ...prev, [cleanPath]: template }));
      if (activeFilePath === cleanPath) {
        setCode(template);
      }
    }
    
    await refreshTree();
    if (type === 'file') {
      await openFile(cleanPath);
    }
  };

  const handleDeleteFile = async (path: string) => {
    if (!projectId) return;
    await deleteFile(projectId, path);
    await refreshTree();
    if (openTabs.includes(path)) {
      closeTab(path);
    }
  };

  const handleRenameFile = async (oldPath: string, newPath: string) => {
    if (!projectId) return;
    await renameFile(projectId, oldPath, newPath);
    await refreshTree();
    if (activeFilePath === oldPath) {
      setActiveFilePath(newPath);
    }
    setOpenTabs(prev => prev.map(p => p === oldPath ? newPath : p));
  };

  const handleCreateProject = async () => {
    if (!createName) return;
    setLoading(true);
    const res = await createProject({ name: createName, language: createLang });
    setLoading(false);
    if (res && 'error' in res) {
      alert("Error: " + res.error + ". This might happen if your database was reset. Please log out and log back in!");
    } else if (res && 'projectId' in res) {
      window.location.href = `/editor/${res.projectId}`;
    }
  };

  const handleSave = async () => {
    if (!projectId || !activeFilePath) return;
    setSaving(true);
    setSaved(false);
    
    // Strip leading slash if present
    const cleanPath = activeFilePath.startsWith('/') ? activeFilePath.slice(1) : activeFilePath;
    const res = await writeFile(projectId, cleanPath, code);
    
    setSaving(false);
    if (!res.error) {
      setSaved(true);
      setDirtyFiles(prev => { const n = new Set(prev); n.delete(activeFilePath); return n; });
      setFileContents(prev => ({ ...prev, [activeFilePath]: code }));
      setTimeout(() => setSaved(false), 2000);

      // Run diagnostics on save
      if (editorRef.current && monacoRef.current) {
        const diagRes = await runDiagnostics(projectId, cleanPath, code);
        console.log("diagnostics response:", diagRes);
        if (diagRes && diagRes.diagnosticsByFile) {
          const fileDiags = diagRes.diagnosticsByFile[cleanPath] || [];
          console.log("fileDiags for", cleanPath, ":", fileDiags);
          const model = editorRef.current.getModel();
          if (model) {
            const markers = fileDiags.map((d: any) => {
              const startCol = d.column && d.column > 0 ? d.column : (model.getLineFirstNonWhitespaceColumn(d.line) || 1);
              const endCol = d.column && d.column > 0 ? d.column + 1 : (model.getLineLastNonWhitespaceColumn(d.line) || 11);
              return {
                severity: String(d.severity).toLowerCase() === "error" ? monacoRef.current.MarkerSeverity.Error : monacoRef.current.MarkerSeverity.Warning,
                startLineNumber: d.line,
                startColumn: startCol,
                endLineNumber: d.line,
                endColumn: endCol,
                message: d.message,
              };
            });
            monacoRef.current.editor.setModelMarkers(model, "diagnostics", markers);
            setProblems(fileDiags);
          }
        } else {
          setProblems([]);
        }
      }
    }
  };

  const handleRunStatic = async () => {
    if (!projectId) return;
    // Auto-save before run
    if (activeFilePath) {
      await handleSave();
    }
    setLoading(true);
    setBottomTab('output');
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
    // Auto-save before run
    if (activeFilePath) {
      await handleSave();
    }
    setLoading(true);
    setStreamRunning(true);
    setBottomTab('terminal');
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
        if (done) { finish(); break; }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) { currentEvent = ""; continue; }

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
    if (interactiveMode) handleRunStream();
    else handleRunStatic();
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
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.addAction({
      id: "save-project",
      label: "Save Project",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => { if (!saving) saveRef.current(); }
    });

    editor.addAction({
      id: "run-project",
      label: "Run Project",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => { if (!loading) runRef.current(); }
    });
  };

  // Track code changes for dirty state
  const onCodeChange = (val: string | undefined) => {
    const v = val || "";
    setCode(v);
    if (activeFilePath) {
      const original = fileContents[activeFilePath];
      if (original !== undefined && v !== original) {
        setDirtyFiles(prev => new Set(prev).add(activeFilePath!));
      } else {
        setDirtyFiles(prev => { const n = new Set(prev); n.delete(activeFilePath!); return n; });
      }
    }
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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.vscode-menu')) setMenuOpen(null);
    };
    if (menuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  /* ── Modals & Blank State ─────────────────────────────────── */
  if (!projectId && !showProjectsModal && !showCreateModal) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full p-4 bg-background">
        <div className="bg-surface border border-outline-variant rounded-xl p-8 max-w-[448px] w-full shadow-md text-on-surface">
          <h2 className="text-2xl font-bold mb-6 font-headline-md">Create New Project</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Project Name</label>
              <input type="text" value={createName} onChange={e => setCreateName(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded p-2 text-on-surface focus:outline-none focus:border-primary"
                placeholder="My Awesome Project" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Language</label>
              <select value={createLang} onChange={e => setCreateLang(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded p-2 text-on-surface focus:outline-none focus:border-primary">
                {SUPPORTED_LANGUAGES.map(l => (<option key={l.id} value={l.id}>{l.label}</option>))}
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowProjectsModal(true)}
                className="flex-1 bg-surface-variant text-on-surface py-2 rounded font-semibold hover:bg-surface-container-highest transition-colors">
                Open Projects
              </button>
              <button onClick={handleCreateProject} disabled={loading || !createName.trim()}
                className="flex-1 bg-primary text-on-primary py-2 rounded font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 className="animate-spin" size={16} />}
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const consoleText = consoleLines.join("\n");
  const showExplorer = activityTab === 'explorer';

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-[#1e1e1e]" style={{ overflow: "hidden" }}>
      
      {/* ═══ TOP MENU BAR ═══ */}
      <div className="h-9 bg-[#181818] border-b border-[#2b2b2b] flex items-center px-3 shrink-0 text-[13px] text-[#cccccc] select-none z-20 relative">
        <div className="flex items-center gap-0.5 z-10">
          <img src="/icon.svg" className="w-4 h-4 mr-2 opacity-80" alt="" />
          
          {/* File Menu */}
          <div className="relative vscode-menu">
            <button className={`px-2 py-1 rounded hover:bg-[#2a2d2e] ${menuOpen === 'File' ? 'bg-[#2a2d2e]' : ''}`}
              onClick={() => setMenuOpen(menuOpen === 'File' ? null : 'File')}>File</button>
            {menuOpen === 'File' && (
              <div className="absolute top-full left-0 mt-px w-56 bg-[#252526] border border-[#454545] shadow-xl rounded py-1 z-50 text-[13px]">
                <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => { setShowCreateModal(true); setMenuOpen(null); }}>New Project</div>
                <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={openProjectsModal}>Open Projects</div>
                {projectId && <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => { router.push('/editor'); setMenuOpen(null); }}>Close Project</div>}
                <div className="h-px bg-[#454545] my-1" />
                <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer flex justify-between"
                  onClick={() => { handleSave(); setMenuOpen(null); }}>
                  <span>Save</span><span className="text-[#858585] text-xs">Ctrl+S</span>
                </div>
                <div className="h-px bg-[#454545] my-1" />
                <a href={`/api/projects/${projectId}/download`} className="block px-6 py-1.5 hover:bg-[#094771] cursor-pointer"
                  onClick={() => setMenuOpen(null)}>
                  <span className="flex items-center gap-2"><Download size={14} /> Download ZIP</span>
                </a>
              </div>
            )}
          </div>

          <div className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer hidden sm:block">Edit</div>
          <div className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer hidden sm:block">Selection</div>
          <div className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer hidden sm:block">View</div>
          <div className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer hidden sm:block">Go</div>
          
          {/* Run Menu */}
          <div className="relative vscode-menu">
            <button className={`px-2 py-1 rounded hover:bg-[#2a2d2e] ${menuOpen === 'Run' ? 'bg-[#2a2d2e]' : ''}`}
              onClick={() => setMenuOpen(menuOpen === 'Run' ? null : 'Run')}>Run</button>
            {menuOpen === 'Run' && (
              <div className="absolute top-full left-0 mt-px w-56 bg-[#252526] border border-[#454545] shadow-xl rounded py-1 z-50 text-[13px]">
                <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer flex justify-between"
                  onClick={() => { handleRun(); setMenuOpen(null); }}>
                  <span className="flex items-center gap-2"><Play size={14} className="text-green-400" /> Run Project</span>
                  <span className="text-[#858585] text-xs">Ctrl+Enter</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer hidden sm:block">Terminal</div>
          <div className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer hidden sm:block">Help</div>
        </div>
        
        {/* Center search bar */}
        <div className="flex-1 flex justify-center pointer-events-none hidden md:flex">
          <div className="px-4 py-1 rounded bg-[#2d2d2d] border border-[#3c3c3c] text-xs flex items-center gap-2 max-w-xs w-full justify-center">
            <Search size={12} className="text-[#858585]"/>
            <span className="text-[#858585] truncate">{initialProject?.name || "CodePad Project"}</span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="flex items-center gap-1.5 text-[11px] text-[#cccccc] cursor-pointer hover:text-white">
            <input type="checkbox" checked={interactiveMode} onChange={(e) => setInteractiveMode(e.target.checked)}
              className="accent-[#007acc] w-3 h-3" />
            <span className="hidden lg:inline">Interactive Mode</span>
          </label>
          <div className="w-px h-4 bg-[#454545]" />
          <button onClick={toggleFullscreen} className="text-[#cccccc] hover:text-white flex items-center" title="Toggle Fullscreen (F11)">
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <div className="w-px h-4 bg-[#454545]" />
          {saving ? <Loader2 size={14} className="animate-spin text-[#858585]" /> : saved ? <CheckCircle2 size={14} className="text-green-400" /> : null}
          <button onClick={handleRun} disabled={loading} className="text-[#cccccc] hover:text-white flex items-center" title="Run (Ctrl+Enter)">
            {loading ? <Loader2 size={16} className="animate-spin text-[#858585]" /> : <Play size={16} className="text-green-400" />}
          </button>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        
        {/* ── Activity Bar ── */}
        <div className="w-12 bg-[#181818] border-r border-[#2b2b2b] flex flex-col items-center py-1 shrink-0">
          <button className={`p-2 rounded mb-1 relative transition-colors ${activityTab === 'explorer' ? 'text-white' : 'text-[#858585] hover:text-white'}`}
            onClick={() => setActivityTab(activityTab === 'explorer' ? '' : 'explorer')} title="Explorer (Ctrl+Shift+E)">
            <Files size={22} strokeWidth={1.5} />
            {activityTab === 'explorer' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r" />}
          </button>
          <div className="flex-1" />
          <Link href="/settings">
            <button className="p-2 rounded text-[#858585] hover:text-white transition-colors" title="Settings">
              <Settings size={22} strokeWidth={1.5} />
            </button>
          </Link>
        </div>

        {/* ── File Explorer Sidebar ── */}
        {showExplorer && (
          <>
            <div style={{ width: sidebarWidth }} className="h-full overflow-hidden shrink-0 bg-[#252526]">
              <FileExplorer 
                tree={tree}
                activeFilePath={activeFilePath}
                onSelectFile={handleSelectFile}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onRenameFile={handleRenameFile}
                projectName={initialProject?.name}
              />
            </div>
            <div onMouseDown={onSidebarDragStart}
              className="w-[3px] hover:bg-[#007acc] cursor-col-resize transition-colors shrink-0 z-10" />
          </>
        )}

        {/* ── Editor + Bottom Panel (vertical) ── */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ minWidth: 0 }}>
          
          {/* ── Open File Tabs ── */}
          <div className="h-[35px] bg-[#252526] flex items-end shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {openTabs.map(tab => {
              const isActive = tab === activeFilePath;
              const isDirty = dirtyFiles.has(tab);
              return (
                <div key={tab}
                  className={`group flex items-center gap-1.5 px-3 h-[35px] cursor-pointer border-r border-[#1e1e1e] text-[13px] shrink-0 select-none transition-colors
                    ${isActive 
                      ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' 
                      : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2d2d2d]/80 border-t-2 border-t-transparent'}`}
                  onClick={() => handleSelectFile(tab)}
                >
                  <FileCode size={14} className={`shrink-0 ${isActive ? 'text-[#519aba]' : 'text-[#858585]'}`} />
                  <span className="truncate max-w-[120px]">{getFileName(tab)}</span>
                  {isDirty && <span className="text-white ml-1 shrink-0 font-bold">*</span>}
                  <button onClick={(e) => closeTab(tab, e)}
                    className={`p-0.5 rounded hover:bg-[#454545] shrink-0 ${isActive ? 'opacity-60 hover:opacity-100' : 'opacity-0 group-hover:opacity-60 hover:!opacity-100'}`}>
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── Code Editor Area ── */}
          <div className="flex-1 overflow-hidden" style={{ minHeight: 100 }}>
            {!editorReady ? (
              <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e] text-[#858585]">
                <Loader2 className="animate-spin" />
              </div>
            ) : activeFilePath ? (
              <Editor
                height="100%"
                language={getLangFromPath(activeFilePath)}
                theme={theme === 'dark' ? "vs-dark" : "light"}
                value={code}
                onChange={onCodeChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "var(--font-jetbrains-mono), 'Cascadia Code', 'Fira Code', Consolas, monospace",
                  padding: { top: 12 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  wordWrap: "on",
                  renderLineHighlight: "all",
                  bracketPairColorization: { enabled: true },
                  fixedOverflowWidgets: true,
                }}
                onMount={handleEditorMount}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e1e1e] text-[#858585] select-none gap-4">
                <div className="opacity-20 text-8xl font-bold">{"</>"}</div>
                <p className="text-sm">Select a file to start editing</p>
              </div>
            )}
          </div>

          {/* ── Console Drag Handle ── */}
          <div onMouseDown={onConsoleDragStart}
            className="h-[3px] hover:bg-[#007acc] cursor-row-resize transition-colors shrink-0 z-10 bg-[#252526]" />

          {/* ═══ BOTTOM PANEL ═══ */}
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
                  <input
                    type="text"
                    value={staticStdin}
                    onChange={(e) => setStaticStdin(e.target.value)}
                    placeholder="Enter input..."
                    className="bg-[#1e1e1e] border border-[#3c3c3c] rounded px-2 py-0.5 text-[12px] text-[#cccccc] outline-none focus:border-[#007acc] w-40"
                    disabled={loading}
                  />
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
                            className="flex-1 bg-transparent outline-none border-none text-[#d4d4d4] font-mono text-[13px] placeholder-white/20"
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
                          className="flex-1 bg-transparent outline-none border-none text-[#d4d4d4] font-mono text-[13px] placeholder-white/20"
                          placeholder="Type input..." autoFocus />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ STATUS BAR ═══ */}
      <div className="h-[22px] bg-[#181818] border-t border-[#2b2b2b] flex items-center px-3 text-[11px] text-[#cccccc] shrink-0 justify-between select-none">
        <div className="flex items-center gap-4">
          {problems.length > 0 ? (
            <span className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded" onClick={() => setBottomTab('problems')}>
              <AlertTriangle size={12} /> {problems.length}
            </span>
          ) : (
            <span className="flex items-center gap-1"><CheckCircle2 size={12} /> 0</span>
          )}
          {activeFilePath && <span>{activeFilePath}</span>}
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          {activeFilePath && <span>{getLangFromPath(activeFilePath).toUpperCase()}</span>}
          {!activeFilePath && initialProject?.language && <span>{initialProject.language}</span>}
        </div>
      </div>

      {/* ═══ MODALS ═══ */}
      {showProjectsModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-[#454545] rounded shadow-2xl w-full max-w-2xl flex flex-col max-h-[80vh]">
            <div className="px-4 py-3 border-b border-[#454545] flex items-center justify-between">
              <h2 className="text-[#cccccc] font-semibold text-sm">Open Project</h2>
              <button onClick={() => setShowProjectsModal(false)} className="text-[#858585] hover:text-white"><X size={16}/></button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {loadingProjects ? (
                <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin text-[#007acc]" size={24}/></div>
              ) : projectsList.length === 0 ? (
                <div className="text-center text-[#858585] p-8">No projects found.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectsList.map(p => (
                    <div key={p.projectId} onClick={() => { setShowProjectsModal(false); window.location.href = `/editor/${p.projectId}`; }}
                      className="bg-[#1e1e1e] border border-[#3c3c3c] hover:border-[#007acc] rounded p-3 cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-[#cccccc] font-semibold truncate group-hover:text-[#007acc]">{p.name || "Untitled"}</h3>
                        <span className="text-[10px] bg-[#3c3c3c] px-1.5 py-0.5 rounded text-[#cccccc]">{p.language}</span>
                      </div>
                      <div className="text-[#858585] text-xs">ID: {p.projectId.substring(0,8)}...</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-[#454545] rounded shadow-2xl w-full max-w-sm flex flex-col">
            <div className="px-4 py-3 border-b border-[#454545] flex items-center justify-between">
              <h2 className="text-[#cccccc] font-semibold text-sm">New Project</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#858585] hover:text-white"><X size={16}/></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#858585] mb-1">Project Name</label>
                <input type="text" value={createName} onChange={e => setCreateName(e.target.value)}
                  className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-[#cccccc] focus:outline-none focus:border-[#007acc] text-sm"
                  placeholder="My Awesome Project" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#858585] mb-1">Language</label>
                <select value={createLang} onChange={e => setCreateLang(e.target.value)}
                  className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-[#cccccc] focus:outline-none focus:border-[#007acc] text-sm">
                  {SUPPORTED_LANGUAGES.map(l => (<option key={l.id} value={l.id}>{l.label}</option>))}
                </select>
              </div>
              <button onClick={async () => {
                await handleCreateProject();
                setShowCreateModal(false);
              }} disabled={loading || !createName.trim()}
                className="w-full bg-[#007acc] text-white py-2 rounded text-sm hover:bg-[#005f9e] transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 className="animate-spin" size={14} />} Create Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
