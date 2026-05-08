"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TIER_COLORS,
  TIER_LIST_CATEGORIES,
  getPrimaryElementColor,
  type TierListCategoryId,
  type TierListEntry,
} from "@/lib/tier-list";

const CATEGORY_ORDER: TierListCategoryId[] = [
  "overall",
  "workers",
  "flying",
  "ground",
  "combat",
];

const CATEGORY_ACCENTS: Record<TierListCategoryId, string> = {
  overall: "var(--pw-yellow)",
  workers: "#78e08f",
  flying: "#7dd3fc",
  ground: "#f59e0b",
  combat: "#fb7185",
};

const CATEGORY_ICONS: Record<TierListCategoryId, string | null> = {
  overall: "/technology/T_itemicon_PalSphere_Legend.png",
  workers: "/icons/T_icon_palwork_04.png",
  flying: "/technology/T_itemicon_PalSphere_Tera.png",
  ground: "/technology/T_itemicon_PalSphere_Mega.png",
  combat: "/technology/T_itemicon_PalSphere_Ultimate.png",
};

export default function TierListExplorer() {
  const [activeCategoryId, setActiveCategoryId] =
    useState<TierListCategoryId>("overall");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const activeCategory =
    TIER_LIST_CATEGORIES.find((category) => category.id === activeCategoryId) ??
    TIER_LIST_CATEGORIES[0];

  const filteredTiers = activeCategory.tiers.map((tier) => ({
    ...tier,
    pals: tier.pals.filter((pal) => matchesQuery(pal, normalizedQuery)),
  }));

  const visibleCount = filteredTiers.reduce(
    (total, tier) => total + tier.pals.length,
    0
  );

  return (
    <div className="space-y-6">
      <section className="glass-card-static overflow-hidden">
        <div className="border-b border-[var(--pw-border)] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--pw-text-dim)]">
                  Tier List
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <span className="text-gradient">Palworld Tier Rankings</span>
                </h1>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--pw-text-muted)] sm:text-base">
                Browse best overall pals, workers, flying mounts, ground mounts,
                and combat picks in one local page with your project&apos;s own
                portraits and work icons.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <StatTile
                label="Categories"
                value={String(TIER_LIST_CATEGORIES.length)}
              />
              <StatTile
                label="Active Tier"
                value={String(
                  activeCategory.tiers.find((tier) => tier.tier === "S")?.pals
                    .length ?? 0
                )}
              />
              <StatTile
                label="Visible"
                value={`${visibleCount}/${activeCategory.totalPals}`}
              />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {CATEGORY_ORDER.map((categoryId) => {
              const category = TIER_LIST_CATEGORIES.find(
                (entry) => entry.id === categoryId
              );

              if (!category) {
                return null;
              }

              const active = category.id === activeCategory.id;
              const accent = CATEGORY_ACCENTS[category.id];
              const icon = CATEGORY_ICONS[category.id];

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategoryId(category.id)}
                  className="rounded-2xl border p-4 text-left transition-all"
                  style={{
                    borderColor: active ? `${accent}` : "var(--pw-border)",
                    background: active
                      ? `${accent}18`
                      : "rgba(255, 255, 255, 0.04)",
                    boxShadow: active
                      ? `0 0 0 1px ${accent}22`
                      : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div
                        className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                        style={{
                          color: active ? accent : "var(--pw-text-dim)",
                        }}
                      >
                        {category.label}
                      </div>
                      <div className="mt-2 text-2xl font-bold text-[var(--pw-text)]">
                        {category.totalPals}
                      </div>
                    </div>
                    {icon ? (
                      <div className="relative h-10 w-10 shrink-0 rounded-2xl border border-white/10 bg-black/10">
                        <Image
                          src={icon}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-contain p-2"
                        />
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--pw-text-muted)]">
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="glass-card-static p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: CATEGORY_ACCENTS[activeCategory.id] }}
            >
              {activeCategory.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{activeCategory.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--pw-text-muted)]">
              {activeCategory.description}
            </p>
          </div>

          <label className="block lg:min-w-[280px]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
              Search This Category
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Anubis, Mining, Dragon, 1700..."
              className="w-full rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] px-4 py-3 text-sm text-[var(--pw-text)] outline-none transition-colors placeholder:text-[var(--pw-text-dim)] focus:border-[var(--pw-blue)]"
            />
          </label>
        </div>
      </section>

      {visibleCount === 0 ? (
        <section className="glass-card-static px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">No pals matched that search</h2>
          <p className="mt-2 text-sm text-[var(--pw-text-muted)]">
            Try a different pal name, element, work skill, or speed value.
          </p>
        </section>
      ) : (
        filteredTiers.map((tier) =>
          tier.pals.length > 0 ? (
            <TierSection
              key={`${activeCategory.id}-${tier.tier}`}
              tier={tier.tier}
              pals={tier.pals}
              categoryId={activeCategory.id}
            />
          ) : null
        )
      )}
    </div>
  );
}

function TierSection({
  tier,
  pals,
  categoryId,
}: {
  tier: keyof typeof TIER_COLORS;
  pals: TierListEntry[];
  categoryId: TierListCategoryId;
}) {
  const colors = TIER_COLORS[tier];

  return (
    <section className="glass-card-static overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div
          className="flex items-center justify-center px-6 py-5 lg:w-28"
          style={{ background: colors.bg, color: colors.text }}
        >
          <div className="text-center">
            <div className="text-4xl font-black leading-none">{tier}</div>
            <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
              Tier
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[rgba(0,19,31,0.5)] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[var(--pw-text)]">
              {pals.length} {pals.length === 1 ? "Pal" : "Pals"}
            </h3>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--pw-text-dim)]">
              {categoryId === "workers"
                ? "Base Utility"
                : categoryId === "flying" || categoryId === "ground"
                  ? "Mount Speed"
                  : "Battle Value"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {pals.map((pal) => (
              <TierCard key={`${tier}-${pal.slug}`} pal={pal} categoryId={categoryId} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  pal,
  categoryId,
}: {
  pal: TierListEntry;
  categoryId: TierListCategoryId;
}) {
  const elementColor = getPrimaryElementColor(pal.elements);

  return (
    <article
      className="group rounded-2xl border border-[var(--pw-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3 transition-all hover:-translate-y-0.5 hover:border-[var(--pw-border-hover)]"
      style={{
        boxShadow: `0 8px 24px ${elementColor}14`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border"
          style={{
            borderColor: `${elementColor}55`,
            background: `radial-gradient(circle at 30% 20%, ${elementColor}22, rgba(255,255,255,0.03))`,
          }}
        >
          {pal.image ? (
            <Image
              src={pal.image}
              alt={`${pal.name} portrait`}
              fill
              sizes="64px"
              className="object-contain p-2"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-xl font-bold"
              style={{ color: elementColor }}
            >
              {pal.name.slice(0, 1)}
            </div>
          )}
        </div>

        {pal.speed ? (
          <span className="rounded-full bg-[var(--pw-blue)]/12 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--pw-blue)]">
            {pal.speed}
          </span>
        ) : pal.rarity ? (
          <span className="rounded-full bg-white/6 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--pw-text-muted)]">
            {pal.rarity}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <h4 className="line-clamp-2 text-sm font-bold text-[var(--pw-text)]">
          {pal.name}
        </h4>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {pal.elements.slice(0, 2).map((element) => {
            const chipColor = getPrimaryElementColor([element]);

            return (
              <span
                key={`${pal.slug}-${element}`}
                className="rounded-full px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em]"
                style={{
                  background: `${chipColor}22`,
                  color: chipColor,
                }}
              >
                {element}
              </span>
            );
          })}
        </div>
      </div>

      {categoryId === "workers" ? (
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {pal.workSuitabilities.slice(0, 4).map((work) => (
            <div
              key={`${pal.slug}-${work.name}`}
              className="flex items-center gap-1.5 rounded-xl border border-[var(--pw-border)] bg-black/10 px-2 py-1.5"
            >
              {work.icon ? (
                <Image
                  src={work.icon}
                  alt={work.name}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              ) : null}
              <span className="truncate text-[0.62rem] font-semibold text-[var(--pw-text-muted)]">
                {work.name}
              </span>
              <span className="ml-auto text-[0.7rem] font-bold text-[var(--pw-text)]">
                {work.level}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        {pal.guideHref ? (
          <Link
            href={pal.guideHref}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-blue)] transition-colors hover:text-white"
          >
            View Guide
          </Link>
        ) : (
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--pw-text-dim)]">
            Local Ranking
          </span>
        )}

        <span className="text-[0.7rem] text-[var(--pw-text-dim)]">
          {pal.slug}
        </span>
      </div>
    </article>
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

function matchesQuery(pal: TierListEntry, query: string) {
  if (!query) {
    return true;
  }

  return (
    pal.name.toLowerCase().includes(query) ||
    pal.slug.toLowerCase().includes(query) ||
    pal.elements.some((element) => element.toLowerCase().includes(query)) ||
    (pal.speed ? pal.speed.toLowerCase().includes(query) : false) ||
    pal.workSuitabilities.some((work) =>
      work.name.toLowerCase().includes(query)
    ) ||
    (pal.rarity ? pal.rarity.toLowerCase().includes(query) : false)
  );
}
