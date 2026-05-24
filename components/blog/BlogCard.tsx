import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full"
    >
      <article className="glass-card flex flex-col h-full bg-[#131b26] border border-[#232f40] overflow-hidden transition-all duration-300 ease-in-out group-hover:border-[var(--pw-blue)] group-hover:shadow-[0_8px_30px_rgba(40,111,255,0.12)] group-hover:scale-[1.02]">
        {/* Image Header — 16:9 ratio */}
        <div className="relative aspect-video overflow-hidden bg-[#0a0f16]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-white text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
              {post.category}
            </span>
            <span className="bg-[var(--pw-blue)]/20 backdrop-blur-md border border-[var(--pw-blue)]/50 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {post.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-[#5e6a7e] text-xs font-medium mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </div>

          <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-[var(--pw-blue)] transition-colors">
            {post.title}
          </h2>

          <p className="text-sm text-[#8b95a5] leading-relaxed mb-4 line-clamp-3">
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
  );
}
