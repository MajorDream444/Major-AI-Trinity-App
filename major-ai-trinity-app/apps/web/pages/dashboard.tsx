import React, { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { getPillars } from "@trinity/core";
import { PillarCard } from "../components/PillarCard";
import { loadProgress, toggleComplete } from "../lib/progress";

type Domain = "life" | "money" | "tech";

export default function Dashboard() {
  const [domain, setDomain] = useState<Domain>("life");
  const pillars = useMemo(() => getPillars(domain), [domain]);
  const [progress, setProgress] = useState(() => loadProgress());

  return (
    <Layout title="Dashboard">
      <div className="flex gap-2 mb-6">
        {(["life","money","tech"] as Domain[]).map(d => (
          <button
            key={d}
            className={`px-3 py-2 rounded-xl border ${domain===d ? "border-white/40" : "border-white/15 hover:border-white/30"}`}
            onClick={() => setDomain(d)}
          >
            {d.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="text-sm text-white/60 mb-4">Completed: {progress.completed.length} / 30</div>

      <div className="grid md:grid-cols-2 gap-4">
        {pillars.map(p => (
          <div key={p.id} className="relative">
            <PillarCard pillar={p} onToggle={() => setProgress(toggleComplete(p.id))} />
            <div className="absolute top-3 right-3 text-xs">
              {progress.completed.includes(p.id) ? "✅" : "⬜️"}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
