"use client";

import { useState, useEffect } from "react";
import { WifiOff, AlertTriangle } from "lucide-react";

export function NetworkChecker() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
            <WifiOff className="w-8 h-8 text-red-400" />
          </div>
          
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            Network Connection Lost
          </h2>
          
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/90 text-sm p-4 rounded-lg flex items-start gap-3 text-left">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p>
              Please <strong>do not refresh</strong> the browser. We highly recommend taking a local backup of your unsaved code to prevent data loss until your connection is restored.
            </p>
          </div>
          
          <p className="text-[#858585] text-sm animate-pulse pt-2">
            Waiting for connection to return...
          </p>
        </div>
      </div>
    </div>
  );
}
