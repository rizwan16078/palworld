import tierListData from "@/data/tier-list.json";
import {
  CAPTURE_RATE_PALS,
  normalizeElement,
  type CaptureRateRarity,
} from "@/lib/capture-rate";
import { ALL_PALS, type PalElement } from "@/lib/breeding";
import { PALDEX, type PaldexEntry } from "@/lib/paldex";

export type TierName = "S" | "A" | "B" | "C" | "D";
export type TierListCategoryId =
  | "overall"
  | "workers"
  | "flying"
  | "ground"
  | "combat";

export interface TierListPal {
  slug: string;
  name: string;
  speed: string | null;
}

export interface TierListTier {
  tier: TierName;
  pals: TierListPal[];
}

export interface TierListCategory {
  id: TierListCategoryId;
  label: string;
  title: string;
  description: string;
  path: string;
  sourceUrl: string;
  tiers: TierListTier[];
}

export interface TierListWorkSuitability {
  name: string;
  level: number;
  icon: string | null;
}

export interface TierListEntry extends TierListPal {
  tier: TierName;
  image: string | null;
  elements: string[];
  rarity: CaptureRateRarity | null;
  rarityLevel: number | null;
  workSuitabilities: TierListWorkSuitability[];
  guideHref: string | null;
}

export interface TierListCategoryWithEntries
  extends Omit<TierListCategory, "tiers"> {
  totalPals: number;
  tiers: Array<{
    tier: TierName;
    pals: TierListEntry[];
  }>;
}

export const WORK_ICON_BY_NAME: Record<string, string> = {
  Kindling: "/icons/T_icon_palwork_00.png",
  Watering: "/icons/T_icon_palwork_01.png",
  Planting: "/icons/T_icon_palwork_02.png",
  "Generating Electricity": "/icons/T_icon_palwork_03.png",
  Handiwork: "/icons/T_icon_palwork_04.png",
  Gathering: "/icons/T_icon_palwork_05.png",
  Deforesting: "/icons/T_icon_palwork_06.png",
  Mining: "/icons/T_icon_palwork_07.png",
  "Medicine Production": "/icons/T_icon_palwork_08.png",
  Cooling: "/icons/T_icon_palwork_10.png",
  Transporting: "/icons/T_icon_palwork_11.png",
  Farming: "/icons/T_icon_palwork_12.png",
};

export const TIER_COLORS: Record<TierName, { bg: string; text: string }> = {
  S: { bg: "#ff7f7f", text: "#2d0707" },
  A: { bg: "#ffbf7f", text: "#3e2300" },
  B: { bg: "#f8d86f", text: "#3d2b00" },
  C: { bg: "#bce96f", text: "#173100" },
  D: { bg: "#77eb79", text: "#03320e" },
};

const paldexBySlug = new Map(PALDEX.map((pal) => [pal.slug, pal]));
const captureBySlug = new Map(CAPTURE_RATE_PALS.map((pal) => [pal.slug, pal]));
const breedingIds = new Set(ALL_PALS.map((pal) => pal.id));

export const TIER_LIST_CATEGORIES = (tierListData as TierListCategory[]).map(
  (category) => {
    const tiers = category.tiers.map((tier) => ({
      tier: tier.tier,
      pals: tier.pals.map((pal) => enrichTierListEntry(pal, tier.tier)),
    }));

    return {
      ...category,
      totalPals: tiers.reduce((total, tier) => total + tier.pals.length, 0),
      tiers,
    };
  }
) as TierListCategoryWithEntries[];

export function getTierListCategory(id: TierListCategoryId) {
  return TIER_LIST_CATEGORIES.find((category) => category.id === id);
}

function enrichTierListEntry(pal: TierListPal, tier: TierName): TierListEntry {
  const paldexEntry = paldexBySlug.get(pal.slug);
  const captureEntry = captureBySlug.get(pal.slug);
  const guideId = paldexEntry?.guideId ?? (breedingIds.has(pal.slug) ? pal.slug : null);

  return {
    ...pal,
    tier,
    image: paldexEntry?.image ?? captureEntry?.image ?? null,
    elements: getEntryElements(paldexEntry, captureEntry),
    rarity: paldexEntry?.rarity ?? captureEntry?.rarity ?? null,
    rarityLevel:
      paldexEntry?.rarityLevel ?? captureEntry?.rarityLevel ?? null,
    workSuitabilities: getWorkSuitabilities(paldexEntry),
    guideHref: guideId ? `/breeding/${guideId}` : null,
  };
}

function getEntryElements(
  paldexEntry: PaldexEntry | undefined,
  captureEntry: (typeof CAPTURE_RATE_PALS)[number] | undefined
) {
  if (paldexEntry) {
    return paldexEntry.elements;
  }

  if (captureEntry) {
    return captureEntry.elements.map((element) => normalizeElement(element));
  }

  return [];
}

function getWorkSuitabilities(paldexEntry: PaldexEntry | undefined) {
  if (!paldexEntry) {
    return [];
  }

  return [...paldexEntry.workSuitabilities]
    .sort((left, right) => right.level - left.level || left.name.localeCompare(right.name))
    .map((work) => ({
      name: work.name,
      level: work.level,
      icon: WORK_ICON_BY_NAME[work.name] ?? null,
    }));
}

export function getPrimaryElementColor(elements: string[]) {
  const primary = elements[0] as PalElement | undefined;

  switch (primary) {
    case "Neutral":
      return "#A8A77A";
    case "Fire":
      return "#EE8130";
    case "Water":
      return "#6390F0";
    case "Electric":
      return "#F7D02C";
    case "Grass":
      return "#7AC74C";
    case "Ice":
      return "#96D9D6";
    case "Ground":
      return "#E2BF65";
    case "Dragon":
      return "#6F35FC";
    case "Dark":
      return "#705898";
    default:
      return "#4F9CF7";
  }
}
