"use client";

import Link from "next/link";
import { Flame, Compass, ArrowRight, Check } from "lucide-react";
import { useStore, ritualsForDay, currentStreak, weeklyActivity } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { PILLARS, PHASES, RITUALS } from "@/lib/data";
import { ProgressRing } from "@/components/ui/progress-ring";
import { greeting, formatLongDate, todayKey } from "@/lib/utils";

export default function DashboardPage() {
  const hydrated = useHydrated();
  const { name, completions, ikigai, toggleRitual, journal } = useStore();

  const today = ritualsForDay(completions);
  const streak = currentStreak(completions);
  const week = weeklyActivity(completions);
  const doneToday = new Set(completions[todayKey()] ?? []);

  // Next few undone rituals to nudge the user.
  const upNext = RITUALS.filter((r) => !doneToday.has(r.id)).slice(0, 4);

  return (
    <div className="space-y-8">
      <header className="animate-in-up">
        <p className="text-sm text-muted">{formatLongDate()}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {greeting()}
          {name ? `, ${name}` : ""}.
        </h1>
        <p className="mt-2 text-muted">Here&apos;s where you stand today.</p>
      </header>

      {/* Stat row */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card flex items-center gap-5 p-6">
          <ProgressRing value={hydrated ? today.pct : 0} size={92} stroke={9}>
            <span className="font-display text-xl font-semibold">
              {hydrated ? today.pct : 0}%
            </span>
          </ProgressRing>
          <div>
            <p className="text-sm text-muted">Today&apos;s rituals</p>
            <p className="font-display text-2xl font-semibold">
              {hydrated ? today.count : 0}
              <span className="text-lg text-subtle">/{today.total}</span>
            </p>
          </div>
        </div>

        <div className="card flex flex-col justify-between p-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Flame size={16} className="text-[var(--color-ember-500)]" /> Current streak
          </div>
          <p className="font-display text-4xl font-semibold">
            {hydrated ? streak : 0}
            <span className="ml-1 text-lg text-subtle">{streak === 1 ? "day" : "days"}</span>
          </p>
        </div>

        <div className="card flex flex-col justify-between p-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Compass size={16} className="text-[var(--color-need)]" /> Ikigai entries
          </div>
          <p className="font-display text-4xl font-semibold">{hydrated ? ikigai.length : 0}</p>
        </div>
      </section>

      {/* Weekly activity */}
      <section className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">This week</h2>
          <span className="text-xs text-subtle">Rituals completed per day</span>
        </div>
        <div className="mt-6 flex items-end justify-between gap-3" style={{ height: 120 }}>
          {week.map((d) => {
            const pct = hydrated ? Math.round((d.count / d.total) * 100) : 0;
            const label = new Date(d.date + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" });
            const isToday = d.date === todayKey();
            return (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end justify-center">
                  <div
                    className="w-full max-w-9 rounded-lg bg-[var(--color-ember-500)] transition-all duration-500"
                    style={{ height: `${Math.max(6, pct)}%`, opacity: pct === 0 ? 0.15 : 0.4 + (pct / 100) * 0.6 }}
                    title={`${d.count}/${d.total}`}
                  />
                </div>
                <span className={`text-xs ${isToday ? "font-semibold text-fg" : "text-subtle"}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Up next + Ikigai snapshot */}
      <section className="grid gap-4 lg:grid-cols-5">
        <div className="card p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Up next</h2>
            <Link href="/rituals" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
              All rituals <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {hydrated && upNext.length === 0 && (
              <li className="rounded-xl border border-app p-4 text-sm text-muted">
                🎉 Every ritual is done. Beautiful work — go rest.
              </li>
            )}
            {(hydrated ? upNext : RITUALS.slice(0, 4)).map((r) => {
              const phase = PHASES.find((p) => p.key === r.phase)!;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => toggleRitual(r.id)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-app p-3 text-left transition-colors hover:border-strong hover:bg-app"
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-strong text-transparent transition-colors group-hover:border-[var(--color-ember-500)] group-hover:text-[var(--color-ember-500)]">
                      <Check size={14} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{r.label}</span>
                      <span className="block text-xs text-subtle">{r.detail}</span>
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ backgroundColor: `color-mix(in oklab, ${phase.accent} 15%, transparent)`, color: phase.accent }}
                    >
                      {phase.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Your ikigai</h2>
            <Link href="/ikigai" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
              Edit <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {PILLARS.map((p) => {
              const count = hydrated ? ikigai.filter((i) => i.pillar === p.key).length : 0;
              return (
                <div key={p.key} className="flex items-center gap-3">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `color-mix(in oklab, ${p.color} 16%, transparent)`, color: p.color }}
                  >
                    <p.icon size={16} />
                  </span>
                  <span className="flex-1 text-sm">{p.label}</span>
                  <span className="text-sm font-semibold text-muted">{count}</span>
                </div>
              );
            })}
          </div>
          {hydrated && journal.length > 0 && (
            <p className="mt-5 border-t border-app pt-4 text-xs text-subtle">
              {journal.length} journal {journal.length === 1 ? "entry" : "entries"} written.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
