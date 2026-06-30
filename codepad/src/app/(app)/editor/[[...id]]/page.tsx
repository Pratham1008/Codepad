import { getSnippet } from "../actions";
import { EditorClient } from "./EditorClient";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function EditorFetcher({ params }: { params: Promise<{ id?: string[] }> }) {
  const resolvedParams = await params;
  const snippetId = resolvedParams.id?.[0] || null;

  let initialSnippet = null;
  
  if (snippetId) {
    const res = await getSnippet(snippetId);
    if (!res.error) {
      initialSnippet = res;
    }
  }

  return <EditorClient snippetId={snippetId} initialSnippet={initialSnippet} />;
}

export default function EditorPage({ params }: { params: Promise<{ id?: string[] }> }) {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center h-full"><Loader2 className="animate-spin text-primary" size={32} /></div>}>
      <EditorFetcher params={params} />
    </Suspense>
  );
}
