"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function NetworkChecker() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Initial check
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
    <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border rounded-xl shadow-2xl p-8 max-w-md w-full text-center flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
          <WifiOff className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">You are offline</h2>
        <p className="text-muted-foreground">
          Please connect to the internet to use the services. The app will automatically resume once the connection is restored.
        </p>
      </div>
    </div>
  );
}
