"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-2xl bg-gradient-to-br from-[var(--pw-blue)] to-[#6b21a8] text-white shadow-lg shadow-[var(--pw-blue)]/20 backdrop-blur-md border border-white/20 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:shadow-2xl hover:shadow-[var(--pw-blue)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--pw-blue)] focus:ring-offset-2 focus:ring-offset-[#0F1923] group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12 pointer-events-none"
      }`}
      aria-label="Scroll to top"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2.5} />
    </button>
  );
}
