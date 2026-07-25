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
