import Link from "next/link";
import {
  ArrowRight,
  Compass,
  ListChecks,
  BookOpen,
  Flame,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/app/logo";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IkigaiVenn } from "@/components/app/ikigai-venn";
import { PILLARS } from "@/lib/data";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-app text-fg">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-app bg-app/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#pillars" className="hover:text-fg transition-colors">The four pillars</a>
            <a href="#how" className="hover:text-fg transition-colors">How it works</a>
            <a href="#features" className="hover:text-fg transition-colors">Features</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ButtonLink href="/dashboard" size="sm">Open app</ButtonLink>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--color-ember-500)] opacity-[0.08] blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <div className="animate-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-app bg-raised px-3 py-1 text-xs font-medium text-muted">
              <Sparkles size={13} className="text-[var(--color-ember-500)]" />
              A calmer way to live on purpose
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
              Find your <span className="text-[var(--color-ember-500)]">ikigai</span>, then live it daily.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted text-balance">
              ikiTraq guides you to your reason for being — the meeting point of what you love,
              what you&apos;re good at, what the world needs, and what you can be paid for — and
              turns it into small daily rituals you&apos;ll actually keep.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/dashboard" size="lg">
                Start your map <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="/ikigai" size="lg" variant="outline">
                Explore the four pillars
              </ButtonLink>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-subtle">
              <ShieldCheck size={15} /> Runs entirely in your browser. No account, no tracking.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="animate-float">
              <IkigaiVenn size={380} />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Four questions. One purpose.
          </h2>
          <p className="mt-4 text-muted text-balance">
            Ikigai is the Japanese art of finding your reason for being. It lives where four
            honest answers overlap.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.key} className="card group p-6 transition-transform duration-300 hover:-translate-y-1">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `color-mix(in oklab, ${p.color} 16%, transparent)`, color: p.color }}
              >
                <p.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.label}</h3>
              <p className="mt-1.5 text-sm text-muted">{p.question}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-app bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Discover it once. Practice it every day.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Compass, title: "Discover", body: "Answer guided prompts across the four pillars and watch your ikigai map take shape." },
              { icon: ListChecks, title: "Practice", body: "Move through morning, grind, and night rituals. Small, deliberate reps that compound." },
              { icon: BookOpen, title: "Reflect", body: "Journal the highlights, rate the day, and build a streak you're proud of." },
            ].map((s, i) => (
              <div key={s.title} className="relative">
                <span className="font-display text-5xl font-semibold text-subtle/40">0{i + 1}</span>
                <s.icon size={22} className="mt-4 text-[var(--color-ember-500)]" />
                <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card flex flex-col justify-between gap-6 p-8 md:col-span-2">
            <div>
              <Flame className="text-[var(--color-ember-500)]" />
              <h3 className="mt-4 font-display text-2xl font-semibold">Build an unbreakable streak</h3>
              <p className="mt-2 max-w-md text-muted">
                Every ritual you complete feeds a live streak and a weekly activity view, so
                momentum is always visible — and hard to give up.
              </p>
            </div>
            <div className="flex items-end gap-1.5">
              {[40, 65, 30, 80, 55, 95, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-md bg-[var(--color-ember-500)]"
                  style={{ height: `${h}px`, opacity: 0.35 + (h / 100) * 0.65 }}
                />
              ))}
            </div>
          </div>
          <div className="card p-8">
            <ShieldCheck className="text-[var(--color-need)]" />
            <h3 className="mt-4 font-display text-2xl font-semibold">Yours alone</h3>
            <p className="mt-2 text-muted">
              Everything is saved privately in your browser. No sign-up, no servers, no one
              reading your reflections but you.
            </p>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-app bg-gradient-to-br from-[var(--color-ember-500)] to-[var(--color-ember-700)] p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-white text-balance md:text-4xl">
            Your reason for being is waiting to be mapped.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/85">
            Take five minutes. Answer honestly. Start living a more deliberate life today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-[var(--color-ember-700)] shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Open ikiTraq <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-subtle sm:flex-row">
          <Logo />
          <p>Built for a deliberate life. © {new Date().getFullYear()} ikiTraq.</p>
        </div>
      </footer>
    </div>
  );
}
