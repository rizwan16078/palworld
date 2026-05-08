import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--pw-border)] mt-auto bg-[#0a0f16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--pw-blue)] to-[#6b21a8] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                PB
              </div>
              <span className="font-bold text-xl text-white">PalBreeder</span>
            </div>
            <p className="text-sm text-[#8b95a5] leading-relaxed">
              Production-grade Palworld tools for breeding, capture planning, and quick reference guides. Exact math, not guesses.
            </p>
          </div>

          {/* Tools / Calculators */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#5e6a7e] mb-6">
              Calculators
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-sm text-[#8b95a5] hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pw-blue)]" />
                  Breeding Calculator
                </Link>
              </li>
              <li>
                <Link href="/capture-rate" className="text-sm text-[#8b95a5] hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Capture Rate Calculator
                </Link>
              </li>
              <li>
                <Link href="/tier-list" className="text-sm text-[#8b95a5] hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Tier List
                </Link>
              </li>
              <li>
                <Link href="/structures" className="text-sm text-[#8b95a5] hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Structures
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/pals" className="text-sm text-[var(--pw-blue)] hover:text-[var(--pw-blue-hover)] transition-colors flex items-center gap-1.5 font-semibold">
                  All Pals <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#5e6a7e] mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/how-it-works" className="text-sm text-[#8b95a5] hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-sm text-[#8b95a5] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#8b95a5] hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm text-[#8b95a5] hover:text-white transition-colors">
                  Authors / Team
                </Link>
              </li>
              <li>
                <Link href="/editorial-guidelines" className="text-sm text-[#8b95a5] hover:text-white transition-colors">
                  Editorial Guidelines
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm text-[#8b95a5] hover:text-white transition-colors">
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#5e6a7e] mb-6">
              Stay Updated
            </h3>
            <p className="text-sm text-[#8b95a5] leading-relaxed mb-4">
              Get notified when new pals are added or breeding odds get updated.
            </p>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#5e6a7e]" />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#131b26] border border-[#232f40] rounded-xl py-3 pl-10 pr-14 text-sm text-white placeholder-[#5e6a7e] focus:outline-none focus:border-[var(--pw-blue)] focus:ring-1 focus:ring-[var(--pw-blue)] transition-all"
              />
              <button className="absolute inset-y-1 right-1 bg-gradient-to-r from-[var(--pw-blue)] to-[#6b21a8] text-white rounded-lg w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-[#131b26] border border-[#232f40] flex items-center justify-center text-[#8b95a5] hover:text-white hover:bg-[#232f40] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#131b26] border border-[#232f40] flex items-center justify-center text-[#8b95a5] hover:text-white hover:bg-[#232f40] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#232f40] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <p className="text-xs text-[#5e6a7e]">
              © {new Date().getFullYear()} PalBreeder. All rights reserved.
            </p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#6b21a8] uppercase">
              Powered by Exact Probability Math
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="text-sm text-[#5e6a7e] hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-[#5e6a7e] hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
