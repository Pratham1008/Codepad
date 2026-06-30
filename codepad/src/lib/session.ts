import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  username: string;
  role: string;
};

export async function setSession(data: AuthResponse) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, 
  });
  cookieStore.set("username", data.username, {
    path: "/",
    maxAge: 60 * 60 * 24, 
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("username");
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const username = cookieStore.get("username")?.value;
  return { token, username };
}

export async function requireAuth() {
  const { token } = await getSession();
  if (!token) {
    redirect("/auth");
  }
  return token;
}
