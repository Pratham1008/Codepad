"use client";

import { FileCode, X } from "lucide-react";
import { getFileName } from "./editor-utils";

interface EditorTabBarProps {
  openTabs: string[];
  activeFilePath: string | null;
  dirtyFiles: Set<string>;
  handleSelectFile: (path: string) => void;
  closeTab: (path: string, e?: React.MouseEvent) => void;
}

export function EditorTabBar({
  openTabs,
  activeFilePath,
  dirtyFiles,
  handleSelectFile,
  closeTab
}: EditorTabBarProps) {
  return (
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
  );
}
