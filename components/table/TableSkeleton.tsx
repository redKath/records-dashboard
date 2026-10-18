const ROWS = 10;

export function TableSkeleton() {
  return (
    <div role="status" aria-label="Loading employees" className="space-y-4">
      <div className="h-10 animate-pulse rounded-md bg-zinc-200" />
      <div className="divide-y divide-zinc-100 rounded-lg border border-zinc-200">
        {Array.from({ length: ROWS }, (_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 flex-1 animate-pulse rounded bg-zinc-200" />
            <div className="hidden h-4 w-24 animate-pulse rounded bg-zinc-200 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
