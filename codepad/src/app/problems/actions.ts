"use server";

import { fetchPublicCached, fetchAuthenticated } from "@/lib/api";

export async function getProblemsPublic(page = 0, size = 20, difficulty?: string) {
  "use cache";
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
