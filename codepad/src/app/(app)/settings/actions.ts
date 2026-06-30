"use server";

import { getSession, clearSession } from "@/lib/session";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export async function getPasskeys() {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/users/me/passkeys`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: "no-store"
    });
    if (!res.ok) return { error: "Failed to load passkeys" };
    return await res.json();
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function deletePasskey(credentialId: string) {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/users/me/passkeys/${credentialId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) return { error: "Failed to delete passkey" };
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}

export async function deleteAccount() {
  const { token } = await getSession();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) return { error: "Failed to delete account" };
    await clearSession();
    return { success: true };
  } catch (error) {
    return { error: "Connection error" };
  }
}
