import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { agentPersonas } from "@trinity/core";
import { useAuth } from "../lib/useAuth";
import { createThread, addChatMessage, listChatMessages } from "../lib/store";

type AgentKey = "PILLAR" | "COME_UP" | "CODEX";

export default function AgentChat() {
  const { user, loading } = useAuth();

  const [agentId, setAgentId] = useState<AgentKey>("PILLAR");
  const agent = useMemo(() => agentPersonas.find((a) => a.id === agentId)!, [agentId]);

  const [threadId, setThreadId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    const init = async () => {
      const tid = await createThread(user.uid, agentId);
      setThreadId(tid);
      setLog([
        { role: "assistant", text: `I’m ${agent.name}. Tell me what you’re working on today, and I’ll give you one Major Move.` },
      ]);
    };
    init();
  }, [user, agentId, agent.name]);

  async function hydrate() {
    if (!user || !threadId) return;
    const msgs = await listChatMessages(user.uid, threadId, 50);
    setLog(msgs.map((m) => ({ role: m.role, text: m.text })));
  }

  async function send() {
    if (!user || !threadId || !msg.trim()) return;
    setBusy(true);

    const userText = msg.trim();
    setMsg("");

    const nextLog = [...log, { role: "user" as const, text: userText }];
    setLog(nextLog);

    await addChatMessage(user.uid, threadId, { role: "user", text: userText });

    const recent = nextLog.slice(-8);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId, userMessage: userText, recent }),
    });
    const data = await response.json();
    const assistantText = (data?.text || "Say that again?").toString();

    await addChatMessage(user.uid, threadId, { role: "assistant", text: assistantText });
    await hydrate();
    setBusy(false);
  }

  if (loading) return <Layout title="Agent Chat">Loading…</Layout>;
  if (!user)
    return (
      <Layout title="Agent Chat">
        <div className="text-white/70 mb-3">Login required for chat history + sync.</div>
        <Link className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" href="/login">
          Go to Login
        </Link>
      </Layout>
    );

  return (
    <Layout title="Agent Chat (LLM + Synced)">
      <div className="flex gap-2 mb-4">
        {agentPersonas.map((a) => (
          <button
            key={a.id}
            className={`px-3 py-2 rounded-xl border ${
              agentId === a.id ? "border-white/40" : "border-white/15 hover:border-white/30"
            }`}
            onClick={() => {
              setAgentId(a.id as AgentKey);
              setThreadId(null);
              setLog([]);
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 p-4 h-[420px] overflow-auto bg-white/5">
        {log.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : ""}`}>
            <div
              className={`inline-block max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                m.role === "user" ? "bg-white/10" : "bg-black border border-white/10"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type what you need help with…"
        />
        <button
          className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30"
          onClick={send}
          disabled={busy}
        >
          {busy ? "Thinking…" : "Send"}
        </button>
      </div>
    </Layout>
  );
}
