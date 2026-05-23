import type { Metadata } from "next";
import Link from "next/link";
import { WORK_SUITABILITIES } from "@/lib/work";
import { siteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Palworld Work Suitability Guide & Best Base Pals",
  description: "Browse all 12 work suitabilities in Palworld. Find the best Pals for mining, kindling, planting, and more to optimize your base automation.",
  path: "/work",
  keywords: [
    "Palworld work suitability",
    "Best base pals Palworld",
    "Palworld base building guide",
    "Palworld mining pals",
    "Palworld kindling pals",
  ],
});

export default function WorkSuitabilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Palworld Work Suitability Guide",
    description: "Browse the best Pals for every work suitability type in Palworld.",
    url: `${siteUrl}/work`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-[var(--pw-blue)]">Work</span>{" "}
            <span className="text-[var(--pw-text)]">Suitability</span>
          </h1>
          <p className="text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            A fully automated base is the key to endgame success. Browse all work types below to find the most efficient Pals for your production lines.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORK_SUITABILITIES.map((work) => (
            <Link 
              key={work.id} 
              href={`/work/${work.id}`}
              className="glass-card p-6 flex flex-col hover:-translate-y-1 transition-transform group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--pw-surface)] border border-[var(--pw-border)] flex items-center justify-center text-2xl group-hover:bg-[var(--pw-blue)]/10 group-hover:border-[var(--pw-blue)]/50 transition-colors">
                  {work.icon}
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-[var(--pw-blue)] transition-colors">
                  {work.name}
                </h2>
              </div>
              <p className="text-sm text-[var(--pw-text-muted)] mt-auto leading-relaxed">
                {work.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-[var(--pw-border)] flex justify-between items-center text-xs text-[var(--pw-text-dim)] font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                View Best Pals 
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
