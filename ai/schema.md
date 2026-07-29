# Schema

All content is JSON-driven (locked decision). Never hardcode historical or narrative content into a component.

## Canonical types (types/story.ts)

`types/chapter.ts` is deleted. Do not recreate it. `types/story.ts` is the single source of truth for story/scene shapes. Extend it as follows — this is additive, existing `dialogue`-type scenes keep working unchanged:

```ts
// types/story.ts

export type SceneType = "dialogue" | "choice" | "evidence";

export interface StoryScene {
  id: string;
  type: SceneType;          // NEW — defaults to "dialogue" for existing content
  speaker?: string;         // used by "dialogue" scenes
  dialogue?: string;        // used by "dialogue" scenes
  choice?: ChoicePrompt;    // used by "choice" scenes
  evidence?: EvidenceItem[]; // used by "evidence" scenes
  next?: string | null;     // explicit next scene id; if omitted, engine advances to the next array item
}

export interface ChoicePrompt {
  prompt: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  label: string;
  leadsTo: string; // scene id
}

export interface EvidenceItem {
  id: string;
  type: "photograph" | "document" | "newspaper" | "witness-statement";
  title: string;
  sourceCaption: string; // attribution — real source, or explicitly marked illustrative/composite
  assetUrl?: string;      // for photograph/document
  text?: string;          // for witness-statement/newspaper (paraphrased or short-quoted only — copyright)
}

export interface Story {
  id: string;
  title: string;
  scenes: StoryScene[];
}
```

Rules:
- A choice's `leadsTo` only changes which scene/evidence plays next. It never changes historical fact or outcome (locked decision — the player is an Observer with no in-world identity, not a participant making history-altering decisions).
- Existing `data/stories/*.json` files with no `type` field should be treated as `type: "dialogue"` for backward compatibility — don't force a migration of existing placeholder content as part of an unrelated task.
- `types/history.ts` (`HistoryEntry`, `History`) and `types/timeline.ts` (`TimelineItem`) are unchanged — leave as-is.

## Validation

Content is currently loaded with a plain `JSON.parse` + `as Story` cast (see `app/story/[chapter]/page.tsx`). This is acceptable for MVP given all content is authored by the team, not user-submitted. Do not add a validation library (e.g. zod) unless specifically asked — it's not worth the dependency for internally-authored JSON at this stage.
