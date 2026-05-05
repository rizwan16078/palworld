import captureRateData from "@/data/capture-rate.json";

export type CaptureRateRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface CaptureRatePal {
  id: string;
  slug: string;
  name: string;
  bpClass: string;
  image: string | null;
  assetPathName: string;
  level: number;
  rarity: CaptureRateRarity;
  rarityLevel: number;
  elements: string[];
  captureRateCorrect: number;
  bossCaptureRateCorrect: number;
  sourceUrl: string;
}

export interface CaptureSphere {
  id: string;
  name: string;
  image: string;
  power: number;
}

export interface CaptureCalculationInput {
  level: number;
  hpPercent: number;
  spherePower: number;
  capturePower: number;
  defaultCaptureRate: number;
  palCaptureRate: number;
}

export interface CaptureDisplayResult {
  rawChance: number;
  basePercent: number;
  backBonusPercent: number;
}

export const CAPTURE_RATE_PALS = captureRateData as CaptureRatePal[];

export const CAPTURE_RATE_SPHERES: CaptureSphere[] = [
  {
    id: "pal",
    name: "Pal Sphere",
    image: "/technology/T_itemicon_PalSphere.png",
    power: 7,
  },
  {
    id: "mega",
    name: "Mega Sphere",
    image: "/technology/T_itemicon_PalSphere_Mega.png",
    power: 14,
  },
  {
    id: "giga",
    name: "Giga Sphere",
    image: "/technology/T_itemicon_PalSphere_Giga.png",
    power: 20,
  },
  {
    id: "tera",
    name: "Tera Sphere",
    image: "/technology/T_itemicon_PalSphere_Tera.png",
    power: 26,
  },
  {
    id: "hyper",
    name: "Hyper Sphere",
    image: "/technology/T_itemicon_PalSphere_Master.png",
    power: 32,
  },
  {
    id: "legendary",
    name: "Legendary Sphere",
    image: "/technology/T_itemicon_PalSphere_Legend.png",
    power: 37,
  },
  {
    id: "ultimate",
    name: "Ultimate Sphere",
    image: "/technology/T_itemicon_PalSphere_Ultimate.png",
    power: 43,
  },
];

export const CAPTURE_RATE_ELEMENTS = Array.from(
  new Set(
    CAPTURE_RATE_PALS.flatMap((pal) =>
      pal.elements.map((element) => normalizeElement(element))
    )
  )
).sort((left, right) => left.localeCompare(right));

export const CAPTURE_RATE_RARITIES: CaptureRateRarity[] = [
  "Common",
  "Rare",
  "Epic",
  "Legendary",
];

export const CAPTURE_RATE_DEFAULT_PAL =
  CAPTURE_RATE_PALS.find((pal) => pal.id === "ChickenPal") ??
  CAPTURE_RATE_PALS[0];

export const CAPTURE_RATE_MIN_LEVEL = 1;
export const CAPTURE_RATE_MAX_LEVEL = Math.max(
  ...CAPTURE_RATE_PALS.map((pal) => pal.level)
);
export const CAPTURE_POWER_MIN = 1;
export const CAPTURE_POWER_MAX = 10;
export const DEFAULT_CAPTURE_RATE_MIN = 0.5;
export const DEFAULT_CAPTURE_RATE_MAX = 2;
export const DEFAULT_CAPTURE_RATE_STEP = 0.1;

export function normalizeElement(element: string) {
  switch (element) {
    case "Electricity":
      return "Electric";
    default:
      return element;
  }
}

export function getPalCaptureRate(pal: CaptureRatePal, isBoss: boolean) {
  return isBoss ? pal.bossCaptureRateCorrect : pal.captureRateCorrect;
}

export function calculateCaptureChance({
  level,
  hpPercent,
  spherePower,
  capturePower,
  defaultCaptureRate,
  palCaptureRate,
}: CaptureCalculationInput) {
  const halfSphere = spherePower * 0.5;
  const adjusted = capturePower + halfSphere;
  const difference = adjusted - level;

  let hpFactor = 0;

  if (difference >= 50) {
    hpFactor = 1;
  } else if (difference <= -50) {
    hpFactor = 0;
  } else {
    hpFactor = (difference + 50) / 99;
  }

  const negativeHpRatio = (hpPercent / 100) * -1;
  const scaled = Math.pow(1.3, negativeHpRatio) * hpFactor;

  let capture = 0;

  if (scaled >= 0.5) {
    capture = 1 - Math.pow(-2 * scaled + 2, 9) / 2;
  } else {
    capture = Math.pow(2, 8) * Math.pow(scaled, 9);
  }

  return clamp(capture * palCaptureRate * defaultCaptureRate, 0, 1);
}

export function getCaptureDisplayResult(
  input: CaptureCalculationInput
): CaptureDisplayResult {
  const rawChance = calculateCaptureChance(input);
  const steps = [0.444444, 0.333333, 0.222222].map((power) =>
    Math.pow(rawChance, power)
  );

  const baseProduct = steps.reduce((product, value) => product * value, 1);
  const backBonusProduct = steps[1] * steps[2];

  return {
    rawChance,
    basePercent: Math.pow(baseProduct * 100, 1.3) * 0.25,
    backBonusPercent: Math.pow(backBonusProduct * 100, 1.3) * 0.25,
  };
}

export function formatCapturePercent(value: number) {
  const rounded = Number(value.toFixed(2));

  if (rounded === 99.53) {
    return "100%";
  }

  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2)}%`;
}

export function clamp(value: number, min: number, max: number) {
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
}
