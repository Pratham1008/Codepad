import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AuthClient } from "./AuthClient";

export default async function AuthPage() {
  const { token } = await getSession();
  
  if (token) {
    redirect("/dashboard");
  }

  return <AuthClient />;
}
