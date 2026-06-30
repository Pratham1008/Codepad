"use server";

import { getSession } from "@/lib/session";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export async function getSnippets(page = 0, size = 20) {
  const { token } = await getSession();

    if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await fetch(`${API_BASE}/api/snippets?page=${page}&size=${size}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      return { error: "Failed to load snippets" };
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch snippets error", error);
    return { error: "Failed to connect to server" };
  }
}
