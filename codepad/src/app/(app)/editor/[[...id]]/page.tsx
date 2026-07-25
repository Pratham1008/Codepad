import { getProject } from "../actions";
import { EditorClient } from "./EditorClient";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

import { getSession } from "@/lib/session";

async function EditorFetcher({ params }: { params: Promise<{ id?: string[] }> }) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id?.[0] || null;

  let initialProject = null;
  
  if (projectId) {
    const res = await getProject(projectId);
    if (!res.error) {
      initialProject = res;
    }
  }

  const session = await getSession();
  const token = session.token || "";

  return <EditorClient projectId={projectId} initialProject={initialProject} token={token} />;
}

export default function EditorPage({ params }: { params: Promise<{ id?: string[] }> }) {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center h-full"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <EditorFetcher params={params} />
    </Suspense>
  );
}
