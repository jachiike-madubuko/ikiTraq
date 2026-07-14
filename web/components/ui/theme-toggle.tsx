"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ikitraq-theme");
    const prefersDark =
      stored === "dark" || (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ikitraq-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-app text-muted transition-colors hover:text-fg hover:bg-raised ring-focus ${className}`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
