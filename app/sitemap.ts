import type { MetadataRoute } from "next";
import { ALL_PALS } from "@/lib/breeding";
import { BLOG_POSTS } from "@/lib/blog";
import { WORK_SUITABILITIES } from "@/lib/work";
import { PASSIVE_SKILLS } from "@/lib/passives";
import { siteUrl } from "@/lib/site";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

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
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/passives", changeFrequency: "weekly", priority: 0.9 },
  { path: "/box-breeder", changeFrequency: "weekly", priority: 0.9 },
  { path: "/structures", changeFrequency: "weekly", priority: 0.9 },
  { path: "/technology", changeFrequency: "weekly", priority: 0.9 },

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
    lastModified: post.date ? new Date(post.date) : buildTime,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workPages: MetadataRoute.Sitemap = WORK_SUITABILITIES.map((work) => ({
    url: `${siteUrl}/work/${work.id}`,
    lastModified: buildTime,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const passivePages: MetadataRoute.Sitemap = PASSIVE_SKILLS.map((skill) => ({
    url: `${siteUrl}/passives/${skill.id.replace(/_/g, "-")}`,
    lastModified: buildTime,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...palPages, ...blogPages, ...workPages, ...passivePages];
}
