"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Code, KeyRound, Loader2 } from "lucide-react";
import { login, register, savePasskeySession } from "./actions";
import { useRouter } from "next/navigation";
import { get } from "@github/webauthn-json";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then(res => res.json())
      .then(data => setCsrfToken(data.token))
      .catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);

    const action = isLogin ? login : register;
    const res = await action(formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handlePasskeyLogin() {
    setLoading(true);
    setError(null);
    try {
      
      const optionsRes = await fetch("/webauthn/authenticate/options", {
        method: "POST",
        headers: { "X-CSRF-TOKEN": csrfToken }
      });
      if (!optionsRes.ok) throw new Error("Failed to get passkey options");
      const optionsJson = await optionsRes.json();

      
      const credential = await get({ publicKey: optionsJson });

      
      const loginRes = await fetch("/login/webauthn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(credential),
      });

      if (!loginRes.ok) throw new Error("Passkey login failed");
      
      const authData = await loginRes.json();
      await savePasskeySession(authData);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Passkey login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container border border-outline-variant rounded-xl p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-surface-variant rounded-xl flex items-center justify-center mb-4">
            <Code className="text-primary" size={24} />
          </div>
          <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Welcome to CodePad</h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            {isLogin ? "Sign in to your workspace" : "Create your workspace"}
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded mb-4 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Username
            </label>
            <input 
              name="username"
              type="text" 
              required
              className="w-full bg-background border border-outline-variant rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Email
              </label>
              <input 
                name="email"
                type="email" 
                required={!isLogin}
                className="w-full bg-background border border-outline-variant rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Password
            </label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full bg-background border border-outline-variant rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container font-semibold py-2.5 rounded hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-outline-variant flex-1"></div>
          <span className="text-xs text-on-surface-variant uppercase font-semibold tracking-wider">OR</span>
          <div className="h-px bg-outline-variant flex-1"></div>
        </div>

        {isLogin && (
          <button 
            onClick={handlePasskeyLogin}
            disabled={loading}
            className="w-full bg-surface-container-high border border-outline-variant text-on-surface font-semibold py-2.5 rounded hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
          >
            <KeyRound size={18} />
            Sign in with Passkey
          </button>
        )}

        <div className="mt-8 text-center text-sm text-on-surface-variant">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-primary hover:underline font-semibold"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
