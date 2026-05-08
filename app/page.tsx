import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CalculatorCard from "@/components/CalculatorCard";
import PalAvatar from "@/components/PalAvatar";
import {
  ALL_PALS,
  ELEMENT_COLORS,
  getRarity,
  RARITY_COLORS,
  type PalElement,
} from "@/lib/breeding";
import { siteUrl, siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PalBreeder — Palworld Breeding Calculator",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    description:
      "The fastest Palworld breeding calculator. Breed any two Pals, find parent combinations, and discover optimal breeding chains.",
    url: siteUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Palworld breeding work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Palworld, breeding combines two parent Pals to produce an offspring. The child is determined by averaging the parents' breeding power values and finding the Pal closest to that average.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best breeding calculator for Palworld?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PalBreeder is the fastest Palworld breeding calculator, offering instant results for breeding two Pals, reverse parent lookup, and multi-step breeding chain computation.",
        },
      },
      {
        "@type": "Question",
        name: "How do I breed Anubis in Palworld?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To breed Anubis (Ground, Power 100), you need parent combinations whose average breeding power is closest to 100. Use our Find Parents tool to see all possible combinations.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PalBreeder",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PalBreeder",
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    description: siteDescription,
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero section — Tool is the hero, NO text above fold */}
      <section className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Floating Game Characters */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 hidden lg:block -z-10 max-w-[1400px] mx-auto inset-x-0">
          <Image src="/images/img-intro-character-left.png" alt="" width={380} height={380} priority className="absolute left-[2%] top-24 w-[380px] h-auto object-contain animate-float" />
          <Image src="/images/img-intro-character-right.png" alt="" width={420} height={420} priority className="absolute right-[2%] top-32 w-[420px] h-auto object-contain animate-float-delayed" />
        </div>

        <div className="max-w-xl mx-auto text-center mb-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            <span className="text-gradient">Palworld</span>{" "}
            <span className="text-[var(--pw-text)]">Breeding Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--pw-text-muted)] max-w-md mx-auto">
            Breed any two Pals, find parent combos, and discover the shortest
            breeding chains — instantly.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/tier-list"
              className="inline-flex items-center rounded-full border border-[var(--pw-yellow)]/25 bg-[var(--pw-yellow)]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-yellow)] transition-colors hover:bg-[var(--pw-yellow)]/18"
            >
              Tier List
            </Link>
            <Link
              href="/capture-rate"
              className="inline-flex items-center rounded-full border border-[var(--pw-blue)]/30 bg-[var(--pw-blue)]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-blue)] transition-colors hover:bg-[var(--pw-blue)]/20"
            >
              Capture Rate
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center rounded-full border border-[var(--pw-border)] bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-text-muted)] transition-colors hover:bg-white/10 hover:text-[var(--pw-text)]"
            >
              Technology
            </Link>
            <Link
              href="/structures"
              className="inline-flex items-center rounded-full border border-[var(--pw-border)] bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-text-muted)] transition-colors hover:bg-white/10 hover:text-[var(--pw-text)]"
            >
              Structures
            </Link>
            <Link
              href="/pals"
              className="inline-flex items-center rounded-full border border-[var(--pw-border)] bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-text-muted)] transition-colors hover:bg-white/10 hover:text-[var(--pw-text)]"
            >
              Pals
            </Link>
          </div>
        </div>

        {/* Calculator Card — THE HERO */}
        <CalculatorCard />
      </section>

      {/* Browse Pals Section */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Browse Pal Breeding Guides
            </h2>
            <p className="text-sm text-[var(--pw-text-muted)]">
              Detailed breeding guides for every Pal — find optimal parent
              combinations
            </p>
            <Link
              href="/pals"
              className="inline-flex mt-4 items-center gap-2 rounded-full bg-[var(--pw-blue)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pw-blue)] transition-colors hover:bg-[var(--pw-blue)]/25"
            >
              View Full Paldex
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {ALL_PALS.map((pal) => {
              const elementColor =
                ELEMENT_COLORS[pal.element as PalElement];
              const rarity = getRarity(pal.power);
              const rarityColor = RARITY_COLORS[rarity];

              return (
                <Link
                  key={pal.id}
                  href={`/breeding/${pal.id}`}
                  className="glass-card p-3 flex flex-col items-center gap-2 group hover:-translate-y-1 transition-all duration-200"
                  id={`pal-card-${pal.id}`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200"
                    style={{
                      background: `${elementColor}18`,
                      border: `1.5px solid ${elementColor}44`,
                    }}
                  >
                    <PalAvatar
                      pal={pal}
                      className="w-10 h-10"
                      sizes="40px"
                    />
                  </div>
                  <span className="text-xs font-semibold text-center truncate w-full">
                    {pal.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[0.6rem] px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: `${elementColor}18`,
                        color: elementColor,
                      }}
                    >
                      {pal.element}
                    </span>
                    <span
                      className="text-[0.55rem] font-mono"
                      style={{ color: rarityColor }}
                    >
                      ★{rarity}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Game Features Section */}
      <section className="py-20 px-4 sm:px-6 relative mt-8 border-y border-[var(--pw-border)]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg-features.jpg" fill sizes="100vw" quality={75} className="object-cover opacity-[0.25]" alt="Palworld Features Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--pw-bg)] via-transparent to-[var(--pw-bg)] opacity-90" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gradient">
              Discover the World of Pals
            </h2>
            <p className="text-[var(--pw-text-muted)] max-w-2xl mx-auto">
              Fight, farm, build and work alongside mysterious creatures called &ldquo;Pals&rdquo; in this completely new multiplayer, open world survival and crafting game!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="glass-card overflow-hidden group flex flex-col h-full bg-[var(--pw-bg-alt)] bg-opacity-40">
              <div className="h-52 overflow-hidden relative border-b border-[var(--pw-border)] shrink-0">
                <Image src="/images/img-features-01.jpg" alt="Capture and Train" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pw-blue)]"></span>
                  Capture × Train
                </h3>
                <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
                  Palworld blends intense combat, monster-catching, and deep base building into one seamless experience. Use Pal Spheres to capture weakened creatures and turn them into powerful allies.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card overflow-hidden group flex flex-col h-full bg-[var(--pw-bg-alt)] bg-opacity-40">
              <div className="h-52 overflow-hidden relative border-b border-[var(--pw-border)] shrink-0">
                <Image src="/images/img-features-02.jpg" alt="Build and Automate" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pw-yellow)]"></span>
                  Build × Automate
                </h3>
                <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
                  Experience the thrill of building bases alongside your Pals. Deploy Pals to automate your production lines, ensuring a steady flow of resources, crops, and power.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card overflow-hidden group flex flex-col h-full bg-[var(--pw-bg-alt)] bg-opacity-40">
              <div className="h-52 overflow-hidden relative border-b border-[var(--pw-border)] shrink-0">
                <Image src="/images/img-features-03.jpg" alt="World and Multiplayer" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pw-blue)]"></span>
                  World × Multiplayer
                </h3>
                <p className="text-sm text-[var(--pw-text-muted)] leading-relaxed">
                  Adventure knows no bounds when you play with others. Join forces to explore the wilderness, or embrace the rivalry by raiding others to seize their Pals and resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <FaqItem
              question="How does Palworld breeding work?"
              answer="In Palworld, breeding combines two parent Pals to produce an offspring. The child is determined by averaging the parents' breeding power values and finding the Pal closest to that average. Place two Pals in the Breeding Farm with a Cake and wait for the egg."
            />
            <FaqItem
              question="What is the best breeding calculator for Palworld?"
              answer="PalBreeder is the fastest Palworld breeding calculator, offering instant results for breeding two Pals, reverse parent lookup, and multi-step breeding chain computation. It works entirely client-side with zero API calls for instant performance."
            />
            <FaqItem
              question="How do I breed rare Pals like Anubis or Jetragon?"
              answer="Rare Pals require specific parent combinations with low breeding power averages. Use our Find Parents tool to discover all possible combinations, or use the Breeding Chain feature to find step-by-step paths from common Pals to your target."
            />
            <FaqItem
              question="Can I breed any two Pals together?"
              answer="Yes! Any two Pals can be bred together in Palworld. The offspring is determined by the average of both parents' breeding power values. Some combinations produce the same offspring, while others create unique results."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="glass-card-static group" id={`faq-${question.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}>
      <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium list-none">
        <span>{question}</span>
        <svg
          className="w-4 h-4 text-[var(--pw-text-dim)] group-open:rotate-180 transition-transform duration-200 shrink-0 ml-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="px-4 pb-4 text-sm text-[var(--pw-text-muted)] leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
