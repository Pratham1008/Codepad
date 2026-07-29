export function EditorSkeleton() {
  return (
    <div className="w-full h-full flex flex-col bg-[var(--surface-container-lowest)] animate-pulse">
      <div className="h-8 flex items-center gap-2 px-2 border-b border-[var(--surface-container-high)]">
        <div className="h-3 w-16 rounded bg-[var(--surface-container-high)]" />
        <div className="h-3 w-10 rounded bg-[var(--surface-container-high)]" />
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-10 flex flex-col items-end gap-2 pt-2 pr-2 border-r border-[var(--surface-container-high)]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-2 w-4 rounded bg-[var(--surface-container-high)]" />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 pt-2 pl-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded bg-[var(--surface-container-high)]"
              style={{ width: `${30 + ((i * 17) % 55)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
