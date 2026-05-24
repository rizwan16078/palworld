"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  total: number;
}

export default function BlogPagination({ page, totalPages, total }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goTo = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }
    router.push(`/blog?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const start = (page - 1) * 12 + 1;
  const end = Math.min(page * 12, total);

  // Build page numbers with ellipsis
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Blog pagination" className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
      <p className="text-xs text-[#5e6a7e]">
        Showing <span className="font-bold text-white">{start}–{end}</span> of{" "}
        <span className="font-bold text-white">{total}</span> posts
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-xs text-[#5e6a7e]">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                p === page
                  ? "bg-[var(--pw-blue)] text-white"
                  : "bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
