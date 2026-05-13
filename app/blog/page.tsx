import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog";
import { Calendar, ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

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

export default function BlogIndex() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">Palworld Guides</span>{" "}
            <span className="text-[var(--pw-text)]">& Strategies</span>
          </h1>
          <p className="text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            No-fluff guides on perfect breeding, passive inheritance math, and base optimization. Built for players who want exact answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full"
            >
              <article 
                className="glass-card flex flex-col h-full bg-[#131b26] border border-[#232f40] overflow-hidden transition-colors group-hover:border-[var(--pw-blue)]"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden bg-[#0a0f16]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-white text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                      {post.category}
                    </span>
                    <span className="bg-[var(--pw-blue)]/20 backdrop-blur-md border border-[var(--pw-blue)]/50 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      {post.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#5e6a7e] text-xs font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-[var(--pw-blue)] transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-[#8b95a5] leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--pw-blue)] group-hover:text-white transition-colors">
                      Read & Calculate <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
