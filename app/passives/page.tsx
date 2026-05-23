import type { Metadata } from "next";
import Link from "next/link";
import { PASSIVE_SKILLS } from "@/lib/passives";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Palworld Passive Skills Tier List & Breeding Guide",
  description: "Complete list of all Palworld passive skills. Learn which passives are best for combat, base working, and movement speed.",
  path: "/passives",
  keywords: [
    "Palworld passive skills",
    "Palworld best passives",
    "Palworld artisan",
    "Palworld swift",
    "Palworld musclehead",
    "Palworld legend passive",
  ],
});

export default function PassivesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Passive Skills Tier List",
    description: "Browse all passive skills in Palworld, including Legendary and Emperor skills.",
    url: `${siteUrl}/passives`,
  };

  // Group by tier for simple categorization
  const grouped = PASSIVE_SKILLS.reduce((acc, skill) => {
    if (!acc[skill.tier]) acc[skill.tier] = [];
    acc[skill.tier].push(skill);
    return acc;
  }, {} as Record<number, typeof PASSIVE_SKILLS>);

  const tiers = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-[var(--pw-blue)]">Passive</span>{" "}
            <span className="text-[var(--pw-text)]">Skills</span>
          </h1>
          <p className="text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            Passive skills dictate whether a Pal is destined for combat or the assembly line. Browse all skills below to find the exact modifiers for your breeding chain.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {tiers.map((tier) => (
            <section key={tier}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-[var(--pw-border)] pb-2">
                Tier {tier} Passives
                {tier === 3 && <span className="px-2 py-0.5 rounded text-[0.6rem] uppercase tracking-wider font-bold bg-[var(--pw-yellow)]/20 text-[var(--pw-yellow)] border border-[var(--pw-yellow)]/30">Legendary / Unique</span>}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[tier].map((skill) => (
                  <Link 
                    key={skill.id} 
                    href={`/passives/${skill.id}`}
                    className="glass-card p-5 hover:-translate-y-1 transition-all group hover:border-[var(--pw-blue)]/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[var(--pw-blue)] transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--pw-text-muted)] mt-2">
                      {skill.description}
                    </p>
                    <div className="mt-4 text-xs font-semibold text-[var(--pw-blue)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Breeding Guide →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
