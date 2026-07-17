import { getProjects } from "./actions";
import Link from "next/link";
import { FileCode2, Clock, ChevronRight } from "lucide-react";
import { requireAuth } from "@/lib/session";

export async function DashboardList() {
  await requireAuth();

  const data = await getProjects();

  if (data && 'error' in data) {
    return (
      <div className="bg-error-container text-on-error-container p-4 rounded text-sm font-mono flex items-center gap-2">
        {(data as { error: string }).error}
      </div>
    );
  }

  const projects = data || [];

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-on-surface-variant bg-surface-container border border-outline-variant rounded-xl border-dashed p-8">
        <FileCode2 size={48} className="mb-4 opacity-50" />
        <p className="font-semibold">No projects yet.</p>
        <p className="text-sm mt-1">Head over to the playground to create your first project.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project: any) => (
        <a key={project.projectId} href={`/editor/${project.projectId}`}>
          <div className="bg-surface border border-outline-variant rounded-xl p-5 hover:border-primary transition-all group flex flex-col h-full cursor-pointer hover:shadow-md">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-on-surface truncate pr-4 group-hover:text-primary transition-colors">
                {project.name || "Untitled Project"}
              </h3>
              <div className="bg-surface-variant text-on-surface-variant text-xs font-code-sm px-2 py-1 rounded shrink-0">
                {project.language}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-on-surface-variant">
                ID: <span className="font-code-sm">{project.projectId.substring(0, 8)}...</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant font-semibold">
              <span className="flex items-center gap-1"><Clock size={14} /> {new Date(project.updatedAt).toLocaleDateString()}</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
