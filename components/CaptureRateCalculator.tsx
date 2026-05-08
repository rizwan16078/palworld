"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import {
  CAPTURE_POWER_MAX,
  CAPTURE_POWER_MIN,
  CAPTURE_RATE_DEFAULT_PAL,
  CAPTURE_RATE_ELEMENTS,
  CAPTURE_RATE_MAX_LEVEL,
  CAPTURE_RATE_PALS,
  CAPTURE_RATE_RARITIES,
  CAPTURE_RATE_SPHERES,
  DEFAULT_CAPTURE_RATE_MAX,
  DEFAULT_CAPTURE_RATE_MIN,
  DEFAULT_CAPTURE_RATE_STEP,
  formatCapturePercent,
  getCaptureDisplayResult,
  getPalCaptureRate,
  normalizeElement,
  type CaptureRatePal,
  type CaptureRateRarity,
} from "@/lib/capture-rate";
import {
  ELEMENT_COLORS,
  RARITY_COLORS,
  type PalElement,
} from "@/lib/breeding";

type ElementFilter = "All" | (typeof CAPTURE_RATE_ELEMENTS)[number];
type RarityFilter = "All" | CaptureRateRarity;

const DEFAULT_CAPTURE_RATE_LABELS = [
  0.5, 0.8, 1.0, 1.2, 1.5, 2.0,
] as const;

export default function CaptureRateCalculator() {
  const [selectedPal, setSelectedPal] = useState(CAPTURE_RATE_DEFAULT_PAL);
  const [level, setLevel] = useState(CAPTURE_RATE_DEFAULT_PAL.level);
  const [hpPercent, setHpPercent] = useState(100);
  const [capturePower, setCapturePower] = useState(CAPTURE_POWER_MIN);
  const [defaultCaptureRate, setDefaultCaptureRate] = useState(1);
  const [isBoss, setIsBoss] = useState(false);
  const [query, setQuery] = useState("");
  const [elementFilter, setElementFilter] = useState<ElementFilter>("All");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("All");

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredPals = CAPTURE_RATE_PALS.filter((pal) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      pal.name.toLowerCase().includes(normalizedQuery) ||
      pal.slug.toLowerCase().includes(normalizedQuery) ||
      pal.rarity.toLowerCase().includes(normalizedQuery) ||
      String(pal.level).includes(normalizedQuery) ||
      pal.elements.some((element) =>
        normalizeElement(element).toLowerCase().includes(normalizedQuery)
      );

    const matchesElement =
      elementFilter === "All" ||
      pal.elements.some(
        (element) => normalizeElement(element) === elementFilter
      );

    const matchesRarity =
      rarityFilter === "All" || pal.rarity === rarityFilter;

    return matchesQuery && matchesElement && matchesRarity;
  });

  const palCaptureRate = getPalCaptureRate(selectedPal, isBoss);
  const sphereResults = CAPTURE_RATE_SPHERES.map((sphere) => ({
    sphere,
    result: getCaptureDisplayResult({
      level,
      hpPercent,
      spherePower: sphere.power,
      capturePower,
      defaultCaptureRate,
      palCaptureRate,
    }),
  }));

  const bestBasePercent = Math.max(
    ...sphereResults.map(({ result }) => result.basePercent)
  );
  const bestBackBonusPercent = Math.max(
    ...sphereResults.map(({ result }) => result.backBonusPercent)
  );

  return (
    <div className="space-y-6">
      <section className="glass-card-static p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--pw-text-dim)]">
                Capture Rate Calculator
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="text-gradient">Calculate Any Capture</span>
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--pw-text-muted)] sm:text-base">
              Pick a Pal, tune its level and remaining HP, then compare every
              sphere using the local capture formulas and artwork already in
              this project.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatTile
              label="Pals"
              value={String(CAPTURE_RATE_PALS.length)}
            />
            <StatTile
              label="Spheres"
              value={String(CAPTURE_RATE_SPHERES.length)}
            />
            <StatTile
              label="Elements"
              value={String(CAPTURE_RATE_ELEMENTS.length)}
            />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="space-y-6">
          <section className="glass-card-static p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <CapturePalPortrait pal={selectedPal} size={88} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-[var(--pw-text)]">
                      {selectedPal.name}
                    </h2>
                    <span
                      className="rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
                      style={{
                        background: `${RARITY_COLORS[selectedPal.rarity]}22`,
                        color: RARITY_COLORS[selectedPal.rarity],
                      }}
                    >
                      {selectedPal.rarity}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedPal.elements.map((element) => {
                      const normalizedElement = normalizeElement(element);
                      const elementColor = getElementColor(normalizedElement);

                      return (
                        <span
                          key={`${selectedPal.id}-${normalizedElement}`}
                          className="rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                          style={{
                            background: `${elementColor}22`,
                            color: elementColor,
                          }}
                        >
                          {normalizedElement}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <StatTile label="Suggested Lvl" value={String(selectedPal.level)} />
                <StatTile
                  label="Normal Rate"
                  value={formatModifier(selectedPal.captureRateCorrect)}
                />
                <StatTile
                  label="Boss Rate"
                  value={formatModifier(selectedPal.bossCaptureRateCorrect)}
                />
              </div>
            </div>
          </section>

          <section className="glass-card-static p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--pw-text-dim)]">
                  Encounter Settings
                </p>
                <h2 className="mt-2 text-xl font-bold">Tune the catch setup</h2>
              </div>

              <div className="inline-flex rounded-full border border-[var(--pw-border)] bg-[var(--pw-surface)] p-1">
                <ToggleButton
                  active={!isBoss}
                  onClick={() => setIsBoss(false)}
                  label="Normal"
                />
                <ToggleButton
                  active={isBoss}
                  onClick={() => setIsBoss(true)}
                  label="Boss"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <RangeField
                label="Pal Level"
                value={level}
                min={1}
                max={CAPTURE_RATE_MAX_LEVEL}
                step={1}
                formatValue={(value) => `${value}`}
                helper="The selected pal resets to its suggested level when you switch targets."
                onChange={setLevel}
              />
              <RangeField
                label="Remaining HP"
                value={hpPercent}
                min={1}
                max={100}
                step={1}
                formatValue={(value) => `${value}%`}
                helper="Lower HP increases the capture check before the sphere modifiers apply."
                onChange={setHpPercent}
              />
              <RangeField
                label="Capture Power"
                value={capturePower}
                min={CAPTURE_POWER_MIN}
                max={CAPTURE_POWER_MAX}
                step={1}
                formatValue={(value) => `${value}`}
                helper="This matches the player capture-power slider from the source calculator."
                onChange={setCapturePower}
              />
              <RangeField
                label="Default Capture Rate"
                value={defaultCaptureRate}
                min={DEFAULT_CAPTURE_RATE_MIN}
                max={DEFAULT_CAPTURE_RATE_MAX}
                step={DEFAULT_CAPTURE_RATE_STEP}
                formatValue={(value) => `${value.toFixed(1)}x`}
                helper="Use this to reflect world settings or server multipliers."
                onChange={setDefaultCaptureRate}
                quickValues={DEFAULT_CAPTURE_RATE_LABELS}
              />
            </div>
          </section>

          <section className="glass-card-static p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--pw-text-dim)]">
                  Sphere Results
                </p>
                <h2 className="mt-2 text-xl font-bold">Compare every sphere</h2>
              </div>
              <p className="max-w-md text-sm text-[var(--pw-text-muted)]">
                Base chance uses the direct throw. Back bonus applies the stronger
                behind-the-target catch modifier.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {sphereResults.map(({ sphere, result }) => (
                <SphereResultCard
                  key={sphere.id}
                  sphere={sphere}
                  basePercent={result.basePercent}
                  backBonusPercent={result.backBonusPercent}
                  isBestBase={result.basePercent === bestBasePercent}
                  isBestBackBonus={
                    result.backBonusPercent === bestBackBonusPercent
                  }
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="glass-card-static p-4 sm:p-5">
            <div className="grid gap-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                  Search Pal
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Anubis, Fire, Epic..."
                  className="w-full rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text)] outline-none transition-colors placeholder:text-[var(--pw-text-dim)] focus:border-[var(--pw-blue)]"
                />
              </label>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                  Rarity
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    active={rarityFilter === "All"}
                    label="All"
                    onClick={() => setRarityFilter("All")}
                  />
                  {CAPTURE_RATE_RARITIES.map((rarity) => (
                    <FilterChip
                      key={rarity}
                      active={rarityFilter === rarity}
                      label={rarity}
                      onClick={() => setRarityFilter(rarity)}
                      color={RARITY_COLORS[rarity]}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                  Element
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    active={elementFilter === "All"}
                    label="All"
                    onClick={() => setElementFilter("All")}
                  />
                  {CAPTURE_RATE_ELEMENTS.map((element) => (
                    <FilterChip
                      key={element}
                      active={elementFilter === element}
                      label={element}
                      onClick={() => setElementFilter(element)}
                      color={getElementColor(element)}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text-muted)]">
                <span className="font-semibold text-[var(--pw-text)]">
                  {filteredPals.length}
                </span>{" "}
                of {CAPTURE_RATE_PALS.length} pals
              </div>
            </div>
          </section>

          <section className="glass-card-static overflow-hidden">
            <div className="border-b border-[var(--pw-border)] px-4 py-3 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                Pick a Pal
              </p>
            </div>

            {filteredPals.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <h3 className="text-lg font-semibold">No pals matched</h3>
                <p className="mt-2 text-sm text-[var(--pw-text-muted)]">
                  Try a different name, element, or rarity filter.
                </p>
              </div>
            ) : (
              <div className="max-h-[900px] overflow-y-auto p-3 sm:p-4">
                <div className="grid gap-2">
                  {filteredPals.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => {
                        setSelectedPal(pal);
                        setLevel(pal.level);
                      }}
                      className="flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all"
                      style={{
                        borderColor:
                          pal.id === selectedPal.id
                            ? "rgba(79, 156, 247, 0.55)"
                            : "var(--pw-border)",
                        background:
                          pal.id === selectedPal.id
                            ? "rgba(79, 156, 247, 0.12)"
                            : "rgba(255, 255, 255, 0.04)",
                        boxShadow:
                          pal.id === selectedPal.id
                            ? "0 0 0 1px rgba(79, 156, 247, 0.18)"
                            : "none",
                      }}
                    >
                      <CapturePalPortrait pal={pal} size={56} />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="truncate text-sm font-semibold text-[var(--pw-text)]">
                            {pal.name}
                          </div>
                          <div className="text-xs font-medium text-[var(--pw-text-muted)]">
                            Lv {pal.level}
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {pal.elements.map((element) => {
                            const normalizedElement = normalizeElement(element);
                            const elementColor =
                              getElementColor(normalizedElement);

                            return (
                              <span
                                key={`${pal.id}-${normalizedElement}`}
                                className="rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                                style={{
                                  background: `${elementColor}22`,
                                  color: elementColor,
                                }}
                              >
                                {normalizedElement}
                              </span>
                            );
                          })}
                          <span
                            className="rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                            style={{
                              background: `${RARITY_COLORS[pal.rarity]}1f`,
                              color: RARITY_COLORS[pal.rarity],
                            }}
                          >
                            {pal.rarity}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

function SphereResultCard({
  sphere,
  basePercent,
  backBonusPercent,
  isBestBase,
  isBestBackBonus,
}: {
  sphere: (typeof CAPTURE_RATE_SPHERES)[number];
  basePercent: number;
  backBonusPercent: number;
  isBestBase: boolean;
  isBestBackBonus: boolean;
}) {
  const isGuaranteed = backBonusPercent >= 99.5;

  return (
    <article
      className="rounded-2xl border p-4 sm:p-5"
      style={{
        borderColor: isGuaranteed
          ? "rgba(255, 217, 61, 0.35)"
          : "var(--pw-border)",
        background: isGuaranteed
          ? "linear-gradient(135deg, rgba(255, 217, 61, 0.12), rgba(255, 255, 255, 0.03))"
          : "rgba(255, 255, 255, 0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)]">
            <Image
              src={sphere.image}
              alt={`${sphere.name} icon`}
              width={42}
              height={42}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">{sphere.name}</h3>
            <p className="text-sm text-[var(--pw-text-muted)]">
              Sphere power {sphere.power}
            </p>
          </div>
        </div>

        {isGuaranteed ? (
          <span className="rounded-full bg-[var(--pw-yellow)]/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--pw-yellow)]">
            Guaranteed
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        <ResultMeter
          label="Base Throw"
          value={basePercent}
          formatted={formatCapturePercent(basePercent)}
          highlight={isBestBase}
        />
        <ResultMeter
          label="Back Bonus"
          value={backBonusPercent}
          formatted={formatCapturePercent(backBonusPercent)}
          highlight={isBestBackBonus}
        />
      </div>
    </article>
  );
}

function ResultMeter({
  label,
  value,
  formatted,
  highlight,
}: {
  label: string;
  value: number;
  formatted: string;
  highlight: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pw-text-dim)]">
          {label}
        </span>
        <span
          className="text-sm font-bold"
          style={{
            color: highlight ? "var(--pw-yellow)" : "var(--pw-text)",
          }}
        >
          {formatted}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(value, 100)}%`,
            background: highlight
              ? "linear-gradient(90deg, var(--pw-yellow), #fff3b0)"
              : "linear-gradient(90deg, var(--pw-blue), var(--pw-yellow))",
          }}
        />
      </div>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  helper,
  onChange,
  formatValue,
  quickValues,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  helper: string;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  quickValues?: readonly number[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
            {label}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--pw-text-muted)]">
            {helper}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--pw-border)] bg-black/10 px-3 py-2 text-sm font-bold text-[var(--pw-text)]">
          {formatValue(value)}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer accent-[var(--pw-blue)]"
      />

      <div className="mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.14em] text-[var(--pw-text-dim)]">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>

      {quickValues ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {quickValues.map((quickValue) => (
            <button
              key={`${label}-${quickValue}`}
              type="button"
              onClick={() => onChange(quickValue)}
              className="rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-all"
              style={{
                borderColor:
                  quickValue === value
                    ? "rgba(79, 156, 247, 0.45)"
                    : "var(--pw-border)",
                background:
                  quickValue === value
                    ? "rgba(79, 156, 247, 0.14)"
                    : "rgba(255, 255, 255, 0.04)",
                color:
                  quickValue === value
                    ? "var(--pw-blue)"
                    : "var(--pw-text-muted)",
              }}
            >
              {formatValue(quickValue)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-3 py-3 text-center sm:px-4">
      <div className="text-lg font-bold text-[var(--pw-text)] sm:text-xl">
        {value}
      </div>
      <div className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--pw-text-dim)]">
        {label}
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
      style={{
        background: active ? "rgba(79, 156, 247, 0.18)" : "transparent",
        color: active ? "var(--pw-blue)" : "var(--pw-text-muted)",
      }}
    >
      {label}
    </button>
  );
}

function FilterChip({
  active,
  label,
  onClick,
  color,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all"
      style={{
        borderColor: active ? color ?? "var(--pw-blue)" : "var(--pw-border)",
        background: active
          ? `${color ?? "#4F9CF7"}22`
          : "rgba(255, 255, 255, 0.04)",
        color: active ? color ?? "var(--pw-blue)" : "var(--pw-text-muted)",
      }}
    >
      {label}
    </button>
  );
}

function CapturePalPortrait({
  pal,
  size,
}: {
  pal: CaptureRatePal;
  size: number;
}) {
  const primaryElement = normalizeElement(pal.elements[0] ?? "Neutral");
  const elementColor = getElementColor(primaryElement);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[26px] border"
      style={{
        width: size,
        height: size,
        borderColor: `${elementColor}55`,
        background: `radial-gradient(circle at 30% 20%, ${elementColor}28, rgba(255, 255, 255, 0.02))`,
      }}
    >
      {pal.image ? (
        <Image
          src={pal.image}
          alt={`${pal.name} portrait`}
          fill
          sizes={`${size}px`}
          className="object-contain p-2"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-2xl font-bold"
          style={{ color: elementColor }}
        >
          {pal.name.slice(0, 1)}
        </div>
      )}
    </div>
  );
}

function formatModifier(value: number) {
  return `${value.toFixed(1)}x`;
}

function getElementColor(element: string) {
  return ELEMENT_COLORS[element as PalElement] ?? "var(--pw-blue)";
}
