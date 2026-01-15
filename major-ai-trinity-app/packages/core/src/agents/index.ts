import agents from "./agents.json";
import type { AgentId, AgentPersona } from "../types";

export const agentPersonas = agents as AgentPersona[];

export function getAgent(id: AgentId): AgentPersona {
  const found = agentPersonas.find(a => a.id === id);
  if (!found) throw new Error(`Unknown agent: ${id}`);
  return found;
}
