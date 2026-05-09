"use client";

import PalAvatar from "./PalAvatar";
import {
  type ChainStep,
  type ChainResult,
} from "@/lib/graph";
import {
  ELEMENT_COLORS,
  type Pal,
  type PalElement,
  getRarity,
  RARITY_COLORS,
} from "@/lib/breeding";

interface ChainViewerProps {
  chain: ChainResult;
  targetName: string;
}

export default function ChainViewer({ chain, targetName }: ChainViewerProps) {
  if (!chain.found) {
    return (
      <div
        className="text-center py-8 animate-fade-in"
      >
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-[var(--pw-text-muted)] text-sm">
          No breeding chain found for <strong>{targetName}</strong>
        </p>
        <p className="text-[var(--pw-text-dim)] text-xs mt-1">
          Try selecting different start/target Pals
        </p>
      </div>
    );
  }

  if (chain.steps.length === 0) {
    return (
      <div
        className="text-center py-8 animate-fade-in"
      >
        <div className="text-4xl mb-3">✅</div>
        <p className="text-[var(--pw-text-muted)] text-sm">
          <strong>{targetName}</strong> is already commonly available!
        </p>
        <p className="text-[var(--pw-text-dim)] text-xs mt-1">
          No breeding required
        </p>
      </div>
    );
  }

  return (
    <div
      className="space-y-0 mt-4 animate-fade-in"
    >
      {/* Chain header */}
      <div className="text-center mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)]">
          {chain.totalSteps}-Step Breeding Chain
        </span>
      </div>

      {chain.steps.map((step, i) => (
        <div key={i}>
          <StepCard step={step} index={i} total={chain.totalSteps} />
          {i < chain.steps.length - 1 && (
            <div className="flex justify-center">
              <div className="chain-connector" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StepCard({
  step,
  index,
  total,
}: {
  step: ChainStep;
  index: number;
  total: number;
}) {
  const childColor = ELEMENT_COLORS[step.child.element as PalElement];
  const rarity = getRarity(step.child.power);
  const isLast = index === total - 1;

  return (
    <div
      className={`glass-card-static p-4 animate-slide-in-left ${isLast ? "ring-1 ring-[var(--pw-yellow)]" : ""}`}
      style={{ animationDelay: `${index * 0.1}s`, ...(isLast ? { boxShadow: `0 0 20px ${RARITY_COLORS[rarity]}20` } : {}) }}
    >
      <div className="flex items-center gap-3">
        {/* Step number */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{
            background: isLast ? `${childColor}30` : "var(--pw-surface)",
            color: isLast ? childColor : "var(--pw-text-muted)",
            border: `1px solid ${isLast ? childColor + "55" : "var(--pw-border)"}`,
          }}
        >
          {index + 1}
        </div>

        {/* Parents */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <PalChip pal={step.parentA} />
          <span className="text-[var(--pw-yellow)] font-bold text-sm shrink-0">+</span>
          <PalChip pal={step.parentB} />
          <span className="text-[var(--pw-blue)] shrink-0 mx-1">→</span>
          <PalChip pal={step.child} highlight={isLast} />
        </div>
      </div>
    </div>
  );
}

function PalChip({
  pal,
  highlight = false,
}: {
  pal: Pick<Pal, "id" | "name" | "element" | "power">;
  highlight?: boolean;
}) {
  const color = ELEMENT_COLORS[pal.element as PalElement];

  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs shrink-0"
      style={{
        background: highlight ? `${color}22` : "var(--pw-surface)",
        border: `1px solid ${highlight ? color + "44" : "var(--pw-border)"}`,
      }}
    >
      <PalAvatar pal={pal} className="h-5 w-5 shrink-0" sizes="20px" />
      <span className={`font-medium truncate max-w-[5rem] ${highlight ? "font-bold" : ""}`}
        style={highlight ? { color } : {}}
      >
        {pal.name}
      </span>
    </div>
  );
}
