import { redirect } from "next/navigation";
import { SolveClient } from "./SolveClient";
import { requireAuth } from "@/lib/session";
import { Metadata } from "next";
import { getProblemBySlug } from "@/app/problems/actions";
import { fetchAuthenticated } from "@/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const problem = await getProblemBySlug(slug);
    if (problem) {
      return {
        title: `${problem.title} - CodePad`,
        description: problem.description?.substring(0, 150) + "...",
      };
    }
  } catch (e) {
    console.error("Error generating metadata for solve page:", e);
  }
  
  return {
    title: `Solve Problem - CodePad`,
  };
}

async function getProblem(slug: string) {
  const res = await fetchAuthenticated(`/api/problems/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProblemSolvePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = await requireAuth();

  const problem = await getProblem(slug);
  if (!problem) {
    return <div className="p-8 text-white">Problem not found</div>;
  }

  return <SolveClient problem={problem} token={token} />;
}
