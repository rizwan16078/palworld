import type { Metadata } from "next";
import Link from "next/link";
import PalAvatar from "@/components/PalAvatar";
import {
  ALL_PALS,
  getPalById,
  findParentsForChild,
  breed,
  ELEMENT_COLORS,
  ELEMENT_EMOJI,
  getRarity,
  RARITY_COLORS,
  type PalElement,
} from "@/lib/breeding";
import { findBreedingChain } from "@/lib/graph";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

// ── Element-specific strategy copy ─────────────────────────────────────────────

const ELEMENT_STRATEGY: Partial<Record<PalElement, string>> = {
  Fire: "pairs naturally with Ice or Grass parents that share a similar power band, since the Fire breeding lines tend to cluster around kindling and ranged combat roles. Avoid Water-aligned partners only if you care about the resulting child's combat matchup; for the breeding math itself, element compatibility is purely cosmetic.",
  Water: "slots well into worker-focused breeding lines that need watering or cooling at base. Water parents tend to have moderate-to-high breeding power, so two Water parents will often overshoot the target — mix one Water parent with a Neutral or low-power donor to land the math correctly.",
  Grass: "is most useful in plantation and lumbering setups, so most breeding projects targeting it will start from worker-heavy parents. Grass parents typically sit in the low-to-mid power band, which gives you plenty of donor flexibility.",
  Electric: "is one of the harder elements to breed cleanly because most Electric Pals carry medium-to-high breeding power. Plan a chain that walks down from a strong Electric parent through a Neutral intermediate rather than forcing two Electric parents together.",
  Ice: "rewards careful parent selection — the Ice element clusters around endgame mounts and cooling workers, so messy passive pools punish you harder here than in other elements. Use a confirmed clean Ice donor whenever possible.",
  Ground: "is the go-to element for mining and excavation breeding lines. Ground parents almost always carry the Mining work suitability, which makes them easy donors to identify in your storage box.",
  Dark: "tends to sit in the higher power bands and is best treated as a multi-step chain rather than a single-pair breed. Many endgame projects pass through a Dark intermediate at some point.",
  Dragon: "is end-of-progression territory. Direct Dragon × Dragon pairs are almost never the optimal route — instead, find a single clean Dragon donor and walk it down through a longer chain so the passive pool stays manageable.",
  Neutral: "is the most flexible building block in any breeding project. Neutral Pals act as power-balancing donors for higher-tier targets, which makes them disproportionately useful relative to how unimpressive they look on paper.",
};

// ── Static Generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return ALL_PALS.map((pal) => ({ pal: pal.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pal: string }>;
}): Promise<Metadata> {
  const { pal: palId } = await params;
  const pal = getPalById(palId);
  if (!pal) return { title: "Pal Not Found" };

  const title = `${pal.name} Breeding Guide — Palworld`;
  const description = `${pal.name} breeding guide for Palworld. Find all ${pal.element} parent combos, breeding power ${pal.power}, and step-by-step breeding chains.`;

  return buildPageMetadata({
    title,
    description,
    path: `/breeding/${palId}`,
    ogType: "article",
    keywords: [
      `${pal.name} breeding`,
      `${pal.name} Palworld`,
      `${pal.element} Pal`,
      `breed ${pal.name}`,
      "breeding chain",
    ],
  });
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function PalBreedingPage({
  params,
}: {
  params: Promise<{ pal: string }>;
}) {
  const { pal: palId } = await params;
  const pal = getPalById(palId);

  if (!pal) {
    return (
      <div className="pt-28 pb-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Pal Not Found</h1>
        <p className="text-[var(--pw-text-muted)] mb-4">
          The requested Pal does not exist.
        </p>
        <Link href="/" className="text-[var(--pw-blue)] hover:underline text-sm">
          ← Back to Calculator
        </Link>
      </div>
    );
  }

  const elementColor = ELEMENT_COLORS[pal.element as PalElement];
  const rarity = getRarity(pal.power);
  const rarityColor = RARITY_COLORS[rarity];
  const combos = findParentsForChild(pal.id);
  const chain = findBreedingChain(pal.id);
  const powerPercent = Math.max(5, Math.min(100, ((1500 - pal.power) / 1500) * 100));

  // Power tier classification for narrative content
  const powerTier =
    pal.power <= 500 ? "low" : pal.power <= 1000 ? "mid" : "high";
  const powerTierLabel =
    powerTier === "low"
      ? "low (under 500)"
      : powerTier === "mid"
      ? "mid (500–1000)"
      : "high (over 1000)";

  const topCombo = combos[0];
  const chainSteps = chain.found ? chain.totalSteps : 0;

  // What this pal can breed with others
  const breedResults = ALL_PALS.slice(0, 10).map((other) => ({
    other,
    result: breed(pal, other),
  }));

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `How to Breed ${pal.name} in Palworld`,
    description: pal.description,
    url: `${siteUrl}/breeding/${pal.id}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/breeding/${pal.id}` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I breed ${pal.name} in Palworld?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `To breed ${pal.name}, you need parent combinations whose average breeding power equals approximately ${pal.power}. There are ${combos.length} possible parent combinations. The most accurate combo is ${combos[0] ? `${combos[0].parentA.name} + ${combos[0].parentB.name}` : "unknown"}.`,
        },
      },
      {
        "@type": "Question",
        name: `What element type is ${pal.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${pal.name} is a ${pal.element}-type Pal with a breeding power of ${pal.power} and ${rarity} rarity.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[var(--pw-text-dim)] mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[var(--pw-blue)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-[var(--pw-blue)] transition-colors">
              Breeding
            </Link>
            <span>/</span>
            <span className="text-[var(--pw-text-muted)]">{pal.name}</span>
          </nav>

          {/* Pal Hero Card */}
          <div className="glass-card-static p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shrink-0"
                style={{
                  background: `radial-gradient(circle, ${elementColor}22 0%, ${elementColor}08 70%)`,
                  border: `2px solid ${elementColor}44`,
                  boxShadow: `0 0 30px ${elementColor}15`,
                }}
              >
                <PalAvatar
                  pal={pal}
                  className="w-20 h-20"
                  sizes="80px"
                  priority
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold">
                    {pal.name}
                  </h1>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                    style={{
                      background: `${rarityColor}18`,
                      color: rarityColor,
                      border: `1px solid ${rarityColor}33`,
                    }}
                  >
                    ★ {rarity}
                  </span>
                </div>

                <span
                  className="element-badge inline-flex mb-3"
                  style={{
                    background: `${elementColor}22`,
                    color: elementColor,
                  }}
                >
                  {ELEMENT_EMOJI[pal.element as PalElement]} {pal.element}
                </span>

                <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
                  {pal.description}
                  {" "}This {pal.element}-type Pal features a breeding power of {pal.power}. 
                  Whether you are looking to breed a powerful combat companion or a hard worker for your base, 
                  understanding the optimal parent combinations is crucial. Below you will find every possible 
                  breeding combination to obtain {pal.name}, as well as the shortest breeding chains connecting 
                  common Pals to this specific target. Use our calculator to explore more possibilities and plan 
                  your ultimate Palworld breeding strategy.
                </p>

                {/* Power bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[var(--pw-text-dim)]">Breeding Power</span>
                    <span className="font-mono font-bold text-[var(--pw-blue)]">
                      {pal.power}
                    </span>
                  </div>
                  <div className="power-bar">
                    <div
                      className="power-bar-fill"
                      style={{ width: `${powerPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Combinations */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-1">
              How to Breed {pal.name}
            </h2>
            <p className="text-sm text-[var(--pw-text-muted)] mb-4">
              {combos.length} parent combinations found. Sorted by breeding
              accuracy.
            </p>

            <div className="space-y-2">
              {combos.slice(0, 15).map((combo, i) => {
                const aColor = ELEMENT_COLORS[combo.parentA.element as PalElement];
                const bColor = ELEMENT_COLORS[combo.parentB.element as PalElement];

                return (
                  <div
                    key={`${combo.parentA.id}-${combo.parentB.id}`}
                    className="glass-card-static p-3 flex items-center gap-2"
                  >
                    <span className="text-xs text-[var(--pw-text-dim)] w-6 text-right font-mono">
                      {i + 1}
                    </span>
                    <div className="flex items-center gap-1.5 flex-1 min-w-0 flex-wrap">
                      <Link
                        href={`/breeding/${combo.parentA.id}`}
                        className="flex items-center gap-1 text-xs font-medium hover:underline"
                        style={{ color: aColor }}
                      >
                        <PalAvatar
                          pal={combo.parentA}
                          className="w-4 h-4 shrink-0"
                          sizes="16px"
                        />
                        {combo.parentA.name}
                      </Link>
                      <span className="text-[var(--pw-yellow)] font-bold text-xs">
                        +
                      </span>
                      <Link
                        href={`/breeding/${combo.parentB.id}`}
                        className="flex items-center gap-1 text-xs font-medium hover:underline"
                        style={{ color: bColor }}
                      >
                        <PalAvatar
                          pal={combo.parentB}
                          className="w-4 h-4 shrink-0"
                          sizes="16px"
                        />
                        {combo.parentB.name}
                      </Link>
                    </div>
                    <span className="text-[0.65rem] text-[var(--pw-text-dim)] font-mono shrink-0">
                      Δ{combo.powerDiff}
                    </span>
                  </div>
                );
              })}
              {combos.length > 15 && (
                <p className="text-xs text-[var(--pw-text-dim)] text-center py-2">
                  +{combos.length - 15} more combinations
                </p>
              )}
            </div>
          </section>

          {/* Breeding Chain */}
          {chain.found && chain.steps.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-1">
                Breeding Chain for {pal.name}
              </h2>
              <p className="text-sm text-[var(--pw-text-muted)] mb-4">
                Shortest path from common Pals ({chain.totalSteps} steps)
              </p>

              <div className="space-y-2">
                {chain.steps.map((step, i) => {
                  const cColor = ELEMENT_COLORS[step.child.element as PalElement];
                  const isLast = i === chain.steps.length - 1;

                  return (
                    <div
                      key={i}
                      className={`glass-card-static p-3 flex items-center gap-3 ${
                        isLast ? "ring-1 ring-[var(--pw-yellow)]" : ""
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          background: isLast ? `${cColor}30` : "var(--pw-surface)",
                          color: isLast ? cColor : "var(--pw-text-muted)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex items-center gap-1.5 flex-1 flex-wrap text-xs">
                        <Link
                          href={`/breeding/${step.parentA.id}`}
                          className="font-medium hover:underline"
                          style={{ color: ELEMENT_COLORS[step.parentA.element as PalElement] }}
                        >
                          {step.parentA.name}
                        </Link>
                        <span className="text-[var(--pw-yellow)] font-bold">+</span>
                        <Link
                          href={`/breeding/${step.parentB.id}`}
                          className="font-medium hover:underline"
                          style={{ color: ELEMENT_COLORS[step.parentB.element as PalElement] }}
                        >
                          {step.parentB.name}
                        </Link>
                        <span className="text-[var(--pw-blue)]">→</span>
                        <span className="font-bold" style={{ color: cColor }}>
                          {step.child.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* What breeding with this Pal produces */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-1">
              Breeding Results with {pal.name}
            </h2>
            <p className="text-sm text-[var(--pw-text-muted)] mb-4">
              What you get when breeding {pal.name} with other Pals
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {breedResults.map(({ other, result }) => (
                <div
                  key={other.id}
                  className="glass-card-static p-3 flex items-center gap-2 text-xs"
                >
                  <span style={{ color: ELEMENT_COLORS[pal.element as PalElement] }}>
                    {pal.name}
                  </span>
                  <span className="text-[var(--pw-yellow)] font-bold">+</span>
                  <Link
                    href={`/breeding/${other.id}`}
                    className="hover:underline"
                    style={{ color: ELEMENT_COLORS[other.element as PalElement] }}
                  >
                    {other.name}
                  </Link>
                  <span className="text-[var(--pw-blue)]">=</span>
                  <Link
                    href={`/breeding/${result.child.id}`}
                    className="font-bold hover:underline"
                    style={{ color: ELEMENT_COLORS[result.child.element as PalElement] }}
                  >
                    {result.child.name}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">
              {pal.name} Breeding FAQ
            </h2>
            <div className="space-y-3">
              <details className="glass-card-static group">
                <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium list-none">
                  <span>How do I breed {pal.name} in Palworld?</span>
                  <svg className="w-4 h-4 text-[var(--pw-text-dim)] group-open:rotate-180 transition-transform duration-200 shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-[var(--pw-text-muted)] leading-relaxed">
                  To breed {pal.name}, place two compatible parent Pals in the
                  Breeding Farm along with a Cake. The parents&apos; average breeding
                  power must be close to {pal.power}. There are {combos.length}{" "}
                  possible parent combinations listed above.
                </div>
              </details>
              <details className="glass-card-static group">
                <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium list-none">
                  <span>What element type is {pal.name}?</span>
                  <svg className="w-4 h-4 text-[var(--pw-text-dim)] group-open:rotate-180 transition-transform duration-200 shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-[var(--pw-text-muted)] leading-relaxed">
                  {pal.name} is a {pal.element}-type Pal with {rarity} rarity
                  and a breeding power of {pal.power}. {pal.description}
                </div>
              </details>
            </div>
          </section>

          {/* Long-form strategy & narrative content for SEO and player value */}
          <section className="mb-8 glass-card-static p-6 sm:p-8">
            <h2 className="text-lg font-bold mb-3">
              {pal.name} Breeding Strategy
            </h2>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              {pal.name} sits in the {powerTierLabel} breeding-power band at exactly{" "}
              <strong className="text-white">{pal.power}</strong>, which makes it a{" "}
              {powerTier === "low"
                ? "great early-game target you can usually pull off with two readily available parents and a single cake. Because the breeding pool is wide at this band, you can afford to optimise for passives rather than species selection — pick parents whose passive pool is already clean rather than chasing the absolute closest power match."
                : powerTier === "mid"
                ? "mid-game project that rewards planning. There are usually multiple viable parent pairs at this band, so the question is rarely whether you can breed it but how efficiently you can layer the passives you want. Use the parent list above as a starting point and treat any messy donor as a separate clean-up project before committing to the final breed."
                : "high-tier breeding project. Direct parent combinations exist but they are rarely your fastest route — most players will get a better result by walking the breeding chain shown above one step at a time, isolating one passive per generation, and keeping the donor side as clean as possible. Cakes burn fast at this tier, so the cheapest path is the one with the fewest wasted eggs, not the one with the fanciest parents."}
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              As a {pal.element}-type Pal, {pal.name}{" "}
              {ELEMENT_STRATEGY[pal.element as PalElement] ??
                "fits most parent line-ups without elemental conflict, which makes it a flexible building block in longer breeding projects."}{" "}
              You can mix any two parents regardless of element — Palworld does not restrict cross-element breeding — but matching elements on at least one parent makes the resulting line easier to track when you are juggling several breeding boxes at once.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              {combos.length > 0 ? (
                <>
                  This guide lists{" "}
                  <strong className="text-white">{combos.length}</strong> verified
                  parent combination{combos.length === 1 ? "" : "s"} that produce {pal.name}.
                  The closest match in pure breeding-power terms is{" "}
                  {topCombo ? (
                    <strong className="text-white">
                      {topCombo.parentA.name} + {topCombo.parentB.name}
                    </strong>
                  ) : (
                    "shown above"
                  )}
                  , but &quot;closest&quot; is not always &quot;best&quot;. If the perfect-math pair drags four random passives into the egg, a slightly looser pair with cleaner parents will out-perform it every single time. Open the{" "}
                  <Link href="/" className="text-[var(--pw-blue)] hover:underline">
                    breeding calculator
                  </Link>{" "}
                  if you want to test alternative pairs against parents you already own.
                </>
              ) : (
                <>
                  {pal.name} is a special-case Pal with no standard parent combinations in the calculator&apos;s dataset. It is typically obtained through wild capture, alpha encounters, or specific quest rewards rather than the breeding farm. Check the{" "}
                  <Link href="/pals" className="text-[var(--pw-blue)] hover:underline">
                    Paldex
                  </Link>{" "}
                  for spawn locations.
                </>
              )}
            </p>
            {chainSteps > 0 ? (
              <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
                The shortest breeding chain to {pal.name} is{" "}
                <strong className="text-white">{chainSteps} step{chainSteps === 1 ? "" : "s"}</strong> from common starter Pals. Walking the chain instead of forcing the final breed has two real advantages: each intermediate child is also a usable Pal you can deploy or sell, and you can clean the passive pool one generation at a time instead of inheriting a messy stew from two unrelated parents. Players who skip the chain and brute-force the final pair almost always burn more cakes overall.
              </p>
            ) : null}
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
              When you are ready to commit, prepare a stock of cakes ahead of the breeding session — the Palworld breeding farm consumes one cake per attempted egg, and a long chain can chew through twenty or thirty before the final {pal.name} hatches. Pair this guide with our{" "}
              <Link href="/blog/how-to-calculate-passive-probabilities" className="text-[var(--pw-blue)] hover:underline">
                passive inheritance guide
              </Link>{" "}
              if you care about which passives land on the final child, and our{" "}
              <Link href="/blog/how-to-organize-breeding-boxes-palworld" className="text-[var(--pw-blue)] hover:underline">
                breeding box organisation guide
              </Link>{" "}
              if your roster is getting unmanageable.
            </p>
          </section>

          {/* Internal links — Related Pals */}
          <section>
            <h2 className="text-lg font-bold mb-4">Related Pals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_PALS.filter((p) => p.id !== pal.id)
                .sort(
                  (a, b) =>
                    Math.abs(a.power - pal.power) -
                    Math.abs(b.power - pal.power)
                )
                .slice(0, 8)
                .map((related) => (
                  <Link
                    key={related.id}
                    href={`/breeding/${related.id}`}
                    className="glass-card p-3 flex flex-col items-center gap-1.5 text-center hover:-translate-y-1 transition-all duration-200"
                  >
                    <PalAvatar
                      pal={related}
                      className="w-12 h-12"
                      sizes="48px"
                    />
                    <span className="text-xs font-semibold">{related.name}</span>
                    <span
                      className="text-[0.6rem]"
                      style={{
                        color:
                          ELEMENT_COLORS[related.element as PalElement],
                      }}
                    >
                      {related.element}
                    </span>
                  </Link>
                ))}
            </div>
          </section>

          {/* Back to calculator */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--pw-blue)]/15 text-[var(--pw-blue)] text-sm font-medium hover:bg-[var(--pw-blue)]/25 transition-colors"
            >
              ← Back to Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
