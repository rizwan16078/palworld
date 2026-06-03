import Link from "next/link";
import { Code2, Database, Gamepad2 } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PalBreeder Authors & Editorial Team",
  description:
    "Meet the PalBreeder authors and editors — the developers, data analysts, and Palworld veterans behind every guide and calculator on the site.",
  path: "/authors",
  ogType: "website",
  keywords: ["PalBreeder authors", "Palworld editors", "Palworld writers"],
});

const team = [
  {
    icon: Code2,
    name: "PalBreeder Engineering",
    role: "Calculators & site engineering",
    bio: "Owns the breeding, capture, and tier-list calculators. Translates verified game data into deterministic algorithms that match in-game outcomes.",
  },
  {
    icon: Database,
    name: "PalBreeder Data Team",
    role: "Data accuracy & Paldex maintenance",
    bio: "Maintains the Paldex, breeding power tables, capture rates, and patch-day verification. Every dataset on PalBreeder is reviewed by this team before it ships.",
  },
  {
    icon: Gamepad2,
    name: "PalBreeder Editorial",
    role: "Guides, strategies, and meta analysis",
    bio: "Veteran Palworld players who write the breeding guides, base-building strategies, and tier list rationale. Every guide is play-tested before publication.",
  },
];

export default function AuthorsPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient">
            Authors & Editorial Team
          </h1>
          <p className="text-lg text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            PalBreeder content is produced by working developers and long-time Palworld players. Here is who is behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {team.map(({ icon: Icon, name, role, bio }) => (
            <article
              key={name}
              className="glass-card p-6 border border-[#232f40] bg-[#131b26] flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--pw-blue)] to-[#6b21a8] flex items-center justify-center mb-5 shadow-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{name}</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-blue)] mb-4">
                {role}
              </p>
              <p className="text-sm text-[#8b95a5] leading-relaxed">{bio}</p>
            </article>
          ))}
        </div>

        <section className="glass-card p-8 border border-[#232f40] bg-[#0f1722] text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Want to contribute?</h2>
          <p className="text-sm text-[#8b95a5] leading-relaxed max-w-2xl mx-auto mb-6">
            We're always open to expert contributors with deep Palworld knowledge — particularly around endgame breeding chains, passive optimization, and base efficiency.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--pw-blue)] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(40,111,255,0.3)]"
          >
            Pitch a guide
          </Link>
        </section>
      </div>
    </div>
  );
}
