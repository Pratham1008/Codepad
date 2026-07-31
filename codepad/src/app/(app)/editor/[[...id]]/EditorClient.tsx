"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Files, FileCode, Loader2 } from "lucide-react";

import { writeFile, runDiagnostics, createProject, getProjects } from "../actions";
import { FileExplorer } from "./FileExplorer";
import { useThemeTransition } from "@/components/theme-provider";
import { useDiagnosticsSocket } from "./useDiagnosticsSocket";
import { EditorSkeleton } from "@/components/EditorSkeleton";
import { defineCodepadMonacoThemes, resolveMonacoThemeName } from "@/lib/monaco-theme";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

import { getLangFromPath } from "./editor-utils";
import { useEditorState } from "./useEditorState";
import { useRunExecution } from "./useRunExecution";
import { useResizable } from "./useResizable";

import { EditorMenuBar } from "./EditorMenuBar";
import { EditorActivityBar } from "./EditorActivityBar";
import { EditorTabBar } from "./EditorTabBar";
import { EditorBottomPanel } from "./EditorBottomPanel";
import { EditorStatusBar } from "./EditorStatusBar";
import { EditorModals } from "./EditorModals";

export function EditorClient({ 
  projectId, 
  initialProject,
  token = ""
}: { 
  projectId: string | null; 
  initialProject: { projectId?: string; name?: string; language?: string } | null;
  token?: string;
}) {
  const router = useRouter();
  const { theme, toggleTheme, resolvedTheme } = useThemeTransition();

  const handleLogout = async () => {
    const { signOut } = await import("firebase/auth");
    const { auth } = await import("@/lib/firebase");
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Firebase signout error:", e);
    }
    const { logout } = await import("@/app/auth/actions");
    await logout();
    router.push("/");
  };

  const [createName, setCreateName] = useState("");
  const [createLang, setCreateLang] = useState("JAVA");
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showProblemsModal, setShowProblemsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const [bottomTab, setBottomTab] = useState<'problems' | 'output' | 'terminal'>('output');
  const [problems, setProblems] = useState<any[]>([]);
  const [editorReady, setEditorReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStdinModal, setShowStdinModal] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"explorer" | "editor" | "console">("editor");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setEditorReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  const openProjectsModal = async () => {
    setShowProjectsModal(true);
    setLoadingProjects(true);
    setProjectsError(null);
    setMenuOpen(null);
    try {
      const res = await getProjects();
      if (res?.error) {
        setProjectsError(res.error);
        setProjectsList([]);
      } else {
        setProjectsList(res?.projects ?? []);
      }
    } catch (err) {
      setProjectsError("Couldn't reach the server. Please try again.");
      setProjectsList([]);
    }
    setLoadingProjects(false);
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

  const applyDiagnostics = (diagRes: any, cleanPath: string) => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;
    const fileDiags = (diagRes?.diagnosticsByFile?.[cleanPath]) || [];
    const markers = fileDiags.map((d: any) => {
      const startCol = d.column && d.column > 0 ? d.column : (model.getLineFirstNonWhitespaceColumn(d.line) || 1);
      const endCol = d.column && d.column > 0 ? d.column + 1 : (model.getLineLastNonWhitespaceColumn(d.line) || 11);
      return {
        severity: String(d.severity).toLowerCase() === "error" ? monacoRef.current.MarkerSeverity.Error : monacoRef.current.MarkerSeverity.Warning,
        startLineNumber: d.line, startColumn: startCol, endLineNumber: d.line, endColumn: endCol,
        message: d.message,
      };
    });
    monacoRef.current.editor.setModelMarkers(model, "diagnostics", markers);
    setProblems(fileDiags);
  };

  const sessionKey = projectId ? `project:${projectId}` : null;
  const currentLanguage = initialProject?.language || "JAVA";
  const { check: checkLive, status: connectionStatus } = useDiagnosticsSocket(
    sessionKey, 
    currentLanguage, 
    async () => {
      const { auth } = await import("@/lib/firebase");
      return auth.currentUser ? await auth.currentUser.getIdToken() : token;
    }, 
    (diags) => {
      console.log("diagnostics response:", diags);
      if (activeFilePath) {
        const cleanPath = activeFilePath.startsWith('/') ? activeFilePath.slice(1) : activeFilePath;
        applyDiagnostics({ diagnosticsByFile: { [cleanPath]: diags } }, cleanPath);
      }
    }
  );

  const {
    code,
    activeFilePath,
    openTabs,
    fileContents,
    dirtyFiles,
    setDirtyFiles,
    setFileContents,
    tree,
    menuOpen, setMenuOpen,
    activityTab, setActivityTab,
    refreshTree,
    openFile,
    closeTab,
    handleSelectFile,
    handleCreateFile,
    handleDeleteFile,
    handleRenameFile,
    onCodeChange,
  } = useEditorState(projectId, initialProject, checkLive);

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

  const handleSave = async () => {
    if (!projectId || !activeFilePath) return;
    setSaving(true);
    setSaved(false);
    setSaveError(false);
    
    const cleanPath = activeFilePath.startsWith('/') ? activeFilePath.slice(1) : activeFilePath;
    const res = await writeFile(projectId, cleanPath, code);
    
    setSaving(false);
    if (!res.error) {
      setSaved(true);
      setDirtyFiles(prev => { const n = new Set(prev); n.delete(activeFilePath); return n; });
      setFileContents(prev => ({ ...prev, [activeFilePath]: code }));
      setTimeout(() => setSaved(false), 2000);

      if (editorRef.current && monacoRef.current) {
        const diagRes = await runDiagnostics(projectId, cleanPath, code, "full");
        console.log("diagnostics response:", diagRes);
        if (diagRes && diagRes.diagnosticsByFile) {
          applyDiagnostics(diagRes, cleanPath);
        }
      } else {
        setProblems([]);
      }
    } else {
      setSaveError(true);
      setTimeout(() => setSaveError(false), 3000);
    }
  };

  const {
    output,
    interactiveMode, setInteractiveMode,
    staticStdin, setStaticStdin,
    sessionId,
    consoleLines,
    currentLine, setCurrentLine,
    streamRunning,
    loading, setLoading,
    consoleRef,
    consoleInputRef,
    handleRun: originalHandleRun,
    handleConsoleKeyDown,
  } = useRunExecution(projectId, activeFilePath, handleSave, setBottomTab);

  const handleRun = () => {
    if (isMobile) setMobilePanel("console");
    originalHandleRun();
  };

  const {
    sidebarWidth,
    onSidebarDragStart,
    consoleHeight,
    onConsoleDragStart,
  } = useResizable();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
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

  const showExplorer = activityTab === 'explorer';
  const consoleText = useMemo(() => consoleLines.join("\n"), [consoleLines]);

  const handleMobileSelectFile = useCallback((path: string) => {
    handleSelectFile(path);
    setMobilePanel("editor");
  }, [handleSelectFile]);

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-[#1e1e1e]" style={{ overflow: "hidden" }}>
      <EditorMenuBar 
        initialProject={initialProject}
        projectId={projectId}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setShowCreateModal={setShowCreateModal}
        openProjectsModal={openProjectsModal}
        setShowProblemsModal={setShowProblemsModal}
        handleSave={handleSave}
        handleRun={handleRun}
        interactiveMode={interactiveMode}
        setInteractiveMode={setInteractiveMode}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        saving={saving}
        saved={saved}
        saveError={saveError}
        loading={loading}
      />

      <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        <EditorActivityBar 
          activityTab={activityTab}
          setActivityTab={setActivityTab}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          theme={theme}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
        />

        {isMobile ? (
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            <div className="flex border-b border-[#3c3c3c] bg-[#252526] shrink-0">
              {(["explorer", "editor", "console"] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setMobilePanel(p)}
                  className={`flex-1 py-2 text-xs uppercase tracking-wide ${
                    mobilePanel === p ? "text-[#007acc] border-b-2 border-[#007acc]" : "text-[#858585]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col relative w-full">
              {mobilePanel === "explorer" && (
                <FileExplorer
                  tree={tree}
                  activeFilePath={activeFilePath}
                  onSelectFile={handleMobileSelectFile}
                  onCreateFile={handleCreateFile}
                  onDeleteFile={handleDeleteFile}
                  onRenameFile={handleRenameFile}
                  projectName={initialProject?.name}
                />
              )}
              {mobilePanel === "editor" && activeFilePath && (
                <Editor
                  height="100%"
                  language={getLangFromPath(activeFilePath)}
                  theme={resolveMonacoThemeName(resolvedTheme)}
                  beforeMount={defineCodepadMonacoThemes}
                  value={code}
                  onChange={onCodeChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbersMinChars: 2,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    fixedOverflowWidgets: true,
                    quickSuggestions: false,
                    hover: { enabled: false }
                  }}
                  onMount={handleEditorMount}
                />
              )}
              {mobilePanel === "editor" && !activeFilePath && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e1e1e] text-[#858585] select-none gap-4">
                  <div className="opacity-20 text-6xl font-bold">{"</>"}</div>
                  <p className="text-sm">Select a file</p>
                </div>
              )}
              {mobilePanel === "console" && (
                <EditorBottomPanel
                  consoleHeight={window.innerHeight - 160}
                  bottomTab={bottomTab}
                  setBottomTab={setBottomTab}
                  problems={problems}
                  interactiveMode={interactiveMode}
                  staticStdin={staticStdin}
                  setStaticStdin={setStaticStdin}
                  loading={loading}
                  consoleText={consoleText}
                  streamRunning={streamRunning}
                  sessionId={sessionId}
                  consoleInputRef={consoleInputRef}
                  currentLine={currentLine}
                  setCurrentLine={setCurrentLine}
                  handleConsoleKeyDown={handleConsoleKeyDown}
                  consoleRef={consoleRef}
                  output={output}
                  setShowStdinModal={setShowStdinModal}
                />
              )}
            </div>
          </div>
        ) : (
          <>
            {showExplorer && (
              <>
                <div style={{ width: sidebarWidth }} className="h-full overflow-hidden shrink-0 bg-[#252526]">
                  {projectId ? (
                    <FileExplorer 
                      tree={tree}
                      activeFilePath={activeFilePath}
                      onSelectFile={handleSelectFile}
                      onCreateFile={handleCreateFile}
                      onDeleteFile={handleDeleteFile}
                      onRenameFile={handleRenameFile}
                      projectName={initialProject?.name}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center text-[#858585]">
                      <Files size={28} className="mb-2" />
                      <p className="text-xs mb-2">No folder open</p>
                      <button onClick={openProjectsModal} className="text-[#007acc] text-xs font-semibold hover:underline">
                        Open a project
                      </button>
                    </div>
                  )}
                </div>
                <div onMouseDown={onSidebarDragStart}
                  onTouchStart={onSidebarDragStart}
                  className="w-[3px] hover:bg-[#007acc] cursor-col-resize transition-colors shrink-0 z-10" />
              </>
            )}

            <div className="flex-1 flex flex-col overflow-hidden" style={{ minWidth: 0 }}>
              <EditorTabBar 
                openTabs={openTabs}
                activeFilePath={activeFilePath}
                dirtyFiles={dirtyFiles}
                handleSelectFile={handleSelectFile}
                closeTab={closeTab}
              />

              <div className="flex-1 overflow-hidden" style={{ minHeight: 100 }}>
                {!projectId ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e1e1e] text-center p-4">
                    <FileCode size={56} className="text-[#3c3c3c] mb-4" />
                    <h2 className="text-[#cccccc] font-semibold text-lg mb-1">No project open</h2>
                    <p className="text-[#858585] text-sm mb-6 max-w-[320px]">Open an existing project or create a new one to start coding.</p>
                    <div className="flex gap-3">
                      <button onClick={openProjectsModal}
                        className="px-4 py-2 rounded bg-[#2d2d2d] border border-[#3c3c3c] text-[#cccccc] font-semibold hover:border-[#007acc] transition-colors">
                        Open Project
                      </button>
                      <button onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 rounded bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-colors">
                        New Project
                      </button>
                    </div>
                  </div>
                ) : !editorReady ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e] text-[#858585]">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : activeFilePath ? (
                  <Editor
                    height="100%"
                    language={getLangFromPath(activeFilePath)}
                    theme={resolveMonacoThemeName(resolvedTheme)}
                    beforeMount={defineCodepadMonacoThemes}
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

              <div onMouseDown={onConsoleDragStart}
                onTouchStart={onConsoleDragStart}
                className="h-[3px] hover:bg-[#007acc] cursor-row-resize transition-colors shrink-0 z-10 bg-[#252526]" />

              <EditorBottomPanel 
                consoleHeight={consoleHeight}
                bottomTab={bottomTab}
                setBottomTab={setBottomTab}
                problems={problems}
                interactiveMode={interactiveMode}
                staticStdin={staticStdin}
                setStaticStdin={setStaticStdin}
                loading={loading}
                consoleText={consoleText}
                streamRunning={streamRunning}
                sessionId={sessionId}
                consoleInputRef={consoleInputRef}
                currentLine={currentLine}
                setCurrentLine={setCurrentLine}
                handleConsoleKeyDown={handleConsoleKeyDown}
                consoleRef={consoleRef}
                output={output}
                setShowStdinModal={setShowStdinModal}
              />
            </div>
          </>
        )}
      </div>

      <EditorStatusBar 
        problems={problems}
        setBottomTab={setBottomTab}
        activeFilePath={activeFilePath}
        connectionStatus={connectionStatus}
        initialProject={initialProject}
      />

      <EditorModals 
        showProjectsModal={showProjectsModal}
        setShowProjectsModal={setShowProjectsModal}
        loadingProjects={loadingProjects}
        projectsError={projectsError}
        projectsList={projectsList}
        
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        createName={createName}
        setCreateName={setCreateName}
        createLang={createLang}
        setCreateLang={setCreateLang}
        handleCreateProject={handleCreateProject}
        loading={loading}
        
        showProblemsModal={showProblemsModal}
        setShowProblemsModal={setShowProblemsModal}
        token={token}

        showStdinModal={showStdinModal}
        setShowStdinModal={setShowStdinModal}
        staticStdin={staticStdin}
        setStaticStdin={setStaticStdin}
      />
    </div>
  );
}
