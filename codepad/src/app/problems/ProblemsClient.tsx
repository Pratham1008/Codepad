"use client";
import { useState } from "react";
import { Code, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function ProblemsClient({ initialProblems }: { initialProblems: any[] }) {
  const [filter, setFilter] = useState("All");

  const filteredProblems = filter === "All" 
    ? initialProblems 
    : initialProblems.filter(p => p.difficulty?.toLowerCase() === filter.toLowerCase());

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-on-surface-variant bg-surface-variant/50 border-outline-variant';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto w-full max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-extrabold text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
          Coding Challenges
        </h1>
        <p className="text-on-surface-variant text-lg">
          Master algorithmic problem solving with our curated collection of coding challenges.
        </p>
      </motion.div>

      <div className="flex justify-center gap-3 mb-8">
        {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
          <button
            key={diff}
            onClick={() => setFilter(diff)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === diff 
                ? 'bg-primary text-on-primary shadow-md shadow-primary/20 scale-105' 
                : 'bg-surface-variant/50 text-on-surface hover:bg-surface-variant'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Code size={18} className="text-primary" /> {filter === 'All' ? 'All Problems' : `${filter} Problems`}
          </h2>
        </div>
        
        <div className="min-h-[400px]">
          {filteredProblems.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant flex flex-col items-center">
              <Code size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium text-on-surface mb-1">No problems found</p>
              <p className="text-sm">Try selecting a different difficulty filter.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-outline-variant"
            >
              {filteredProblems.map(p => (
                <motion.div variants={itemVariants} key={p.problemId || p.slug}>
                  <Link 
                    href={`/problems/${p.slug}`}
                    className="flex items-center justify-between p-5 px-6 hover:bg-surface-variant/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-[12px] h-[12px] rounded-full bg-surface-variant group-hover:bg-primary/50 transition-colors shrink-0" />
                      <div>
                        <h3 className="font-semibold text-on-surface text-lg group-hover:text-primary transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(p.difficulty)}`}>
                        {p.difficulty}
                      </span>
                      <ChevronRight className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
