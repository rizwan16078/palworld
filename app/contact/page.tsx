import { Mail, MessageSquare, Bug, Newspaper } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact PalBreeder — Palworld Calculator Team",
  description:
    "Get in touch with the PalBreeder team. Report a bug, suggest a feature, request a correction, or partner with us on Palworld content.",
  path: "/contact",
  keywords: ["contact PalBreeder", "Palworld bug report", "Palworld partnership"],
});

const CONTACT_EMAIL = "hello@breedingpalworldcalculator.com";

const channels = [
  {
    icon: Bug,
    title: "Report a bug or data error",
    body: "Found a wrong breed result, a broken page, or outdated stats? Send us the URL and a screenshot. We treat data issues as P0 and usually patch them within 24 hours.",
    accent: "text-[var(--pw-red,#ef4444)]",
  },
  {
    icon: MessageSquare,
    title: "Feature requests",
    body: "Want a new calculator, filter, or export? Tell us the workflow you're trying to optimize and we'll prioritize features the community asks for most.",
    accent: "text-[var(--pw-blue)]",
  },
  {
    icon: Newspaper,
    title: "Press & partnerships",
    body: "For interviews, content collaborations, sponsorships, or licensing our data sets, email us with the deck or brief and we'll get back within two business days.",
    accent: "text-[var(--pw-yellow,#f59e0b)]",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient">
            Contact Us
          </h1>
          <p className="text-lg text-[var(--pw-text-muted)] max-w-2xl mx-auto">
            One inbox, real humans. Pick the topic that fits and we'll take it from there.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 border border-[#232f40] bg-[#0f1722] mb-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--pw-blue)]/15 border border-[var(--pw-blue)]/30 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-[var(--pw-blue)]" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#5e6a7e] font-bold mb-2">
            Email us
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-xl sm:text-2xl font-extrabold text-white hover:text-[var(--pw-blue)] transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-[#8b95a5] mt-3">
            Replies within 2 business days. Faster for confirmed bugs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {channels.map(({ icon: Icon, title, body, accent }) => (
            <section
              key={title}
              className="glass-card p-6 border border-[#232f40] bg-[#131b26]"
            >
              <Icon className={`w-5 h-5 mb-4 ${accent}`} />
              <h2 className="text-base font-bold text-white mb-2">{title}</h2>
              <p className="text-sm text-[#8b95a5] leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
