import palsData from "@/data/pals.json";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Pal {
  id: string;
  name: string;
  element: PalElement;
  power: number;
  description: string;
}

export type PalElement =
  | "Neutral"
  | "Fire"
  | "Water"
  | "Electric"
  | "Grass"
  | "Ice"
  | "Ground"
  | "Dragon"
  | "Dark";

export interface BreedingResult {
  child: Pal;
  childPower: number;
  powerDiff: number;
}

export interface ParentCombo {
  parentA: Pal;
  parentB: Pal;
  childPower: number;
  powerDiff: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

export const ELEMENT_COLORS: Record<PalElement, string> = {
  Neutral: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Ground: "#E2BF65",
  Dragon: "#6F35FC",
  Dark: "#705898",
};

export const ELEMENT_EMOJI: Record<PalElement, string> = {
  Neutral: "⚪",
  Fire: "🔥",
  Water: "💧",
  Electric: "⚡",
  Grass: "🌿",
  Ice: "❄️",
  Ground: "🌍",
  Dragon: "🐉",
  Dark: "🌑",
};

// ── Data Access ────────────────────────────────────────────────────────────────

export const ALL_PALS: Pal[] = (palsData as Pal[]).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const palsByPower = [...ALL_PALS].sort((a, b) => a.power - b.power);

export function getPalById(id: string): Pal | undefined {
  return ALL_PALS.find((p) => p.id === id);
}

export function getPalByName(name: string): Pal | undefined {
  return ALL_PALS.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

// ── Breeding Logic ─────────────────────────────────────────────────────────────

/**
 * Core breeding formula: child power = floor((parentA.power + parentB.power + 1) / 2)
 * The resulting child is the Pal whose power is closest to the computed value.
 */
export function computeChildPower(parentA: Pal, parentB: Pal): number {
  return Math.floor((parentA.power + parentB.power + 1) / 2);
}

/**
 * Find the Pal whose power value is closest to the target power.
 */
export function findClosestPal(targetPower: number): Pal {
  let closest = palsByPower[0];
  let minDiff = Math.abs(palsByPower[0].power - targetPower);

  for (const pal of palsByPower) {
    const diff = Math.abs(pal.power - targetPower);
    if (diff < minDiff) {
      minDiff = diff;
      closest = pal;
    }
  }

  return closest;
}

/**
 * Breed two pals and return the result.
 */
export function breed(parentA: Pal, parentB: Pal): BreedingResult {
  const childPower = computeChildPower(parentA, parentB);
  const child = findClosestPal(childPower);
  return {
    child,
    childPower,
    powerDiff: Math.abs(child.power - childPower),
  };
}

// ── Reverse Lookup ─────────────────────────────────────────────────────────────

/**
 * Find ALL parent combinations that produce a given child.
 * Returns sorted by closest power match (most accurate first).
 */
export function findParentsForChild(childId: string): ParentCombo[] {
  const child = getPalById(childId);
  if (!child) return [];

  const combos: ParentCombo[] = [];

  for (let i = 0; i < ALL_PALS.length; i++) {
    for (let j = i; j < ALL_PALS.length; j++) {
      const parentA = ALL_PALS[i];
      const parentB = ALL_PALS[j];
      const result = breed(parentA, parentB);

      if (result.child.id === childId) {
        combos.push({
          parentA,
          parentB,
          childPower: result.childPower,
          powerDiff: result.powerDiff,
        });
      }
    }
  }

  return combos.sort((a, b) => a.powerDiff - b.powerDiff);
}

// ── Precomputed Data ───────────────────────────────────────────────────────────

export type BreedingMap = Map<string, { child: Pal; power: number }>;

/**
 * Precompute all breeding combinations for fast lookup.
 * Key format: "parentA_id|parentB_id" (alphabetically sorted)
 */
export function buildBreedingMap(): BreedingMap {
  const map: BreedingMap = new Map();

  for (let i = 0; i < ALL_PALS.length; i++) {
    for (let j = i; j < ALL_PALS.length; j++) {
      const a = ALL_PALS[i];
      const b = ALL_PALS[j];
      const [first, second] = [a.id, b.id].sort();
      const key = `${first}|${second}`;
      const result = breed(a, b);
      map.set(key, { child: result.child, power: result.childPower });
    }
  }

  return map;
}

/**
 * Get rarity tier based on power value (lower power = rarer).
 */
export function getRarity(
  power: number
): "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" {
  if (power >= 1200) return "Common";
  if (power >= 800) return "Uncommon";
  if (power >= 400) return "Rare";
  if (power >= 100) return "Epic";
  return "Legendary";
}

export const RARITY_COLORS: Record<string, string> = {
  Common: "#9CA3AF",
  Uncommon: "#34D399",
  Rare: "#60A5FA",
  Epic: "#A78BFA",
  Legendary: "#FBBF24",
};
