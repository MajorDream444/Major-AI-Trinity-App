import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { addJournalEntry, loadProgress } from "../lib/progress";

export default function Journal() {
  const [text, setText] = useState("");
  const [state, setState] = useState(() => loadProgress());

  return (
    <Layout title="Journal">
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
            onClick={() => {
              if (!text.trim()) return;
              setState(addJournalEntry(text.trim()));
              setText("");
            }}
          >
            Save Entry
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {state.journal.map((j, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 p-4">
            <div className="text-xs text-white/60">{j.date}</div>
            <div className="text-sm whitespace-pre-wrap mt-2">{j.text}</div>
          </div>
        ))}
        {state.journal.length === 0 ? <div className="text-sm text-white/60">No entries yet.</div> : null}
      </div>
    </Layout>
  );
}
