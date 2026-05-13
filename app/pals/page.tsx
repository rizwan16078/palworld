import Link from "next/link";
import PalsDirectory from "@/components/PalsDirectory";
import { PALDEX } from "@/lib/paldex";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Palworld Pals Directory & Paldex",
  description:
    "Browse the full Palworld pal directory with real local portraits, rarity, elements, and work suitability.",
  path: "/pals",
  keywords: [
    "Paldex",
    "Pals list",
    "Palworld elements",
    "Pal rarity",
    "work suitability",
  ],
});

export default function PalsPage() {
  const guideCount = PALDEX.filter((pal) => pal.guideId !== null).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Pals Directory",
    description:
      "Browse the full Palworld pal directory with local portraits, rarity, elements, and work suitability.",
    url: `${siteUrl}/pals`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-[var(--pw-text-dim)]">
            <Link href="/" className="transition-colors hover:text-[var(--pw-blue)]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--pw-text-muted)]">Pals</span>
          </nav>

          <PalsDirectory pals={PALDEX} guideCount={guideCount} />

          <section className="mt-12 glass-card-static p-6 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">About the Palworld Paldex</h2>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              This directory contains all {PALDEX.length} confirmed Palworld Pals with
              verified base stats, element typing, rarity tier, and work suitability
              levels. {guideCount} of them have a dedicated breeding guide that walks
              through every parent combination and the shortest breeding chain to
              produce them.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Use the filters above to narrow the list by element, rarity, or work
              suitability. If you are building a mining base, filtering by Mining
              suitability and sorting by suitability level immediately surfaces the
              practical candidates without the noise of unrelated combat Pals. The
              same trick works for kindling, lumbering, watering, and every other
              suitability the game tracks.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Each Pal card links straight into the matching breeding guide so you
              can go from &quot;I want this Pal&quot; to &quot;here is the exact
              parent pair&quot; in two clicks. Rarity here follows the official
              breeding-power bands rather than community guesswork, which is why a
              few Pals are tagged differently than fan wikis classify them.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
              To plan a breeding chain that ends in any Pal on this page, open the{" "}
              <Link
                href="/"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                breeding calculator
              </Link>
              . For ranked recommendations by role, see the{" "}
              <Link
                href="/tier-list"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                tier list
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
