// types/story.ts

export type SceneType = "dialogue" | "choice" | "evidence";

export interface StoryScene {
  id: string;
  // NEW — defaults to "dialogue" for existing content that omits this field.
  type?: SceneType;
  // Used by "dialogue" scenes.
  speaker?: string;
  // Used by "dialogue" scenes.
  dialogue?: string;
  // Used by "choice" scenes.
  choice?: ChoicePrompt;
  // Used by "evidence" scenes.
  evidence?: EvidenceItem[];
  // Explicit next scene id; if omitted, the engine advances to the next
  // array item. Reserved for future use — no scene uses this yet.
  next?: string | null;
}

export interface ChoicePrompt {
  prompt: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  label: string;
  // Scene id the choice leads to.
  leadsTo: string;
}

export interface EvidenceItem {
  id: string;
  type: "photograph" | "document" | "newspaper" | "witness-statement";
  title: string;
  // Attribution — real source, or explicitly marked illustrative/composite.
  sourceCaption: string;
  // For photograph/document.
  assetUrl?: string;
  // For witness-statement/newspaper (paraphrased or short-quoted only — copyright).
  text?: string;
}

export interface Story {
  id: string;
  title: string;
  scenes: StoryScene[];
}