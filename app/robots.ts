import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * robots.txt — generated at build time by Next.js metadata API.
 *
 * Policy:
 *  - Default: allow all user agents (we want maximum crawl coverage for SEO).
 *  - Explicitly disallow paths that would create duplicate or low-value index
 *    entries: the `/technology-tree` legacy redirect and Next.js build
 *    artifacts under `/_next/`.
 *  - AI crawlers (GPTBot, ClaudeBot, etc.) are intentionally NOT blocked — the
 *    site exposes `/llms.txt` as the canonical structured-data feed for them.
 *  - Single `Sitemap:` line points to the dynamic sitemap.xml route.
 *
 * Last reviewed: 2026-05-13.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Legacy URL that 307-redirects to /technology — exclude from index
          // to avoid Google flagging as duplicate.
          "/technology-tree",
          // Next.js build artifacts and HMR endpoints. Should never be
          // surfaced in search results.
          "/_next/",
          // 404 page — Google sometimes tries to index this directly.
          "/_not-found",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
