# Tasks

Per AGENTS.md: give Puku ONE task at a time from this list. Puku should stop after completing it, not continue to the next one. Check a task off, then hand the next one over as its own prompt.

## Cleanup (do first, before anything else)

- [ ] **Delete dead code.** Remove `types/chapter.ts` (unused, conflicts with `types/story.ts`'s `Story` type) and `data/scenes.json` (empty, unreferenced). Confirm nothing imports either before deleting; if something does, stop and report it instead of deleting.

## Core gaps (in priority order)

- [ ] **Add local storage save/resume.** Create `lib/save-system.ts` with `saveProgress`, `loadProgress`, `clearProgress` for a chapter's `{ sceneIndex, choiceHistory }`, namespaced per chapter id. Wire into `StoryChapterView`: autosave on scene change, offer to resume on mount if saved progress exists, handle localStorage being unavailable without throwing. See ai/architecture.md "State & persistence."

- [ ] **Extend the schema for choice and evidence scenes.** Update `types/story.ts` per ai/schema.md. Do not touch `types/history.ts` or `types/timeline.ts`. Existing dialogue-only chapter JSON must keep working unchanged.

- [ ] **Build the choice scene UI.** In `StoryChapterView`, when the current scene has `type: "choice"`, render `choice.prompt` and `choice.options` as distinct selectable options (see ai/design.md "Choice presentation"). Selecting an option navigates to `leadsTo` and appends the choice to save-system's choice history.

- [ ] **Build the evidence scene UI.** New scene type render path for `type: "evidence"` — display each `EvidenceItem` per ai/design.md "Evidence presentation." Support both `assetUrl` (photograph/document) and `text` (witness-statement/newspaper) items in the same array.

- [ ] **Build the real landing page.** Replace the placeholder in `app/page.tsx`: project intro copy (respectful, documentary tone per ai/design.md), entry point into the timeline or first chapter, and — once save-system exists — a "Continue" option if saved progress is found for any chapter.

- [ ] **Build the real reflection page.** Replace the placeholder in `app/reflection/page.tsx`. Should accept a chapter id (likely becomes `app/reflection/[chapter]/page.tsx`), read the chapter's saved choice history, and present open-ended reflective prompts — not quiz-style right/wrong content. Wire `StoryChapterView`'s final scene to route here instead of dead-ending.

## Content (parallel track, not blocked on the above)

- [ ] Replace placeholder text in `data/stories/chapter-01.json` and `data/history/chapter-01.json` with real, sourced content once the writer's draft is ready and fact-checked. This is a content swap only — should require no code changes if the schema is followed.

## Explicitly not yet in scope

Do not add: authentication, a database, API routes, image/video upload, AI-generated content, or animations beyond simple fades (ai/design.md), unless a task above specifically asks for it.
