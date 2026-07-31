"use client";

import { X, Loader2, FileCode } from "lucide-react";
import { createPortal } from "react-dom";
import { ProblemsModal } from "@/components/ProblemsModal";
import { SUPPORTED_LANGUAGES } from "./editor-utils";
import { useEffect, useRef, useCallback } from "react";

// Focus-trap + Escape-to-close + initial focus + focus restore
function useModalA11y(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement;

    // Move initial focus into the modal
    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) focusable[0].focus();
      else el.focus();
    }, 0);

    return () => {
      clearTimeout(timer);
      // Restore focus to trigger on close
      if (triggerRef.current && triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const el = containerRef.current;
      if (!el) return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  return { containerRef, handleKeyDown };
}

interface EditorModalsProps {
  showProjectsModal: boolean;
  setShowProjectsModal: (val: boolean) => void;
  loadingProjects: boolean;
  projectsError: string | null;
  projectsList: any[];
  
  showCreateModal: boolean;
  setShowCreateModal: (val: boolean) => void;
  createName: string;
  setCreateName: (val: string) => void;
  createLang: string;
  setCreateLang: (val: string) => void;
  handleCreateProject: () => void;
  loading: boolean;
  
  showProblemsModal: boolean;
  setShowProblemsModal: (val: boolean) => void;
  
  token: string;
}

export function EditorModals({
  showProjectsModal,
  setShowProjectsModal,
  loadingProjects,
  projectsError,
  projectsList,
  
  showCreateModal,
  setShowCreateModal,
  createName,
  setCreateName,
  createLang,
  setCreateLang,
  handleCreateProject,
  loading,
  
  showProblemsModal,
  setShowProblemsModal,
  token,

  showStdinModal,
  setShowStdinModal,
  staticStdin,
  setStaticStdin
}: EditorModalsProps & {
  showStdinModal?: boolean;
  setShowStdinModal?: (val: boolean) => void;
  staticStdin?: string;
  setStaticStdin?: (val: string) => void;
}) {
  const projectsA11y = useModalA11y(showProjectsModal, () => setShowProjectsModal(false));
  const createA11y = useModalA11y(showCreateModal, () => setShowCreateModal(false));
  const stdinA11y = useModalA11y(!!showStdinModal, () => setShowStdinModal?.(false));

  return (
    <>
      {showProjectsModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div
            ref={projectsA11y.containerRef}
            onKeyDown={projectsA11y.handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
            tabIndex={-1}
            className="bg-[#252526] border border-[#454545] rounded shadow-2xl w-full max-w-[42rem] flex flex-col max-h-[80vh] outline-none"
          >
            <div className="px-4 py-3 border-b border-[#454545] flex items-center justify-between">
              <h2 id="projects-modal-title" className="text-[#cccccc] font-semibold text-sm">Open Project</h2>
              <button onClick={() => setShowProjectsModal(false)} aria-label="Close Open Project dialog" className="text-[#858585] hover:text-white"><X size={16}/></button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {loadingProjects ? (
                <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin text-[#007acc]" size={24}/></div>
              ) : projectsError ? (
                <div className="text-center text-red-400 p-8">{projectsError}</div>
              ) : projectsList.length === 0 ? (
                <div className="flex flex-col items-center text-center text-[#858585] p-8">
                  <FileCode size={40} className="mb-3 opacity-50" />
                  <p className="font-semibold text-[#cccccc]">No project</p>
                  <p className="text-sm mt-1">Create your first project to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectsList.map(p => (
                    <button key={p.projectId} onClick={() => { setShowProjectsModal(false); window.location.href = `/editor/${p.projectId}`; }}
                      className="bg-[#1e1e1e] border border-[#3c3c3c] hover:border-[#007acc] rounded p-3 cursor-pointer group text-left w-full">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-[#cccccc] font-semibold truncate group-hover:text-[#007acc]">{p.name || "Untitled"}</h3>
                        <span className="text-[10px] bg-[#3c3c3c] px-1.5 py-0.5 rounded text-[#cccccc]">{p.language}</span>
                      </div>
                      <div className="text-[#858585] text-xs">{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : 'Just now'}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div
            ref={createA11y.containerRef}
            onKeyDown={createA11y.handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-modal-title"
            tabIndex={-1}
            className="bg-[#252526] border border-[#454545] rounded shadow-2xl w-full max-w-[24rem] flex flex-col outline-none"
          >
            <div className="px-4 py-3 border-b border-[#454545] flex items-center justify-between">
              <h2 id="create-modal-title" className="text-[#cccccc] font-semibold text-sm">New Project</h2>
              <button onClick={() => setShowCreateModal(false)} aria-label="Close New Project dialog" className="text-[#858585] hover:text-white"><X size={16}/></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="create-project-name" className="block text-xs font-semibold text-[#858585] mb-1">Project Name</label>
                <input id="create-project-name" type="text" value={createName} onChange={e => setCreateName(e.target.value)}
                  className="w-full bg-[#3c3c3c] border border-[#454545] rounded p-2 text-[#cccccc] focus:outline-none focus:border-[#007acc] text-sm"
                  placeholder="My Awesome Project" />
              </div>
              <div>
                <label htmlFor="create-project-language" className="block text-xs font-semibold text-[#858585] mb-1">Language</label>
                <select id="create-project-language" value={createLang} onChange={e => setCreateLang(e.target.value)}
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

      {showProblemsModal && (
        <ProblemsModal onClose={() => setShowProblemsModal(false)} token={token} />
      )}

      {showStdinModal && setShowStdinModal && setStaticStdin && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowStdinModal(false); }}
        >
          <div
            ref={stdinA11y.containerRef}
            onKeyDown={stdinA11y.handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="stdin-modal-title"
            tabIndex={-1}
            style={{ width: '100%', maxWidth: '32rem', outline: 'none' }}
          >
            <div style={{ backgroundColor: '#1e1e1e', border: '1px solid #333333', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #333333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#252526' }}>
                <h3 id="stdin-modal-title" style={{ color: '#e1e4e8', fontWeight: 500, fontSize: '14px', margin: 0 }}>Standard Input (Stdin)</h3>
                <button 
                  onClick={() => setShowStdinModal(false)}
                  aria-label="Close Stdin dialog"
                  style={{ color: '#858585', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={16} />
                </button>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#1e1e1e' }}>
                <textarea
                  value={staticStdin || ''}
                  onChange={(e) => setStaticStdin(e.target.value)}
                  placeholder="Enter multi-line input here..."
                  style={{
                    width: '100%',
                    height: '192px',
                    backgroundColor: '#0d1117',
                    border: '1px solid #3c3c3c',
                    borderRadius: '6px',
                    padding: '12px',
                    fontSize: '13px',
                    color: '#cccccc',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'monospace',
                    boxSizing: 'border-box',
                  }}
                  autoFocus
                />
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid #333333', display: 'flex', justifyContent: 'flex-end', gap: '8px', backgroundColor: '#252526' }}>
                <button
                  onClick={() => setShowStdinModal(false)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#007acc',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005f9e')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007acc')}
                >
                  Save &amp; Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
