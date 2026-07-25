"use client";

import { useState } from "react";
import { deleteAccount, getUserProfile } from "./actions";
import { Trash2, Loader2, AlertTriangle, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/modal";

interface SettingsClientProps {
  userProfile: { username?: string, email?: string } | null;
  initialError?: string;
}

export function SettingsClient({ userProfile: initialUserProfile, initialError }: SettingsClientProps) {
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const reloadData = async () => {
    setLoading(true);
    const profileRes = await getUserProfile();
    if (!profileRes?.error) setUserProfile(profileRes);
    setLoading(false);
  };

  const confirmDeleteAccount = async () => {
    setActionLoading(true);
    const res = await deleteAccount();
    setActionLoading(false);
    if (!res?.error) {
      router.push("/");
    } else {
      alert(res.error);
      setShowDeleteAccount(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-8 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors"
            title="Back to Editor"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline-md text-2xl font-bold text-on-surface">Settings</h1>
        </div>

      {initialError && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-8 text-sm font-semibold">
          {initialError}
        </div>
      )}

      <section className="bg-surface border border-outline-variant rounded-xl p-6 mb-8">
        <h2 className="font-bold text-lg text-on-surface flex items-center gap-2 mb-4">
          <User size={20} className="text-primary" /> Profile
        </h2>
        
        {loading && !userProfile ? (
          <div className="flex justify-center p-4"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Username</label>
              <div className="font-semibold text-on-surface text-lg mt-1">{userProfile?.username || "—"}</div>
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email</label>
              <div className="font-semibold text-on-surface text-lg mt-1">{userProfile?.email || "—"}</div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-error-container/10 border border-error/20 rounded-xl p-6">
        <h2 className="font-bold text-lg text-error flex items-center gap-2 mb-2">
          <AlertTriangle size={20} /> Danger Zone
        </h2>
        <p className="text-sm text-on-surface-variant mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button 
          onClick={() => setShowDeleteAccount(true)}
          className="bg-error text-on-error font-semibold px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </section>

      <Modal
        isOpen={showDeleteAccount}
        onClose={() => !actionLoading && setShowDeleteAccount(false)}
        title={<span className="flex items-center gap-2"><AlertTriangle size={20} className="text-error" /> Delete Account</span>}
        footer={
          <>
            <button 
              onClick={() => setShowDeleteAccount(false)}
              disabled={actionLoading}
              className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteAccount}
              disabled={actionLoading}
              className="px-4 py-2 text-sm font-semibold bg-error text-on-error hover:bg-red-700 rounded transition-colors flex items-center gap-2"
            >
              {actionLoading && <Loader2 size={16} className="animate-spin" />}
              Delete Everything
            </button>
          </>
        }
      >
        <p className="mb-2">Are you sure you want to completely delete your account?</p>
        <p className="font-semibold text-error">This action cannot be undone. All your snippets and settings will be permanently destroyed.</p>
      </Modal>
      </div>
    </div>
  );
}

