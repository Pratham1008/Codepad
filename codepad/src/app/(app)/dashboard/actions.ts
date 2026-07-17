"use server";

import { getSession, clearSession } from "@/lib/session";
import type { Project } from "@/lib/types";

export async function logoutAction() {
  await clearSession();
}

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function getProjects(): Promise<{ error: string } | Project[]> {
  const { token } = await getSession();

  console.log("getProjects called, token exists:", !!token);

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log("getProjects error response:", res.status, errorText);
      return { error: "Failed to load projects" };
    }

    const data = await res.json();
    console.log("getProjects fetch result:", data);
    return data.content || data;
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
    const response = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      cache: 'no-store',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return { error: "Failed to create project" };
    }

    const responseData = await response.json();
    console.log("createProject result:", responseData);
    return responseData;
  } catch (error) {
    console.error("Create project error", error);
    return { error: "Failed to connect to server" };
  }
}
