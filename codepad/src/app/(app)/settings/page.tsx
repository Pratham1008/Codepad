import { getUserProfile } from "./actions";
import { SettingsClient } from "./SettingsClient";
import { requireAuth } from "@/lib/session";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function SettingsContent() {
  await requireAuth();
  
  const profileRes = await getUserProfile();

  const userProfile = profileRes?.error ? null : profileRes;
  const error = profileRes?.error ? "Some data failed to load." : undefined;

  return (
    <SettingsClient 
      userProfile={userProfile} 
      initialError={error} 
    />
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="p-8 max-w-3xl mx-auto w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}
