"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PalAvatar from "./PalAvatar";
import {
  ALL_PALS,
  ELEMENT_COLORS,
  type Pal,
  type PalElement,
} from "@/lib/breeding";

interface PalSelectorProps {
  onSelect: (pal: Pal) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function PalSelector({
  onSelect,
  isOpen,
  onClose,
}: PalSelectorProps) {
  return (
    <AnimatePresence>
      {isOpen && <PalSelectorDialog onSelect={onSelect} onClose={onClose} />}
    </AnimatePresence>
  );
}

function PalSelectorDialog({
  onSelect,
  onClose,
}: Omit<PalSelectorProps, "isOpen">) {
  const [query, setQuery] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = ALL_PALS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.element.toLowerCase().includes(query.toLowerCase())
  );

  // Small delay to let the entrance animation complete before focusing
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[focusIndex] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }, [focusIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[focusIndex]) {
        onSelect(filtered[focusIndex]);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, focusIndex, onSelect, onClose]
  );

  const handleSelect = (pal: Pal) => {
    onSelect(pal);
    onClose();
  };

  return (
    <motion.div
      className="search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="search-modal"
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-label="Select a Pal"
      >
        {/* Search input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pw-text-dim)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            className="search-input pl-11"
            placeholder="Search Pals by name or element…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFocusIndex(0);
            }}
            onKeyDown={handleKeyDown}
            id="pal-search-input"
            autoComplete="off"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.65rem] text-[var(--pw-text-dim)] border border-[var(--pw-border)] rounded px-1.5 py-0.5 hidden sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="search-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[var(--pw-text-dim)] text-sm">
              No Pals found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((pal, i) => (
              <button
                key={pal.id}
                className="search-item w-full text-left"
                data-focused={i === focusIndex ? "true" : undefined}
                onClick={() => handleSelect(pal)}
                onMouseEnter={() => setFocusIndex(i)}
                id={`pal-option-${pal.id}`}
                type="button"
              >
                {/* Avatar circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: `${ELEMENT_COLORS[pal.element as PalElement]}22`,
                    border: `1.5px solid ${ELEMENT_COLORS[pal.element as PalElement]}44`,
                  }}
                >
                  <PalAvatar
                    pal={pal}
                    className="w-8 h-8"
                    sizes="32px"
                  />
                </div>

                {/* Name + element */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {pal.name}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="element-badge"
                      style={{
                        background: `${ELEMENT_COLORS[pal.element as PalElement]}22`,
                        color: ELEMENT_COLORS[pal.element as PalElement],
                      }}
                    >
                      {pal.element}
                    </span>
                    <span className="text-[0.7rem] text-[var(--pw-text-dim)]">
                      PWR {pal.power}
                    </span>
                  </div>
                </div>

                {/* Power indicator */}
                <div className="text-right shrink-0">
                  <div
                    className="text-xs font-mono font-bold"
                    style={{
                      color: ELEMENT_COLORS[pal.element as PalElement],
                    }}
                  >
                    {pal.power}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-[var(--pw-border)] flex items-center gap-4 text-[0.65rem] text-[var(--pw-text-dim)]">
          <span className="flex items-center gap-1">
            <kbd className="border border-[var(--pw-border)] rounded px-1">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-[var(--pw-border)] rounded px-1">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-[var(--pw-border)] rounded px-1">esc</kbd>
            Close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
