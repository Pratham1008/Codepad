import { getSnippets } from "./actions";
import Link from "next/link";
import { FileCode2, Clock, ChevronRight } from "lucide-react";
import { requireAuth } from "@/lib/session";

export async function DashboardList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireAuth();

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "0", 10);
  const data = await getSnippets(page, 20);

  if (data.error) {
    return (
      <div className="bg-error-container text-on-error-container p-4 rounded text-sm font-semibold">
        {data.error}
      </div>
    );
  }

  const snippets = data.content || [];
  const totalPages = data.totalPages || 0;

  if (snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-on-surface-variant bg-surface-container border border-outline-variant rounded-xl border-dashed p-8">
        <FileCode2 size={48} className="mb-4 opacity-50" />
        <p className="font-semibold">No snippets yet.</p>
        <p className="text-sm mt-1">Head over to the playground to write and save some code.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.map((snippet: any) => (
          <a key={snippet.snippetId} href={`/editor/${snippet.snippetId}`}>
            <div className="bg-surface border border-outline-variant rounded-xl p-5 hover:border-primary transition-all group flex flex-col h-full cursor-pointer hover:shadow-md">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-on-surface truncate pr-4 group-hover:text-primary transition-colors">
                  {snippet.title || "Untitled Snippet"}
                </h3>
                <div className="bg-surface-variant text-on-surface-variant text-xs font-code-sm px-2 py-1 rounded shrink-0">
                  {snippet.language}
                </div>
              </div>
              <div className="flex-1">
                <pre className="text-xs font-code-sm text-on-surface-variant line-clamp-3 bg-surface-container-lowest p-2 rounded border border-outline-variant/30">
                  {snippet.sourceCode}
                </pre>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant font-semibold">
                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(snippet.createdAt).toLocaleDateString()}</span>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 pb-8">
          {page > 0 && (
            <Link href={`/dashboard?page=${page - 1}`} className="px-4 py-2 bg-surface-container border border-outline-variant rounded hover:bg-surface-variant transition-colors text-sm font-semibold">
              Previous
            </Link>
          )}
          <span className="px-4 py-2 text-sm font-semibold text-on-surface-variant flex items-center">
            Page {page + 1} of {totalPages}
          </span>
          {page < totalPages - 1 && (
            <Link href={`/dashboard?page=${page + 1}`} className="px-4 py-2 bg-surface-container border border-outline-variant rounded hover:bg-surface-variant transition-colors text-sm font-semibold">
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}
