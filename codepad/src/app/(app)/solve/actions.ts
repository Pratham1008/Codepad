"use server";

import { getSession } from "@/lib/session";

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";


export async function createProblem(data: any) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/problems`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const txt = await res.text();
      return { error: `Failed to create problem: ${txt || res.statusText}` };
    }
    
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function runSamples(problemId: string, language: string, sourceCode: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };
  try {
    const res = await fetch(`${API_BASE}/api/problems/${problemId}/submissions/run`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ language, sourceCode }),
    });
    if (!res.ok) return { error: res.status === 429 ? "Rate limit exceeded. Please wait." : "Failed to run code." };
    return await res.json();
  } catch {
    return { error: "Connection error" };
  }
}

export async function submitSolution(problemId: string, language: string, sourceCode: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };
  try {
    const res = await fetch(`${API_BASE}/api/problems/${problemId}/submissions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ language, sourceCode }),
    });
    if (!res.ok) return { error: res.status === 429 ? "Rate limit exceeded. Please wait." : "Failed to submit code." };
    return await res.json();
  } catch {
    return { error: "Connection error" };
  }
}
