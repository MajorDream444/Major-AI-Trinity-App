export type PillarDomain = "life" | "money" | "tech";
export type AgentId = "PILLAR" | "COME_UP" | "CODEX";

export type Pillar = {
  id: string;                // e.g. life-01
  domain: PillarDomain;
  number: number;            // 1..10 inside domain
  name: string;
  tagline: string;
  reflectionPrompt: string;
  majorMove: string;
};

export type AgentPersona = {
  id: AgentId;
  name: string;
  domain: PillarDomain;
  archetype: string;
  voice: string;
  do: string[];
  dont: string[];
  systemPrompt: string;
};
