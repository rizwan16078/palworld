export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="glass-card flex flex-col h-full bg-[#131b26] border border-[#232f40] overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="aspect-video bg-[#0a0f16]" />
          {/* Content placeholder */}
          <div className="p-5 flex flex-col flex-1 gap-3">
            <div className="h-3 w-24 rounded bg-[#1a2332]" />
            <div className="h-5 w-full rounded bg-[#1a2332]" />
            <div className="h-5 w-3/4 rounded bg-[#1a2332]" />
            <div className="h-3 w-full rounded bg-[#1a2332]" />
            <div className="h-3 w-5/6 rounded bg-[#1a2332]" />
            <div className="mt-auto h-4 w-28 rounded bg-[#1a2332]" />
          </div>
        </div>
      ))}
    </div>
  );
}
