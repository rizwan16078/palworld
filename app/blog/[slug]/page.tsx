import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | PalBreeder Guides`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5e6a7e] hover:text-[var(--pw-blue)] transition-colors mb-8 uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Guides
        </Link>

        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#5e6a7e] mb-4">
            <span className="text-[var(--pw-blue)]">{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-[#8b95a5] leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>
        </header>

        <div className="rounded-2xl overflow-hidden mb-12 border border-[#232f40]">
          <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover" />
        </div>

        <div 
          className="prose prose-invert prose-blue max-w-none 
          prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-[#8b95a5] prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-[#8b95a5] prose-li:mb-2
          prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-[#232f40] text-center">
          <h3 className="text-xl font-bold text-white mb-4">Ready to test the math?</h3>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[var(--pw-blue)] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(40,111,255,0.3)]"
          >
            Open Breeding Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}
