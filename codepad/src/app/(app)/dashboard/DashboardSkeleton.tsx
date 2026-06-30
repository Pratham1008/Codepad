export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-surface border border-outline-variant rounded-xl p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className="w-1/2 h-6 bg-surface-variant rounded"></div>
            <div className="w-16 h-6 bg-surface-variant rounded"></div>
          </div>
          <div className="flex-1">
            <div className="w-full h-16 bg-surface-variant rounded"></div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="w-24 h-4 bg-surface-variant rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
