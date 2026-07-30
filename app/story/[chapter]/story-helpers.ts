// app/story/[chapter]/story-helpers.ts
//
// Pure helpers used by the story renderer. Kept in their own module so the
// orchestration component stays under the project's component-size cap.

import type { StoryScene } from "@/types/story";

export type EffectiveSceneType = "dialogue" | "choice" | "evidence";

export function effectiveSceneType(scene: StoryScene): EffectiveSceneType {
  // Backward compat: scenes authored without a type default to dialogue.
  return scene.type ?? "dialogue";
}

export function indexOfScene(scenes: StoryScene[], id: string): number {
  return scenes.findIndex((scene) => scene.id === id);
}

// Resolves which scene id should follow the given scene.
//
// Order:
//   1. Explicit `scene.next` (string and non-empty) wins — lets authors
//      override array order without changing the array shape.
//   2. For a choice scene, the picked option's `leadsTo` (passed via
//      `pickedLeadsTo`) — used after the observer makes a choice.
//   3. Otherwise fall back to the next item in the scenes array.
//   4. Returns null when no further scene is reachable (chapter end).
export function resolveNextSceneId(
  scenes: StoryScene[],
  currentScene: StoryScene,
  pickedLeadsTo: string | null
): string | null {
  const explicit = currentScene.next;
  if (typeof explicit === "string" && explicit.length > 0) {
    return scenes.some((scene) => scene.id === explicit) ? explicit : null;
  }
  if (
    effectiveSceneType(currentScene) === "choice" &&
    pickedLeadsTo &&
    scenes.some((scene) => scene.id === pickedLeadsTo)
  ) {
    return pickedLeadsTo;
  }
  const currentIndex = indexOfScene(scenes, currentScene.id);
  if (currentIndex < 0 || currentIndex >= scenes.length - 1) {
    return null;
  }
  return scenes[currentIndex + 1].id;
}