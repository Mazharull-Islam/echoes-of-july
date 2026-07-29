# Design

## Tone

This is a documentary about a real, recent, and for many people painful event. UI should read as calm and respectful, never game-like.

- No score counters, no XP, no "levels," no progress-bar gamification language.
- No celebratory micro-interactions (confetti, achievement toasts) on choices or evidence — these are witnessing moments, not wins.
- Button/label language: "Continue," "Begin," "Open Chapter," "Back to Timeline" — already established, keep this register. Avoid "Play," "Start Game," "Level Up."

## Visual system (already established, keep using it)

- shadcn/ui `Card` / `CardHeader` / `CardTitle` / `CardContent` / `CardFooter` is the primary content container — reuse it for new scene types (evidence, choice) rather than inventing a new container pattern.
- `buttonVariants` from `components/ui/button` for all button-styled links and buttons.
- `cn()` from `lib/utils.ts` for conditional class merging.
- Layout: centered column, `max-w-2xl` for reading-focused views (story, history), wider grid (`sm:grid-cols-2 lg:grid-cols-3`) for card-list views (timeline). Match whichever pattern fits the new view.

## Motion

Framer Motion is a dependency but not yet used. When adding transitions (e.g. scene-to-scene fade, evidence panel reveal):
- Simple opacity/slight-y fades only, short duration (~150-250ms).
- No bouncy/springy easing, no attention-grabbing motion — this should feel like turning a page, not like a game UI.

## Evidence presentation

When building the evidence scene type:
- Photographs/documents: image + `sourceCaption` shown as a caption beneath, styled like a museum/archive placard, not a game collectible card.
- Witness statements/newspaper excerpts: styled text block, `sourceCaption` clearly visible for attribution — never present unattributed text as fact.
- Do not add a "collected X/Y evidence" counter anywhere — evidence supports the narrative, it is not collected.

## Choice presentation

- Choice options should look like distinct, weighted decisions, not quiz answers — no checkmarks/crosses, no implied correct answer.
- Since choices only affect which evidence/testimony is shown next (not outcome), avoid phrasing or styling that implies stakes or consequence beyond "you'll see a different account next."
