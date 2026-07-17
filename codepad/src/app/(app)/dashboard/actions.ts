"use server";

import { getSession } from "@/lib/session";
import type { Project } from "@/lib/types";

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function getProjects(): Promise<{ error: string } | Project[]> {
  const { token } = await getSession();

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      return { error: "Failed to load projects" };
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch projects error", error);
    return { error: "Failed to connect to server" };
  }
}

export async function createProject(data: { name: string, language: string }): Promise<{ error: string } | Project> {
  const { token } = await getSession();

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      return { error: "Failed to create project" };
    }

    return await res.json();
  } catch (error) {
    console.error("Create project error", error);
    return { error: "Failed to connect to server" };
  }
}
