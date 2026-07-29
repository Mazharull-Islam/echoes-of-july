# Architecture

## Structure (as-built, do not restructure without asking)

```
app/            routes only
  page.tsx              → landing page
  story/[chapter]/      → dialogue/scene playback for a chapter
  history/[chapter]/    → historical context + evidence for a chapter
  timeline/             → list of chapters in chronological order
  reflection/           → post-chapter reflection
components/     shared UI (Header, Footer, Container) + components/ui (shadcn)
data/           JSON content, read server-side via node:fs
types/          TypeScript interfaces matching the JSON shape in data/
lib/            small shared utilities (lib/utils.ts = cn() helper)
```

Do not introduce a `features/` or `src/` directory. This flat, route-based layout is the accepted structure.

## Data flow

- Route pages (`app/**/page.tsx`) are async server components. They read JSON directly from `data/` with `node:fs` at request time and pass typed props down to a client component.
- Client components (`*-view.tsx`, marked `"use client"`) own interaction state: current scene index, choice selection, navigation.
- No API routes. No database. No fetch() to any backend. If a task seems to need one, stop and ask — this violates a locked project decision (no backend for MVP).

## State & persistence

- Ephemeral UI state (current scene index, whether an evidence panel is open) lives in React `useState`.
- Chapter progress that should survive a refresh (current scene, choice history) must be persisted to `localStorage`, namespaced per chapter (e.g. `echoes-of-july:progress:{chapterId}`). See `lib/save-system.ts` (to be created — see ai/tasks.md).
- Never use cookies, sessionStorage-as-a-substitute-for-a-backend, or any server-side session.

## Routing conventions

- Dynamic chapter routes use the `[chapter]` param and look up `data/{stories,history}/{chapter}.json` by filename match. Keep chapter ids consistent across `data/stories/*.json`, `data/history/*.json`, and `data/timeline.json` — they're joined by string id, not by any foreign key relationship enforced in code.
- `notFound()` is the correct behavior when a chapter id doesn't resolve to a file. Keep this pattern for new routes.

## Known cleanup already decided

- `types/chapter.ts` is dead code (duplicate/conflicting `Story` type, unused `Chapter` interface) — delete it. Canonical types live in `types/story.ts`.
- `data/scenes.json` is an empty, unreferenced file — delete it.
