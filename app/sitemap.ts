import type { MetadataRoute } from "next";
import { ALL_PALS } from "@/lib/breeding";
import { BLOG_POSTS } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/**
 * Priority + changeFrequency policy:
 *  - 1.0 daily      → home (the calculator itself, primary entry point)
 *  - 0.9 weekly     → calculator-class pages with frequently updated data
 *                    (paldex, tier list, capture rate, technology, structures)
 *  - 0.8 weekly     → individual pal breeding guides (high SEO value, data may
 *                    shift with patches)
 *  - 0.8 weekly     → blog index (new posts land here)
 *  - 0.7 monthly    → individual blog posts (mostly evergreen content)
 *  - 0.5–0.6 monthly→ informational landing pages (about, how-it-works, authors)
 *  - 0.3–0.4 yearly → legal / contact pages (rarely change)
 *
 * Routes intentionally excluded:
 *  - /technology-tree   → redirects to /technology (would be duplicate index)
 *  - /llms.txt          → AI-crawler feed, not a search target
 *  - /icon.svg, /robots.txt, /sitemap.xml → auto-generated meta files
 */
const STATIC_PAGES: ReadonlyArray<{
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}> = [
  // Tier 1 — home
  { path: "/", changeFrequency: "daily", priority: 1.0 },

  // Tier 2 — primary calculators & directories
  { path: "/pals", changeFrequency: "weekly", priority: 0.9 },
  { path: "/capture-rate", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tier-list", changeFrequency: "weekly", priority: 0.9 },
  { path: "/technology", changeFrequency: "weekly", priority: 0.9 },
  { path: "/structures", changeFrequency: "weekly", priority: 0.9 },

  // Tier 3 — content hubs
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },

  // Tier 4 — informational pages
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.5 },
  { path: "/authors", changeFrequency: "monthly", priority: 0.5 },
  { path: "/editorial-guidelines", changeFrequency: "monthly", priority: 0.4 },

  // Tier 5 — legal & contact
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // One shared timestamp per build so search engines see a consistent
  // "site refreshed at this build" signal across static pages.
  const buildTime = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === "/" ? siteUrl : `${siteUrl}${path}`,
      lastModified: buildTime,
      changeFrequency,
      priority,
    })
  );

  const palPages: MetadataRoute.Sitemap = ALL_PALS.map((pal) => ({
    url: `${siteUrl}/breeding/${pal.id}`,
    lastModified: buildTime,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    // Use the post's authored date so search engines correctly date
    // older content rather than treating every post as freshly published.
    lastModified: post.date ? new Date(post.date) : buildTime,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...palPages, ...blogPages];
}
