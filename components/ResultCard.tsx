"use client";

import { motion } from "framer-motion";
import PalAvatar from "./PalAvatar";
import {
  type Pal,
  type PalElement,
  ELEMENT_COLORS,
  getRarity,
  RARITY_COLORS,
} from "@/lib/breeding";
import { calculatePassiveProbability, PASSIVE_SKILLS } from "@/lib/passives";

interface ResultCardProps {
  child: Pal;
  childPower: number;
  parentA: Pal;
  parentB: Pal;
  passivesA?: string[];
  passivesB?: string[];
}

export default function ResultCard({
  child,
  childPower,
  parentA,
  parentB,
  passivesA = [],
  passivesB = [],
}: ResultCardProps) {
  const rarity = getRarity(child.power);
  const rarityColor = RARITY_COLORS[rarity];
  const elementColor = ELEMENT_COLORS[child.element as PalElement];
  const powerPercent = Math.max(5, Math.min(100, ((1500 - child.power) / 1500) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 mt-6"
      id="breeding-result-card"
    >
      {/* Result header */}
      <div className="text-center mb-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)] mb-2">
          Breeding Result
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full mb-3"
          style={{
            background: `${rarityColor}18`,
            color: rarityColor,
            border: `1px solid ${rarityColor}33`,
          }}
        >
          ★ {rarity}
        </div>
      </div>

      {/* Child display */}
      <div className="flex flex-col items-center gap-3 mb-5">
        {/* Large avatar */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{
            background: `radial-gradient(circle, ${elementColor}22 0%, ${elementColor}08 70%)`,
            border: `2px solid ${elementColor}55`,
            boxShadow: `0 0 30px ${elementColor}20`,
          }}
        >
          <PalAvatar
            pal={child}
            className="w-16 h-16"
            sizes="64px"
            priority
          />
        </motion.div>

        <div className="text-center">
          <h3 className="text-xl font-bold">{child.name}</h3>
          <span
            className="element-badge mt-1 inline-flex"
            style={{
              background: `${elementColor}22`,
              color: elementColor,
            }}
          >
            {child.element}
          </span>
        </div>
      </div>

      {/* Power display */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[var(--pw-text-muted)]">Breeding Power</span>
          <span className="font-mono font-bold text-[var(--pw-blue)]">
            {childPower}
          </span>
        </div>
        <div className="power-bar">
          <motion.div
            className="power-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${powerPercent}%` }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-[0.6rem] text-[var(--pw-text-dim)] mt-1">
          <span>Weak</span>
          <span>Legendary</span>
        </div>
      </div>

      {/* Breeding formula */}
      <div className="flex items-center justify-center gap-2 text-xs text-[var(--pw-text-muted)] bg-[var(--pw-surface)] rounded-lg p-3">
        <PalAvatar
          pal={parentA}
          className="w-6 h-6 shrink-0"
          sizes="24px"
        />
        <span className="font-semibold text-[var(--pw-text)]">{parentA.name}</span>
        <span className="text-[var(--pw-yellow)] font-bold">×</span>
        <PalAvatar
          pal={parentB}
          className="w-6 h-6 shrink-0"
          sizes="24px"
        />
        <span className="font-semibold text-[var(--pw-text)]">{parentB.name}</span>
        <span className="text-[var(--pw-blue)]">=</span>
        <PalAvatar
          pal={child}
          className="w-6 h-6 shrink-0"
          sizes="24px"
        />
        <span className="font-bold text-[var(--pw-yellow)]">{child.name}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--pw-text-muted)] text-center mt-3 leading-relaxed">
        {child.description}
      </p>

      {/* Passives Probability */}
      {(passivesA.length > 0 || passivesB.length > 0) && (
        <div className="mt-4 pt-4 border-t border-[var(--pw-border)]">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)] mb-3 text-center">
            Passive Inheritance Odds
          </div>
          <div className="bg-[var(--pw-bg-alt)]/50 border border-[var(--pw-border)] rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--pw-text-muted)]">
                Chance to inherit selected traits:
              </span>
              <span className="text-sm font-bold text-[var(--pw-yellow)]">
                {calculatePassiveProbability(passivesA, passivesB).text}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {Array.from(new Set([...passivesA, ...passivesB])).map((id) => {
                const p = PASSIVE_SKILLS.find(x => x.id === id);
                if (!p) return null;
                return (
                  <span key={id} className="text-[0.65rem] font-medium bg-[var(--pw-yellow)]/10 text-[var(--pw-yellow)] px-1.5 py-0.5 rounded border border-[var(--pw-yellow)]/20">
                    {p.name}
                  </span>
                );
              })}
            </div>
            <p className="text-[0.6rem] text-[var(--pw-text-dim)] leading-tight">
              Based on a pool size of {calculatePassiveProbability(passivesA, passivesB).poolSize} unique passives. Reduce noise by breeding parents with only these specific traits.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
