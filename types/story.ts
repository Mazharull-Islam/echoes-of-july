// types/story.ts

export type SceneType = "dialogue" | "choice" | "evidence";

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
  type: "photograph" | "document" | "newspaper" | "witness-statement" | "video";
  title: string;
  sourceCaption: string;
  archiveNote?: string;
  assetUrl?: string;
  text?: string;
}

export interface StoryScene {
  id: string;
  type: SceneType; // NEW — defaults to "dialogue" for existing content
  speaker?: string; // used by "dialogue" scenes
  dialogue?: string; // used by "dialogue" scenes
  choice?: ChoicePrompt; // used by "choice" scenes
  evidence?: EvidenceItem[]; // used by "evidence" scenes
  next?: string | null; // explicit next scene id; if omitted, engine advances to the next array item
}

export interface Story {
  id: string;
  title: string;
  scenes: StoryScene[];
}