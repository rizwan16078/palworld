import { CheckCircle2, RefreshCw, ShieldCheck, FileCheck } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PalBreeder Editorial Guidelines & Sourcing",
  description:
    "The PalBreeder editorial guidelines — sourcing, fact-checking, corrections, and update policy for every guide and calculator we publish.",
  path: "/editorial-guidelines",
  ogType: "article",
  keywords: ["editorial guidelines", "Palworld sourcing", "Palworld fact checking"],
});

const principles = [
  {
    icon: ShieldCheck,
    title: "Verified sourcing",
    body: "Every numeric value on the site — breed powers, capture rates, drop tables, work suitabilities — is extracted from the game's data tables or verified by repeated in-game testing. We never publish unverified community estimates as fact.",
  },
  {
    icon: CheckCircle2,
    title: "Two-person fact check",
    body: "Calculators are unit-tested against known in-game outcomes. Guides are reviewed by a second editor against the current game patch before they're published.",
  },
  {
    icon: RefreshCw,
    title: "Patch-day updates",
    body: "When Palworld ships a patch, our data team reruns the extraction pipeline and updates affected pages within 24 hours. Stale articles are flagged or rewritten — they're never left to drift.",
  },
  {
    icon: FileCheck,
    title: "Transparent corrections",
    body: "If we get something wrong, we fix it and note what changed at the bottom of the article. Email hello@breedingpalworldcalculator.com to report a correction.",
  },
];

export default function EditorialGuidelinesPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient">
            Editorial Guidelines
          </h1>
          <p className="text-lg text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            How we source, verify, and maintain the data and guides on PalBreeder.
          </p>
        </div>

        <div className="space-y-5 mb-12">
          {principles.map(({ icon: Icon, title, body }) => (
            <section
              key={title}
              className="glass-card p-6 sm:p-7 border border-[#232f40] bg-[#131b26] flex gap-5"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--pw-blue)]/15 border border-[var(--pw-blue)]/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[var(--pw-blue)]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
                <p className="text-sm text-[#8b95a5] leading-relaxed">{body}</p>
              </div>
            </section>
          ))}
        </div>

        <section className="glass-card p-8 border border-[#232f40] bg-[#0f1722]">
          <h2 className="text-xl font-extrabold text-white mb-3">AI and generated content</h2>
          <p className="text-sm text-[#8b95a5] leading-relaxed">
            We may use AI tools to draft outlines, summarize patch notes, or accelerate copy editing. Every published page — calculator output, guide, or data table — is reviewed and signed off by a human editor on our team. We do not publish auto-generated facts without verification.
          </p>
        </section>
      </div>
    </div>
  );
}
