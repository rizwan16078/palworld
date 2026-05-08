"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import {
  STRUCTURE_CATEGORIES,
  STRUCTURES_MAX_BUILD_WORK,
  STRUCTURES_WITH_LOCAL_ICONS,
  type StructureEntry,
  type StructureMaterial,
} from "@/lib/structures";

type StructureCategoryFilter = "All" | (typeof STRUCTURE_CATEGORIES)[number];

export default function StructuresDirectory({
  entries,
}: {
  entries: StructureEntry[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<StructureCategoryFilter>("All");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        entry.name.toLowerCase().includes(normalizedQuery) ||
        entry.type.toLowerCase().includes(normalizedQuery) ||
        entry.description.toLowerCase().includes(normalizedQuery) ||
        entry.materials.some(
          (material) =>
            material.name.toLowerCase().includes(normalizedQuery) ||
            material.amountText.toLowerCase().includes(normalizedQuery)
        );

      const matchesCategory =
        category === "All" || entry.type === category;

      return matchesQuery && matchesCategory;
    });
  }, [category, entries, normalizedQuery]);

  const groupedEntries = useMemo(() => {
    const grouped = new Map<string, StructureEntry[]>();

    for (const entry of filteredEntries) {
      const current = grouped.get(entry.type);
      if (current) {
        current.push(entry);
      } else {
        grouped.set(entry.type, [entry]);
      }
    }

    return Array.from(grouped.entries()).map(([type, typeEntries]) => ({
      type,
      entries: typeEntries.sort((left, right) => left.order - right.order),
    }));
  }, [filteredEntries]);

  return (
    <div className="space-y-6">
      <section className="glass-card-static overflow-hidden">
        <div className="border-b border-[var(--pw-border)] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--pw-text-dim)]">
                  Structures
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <span className="text-gradient">
                    Palworld Structures Directory
                  </span>
                </h1>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--pw-text-muted)] sm:text-base">
                Browse buildable structures, categories, build work values, and
                crafting materials in one local reference page using the icons
                from this project&apos;s `public/structure` and
                `public/technology` folders.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <StatTile label="Structures" value={String(entries.length)} />
              <StatTile
                label="Categories"
                value={String(STRUCTURE_CATEGORIES.length)}
              />
              <StatTile
                label="Local Icons"
                value={`${STRUCTURES_WITH_LOCAL_ICONS}/${entries.length}`}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
              Search Structures
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Campfire, Foundation, Pal Fluids, 10000..."
              className="w-full rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text)] outline-none transition-colors placeholder:text-[var(--pw-text-dim)] focus:border-[var(--pw-blue)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3">
              <div className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--pw-text-dim)]">
                Visible Results
              </div>
              <div className="mt-2 text-2xl font-bold text-[var(--pw-text)]">
                {filteredEntries.length}
              </div>
              <p className="mt-1 text-xs text-[var(--pw-text-muted)]">
                Matching entries across {groupedEntries.length} categories.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3">
              <div className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--pw-text-dim)]">
                Highest Build Work
              </div>
              <div className="mt-2 text-2xl font-bold text-[var(--pw-text)]">
                {formatNumber(STRUCTURES_MAX_BUILD_WORK)}
              </div>
              <p className="mt-1 text-xs text-[var(--pw-text-muted)]">
                Useful for comparing simple decor with late-game production.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--pw-border)] px-4 py-4 sm:px-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <CategoryChip
              active={category === "All"}
              label={`All (${entries.length})`}
              onClick={() => setCategory("All")}
            />
            {STRUCTURE_CATEGORIES.map((currentCategory) => {
              const count = entries.filter(
                (entry) => entry.type === currentCategory
              ).length;

              return (
                <CategoryChip
                  key={currentCategory}
                  active={category === currentCategory}
                  label={`${currentCategory} (${count})`}
                  onClick={() => setCategory(currentCategory)}
                  accent={getCategoryAccent(currentCategory)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {groupedEntries.length === 0 ? (
        <section className="glass-card-static px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">
            No structures matched that filter
          </h2>
          <p className="mt-2 text-sm text-[var(--pw-text-muted)]">
            Try a different structure name, type, or material.
          </p>
        </section>
      ) : (
        groupedEntries.map((group) => (
          <StructureSection
            key={group.type}
            type={group.type}
            entries={group.entries}
          />
        ))
      )}
    </div>
  );
}

function StructureSection({
  type,
  entries,
}: {
  type: string;
  entries: StructureEntry[];
}) {
  const accent = getCategoryAccent(type);

  return (
    <section className="glass-card-static overflow-hidden">
      <div className="border-b border-[var(--pw-border)] px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              Structure Type
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--pw-text)]">
              {type}
            </h2>
          </div>
          <div
            className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
            style={{
              borderColor: `${accent}44`,
              color: accent,
              background: `${accent}14`,
            }}
          >
            {entries.length} {entries.length === 1 ? "Entry" : "Entries"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-2">
        {entries.map((entry) => (
          <StructureCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function StructureCard({ entry }: { entry: StructureEntry }) {
  const accent = getCategoryAccent(entry.type);

  return (
    <article className="rounded-3xl border border-[var(--pw-border)] bg-[rgba(255,255,255,0.03)] p-4">
      <div className="flex items-start gap-4">
        <div
          className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-3xl border"
          style={{
            borderColor: `${accent}33`,
            background: `${accent}14`,
          }}
        >
          {entry.image ? (
            <Image
              src={entry.image}
              alt={entry.name}
              fill
              sizes="72px"
              unoptimized
              className="object-contain p-3"
            />
          ) : (
            <AssetFallback label={entry.name} accent={accent} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-2">
            <h3 className="text-lg font-semibold leading-tight text-[var(--pw-text)]">
              {entry.name}
            </h3>
            <span
              className="rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
              style={{
                borderColor: `${accent}33`,
                color: accent,
                background: `${accent}10`,
              }}
            >
              {entry.type}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-[var(--pw-text-muted)]">
            {entry.description || "No description available for this structure."}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <InfoPill label="Build Work" value={formatNumber(entry.buildWork)} />
            <InfoPill
              label="Materials"
              value={String(entry.materials.length)}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-[var(--pw-border)] pt-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
          Recipe
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {entry.materials.map((material) => (
            <MaterialRow
              key={`${entry.id}-${material.id}`}
              material={material}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function MaterialRow({
  material,
  accent,
}: {
  material: StructureMaterial;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-3 py-2.5">
      <div
        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${accent}22`,
          background: `${accent}10`,
        }}
      >
        {material.image ? (
          <Image
            src={material.image}
            alt={material.name}
            fill
            sizes="40px"
            unoptimized
            className="object-contain p-2"
          />
        ) : (
          <AssetFallback label={material.name} accent={accent} compact />
        )}
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-[var(--pw-text)]">
          {material.name}
        </div>
        <div className="text-xs text-[var(--pw-text-muted)]">
          {material.amountText}
        </div>
      </div>
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

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full border border-[var(--pw-border)] bg-[var(--pw-surface)] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--pw-text-muted)]">
      {label}:{" "}
      <span className="font-semibold text-[var(--pw-text)]">{value}</span>
    </span>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
  accent = "var(--pw-blue)",
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all"
      style={{
        borderColor: active ? accent : "var(--pw-border)",
        background: active ? `${accent}22` : "rgba(255, 255, 255, 0.04)",
        color: active ? accent : "var(--pw-text-muted)",
      }}
    >
      {label}
    </button>
  );
}

function AssetFallback({
  label,
  accent,
  compact = false,
}: {
  label: string;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span
        className={compact ? "text-xs font-bold" : "text-lg font-black"}
        style={{ color: accent }}
      >
        {label.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function getCategoryAccent(category: string) {
  switch (category) {
    case "Foundation":
      return "#94A3B8";
    case "Infrastructure":
      return "#22C55E";
    case "Furniture":
      return "#F59E0B";
    case "Storage":
      return "#2DD4BF";
    case "Defense":
      return "#FB7185";
    case "Pals":
      return "#60A5FA";
    case "Product":
      return "#F97316";
    case "Food":
      return "#84CC16";
    case "Light":
      return "#FACC15";
    default:
      return "var(--pw-blue)";
  }
}

function formatNumber(value: number | null) {
  return value === null ? "N/A" : new Intl.NumberFormat("en-US").format(value);
}
