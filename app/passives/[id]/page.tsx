import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PASSIVE_SKILLS } from "@/lib/passives";
import { siteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return PASSIVE_SKILLS.map((skill) => ({
    id: skill.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const skill = PASSIVE_SKILLS.find((s) => s.id === resolvedParams.id);
  if (!skill) return {};

  const title = `How to get ${skill.name} passive in Palworld`;
  const description = `Learn what the ${skill.name} passive skill does (${skill.description}) and how to breed it onto your favorite Pals.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/passives/${skill.id}` },
    openGraph: { title, description, url: `${siteUrl}/passives/${skill.id}` },
  };
}

export default async function PassiveSkillDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const skill = PASSIVE_SKILLS.find((s) => s.id === resolvedParams.id);
  
  if (!skill) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `How to get the ${skill.name} passive in Palworld`,
    description: skill.description,
    author: { "@type": "Organization", name: "PalBreeder" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/passives" className="inline-flex items-center text-xs font-semibold text-[var(--pw-blue)] hover:underline mb-8">
            ← Back to All Passives
          </Link>
          
          <div className="glass-card p-8 md:p-10 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {skill.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--pw-surface)] border border-[var(--pw-border)] text-[var(--pw-text-muted)]">
                    Tier {skill.tier}
                  </span>
                </div>
                <div className="text-xl font-bold text-[var(--pw-yellow)]">
                  {skill.description}
                </div>
              </div>
            </div>

            <hr className="border-[var(--pw-border)] my-8" />

            <div className="prose prose-invert prose-p:text-[var(--pw-text-muted)] prose-headings:text-white max-w-none">
              <h2>How to get {skill.name}</h2>
              <p>
                The <strong>{skill.name}</strong> passive skill is highly sought after because it provides <code>{skill.description}</code>. 
                There are generally two ways to obtain a Pal with this trait:
              </p>
              
              <h3>1. Wild Capture & RNG</h3>
              <p>
                Unless it is a guaranteed boss drop or a Legendary exclusive, standard Pals caught in the wild have a random chance to roll with 0 to 4 passive skills. 
                You can brute-force acquiring <strong>{skill.name}</strong> by repeatedly catching the specific Pal species you want until you get lucky.
              </p>

              <h3>2. Targeted Breeding (Recommended)</h3>
              <p>
                The most reliable way to obtain <strong>{skill.name}</strong> on a specific Pal is through the Breeding Farm. 
                Passive skills have a high probability of being inherited by the offspring.
              </p>
              
              <div className="bg-[#131b26]/50 border border-[var(--pw-border)] rounded-xl p-6 mt-4">
                <h4 className="mt-0 text-[var(--pw-blue)]">Breeding Strategy</h4>
                <ol className="mb-0 text-sm">
                  <li>Find <em>any</em> Pal in your Palbox that currently has the <strong>{skill.name}</strong> passive.</li>
                  <li>Use our <Link href="/box-breeder" className="text-white hover:underline">Box Breeder</Link> tool to find a chain from that specific Pal to your target Pal.</li>
                  <li>Breed them together. If the offspring inherits <strong>{skill.name}</strong>, substitute them into the next step of the chain.</li>
                </ol>
              </div>

              {skill.tier === 3 && (
                <div className="mt-8 p-4 border-l-4 border-[var(--pw-yellow)] bg-[var(--pw-yellow)]/10 text-sm">
                  <strong>Legendary Trait Note:</strong> As a Tier 3 / Legendary trait, this passive often originates from specific Alpha Bosses or Legendary Pals (like Frostallion, Jetragon, etc.). You must capture the specific boss first to introduce this gene into your breeding pool.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
