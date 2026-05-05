import { ALL_PALS, breed, type Pal } from "./breeding";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ChainStep {
  parentA: Pal;
  parentB: Pal;
  child: Pal;
  step: number;
}

export interface ChainResult {
  steps: ChainStep[];
  totalSteps: number;
  found: boolean;
}

// ── BFS Breeding Chain ─────────────────────────────────────────────────────────

/**
 * Find the shortest breeding chain from commonly available pals to a target pal.
 *
 * Uses BFS through the breeding graph where:
 * - Nodes = set of available pals
 * - Edges = breeding two available pals to produce a new one
 *
 * "Common" starter pals are those with power >= 1200 (easily obtainable).
 */
export function findBreedingChain(
  targetId: string,
  starterIds?: string[]
): ChainResult {
  const NO_RESULT: ChainResult = { steps: [], totalSteps: 0, found: false };

  const target = ALL_PALS.find((p) => p.id === targetId);
  if (!target) return NO_RESULT;

  // Default starters: all common pals (power >= 1200)
  const starters = starterIds
    ? new Set(starterIds)
    : new Set(ALL_PALS.filter((p) => p.power >= 1200).map((p) => p.id));

  // If target is already in starters, no breeding needed
  if (starters.has(targetId)) {
    return { steps: [], totalSteps: 0, found: true };
  }

  // BFS state: each node is a set of available pal IDs + the chain of steps
  interface BFSNode {
    available: Set<string>;
    steps: ChainStep[];
  }

  const queue: BFSNode[] = [{ available: new Set(starters), steps: [] }];
  const visited = new Set<string>();
  visited.add(serializeAvailable(starters));

  const MAX_DEPTH = 6;
  const MAX_ITERATIONS = 5000;
  let iterations = 0;

  while (queue.length > 0 && iterations < MAX_ITERATIONS) {
    iterations++;
    const current = queue.shift()!;

    if (current.steps.length >= MAX_DEPTH) continue;

    const availableArr = ALL_PALS.filter((p) => current.available.has(p.id));

    for (let i = 0; i < availableArr.length; i++) {
      for (let j = i; j < availableArr.length; j++) {
        const parentA = availableArr[i];
        const parentB = availableArr[j];
        const result = breed(parentA, parentB);

        // Skip if we already have this pal
        if (current.available.has(result.child.id)) continue;

        const newStep: ChainStep = {
          parentA,
          parentB,
          child: result.child,
          step: current.steps.length + 1,
        };

        const newSteps = [...current.steps, newStep];

        // Found the target!
        if (result.child.id === targetId) {
          return {
            steps: newSteps,
            totalSteps: newSteps.length,
            found: true,
          };
        }

        // Add new pal to available set and continue BFS
        const newAvailable = new Set(current.available);
        newAvailable.add(result.child.id);

        const key = serializeAvailable(newAvailable);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ available: newAvailable, steps: newSteps });
        }
      }
    }
  }

  return NO_RESULT;
}

/**
 * Find breeding chain between two specific pals.
 * Tries to breed from parentA's tier down to the target.
 */
export function findChainBetween(
  startId: string,
  targetId: string
): ChainResult {
  if (startId === targetId) {
    return { steps: [], totalSteps: 0, found: true };
  }

  // Use the start pal + all common pals as starters
  const starters = new Set(
    ALL_PALS.filter((p) => p.power >= 1200).map((p) => p.id)
  );
  starters.add(startId);

  return findBreedingChain(targetId, Array.from(starters));
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function serializeAvailable(available: Set<string>): string {
  return Array.from(available).sort().join(",");
}
