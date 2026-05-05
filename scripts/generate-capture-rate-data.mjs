import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repoRoot = process.cwd();
const palsBundlePath = "/private/tmp/palworld-pals-data.js";
const iconsBundlePath = "/private/tmp/palworld-pals-icons.js";
const outputPath = path.join(repoRoot, "data/capture-rate.json");
const publicPalDir = path.join(repoRoot, "public/pal");

function evaluateBundle(source, exportReplacement) {
  const transformed = source.replace(/export\{[\s\S]*?\};?\s*$/, exportReplacement);
  const context = { globalThis: {} };
  vm.createContext(context);
  vm.runInContext(transformed, context);
  return context.globalThis;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function rarityLabel(value) {
  if (value >= 10) return "Legendary";
  if (value >= 8) return "Epic";
  if (value >= 5) return "Rare";
  return "Common";
}

function normalizeElement(value) {
  const cleaned = value.replace("EPalElementType::", "");
  switch (cleaned) {
    case "Leaf":
      return "Grass";
    case "Earth":
      return "Ground";
    case "None":
      return null;
    default:
      return cleaned;
  }
}

function resolveLocalImage(assetPathName, localFiles) {
  const exact = `${assetPathName}.png`;
  if (localFiles.has(exact)) {
    return `/pal/${exact}`;
  }

  const duplicate = `${assetPathName} (1).png`;
  if (localFiles.has(duplicate)) {
    return `/pal/${duplicate}`;
  }

  return null;
}

const palsBundle = fs.readFileSync(palsBundlePath, "utf8");
const iconsBundle = fs.readFileSync(iconsBundlePath, "utf8");

const palsData = evaluateBundle(
  palsBundle,
  "globalThis.__capturePals = St;"
).__capturePals;
const iconData = evaluateBundle(
  iconsBundle,
  "globalThis.__captureIcons = be;"
).__captureIcons;

const localFiles = new Set(fs.readdirSync(publicPalDir));
const entries = [];
const missingImages = [];

for (const [key, pal] of Object.entries(palsData)) {
  const name = pal.OverrideNameTextID?.trim();
  const icon = iconData[pal.BPClass]?.Icon?.AssetPathName;

  if (!name || !pal.BPClass || !icon || icon === "None" || icon === "T_dummy_icon") {
    continue;
  }

  if (pal.IsBoss) {
    continue;
  }

  const image = resolveLocalImage(icon, localFiles);

  if (!image) {
    missingImages.push({
      id: key,
      bpClass: pal.BPClass,
      icon,
      suggestedUrl: `https://palworld.gg/images/full_palicon/${icon}.png`,
    });
  }

  const elements = [pal.ElementType1, pal.ElementType2]
    .map((value) => normalizeElement(value))
    .filter(Boolean);

  entries.push({
    id: key,
    slug: slugify(name),
    name,
    bpClass: pal.BPClass,
    image,
    assetPathName: icon,
    level: pal.level,
    rarity: rarityLabel(pal.Rarity),
    rarityLevel: pal.Rarity,
    elements,
    captureRateCorrect: pal.CaptureRateCorrect,
    bossCaptureRateCorrect: pal.BossCaptureRateCorrect ?? pal.CaptureRateCorrect,
    sourceUrl: "https://palworld.gg/capture-rate",
  });
}

entries.sort((left, right) => left.name.localeCompare(right.name));

fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);

if (missingImages.length > 0) {
  process.stderr.write(
    `${missingImages.length} pal images are missing locally.\n${JSON.stringify(
      missingImages,
      null,
      2
    )}\n`
  );
}

process.stdout.write(
  `Wrote ${entries.length} capture-rate entries to ${path.relative(repoRoot, outputPath)}.\n`
);
