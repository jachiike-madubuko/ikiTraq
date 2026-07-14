"use client";

import { useState } from "react";
import { PenLine, Trash2 } from "lucide-react";
import { JOURNAL_MOODS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { todayKey, wordCount } from "@/lib/utils";

export default function JournalPage() {
  const hydrated = useHydrated();
  const { journal, addJournal, removeJournal } = useStore();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(3);

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addJournal({ date: todayKey(), title: title.trim() || "Untitled", body: body.trim(), mood });
    setTitle("");
    setBody("");
    setMood(3);
  };

  return (
    <div className="space-y-8">
      <header className="animate-in-up">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Journal</h1>
        <p className="mt-2 text-muted">Capture the highlights. Rate the day. Notice the patterns.</p>
      </header>

      {/* Composer */}
      <section className="card p-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="So what had happened was…"
          className="ring-focus w-full rounded-xl border border-app bg-app px-4 py-3 font-display text-lg outline-none placeholder:text-subtle"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Why was it dope? What did you learn? What would you refine tomorrow?"
          rows={5}
          className="ring-focus mt-3 w-full resize-y rounded-xl border border-app bg-app px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-subtle"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {JOURNAL_MOODS.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                title={m.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all"
                style={{
                  borderColor: mood === m.value ? "var(--color-ember-500)" : "var(--border)",
                  backgroundColor: mood === m.value ? "var(--color-ember-50)" : "transparent",
                  transform: mood === m.value ? "scale(1.1)" : "none",
                }}
              >
                {m.emoji}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-subtle">{wordCount(body)} words</span>
            <button
              onClick={save}
              disabled={!canSave}
              className="ring-focus inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-ember-500)] px-5 text-sm font-medium text-white transition-all hover:bg-[var(--color-ember-600)] disabled:opacity-40"
            >
              <PenLine size={16} /> Save entry
            </button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        {hydrated && journal.length === 0 && (
          <div className="card p-10 text-center">
            <p className="font-display text-lg font-semibold">No entries yet</p>
            <p className="mt-1 text-sm text-muted">Your reflections will gather here, newest first.</p>
          </div>
        )}
        {(hydrated ? journal : []).map((entry) => {
          const m = JOURNAL_MOODS.find((x) => x.value === entry.mood);
          return (
            <article key={entry.id} className="card group p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m?.emoji}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{entry.title}</h3>
                    <p className="text-xs text-subtle">
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" · "}
                      {m?.label}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeJournal(entry.id)}
                  className="text-subtle opacity-0 transition-opacity hover:text-[var(--color-love)] group-hover:opacity-100"
                  aria-label="Delete entry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {entry.body && (
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">{entry.body}</p>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
