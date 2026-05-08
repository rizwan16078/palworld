import type { Metadata } from "next";
import Link from "next/link";
import PalsDirectory from "@/components/PalsDirectory";
import { PALDEX } from "@/lib/paldex";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Pals Directory",
  description:
    "Browse the full Palworld pal directory with real local portraits, rarity, elements, and work suitability.",
  alternates: {
    canonical: `${siteUrl}/pals`,
    languages: {
      'en': `${siteUrl}/pals`,
      'x-default': `${siteUrl}/pals`,
    },
  },
};

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

          <p className="mt-6 text-center text-xs leading-relaxed text-[var(--pw-text-dim)]">
            Reference data adapted from{" "}
            <a
              href="https://palworld.gg/pals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pw-blue)] hover:underline"
            >
              Palworld.gg&apos;s full paldeck
            </a>
            . Portraits use the local pal assets already in this project.
          </p>
        </div>
      </section>
    </>
  );
}
