"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { PILLARS, type Pillar } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { IkigaiVenn } from "@/components/app/ikigai-venn";

export default function IkigaiPage() {
  const hydrated = useHydrated();
  const { ikigai, addIkigai, removeIkigai } = useStore();
  const [active, setActive] = useState<Pillar>("love");
  const [draft, setDraft] = useState("");

  const meta = PILLARS.find((p) => p.key === active)!;
  const items = hydrated ? ikigai.filter((i) => i.pillar === active) : [];

  const submit = () => {
    const t = draft.trim();
    if (!t) return;
    addIkigai(active, t);
    setDraft("");
  };

  return (
    <div className="space-y-8">
      <header className="animate-in-up">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Your ikigai map</h1>
        <p className="mt-2 max-w-xl text-muted text-balance">
          Answer honestly across the four pillars. Where your answers overlap, your reason for being
          comes into focus.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: pillar editor */}
        <div className="lg:col-span-3">
          {/* Pillar tabs */}
          <div className="flex flex-wrap gap-2">
            {PILLARS.map((p) => {
              const on = p.key === active;
              const count = hydrated ? ikigai.filter((i) => i.pillar === p.key).length : 0;
              return (
                <button
                  key={p.key}
                  onClick={() => setActive(p.key)}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    borderColor: on ? p.color : "var(--border)",
                    backgroundColor: on ? `color-mix(in oklab, ${p.color} 14%, transparent)` : "transparent",
                    color: on ? p.color : "var(--fg-muted)",
                  }}
                >
                  <p.icon size={16} />
                  {p.label}
                  {count > 0 && <span className="text-xs opacity-70">· {count}</span>}
                </button>
              );
            })}
          </div>

          {/* Active pillar card */}
          <div className="card mt-5 p-6">
            <h2 className="font-display text-xl font-semibold" style={{ color: meta.color }}>
              {meta.question}
            </h2>

            {/* Prompts */}
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setDraft(prompt.replace(/\?$/, "") + ": ")}
                  className="rounded-full border border-app px-3 py-1.5 text-xs text-muted transition-colors hover:border-strong hover:text-fg"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="mt-5 flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder={`Add something to "${meta.label.toLowerCase()}"…`}
                className="ring-focus h-11 flex-1 rounded-xl border border-app bg-app px-4 text-sm outline-none placeholder:text-subtle"
              />
              <button
                onClick={submit}
                className="ring-focus inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: meta.color }}
                aria-label="Add"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Items */}
            <ul className="mt-5 space-y-2">
              {hydrated && items.length === 0 && (
                <li className="rounded-xl border border-dashed border-app p-4 text-sm text-subtle">
                  Nothing here yet. Tap a prompt above to get unstuck.
                </li>
              )}
              {items.map((i) => (
                <li
                  key={i.id}
                  className="group flex items-center gap-3 rounded-xl border border-app bg-app px-4 py-3"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="flex-1 text-sm">{i.text}</span>
                  <button
                    onClick={() => removeIkigai(i.id)}
                    className="text-subtle opacity-0 transition-opacity hover:text-[var(--color-love)] group-hover:opacity-100"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: live venn */}
        <div className="lg:col-span-2">
          <div className="card sticky top-6 flex flex-col items-center p-6">
            <IkigaiVenn size={300} />
            <p className="mt-4 text-center text-sm text-muted text-balance">
              {hydrated ? ikigai.length : 0} reflections mapped. Keep going — clarity compounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
