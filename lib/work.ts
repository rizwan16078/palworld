export type WorkSuitabilityType = 
  | "Kindling"
  | "Watering"
  | "Planting"
  | "Generating Electricity"
  | "Handiwork"
  | "Gathering"
  | "Lumbering"
  | "Mining"
  | "Medicine Production"
  | "Cooling"
  | "Transporting"
  | "Farming";

export interface WorkSuitabilityDef {
  id: string; // url-friendly slug
  name: WorkSuitabilityType;
  description: string;
  icon: string;
}

export const WORK_SUITABILITIES: WorkSuitabilityDef[] = [
  { id: "kindling", name: "Kindling", description: "Lighting furnaces and cooking food.", icon: "🔥" },
  { id: "watering", name: "Watering", description: "Hydrating crops and operating water wheels.", icon: "💧" },
  { id: "planting", name: "Planting", description: "Sowing seeds in plantations.", icon: "🌱" },
  { id: "generating-electricity", name: "Generating Electricity", description: "Powering electric devices.", icon: "⚡" },
  { id: "handiwork", name: "Handiwork", description: "Crafting items at workbenches and assembly lines.", icon: "🔨" },
  { id: "gathering", name: "Gathering", description: "Harvesting ripe crops.", icon: "🌾" },
  { id: "lumbering", name: "Lumbering", description: "Felling trees for wood.", icon: "🪓" },
  { id: "mining", name: "Mining", description: "Breaking rocks and mineral nodes.", icon: "⛏️" },
  { id: "medicine-production", name: "Medicine Production", description: "Crafting medicine at workstations.", icon: "💊" },
  { id: "cooling", name: "Cooling", description: "Operating refrigerators to keep food fresh.", icon: "❄️" },
  { id: "transporting", name: "Transporting", description: "Moving items from harvest stations to storage.", icon: "📦" },
  { id: "farming", name: "Farming", description: "Producing specific items in a Ranch.", icon: "🐑" }
];

export function getWorkDefById(id: string): WorkSuitabilityDef | undefined {
  return WORK_SUITABILITIES.find(w => w.id === id);
}

export function getWorkDefByName(name: string): WorkSuitabilityDef | undefined {
  return WORK_SUITABILITIES.find(w => w.name === name);
}
