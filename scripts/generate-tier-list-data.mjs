import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outputPath = path.join(repoRoot, "data", "tier-list.json");
const inputDir = process.env.TIER_LIST_INPUT_DIR ?? null;

const CATEGORY_CONFIG = [
  {
    id: "overall",
    label: "Best Overall",
    slug: "tier-list",
    path: "/tier-list",
    sourceUrl: "https://palworld.gg/tier-list",
  },
  {
    id: "workers",
    label: "Workers",
    slug: "base-work",
    inputFile: "tier-list-work.html",
    path: "/tier-list/base-work",
    sourceUrl: "https://palworld.gg/tier-list/base-work",
  },
  {
    id: "flying",
    label: "Flying Mounts",
    slug: "flying-mounts",
    inputFile: "tier-list-flying.html",
    path: "/tier-list/flying-mounts",
    sourceUrl: "https://palworld.gg/tier-list/flying-mounts",
  },
  {
    id: "ground",
    label: "Ground Mounts",
    slug: "ground-mounts",
    inputFile: "tier-list-ground.html",
    path: "/tier-list/ground-mounts",
    sourceUrl: "https://palworld.gg/tier-list/ground-mounts",
  },
  {
    id: "combat",
    label: "Combat",
    slug: "combat",
    inputFile: "tier-list-combat.html",
    path: "/tier-list/combat",
    sourceUrl: "https://palworld.gg/tier-list/combat",
  },
];

const TIER_NAMES = ["S", "A", "B", "C", "D"];

async function main() {
  const categories = [];

  for (const category of CATEGORY_CONFIG) {
    const html = await readCategoryHtml(category);
    const parsed = parseCategoryHtml(category, html);
    categories.push(parsed);
  }

  await fs.writeFile(outputPath, `${JSON.stringify(categories, null, 2)}\n`);

  process.stdout.write(
    `Wrote ${categories.length} tier-list categories to ${path.relative(repoRoot, outputPath)}.\n`
  );
}

async function readCategoryHtml(category) {
  if (inputDir) {
    const fileName =
      category.id === "overall"
        ? "tier-list-home.html"
        : category.inputFile;

    return fs.readFile(path.join(inputDir, fileName), "utf8");
  }

  const response = await fetch(category.sourceUrl, {
    headers: {
      "user-agent": "palbreeder-tier-list-generator",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${category.sourceUrl}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

function parseCategoryHtml(category, html) {
  const titleMatch = html.match(
    /<div class="head"><h1>\s*Palworld\s*<span>(.*?)<\/span><\/h1>/
  );
  const descriptionMatch = html.match(
    /<div class="head"><h1>[\s\S]*?<\/h1><p>(.*?)<\/p>/
  );

  const title = decodeHtml(titleMatch?.[1] ?? category.label);
  const description = decodeHtml(descriptionMatch?.[1] ?? "");

  const tiers = [...html.matchAll(TIER_SECTION_PATTERN)].map(
    ([, tier, body]) => ({
      tier,
      pals: [...body.matchAll(PAL_CARD_PATTERN)].map((match) => ({
        slug: decodeHtml(match[1]),
        name: decodeHtml(match[2]).trim(),
        speed: match[3] ? decodeHtml(match[3]).trim() : null,
      })),
    })
  );

  for (const tierName of TIER_NAMES) {
    if (!tiers.some((tier) => tier.tier === tierName)) {
      tiers.push({ tier: tierName, pals: [] });
    }
  }

  tiers.sort((left, right) => TIER_NAMES.indexOf(left.tier) - TIER_NAMES.indexOf(right.tier));

  return {
    id: category.id,
    label: category.label,
    title,
    description,
    path: category.path,
    sourceUrl: category.sourceUrl,
    tiers,
  };
}

const TIER_SECTION_PATTERN =
  /<div class="tier ([SABCD])">([\s\S]*?)<\/div><\/div>(?=<div class="tier |<!--\]--><\/div><\/section>)/g;

const PAL_CARD_PATTERN =
  /<a class="link" href="\/pal\/([^"]+)"[\s\S]*?<img[\s\S]*?alt="([^"]+)"[\s\S]*?(?:<div class="speed">([^<]+)<\/div>)?/g;

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
