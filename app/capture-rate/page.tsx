import type { Metadata } from "next";
import Link from "next/link";
import CaptureRateCalculator from "@/components/CaptureRateCalculator";
import { CAPTURE_RATE_PALS, CAPTURE_RATE_SPHERES } from "@/lib/capture-rate";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capture Rate",
  description:
    "Calculate Palworld capture odds with local pal portraits, sphere icons, boss modifiers, HP tuning, and every sphere tier.",
  alternates: {
    canonical: `${siteUrl}/capture-rate`,
  },
};

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

          <p className="mt-6 text-center text-xs leading-relaxed text-[var(--pw-text-dim)]">
            Reference data adapted from{" "}
            <a
              href="https://palworld.gg/capture-rate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pw-blue)] hover:underline"
            >
              Palworld.gg&apos;s capture rate calculator
            </a>
            . This local version includes {CAPTURE_RATE_PALS.length} pals and{" "}
            {CAPTURE_RATE_SPHERES.length} sphere tiers using the assets in
            `public/pal` and `public/technology`.
          </p>
        </div>
      </section>
    </>
  );
}
