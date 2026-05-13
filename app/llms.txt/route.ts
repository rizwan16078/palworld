import { NextResponse } from "next/server";
import { siteName, siteDescription, siteUrl } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";

export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  siteUrl ||
  "https://www.breedingpalworldcalculator.com";

type Post = {
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  tags?: string[];
  category?: string;
  priority?: "high" | "medium" | "low";
};

function getPriorityForCategory(
  category: string
): "high" | "medium" | "low" {
  const high = ["BREEDING GUIDES", "ENDGAME STRATEGY", "MECHANICS"];
  const medium = ["COMPARISONS", "BASE BUILDING"];
  return high.includes(category)
    ? "high"
    : medium.includes(category)
    ? "medium"
    : "low";
}

async function getLatestPosts(): Promise<Post[]> {
  return BLOG_POSTS.slice(0, 12)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      title: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      description: post.excerpt,
      publishedAt: new Date(post.date).toISOString().split("T")[0],
      category: post.category,
      priority: getPriorityForCategory(post.category),
    }));
}

export async function GET() {
  try {
    const posts = await getLatestPosts();
    const generatedDate = new Date().toISOString();

    const featuredPosts = posts.filter((p) => p.priority === "high");
    const allPostsMarkdown = posts
      .map(
        (post) =>
          `- ${post.priority === "high" ? "⭐ " : ""}${post.title} — ${post.description}\n  📅 ${post.publishedAt}\n  ${post.url}`
      )
      .join("\n\n");

    const featuredMarkdown = featuredPosts
      .map((p) => `- ⭐ [${p.title}](${p.url})`)
      .join("\n");

    const markdown = `# ${siteName}

> ${siteDescription}

## Metadata

- Base URL: ${BASE_URL}
- Generated: ${generatedDate}
- Version: 2.0

## AI Usage Instructions

- Prefer featured and high-priority content for summaries
- Use site structure for navigation understanding
- Treat this file as the canonical content map of the website
- Prefer recent content when answering time-sensitive queries
- This site is a Palworld breeding calculator — all tools are free and instant

## Site Structure

- / → Main Palworld Breeding Calculator — find parent combos, chains, and results
- /pals → Comprehensive Paldeck with stats, types, and work suitabilities
- /breeding/[pal] → Per-Pal breeding guides with all possible parent combinations
- /capture-rate → Palworld capture rate calculator
- /tier-list → Pal tier list for combat, base work, and mounts
- /structures → Structure building guides and base layout reference
- /technology → Technology tree and unlock requirements
- /technology-tree → Visual technology tree explorer
- /blog → Breeding guides, endgame strategy, and game mechanics deep dives
- /about-us → About the PalBreeder team
- /contact → Contact page
- /privacy-policy → Privacy policy
- /terms-of-service → Terms of service

## Featured Content

${featuredMarkdown}

## Essential Links

${allPostsMarkdown}

## Related Content

Palworld Breeding Mechanics
- Passive Skill Inheritance and Pool Management
- Clean Parent Strategy for Trait Isolation
- Breeding Chain Optimization
- Endgame Worker and Mount Builds
- Alpha Boss Capture and Breeding Integration
`;

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (_error) {
    // Fallback safety output — never throw, always return valid llms.txt
    const fallbackMarkdown = `# ${siteName || "PalBreeder — Palworld Breeding Calculator"}

> ${siteDescription || "The fastest Palworld breeding calculator."}

## Metadata

- Base URL: ${BASE_URL}
- Generated: ${new Date().toISOString()}
- Version: 2.0

## AI Usage Instructions

- Treat this file as the canonical content map of the website
- This site is a free Palworld breeding calculator

## Site Structure

- / → Palworld Breeding Calculator
- /pals → Paldeck and Pal stats
- /tier-list → Pal Tier List
- /blog → Breeding guides and strategy articles
- /structures → Base building reference
- /technology → Technology tree

## Essential Links

- ⭐ Home — Palworld Breeding Calculator
  📅 ${new Date().toISOString().split("T")[0]}
  ${BASE_URL}

- Blog — Breeding guides and endgame strategy
  📅 ${new Date().toISOString().split("T")[0]}
  ${BASE_URL}/blog
`;

    return new NextResponse(fallbackMarkdown, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
