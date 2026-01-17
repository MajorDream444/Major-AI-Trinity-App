import life from "./data/lifePillars.json";
import money from "./data/moneyPillars.json";
import tech from "./data/techPillars.json";
import type { Pillar, PillarDomain } from "./types";

export const pillarsByDomain: Record<PillarDomain, Pillar[]> = {
  life: life as Pillar[],
  money: money as Pillar[],
  tech: tech as Pillar[]
};

export function getPillars(domain: PillarDomain): Pillar[] {
  return pillarsByDomain[domain];
}

export function getPillarById(id: string): Pillar | undefined {
  const all = [...pillarsByDomain.life, ...pillarsByDomain.money, ...pillarsByDomain.tech];
  return all.find(p => p.id === id);
}
