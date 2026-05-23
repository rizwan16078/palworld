"use client";

import { useState } from "react";
import PalSelector from "./PalSelector";
import PalAvatar from "./PalAvatar";
import ChainViewer from "./ChainViewer";
import { type Pal, ELEMENT_COLORS, type PalElement } from "@/lib/breeding";
import { findBreedingChain, type ChainResult } from "@/lib/graph";

export default function BoxBreeder() {
  const [ownedPals, setOwnedPals] = useState<Pal[]>([]);
  const [targetPal, setTargetPal] = useState<Pal | null>(null);
  
  const [isSelectingOwned, setIsSelectingOwned] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  
  const [chainResult, setChainResult] = useState<ChainResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAddOwned = (pal: Pal) => {
    if (!ownedPals.find((p) => p.id === pal.id)) {
      setOwnedPals([...ownedPals, pal]);
    }
  };

  const handleRemoveOwned = (id: string) => {
    setOwnedPals(ownedPals.filter((p) => p.id !== id));
  };

  const handleCalculate = () => {
    if (!targetPal || ownedPals.length === 0) return;
    
    setIsCalculating(true);
    
    // We use setTimeout to allow UI to update to "Calculating..." state
    // since findBreedingChain is synchronous and could block the thread.
    setTimeout(() => {
      const starterIds = ownedPals.map(p => p.id);
      const result = findBreedingChain(targetPal.id, starterIds);
      setChainResult(result);
      setIsCalculating(false);
    }, 50);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Target Pal Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4 text-white">1. Select Target Pal</h2>
        <p className="text-sm text-[var(--pw-text-muted)] mb-4">
          Choose the Pal you want to breed (e.g., Anubis, Jetragon).
        </p>
        
        <div className="flex items-center gap-4">
          {targetPal ? (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)]">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
                style={{
                  background: `${ELEMENT_COLORS[targetPal.element as PalElement]}22`,
                  border: `1.5px solid ${ELEMENT_COLORS[targetPal.element as PalElement]}44`,
                }}
              >
                <PalAvatar pal={targetPal} className="w-10 h-10" sizes="40px" />
              </div>
              <div>
                <div className="font-bold text-white">{targetPal.name}</div>
                <div className="text-xs text-[var(--pw-text-dim)]">{targetPal.element} • PWR {targetPal.power}</div>
              </div>
              <button
                onClick={() => setIsSelectingTarget(true)}
                className="ml-4 px-3 py-1.5 text-xs rounded-full bg-[var(--pw-bg)] border border-[var(--pw-border)] hover:bg-[var(--pw-surface)] transition-colors"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSelectingTarget(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-dashed border-[var(--pw-border)] text-[var(--pw-text-dim)] hover:text-white hover:border-[var(--pw-blue)] hover:bg-[var(--pw-blue)]/5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Select Target Pal
            </button>
          )}
        </div>
      </div>

      {/* Owned Pals Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4 text-white">2. Your Breeding Box</h2>
        <p className="text-sm text-[var(--pw-text-muted)] mb-4">
          Add the Pals you currently own. The calculator will find the shortest path from these Pals to your target.
        </p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {ownedPals.map((pal) => (
            <div 
              key={pal.id}
              className="flex items-center gap-2 pr-2 pl-1.5 py-1.5 rounded-full border border-[var(--pw-border)] bg-[var(--pw-surface)]"
            >
              <PalAvatar pal={pal} className="w-6 h-6 rounded-full" sizes="24px" />
              <span className="text-xs font-medium">{pal.name}</span>
              <button 
                onClick={() => handleRemoveOwned(pal.id)}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[var(--pw-text-dim)] hover:bg-red-500/20 hover:text-red-400 transition-colors ml-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          
          <button
            onClick={() => setIsSelectingOwned(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-dashed border-[var(--pw-border)] text-[var(--pw-text-dim)] text-xs hover:text-white hover:border-[var(--pw-blue)] hover:bg-[var(--pw-blue)]/5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Owned Pal
          </button>
        </div>
        
        {ownedPals.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setOwnedPals([])}
              className="text-xs text-[var(--pw-text-dim)] hover:text-red-400 transition-colors underline underline-offset-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCalculate}
          disabled={!targetPal || ownedPals.length === 0 || isCalculating}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[var(--pw-blue)] rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Calculating Shortest Path...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Find Shortest Breeding Chain
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {chainResult && targetPal && (
        <div className="glass-card p-6 mt-8">
          <h2 className="text-xl font-bold mb-6 text-white text-center">Shortest Breeding Route</h2>
          <ChainViewer chain={chainResult} targetName={targetPal.name} />
        </div>
      )}

      {/* Selectors */}
      <PalSelector
        isOpen={isSelectingTarget}
        onClose={() => setIsSelectingTarget(false)}
        onSelect={setTargetPal}
      />
      
      <PalSelector
        isOpen={isSelectingOwned}
        onClose={() => setIsSelectingOwned(false)}
        onSelect={handleAddOwned}
      />
    </div>
  );
}
