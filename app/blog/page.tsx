import { Suspense } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getBlogPage, type BlogSortOption } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogControls from "@/components/blog/BlogControls";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogEmpty from "@/components/blog/BlogEmpty";

export const metadata = buildPageMetadata({
  title: "Palworld Breeding Guides & Strategies",
  description:
    "Expert Palworld breeding guides, passive skill inheritance breakdowns, and endgame optimization strategies.",
  path: "/blog",
  ogType: "website",
  keywords: [
    "Palworld guides",
    "Palworld strategies",
    "passive inheritance",
    "breeding chain",
  ],
});

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function BlogIndex({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const search = params.search ?? "";
  const category = params.category ?? "";
  const sort = (params.sort as BlogSortOption) ?? "latest";

  const result = getBlogPage({ page, search, category, sort });

  return (
    <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">Palworld Guides</span>{" "}
            <span className="text-[var(--pw-text)]">& Strategies</span>
          </h1>
          <p className="text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            No-fluff guides on perfect breeding, passive inheritance math, and base optimization. Built for players who want exact answers.
          </p>
        </div>

        {/* Controls (Client Component) */}
        <Suspense fallback={null}>
          <BlogControls categoryCounts={result.categoryCounts} />
        </Suspense>

        {/* Results info */}
        {search && (
          <p className="text-xs text-[#5e6a7e] mb-4">
            {result.total} result{result.total !== 1 ? "s" : ""} for &ldquo;
            <span className="font-bold text-white">{search}</span>&rdquo;
          </p>
        )}

        {/* Grid */}
        {result.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>
        ) : (
          <BlogEmpty search={search} category={category} />
        )}

        {/* Pagination */}
        <Suspense fallback={null}>
          <BlogPagination
            page={result.page}
            totalPages={result.totalPages}
            total={result.total}
          />
        </Suspense>
      </div>
    </div>
  );
}
