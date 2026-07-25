"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Code, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setFirebaseSession } from "./actions";

export function AuthClient() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
      }
      
      const token = await userCredential.user.getIdToken();
      await setFirebaseSession(token);
      router.push("/editor");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      await setFirebaseSession(token);
      router.push("/editor");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <button 
        onClick={() => router.push('/')}
        className="absolute top-8 left-8 p-3 bg-surface-container-high hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors flex items-center gap-2 font-semibold shadow-sm border border-outline-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2"
        aria-label="Back to Home"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[448px] bg-surface-container border border-outline-variant rounded-xl p-8"
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
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Username
              </label>
              <input 
                name="username"
                type="text" 
                required={!isLogin}
                className="w-full bg-background border border-outline-variant rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Email
            </label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full bg-background border border-outline-variant rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
              Password
            </label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full bg-background border border-outline-variant rounded px-3 py-2 text-on-surface focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container font-semibold py-2.5 rounded hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-outline-variant after:mt-0.5 after:flex-1 after:border-t after:border-outline-variant">
          <p className="mx-4 mb-0 text-center text-sm font-semibold text-on-surface-variant">
            OR
          </p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-zinc-900 border border-zinc-300 font-semibold py-2.5 rounded hover:bg-zinc-50 transition-colors flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-offset-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="mt-8 text-center text-sm text-on-surface-variant">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-primary hover:underline font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
