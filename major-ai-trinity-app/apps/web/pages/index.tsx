import React from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { agentPersonas } from "@trinity/core";

export default function Home() {
  return (
    <Layout title="30 Pillars · 3 Agents · 1 Movement">
      <div className="grid md:grid-cols-3 gap-4">
        {agentPersonas.map(a => (
          <div key={a.id} className="rounded-2xl border border-white/10 p-4">
            <div className="text-sm font-semibold">{a.name}</div>
            <div className="text-xs text-white/60">{a.archetype}</div>
            <div className="text-sm text-white/75 mt-2">{a.voice}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" href="/dashboard">Dashboard</Link>
        <Link className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" href="/agent-chat">Agent Chat</Link>
        <Link className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30" href="/journal">Journal</Link>
      </div>
    </Layout>
  );
}
