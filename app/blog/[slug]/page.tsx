import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BLOG_SEO } from "@/lib/blog";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import BlogPostActions from "@/components/blog/BlogPostActions";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  const seo = BLOG_SEO[post.slug];
  // seo.metaTitle is already optimized to ≤55 chars (no template suffix).
  const title = seo?.metaTitle ?? `${post.title} — Palworld Guide`;
  const description = seo?.metaDescription ?? post.excerpt;

  return buildPageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.title,
    ogType: "article",
    keywords: [post.category, "Palworld guide", "Palworld breeding"],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const seo = BLOG_SEO[post.slug];
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${siteUrl}${post.image}`;
  const faqItems = seo?.faqs ?? [];
  const readTime = Math.max(1, Math.round(post.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200));
  const relatedPosts = BLOG_POSTS
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: seo?.metaDescription ?? post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.lastModified ?? post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "PalBreeder",
    },
    publisher: {
      "@type": "Organization",
      name: "PalBreeder",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
    },
    image: [imageUrl],
    mainEntityOfPage: postUrl,
    articleSection: post.category,
  };
  const faqJsonLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <article className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
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
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {readTime} min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-[#8b95a5] leading-relaxed max-w-2xl mx-auto mb-6">
            {post.excerpt}
          </p>
          <div className="flex justify-center">
            <BlogPostActions slug={post.slug} title={post.title} />
          </div>
        </header>

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 border border-[#232f40] bg-[#0a0f16]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div 
          className="prose prose-invert prose-blue max-w-none
          prose-headings:text-white
          prose-h2:text-2xl prose-h2:font-extrabold prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-[#8b95a5] prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-[var(--pw-blue)] prose-a:no-underline hover:prose-a:text-white
          prose-ul:my-5 prose-ol:my-5
          prose-li:text-[#8b95a5] prose-li:mb-2
          prose-strong:text-white
          prose-blockquote:border-l-[var(--pw-blue)] prose-blockquote:text-[#c0cad8]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {faqItems.length ? (
          <section className="mt-12 rounded-2xl border border-[#232f40] bg-[#0f1722] p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-white mb-6">FAQ</h2>
            <div className="space-y-5">
              {faqItems.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#8b95a5] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {relatedPosts.length ? (
          <section className="mt-16 pt-10 border-t border-[#232f40]">
            <h2 className="text-2xl font-extrabold text-white mb-6">Related Palworld Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col rounded-2xl border border-[#232f40] bg-[#131b26] overflow-hidden hover:border-[var(--pw-blue)] transition-colors"
                >
                  <div className="relative h-32 bg-[#0a0f16]">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 240px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--pw-blue)] mb-2">
                      {related.category}
                    </p>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--pw-blue)] transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="mt-12 pt-8 border-t border-[#232f40] flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-[#5e6a7e]">More tools:</span>
          <Link href="/" className="text-[var(--pw-blue)] hover:text-white transition-colors font-semibold">Breeding Calculator</Link>
          <span className="text-[#5e6a7e]">·</span>
          <Link href="/capture-rate" className="text-[var(--pw-blue)] hover:text-white transition-colors font-semibold">Capture Rate</Link>
          <span className="text-[#5e6a7e]">·</span>
          <Link href="/tier-list" className="text-[var(--pw-blue)] hover:text-white transition-colors font-semibold">Tier List</Link>
          <span className="text-[#5e6a7e]">·</span>
          <Link href="/pals" className="text-[var(--pw-blue)] hover:text-white transition-colors font-semibold">All Pals</Link>
          <span className="text-[#5e6a7e]">·</span>
          <Link href="/blog" className="text-[var(--pw-blue)] hover:text-white transition-colors font-semibold">All Guides</Link>
        </nav>

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
