"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES } from "@/lib/blog";

interface BlogFiltersProps {
  categoryCounts: Record<string, number>;
}

export default function BlogFilters({ categoryCounts }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    params.delete("page");
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const allCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      <button
        role="tab"
        aria-selected={active === "All"}
        onClick={() => setCategory("All")}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
          active === "All"
            ? "bg-[var(--pw-blue)] text-white"
            : "bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white"
        }`}
      >
        All <span className="ml-1 opacity-70">{allCount}</span>
      </button>
      {BLOG_CATEGORIES.map((cat) => {
        const count = categoryCounts[cat] ?? 0;
        if (count === 0) return null;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              active === cat
                ? "bg-[var(--pw-blue)] text-white"
                : "bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white"
            }`}
          >
            {cat} <span className="ml-1 opacity-70">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
