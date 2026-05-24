import BlogSkeleton from "@/components/blog/BlogSkeleton";

export default function BlogLoading() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 w-80 mx-auto rounded-lg bg-[#1a2332] animate-pulse mb-4" />
          <div className="h-4 w-96 mx-auto rounded bg-[#1a2332] animate-pulse" />
        </div>

        {/* Controls skeleton */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="h-11 w-full max-w-md rounded-xl bg-[#1a2332] animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-7 w-20 rounded-lg bg-[#1a2332] animate-pulse" />
            ))}
          </div>
        </div>

        <BlogSkeleton />
      </div>
    </div>
  );
}
