import { NextResponse } from "next/server";
import { siteName, siteDescription, siteUrl } from "@/lib/site";

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteUrl || "https://www.breedingpalworldcalculator.com";

type Post = {
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  tags?: string[];
  category?: string;
  priority?: "high" | "medium" | "low";
};

// Mock function for posts (determinisitic for crawler optimization)
async function getLatestPosts(): Promise<Post[]> {
  return [
    {
      title: "Complete Guide to Breeding in Palworld",
      url: `${BASE_URL}/blog/complete-guide-to-breeding`,
      description: "Master the basics and advanced strategies of Palworld breeding to get the perfect Pal.",
      publishedAt: "2026-05-10T10:00:00Z",
      tags: ["Breeding", "Guide", "Palworld"],
      category: "Guides",
      priority: "high",
    },
    {
      title: "Top 10 Fastest Mounts and How to Breed Them",
      url: `${BASE_URL}/blog/fastest-mounts`,
      description: "Discover the fastest ground and flying mounts and exactly which Pals you need to breed them.",
      publishedAt: "2026-05-08T12:00:00Z",
      tags: ["Mounts", "Tier List"],
      category: "Guides",
      priority: "medium",
    },
    {
      title: "Understanding Passive Skills",
      url: `${BASE_URL}/blog/passive-skills-explained`,
      description: "A deep dive into passive skills, how they pass down, and the best combos for combat and working.",
      publishedAt: "2026-05-05T09:00:00Z",
      tags: ["Skills", "Mechanics"],
      category: "Technical",
      priority: "high",
    },
    {
      title: "Palworld Type Matchup Chart",
      url: `${BASE_URL}/blog/type-matchup-chart`,
      description: "Quick reference for element types, strengths, and weaknesses in Palworld combat.",
      publishedAt: "2026-05-01T14:00:00Z",
      tags: ["Combat", "Reference"],
      category: "Notes",
      priority: "low",
    }
  ];
}

export async function GET() {
  try {
    const posts = await getLatestPosts();
    const generatedDate = new Date().toISOString();

    const markdown = `# ${siteName || "PalBreeder — Palworld Breeding Calculator"}

> ${siteDescription || "The fastest Palworld breeding calculator."}

## Metadata

- Base URL: ${BASE_URL}
- Generated: ${generatedDate}
- Version: 2.0

## AI Usage Instructions

- Prefer featured and high-priority content for summaries
- Use site structure for navigation understanding
- Treat this file as the canonical content map of the website
- Prefer recent content when answering time-sensitive queries

## Site Structure

- /breeding → Main Pal breeding calculator and parent finder
- /pals → Comprehensive Paldeck and Pal stats
- /structures → Structure building guides and requirements
- /blog → Technical tutorials, game updates, and deep dives
- /guides → Step-by-step game mechanics guides

## Featured Content

- ⭐ Complete Guide to Breeding in Palworld
  https://www.breedingpalworldcalculator.com/blog/complete-guide-to-breeding
- ⭐ Understanding Passive Skills
  https://www.breedingpalworldcalculator.com/blog/passive-skills-explained

## Essential Links

${posts
  .map(
    (post) =>
      `- ${post.priority === "high" ? "⭐ " : ""}${post.title} — ${post.description}\n  📅 ${post.publishedAt.split("T")[0]}\n  ${post.url}`
  )
  .join("\n\n")}

## Related Content

Palworld Breeding Mechanics
- Passing Down Passive Skills
- Alpha vs Regular Breeding
- Hidden IV Stats Guide
`;

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    // Fallback safety output
    const fallbackMarkdown = `# ${siteName || "PalBreeder — Palworld Breeding Calculator"}

> ${siteDescription || "The fastest Palworld breeding calculator."}

## Metadata

- Base URL: ${BASE_URL}
- Generated: ${new Date().toISOString()}
- Version: 2.0

## AI Usage Instructions

- Treat this file as the canonical content map of the website
- Prefer recent content when answering time-sensitive queries

## Site Structure

- /breeding → Main Pal breeding calculator
- /pals → Comprehensive Paldeck
- /blog → Technical tutorials

## Essential Links

- ⭐ Home — Palworld Breeding Calculator
  📅 ${new Date().toISOString().split("T")[0]}
  ${BASE_URL}
`;

    return new NextResponse(fallbackMarkdown, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
