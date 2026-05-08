"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PalSelector from "./PalSelector";
import ResultCard from "./ResultCard";
import ChainViewer from "./ChainViewer";
import PalAvatar from "./PalAvatar";
import PassiveSelector from "./PassiveSelector";
import {
  type Pal,
  type PalElement,
  type ParentCombo,
  breed,
  findParentsForChild,
  ELEMENT_COLORS,
} from "@/lib/breeding";
import { findBreedingChain } from "@/lib/graph";

type Tab = "breed" | "parents" | "chain";

export default function CalculatorCard() {
  const [activeTab, setActiveTab] = useState<Tab>("breed");

  return (
    <div className="glass-card-static w-full max-w-xl mx-auto overflow-hidden">
      {/* Tab navigation */}
      <div className="p-4 pb-0">
        <div className="tab-list">
          <TabButton
            active={activeTab === "breed"}
            onClick={() => setActiveTab("breed")}
            label="Breed 2 Pals"
            icon="🥚"
          />
          <TabButton
            active={activeTab === "parents"}
            onClick={() => setActiveTab("parents")}
            label="Find Parents"
            icon="🔍"
          />
          <TabButton
            active={activeTab === "chain"}
            onClick={() => setActiveTab("chain")}
            label="Breed Chain"
            icon="🔗"
          />
        </div>
      </div>

      {/* Tab content */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {activeTab === "breed" && (
            <motion.div
              key="breed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <BreedTab />
            </motion.div>
          )}
          {activeTab === "parents" && (
            <motion.div
              key="parents"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <FindParentsTab />
            </motion.div>
          )}
          {activeTab === "chain" && (
            <motion.div
              key="chain"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ChainTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Tab Button ──────────────────────────────────────────────────────────── */

function TabButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      className="tab-trigger"
      data-active={active ? "true" : undefined}
      onClick={onClick}
      type="button"
    >
      <span className="mr-1.5">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">
        {label.split(" ").slice(-1)[0]}
      </span>
    </button>
  );
}

/* ── Breed 2 Pals Tab ────────────────────────────────────────────────────── */

function BreedTab() {
  const [parentA, setParentA] = useState<Pal | null>(null);
  const [parentB, setParentB] = useState<Pal | null>(null);
  const [passivesA, setPassivesA] = useState<string[]>([]);
  const [passivesB, setPassivesB] = useState<string[]>([]);
  const [selectorTarget, setSelectorTarget] = useState<"A" | "B" | null>(null);

  const result = parentA && parentB ? breed(parentA, parentB) : null;

  const handleSelect = useCallback(
    (pal: Pal) => {
      if (selectorTarget === "A") setParentA(pal);
      else if (selectorTarget === "B") setParentB(pal);
    },
    [selectorTarget]
  );

  return (
    <>
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* Parent A */}
        <div className="flex flex-col items-center">
          <PalCircleButton
            pal={parentA}
            label="Parent A"
            onClick={() => setSelectorTarget("A")}
          />
        </div>

        {/* Multiply icon */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={{ rotate: result ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-10 h-10 rounded-full bg-[var(--pw-surface)] border border-[var(--pw-border)] flex items-center justify-center text-lg font-bold text-[var(--pw-yellow)]"
          >
            ×
          </motion.div>
        </div>

        {/* Parent B */}
        <div className="flex flex-col items-center">
          <PalCircleButton
            pal={parentB}
            label="Parent B"
            onClick={() => setSelectorTarget("B")}
          />
        </div>
      </div>

      {parentA && parentB && (
        <div className="grid grid-cols-2 gap-6 mt-6 mb-2">
          <PassiveSelector label="Parent A" selectedPassives={passivesA} onChange={setPassivesA} />
          <PassiveSelector label="Parent B" selectedPassives={passivesB} onChange={setPassivesB} />
        </div>
      )}

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && parentA && parentB && (
          <ResultCard
            key={`${parentA.id}-${parentB.id}`}
            child={result.child}
            childPower={result.childPower}
            parentA={parentA}
            parentB={parentB}
            passivesA={passivesA}
            passivesB={passivesB}
          />
        )}
      </AnimatePresence>

      {!result && (
        <div className="text-center mt-8 text-[var(--pw-text-dim)] text-sm">
          Select two Pals to see their offspring
        </div>
      )}

      {/* Selector modal */}
      <PalSelector
        isOpen={selectorTarget !== null}
        onClose={() => setSelectorTarget(null)}
        onSelect={handleSelect}
      />
    </>
  );
}

/* ── Find Parents Tab ────────────────────────────────────────────────────── */

function FindParentsTab() {
  const [child, setChild] = useState<Pal | null>(null);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [combos, setCombos] = useState<ParentCombo[]>([]);

  const handleSelect = useCallback((pal: Pal) => {
    setChild(pal);
    const results = findParentsForChild(pal.id);
    setCombos(results);
  }, []);

  return (
    <>
      <div className="text-center mb-4">
        <p className="text-sm text-[var(--pw-text-muted)] mb-4">
          Select a Pal to find all parent combinations
        </p>
        <div className="flex justify-center">
          <PalCircleButton
            pal={child}
            label="Target Child"
            onClick={() => setSelectorOpen(true)}
          />
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {child && combos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)]">
                {combos.length} Combinations Found
              </span>
              <span className="text-[0.65rem] text-[var(--pw-text-dim)]">
                Sorted by accuracy
              </span>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {combos.slice(0, 20).map((combo, i) => (
                <ComboRow key={`${combo.parentA.id}-${combo.parentB.id}`} combo={combo} rank={i + 1} />
              ))}
              {combos.length > 20 && (
                <div className="text-center text-xs text-[var(--pw-text-dim)] py-2">
                  +{combos.length - 20} more combinations
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {child && combos.length === 0 && (
        <div className="text-center mt-6 text-[var(--pw-text-dim)] text-sm">
          No parent combinations found
        </div>
      )}

      <PalSelector
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}

/* ── Breeding Chain Tab ──────────────────────────────────────────────────── */

function ChainTab() {
  const [target, setTarget] = useState<Pal | null>(null);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const chain = target ? findBreedingChain(target.id) : null;

  return (
    <>
      <div className="text-center mb-4">
        <p className="text-sm text-[var(--pw-text-muted)] mb-4">
          Find the shortest breeding path from common Pals
        </p>
        <div className="flex justify-center">
          <PalCircleButton
            pal={target}
            label="Target Pal"
            onClick={() => setSelectorOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {chain && target && (
          <ChainViewer chain={chain} targetName={target.name} />
        )}
      </AnimatePresence>

      <PalSelector
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={(pal) => setTarget(pal)}
      />
    </>
  );
}

/* ── Shared Sub-Components ───────────────────────────────────────────────── */

function PalCircleButton({
  pal,
  label,
  onClick,
}: {
  pal: Pal | null;
  label: string;
  onClick: () => void;
}) {
  const elementColor = pal
    ? ELEMENT_COLORS[pal.element as PalElement]
    : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`pal-circle flex-col gap-1 ${pal ? "selected" : ""}`}
      style={
        pal
          ? {
              borderColor: elementColor,
              background: `radial-gradient(circle, ${elementColor}18 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${elementColor}15`,
            }
          : undefined
      }
      id={`select-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {pal ? (
        <>
          <PalAvatar pal={pal} className="w-16 h-16" sizes="64px" />
          <span className="text-xs font-semibold text-[var(--pw-text)] truncate max-w-[5rem]">
            {pal.name}
          </span>
          <span
            className="text-[0.6rem] font-mono"
            style={{ color: elementColor }}
          >
            PWR {pal.power}
          </span>
        </>
      ) : (
        <>
          <svg
            className="w-8 h-8 text-[var(--pw-text-dim)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-[0.65rem] text-[var(--pw-text-dim)]">
            {label}
          </span>
        </>
      )}
    </button>
  );
}

function ComboRow({ combo, rank }: { combo: ParentCombo; rank: number }) {
  const aColor = ELEMENT_COLORS[combo.parentA.element as PalElement];
  const bColor = ELEMENT_COLORS[combo.parentB.element as PalElement];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.02 }}
      className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--pw-surface)] border border-[var(--pw-border)] hover:border-[var(--pw-border-hover)] transition-colors"
    >
      <span className="text-[0.65rem] text-[var(--pw-text-dim)] w-5 text-right font-mono shrink-0">
        {rank}
      </span>
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <PalAvatar
          pal={combo.parentA}
          className="w-5 h-5 shrink-0"
          sizes="20px"
        />
        <span className="text-xs font-medium truncate" style={{ color: aColor }}>
          {combo.parentA.name}
        </span>
        <span className="text-[var(--pw-yellow)] text-xs font-bold shrink-0">+</span>
        <PalAvatar
          pal={combo.parentB}
          className="w-5 h-5 shrink-0"
          sizes="20px"
        />
        <span className="text-xs font-medium truncate" style={{ color: bColor }}>
          {combo.parentB.name}
        </span>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[0.6rem] text-[var(--pw-text-dim)] font-mono">
          Δ{combo.powerDiff}
        </div>
      </div>
    </motion.div>
  );
}
