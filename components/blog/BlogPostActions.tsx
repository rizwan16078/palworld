"use client";

import { useState, useEffect } from "react";
import { Bookmark, Share2, Check } from "lucide-react";

interface BlogPostActionsProps {
  slug: string;
  title: string;
}

export default function BlogPostActions({ slug, title }: BlogPostActionsProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("pw-bookmarks") ?? "[]") as string[];
      setBookmarked(saved.includes(slug));
    } catch {
      // ignore
    }
  }, [slug]);

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("pw-bookmarks") ?? "[]") as string[];
      const next = bookmarked
        ? saved.filter((s) => s !== slug)
        : [...saved, slug];
      localStorage.setItem("pw-bookmarks", JSON.stringify(next));
      setBookmarked(!bookmarked);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleBookmark}
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark this post"}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
          bookmarked
            ? "bg-[var(--pw-blue)]/20 border border-[var(--pw-blue)]/50 text-[var(--pw-blue)]"
            : "bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white"
        }`}
      >
        <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} />
        {bookmarked ? "Saved" : "Save"}
      </button>
      <button
        onClick={handleShare}
        aria-label="Share this post"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#131b26] border border-[#232f40] text-[#8b95a5] hover:border-[var(--pw-blue)] hover:text-white transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Share"}
      </button>
    </div>
  );
}
