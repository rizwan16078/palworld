import { PASSIVE_SKILLS, type PassiveSkill } from "@/lib/passives";

interface PassiveSelectorProps {
  label: string;
  selectedPassives: string[];
  onChange: (passives: string[]) => void;
}

export default function PassiveSelector({ label, selectedPassives, onChange }: PassiveSelectorProps) {
  const handleToggle = (id: string) => {
    if (selectedPassives.includes(id)) {
      onChange(selectedPassives.filter((p) => p !== id));
    } else {
      if (selectedPassives.length < 4) {
        onChange([...selectedPassives, id]);
      }
    }
  };

  return (
    <div className="mt-4 w-full text-left">
      <div className="text-xs font-semibold uppercase tracking-widest text-[var(--pw-text-dim)] mb-2">
        {label} Passives ({selectedPassives.length}/4)
      </div>
      <div className="flex flex-wrap gap-1.5">
        {selectedPassives.map((id) => {
          const passive = PASSIVE_SKILLS.find((p) => p.id === id);
          if (!passive) return null;
          return (
            <button
              key={id}
              onClick={() => handleToggle(id)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[var(--pw-yellow)] bg-[var(--pw-yellow)]/10 text-[0.65rem] font-medium text-[var(--pw-yellow)] hover:bg-[var(--pw-yellow)]/20 transition-colors"
            >
              {passive.name} <span className="opacity-50">×</span>
            </button>
          );
        })}
        {selectedPassives.length < 4 && (
          <div className="relative group inline-block">
            <select
              className="appearance-none bg-[var(--pw-surface)] border border-[var(--pw-border)] text-[0.65rem] font-medium text-[var(--pw-text-muted)] rounded px-2 py-1 pr-6 hover:border-[var(--pw-border-hover)] focus:outline-none focus:border-[var(--pw-blue)] cursor-pointer"
              value=""
              onChange={(e) => handleToggle(e.target.value)}
            >
              <option value="" disabled>+ Add Passive</option>
              {PASSIVE_SKILLS.map((p) => (
                <option key={p.id} value={p.id} disabled={selectedPassives.includes(p.id)}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-[var(--pw-text-dim)]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
