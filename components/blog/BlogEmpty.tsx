import { SearchX } from "lucide-react";

interface BlogEmptyProps {
  search?: string;
  category?: string;
}

export default function BlogEmpty({ search, category }: BlogEmptyProps) {
  const hasFilters = search || (category && category !== "All");

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#131b26] border border-[#232f40] flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-[#5e6a7e]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No guides found</h3>
      <p className="text-sm text-[#8b95a5] max-w-md">
        {hasFilters
          ? "No posts match your current filters. Try adjusting your search or category selection."
          : "There are no posts available right now. Check back soon."}
      </p>
      {hasFilters && (
        <a
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--pw-blue)] hover:text-white transition-colors"
        >
          Clear all filters
        </a>
      )}
    </div>
  );
}
