import structuresData from "@/data/structures.json";

export interface StructureMaterial {
  id: string;
  name: string;
  amount: number | null;
  amountText: string;
  image: string | null;
  imageFile: string | null;
}

export interface StructureEntry {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  buildWork: number | null;
  image: string | null;
  imageFile: string | null;
  materials: StructureMaterial[];
  sourceUrl: string;
  order: number;
}

export const STRUCTURES = structuresData as StructureEntry[];

export const STRUCTURE_CATEGORIES = STRUCTURES.reduce<string[]>(
  (categories, entry) => {
    if (!categories.includes(entry.type)) {
      categories.push(entry.type);
    }

    return categories;
  },
  []
);

export const STRUCTURES_WITH_LOCAL_ICONS = STRUCTURES.filter(
  (entry) => entry.image
).length;

export const STRUCTURES_MAX_BUILD_WORK = STRUCTURES.reduce(
  (max, entry) => Math.max(max, entry.buildWork ?? 0),
  0
);
