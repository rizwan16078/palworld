import Link from "next/link";
import StructuresDirectory from "@/components/StructuresDirectory";
import { siteUrl } from "@/lib/site";
import { STRUCTURE_CATEGORIES, STRUCTURES } from "@/lib/structures";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Palworld Structures & Base Building Guide",
  description:
    "Browse Palworld structures with local icons, descriptions, build work values, and crafting materials.",
  path: "/structures",
  keywords: [
    "Palworld structures",
    "Palworld base building",
    "crafting materials",
    "build work",
  ],
});

export default function StructuresPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Structures",
    description:
      "Browse Palworld structures with local icons, descriptions, build work values, and crafting materials.",
    url: `${siteUrl}/structures`,
    about: "Palworld structures and build recipes",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Structures", item: `${siteUrl}/structures` },
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
            <span className="text-[var(--pw-text-muted)]">Structures</span>
          </nav>

          <StructuresDirectory entries={STRUCTURES} />

          <section className="mt-12 glass-card-static p-6 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">How to use the Palworld structures directory</h2>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              This directory lists every {STRUCTURES.length} Palworld structure
              currently in the game across {STRUCTURE_CATEGORIES.length} categories,
              with the exact build work value, material costs, and unlock requirements
              for each entry. The data comes directly from the game tables and is
              updated within hours of every patch.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Use the build-work value to plan which Pals you assign to a project. A
              structure with a high build-work requirement will block the construction
              queue at a base with only low-tier handiwork Pals, so it is often faster
              to deploy a single high-suitability Pal than to swarm the site with
              juniors. We list secondary work suitabilities for every Pal in the{" "}
              <Link
                href="/pals"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                Paldex
              </Link>
              .
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Material costs in this directory are the &quot;net cost&quot; — what you
              pay at the workbench. They do not include the upstream costs of farming
              the materials themselves, which can dwarf the direct cost for late-game
              structures that require Ancient Civilization Parts or Polymer. Plan
              accordingly.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
              Pair this page with the{" "}
              <Link
                href="/technology"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                technology tree
              </Link>{" "}
              to confirm unlock requirements, or check the{" "}
              <Link
                href="/tier-list"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                tier list
              </Link>{" "}
              for the best base workers by suitability rank.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
