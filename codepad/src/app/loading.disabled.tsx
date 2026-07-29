import { EditorSkeleton } from "@/components/EditorSkeleton";

export default function Loading() {
  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 shimmer pointer-events-none opacity-20" />
      <div className="w-full max-w-5xl mx-auto h-full p-8 flex flex-col gap-4">
        <div className="h-12 w-1/3 bg-surface-2 rounded-lg animate-pulse" />
        <div className="h-4 w-1/4 bg-surface-2 rounded animate-pulse" />
        <div className="flex-1 w-full bg-surface-1 rounded-xl border border-surface-3 mt-4 overflow-hidden animate-pulse">
           <EditorSkeleton />
        </div>
      </div>
    </div>
  );
}
