"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import {
  TECHNOLOGY_CATEGORIES,
  TECHNOLOGY_MAX_LEVEL,
  type TechnologyCategory,
  type TechnologyEntry,
} from "@/lib/technology";

type TechMode = "all" | "standard" | "ancient";
type CategoryFilter = "All" | TechnologyCategory;

export default function TechnologyTree({
  entries,
}: {
  entries: TechnologyEntry[];
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<TechMode>("all");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        entry.name.toLowerCase().includes(normalizedQuery) ||
        entry.category.toLowerCase().includes(normalizedQuery) ||
        String(entry.level).includes(normalizedQuery);

      const matchesMode =
        mode === "all" ||
        (mode === "ancient" && entry.ancient) ||
        (mode === "standard" && !entry.ancient);

      const matchesCategory =
        category === "All" || entry.category === category;

      return matchesQuery && matchesMode && matchesCategory;
    });
  }, [category, entries, mode, normalizedQuery]);

  const entriesByLevel = useMemo(() => {
    const grouped = new Map<number, TechnologyEntry[]>();

    for (const entry of filteredEntries) {
      const current = grouped.get(entry.level);
      if (current) current.push(entry);
      else grouped.set(entry.level, [entry]);
    }

    return Array.from(grouped.entries()).sort((a, b) => a[0] - b[0]);
  }, [filteredEntries]);

  const standardCount = entries.filter((entry) => !entry.ancient).length;
  const ancientCount = entries.length - standardCount;

  return (
    <div className="space-y-6">
      <section className="glass-card-static p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--pw-text-dim)]">
                Technology Tree
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="text-gradient">Palworld Technology</span>
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--pw-text-muted)] sm:text-base">
              Browse every unlock by level, point cost, and category using the
              local technology art in this project. Standard and Ancient
              Technology unlocks are both included.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatTile label="Unlocks" value={String(entries.length)} />
            <StatTile label="Ancient" value={String(ancientCount)} />
            <StatTile label="Levels" value={String(TECHNOLOGY_MAX_LEVEL)} />
          </div>
        </div>
      </section>

      <section className="glass-card-static p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Sphere, Saddle, Weapon, level 20..."
              className="w-full rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text)] outline-none transition-colors placeholder:text-[var(--pw-text-dim)] focus:border-[var(--pw-blue)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                Tree Type
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={mode === "all"}
                  label={`All (${entries.length})`}
                  onClick={() => setMode("all")}
                />
                <FilterChip
                  active={mode === "standard"}
                  label={`Standard (${standardCount})`}
                  onClick={() => setMode("standard")}
                />
                <FilterChip
                  active={mode === "ancient"}
                  label={`Ancient (${ancientCount})`}
                  onClick={() => setMode("ancient")}
                  tone="ancient"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                Results
              </p>
              <div className="rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text-muted)]">
                <span className="font-semibold text-[var(--pw-text)]">
                  {filteredEntries.length}
                </span>{" "}
                unlocks across{" "}
                <span className="font-semibold text-[var(--pw-text)]">
                  {entriesByLevel.length}
                </span>{" "}
                levels
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={category === "All"}
              label="All"
              onClick={() => setCategory("All")}
            />
            {TECHNOLOGY_CATEGORIES.map((currentCategory) => (
              <FilterChip
                key={currentCategory}
                active={category === currentCategory}
                label={currentCategory}
                onClick={() => setCategory(currentCategory)}
              />
            ))}
          </div>
        </div>
      </section>

      {entriesByLevel.length === 0 ? (
        <section className="glass-card-static px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">No unlocks matched that filter</h2>
          <p className="mt-2 text-sm text-[var(--pw-text-muted)]">
            Try a different name, category, or tree type.
          </p>
        </section>
      ) : (
        <section className="space-y-4">
          {entriesByLevel.map(([level, levelEntries]) => (
            <LevelRow key={level} level={level} entries={levelEntries} />
          ))}
        </section>
      )}
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

function FilterChip({
  active,
  label,
  onClick,
  tone = "default",
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  tone?: "default" | "ancient";
}) {
  const activeColor = tone === "ancient" ? "#FBBF24" : "#4F9CF7";

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all"
      style={{
        borderColor: active ? activeColor : "var(--pw-border)",
        background: active
          ? `${activeColor}22`
          : "rgba(255, 255, 255, 0.04)",
        color: active ? activeColor : "var(--pw-text-muted)",
      }}
    >
      {label}
    </button>
  );
}

function LevelRow({
  level,
  entries,
}: {
  level: number;
  entries: TechnologyEntry[];
}) {
  return (
    <div className="glass-card-static overflow-hidden">
      <div className="border-b border-[var(--pw-border)] px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[var(--pw-blue)]/30 bg-[var(--pw-blue)]/12 px-3 py-2 text-sm font-bold text-[var(--pw-blue)]">
              Level {level}
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
              {entries.length} unlock{entries.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
        {entries.map((entry) => (
          <TechnologyCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function TechnologyCard({ entry }: { entry: TechnologyEntry }) {
  return (
    <article
      className="rounded-2xl border p-3 transition-colors"
      style={{
        borderColor: entry.ancient
          ? "rgba(251, 191, 36, 0.24)"
          : "var(--pw-border)",
        background: entry.ancient
          ? "linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(255, 255, 255, 0.03))"
          : "rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/8 bg-black/20">
          <Image
            src={entry.image}
            alt={entry.name}
            fill
            sizes="64px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="text-sm font-semibold leading-snug text-[var(--pw-text)]">
              {entry.name}
            </h2>
            {entry.ancient && (
              <span className="rounded-full border border-[#FBBF24]/35 bg-[#FBBF24]/14 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#FBBF24]">
                Ancient
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <MetaPill label={entry.category} />
            <MetaPill label={`${entry.cost} pt${entry.cost === 1 ? "" : "s"}`} />
          </div>
        </div>
      </div>
    </article>
  );
}

function MetaPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[var(--pw-border)] bg-[var(--pw-surface)] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--pw-text-muted)]">
      {label}
    </span>
  );
}
