import { cn } from "@/lib/utils";

export function Logo({ className, showWord = true }: { className?: string; showWord?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-8 w-8">
          <circle cx="15" cy="15" r="11" fill="var(--color-love)" fillOpacity="0.85" />
          <circle cx="25" cy="15" r="11" fill="var(--color-skill)" fillOpacity="0.75" />
          <circle cx="15" cy="25" r="11" fill="var(--color-need)" fillOpacity="0.75" />
          <circle cx="25" cy="25" r="11" fill="var(--color-paid)" fillOpacity="0.75" />
        </svg>
      </span>
      {showWord && (
        <span className="font-display text-xl font-semibold tracking-tight text-fg">
          iki<span className="text-[var(--color-ember-500)]">Traq</span>
        </span>
      )}
    </span>
  );
}
