"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Editor from "@monaco-editor/react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ExampleBlock } from "@/components/ExampleBlock";
import { Play, Send, CheckCircle2, XCircle, Clock, AlertTriangle, Home, ChevronRight, Hash, Files, Code, Bug, Settings, Menu, FileCode, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ProblemsModal } from "@/components/ProblemsModal";
import { runSamples, submitSolution } from "../actions";
import { getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function SolveClient({ problem, token }: { problem: any; token: string }) {
  const router = useRouter();
  const availableLanguages = Object.keys(problem.starterCode || {});
  const [language, setLanguage] = useState(availableLanguages.includes("JAVA") ? "JAVA" : (availableLanguages[0] || "JAVA"));
  const [code, setCode] = useState(problem.starterCode?.[availableLanguages.includes("JAVA") ? "JAVA" : availableLanguages[0]] || "");
  const [verdict, setVerdict] = useState<any>(null);
  const [isJudging, setIsJudging] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [activeTestCase, setActiveTestCase] = useState<number | null>(0);
  const [runType, setRunType] = useState<'run' | 'submit' | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current.getAction('editor.foldAllMarkerRegions')?.run();
      }, 50);
    }
  }, [language]);
  
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [showProblemsModal, setShowProblemsModal] = useState(false);
  const [bottomTab, setBottomTab] = useState<'testcases' | 'result' | 'submissions'>('testcases');
  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
  }>({ isOpen: false, title: '', message: '', type: 'alert' });

  const showAlert = (title: string, message: string) => {
    setModalConfig({ isOpen: true, title, message, type: 'alert' });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setModalConfig({ isOpen: true, title, message, type: 'confirm', onConfirm });
  };

  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
  const loadHistory = async () => {
    setBottomTab('submissions');
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/problems/${problem.problemId}/submissions?size=50`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissionHistory(data.content || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    let ws: WebSocket | null = null;
    let isActive = true;

    const setupWs = async () => {
      let wsBase = process.env.NEXT_PUBLIC_WS_URL;
      if (!wsBase && process.env.NEXT_PUBLIC_API_URL) {
          wsBase = process.env.NEXT_PUBLIC_API_URL.replace("http", "ws") + "/api/projects/diagnostics/stream";
      }
      if (!wsBase) {
          const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
          if (window.location.port === '3000') {
              wsBase = `${protocol}//${window.location.hostname}:8080/api/projects/diagnostics/stream`;
          } else {
              wsBase = `${protocol}//${window.location.host}/api/projects/diagnostics/stream`;
          }
      }
      
      let currentToken = token;
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          currentToken = await currentUser.getIdToken(true) || token;
        }
      } catch (e) {
        console.error("Failed to get fresh token for WS", e);
      }
      
      if (!isActive) return;

      const wsUrl = `${wsBase}?sessionKey=solve:${problem.problemId}&language=${language}&token=${currentToken}`;
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === "submissionResult") {
            setIsJudging(false);
            setVerdict(payload.data.result);
            setBottomTab('result');
            
            if (payload.data.result.verdict !== 'AC') {
              const firstFailIdx = payload.data.result.results?.findIndex((r: any) => r.verdict !== 'AC');
              if (firstFailIdx !== undefined && firstFailIdx !== -1) setActiveTestCase(firstFailIdx);
            } else {
              setActiveTestCase(0);
            }
          } else if (payload.type === "testCaseResult") {
            setTestResults(prev => {
              const exists = prev.find(p => p.testCaseId === payload.data.testCaseId);
              if (exists) return prev.map(p => p.testCaseId === payload.data.testCaseId ? payload.data : p);
              return [...prev, payload.data];
            });
          }
        } catch (e) {
          console.error("WS parsing error", e);
        }
      };
    };

    setupWs();

    return () => {
      isActive = false;
      if (ws) ws.close();
    };
  }, [problem.problemId, language, token]);

  const handleRun = async () => {
    setVerdict(null);
    setTestResults([]);
    setActiveTestCase(0);
    setIsJudging(true);
    setRunType('run');
    setBottomTab('result');
    try {
      const data = await runSamples(problem.problemId, language, code);
      if (data.error) {
        showAlert("Run Failed", data.error);
        setIsJudging(false);
        return;
      }
      setVerdict(data);
      if (data.results) setTestResults(data.results);
    } catch (e) {
      console.error("Run error", e);
      showAlert("Run Failed", "Failed to run code.");
      setIsJudging(false);
    } finally {
      setIsJudging(false);
    }
  };

  const handleSubmit = async () => {
    setVerdict(null);
    setTestResults([]);
    setActiveTestCase(0);
    setIsJudging(true);
    setRunType('submit');
    setBottomTab('result');
    try {
      const data = await submitSolution(problem.problemId, language, code);
      
      if (data.error) {
        showAlert("Submission Failed", data.error);
        setIsJudging(false);
        return;
      }
      
      // Fallback timeout in case WebSocket message never arrives
      setTimeout(() => {
        setIsJudging((prev) => {
          if (prev) {
            setVerdict({ verdict: 'SYSTEM_ERROR', message: 'Evaluation timed out.' });
            return false;
          }
          return prev;
        });
      }, 15000);
      
    } catch (e) {
      console.error("Error during submission:", e);
      setIsJudging(false);
      showAlert("Network Error", "Network error. Please check your connection.");
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#1e1e1e]" style={{ overflow: "hidden" }}>
      {/* TOP MENU BAR (Matches EditorClient) */}
      <div className="h-9 bg-[#181818] border-b border-[#2b2b2b] flex items-center px-3 shrink-0 text-[13px] text-[#cccccc] select-none z-20 relative">
        <div className="flex items-center gap-0.5 z-10">
          <img src="/icon.svg" className="w-4 h-4 mr-2 opacity-80" alt="" />
          <Link href="/editor" className="px-2 py-1 rounded hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white flex items-center gap-1">
            <Home size={13} />
          </Link>
          <ChevronRight size={13} className="text-[#5a5a5a] mx-0.5" />
          <span className="px-1 text-[#cccccc]/80 truncate max-w-[140px]">Problems</span>
          <ChevronRight size={13} className="text-[#5a5a5a] mx-0.5" />
          <span className="px-1 text-white font-semibold truncate max-w-[140px]">{problem.title}</span>
          <div className="w-px h-4 bg-[#454545] mx-1" />
          
          <div className="relative vscode-menu">
            <button className={`px-2 py-1 rounded hover:bg-[#2a2d2e] ${menuOpen === 'File' ? 'bg-[#2a2d2e]' : ''}`}
              onClick={() => setMenuOpen(menuOpen === 'File' ? null : 'File')}>File</button>
            {menuOpen === 'File' && (
              <div className="absolute top-full left-0 mt-px w-56 bg-[#252526] border border-[#454545] shadow-xl rounded py-1 z-50 text-[13px]">
                <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => { setShowProblemsModal(true); setMenuOpen(null); }}>Problem List</div>
                <div className="h-px bg-[#454545] my-1" />
                <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => router.push('/editor')}>Back to Editor</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 shrink-0 z-10 border-r border-[#2b2b2b]">
          <div className="w-12 h-12 flex items-center justify-center cursor-pointer text-white border-l-2 border-primary">
            <Hash size={24} strokeWidth={1.5} />
          </div>
        </div>

        {/* Left Pane - Problem Description */}
        <div className="w-96 bg-[#252526] flex flex-col border-r border-[#2b2b2b] shrink-0 z-10">
          <div className="h-9 px-4 flex items-center text-[11px] uppercase tracking-wider text-[#cccccc] font-semibold select-none border-b border-[#2b2b2b]">
            Description
          </div>
          <div className="flex-1 overflow-auto p-5 text-[#cccccc]">
            <h1 className="text-2xl font-semibold mb-2 text-white">{problem.title}</h1>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3c3c3c]">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                problem.difficulty === "EASY" ? "bg-emerald-500/20 text-emerald-400" :
                problem.difficulty === "MEDIUM" ? "bg-orange-500/20 text-orange-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {problem.difficulty}
              </span>
              <span className="text-zinc-400 text-xs">{problem.timeLimitMs}ms / {problem.memoryLimitMb}MB</span>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <MarkdownRenderer content={problem.description} />
            </div>
            
            <div className="mt-8 space-y-4">
              {problem.sampleTestCases?.map((tc: any, idx: number) => (
                <div key={tc.testCaseId} className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3">
                  <div className="font-semibold text-xs mb-2 text-white">Example {idx + 1}:</div>
                  <div className="mb-2">
                    <span className="text-zinc-500 text-xs">Input: </span>
                    <span className="font-mono text-xs">{tc.input}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-xs">Output: </span>
                    <span className="font-mono text-xs">{tc.expectedOutput}</span>
                  </div>
                  {tc.explanation && (
                    <div className="mt-2 text-xs text-zinc-400">
                      <span className="text-zinc-500">Explanation: </span> {tc.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Header */}
          <div className="h-9 flex items-center bg-[#1e1e1e] border-b border-[#2b2b2b]">
             <div className="px-4 py-2 text-[#cccccc] text-[13px] border-t-2 border-primary bg-[#1e1e1e] flex items-center gap-2 h-full">
                <FileCode size={14} className="text-[#519aba]" />
                Solution.{language.toLowerCase()}
             </div>
             
             <div className="ml-auto mr-4 flex items-center gap-3">
                <select 
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(problem.starterCode?.[e.target.value] || "");
                  }}
                  className="bg-[#2d2d2d] border border-[#3c3c3c] outline-none text-xs py-1 px-2 rounded text-zinc-300"
                >
                  {Object.keys(problem.starterCode || {}).map(lang => (
                    <option key={lang} value={lang}>{
                      lang === "JAVA" ? "Java" :
                      lang === "PYTHON" ? "Python" :
                      lang === "CPP" ? "C++" :
                      lang === "JAVASCRIPT" ? "JavaScript" : 
                      lang === "TYPESCRIPT" ? "TypeScript" :
                      lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
                    }</option>
                  ))}
                </select>
                <button onClick={handleRun} disabled={isJudging} className="flex items-center gap-1.5 px-3 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] border border-[#3c3c3c] disabled:opacity-50 text-xs font-medium rounded transition-colors text-zinc-300">
                  <Play className="w-3.5 h-3.5" /> Run
                </button>
                <button onClick={handleSubmit} disabled={isJudging} className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-medium rounded transition-colors text-white">
                  <Send className="w-3.5 h-3.5" /> Submit
                </button>
             </div>
          </div>

          {/* Monaco */}
          <div className="flex-1 relative">
            <Editor
              theme="vs-dark"
              language={language.toLowerCase()}
              value={code}
              onChange={(v) => setCode(v || "")}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                
                let lockDecorationsCollection = editor.createDecorationsCollection();

                const updateDecorations = () => {
                  const model = editor.getModel();
                  if (!model) return;
                  const text = model.getValue();
                  const lines = text.split('\n');
                  let locks: any[] = [];
                  let currentStart = -1;
                  
                  lines.forEach((line: string, i: number) => {
                    if (line.includes('// ---VERDICT_LOCK_START---')) {
                      currentStart = i + 1;
                    } else if (line.includes('// ---VERDICT_LOCK_END---') && currentStart !== -1) {
                      locks.push({
                        range: new monaco.Range(currentStart, 1, i + 1, line.length + 1),
                        options: {
                          isWholeLine: true,
                          className: 'locked-code-region',
                          hoverMessage: { value: 'This code is locked and cannot be edited.' }
                        }
                      });
                      currentStart = -1;
                    }
                  });
                  lockDecorationsCollection.set(locks);
                };

                updateDecorations();

                editor.onDidChangeModelContent((e: any) => {
                  // Only re-parse if lines were added/removed or large changes
                  updateDecorations();
                });

                editor.onKeyDown((e: any) => {
                  // block typing, backspace, delete, etc if inside locked range
                  const selections = editor.getSelections();
                  if (!selections) return;
                  
                  // KeyCodes: Backspace=1, Tab=2, Enter=3, Delete=20, letters etc.
                  // Only allow navigation keys (arrows, page up/down, home/end, etc.)
                  const isNavigation = (e.keyCode >= 15 && e.keyCode <= 18) || (e.keyCode >= 109 && e.keyCode <= 112); // arrows, etc (approximate)
                  // Let's just block if any selection overlaps with our decorations and it's a mutating key
                  // A simpler check: is it modifying? 
                  // If it's a read-only area, we should block most things except copy, find, etc.
                  // monaco.KeyCode enum: LeftArrow: 15, UpArrow: 16, RightArrow: 17, DownArrow: 18
                  if (e.keyCode === monaco.KeyCode.LeftArrow || 
                      e.keyCode === monaco.KeyCode.RightArrow || 
                      e.keyCode === monaco.KeyCode.UpArrow || 
                      e.keyCode === monaco.KeyCode.DownArrow ||
                      e.ctrlKey || e.metaKey) {
                        return; // allow navigation and shortcuts (copy/paste handled below)
                  }

                  const lockedRanges = lockDecorationsCollection.getRanges();
                  const isModifyingLocked = selections.some((sel: any) => {
                    return lockedRanges.some((lr: any) => {
                      // If selection intersects the locked range
                      // or if selection touches the boundary and it's a backspace/delete
                      return lr.intersectRanges(sel) !== null;
                    });
                  });

                  if (isModifyingLocked) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                });

                editor.onDidPaste((e: any) => {
                  const lockedRanges = lockDecorationsCollection.getRanges();
                  const range = e.range;
                  if (lockedRanges.some((lr: any) => lr.intersectRanges(range) !== null)) {
                     // We can't strictly prevent default on onDidPaste in Monaco easily, 
                     // so the common trick is to undo.
                     setTimeout(() => editor.trigger('keyboard', 'undo', null), 0);
                  }
                });

                setTimeout(() => {
                  editor.getAction('editor.foldAllMarkerRegions')?.run();
                }, 100);
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontLigatures: true,
                renderWhitespace: "selection",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          {/* Bottom Pane */}
          <div className="h-64 border-t border-[#2b2b2b] bg-[#1e1e1e] flex flex-col shrink-0">
            <div className="flex h-9 border-b border-[#2b2b2b] bg-[#1e1e1e]">
              <button 
                onClick={() => setBottomTab('testcases')}
                className={`px-4 text-[12px] uppercase tracking-wider font-semibold border-t-2 flex items-center transition-colors ${
                  bottomTab === 'testcases' ? 'text-[#cccccc] border-primary bg-[#1e1e1e]' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
                }`}>
                Testcases
              </button>
              <button 
                onClick={() => setBottomTab('result')}
                className={`px-4 text-[12px] uppercase tracking-wider font-semibold border-t-2 flex items-center transition-colors ${
                  bottomTab === 'result' ? 'text-[#cccccc] border-primary bg-[#1e1e1e]' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
                }`}>
                Test Result {isJudging && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
              </button>
              <button 
                onClick={loadHistory}
                className={`px-4 text-[12px] uppercase tracking-wider font-semibold border-t-2 flex items-center transition-colors ${
                  bottomTab === 'submissions' ? 'text-[#cccccc] border-primary bg-[#1e1e1e]' : 'text-[#858585] border-transparent hover:text-[#cccccc]'
                }`}>
                Submissions
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {bottomTab === 'testcases' ? (
                <div className="space-y-4 max-w-4xl">
                  <p className="text-xs text-zinc-400">Custom testcases coming soon...</p>
                  {problem.sampleTestCases?.map((tc: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <div className="text-xs font-semibold text-zinc-300 mb-2">Case {idx + 1}</div>
                      <div className="bg-[#2d2d2d] border border-[#3c3c3c] rounded p-2 text-xs font-mono text-zinc-300">
                        {tc.input}
                      </div>
                    </div>
                  ))}
                </div>
              ) : bottomTab === 'result' ? (
                <div className="flex flex-col h-full text-sm text-[#cccccc]">
                  {!runType && !isJudging && testResults.length === 0 ? (
                    <div className="text-zinc-500 text-sm">Run or submit to see results</div>
                  ) : (
                    <div className="space-y-4">
                      {verdict && (
                        <div className={`text-lg font-bold ${verdict.verdict === 'AC' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {verdict.verdict === 'AC' ? 'Accepted' : verdict.verdict === 'WA' ? 'Wrong Answer' : verdict.verdict}
                        </div>
                      )}
                      
                      {verdict && verdict.verdict === 'COMPILE_ERROR' && verdict.compileError && (
                        <div className="bg-[#2d2d2d] p-3 rounded border border-red-500/30 overflow-auto text-xs font-mono text-red-400 max-h-96">
                          <pre className="whitespace-pre-wrap">{verdict.compileError}</pre>
                        </div>
                      )}
                      
                      {/* Sequential List Animation */}
                      <div className="flex flex-col gap-2 max-w-2xl">
                        {(() => {
                          const ICONS = {
                            pending: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
                            running: <svg className="animate-spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg>,
                            pass: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L19 7"/></svg>,
                            fail: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
                            lock: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                          };
                          
                          const totalCases = runType === 'run' ? (problem.sampleTestCases?.length || 0) : (problem.totalTestCases || 0);

                          return (
                            <>
                              {Array.from({ length: totalCases }).map((_, i) => {
                                const isSample = i < (problem.sampleTestCases?.length || 0);
                                const label = isSample ? `Sample case ${i + 1}` : `Hidden case ${i + 1}`;
                                
                                const res = testResults[i];
                                let state = 'pending';
                                if (res) {
                                  state = res.verdict === 'AC' ? 'pass' : 'fail';
                                } else if (isJudging && i === testResults.length) {
                                  state = 'running';
                                }
                                
                                const styleClasses = {
                                  pending: "bg-[#2d2d2d] text-zinc-300",
                                  running: "bg-blue-900/30 text-blue-400",
                                  pass: "bg-[#10240f] text-[#4caf50]",
                                  fail: "bg-[#3a0d0d] text-[#e05252]"
                                }[state];

                                return (
                                  <div 
                                    key={i} 
                                    onClick={() => setActiveTestCase(i)}
                                    className={`flex items-center justify-between p-3.5 rounded-lg transition-colors cursor-pointer border ${activeTestCase === i ? 'border-primary/50 ring-1 ring-primary/20' : 'border-transparent'} ${styleClasses}`}
                                  >
                                    <div className="text-[15px] font-medium flex items-center gap-2">
                                      {label}
                                      {!isSample && <span className="opacity-60 flex items-center">{ICONS.lock}</span>}
                                    </div>
                                    <div className="flex items-center justify-center w-5 h-5 text-current">
                                      {ICONS[state as keyof typeof ICONS]}
                                    </div>
                                  </div>
                                );
                              })}
                              
                              {!isJudging && verdict && (
                                <div className={`mt-2 p-4 rounded-lg text-[15px] font-bold ${verdict.verdict === 'AC' ? 'bg-[#10240f] text-[#4caf50]' : 'bg-[#2e1f05] text-[#e0932c]'}`}>
                                  {verdict.passedCount}/{totalCases} test cases passed
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                      
                      {/* Detailed diff for active test case */}
                      {testResults.length > 0 && activeTestCase !== null && activeTestCase < testResults.length && (
                        <div className="mt-4 border-t border-[#3c3c3c] pt-4 max-w-2xl">
                          {(() => {
                            const res = testResults[activeTestCase];
                            const isSample = activeTestCase < (problem.sampleTestCases?.length || 0);
                            const tc = problem.sampleTestCases?.[activeTestCase];
                            
                            return (
                              <div className="space-y-3">
                                <h4 className="text-sm font-semibold flex items-center gap-2">
                                  {isSample ? `Sample Case ${activeTestCase + 1}` : `Hidden Case ${activeTestCase + 1}`}
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${res.verdict === 'AC' ? 'bg-[#10240f] text-[#4caf50]' : 'bg-[#3a0d0d] text-[#e05252]'}`}>
                                    {res.verdict}
                                  </span>
                                </h4>
                                
                                <div className="space-y-2 text-xs font-mono">
                                  <div className="text-zinc-500">Input:</div>
                                  <div className="bg-[#2d2d2d] p-2 rounded text-zinc-300 whitespace-pre-wrap">{isSample ? tc?.input : 'Hidden'}</div>
                                  
                                  <div className="text-zinc-500">Expected Output:</div>
                                  <div className="bg-[#2d2d2d] p-2 rounded text-zinc-300 whitespace-pre-wrap">{isSample ? tc?.expectedOutput : 'Hidden'}</div>
                                  
                                  <div className="text-zinc-500 flex justify-between items-center">
                                    <span>Actual Output / Stdout:</span>
                                    <span className="text-[10px] text-zinc-600 font-sans">Time: {res.timeMs}ms | Mem: {res.memoryKb}KB</span>
                                  </div>
                                  <div className={`bg-[#2d2d2d] border ${res.verdict === 'AC' ? 'border-emerald-500/20' : 'border-red-500/20'} p-2 rounded ${res.verdict === 'AC' ? 'text-zinc-300' : 'text-red-400'} whitespace-pre-wrap max-h-96 overflow-y-auto`}>
                                    {res.actualOutput || '<No Output>'}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : bottomTab === 'submissions' ? (
                <div className="flex flex-col h-full text-sm text-[#cccccc]">
                  {loadingHistory ? (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading history...
                    </div>
                  ) : submissionHistory.length === 0 ? (
                    <div className="text-zinc-500">No submissions found.</div>
                  ) : (
                    <div className="overflow-auto rounded-lg border border-[#3c3c3c]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#2d2d2d] sticky top-0">
                          <tr>
                            <th className="p-3 font-semibold text-zinc-300">Time Submitted</th>
                            <th className="p-3 font-semibold text-zinc-300">Status</th>
                            <th className="p-3 font-semibold text-zinc-300">Runtime</th>
                            <th className="p-3 font-semibold text-zinc-300">Memory</th>
                            <th className="p-3 font-semibold text-zinc-300">Language</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3c3c3c]">
                          {submissionHistory.map((sub: any) => (
                            <tr 
                              key={sub.submissionId} 
                              className="hover:bg-[#2a2d2e] transition-colors bg-[#1e1e1e] cursor-pointer"
                              onClick={() => {
                                if (sub.sourceCode) {
                                  showConfirm(
                                    "Load Submission",
                                    "Load this submission into the editor? Your current code will be overwritten.",
                                    () => {
                                      setCode(sub.sourceCode);
                                      setLanguage(sub.language);
                                    }
                                  );
                                }
                              }}
                            >
                              <td className="p-3 text-zinc-400 whitespace-nowrap">
                                {new Date(sub.submittedAt + (sub.submittedAt.endsWith('Z') ? '' : 'Z')).toLocaleString(undefined, { 
                                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                                })}
                              </td>
                              <td className="p-3 font-semibold">
                                <span className={sub.verdict === 'AC' ? 'text-emerald-500' : sub.verdict === 'PENDING' ? 'text-zinc-400' : 'text-red-500'}>
                                  {sub.verdict === 'AC' ? 'Accepted' : sub.verdict === 'WA' ? 'Wrong Answer' : sub.verdict}
                                </span>
                              </td>
                              <td className="p-3 text-zinc-400 font-mono">{sub.maxTimeMs} ms</td>
                              <td className="p-3 text-zinc-400 font-mono">{sub.maxMemoryKb} KB</td>
                              <td className="p-3 text-zinc-400">
                                <span className="px-2 py-0.5 bg-[#2d2d2d] rounded-full text-[10px] uppercase">
                                  {sub.language}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {showProblemsModal && (
        <ProblemsModal onClose={() => setShowProblemsModal(false)} token={token} />
      )}

      {modalConfig.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '16px' }}>
          <div style={{ backgroundColor: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '12px', width: '100%', maxWidth: '400px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-zinc-100 mb-2">{modalConfig.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{modalConfig.message}</p>
            </div>
            <div className="bg-[#2d2d2d] px-6 py-4 flex justify-end gap-3 border-t border-[#3c3c3c]">
              {modalConfig.type === 'confirm' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); closeModal(); }}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (modalConfig.onConfirm) modalConfig.onConfirm();
                  closeModal();
                }}
                className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
              >
                {modalConfig.type === 'confirm' ? 'Confirm' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
