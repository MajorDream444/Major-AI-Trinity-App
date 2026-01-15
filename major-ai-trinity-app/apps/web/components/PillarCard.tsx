import React from "react";
import type { Pillar } from "@trinity/core";

export function PillarCard({ pillar, onToggle }: { pillar: Pillar; onToggle?: (id: string) => void }) {
  return (
    <button
      className="text-left w-full rounded-2xl border border-white/10 p-4 hover:border-white/25 transition"
      onClick={() => onToggle?.(pillar.id)}
    >
      <div className="text-xs text-white/60">{pillar.domain.toUpperCase()} · #{pillar.number}</div>
      <div className="text-lg font-semibold mt-1">{pillar.name}</div>
      <div className="text-sm text-white/70 mt-1">{pillar.tagline}</div>
      <div className="text-sm mt-3 text-white/80">{pillar.majorMove}</div>
    </button>
  );
}
