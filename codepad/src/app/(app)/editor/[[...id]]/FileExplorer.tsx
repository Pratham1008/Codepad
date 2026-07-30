"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, Plus, Trash2, FolderPlus, Loader2, FileCode, FileText } from "lucide-react";

export type FileNode = {
  name: string;
  path: string;
  type: string;
  children?: FileNode[];
};

interface FileExplorerProps {
  tree: FileNode | null;
  activeFilePath: string | null;
  onSelectFile: (path: string) => void;
  onCreateFile: (path: string, type: string) => Promise<void>;
  onDeleteFile: (path: string) => Promise<void>;
  onRenameFile: (oldPath: string, newPath: string) => Promise<void>;
  projectName?: string;
}

function getFileIcon(name: string) {
  if (name.endsWith('.java')) return <FileCode size={14} className="text-[#cc7832] shrink-0" />;
  if (name.endsWith('.cpp') || name.endsWith('.c') || name.endsWith('.h')) return <FileCode size={14} className="text-[#519aba] shrink-0" />;
  if (name.endsWith('.py')) return <FileCode size={14} className="text-[#4584b6] shrink-0" />;
  if (name.endsWith('.js') || name.endsWith('.jsx')) return <FileCode size={14} className="text-yellow-400 shrink-0" />;
  if (name.endsWith('.ts') || name.endsWith('.tsx')) return <FileCode size={14} className="text-blue-400 shrink-0" />;
  if (name.endsWith('.rs')) return <FileCode size={14} className="text-orange-500 shrink-0" />;
  if (name.endsWith('.kt') || name.endsWith('.kts')) return <FileCode size={14} className="text-purple-400 shrink-0" />;
  if (name.endsWith('.json')) return <FileCode size={14} className="text-[#cbcb41] shrink-0" />;
  if (name.endsWith('.xml') || name.endsWith('.html')) return <FileCode size={14} className="text-[#e37933] shrink-0" />;
  if (name.endsWith('.md') || name.endsWith('.txt')) return <FileText size={14} className="text-[#858585] shrink-0" />;
  return <File size={14} className="text-[#858585] shrink-0" />;
}

export function FileExplorer({
  tree,
  activeFilePath,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
  projectName
}: FileExplorerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["/", ""]));
  const [creatingPath, setCreatingPath] = useState<{ parentPath: string, type: string } | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const toggleExpand = (path: string) => {
    const next = new Set(expanded);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    setExpanded(next);
  };

  const handleCreateSubmit = async () => {
    if (!creatingPath || !newItemName.trim()) {
      setCreatingPath(null);
      setNewItemName("");
      return;
    }
    const fullPath = (creatingPath.parentPath === "/" || creatingPath.parentPath === "") ? newItemName : `${creatingPath.parentPath}/${newItemName}`;
    setLoadingAction(`create:${fullPath}`);
    await onCreateFile(fullPath, creatingPath.type);
    setLoadingAction(null);
    setCreatingPath(null);
    setNewItemName("");
  };

  const renderNode = (node: FileNode, level = 0) => {
    const isDir = node.type === "dir" || node.type === "directory" || node.type === "folder";
    const isExpanded = expanded.has(node.path) || node.path === "/" || node.path === "";
    const isActive = activeFilePath === node.path;
    
    const displayPath = node.path || "";
    const displayName = node.name || (displayPath === "/" ? "Project Root" : "Unknown");

    // Skip rendering root node itself, just render children
    if ((displayPath === "/" || displayPath === "") && level === 0) {
      return (
        <div key={displayPath}>
          {isDir && node.children?.map(child => renderNode(child, level))}
          {creatingPath?.parentPath === displayPath && (
            <div className="flex items-center gap-1.5 px-2 py-1" style={{ paddingLeft: `${level * 16 + 24}px` }}>
              {creatingPath.type === 'folder' ? <Folder size={14} className="text-[#dcb67a] shrink-0" /> : <File size={14} className="text-[#858585] shrink-0" />}
              <input type="text" autoFocus value={newItemName} onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleCreateSubmit(); if (e.key === "Escape") setCreatingPath(null); }}
                onBlur={() => { if (newItemName.trim()) handleCreateSubmit(); else setCreatingPath(null); }}
                className="bg-[#3c3c3c] border border-[#007acc] text-[#cccccc] text-[13px] px-1 py-0 rounded w-full outline-none" />
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={displayPath}>
        <div 
          className={`group flex items-center justify-between cursor-pointer select-none text-[13px] transition-colors
            ${isActive ? "bg-[#094771] text-white" : "text-[#cccccc] hover:bg-[#2a2d2e]"}
          `}
          style={{ paddingLeft: `${level * 16 + 8}px`, paddingRight: '8px', paddingTop: '2px', paddingBottom: '2px' }}
          onClick={() => {
            if (isDir) toggleExpand(displayPath);
            else onSelectFile(displayPath);
          }}
        >
          <div className="flex items-center gap-1 overflow-hidden min-w-0">
            {isDir ? (
              isExpanded ? <ChevronDown size={14} className="text-[#cccccc] shrink-0" /> : <ChevronRight size={14} className="text-[#cccccc] shrink-0" />
            ) : (
              <span className="w-[14px] shrink-0" />
            )}
            
            {isDir ? (
              <Folder size={14} className={isExpanded ? "text-[#dcb67a] shrink-0" : "text-[#c09553] shrink-0"} />
            ) : (
              getFileIcon(displayName)
            )}
            <span className="truncate ml-0.5">{displayName}</span>
          </div>

          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {isDir && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCreatingPath({ parentPath: displayPath, type: 'file' }); setNewItemName(""); setExpanded(new Set(expanded).add(displayPath)); }}
                  className="p-0.5 hover:bg-[#454545] rounded text-[#cccccc] transition-colors" title="New File">
                  <Plus size={12} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCreatingPath({ parentPath: displayPath, type: 'folder' }); setNewItemName(""); setExpanded(new Set(expanded).add(displayPath)); }}
                  className="p-0.5 hover:bg-[#454545] rounded text-[#cccccc] transition-colors" title="New Folder">
                  <FolderPlus size={12} />
                </button>
              </>
            )}
            {displayPath !== "/" && displayPath !== "" && (
              <button 
                onClick={async (e) => {
                  e.stopPropagation();
                  if (confirm(`Delete ${displayName}?`)) {
                    setLoadingAction(`delete:${displayPath}`);
                    await onDeleteFile(displayPath);
                    setLoadingAction(null);
                  }
                }}
                className="p-0.5 hover:bg-[#454545] rounded text-[#cccccc] hover:text-red-400 transition-colors" title="Delete">
                {loadingAction === `delete:${displayPath}` ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
              </button>
            )}
          </div>
        </div>

        {isDir && isExpanded && (
          <div>
            {node.children?.map(child => renderNode(child, level + 1))}
            
            {creatingPath?.parentPath === displayPath && (
              <div className="flex items-center gap-1.5" style={{ paddingLeft: `${(level + 1) * 16 + 24}px`, paddingRight: '8px', paddingTop: '2px', paddingBottom: '2px' }}>
                {creatingPath.type === 'folder' ? <Folder size={14} className="text-[#dcb67a] shrink-0" /> : <File size={14} className="text-[#858585] shrink-0" />}
                <input type="text" autoFocus value={newItemName} onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleCreateSubmit(); if (e.key === "Escape") setCreatingPath(null); }}
                  onBlur={() => { if (newItemName.trim()) handleCreateSubmit(); else setCreatingPath(null); }}
                  className="bg-[#3c3c3c] border border-[#007acc] text-[#cccccc] text-[13px] px-1 py-0 rounded w-full outline-none" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!tree) return <div className="p-4 text-[13px] text-[#858585] flex items-center gap-2"><Loader2 size={14} className="animate-spin"/> Loading...</div>;

  return (
    <div className="flex flex-col h-full bg-[#252526]">
      {/* Explorer Header */}
      <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#bbbbbb] flex justify-between items-center shrink-0">
        <span className="truncate mr-2" title={projectName || "EXPLORER"}>
          {projectName ? projectName : "EXPLORER"}
        </span>
        <div className="flex items-center gap-0.5 shrink-0">
          <button 
            onClick={() => { setCreatingPath({ parentPath: "", type: 'file' }); setNewItemName(""); }}
            className="p-1 hover:bg-[#454545] rounded transition-colors text-[#cccccc]" title="New File">
            <Plus size={14} />
          </button>
          <button 
            onClick={() => { setCreatingPath({ parentPath: "", type: 'folder' }); setNewItemName(""); }}
            className="p-1 hover:bg-[#454545] rounded transition-colors text-[#cccccc]" title="New Folder">
            <FolderPlus size={14} />
          </button>
        </div>
      </div>
      
      {/* File tree */}
      <div className="flex-1 overflow-y-auto py-1">
        {renderNode(tree)}
      </div>
    </div>
  );
}
