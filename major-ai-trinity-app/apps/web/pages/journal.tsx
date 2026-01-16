import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { useAuth } from "../lib/useAuth";
import { addJournal, listJournal } from "../lib/store";

export default function Journal() {
  const { user, loading } = useAuth();
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<{ id: string; text: string; createdAt?: unknown }[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const e = await listJournal(user.uid, 50);
      setEntries(e);
    };
    load();
  }, [user]);

  async function save() {
    if (!user || !text.trim()) return;
    setBusy(true);
    await addJournal(user.uid, text.trim());
    setText("");
    const e = await listJournal(user.uid, 50);
    setEntries(e);
    setBusy(false);
  }

  if (loading) return <Layout title="Journal">Loading…</Layout>;
  if (!user)
    return (
      <Layout title="Journal">
        <div className="text-white/70 mb-3">Login required for cloud journal sync.</div>
        <Link className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" href="/login">
          Go to Login
        </Link>
      </Layout>
    );

  return (
    <Layout title="Journal (Synced)">
      <div className="rounded-2xl border border-white/10 p-4">
        <textarea
          className="w-full min-h-[140px] rounded-xl bg-white/5 border border-white/10 p-3 text-sm outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reflection…"
        />
        <div className="mt-3 flex justify-end">
          <button
            className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30"
            onClick={save}
            disabled={busy}
          >
            {busy ? "Saving…" : "Save Entry"}
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {entries.map((j) => (
          <div key={j.id} className="rounded-2xl border border-white/10 p-4">
            <div className="text-sm whitespace-pre-wrap">{j.text}</div>
          </div>
        ))}
        {entries.length === 0 ? <div className="text-sm text-white/60">No entries yet.</div> : null}
      </div>
    </Layout>
  );
}
