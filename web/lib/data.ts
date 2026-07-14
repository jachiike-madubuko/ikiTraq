import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Sparkles,
  Coins,
  Globe2,
  Sunrise,
  Zap,
  Moon,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  Ikigai — the four pillars.
 *  Prompts ported from the original ikiTraq (src/ikiPrompts.ts).
 * ------------------------------------------------------------------ */
export type Pillar = "love" | "skill" | "paid" | "need";

export interface PillarMeta {
  key: Pillar;
  label: string;
  question: string;
  icon: LucideIcon;
  color: string;
  prompts: string[];
}

export const PILLARS: PillarMeta[] = [
  {
    key: "love",
    label: "What you love",
    question: "What makes you come alive?",
    icon: Heart,
    color: "var(--color-love)",
    prompts: [
      "What do you love to do?",
      "What would you love to do?",
      "What did you love to do as a child?",
      "How do you spend your free time?",
    ],
  },
  {
    key: "skill",
    label: "What you're good at",
    question: "Where does mastery live in you?",
    icon: Sparkles,
    color: "var(--color-skill)",
    prompts: [
      "What comes to you naturally?",
      "What do people rely on you for?",
      "What skills are you currently building?",
      "What are you the best at?",
    ],
  },
  {
    key: "paid",
    label: "What you can be paid for",
    question: "Where does value meet reward?",
    icon: Coins,
    color: "var(--color-paid)",
    prompts: [
      "What have you been paid to do?",
      "What was your favorite job?",
      "What do you want to get paid to do?",
      "What job would you do for free?",
    ],
  },
  {
    key: "need",
    label: "What the world needs",
    question: "How can you be of service?",
    icon: Globe2,
    color: "var(--color-need)",
    prompts: [
      "What does the world need?",
      "What would make the world a better place?",
      "What does your community need?",
      "What problems is society facing?",
    ],
  },
];

/* ------------------------------------------------------------------ *
 *  Daily rituals — the "Flo" of morning / grind / night.
 *  Distilled from the original flo task lists (src/types.ts).
 * ------------------------------------------------------------------ */
export type Phase = "morning" | "grind" | "night";

export interface PhaseMeta {
  key: Phase;
  label: string;
  tagline: string;
  icon: LucideIcon;
  accent: string;
}

export const PHASES: PhaseMeta[] = [
  {
    key: "morning",
    label: "Morning",
    tagline: "Prime the mind & body",
    icon: Sunrise,
    accent: "var(--color-paid)",
  },
  {
    key: "grind",
    label: "Grind",
    tagline: "Deep, deliberate work",
    icon: Zap,
    accent: "var(--color-ember-500)",
  },
  {
    key: "night",
    label: "Night",
    tagline: "Reflect & recover",
    icon: Moon,
    accent: "var(--color-skill)",
  },
];

export interface RitualDef {
  id: string;
  phase: Phase;
  label: string;
  detail: string;
}

export const RITUALS: RitualDef[] = [
  { id: "gratitude", phase: "morning", label: "Gratitude list", detail: "Name three things you're grateful for" },
  { id: "affirmation", phase: "morning", label: "Morning affirmation", detail: "Speak your intention out loud" },
  { id: "movement", phase: "morning", label: "Yoga & breathwork", detail: "Wim Hof breathing + a gentle flow" },
  { id: "visualize", phase: "morning", label: "Visualize a great day", detail: "What would make today trill?" },
  { id: "power-pages", phase: "morning", label: "Power pages", detail: "Free-write to clear the mind" },

  { id: "deep-work", phase: "grind", label: "Deep work block", detail: "One focused 90-minute sprint" },
  { id: "learn", phase: "grind", label: "Super learning", detail: "Study your craft for 30 minutes" },
  { id: "meditate", phase: "grind", label: "Midday meditation", detail: "Ten mindful minutes" },
  { id: "train", phase: "grind", label: "Train the body", detail: "Strength, mobility, or a walk" },
  { id: "ideas", phase: "grind", label: "Capture ideas", detail: "Bank one idea worth building" },

  { id: "creative", phase: "night", label: "Creative flex", detail: "Make something small for joy" },
  { id: "read", phase: "night", label: "Power hour reading", detail: "Read something that grows you" },
  { id: "highlights", phase: "night", label: "Highlights", detail: "What went well today, and why?" },
  { id: "improve", phase: "night", label: "One improvement", detail: "What would you refine tomorrow?" },
  { id: "night-affirmation", phase: "night", label: "Night affirmation", detail: "Close the day with gratitude" },
];

export const JOURNAL_MOODS = [
  { value: 1, label: "Eh", emoji: "😑" },
  { value: 2, label: "Chill", emoji: "🍩" },
  { value: 3, label: "Dope", emoji: "🤖" },
  { value: 4, label: "Trill", emoji: "🚀" },
  { value: 5, label: "Lit", emoji: "🔥" },
] as const;
