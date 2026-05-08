export interface PassiveSkill {
  id: string;
  name: string;
  tier: number;
  description: string;
}

export const PASSIVE_SKILLS: PassiveSkill[] = [
  // Legendary / Unique
  { id: "legend", name: "Legend", tier: 3, description: "Attack +20%, Defense +20%, Movement Speed +15%" },
  { id: "lucky", name: "Lucky", tier: 3, description: "Attack +15%, Work Speed +15%" },
  { id: "divine_dragon", name: "Divine Dragon", tier: 3, description: "Dragon attack damage +20%" },
  { id: "lord_of_the_underworld", name: "Lord of the Underworld", tier: 3, description: "Dark attack damage +20%" },
  { id: "flame_emperor", name: "Flame Emperor", tier: 3, description: "Fire attack damage +20%" },
  { id: "earth_emperor", name: "Earth Emperor", tier: 3, description: "Ground attack damage +20%" },
  { id: "spirit_emperor", name: "Spirit Emperor", tier: 3, description: "Grass attack damage +20%" },
  { id: "celestial_emperor", name: "Celestial Emperor", tier: 3, description: "Neutral attack damage +20%" },
  { id: "ice_emperor", name: "Ice Emperor", tier: 3, description: "Ice attack damage +20%" },
  { id: "lord_of_lightning", name: "Lord of Lightning", tier: 3, description: "Electric attack damage +20%" },
  { id: "lord_of_the_sea", name: "Lord of the Sea", tier: 3, description: "Water attack damage +20%" },

  // Combat
  { id: "musclehead", name: "Musclehead", tier: 2, description: "Attack +30%, Work Speed -50%" },
  { id: "ferocious", name: "Ferocious", tier: 2, description: "Attack +20%" },
  { id: "burly_body", name: "Burly Body", tier: 2, description: "Defense +20%" },
  { id: "hooligan", name: "Hooligan", tier: 1, description: "Attack +15%, Work Speed -10%" },
  { id: "brave", name: "Brave", tier: 1, description: "Attack +10%" },

  // Movement
  { id: "swift", name: "Swift", tier: 2, description: "Movement Speed +30%" },
  { id: "runner", name: "Runner", tier: 1, description: "Movement Speed +20%" },
  { id: "nimble", name: "Nimble", tier: 0, description: "Movement Speed +10%" },

  // Work
  { id: "artisan", name: "Artisan", tier: 2, description: "Work Speed +50%" },
  { id: "work_slave", name: "Work Slave", tier: 1, description: "Work Speed +30%, Attack -30%" },
  { id: "serious", name: "Serious", tier: 1, description: "Work Speed +20%" },
  { id: "conceited", name: "Conceited", tier: 1, description: "Work Speed +10%, Defense -10%" },
  { id: "diet_lover", name: "Diet Lover", tier: 2, description: "Decrease in Hunger is less likely by +15%" },
  { id: "workaholic", name: "Workaholic", tier: 2, description: "SAN drops 15% slower" },

  // Player buffs
  { id: "vanguard", name: "Vanguard", tier: 2, description: "Player Attack +10%" },
  { id: "stronghold_strategist", name: "Stronghold Strategist", tier: 2, description: "Player Defense +10%" },
  { id: "motivational_leader", name: "Motivational Leader", tier: 2, description: "Player Work Speed +25%" },
  { id: "mine_foreman", name: "Mine Foreman", tier: 2, description: "Player Mining Efficiency +25%" },
  { id: "logging_foreman", name: "Logging Foreman", tier: 2, description: "Player Logging Efficiency +25%" }
].sort((a, b) => a.name.localeCompare(b.name));

export function calculatePassiveProbability(
  parentAPassives: string[],
  parentBPassives: string[]
): { probability: number; text: string; poolSize: number } {
  const pool = new Set([...parentAPassives, ...parentBPassives]);
  const poolSize = pool.size;

  if (poolSize === 0) return { probability: 100, text: "Random Mutation", poolSize: 0 };
  
  if (poolSize === 1) return { probability: 40, text: "~40% chance", poolSize: 1 };
  if (poolSize === 2) return { probability: 24, text: "~24% chance", poolSize: 2 };
  if (poolSize === 3) return { probability: 12, text: "~12% chance", poolSize: 3 };
  if (poolSize === 4) return { probability: 10, text: "~10% chance", poolSize: 4 };

  return { probability: 2, text: "< 2% chance (Too much noise)", poolSize };
}
