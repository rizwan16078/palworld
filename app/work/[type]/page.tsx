import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WORK_SUITABILITIES, getWorkDefById } from "@/lib/work";
import { ALL_PALS, ELEMENT_COLORS, type PalElement } from "@/lib/breeding";
import PalAvatar from "@/components/PalAvatar";
import { siteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export async function generateStaticParams() {
  return WORK_SUITABILITIES.map((work) => ({
    type: work.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const workDef = getWorkDefById(resolvedParams.type);
  if (!workDef) return {};

  const title = `Best Pals for ${workDef.name} in Palworld (Tier List)`;
  const description = `Discover the fastest and most efficient Pals for ${workDef.name} in Palworld. See full tier lists and optimal passive skills for base workers.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/work/${workDef.id}` },
    openGraph: { title, description, url: `${siteUrl}/work/${workDef.id}` },
  };
}

export default async function WorkSuitabilityDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const workDef = getWorkDefById(resolvedParams.type);
  
  if (!workDef) {
    notFound();
  }

  // Find all pals that have this work suitability
  const validPals = ALL_PALS.filter(
    (p) => p.suitabilities && p.suitabilities.some((s) => s.type === workDef.name)
  ).map((p) => {
    const suitability = p.suitabilities!.find((s) => s.type === workDef.name)!;
    return { ...p, level: suitability.level };
  }).sort((a, b) => b.level - a.level);

  // Group by level
  const groupedPals = validPals.reduce((acc, pal) => {
    if (!acc[pal.level]) acc[pal.level] = [];
    acc[pal.level].push(pal);
    return acc;
  }, {} as Record<number, typeof validPals>);

  const levels = Object.keys(groupedPals)
    .map(Number)
    .sort((a, b) => b - a);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Best Pals for ${workDef.name} in Palworld`,
    description: workDef.description,
    author: { "@type": "Organization", name: "PalBreeder" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Link href="/work" className="inline-flex items-center text-xs font-semibold text-[var(--pw-blue)] hover:underline mb-6">
            ← Back to All Work Suitabilities
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--pw-surface)] border border-[var(--pw-border)] flex items-center justify-center text-3xl">
              {workDef.icon}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Best Pals for {workDef.name}
            </h1>
          </div>
          
          <p className="text-lg text-[var(--pw-text-muted)] leading-relaxed">
            {workDef.description} If you want to optimize your base for {workDef.name}, 
            prioritize catching or breeding the highest level Pals listed below.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Pals List) */}
          <div className="lg:col-span-2 space-y-8">
            {levels.length === 0 ? (
              <div className="glass-card p-8 text-center text-[var(--pw-text-muted)]">
                No pals mapped with {workDef.name} yet.
              </div>
            ) : (
              levels.map((level) => (
                <div key={level} className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    Level {level} {workDef.name}
                    {level === 4 && <span className="px-2 py-0.5 rounded text-[0.6rem] uppercase tracking-wider font-bold bg-[var(--pw-yellow)]/20 text-[var(--pw-yellow)] border border-[var(--pw-yellow)]/30">Max Tier</span>}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {groupedPals[level].map((pal) => (
                      <Link 
                        key={pal.id} 
                        href={`/breeding/${pal.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-bg)] hover:bg-[var(--pw-surface)] hover:border-[var(--pw-blue)]/50 transition-all group"
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
                          style={{
                            background: `${ELEMENT_COLORS[pal.element as PalElement]}22`,
                            border: `1.5px solid ${ELEMENT_COLORS[pal.element as PalElement]}44`,
                          }}
                        >
                          <PalAvatar pal={pal} className="w-10 h-10" sizes="40px" />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-[var(--pw-blue)] transition-colors">{pal.name}</div>
                          <div className="text-xs text-[var(--pw-text-dim)] mt-0.5">{pal.element} Element</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar (SEO Content / Passives) */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Optimal Passives</h3>
              <p className="text-sm text-[var(--pw-text-muted)] mb-4">
                To create the ultimate {workDef.name} worker, breed these passive skills onto them. 
                They multiply Work Speed significantly.
              </p>
              
              <ul className="space-y-3">
                <li className="p-3 rounded-lg bg-[var(--pw-bg)] border border-[var(--pw-border)]">
                  <div className="font-bold text-white text-sm">Artisan</div>
                  <div className="text-xs text-[var(--pw-yellow)] font-medium mt-1">Work Speed +50%</div>
                </li>
                <li className="p-3 rounded-lg bg-[var(--pw-bg)] border border-[var(--pw-border)]">
                  <div className="font-bold text-white text-sm">Work Slave</div>
                  <div className="text-xs text-[var(--pw-yellow)] font-medium mt-1">Work Speed +30% (Attack -30%)</div>
                </li>
                <li className="p-3 rounded-lg bg-[var(--pw-bg)] border border-[var(--pw-border)]">
                  <div className="font-bold text-white text-sm">Serious</div>
                  <div className="text-xs text-[var(--pw-yellow)] font-medium mt-1">Work Speed +20%</div>
                </li>
              </ul>
              
              <Link href="/passives" className="mt-6 block text-center text-xs font-bold text-[var(--pw-blue)] hover:underline uppercase tracking-wider">
                View All Passive Skills →
              </Link>
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
}
