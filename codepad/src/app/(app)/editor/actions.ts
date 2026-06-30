"use server";

import { getSession } from "@/lib/session";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export async function getSnippet(id: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/snippets/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: "no-store"
    });
    if (!res.ok) return { error: "Failed to load snippet" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function saveSnippet(id: string | null, data: { title: string, code: string, language: string }) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const url = `${API_BASE}/api/snippets`;

        const payload = {
      snippetId: id,
      title: data.title,
      sourceCode: data.code,
      language: data.language
    };

        const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

        if (!res.ok) return { error: "Failed to save snippet" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function runCode(data: { code: string, language: string, stdin?: string }) {
  const { token } = await getSession();

  try {
    const headers: any = {
      "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/api/run`, {
      method: "POST",
      headers,
      body: JSON.stringify({ 
        sourceCode: data.code, 
        language: data.language, 
        stdin: data.stdin 
      })
    });

        if (!res.ok) {
      const text = await res.text();
      console.error("RunCode backend error:", res.status, text);
      return { error: "Execution failed: " + res.status + " " + text };
    }
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}
