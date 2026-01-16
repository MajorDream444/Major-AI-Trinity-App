const KEY = "trinity.progress.v1";
export type ProgressState = { completed: string[]; journal: { date: string; text: string }[] };

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return { completed: [], journal: [] };
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { completed: [], journal: [] };
  try { return JSON.parse(raw); } catch { return { completed: [], journal: [] }; }
}

export function saveProgress(state: ProgressState) {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function toggleComplete(pillarId: string): ProgressState {
  const s = loadProgress();
  s.completed = s.completed.includes(pillarId) ? s.completed.filter(x => x !== pillarId) : [...s.completed, pillarId];
  saveProgress(s);
  return s;
}

export function addJournalEntry(text: string): ProgressState {
  const s = loadProgress();
  const date = new Date().toISOString().slice(0,10);
  s.journal = [{ date, text }, ...s.journal].slice(0, 100);
  saveProgress(s);
  return s;
}
