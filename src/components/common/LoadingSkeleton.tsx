export function MovieCardSkeleton() {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 animate-pulse flex flex-col">
      <div className="aspect-[2/3] w-full bg-slate-800/80" />
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/60 rounded w-3/4" />
          <div className="h-3 bg-slate-800 rounded w-1/2" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-3 bg-slate-800 rounded w-1/4" />
          <div className="h-6 bg-slate-700/60 rounded-lg w-16" />
        </div>
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-96 w-full rounded-3xl bg-slate-800/50 border border-slate-800 flex items-end p-8">
        <div className="space-y-4 max-w-2xl w-full">
          <div className="h-8 bg-slate-700 rounded w-2/3" />
          <div className="h-4 bg-slate-800 rounded w-1/3" />
          <div className="h-16 bg-slate-850 rounded w-full" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-72 rounded-2xl bg-slate-850 border border-slate-800" />
        <div className="h-72 rounded-2xl bg-slate-850 border border-slate-800" />
      </div>
    </div>
  );
}
