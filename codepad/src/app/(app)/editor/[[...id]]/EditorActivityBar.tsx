"use client";

import Link from "next/link";
import { Files, Settings } from "lucide-react";

interface EditorActivityBarProps {
  activityTab: string;
  setActivityTab: (val: string) => void;
  menuOpen: string | null;
  setMenuOpen: (val: string | null) => void;
  theme?: string;
  toggleTheme: () => void;
  handleLogout: () => void;
}

export function EditorActivityBar({
  activityTab,
  setActivityTab,
  menuOpen,
  setMenuOpen,
  theme,
  toggleTheme,
  handleLogout
}: EditorActivityBarProps) {
  return (
    <div className="w-12 bg-[#181818] border-r border-[#2b2b2b] flex flex-col items-center py-1 shrink-0">
      <button className={`p-2 rounded mb-1 relative transition-colors ${activityTab === 'explorer' ? 'text-white' : 'text-[#858585] hover:text-white'}`}
        onClick={() => setActivityTab(activityTab === 'explorer' ? '' : 'explorer')} title="Explorer (Ctrl+Shift+E)">
        <Files size={22} strokeWidth={1.5} />
        {activityTab === 'explorer' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r" />}
      </button>
      <div className="flex-1" />
      <div className="relative vscode-menu">
        <button className={`p-2 rounded transition-colors ${menuOpen === 'Settings' ? 'text-white bg-[#2a2d2e]' : 'text-[#858585] hover:text-white'}`}
          onClick={() => setMenuOpen(menuOpen === 'Settings' ? null : 'Settings')} title="Settings">
          <Settings size={22} strokeWidth={1.5} />
        </button>
        {menuOpen === 'Settings' && (
          <div className="absolute bottom-full left-1 mb-1 w-48 bg-[#252526] border border-[#454545] shadow-xl rounded py-1 text-[13px] z-50">
            <Link href="/settings" className="block px-4 py-1.5 hover:bg-[#094771] text-[#cccccc]" onClick={() => setMenuOpen(null)}>
              Settings
            </Link>
            <button onClick={() => toggleTheme()} className="w-full text-left px-4 py-1.5 hover:bg-[#094771] text-[#cccccc] flex items-center justify-between">
              <span>Theme</span>
              <span className="text-[#858585] text-xs capitalize">{theme}</span>
            </button>
            <div className="h-px bg-[#454545] my-1" />
            <button onClick={handleLogout} className="w-full text-left px-4 py-1.5 hover:bg-[#5a1d1d] text-red-400">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
