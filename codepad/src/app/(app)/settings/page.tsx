"use client";

import { useState, useEffect } from "react";
import { getPasskeys, deletePasskey, deleteAccount } from "./actions";
import { KeyRound, Trash2, Plus, Loader2, AlertTriangle, Fingerprint, User, Usb, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { create } from "@github/webauthn-json";
import { Modal } from "@/components/modal";

export default function SettingsPage() {
  const [passkeys, setPasskeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

  const [passkeyToDelete, setPasskeyToDelete] = useState<string | null>(null);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRegisterPasskey, setShowRegisterPasskey] = useState(false);
  const [newPasskeyName, setNewPasskeyName] = useState("");

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then(res => res.json())
      .then(data => setCsrfToken(data.token))
      .catch(console.error);

    loadPasskeys();
  }, []);

  const loadPasskeys = () => {
    setLoading(true);
    getPasskeys().then(res => {
      if (!res.error) setPasskeys(res);
      setLoading(false);
    });
  };

  const handleAddPasskey = async () => {
    if (!newPasskeyName.trim()) return;
    try {
      setActionLoading(true);
      
      const optionsRes = await fetch("/webauthn/register/options", {
        method: "POST",
        headers: { "X-CSRF-TOKEN": csrfToken }
      });
      if (!optionsRes.ok) throw new Error("Failed to get registration options");
      
      const optionsJson = await optionsRes.json();
      
      
      const credential = await create({ publicKey: optionsJson });

      
      const registerRes = await fetch("/webauthn/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ publicKey: { credential, label: newPasskeyName } }),
      });

      if (!registerRes.ok) throw new Error("Passkey registration failed");
      
      setShowRegisterPasskey(false);
      setNewPasskeyName("");
      loadPasskeys();
    } catch (error) {
      console.error(error);
      alert("Error adding passkey");
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDeletePasskey = async () => {
    if (!passkeyToDelete) return;
    setActionLoading(true);
    const res = await deletePasskey(passkeyToDelete);
    setActionLoading(false);
    if (!res.error) {
      setPasskeyToDelete(null);
      loadPasskeys();
    } else {
      alert(res.error);
    }
  };

  const confirmDeleteAccount = async () => {
    setActionLoading(true);
    const res = await deleteAccount();
    setActionLoading(false);
    if (!res.error) {
      router.push("/");
    } else {
      alert(res.error);
      setShowDeleteAccount(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto w-full h-full overflow-y-auto">
      <h1 className="font-headline-md text-2xl font-bold text-on-surface mb-8">Settings</h1>

      <section className="bg-surface border border-outline-variant rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-bold text-lg text-on-surface flex items-center gap-2">
              <KeyRound size={20} className="text-primary" /> Passkeys
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">Manage passkeys used for passwordless login.</p>
          </div>
          <button 
            onClick={() => {
              setNewPasskeyName("");
              setShowRegisterPasskey(true);
            }}
            disabled={loading}
            className="flex items-center gap-2 bg-primary-container text-on-primary-container font-semibold px-4 py-2 rounded hover:bg-orange-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Add Passkey
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-4"><Loader2 className="animate-spin text-primary" /></div>
        ) : passkeys.length === 0 ? (
          <div className="text-center p-6 bg-surface-container-lowest border border-outline-variant/50 rounded border-dashed text-on-surface-variant text-sm">
            No passkeys registered.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {passkeys.map(pk => (
              <li key={pk.id} className="flex justify-between items-center p-3 bg-surface-container rounded border border-outline-variant">
                <div>
                  <div className="font-semibold text-on-surface">{pk.label || "Passkey"}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Created: {new Date(pk.created).toLocaleDateString()}
                  </div>
                </div>
                <button 
                  onClick={() => setPasskeyToDelete(pk.id)}
                  className="p-2 text-error hover:bg-error-container hover:text-on-error-container rounded transition-colors"
                  title="Remove passkey"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
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

      
      {showRegisterPasskey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative z-10 w-full max-w-sm bg-surface-container-highest border border-outline-variant/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <button 
              onClick={() => !actionLoading && setShowRegisterPasskey(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={16} />
            </button>
            <div className="p-6 pb-0">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_24px_rgba(249,115,22,0.25)] mb-4">
                <Fingerprint size={20} />
              </div>
              <h2 className="font-headline-sm text-lg font-semibold mb-1 text-on-surface">Register a Passkey</h2>
              <p className="text-sm text-on-surface-variant">Use biometric or a hardware key to sign in without a password.</p>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-surface-variant flex items-center justify-center font-code-sm text-xs font-semibold text-on-surface mt-0.5">1</span>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Name this passkey</label>
                    <input 
                      autoFocus
                      className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 font-code-sm text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                      type="text" 
                      placeholder="e.g. MacBook Pro TouchID"
                      value={newPasskeyName}
                      onChange={e => setNewPasskeyName(e.target.value)}
                      disabled={actionLoading}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-surface-variant flex items-center justify-center font-code-sm text-xs font-semibold text-on-surface">2</span>
                  <span className="text-sm font-semibold text-on-surface-variant">Tap the button and authenticate</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-surface-variant flex items-center justify-center font-code-sm text-xs font-semibold text-on-surface">3</span>
                  <span className="text-sm font-semibold text-on-surface-variant">Done</span>
                </div>
              </div>
              <div className="mt-2 pt-4 border-t border-outline-variant/30">
                <span className="text-[11px] font-bold text-on-surface-variant block mb-3 uppercase tracking-wider">Works with</span>
                <div className="flex gap-4 text-on-surface-variant">
                  <User size={20} />
                  <Fingerprint size={20} />
                  <Usb size={20} />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4 border-t border-outline-variant/30 flex justify-end gap-3 mt-auto bg-surface-container">
              <button 
                onClick={() => !actionLoading && setShowRegisterPasskey(false)}
                disabled={actionLoading}
                className="px-4 py-2 rounded text-sm font-semibold border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPasskey}
                disabled={actionLoading || !newPasskeyName.trim()}
                className="px-4 py-2 rounded bg-primary text-on-primary text-sm font-semibold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.25)] disabled:opacity-50"
              >
                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <>Register Passkey <KeyRound size={16} /></>}
              </button>
            </div>
          </div>
        </div>
      )}

      
      <Modal
        isOpen={!!passkeyToDelete}
        onClose={() => !actionLoading && setPasskeyToDelete(null)}
        title={<span className="flex items-center gap-2"><Trash2 size={20} className="text-error" /> Remove Passkey</span>}
        footer={
          <>
            <button 
              onClick={() => setPasskeyToDelete(null)}
              disabled={actionLoading}
              className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeletePasskey}
              disabled={actionLoading}
              className="px-4 py-2 text-sm font-semibold bg-error text-on-error hover:bg-red-700 rounded transition-colors flex items-center gap-2"
            >
              {actionLoading && <Loader2 size={16} className="animate-spin" />}
              Remove
            </button>
          </>
        }
      >
        Are you sure you want to remove this passkey? You will no longer be able to use it to sign in.
      </Modal>

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
  );
}
