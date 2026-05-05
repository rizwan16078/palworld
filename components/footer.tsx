import Link from "next/link";
import { ALL_PALS } from "@/lib/breeding";

export default function Footer() {
  const popularPals = ALL_PALS.filter((p) => p.power <= 520).slice(0, 8);

  return (
    <footer className="border-t border-[var(--pw-border)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--pw-blue)] to-[var(--pw-blue)]/70 flex items-center justify-center text-white font-bold text-xs">
                PB
              </div>
              <span className="font-bold text-sm">PalBreeder</span>
            </div>
            <p className="text-xs text-[var(--pw-text-muted)] leading-relaxed max-w-xs">
              The fastest Palworld breeding calculator. Find optimal breeding
              combinations, discover parent pairs, and plan breeding chains.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)] mb-3">
              Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-blue)] transition-colors"
                >
                  Breeding Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/#find-parents"
                  className="text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-blue)] transition-colors"
                >
                  Find Parents
                </Link>
              </li>
              <li>
                <Link
                  href="/#breeding-chain"
                  className="text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-blue)] transition-colors"
                >
                  Breeding Chains
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Pals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)] mb-3">
              Popular Pals
            </h4>
            <ul className="space-y-2">
              {popularPals.map((pal) => (
                <li key={pal.id}>
                  <Link
                    href={`/breeding/${pal.id}`}
                    className="text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-blue)] transition-colors"
                  >
                    {pal.name} Breeding Guide
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--pw-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--pw-text-dim)]">
            © {new Date().getFullYear()} PalBreeder. Not affiliated with
            Pocketpair.
          </p>
          <p className="text-xs text-[var(--pw-text-dim)]">
            Palworld™ is a trademark of Pocketpair, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
