"use client";

import { X, Loader2, FileCode } from "lucide-react";
import { ProblemsModal } from "@/components/ProblemsModal";
import { SUPPORTED_LANGUAGES } from "./editor-utils";

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
  token
}: EditorModalsProps) {
  return (
    <>
      {showProjectsModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-[#454545] rounded shadow-2xl w-full max-w-[42rem] flex flex-col max-h-[80vh]">
            <div className="px-4 py-3 border-b border-[#454545] flex items-center justify-between">
              <h2 className="text-[#cccccc] font-semibold text-sm">Open Project</h2>
              <button onClick={() => setShowProjectsModal(false)} className="text-[#858585] hover:text-white"><X size={16}/></button>
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
                    <div key={p.projectId} onClick={() => { setShowProjectsModal(false); window.location.href = `/editor/${p.projectId}`; }}
                      className="bg-[#1e1e1e] border border-[#3c3c3c] hover:border-[#007acc] rounded p-3 cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-[#cccccc] font-semibold truncate group-hover:text-[#007acc]">{p.name || "Untitled"}</h3>
                        <span className="text-[10px] bg-[#3c3c3c] px-1.5 py-0.5 rounded text-[#cccccc]">{p.language}</span>
                      </div>
                      <div className="text-[#858585] text-xs">{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : 'Just now'}</div>
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
          <div className="bg-[#252526] border border-[#454545] rounded shadow-2xl w-full max-w-[24rem] flex flex-col">
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

      {showProblemsModal && (
        <ProblemsModal onClose={() => setShowProblemsModal(false)} token={token} />
      )}
    </>
  );
}
