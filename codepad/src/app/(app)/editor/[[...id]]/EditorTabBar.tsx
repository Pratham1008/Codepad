"use client";

import React from "react";
import { FileCode, X } from "lucide-react";
import { getFileName } from "./editor-utils";

interface EditorTabBarProps {
  openTabs: string[];
  activeFilePath: string | null;
  dirtyFiles: Set<string>;
  handleSelectFile: (path: string) => void;
  closeTab: (path: string, e?: React.MouseEvent) => void;
}

export const EditorTabBar = React.memo(function EditorTabBar({
  openTabs,
  activeFilePath,
  dirtyFiles,
  handleSelectFile,
  closeTab
}: EditorTabBarProps) {
  return (
    <div className="h-[35px] bg-[#252526] flex items-end shrink-0 overflow-x-auto" role="tablist" aria-label="Open files" style={{ scrollbarWidth: 'none' }}>
      {openTabs.map(tab => {
        const isActive = tab === activeFilePath;
        const isDirty = dirtyFiles.has(tab);
        const fileName = getFileName(tab);
        return (
          <div key={tab}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`group flex items-center gap-1.5 px-3 h-[35px] cursor-pointer border-r border-[#1e1e1e] text-[13px] shrink-0 select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#007acc] focus-visible:ring-inset
              ${isActive 
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' 
                : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2d2d2d]/80 border-t-2 border-t-transparent'}`}
            onClick={() => handleSelectFile(tab)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectFile(tab);
              } else if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                closeTab(tab);
              }
            }}
          >
            <FileCode size={14} className={`shrink-0 ${isActive ? 'text-[#519aba]' : 'text-[#858585]'}`} />
            <span className="truncate max-w-[120px]">{fileName}</span>
            {isDirty && <span className="text-white ml-1 shrink-0 font-bold">*</span>}
            <button
              onClick={(e) => { e.stopPropagation(); closeTab(tab, e); }}
              aria-label={`Close ${fileName}${isDirty ? ' (unsaved changes)' : ''}`}
              className={`w-[24px] h-[24px] flex items-center justify-center rounded hover:bg-[#454545] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#007acc]
                ${isActive ? 'opacity-60 hover:opacity-100' : 'opacity-0 group-hover:opacity-60 group-focus-within:opacity-60 hover:!opacity-100 focus:opacity-100'}`}>
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
});
