import React, { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { agentPersonas, getPillars } from "@trinity/core";

type AgentKey = "PILLAR" | "COME_UP" | "CODEX";

export default function AgentChat() {
  const [agentId, setAgentId] = useState<AgentKey>("PILLAR");
  const agent = useMemo(() => agentPersonas.find(a => a.id === agentId)!, [agentId]);
  const pillars = useMemo(() => getPillars(agent.domain), [agent.domain]);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<{ role: "user"|"agent"; text: string }[]>([
    { role: "agent", text: `I’m ${agent.name}. Tell me what you’re working on today, and I’ll give you one Major Move.` }
  ]);

  function send() {
    if (!msg.trim()) return;
    const userText = msg.trim();
    setMsg("");
    const suggestion = pillars[Math.floor(Math.random()*pillars.length)];
    const agentText = `${suggestion.name}: ${suggestion.majorMove}\n\nReflection: ${suggestion.reflectionPrompt}`;
    setLog(l => [...l, { role:"user", text: userText }, { role:"agent", text: agentText }]);
  }

  return (
    <Layout title="Agent Chat (MVP — no API)">
      <div className="flex gap-2 mb-4">
        {agentPersonas.map(a => (
          <button
            key={a.id}
            className={`px-3 py-2 rounded-xl border ${agentId===a.id ? "border-white/40" : "border-white/15 hover:border-white/30"}`}
            onClick={() => {
              setAgentId(a.id as AgentKey);
              setLog([{ role:"agent", text: `I’m ${a.name}. Tell me what you’re working on today, and I’ll give you one Major Move.` }]);
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 p-4 h-[420px] overflow-auto bg-white/5">
        {log.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role==="user" ? "text-right" : ""}`}>
            <div className={`inline-block max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
              m.role==="user" ? "bg-white/10" : "bg-black border border-white/10"
            }`}>
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
        <button className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" onClick={send}>
          Send
        </button>
      </div>
    </Layout>
  );
}
