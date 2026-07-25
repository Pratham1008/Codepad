import { getProblemBySlug } from "../actions";
import { getSession } from "@/lib/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ExampleBlock } from "@/components/ExampleBlock";
import Link from "next/link";
import { Clock, Cpu, ArrowLeft, ChevronRight, Play } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);
  if (!problem) return { title: "Problem Not Found - CodePad" };
  return {
    title: `${problem.title} - CodePad Problems`,
    description: problem.description?.substring(0, 160) || "Solve this algorithmic coding challenge on CodePad.",
    openGraph: {
      title: `${problem.title} - CodePad`,
      description: problem.description?.substring(0, 160) || "Solve this algorithmic coding challenge on CodePad.",
    },
  };
}

export default async function PublicProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);
  if (!problem) notFound();
  
  const { token } = await getSession();
  const isLoggedIn = !!token;

  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-on-surface-variant bg-surface-variant/50 border-outline-variant';
    }
  };

  return (
    <div className="flex-1 bg-background text-on-surface">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-6">
          <Link href="/problems" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft size={16} /> All Problems
          </Link>
          <ChevronRight size={14} />
          <span className="truncate">{problem.title}</span>
        </div>

        {/* Header */}
        <div className="bg-surface-container border border-outline-variant rounded-xl p-6 md:p-8 shadow-xl mb-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-3xl font-bold text-on-surface">{problem.title}</h1>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
              {problem.timeLimitMs && (
                <div className="flex items-center gap-1.5 bg-surface-variant/30 px-3 py-1.5 rounded-md">
                  <Clock size={14} className="text-primary" /> 
                  <span>Time Limit: <strong>{problem.timeLimitMs} ms</strong></span>
                </div>
              )}
              {problem.memoryLimitKb && (
                <div className="flex items-center gap-1.5 bg-surface-variant/30 px-3 py-1.5 rounded-md">
                  <Cpu size={14} className="text-primary" /> 
                  <span>Memory Limit: <strong>{Math.round(problem.memoryLimitKb / 1024)} MB</strong></span>
                </div>
              )}
            </div>
          </div>
          
          <div className="shrink-0">
            {isLoggedIn ? (
              <Link href={`/solve/${problem.slug}`} className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-orange-600 transition-all shadow-md shadow-primary/20 scale-100 hover:scale-105">
                <Play size={18} fill="currentColor" /> Solve This Problem
              </Link>
            ) : (
              <Link href="/auth" className="flex items-center gap-2 px-6 py-3 bg-surface-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-high transition-all border border-outline-variant shadow-sm">
                Sign In to Solve
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 prose prose-invert max-w-none prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-outline-variant">
            <MarkdownRenderer content={problem.description || "No description provided."} />
          </div>
          
          {(problem.examples || []).length > 0 && (
            <div className="p-6 md:p-8 border-t border-outline-variant bg-surface-container">
              <h2 className="text-xl font-bold mb-6 text-on-surface">Examples</h2>
              <div className="space-y-6">
                {problem.examples.map((ex: any, idx: number) => (
                  <ExampleBlock key={idx} index={idx + 1} input={ex.input || ex.inputText || ''} expectedOutput={ex.expectedOutput || ex.outputText || ''} explanation={ex.explanation} />
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
