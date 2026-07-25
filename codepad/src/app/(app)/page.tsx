"use client";

import { useEffect, useState } from "react";
import { getProjects, createProject } from "@/app/(app)/editor/actions";
import { Loader2, FileCode, Plus, ChevronRight, Files } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Create state
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createLang, setCreateLang] = useState("JAVA");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getProjects();
        if (res?.error) {
          setError(res.error);
        } else {
          setProjects(res?.projects || []);
        }
      } catch (e) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreate = async () => {
    if (!createName.trim()) return;
    setCreating(true);
    const res = await createProject({ name: createName, language: createLang });
    if (res && 'projectId' in res) {
      router.push(`/editor/${res.projectId}`);
    } else {
      setError(res?.error || "Failed to create project");
      setCreating(false);
      setShowCreate(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-on-surface-variant">Manage your projects and recent workspaces.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      {showCreate && (
        <div className="bg-surface-container border border-outline-variant rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-end animate-in fade-in slide-in-from-top-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Project Name</label>
            <input 
              type="text" 
              value={createName}
              onChange={e => setCreateName(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g. My Algorithm"
              autoFocus
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Language</label>
            <select 
              value={createLang}
              onChange={e => setCreateLang(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="JAVA">Java</option>
              <option value="CPP">C++</option>
              <option value="PYTHON">Python</option>
            </select>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setShowCreate(false)}
              className="flex-1 md:flex-none px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreate}
              disabled={creating || !createName.trim()}
              className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-on-primary px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {creating ? <Loader2 size={18} className="animate-spin" /> : 'Create'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Files size={18} className="text-primary" /> Recent Projects
          </h2>
        </div>
        
        <div className="divide-y divide-outline-variant">
          {loading ? (
            <div className="p-12 flex justify-center text-on-surface-variant">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-error bg-error-container/10">{error}</div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant flex flex-col items-center">
              <FileCode size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium text-on-surface mb-1">No projects yet</p>
              <p className="text-sm">Create your first project to start coding.</p>
            </div>
          ) : (
            projects.map(p => (
              <Link 
                key={p.projectId} 
                href={`/editor/${p.projectId}`}
                className="flex items-center justify-between p-4 px-6 hover:bg-surface-variant/50 transition-colors group"
              >
                <div>
                  <h3 className="font-semibold text-on-surface text-lg group-hover:text-primary transition-colors">
                    {p.name || "Untitled"}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-3">
                    <span className="bg-surface-variant px-2 py-0.5 rounded text-xs font-medium">
                      {p.language}
                    </span>
                    <span>Last updated {new Date(p.updatedAt).toLocaleDateString()}</span>
                  </p>
                </div>
                <ChevronRight className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
