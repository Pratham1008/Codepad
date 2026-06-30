"use server";

import { setSession, clearSession } from "@/lib/session";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      return { error: errData?.message || errData?.error || "Invalid credentials" };
    }

    const data = await res.json();
    await setSession(data);
    return { success: true };
  } catch (error) {
    console.error("Login error", error);
    return { error: "An error occurred during login" };
  }
}

export async function register(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = "USER";

  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      return { error: errData?.message || errData?.error || "Registration failed" };
    }

    const data = await res.json();
    await setSession(data);
    return { success: true };
  } catch (error) {
    console.error("Register error", error);
    return { error: "An error occurred during registration" };
  }
}

export async function logout() {
  await clearSession();
}

export async function savePasskeySession(data: any) {
  await setSession(data);
}
