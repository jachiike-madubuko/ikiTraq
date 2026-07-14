"use client";

import { Check } from "lucide-react";
import { PHASES, RITUALS } from "@/lib/data";
import { useStore, ritualsForDay } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { todayKey, formatLongDate } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/progress-ring";

export default function RitualsPage() {
  const hydrated = useHydrated();
  const { completions, toggleRitual } = useStore();
  const done = new Set(hydrated ? completions[todayKey()] ?? [] : []);
  const summary = ritualsForDay(completions);

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center animate-in-up">
        <div>
          <p className="text-sm text-muted">{formatLongDate()}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Today&apos;s rituals
          </h1>
          <p className="mt-2 text-muted">Small, deliberate reps. Move through your day with intention.</p>
        </div>
        <ProgressRing value={hydrated ? summary.pct : 0} size={96} stroke={9}>
          <span className="font-display text-lg font-semibold">{hydrated ? summary.count : 0}</span>
          <span className="text-[11px] text-subtle">of {summary.total}</span>
        </ProgressRing>
      </header>

      <div className="space-y-6">
        {PHASES.map((phase) => {
          const phaseRituals = RITUALS.filter((r) => r.phase === phase.key);
          const phaseDone = phaseRituals.filter((r) => done.has(r.id)).length;
          return (
            <section key={phase.key} className="card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-app px-6 py-4">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `color-mix(in oklab, ${phase.accent} 16%, transparent)`, color: phase.accent }}
                >
                  <phase.icon size={20} />
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-semibold">{phase.label}</h2>
                  <p className="text-xs text-subtle">{phase.tagline}</p>
                </div>
                <span className="text-sm font-medium text-muted">
                  {hydrated ? phaseDone : 0}/{phaseRituals.length}
                </span>
              </div>

              <ul className="divide-y divide-[var(--border)]">
                {phaseRituals.map((r) => {
                  const isDone = done.has(r.id);
                  return (
                    <li key={r.id}>
                      <button
                        onClick={() => toggleRitual(r.id)}
                        className="group flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-app"
                      >
                        <span
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                          style={{
                            borderColor: isDone ? phase.accent : "var(--border-strong)",
                            backgroundColor: isDone ? phase.accent : "transparent",
                            color: isDone ? "#fff" : "transparent",
                          }}
                        >
                          <Check size={15} />
                        </span>
                        <span className="flex-1">
                          <span
                            className={`block text-sm font-medium transition-colors ${
                              isDone ? "text-subtle line-through" : "text-fg"
                            }`}
                          >
                            {r.label}
                          </span>
                          <span className="block text-xs text-subtle">{r.detail}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
