import type { Metadata } from "next";
import Link from "next/link";
import TierListExplorer from "@/components/TierListExplorer";
import { TIER_LIST_CATEGORIES } from "@/lib/tier-list";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Best Pals Tier List for Combat & Work",
  description:
    "Browse Palworld tier lists for best overall pals, workers, flying mounts, ground mounts, and combat picks.",
  alternates: {
    canonical: `${siteUrl}/tier-list`,
  },
};

export default function TierListPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Tier List",
    description:
      "Browse Palworld tier lists for best overall pals, workers, flying mounts, ground mounts, and combat picks.",
    url: `${siteUrl}/tier-list`,
  };

  const totalPals = TIER_LIST_CATEGORIES.reduce(
    (total, category) => total + category.totalPals,
    0
  );

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
            <Link
              href="/"
              className="transition-colors hover:text-[var(--pw-blue)]"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--pw-text-muted)]">Tier List</span>
          </nav>

          <TierListExplorer />

          <p className="mt-6 text-center text-xs leading-relaxed text-[var(--pw-text-dim)]">
            Reference data adapted from{" "}
            <a
              href="https://palworld.gg/tier-list"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pw-blue)] hover:underline"
            >
              Palworld.gg&apos;s tier list pages
            </a>
            . This local version includes {TIER_LIST_CATEGORIES.length} ranking
            categories and {totalPals} ranked entries using your project&apos;s
            pal portraits plus the work icons in `public/icons`.
          </p>
        </div>
      </section>
    </>
  );
}
