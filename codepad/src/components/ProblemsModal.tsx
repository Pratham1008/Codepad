import { useState, useEffect } from "react";
import { Loader2, X, Target, Clock, HardDrive, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProblemsAuthenticated } from "@/app/problems/actions";

export function ProblemsModal({ onClose, token }: { onClose: () => void, token?: string }) {
  const [problems, setProblems] = useState<any[]>([]);
  const [totalProblems, setTotalProblems] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProblems = async (pageNum: number, isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);
    
    try {
      const res = await getProblemsAuthenticated(pageNum, 10); // 10 problems per page
      if (res.error) throw new Error(res.error);
      
      setProblems(prev => isLoadMore ? [...prev, ...(res.problems || [])] : (res.problems || []));
      setTotalProblems(res.totalElements || 0);
      setHasMore(pageNum + 1 < (res.totalPages || 0));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch problems');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProblems(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProblems(nextPage, true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-zinc-200 font-sans">
      <div className="bg-[#1e1e1e] border border-zinc-700/50 w-full max-w-4xl rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-[#252526]">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="text-primary w-5 h-5" /> Problem Library {totalProblems > 0 && <span className="text-zinc-400 text-sm font-normal">({totalProblems} problems)</span>}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-zinc-700 rounded-md transition-colors">
            <X size={20} className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#1e1e1e]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 text-zinc-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span>Loading challenges...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-48 text-red-400">
              {error}
            </div>
          ) : problems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
              <Target className="w-12 h-12 mb-3 opacity-20" />
              <p>No problems available right now.</p>
            </div>
          ) : (
            <div className="grid gap-3 pb-6">
              {problems.map(p => (
                <div 
                  key={p.problemId} 
                  onClick={() => router.push(`/solve/${p.slug}`)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-800/30 hover:bg-zinc-800 border border-zinc-800/50 hover:border-zinc-700 rounded-lg cursor-pointer transition-all duration-200 shadow-sm"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      <span className={`px-2 py-0.5 rounded-md font-medium border ${
                        p.difficulty === 'EASY' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' :
                        p.difficulty === 'MEDIUM' ? 'text-orange-400 border-orange-400/20 bg-orange-400/10' :
                        'text-red-400 border-red-400/20 bg-red-400/10'
                      }`}>
                        {p.difficulty}
                      </span>
                      {p.timeLimitMs && (
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.timeLimitMs}ms</span>
                      )}
                      {p.memoryLimitKb && (
                        <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> {Math.round(p.memoryLimitKb / 1024)}MB</span>
                      )}
                      {p.tags && p.tags.length > 0 && (
                        <span className="flex items-center gap-1.5"><Hash className="w-3.5 h-3.5" /> {p.tags.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <button className="hidden sm:flex mt-3 sm:mt-0 px-4 py-1.5 bg-zinc-700 hover:bg-primary text-white hover:text-on-primary text-sm font-semibold rounded transition-colors items-center gap-2">
                    Solve
                  </button>
                </div>
              ))}
              
              {hasMore && problems.length > 0 && (
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-6 py-2 bg-[#2d2d2d] hover:bg-[#3c3c3c] border border-[#3c3c3c] rounded text-sm text-white disabled:opacity-50 transition-colors"
                  >
                    {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                    Load More Problems
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
