"use client";
import { useState, useEffect } from "react";
import { Code, ChevronRight, ChevronLeft, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { getProblemsAuthenticated, getProblemsPublic, deleteProblem, getProblemBySlug } from "./actions";
import { getUserProfile } from "@/app/(app)/settings/actions";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export function ProblemsClient({ initialProblems }: { initialProblems: any[] }) {
  const router = useRouter();
  const [problems, setProblems] = useState<any[]>(initialProblems);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      if (profile && !profile.error && profile.role === "ROLE_ADMIN") {
        setIsAdmin(true);
        const res = await getProblemsAuthenticated(0, 100);
        setProblems(res?.content || res?.problems || []);
      } else {
        const res = await getProblemsPublic(0, 100);
        setProblems(res?.content || res?.problems || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      setLoading(true);
      await deleteProblem(id);
      await loadData();
    }
  };

  const handleEdit = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    router.push(`/problems/${slug}/edit`);
  };

  const filteredProblems = filter === "All" 
    ? problems 
    : problems.filter(p => p.difficulty?.toLowerCase() === filter.toLowerCase());

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleFilterChange = (diff: string) => {
    setFilter(diff);
    setCurrentPage(1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-on-surface-variant bg-surface-2 border-outline';
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Coding Challenges
        </h1>
        <p className="text-on-surface-variant text-base text-center max-w-2xl">
          Sharpen your skills with curated algorithmic problems.
        </p>
        {isAdmin && (
          <Link
            href="/problems/create"
            className="absolute right-0 top-0 flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2 rounded hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Create Problem
          </Link>
        )}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
          <button
            key={diff}
            onClick={() => handleFilterChange(diff)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === diff 
                ? 'bg-primary text-on-primary shadow-md shadow-primary/20 scale-105' 
                : 'bg-surface-2 text-on-surface hover:bg-surface-3'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      <div className="bg-surface-1 border border-outline/50 rounded-xl overflow-hidden shadow-lg relative">
        {loading && (
          <div className="absolute inset-0 bg-surface-1/50 backdrop-blur-sm flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}
        <div className="px-6 py-3 border-b border-outline bg-surface-2 flex items-center justify-between">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <Code size={16} className="text-primary" /> {filter === 'All' ? 'All Problems' : `${filter} Problems`}
          </h2>
          <span className="text-xs text-on-surface-variant">
            Showing {filteredProblems.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filteredProblems.length)} of {filteredProblems.length}
          </span>
        </div>
        
        <div className="min-h-[400px]">
          {paginatedProblems.length === 0 && !loading ? (
            <div className="p-16 text-center text-on-surface-variant flex flex-col items-center">
              <Code size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium text-on-surface mb-1">No problems found</p>
              <p className="text-sm">Try selecting a different difficulty filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-outline/50">
              {paginatedProblems.map((p, idx) => (
                <Link 
                  key={p.problemId || p.slug}
                  href={`/problems/${p.slug}`}
                  className="flex items-center justify-between p-4 px-6 hover:bg-surface-2/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-on-surface-variant font-mono w-6 text-right">{startIdx + idx + 1}</span>
                    <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getDifficultyColor(p.difficulty)}`}>
                      {p.difficulty}
                    </span>
                    {isAdmin ? (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                        <button 
                          onClick={(e) => handleEdit(e, p.slug)} 
                          className="p-1.5 bg-surface-3 hover:bg-primary/20 hover:text-primary text-on-surface-variant rounded transition-colors"
                          title="Edit Problem"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, p.problemId, p.title)} 
                          className="p-1.5 bg-surface-3 hover:bg-error/20 hover:text-error text-on-surface-variant rounded transition-colors"
                          title="Delete Problem"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <ChevronRight size={18} className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all ml-2" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-outline flex items-center justify-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {getPageNumbers().map((page, i) => (
              typeof page === 'number' ? (
                <button
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                      : 'text-on-surface-variant hover:bg-surface-2'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={i} className="w-9 h-9 flex items-center justify-center text-on-surface-variant text-sm">…</span>
              )
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
