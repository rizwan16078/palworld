"use client";

import BlogSearch from "./BlogSearch";
import BlogFilters from "./BlogFilters";
import BlogSort from "./BlogSort";

interface BlogControlsProps {
  categoryCounts: Record<string, number>;
}

export default function BlogControls({ categoryCounts }: BlogControlsProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <BlogSearch />
        <div className="flex items-center gap-3 ml-auto">
          <BlogSort />
        </div>
      </div>
      {/* Category filters */}
      <BlogFilters categoryCounts={categoryCounts} />
    </div>
  );
}
