"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownAZ, Clock, ArrowUpDown } from "lucide-react";
import type { BlogSortOption } from "@/lib/blog";

const SORT_OPTIONS: { value: BlogSortOption; label: string; icon: React.ReactNode }[] = [
  { value: "latest", label: "Latest", icon: <Clock className="w-3.5 h-3.5" /> },
  { value: "oldest", label: "Oldest", icon: <Clock className="w-3.5 h-3.5 rotate-180" /> },
  { value: "az", label: "A–Z", icon: <ArrowDownAZ className="w-3.5 h-3.5" /> },
];

export default function BlogSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("sort") as BlogSortOption) ?? "latest";

  const setSort = (value: BlogSortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    params.delete("page");
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-[#5e6a7e]" />
      <select
        value={current}
        onChange={(e) => setSort(e.target.value as BlogSortOption)}
        aria-label="Sort posts"
        className="appearance-none bg-[#131b26] border border-[#232f40] rounded-lg px-3 py-1.5 pr-8 text-xs font-bold uppercase tracking-wider text-[#8b95a5] focus:outline-none focus:border-[var(--pw-blue)] cursor-pointer transition-colors"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
