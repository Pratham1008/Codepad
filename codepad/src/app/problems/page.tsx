import { getProblemsPublic } from "./actions";
import { ProblemsClient } from "./ProblemsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding Challenges - CodePad",
  description: "Master algorithmic problem solving with our curated collection of coding challenges.",
};

export default async function PublicProblemsPage() {
  const res = await getProblemsPublic(0, 50); // Fetch initial problems on server
  const initialProblems = res?.content || res?.problems || [];

  return (
    <ProblemsClient initialProblems={initialProblems} />
  );
}
