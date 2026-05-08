import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outputPath = path.join(repoRoot, "data", "structures.json");
const inputFile = process.env.STRUCTURES_INPUT_FILE ?? null;
const sourceUrl = "https://palworld.gg/structures";

async function main() {
  const html = await readStructuresHtml();
  const resolveImage = await createImageResolver();
  const entries = parseStructuresHtml(html, resolveImage);

  await fs.writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`);

  process.stdout.write(
    `Wrote ${entries.length} structures to ${path.relative(repoRoot, outputPath)}.\n`
  );
}

async function readStructuresHtml() {
  if (inputFile) {
    return fs.readFile(inputFile, "utf8");
  }

  const response = await fetch(sourceUrl, {
    headers: {
      "user-agent": "palbreeder-structures-generator",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${sourceUrl}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

async function createImageResolver() {
  const directories = ["structure", "technology"];
  const assets = new Map();

  for (const directory of directories) {
    const absoluteDir = path.join(repoRoot, "public", directory);
    const files = await fs.readdir(absoluteDir);

    for (const file of files) {
      if (file.startsWith(".")) {
        continue;
      }

      assets.set(`${directory}:${file}`, `/${directory}/${file}`);

      const normalizedKey = `${directory}:${normalizeAssetName(file)}`;
      if (!assets.has(normalizedKey)) {
        assets.set(normalizedKey, `/${directory}/${file}`);
      }
    }
  }

  return (fileName, preferredDirectory = "structure") => {
    if (!fileName) {
      return null;
    }

    const normalizedFileName = normalizeAssetName(fileName);
    const directoryOrder =
      preferredDirectory === "technology"
        ? ["technology", "structure"]
        : ["structure", "technology"];

    for (const directory of directoryOrder) {
      const exact = assets.get(`${directory}:${fileName}`);
      if (exact) {
        return exact;
      }

      const normalized = assets.get(`${directory}:${normalizedFileName}`);
      if (normalized) {
        return normalized;
      }
    }

    return null;
  };
}

function parseStructuresHtml(html, resolveImage) {
  const blocks = extractStructureBlocks(html);
  const slugCounts = new Map();
  const entries = [];

  for (const [index, block] of blocks.entries()) {
    const entry = parseStructureBlock(block, resolveImage, index + 1);

    if (!entry) {
      continue;
    }

    const slugCount = (slugCounts.get(entry.slug) ?? 0) + 1;
    slugCounts.set(entry.slug, slugCount);

    entries.push({
      ...entry,
      id: slugCount === 1 ? entry.slug : `${entry.slug}-${slugCount}`,
    });
  }

  return entries;
}

function extractStructureBlocks(html) {
  const startMarker = '<div class="item"><div class="up">';
  const blocks = [];
  let index = 0;

  while ((index = html.indexOf(startMarker, index)) !== -1) {
    let cursor = index;
    let depth = 0;

    while (cursor < html.length) {
      const nextOpen = html.indexOf("<div", cursor);
      const nextClose = html.indexOf("</div>", cursor);

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        cursor = nextOpen + 4;
        continue;
      }

      if (nextClose === -1) {
        cursor = html.length;
        break;
      }

      depth -= 1;
      cursor = nextClose + 6;

      if (depth === 0) {
        blocks.push(html.slice(index, cursor));
        index = cursor;
        break;
      }
    }

    if (cursor >= html.length) {
      break;
    }
  }

  return blocks;
}

function parseStructureBlock(block, resolveImage, order) {
  const name = readFirstMatch(block, /<div class="text">([\s\S]*?)<\/div>/);

  if (!name) {
    return null;
  }

  const type = readFirstMatch(block, /<div class="type">([\s\S]*?)<\/div>/) ?? "Other";
  const description =
    readFirstMatch(block, /<div class="description">([\s\S]*?)<\/div>/) ?? "";
  const buildWorkValue = readFirstMatch(
    block,
    /<div class="text">Build Work<\/div><div class="value">([^<]+)<\/div>/
  );
  const buildWork = buildWorkValue
    ? Number(buildWorkValue.replace(/[^0-9]/g, "")) || null
    : null;

  const upSection = block.split('<div class="item-card structure">')[0] ?? block;
  const imageFile = readFirstMatch(upSection, /\/images\/items\/([^"? ]+)/);
  const materials = parseMaterials(block, resolveImage);

  return {
    id: "",
    slug: slugify(name),
    name,
    type,
    description,
    buildWork,
    image: resolveImage(imageFile),
    imageFile: imageFile ?? null,
    materials,
    sourceUrl,
    order,
  };
}

function parseMaterials(block, resolveImage) {
  const recipeMatch = block.match(
    /<div class="recipe"><p>Materials<\/p><div class="elms"><!--\[-->([\s\S]*?)<!--\]--><\/div><\/div>/
  );

  if (!recipeMatch) {
    return [];
  }

  const materials = [];
  const materialPattern =
    /<div class="item"><div class="image"><img([\s\S]*?)><\/div><div class="name">([\s\S]*?)<\/div><\/div>/g;

  for (const match of recipeMatch[1].matchAll(materialPattern)) {
    const attributes = match[1] ?? "";
    const amountText = decodeHtml(stripTags(match[2] ?? ""));
    const imageFile = attributes.match(/src="\/images\/items\/([^"]+)"/)?.[1] ?? null;
    const alt = decodeHtml(attributes.match(/alt="([^"]*)"/)?.[1] ?? "");
    const amountMatch = amountText.match(/^([\d,]+)\s+(.*)$/);
    const amount = amountMatch
      ? Number(amountMatch[1].replace(/,/g, ""))
      : null;
    const parsedName = amountMatch?.[2]?.trim() ?? "";
    const materialName = parsedName || alt || humanizeAssetName(imageFile);

    materials.push({
      id: imageFile ? slugify(imageFile) : slugify(`${materialName}-${materials.length + 1}`),
      name: materialName,
      amount,
      amountText,
      image: resolveImage(imageFile),
      imageFile,
    });
  }

  return materials;
}

function readFirstMatch(value, pattern) {
  const match = value.match(pattern);
  if (!match?.[1]) {
    return null;
  }

  return decodeHtml(stripTags(match[1]));
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ");
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeAssetName(value) {
  return value.toLowerCase().replace(/ \(\d+\)(?=\.[^.]+$)/, "");
}

function humanizeAssetName(fileName) {
  if (!fileName) {
    return "Unknown";
  }

  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^T_(?:icon_buildObject|itemicon)_/i, "")
    .replace(/^Material_/i, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
