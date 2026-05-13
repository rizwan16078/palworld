import Link from "next/link";
import { ArrowRight, Calculator, Database, GitBranch, ShieldCheck } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "How the Palworld Breeding Calculator Works",
  description:
    "Learn how the PalBreeder calculator works — the breeding math, parent permutation search, passive inheritance, and our data sources for Palworld.",
  path: "/how-it-works",
  ogType: "article",
  keywords: [
    "Palworld breeding math",
    "Palworld breeding formula",
    "Palworld breed power",
    "parent permutation",
  ],
});

const steps = [
  {
    icon: Database,
    title: "Verified game data",
    body: "Every Pal in the calculator is loaded from a dataset built from Palworld game files: breeding power, elements, rarity, work suitability, and stats. Updates land within hours of a patch.",
  },
  {
    icon: Calculator,
    title: "Exact breeding math",
    body: "When you pick two parents we compute floor((parent A breed power + parent B breed power) / 2 + 1) and find the Pal closest to that target. No guesswork, no probability fudge — the same algorithm Palworld uses internally.",
  },
  {
    icon: GitBranch,
    title: "Parent permutation search",
    body: "Looking for a specific child? We search every legal parent pair across the full Paldex, rank pairings by availability and rarity, and surface the shortest viable breeding chains.",
  },
  {
    icon: ShieldCheck,
    title: "Independent verification",
    body: "Outputs are cross-checked against in-game breeding logs. If a result ever drifts from in-game behavior, we treat it as a bug and patch it the same day.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient">
            How It Works
          </h1>
          <p className="text-lg text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            A transparent look at the data, the math, and the engineering behind every result PalBreeder shows you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {steps.map(({ icon: Icon, title, body }) => (
            <section
              key={title}
              className="glass-card p-6 sm:p-8 border border-[#232f40] bg-[#131b26]"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--pw-blue)]/15 border border-[var(--pw-blue)]/30 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-[var(--pw-blue)]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
              <p className="text-sm text-[#8b95a5] leading-relaxed">{body}</p>
            </section>
          ))}
        </div>

        <section className="glass-card p-8 sm:p-10 border border-[#232f40] bg-[#0f1722] mb-10">
          <h2 className="text-2xl font-extrabold text-white mb-4">The breeding formula in one line</h2>
          <pre className="text-sm bg-[#0a0f16] border border-[#232f40] rounded-xl p-4 overflow-x-auto text-[#c0cad8]">
{`child = nearest_pal_by_breed_power( floor((breed_power(parent_A) + breed_power(parent_B)) / 2) + 1 )`}
          </pre>
          <p className="text-sm text-[#8b95a5] leading-relaxed mt-5">
            That single rule produces every legal child in Palworld. Special pairings (Frostallion + Helzephyr → Frostallion Noct, for example) are explicit overrides applied on top of the formula and are listed in our parent search.
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[var(--pw-blue)] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(40,111,255,0.3)]"
          >
            Open the calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
