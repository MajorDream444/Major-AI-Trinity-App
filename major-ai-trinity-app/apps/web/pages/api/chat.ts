import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { getAgent, getPillars } from "@trinity/core";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ReqBody = {
  agentId: "PILLAR" | "COME_UP" | "CODEX";
  userMessage: string;
  pillarId?: string;
  recent?: { role: "user" | "assistant"; text: string }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { agentId, userMessage, pillarId, recent = [] } = req.body as ReqBody;
    if (!agentId || !userMessage) return res.status(400).json({ error: "Missing agentId or userMessage" });

    const agent = getAgent(agentId);
    const pillars = getPillars(agent.domain);
    const pillar = pillarId ? pillars.find((p) => p.id === pillarId) : undefined;

    const pillarContext = pillar
      ? `Pillar focus today:
Name: ${pillar.name}
Tagline: ${pillar.tagline}
Reflection Prompt: ${pillar.reflectionPrompt}
Major Move: ${pillar.majorMove}`
      : `Available pillars in this domain: ${pillars.map((p) => `${p.number}. ${p.name}`).join(" | ")}`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: agent.systemPrompt },
      { role: "system", content: pillarContext },
      ...recent.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
      { role: "user", content: userMessage },
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.6,
      max_tokens: 400,
    });

    const text = completion.choices[0]?.message?.content?.trim() || "I’m here. Tell me what you need next.";
    return res.status(200).json({ text });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
}
