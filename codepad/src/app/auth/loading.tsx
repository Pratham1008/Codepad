import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
}
