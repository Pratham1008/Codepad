import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AuthClient } from "./AuthClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - CodePad",
  description: "Sign in or create an account to start coding in the cloud with CodePad.",
  openGraph: {
    title: "Sign In - CodePad",
    description: "Sign in or create an account to start coding in the cloud with CodePad.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign In - CodePad",
    description: "Sign in or create an account to start coding in the cloud with CodePad.",
  },
};

export default async function AuthPage() {
  const { token } = await getSession();
  
  if (token) {
    redirect("/editor");
  }

  return <AuthClient />;
}
