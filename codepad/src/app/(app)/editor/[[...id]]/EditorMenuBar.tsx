"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight, Download, Play, Search, Maximize2, Minimize2, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditorMenuBarProps {
  initialProject: any;
  projectId: string | null;
  menuOpen: string | null;
  setMenuOpen: (val: string | null) => void;
  setShowCreateModal: (val: boolean) => void;
  openProjectsModal: () => void;
  setShowProblemsModal: (val: boolean) => void;
  handleSave: () => void;
  handleRun: () => void;
  interactiveMode: boolean;
  setInteractiveMode: (val: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  saving: boolean;
  saved: boolean;
  saveError?: boolean;
  loading: boolean;
}

export function EditorMenuBar({
  initialProject,
  projectId,
  menuOpen,
  setMenuOpen,
  setShowCreateModal,
  openProjectsModal,
  setShowProblemsModal,
  handleSave,
  handleRun,
  interactiveMode,
  setInteractiveMode,
  isFullscreen,
  toggleFullscreen,
  saving,
  saved,
  saveError,
  loading
}: EditorMenuBarProps) {
  const router = useRouter();

  return (
    <div className="h-9 bg-[#181818] border-b border-[#2b2b2b] flex items-center px-3 shrink-0 text-[13px] text-[#cccccc] select-none z-20 relative">
      <div className="flex items-center gap-0.5 z-10">
        <Image src="/icon.svg" width={16} height={16} className="w-4 h-4 mr-2 opacity-80" alt="" />

        <Link href="/editor" className="px-2 py-1 rounded hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white flex items-center gap-1">
          <Home size={13} />
        </Link>
        <ChevronRight size={13} className="text-[#5a5a5a] mx-0.5" />
        <span className="px-1 text-[#cccccc]/80 truncate max-w-[140px]">
          {initialProject?.name || "Untitled Project"}
        </span>
        <div className="w-px h-4 bg-[#454545] mx-1" />
        
        {/* File Menu */}
        <div className="relative vscode-menu">
          <button className={`px-2 py-1 rounded hover:bg-[#2a2d2e] ${menuOpen === 'File' ? 'bg-[#2a2d2e]' : ''}`}
            onClick={() => setMenuOpen(menuOpen === 'File' ? null : 'File')}>File</button>
          {menuOpen === 'File' && (
            <div className="absolute top-full left-0 mt-px w-56 bg-[#252526] border border-[#454545] shadow-xl rounded py-1 z-50 text-[13px]">
              <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => { setShowCreateModal(true); setMenuOpen(null); }}>New Project</div>
              <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={openProjectsModal}>Open Projects</div>
              <div className="h-px bg-[#454545] my-1" />
              <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => { setShowProblemsModal(true); setMenuOpen(null); }}>Problems</div>
              <div className="px-6 py-1.5 hover:bg-[#094771] cursor-pointer" onClick={() => { window.open('/problems/create', '_blank'); setMenuOpen(null); }}>Create Problem (Admin)</div>
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
        {saving ? <Loader2 size={14} className="animate-spin text-[#858585]" /> : 
         saveError ? <span className="text-red-400 text-[11px] font-semibold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>Save Failed</span> :
         saved ? <CheckCircle2 size={14} className="text-green-400" /> : null}
        <button onClick={handleRun} disabled={loading} className="text-[#cccccc] hover:text-white flex items-center" title="Run (Ctrl+Enter)">
          {loading ? <Loader2 size={16} className="animate-spin text-[#858585]" /> : <Play size={16} className="text-green-400" />}
        </button>
      </div>
    </div>
  );
}
