import Link from "next/link";
import TierListExplorer from "@/components/TierListExplorer";
import { TIER_LIST_CATEGORIES } from "@/lib/tier-list";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Palworld Tier List — Best Pals for Combat & Work",
  description:
    "Browse Palworld tier lists for best overall pals, workers, flying mounts, ground mounts, and combat picks.",
  path: "/tier-list",
  keywords: [
    "Palworld tier list",
    "best Pals",
    "flying mount tier",
    "Palworld workers",
    "combat Pals",
  ],
});

export default function TierListPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Tier List",
    description:
      "Browse Palworld tier lists for best overall pals, workers, flying mounts, ground mounts, and combat picks.",
    url: `${siteUrl}/tier-list`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tier List", item: `${siteUrl}/tier-list` },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
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

          <section className="mt-12 glass-card-static p-6 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">How we rank Palworld Pals</h2>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Every Pal in this list is scored against the role we placed it in, not
              against the whole roster at once. A Pal that is S-tier as a flying mount
              might be C-tier as a base worker, so we publish category-specific lists
              instead of one combined ranking. The {totalPals} Pals on this page are
              split across overall power, base workers, combat damage, flying mounts,
              and ground mounts, and each ranking weights different stats.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              For combat tiers, we weight raw damage output, the Pal&apos;s active
              skill kit, and survivability under boss-tier pressure. For base workers,
              we weight work suitability levels, secondary suitabilities, movement
              speed inside the base, and stamina under sustained workload. Mount tiers
              prioritise travel speed and stamina pool over flashy combat numbers.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              We do not chase Twitch meta or YouTube hot takes. The tier rankings only
              move when a balance patch ships, when a previously overlooked Pal turns
              out to be quietly excellent after deeper testing, or when a new Pal
              enters the game. If you disagree with a placement, we genuinely want the
              feedback — every category has a comment thread linked from the explorer
              and we read all of them.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
              For breeding strategies that pair with this tier list, browse our{" "}
              <Link
                href="/blog"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                Palworld guides
              </Link>{" "}
              or open the{" "}
              <Link
                href="/"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                breeding calculator
              </Link>{" "}
              to plan the parent chain for any Pal on this page.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
