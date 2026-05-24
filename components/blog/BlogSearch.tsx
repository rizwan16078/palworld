"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const updateSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set("search", q);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`/blog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateSearch(v), 300);
  };

  const handleClear = () => {
    setValue("");
    clearTimeout(debounceRef.current);
    updateSearch("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync value when URL changes externally (e.g. clear all filters)
  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";
    if (urlSearch !== value) setValue(urlSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5e6a7e] pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search guides..."
        aria-label="Search blog posts"
        className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#131b26] border border-[#232f40] text-white text-sm placeholder-[#5e6a7e] focus:outline-none focus:border-[var(--pw-blue)] focus:ring-1 focus:ring-[var(--pw-blue)] transition-colors"
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-[#232f40] text-[#5e6a7e] hover:text-white hover:bg-[var(--pw-blue)] transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#0a0f16] border border-[#232f40] text-[10px] text-[#5e6a7e] font-mono pointer-events-none">
        ⌘K
      </kbd>
    </div>
  );
}
