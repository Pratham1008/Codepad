import { useState, useRef, useEffect } from "react";
import { getProjectTree, readFile, writeFile, createFile, deleteFile, renameFile } from "../actions";
import { FileNode } from "./FileExplorer";

export function useEditorState(
  projectId: string | null,
  initialProject: { projectId?: string; name?: string; language?: string } | null,
  checkLive: (code: string, lang: string, filePath: string) => void
) {
  const [code, setCode] = useState("");
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [dirtyFiles, setDirtyFiles] = useState<Set<string>>(new Set());
  const [tree, setTree] = useState<FileNode | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [activityTab, setActivityTab] = useState<string>('explorer');
  const liveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshTree = async () => {
    if (!projectId) return null;
    const newTree = await getProjectTree(projectId);
    if (newTree && !newTree.error) {
      setTree(newTree);
      return newTree;
    }
    return null;
  };

  const openFile = async (path: string) => {
    setOpenTabs(prev => prev.includes(path) ? prev : [...prev, path]);
    setActiveFilePath(path);

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
    if (activeFilePath && projectId && dirtyFiles.has(activeFilePath)) {
      const cleanPath = activeFilePath.startsWith('/') ? activeFilePath.slice(1) : activeFilePath;
      await writeFile(projectId, cleanPath, code);
      setDirtyFiles(prev => { const n = new Set(prev); n.delete(activeFilePath!); return n; });
    }
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
      if (liveDebounceRef.current) clearTimeout(liveDebounceRef.current);
      liveDebounceRef.current = setTimeout(() => {
         const lang = initialProject?.language || 'JAVA';
         const cleanFile = activeFilePath!.startsWith('/') ? activeFilePath!.slice(1) : activeFilePath!;
         checkLive(v, lang, cleanFile);
      }, 1000);
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

  return {
    code, setCode,
    activeFilePath, setActiveFilePath,
    openTabs, setOpenTabs,
    fileContents, setFileContents,
    dirtyFiles, setDirtyFiles,
    tree, setTree,
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
  };
}
