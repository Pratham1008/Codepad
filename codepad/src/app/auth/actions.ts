"use server";

import { setSession, clearSession } from "@/lib/session";

export async function setFirebaseSession(token: string) {
  // We can decode the JWT to get the username (which would be email or name if set) or just leave username empty for now.
  // Actually, we'll just set the accessToken cookie for backend requests.
  await setSession({ accessToken: token, username: "" });
}

export async function logout() {
  await clearSession();
}
