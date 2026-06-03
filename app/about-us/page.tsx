import Image from "next/image";
import { BookOpen, ShieldCheck, Target, Users } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

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

const TEAM = [
  {
    initials: "AR",
    name: "Alex R.",
    role: "Founder & Lead Developer",
    bio: "Reverse-engineered the original breeding algorithm on launch week. Builds all core calculators.",
    color: "from-[var(--pw-blue)] to-[#6b21a8]",
  },
  {
    initials: "JM",
    name: "Jordan M.",
    role: "Data Engineer",
    bio: "Extracts and validates game data after every patch. Keeps the Paldex at 100% accuracy.",
    color: "from-teal-500 to-[var(--pw-blue)]",
  },
  {
    initials: "SL",
    name: "Sam L.",
    role: "Content Lead",
    bio: "Writes the breeding guides and tier lists. 800+ hours in-game and still counting.",
    color: "from-[var(--pw-yellow)] to-orange-500",
  },
  {
    initials: "PR",
    name: "Priya R.",
    role: "UX & Design",
    bio: "Designs the interfaces. Believes every calculator should feel as fast as it actually is.",
    color: "from-pink-500 to-[#6b21a8]",
  },
];

export default function AboutUsPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PalBreeder",
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    description: "The most accurate and reliable tools for the Palworld community, built from reverse-engineered game data.",
    foundingDate: "2024-01",
    member: TEAM.map((member) => ({
      "@type": "OrganizationRole",
      member: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        description: member.bio,
      },
      roleName: member.role,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
            The dedicated team behind the most accurate and reliable tools for
            the Palworld community.
          </p>
        </div>

        <div className="space-y-12">

          {/* Our Story */}
          <section
            className="glass-card p-8 sm:p-12 relative overflow-hidden group hover:border-[#6b21a8]/30 transition-colors duration-500"
            aria-labelledby="our-story-heading"
          >
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <BookOpen className="w-64 h-64 text-[#6b21a8]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6b21a8]/10 text-[#a855f7] text-xs font-bold uppercase tracking-widest mb-6 border border-[#6b21a8]/20">
                <BookOpen className="w-4 h-4" /> Our Story
              </div>
              <h2
                id="our-story-heading"
                className="text-3xl font-bold text-white mb-5"
              >
                From a Weekend Script to a Community Tool
              </h2>
              <div className="space-y-4 text-[15px] text-[#8b95a5] leading-relaxed">
                <p>
                  PalBreeder started in January 2024 — less than a week after
                  Palworld launched into Early Access. Our founder, Alex, had
                  already spent 40 hours trying to figure out why breeding
                  results felt so unpredictable. The answer was buried in the
                  game&apos;s internal files, and once he found it, he turned it
                  into a weekend script to calculate correct combinations for his
                  own base.
                </p>
                <p>
                  He posted the tool in a Discord server. Within 48 hours it had
                  been shared to three subreddits and thousands of players were
                  using it. That feedback loop — real players, real breeding
                  projects, real edge cases — shaped every feature we built next.
                </p>
                <p>
                  Today, PalBreeder is a full production platform: instant
                  breeding calculators, capture rate tools, a complete Paldex,
                  tier lists, and in-depth guides. The mission has not changed
                  since that weekend script. We build for players who want exact
                  math, not guesses.
                </p>
                <p className="text-sm text-[#5e6a7e] pt-4 border-t border-[#232f40]/50">
                  PalBreeder is an independently operated platform, not affiliated with or
                  endorsed by Pocketpair, Inc. (the developer of Palworld). For business or
                  legal correspondence, contact{" "}
                  <a
                    href="mailto:hello@breedingpalworldcalculator.com"
                    className="text-[var(--pw-blue)] hover:underline"
                  >
                    hello@breedingpalworldcalculator.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Who We Are */}
          <section
            className="glass-card p-8 sm:p-12 relative overflow-hidden group hover:border-[var(--pw-blue)]/30 transition-colors duration-500"
            aria-labelledby="who-we-are-heading"
          >
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <Users className="w-64 h-64 text-[var(--pw-blue)]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pw-blue)]/10 text-[var(--pw-blue)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--pw-blue)]/20">
                <Users className="w-4 h-4" /> Who We Are
              </div>
              <h2
                id="who-we-are-heading"
                className="text-3xl font-bold text-white mb-5"
              >
                Gamers, Developers, and Data Enthusiasts
              </h2>
              <div className="space-y-4 text-[15px] text-[#8b95a5] leading-relaxed">
                <p>
                  We are a passionate team of developers, data miners, and
                  hardcore gamers dedicated to reverse-engineering and
                  demystifying complex game mechanics. Founded shortly after
                  Palworld&apos;s release, PalBreeder started as a personal
                  project to understand breeding algorithms and quickly grew into
                  a comprehensive toolkit used by players worldwide.
                </p>
                <p>
                  Our team shares a singular vision: to create the most
                  intuitive, accurate, and lightning-fast resources for the
                  community. We aren&apos;t just building tools; we play the game
                  alongside you, ensuring our features solve real problems players
                  face while optimizing their bases and breeding perfect Pals.
                </p>
              </div>
            </div>
          </section>

          {/* Meet the Team */}
          <section aria-labelledby="team-heading">
            <div className="text-center mb-10">
              <h2
                id="team-heading"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              >
                Meet the Team
              </h2>
              <p className="text-sm text-[#8b95a5] mt-2">
                The people who keep PalBreeder accurate, fast, and free.
              </p>
            </div>

            {/* Team workspace photo */}
            <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-8 border border-[#232f40]">
              <Image
                src="/images/img-product.jpg"
                alt="PalBreeder team at work — developers and data engineers building Palworld tools"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16]/90 via-[#0a0f16]/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-blue)] mb-1">
                  Our Workspace
                </p>
                <p className="text-sm font-medium text-white leading-snug">
                  The PalBreeder team — building and maintaining tools for the Palworld community since 2024
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="glass-card p-6 flex items-start gap-5 group hover:border-[var(--pw-blue)]/30 transition-colors duration-300"
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    role="img"
                    aria-label={`${member.name} avatar`}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-base leading-tight">
                      {member.name}
                    </p>
                    <p className="text-xs font-semibold text-[var(--pw-blue)] mb-2 uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-sm text-[#8b95a5] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What We Do */}
          <section
            className="glass-card p-8 sm:p-12 relative overflow-hidden group hover:border-[var(--pw-yellow)]/30 transition-colors duration-500"
            aria-labelledby="what-we-do-heading"
          >
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <Target className="w-64 h-64 text-[var(--pw-yellow)]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pw-yellow)]/10 text-[var(--pw-yellow)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--pw-yellow)]/20">
                <Target className="w-4 h-4" /> What We Do
              </div>
              <h2
                id="what-we-do-heading"
                className="text-3xl font-bold text-white mb-2"
              >
                What We Do
              </h2>
              <p className="text-lg text-[#c0cad8] font-medium mb-5">
                Precision Tools for Every Player
              </p>
              <p className="text-[15px] text-[#8b95a5] leading-relaxed mb-6">
                At PalBreeder, we build production-grade applications that
                calculate exact probabilities, optimal breeding chains, and
                capture rates without relying on guesswork. We meticulously
                extract and verify data directly from the game files, updating
                our database the moment a new patch drops.
              </p>
              <ul className="space-y-4 mt-6 text-[#8b95a5]">
                <li className="flex items-start gap-4 bg-[#131b26]/50 p-4 rounded-xl border border-[#232f40]/50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--pw-yellow)] shrink-0 shadow-[0_0_10px_var(--pw-yellow)]" />
                  <div>
                    <strong className="text-white block mb-1">
                      Advanced Calculators
                    </strong>
                    <span className="text-sm">
                      Lightning-fast, client-side applications for breeding
                      permutations and complex chain routes that provide instant
                      results.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-[#131b26]/50 p-4 rounded-xl border border-[#232f40]/50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--pw-yellow)] shrink-0 shadow-[0_0_10px_var(--pw-yellow)]" />
                  <div>
                    <strong className="text-white block mb-1">
                      Data Accuracy
                    </strong>
                    <span className="text-sm">
                      Maintaining the most up-to-date and comprehensive Paldex
                      available, directly cross-referenced with internal game
                      data.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-[#131b26]/50 p-4 rounded-xl border border-[#232f40]/50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[var(--pw-yellow)] shrink-0 shadow-[0_0_10px_var(--pw-yellow)]" />
                  <div>
                    <strong className="text-white block mb-1">
                      Community Resources
                    </strong>
                    <span className="text-sm">
                      Providing detailed guides, meta tier lists, and structural
                      references to optimize your gameplay and base efficiency.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Trusted Source Statement */}
          <section className="bg-gradient-to-br from-[#131b26] to-[#0a0f16] border border-[#232f40] rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl mt-8">
            {/* Next.js Image so this decorative background goes through WebP/AVIF optimisation,
                lazy loading, and responsive sizing — raw CSS bg-url bypasses all of that */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] mix-blend-overlay">
              <Image
                src="/images/bg-features.jpg"
                fill
                alt=""
                aria-hidden="true"
                loading="lazy"
                quality={20}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--pw-blue)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--pw-blue)]/20 to-[#6b21a8]/20 flex items-center justify-center mb-8 border border-[var(--pw-blue)]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <ShieldCheck className="w-10 h-10 text-[var(--pw-blue)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
                A Trusted Source of Game Data
              </h2>
              <p className="text-[16px] text-[#8b95a5] leading-relaxed max-w-3xl">
                We are committed to absolute data integrity. PalBreeder is widely
                recognized as a{" "}
                <strong className="text-[var(--pw-blue)] font-semibold">
                  trusted source
                </strong>{" "}
                for Palworld mechanics because we never rely on estimations or
                crowd-sourced guesses. Every calculation, breeding combination,
                and capture probability provided on our platform is powered by
                exact mathematical models derived directly from verified game
                engine data. When you use PalBreeder, you are guaranteed
                precision.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
    </>
  );
}
