"use client";

import { useEffect, useState } from "react";
import { getProblemsAuthenticated } from "@/app/problems/actions";
import { getUserProfile } from "../settings/actions";
import { Loader2, Code, ChevronRight, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import { CreateProblemModal } from "./CreateProblemModal";

export default function ProblemsPage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const load = async () => {
    try {
      const [res, profile] = await Promise.all([
        getProblemsAuthenticated(),
        getUserProfile()
      ]);
      
      if (res?.error) {
        setError(res.error);
      } else {
        setProblems(res?.content || res?.problems || []);
      }
      
      if (profile && !profile.error && profile.role === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    } catch (e) {
      setError("Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-on-surface-variant bg-surface-variant/50 border-outline-variant';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Problems</h1>
          <p className="text-on-surface-variant">Solve algorithmic challenges and improve your coding skills.</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-container text-on-primary-container font-semibold px-4 py-2 rounded hover:bg-orange-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Create Problem
          </button>
        )}
      </div>

      <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Code size={18} className="text-primary" /> All Problems
          </h2>
        </div>
        
        <div className="divide-y divide-outline-variant">
          {loading ? (
            <div className="p-12 flex justify-center text-on-surface-variant">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-error bg-error-container/10">{error}</div>
          ) : problems.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant flex flex-col items-center">
              <Code size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium text-on-surface mb-1">No problems found</p>
              <p className="text-sm">Check back later for new coding challenges.</p>
            </div>
          ) : (
            problems.map(p => (
              <Link 
                key={p.problemId || p.slug} 
                href={`/problems/${p.slug}`}
                className="flex items-center justify-between p-4 px-6 hover:bg-surface-variant/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {p.isSolved ? (
                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border border-outline-variant shrink-0" />
                  )}
                  <div>
                    <h3 className="font-semibold text-on-surface text-lg group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getDifficultyColor(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                  <ChevronRight className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      
      {isAdmin && (
        <CreateProblemModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            setLoading(true);
            load();
          }}
        />
      )}
    </div>
  );
}
