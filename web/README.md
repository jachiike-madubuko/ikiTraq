# ikiTraq — web

A modern rebuild of ikiTraq: discover your **ikigai** and turn it into daily rituals, habits,
and reflection. This is a ground-up rewrite of the original Expo/React Native prototype into a
fast, deployable web app with a high-end UI.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-first design tokens, light/dark themes
- **Framer Motion** — motion for the ikigai visualization
- **Zustand** — typed state, persisted to `localStorage` (no backend required)
- **lucide-react** — icons

Everything runs client-side and saves privately in the browser, so it deploys to Vercel with
**zero configuration and no secrets**.

## Getting started

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Deploy to Vercel

This app lives in the `web/` subdirectory of the repo. Two ways to ship it:

**Dashboard (recommended)**
1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Set **Root Directory** to `web`.
3. Framework preset auto-detects as **Next.js** — accept the defaults and deploy.

**CLI**
```bash
npm i -g vercel
cd web
vercel        # follow prompts, deploy to preview
vercel --prod # promote to production
```

No environment variables are required.

## Architecture

| Path | Responsibility |
| --- | --- |
| `app/page.tsx` | Marketing landing page |
| `app/(app)/*` | The product: dashboard, ikigai, rituals, journal |
| `lib/data.ts` | Domain content — the four pillars, ritual phases, prompts (ported from the original app) |
| `lib/store.ts` | Persisted Zustand store + derived selectors (streaks, weekly activity) |
| `components/ui/*` | Design-system primitives (button, progress ring, theme toggle) |
| `components/app/*` | App composites (nav, logo, ikigai venn) |

### Swapping in a backend later

The store is intentionally the single seam for persistence. To move from `localStorage` to a
real backend (e.g. the original Firebase project, or Supabase/Postgres), replace the `persist`
middleware in `lib/store.ts` with your client and keep the same action/selector surface — no UI
changes required.
