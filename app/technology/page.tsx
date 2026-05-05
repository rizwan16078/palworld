import type { Metadata } from "next";
import Link from "next/link";
import TechnologyTree from "@/components/TechnologyTree";
import { siteUrl } from "@/lib/site";
import { TECHNOLOGY_TREE } from "@/lib/technology";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Browse the full Palworld technology tree with local icons, unlock levels, point costs, and Ancient Technology unlocks.",
  alternates: {
    canonical: `${siteUrl}/technology`,
  },
};

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
            <span className="text-[var(--pw-text-muted)]">Technology</span>
          </nav>

          <TechnologyTree entries={TECHNOLOGY_TREE} />

          <p className="mt-6 text-center text-xs leading-relaxed text-[var(--pw-text-dim)]">
            Reference data adapted from{" "}
            <a
              href="https://palworld.gg/technology-tree"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pw-blue)] hover:underline"
            >
              Palworld.gg&apos;s technology tree
            </a>
            . This local copy includes {TECHNOLOGY_TREE.length} unlocks, with{" "}
            {ancientCount} Ancient Technology entries and icons served from
            `public/technology`.
          </p>
        </div>
      </section>
    </>
  );
}
