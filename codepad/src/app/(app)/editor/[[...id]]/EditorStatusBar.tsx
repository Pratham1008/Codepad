"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { getLangFromPath } from "./editor-utils";

interface EditorStatusBarProps {
  problems: any[];
  setBottomTab: (val: 'problems' | 'output' | 'terminal') => void;
  activeFilePath: string | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  initialProject: any;
}

export function EditorStatusBar({
  problems,
  setBottomTab,
  activeFilePath,
  connectionStatus,
  initialProject
}: EditorStatusBarProps) {
  return (
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
        <div className="w-px h-3 bg-[#454545]" />
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-[#2ea043]' :
            connectionStatus === 'connecting' ? 'bg-[#d29922] animate-pulse' : 'bg-[#f85149]'
          }`} />
          {connectionStatus === 'connected' ? 'Connected' :
           connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>UTF-8</span>
        {activeFilePath && <span>{getLangFromPath(activeFilePath).toUpperCase()}</span>}
        {!activeFilePath && initialProject?.language && <span>{initialProject.language}</span>}
      </div>
    </div>
  );
}
