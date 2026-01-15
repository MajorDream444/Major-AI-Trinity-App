import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { getPillars } from "@trinity/core";
import { PillarCard } from "../components/PillarCard";
import { useAuth } from "../lib/useAuth";
import { ensureUserDoc, getProgress, setProgress } from "../lib/store";

type Domain = "life" | "money" | "tech";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [domain, setDomain] = useState<Domain>("life");
  const pillars = useMemo(() => getPillars(domain), [domain]);

  const [completed, setCompleted] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      await ensureUserDoc(user.uid);
      const p = await getProgress(user.uid);
      setCompleted(p.completed || []);
    };
    load();
  }, [user]);

  async function toggle(id: string) {
    if (!user) return;
    setBusy(true);
    const next = completed.includes(id) ? completed.filter((x) => x !== id) : [...completed, id];
    setCompleted(next);
    await setProgress(user.uid, next);
    setBusy(false);
  }

  if (loading) return <Layout title="Dashboard">Loading…</Layout>;
  if (!user)
    return (
      <Layout title="Dashboard">
        <div className="text-white/70 mb-3">Login required for cloud sync.</div>
        <Link className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" href="/login">
          Go to Login
        </Link>
      </Layout>
    );

  return (
    <Layout title="Dashboard (Synced)">
      <div className="flex gap-2 mb-6">
        {(["life", "money", "tech"] as Domain[]).map((d) => (
          <button
            key={d}
            className={`px-3 py-2 rounded-xl border ${
              domain === d ? "border-white/40" : "border-white/15 hover:border-white/30"
            }`}
            onClick={() => setDomain(d)}
          >
            {d.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="text-sm text-white/60 mb-4">
        Completed: {completed.length} / 30 {busy ? "· saving…" : ""}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {pillars.map((p) => (
          <div key={p.id} className="relative">
            <PillarCard pillar={p} onToggle={() => toggle(p.id)} />
            <div className="absolute top-3 right-3 text-xs">{completed.includes(p.id) ? "✅" : "⬜️"}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
