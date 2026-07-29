# Design

> Live source of truth for UI/UX decisions.

---

## Stack

- Tailwind CSS v4 for styling
- shadcn/ui for primitives
- Framer Motion for animation
- Lucide React for icons

---

## Principles

- Reusable components over one-offs
- Keep components under 200 lines
- No `any`
- JSON-driven content

---

## Palette (paper / ink / accent)

Documentary-tone palette. All values are CSS variables exposed as Tailwind
utilities via `--color-*` aliases in `app/globals.css`.

| Token        | Hex       | Role                                                 |
| ------------ | --------- | ---------------------------------------------------- |
| `--color-paper`     | `#EDEAE1` | Default surface (page background, cards)      |
| `--color-ink`       | `#1C1B19` | Default text on paper                          |
| `--color-slate`     | `#2B2E33` | Dark sections only (hero overlays, footers)   |
| `--color-marigold`  | `#C98A2C` | Primary accent (buttons, active states)       |
| `--color-rust`      | `#8B3A2B` | Secondary accent / warning tone                |
| `--color-mist`      | `#9B968A` | Hairline borders, dividers, muted chrome       |

Mapping rules:

- `paper` is the canonical page surface; `bg-background` and `bg-card` both
  resolve to paper so dark-mode-by-omission stays light.
- `ink` is the canonical text color; `text-foreground` and `text-card-foreground`
  resolve to ink.
- `marigold` is the only accent for `bg-primary`; `text-primary-foreground` on
  marigold is paper (light) for legibility.
- `mist` is the canonical hairline; `border-border`, `border-input`, and the
  `ring` color all resolve to mist.
- `slate` is reserved for explicit dark sections (e.g. the landing hero
  overlay). Do not use it as a default page background.

## Typography (three font roles)

Loaded via `next/font` in `app/layout.tsx`. Geist remains wired alongside for
backward compatibility but is no longer the default.

| Role     | Font          | CSS variable          | Used for                                          |
| -------- | ------------- | --------------------- | ------------------------------------------------- |
| Serif    | Newsreader    | `--font-serif`        | Dialogue, narrative text, evidence text           |
| Sans     | IBM Plex Sans | `--font-sans` (alias) | UI chrome: nav, buttons, headers, labels          |
| Mono     | IBM Plex Mono | `--font-mono` (alias) | Metadata: dates, "Scene N of M", source captions  |

Rules:

- Newsreader is set as `font-serif` on Tailwind utilities.
- The document body uses Plex Sans via `font-sans` (Plex Sans overrides the
  previous Geist default).
- Body/UI text, nav, buttons, headers, labels all use Plex Sans.
- Dialogue paragraphs, choice prompts, and evidence `blockquote` / body text
  switch to `font-serif` so the narrative reads as text content, not chrome.
- Source captions, "Scene N of M", and date labels use `font-mono`.

## Base component restyle

`components/ui/card.tsx`:

- `Card` → `bg-card` (paper), `border-border` (mist), `text-card-foreground`
  (ink), softer shadow.
- `CardTitle` → `font-sans` (Plex Sans), `text-ink`, semibold, tight tracking.
- `CardDescription` → `text-muted-foreground` (ink-muted).
- `CardFooter` → separated by a mist hairline at the top.

`components/ui/button.tsx`:

- `default` variant → `bg-primary` (marigold), `text-primary-foreground`
  (paper). Use for primary CTAs (Open timeline, Continue, Begin).
- `outline` variant → `bg-background` (paper), `border-border` (mist), hover
  state uses `bg-muted` (paper-tinted).
- `secondary` → `bg-secondary` (mist-tinted paper), `text-ink`.
- `ghost` → transparent on paper, hover `bg-muted`.
- `link` → `text-primary` (marigold), underline on hover.
- `destructive` → `bg-destructive/10` with `text-destructive` (rust-tinted).

Card and Button pick up the new palette automatically through the `bg-card`,
`border-border`, `text-foreground`, and `bg-primary` Tailwind utilities, so
all existing pages that consume those primitives inherit the restyle without
any per-page code changes.

## Landing page hero

`app/page.tsx` opens with a full-bleed hero:

- Image source: `public/hero-placeholder.avif` (loaded via `next/image`,
  `priority`, `fill`, `sizes="100vw"`).
- An HTML comment immediately above the image tag marks it as a placeholder
  pending a rights-cleared replacement.
- A slate-to-transparent gradient overlay sits above the image. Slate is
  densest at the edges (especially bottom) so the intro copy stays readable.
- Image reads as present but faded/muted (roughly 30–40% opacity blended into
  the slate overlay) — not a crisp photo.
- Intro copy and the Begin/Continue entry points sit on top of the hero using
  Plex Sans and ink or paper text color depending on contrast against the
  overlay.
