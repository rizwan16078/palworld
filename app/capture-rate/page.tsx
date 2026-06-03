import Link from "next/link";
import CaptureRateCalculator from "@/components/CaptureRateCalculator";
import { CAPTURE_RATE_PALS, CAPTURE_RATE_SPHERES } from "@/lib/capture-rate";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Palworld Capture Rate Calculator",
  description:
    "Calculate Palworld capture odds with local pal portraits, sphere icons, boss modifiers, HP tuning, and every sphere tier.",
  path: "/capture-rate",
  keywords: [
    "capture rate",
    "Palworld capture calculator",
    "Pal Sphere",
    "boss capture",
    "Palworld HP",
  ],
});

export default function CaptureRatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Palworld Capture Rate Calculator",
    description:
      "Calculate Palworld capture odds with local pal portraits, sphere icons, boss modifiers, HP tuning, and every sphere tier.",
    url: `${siteUrl}/capture-rate`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Capture Rate", item: `${siteUrl}/capture-rate` },
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
            <Link
              href="/"
              className="transition-colors hover:text-[var(--pw-blue)]"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--pw-text-muted)]">Capture Rate</span>
          </nav>

          <CaptureRateCalculator />

          <section className="mt-12 glass-card-static p-6 sm:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">How Palworld capture rates work</h2>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              Every Pal in Palworld has a base capture rate that the game uses
              alongside its current HP, the sphere thrown, and a handful of
              situational modifiers to produce the final throw odds. The calculator
              above replicates the in-game formula across all {CAPTURE_RATE_PALS.length}{" "}
              recorded Pals and all {CAPTURE_RATE_SPHERES.length} sphere tiers, so you
              can compare options before you waste a Hyper Sphere on a 4&#37; chance.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              HP weighting is the biggest single lever. Hitting a Pal to roughly a
              third of its maximum HP nearly doubles the base rate compared to throwing
              at full HP, and triggering its sleep, frozen, or burning status applies a
              further bonus on top. Throw direction matters too — a sphere that lands
              on the Pal&apos;s back applies the stronger of two back-bonus
              multipliers, which is why the tool exposes a toggle for that case.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed mb-4">
              For Alpha and boss Pals the calculation is the same formula but with a
              capture penalty layered on top. Even a Legendary Sphere will not push the
              odds above the boss cap, which is why bringing a softening attack
              loadout and aiming for low-HP back-throws is the difference between a
              one-attempt capture and grinding the encounter for thirty minutes.
            </p>
            <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
              If you have already captured a target and want to plan its breeding line,
              jump to the{" "}
              <Link
                href="/"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                breeding calculator
              </Link>{" "}
              or browse the matching breeding guide from the{" "}
              <Link
                href="/pals"
                className="text-[var(--pw-blue)] hover:underline font-medium"
              >
                Paldex
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
