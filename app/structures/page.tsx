import type { Metadata } from "next";
import Link from "next/link";
import StructuresDirectory from "@/components/StructuresDirectory";
import { siteUrl } from "@/lib/site";
import { STRUCTURE_CATEGORIES, STRUCTURES } from "@/lib/structures";

export const metadata: Metadata = {
  title: "Base Building Structures Guide",
  description:
    "Browse Palworld structures with local icons, descriptions, build work values, and crafting materials.",
  alternates: {
    canonical: `${siteUrl}/structures`,
  },
};

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
            <span className="text-[var(--pw-text-muted)]">Structures</span>
          </nav>

          <StructuresDirectory entries={STRUCTURES} />

          <p className="mt-6 text-center text-xs leading-relaxed text-[var(--pw-text-dim)]">
            Reference data adapted from{" "}
            <a
              href="https://palworld.gg/structures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pw-blue)] hover:underline"
            >
              Palworld.gg&apos;s structures page
            </a>
            . This local copy includes {STRUCTURES.length} structures across{" "}
            {STRUCTURE_CATEGORIES.length} categories.
          </p>
        </div>
      </section>
    </>
  );
}
