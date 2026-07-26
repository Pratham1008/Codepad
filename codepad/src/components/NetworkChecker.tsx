"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WifiOff, Wifi } from "lucide-react";

/**
 * Passive, client-side-only network status toast.
 * - Never fires requests on its own except tiny, occasional reachability pings
 *   (only while the browser THINKS it's offline, to confirm — not continuous polling).
 * - Never refreshes the page or re-sends any in-flight request.
 * - Just informs the user + nudges them to back up unsaved work.
 */
export function NetworkChecker() {
  const [isOnline, setIsOnline] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [justRecovered, setJustRecovered] = useState(false);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goOffline = useCallback(() => {
    setIsOnline(false);
    setJustRecovered(false);
    setShowToast(true);
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
  }, []);

  const goOnline = useCallback(() => {
    setIsOnline(true);
    setJustRecovered(true);
    setShowToast(true);
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = setTimeout(() => setShowToast(false), 4000);
  }, []);

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [goOnline, goOffline]);

  if (!showToast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[9999] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div
        className={`flex items-start gap-3 rounded-xl border shadow-2xl p-4 backdrop-blur-md ${
          isOnline
            ? "bg-card/95 border-outline-variant/50"
            : "bg-card/95 border-destructive/40"
        }`}
      >
        <div
          className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
            isOnline ? "bg-secondary/15 text-secondary" : "bg-destructive/10 text-destructive"
          }`}
        >
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        </div>
        <div className="flex-1 min-w-0">
          {isOnline ? (
            <>
              <p className="text-sm font-semibold text-card-foreground">Back online</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Connection restored. Nothing was auto-submitted while you were offline.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-card-foreground">Connection lost</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You're currently offline. Any unsaved changes are only in this browser tab right
                now — please copy or save your work locally until the connection returns.
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => setShowToast(false)}
          aria-label="Dismiss"
          className="text-muted-foreground hover:text-card-foreground text-xs shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
