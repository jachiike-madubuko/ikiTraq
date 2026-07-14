"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pillar } from "./data";
import { RITUALS } from "./data";
import { todayKey, lastNDays } from "./utils";

export interface IkigaiItem {
  id: string;
  pillar: Pillar;
  text: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  mood: number;
  createdAt: number;
}

interface State {
  name: string;
  ikigai: IkigaiItem[];
  /** completions[dateKey] = array of ritual ids done that day */
  completions: Record<string, string[]>;
  journal: JournalEntry[];

  setName: (name: string) => void;
  addIkigai: (pillar: Pillar, text: string) => void;
  removeIkigai: (id: string) => void;
  toggleRitual: (ritualId: string, date?: string) => void;
  addJournal: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  removeJournal: (id: string) => void;
  reset: () => void;
}

const seedIkigai: IkigaiItem[] = [
  { id: "s1", pillar: "love", text: "Designing calm, human software" },
  { id: "s2", pillar: "skill", text: "Turning fuzzy ideas into shipped products" },
  { id: "s3", pillar: "need", text: "Tools that help people live deliberately" },
  { id: "s4", pillar: "paid", text: "Building for founders who care about craft" },
];

export const useStore = create<State>()(
  persist(
    (set) => ({
      name: "",
      ikigai: seedIkigai,
      completions: {},
      journal: [],

      setName: (name) => set({ name }),

      addIkigai: (pillar, text) =>
        set((s) => ({
          ikigai: [
            ...s.ikigai,
            { id: crypto.randomUUID(), pillar, text: text.trim() },
          ],
        })),

      removeIkigai: (id) =>
        set((s) => ({ ikigai: s.ikigai.filter((i) => i.id !== id) })),

      toggleRitual: (ritualId, date = todayKey()) =>
        set((s) => {
          const done = new Set(s.completions[date] ?? []);
          if (done.has(ritualId)) done.delete(ritualId);
          else done.add(ritualId);
          return {
            completions: { ...s.completions, [date]: Array.from(done) },
          };
        }),

      addJournal: (entry) =>
        set((s) => ({
          journal: [
            { ...entry, id: crypto.randomUUID(), createdAt: Date.now() },
            ...s.journal,
          ],
        })),

      removeJournal: (id) =>
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),

      reset: () =>
        set({ name: "", ikigai: seedIkigai, completions: {}, journal: [] }),
    }),
    { name: "ikitraq-store", version: 1 },
  ),
);

/* --------------------------- derived helpers --------------------------- */

export function ritualsForDay(completions: Record<string, string[]>, date = todayKey()) {
  const done = completions[date] ?? [];
  return {
    done,
    total: RITUALS.length,
    count: done.length,
    pct: Math.round((done.length / RITUALS.length) * 100),
  };
}

/** Current consecutive-day streak: any day with >=1 completion counts. */
export function currentStreak(completions: Record<string, string[]>): number {
  let streak = 0;
  const days = lastNDays(365).reverse(); // today first
  for (const d of days) {
    if ((completions[d]?.length ?? 0) > 0) streak++;
    else break;
  }
  return streak;
}

export function weeklyActivity(completions: Record<string, string[]>) {
  return lastNDays(7).map((d) => ({
    date: d,
    count: completions[d]?.length ?? 0,
    total: RITUALS.length,
  }));
}
