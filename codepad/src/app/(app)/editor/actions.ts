"use server";

import { getSession } from "@/lib/session";

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function getProject(id: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: "no-store"
    });
    if (!res.ok) return { error: "Failed to load project" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function getProjectTree(id: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}/files/tree`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: "no-store"
    });
    if (!res.ok) return { error: "Failed to load project tree" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function readFile(id: string, path: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}/files?path=${encodeURIComponent(path)}`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: "no-store"
    });
    if (!res.ok) return { error: "Failed to read file" };
    return await res.text();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function writeFile(id: string, path: string, content: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}/files?path=${encodeURIComponent(path)}`, {
      method: "PUT",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"
      },
      body: content
    });

    if (!res.ok) return { error: "Failed to save file" };
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function runProject(projectId: string, stdin?: string) {
  const { token } = await getSession();

  try {
    const headers: any = {
      "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/api/projects/${projectId}/run`, {
      method: "POST",
      headers,
      body: JSON.stringify(stdin ? { stdin } : {})
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

export async function runDiagnostics(projectId: string, activeFile: string, content: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${projectId}/diagnostics`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ activeFile, content })
    });
    if (!res.ok) return { error: "Failed to get diagnostics" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function createFile(projectId: string, path: string, type: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${projectId}/files`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path, type })
    });
    if (!res.ok) return { error: "Failed to create file" };
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function renameFile(projectId: string, oldPath: string, newPath: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${projectId}/files`, {
      method: "PATCH",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ oldPath, newPath })
    });
    if (!res.ok) return { error: "Failed to rename file" };
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function deleteFile(projectId: string, path: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/projects/${projectId}/files?path=${encodeURIComponent(path)}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) return { error: "Failed to delete file" };
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}
