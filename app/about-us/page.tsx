import { ShieldCheck, Target, Users } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About PalBreeder — Palworld Tools & Data",
  description:
    "Learn about PalBreeder, who we are, what we do, and why we are a trusted source for exact Palworld breeding and game data.",
  path: "/about-us",
  ogType: "website",
  keywords: [
    "about PalBreeder",
    "Palworld team",
    "Palworld data accuracy",
  ],
});

export default function AboutUsPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-[var(--pw-blue)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-[#6b21a8] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient">
            About Us
          </h1>
          <p className="text-lg text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            The dedicated team behind the most accurate and reliable tools for the Palworld community.
          </p>
        </div>

        <div className="space-y-12">
          {/* Who We Are */}
          <section className="glass-card p-8 sm:p-12 relative overflow-hidden group hover:border-[var(--pw-blue)]/30 transition-colors duration-500">
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <Users className="w-64 h-64 text-[var(--pw-blue)]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pw-blue)]/10 text-[var(--pw-blue)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--pw-blue)]/20">
                <Users className="w-4 h-4" /> Who We Are
              </div>
              <h2 className="text-3xl font-bold text-white mb-5">
                Gamers, Developers, and Data Enthusiasts
              </h2>
              <div className="space-y-4 text-[15px] text-[#8b95a5] leading-relaxed">
                <p>
                  We are a passionate team of developers, data miners, and hardcore gamers dedicated to reverse-engineering and demystifying complex game mechanics. Founded shortly after Palworld's release, PalBreeder started as a personal project to understand breeding algorithms and quickly grew into a comprehensive toolkit used by players worldwide.
                </p>
                <p>
                  Our team shares a singular vision: to create the most intuitive, accurate, and lightning-fast resources for the community. We aren't just building tools; we play the game alongside you, ensuring our features solve real problems players face while optimizing their bases and breeding perfect Pals.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="glass-card p-8 sm:p-12 relative overflow-hidden group hover:border-[var(--pw-yellow)]/30 transition-colors duration-500">
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <Target className="w-64 h-64 text-[var(--pw-yellow)]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pw-yellow)]/10 text-[var(--pw-yellow)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--pw-yellow)]/20">
                <Target className="w-4 h-4" /> What We Do
              </div>
              <h2 className="text-3xl font-bold text-white mb-5">
                Precision Tools for Every Player
              </h2>
              <p className="text-[15px] text-[#8b95a5] leading-relaxed mb-6">
                At PalBreeder, we build production-grade applications that calculate exact probabilities, optimal breeding chains, and capture rates without relying on guesswork. We meticulously extract and verify data directly from the game files, updating our database the moment a new patch drops.
              </p>
              <ul className="space-y-4 mt-6 text-[#8b95a5]">
                <li className="flex items-start gap-4 bg-[#131b26]/50 p-4 rounded-xl border border-[#232f40]/50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--pw-yellow)] shrink-0 shadow-[0_0_10px_var(--pw-yellow)]" />
                  <div>
                    <strong className="text-white block mb-1">Advanced Calculators</strong>
                    <span className="text-sm">Lightning-fast, client-side applications for breeding permutations and complex chain routes that provide instant results.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-[#131b26]/50 p-4 rounded-xl border border-[#232f40]/50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--pw-yellow)] shrink-0 shadow-[0_0_10px_var(--pw-yellow)]" />
                  <div>
                    <strong className="text-white block mb-1">Data Accuracy</strong>
                    <span className="text-sm">Maintaining the most up-to-date and comprehensive Paldex available, directly cross-referenced with internal game data.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-[#131b26]/50 p-4 rounded-xl border border-[#232f40]/50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--pw-yellow)] shrink-0 shadow-[0_0_10px_var(--pw-yellow)]" />
                  <div>
                    <strong className="text-white block mb-1">Community Resources</strong>
                    <span className="text-sm">Providing detailed guides, meta tier lists, and structural references to optimize your gameplay and base efficiency.</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Trusted Source Statement */}
          <section className="bg-gradient-to-br from-[#131b26] to-[#0a0f16] border border-[#232f40] rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl mt-8">
            <div className="absolute inset-0 bg-[url('/images/bg-features.jpg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--pw-blue)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--pw-blue)]/20 to-[#6b21a8]/20 flex items-center justify-center mb-8 border border-[var(--pw-blue)]/30 shadow-[0_0_30px_rgba(var(--pw-blue-rgb),0.15)]">
                <ShieldCheck className="w-10 h-10 text-[var(--pw-blue)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
                A Trusted Source of Game Data
              </h2>
              <p className="text-[16px] text-[#8b95a5] leading-relaxed max-w-3xl">
                We are committed to absolute data integrity. PalBreeder is widely recognized as a <strong className="text-[var(--pw-blue)] font-semibold">trusted source</strong> for Palworld mechanics because we never rely on estimations or crowd-sourced guesses. Every calculation, breeding combination, and capture probability provided on our platform is powered by exact mathematical models derived directly from verified game engine data. When you use PalBreeder, you are guaranteed precision.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
