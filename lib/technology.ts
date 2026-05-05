import technologyTreeData from "@/data/technology-tree.json";

export type TechnologyCategory =
  | "Structure"
  | "Weapon"
  | "Ammo"
  | "Armor"
  | "Sphere"
  | "Glider"
  | "Essential"
  | "Accessory"
  | "Consumable"
  | "Material"
  | "Sphere Module"
  | "Salvage"
  | "Food"
  | "Misc";

export interface TechnologyEntry {
  id: string;
  name: string;
  level: number;
  cost: number;
  ancient: boolean;
  image: string;
  imageFile: string;
  category: TechnologyCategory;
  sourceUrl: string;
}

export const TECHNOLOGY_TREE = technologyTreeData as TechnologyEntry[];

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  "Structure",
  "Weapon",
  "Armor",
  "Ammo",
  "Sphere",
  "Glider",
  "Essential",
  "Accessory",
  "Consumable",
  "Material",
  "Sphere Module",
  "Salvage",
  "Food",
  "Misc",
];

export const TECHNOLOGY_MAX_LEVEL = Math.max(
  ...TECHNOLOGY_TREE.map((entry) => entry.level)
);
