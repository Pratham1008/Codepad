"use server";

import { fetchPublicCached, fetchAuthenticated } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { cacheLife, cacheTag } from "next/cache";

export async function getProblemsPublic(page = 0, size = 20, difficulty?: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("problems");

  let url = `/api/problems?page=${page}&size=${size}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  
  try {
    const res = await fetchPublicCached(url, "problems");
    if (!res.ok) return { error: "Failed to load problems" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function getProblemBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`problem-${slug}`);

  try {
    const res = await fetchPublicCached(`/api/problems/${slug}`, `problem-${slug}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function getProblemsAuthenticated(page = 0, size = 20, difficulty?: string) {
  let url = `/api/problems?page=${page}&size=${size}`;
  if (difficulty) url += `&difficulty=${difficulty}`;

  try {
    const res = await fetchAuthenticated(url);
    if (!res.ok) return { error: "Failed to load problems" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";
import { getSession } from "@/lib/session";

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
    revalidateTag("problems", "max");
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function updateProblem(id: string, data: any) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/problems/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const txt = await res.text();
      return { error: `Failed to update problem: ${txt || res.statusText}` };
    }
    revalidateTag("problems", "max");
    if (data.slug) revalidateTag(`problem-${data.slug}`, "max");
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function deleteProblem(id: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/problems/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!res.ok) {
      const txt = await res.text();
      return { error: `Failed to delete problem: ${txt || res.statusText}` };
    }
    revalidateTag("problems", "max");
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}
