import paldexData from "@/data/paldex.json";
import type { PalElement } from "@/lib/breeding";

export type PaldexRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface PaldexWorkSuitability {
  name: string;
  level: number;
}

export interface PaldexEntry {
  slug: string;
  name: string;
  number: number;
  rarity: PaldexRarity;
  rarityLevel: number;
  elements: PalElement[];
  workSuitabilities: PaldexWorkSuitability[];
  image: string;
  guideId: string | null;
  sourceUrl: string;
}

export const PALDEX = paldexData as PaldexEntry[];

export const PALDEX_ELEMENTS: PalElement[] = [
  "Neutral",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Ground",
  "Dragon",
  "Dark",
];

export const PALDEX_RARITIES: PaldexRarity[] = [
  "Common",
  "Rare",
  "Epic",
  "Legendary",
];
