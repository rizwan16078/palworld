import Link from "next/link";
import TechnologyTree from "@/components/TechnologyTree";
import { siteUrl } from "@/lib/site";
import { TECHNOLOGY_TREE } from "@/lib/technology";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Palworld Technology Tree & Unlocks Guide",
  description:
    "Browse the full Palworld technology tree with local icons, unlock levels, point costs, and Ancient Technology unlocks.",
  path: "/technology",
  keywords: [
    "Palworld technology tree",
    "Ancient Technology",
    "Palworld unlocks",
    "tech points",
  ],
});

export default function TechnologyPage() {
  const ancientCount = TECHNOLOGY_TREE.filter((entry) => entry.ancient).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Technology Tree",
    description:
      "Browse the full Palworld technology tree with local icons, unlock levels, point costs, and Ancient Technology unlocks.",
    url: `${siteUrl}/technology`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Technology", item: `${siteUrl}/technology` },
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
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-[var(--pw-text-dim)]">
            <Link href="/" className="transition-colors hover:text-[var(--pw-blue)]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--pw-text-muted)]">Technology</span>
          </nav>

          <TechnologyTree entries={TECHNOLOGY_TREE} />

          <section className="mt-12 glass-card-static p-6 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Planning your Palworld technology unlocks</h2>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              The Palworld technology tree splits into two parallel tracks: regular
              tech, unlocked with Technology Points earned from levelling up, and
              Ancient Technology, unlocked with Ancient Technology Points dropped only
              by Alpha and Tower bosses. This page lists all {TECHNOLOGY_TREE.length}{" "}
              entries currently in the game, of which{" "}
              <strong className="text-white">{ancientCount}</strong> require the
              Ancient track.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Because Ancient Technology Points are gated by boss fights, your unlock
              order genuinely matters. Spending an early Ancient Point on a cosmetic
              decoration locks you out of a real progression upgrade for hours. We
              recommend prioritising the high-impact ancient unlocks first — usually
              one upgraded sphere tier and one logistics upgrade — and saving the rest
              until you have a comfortable point surplus.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              For regular tech, the practical question is rarely whether to unlock a
              tier but when. Many mid-tier crafting stations get replaced within a few
              levels, so spending Technology Points on a transitional tool is rarely
              worth it if you are close to the next tier. The level column above is
              the easiest way to spot that pattern.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
              Once you have an unlock in mind, jump to the{" "}
              <Link
                href="/structures"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                structures directory
              </Link>{" "}
              to see exactly what the recipe will cost in materials, or check the{" "}
              <Link
                href="/tier-list"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                base workers tier list
              </Link>{" "}
              for the Pals best suited to the new station.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
