"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--pw-bg)]/80 backdrop-blur-xl border-b border-[var(--pw-border)]"
          : "bg-transparent"
      }`}
      id="main-navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--pw-blue)] to-[var(--pw-blue)]/70 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-[var(--pw-blue)]/30 group-hover:shadow-xl transition-shadow">
            PB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[var(--pw-text)]">
              PalBreeder
            </span>
            <span className="text-[0.55rem] text-[var(--pw-text-dim)] -mt-0.5 tracking-wide uppercase">
              Breeding Calculator
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200"
          >
            Calculator
          </Link>
          <Link
            href="/capture-rate"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200"
          >
            Capture
          </Link>
          <Link
            href="/tier-list"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200"
          >
            Tier List
          </Link>
          <Link
            href="/structures"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200"
          >
            Structures
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--pw-text-muted)] hover:text-[var(--pw-blue)] hover:bg-[var(--pw-surface)] transition-all duration-200"
          >
            Guides
          </Link>
          <Link
            href="/pals"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200 hidden sm:block"
          >
            Pals
          </Link>
          <Link
            href="/technology"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--pw-text-muted)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200 hidden sm:block"
          >
            Technology
          </Link>
          {/* GitHub / external link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 w-9 h-9 rounded-lg flex items-center justify-center text-[var(--pw-text-dim)] hover:text-[var(--pw-text)] hover:bg-[var(--pw-surface)] transition-all duration-200"
            aria-label="GitHub"
          >
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
