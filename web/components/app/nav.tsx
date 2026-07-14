"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, ListChecks, BookOpen } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ikigai", label: "Ikigai", icon: Compass },
  { href: "/rituals", label: "Rituals", icon: ListChecks },
  { href: "/journal", label: "Journal", icon: BookOpen },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-app bg-raised px-4 py-6 lg:flex">
        <Link href="/" className="px-3">
          <Logo />
        </Link>
        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-app text-fg shadow-soft" : "text-muted hover:text-fg hover:bg-app",
                )}
              >
                <Icon size={18} className={active ? "text-[var(--color-ember-500)]" : ""} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-between px-3">
          <span className="text-xs text-subtle">Local · private</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-app bg-raised/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link href="/">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-app bg-raised/90 px-2 py-2 backdrop-blur-md lg:hidden">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] font-medium",
                active ? "text-[var(--color-ember-500)]" : "text-subtle",
              )}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
