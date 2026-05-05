"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ELEMENT_COLORS,
  RARITY_COLORS,
  type PalElement,
} from "@/lib/breeding";
import {
  PALDEX_ELEMENTS,
  PALDEX_RARITIES,
  type PaldexEntry,
  type PaldexRarity,
} from "@/lib/paldex";

type PalsDirectoryProps = {
  pals: PaldexEntry[];
  guideCount: number;
};

type ElementFilter = "All" | PalElement;
type RarityFilter = "All" | PaldexRarity;

export default function PalsDirectory({
  pals,
  guideCount,
}: PalsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [elementFilter, setElementFilter] = useState<ElementFilter>("All");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("All");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredPals = pals.filter((pal) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      pal.name.toLowerCase().includes(normalizedQuery) ||
      pal.slug.toLowerCase().includes(normalizedQuery) ||
      String(pal.number).includes(normalizedQuery) ||
      pal.elements.some((element) =>
        element.toLowerCase().includes(normalizedQuery)
      ) ||
      pal.workSuitabilities.some((work) =>
        work.name.toLowerCase().includes(normalizedQuery)
      );

    const matchesElement =
      elementFilter === "All" || pal.elements.includes(elementFilter);
    const matchesRarity =
      rarityFilter === "All" || pal.rarity === rarityFilter;

    return matchesQuery && matchesElement && matchesRarity;
  });

  return (
    <div className="space-y-6">
      <section className="glass-card-static p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--pw-text-dim)]">
                Pal Directory
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="text-gradient">All Palworld Pals</span>
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--pw-text-muted)] sm:text-base">
              Search every pal by name, number, element, or work suitability.
              This page uses your local pal artwork and reference data adapted
              from the Palworld.gg full paldeck.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatTile label="Total Pals" value={String(pals.length)} />
            <StatTile label="Elements" value={String(PALDEX_ELEMENTS.length)} />
            <StatTile label="Guides" value={String(guideCount)} />
          </div>
        </div>
      </section>

      <section className="glass-card-static p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Anubis, #100, Ground, Mining..."
              className="w-full rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text)] outline-none transition-colors placeholder:text-[var(--pw-text-dim)] focus:border-[var(--pw-blue)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
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
                {PALDEX_RARITIES.map((rarity) => (
                  <FilterChip
                    key={rarity}
                    active={rarityFilter === rarity}
                    label={rarity}
                    onClick={() => setRarityFilter(rarity)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                Results
              </p>
              <div className="rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text-muted)]">
                <span className="font-semibold text-[var(--pw-text)]">
                  {filteredPals.length}
                </span>{" "}
                of {pals.length} pals
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
            Element
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={elementFilter === "All"}
              label="All"
              onClick={() => setElementFilter("All")}
            />
            {PALDEX_ELEMENTS.map((element) => (
              <FilterChip
                key={element}
                active={elementFilter === element}
                label={element}
                onClick={() => setElementFilter(element)}
                color={ELEMENT_COLORS[element]}
              />
            ))}
          </div>
        </div>
      </section>

      {filteredPals.length === 0 ? (
        <section className="glass-card-static px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">No pals matched that filter</h2>
          <p className="mt-2 text-sm text-[var(--pw-text-muted)]">
            Try a different name, element, rarity, or work skill.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPals.map((pal) => (
            <PalCard key={`${pal.number}-${pal.slug}`} pal={pal} />
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
        borderColor: active
          ? color ?? "var(--pw-blue)"
          : "var(--pw-border)",
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

function PalCard({ pal }: { pal: PaldexEntry }) {
  const primaryElement = pal.elements[0] ?? "Neutral";
  const secondaryElement = pal.elements[1];
  const primaryColor = ELEMENT_COLORS[primaryElement];
  const rarityColor = RARITY_COLORS[pal.rarity];
  const imageGlow = secondaryElement
    ? `linear-gradient(135deg, ${primaryColor}2A 0%, ${ELEMENT_COLORS[secondaryElement]}22 100%)`
    : `radial-gradient(circle at top, ${primaryColor}28 0%, rgba(255,255,255,0.02) 75%)`;

  return (
    <article className="glass-card overflow-hidden p-4">
      <div className="flex items-start gap-4">
        <div
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border"
          style={{
            background: imageGlow,
            borderColor: `${primaryColor}55`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px ${primaryColor}12`,
          }}
        >
          <Image
            src={pal.image}
            alt={pal.name}
            fill
            sizes="80px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
                #{pal.number}
              </p>
              <h2 className="mt-1 text-lg font-bold leading-tight text-[var(--pw-text)]">
                {pal.name}
              </h2>
            </div>

            <span
              className="shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
              style={{
                borderColor: `${rarityColor}44`,
                background: `${rarityColor}1A`,
                color: rarityColor,
              }}
            >
              {pal.rarity}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {pal.elements.map((element) => (
              <span
                key={element}
                className="rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                style={{
                  background: `${ELEMENT_COLORS[element]}1F`,
                  color: ELEMENT_COLORS[element],
                }}
              >
                {element}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--pw-border)] bg-black/15 p-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--pw-text-dim)]">
          Top Work Suitability
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {pal.workSuitabilities.slice(0, 4).map((work) => (
            <span
              key={`${pal.slug}-${work.name}`}
              className="rounded-full border border-[var(--pw-border)] bg-[var(--pw-surface)] px-2.5 py-1 text-[0.7rem] text-[var(--pw-text-muted)]"
            >
              {work.name} <strong className="text-[var(--pw-text)]">{work.level}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-[var(--pw-text-dim)]">
          Rating {pal.rarityLevel}
        </span>

        {pal.guideId ? (
          <Link
            href={`/breeding/${pal.guideId}`}
            className="rounded-full bg-[var(--pw-blue)]/15 px-3 py-1.5 text-xs font-semibold text-[var(--pw-blue)] transition-colors hover:bg-[var(--pw-blue)]/25"
          >
            Open breeding guide
          </Link>
        ) : (
          <span className="text-xs text-[var(--pw-text-dim)]">
            Guide coming later
          </span>
        )}
      </div>
    </article>
  );
}
