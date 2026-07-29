// lib/save-system.ts
//
// Local storage persistence for chapter progress in "Echoes of July".
//
// All access to `window.localStorage` is wrapped so the app degrades gracefully
// (behaves as if no save exists) when storage is unavailable — e.g. private
// browsing modes, disabled storage, or a server-rendered context.
//
// Keys are namespaced per chapter id:
//   echoes-of-july:progress:{chapterId}

const STORAGE_PREFIX = "echoes-of-july:progress:";

export interface ChapterProgress {
  sceneIndex: number;
  choiceHistory: string[];
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function keyFor(chapterId: string): string {
  return `${STORAGE_PREFIX}${chapterId}`;
}

export function saveProgress(
  chapterId: string,
  sceneIndex: number,
  choiceHistory: string[]
): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  try {
    const payload: ChapterProgress = {
      sceneIndex,
      choiceHistory: [...choiceHistory],
    };
    storage.setItem(keyFor(chapterId), JSON.stringify(payload));
  } catch {
    // Storage quota exceeded or access denied — fail silently so the UI
    // keeps working.
  }
}

export function loadProgress(chapterId: string): ChapterProgress | null {
  const storage = getStorage();
  if (!storage) {
    return null;
  }
  try {
    const raw = storage.getItem(keyFor(chapterId));
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<ChapterProgress>;
    if (
      typeof parsed?.sceneIndex !== "number" ||
      !Array.isArray(parsed.choiceHistory)
    ) {
      return null;
    }
    const choiceHistory = parsed.choiceHistory.filter(
      (entry): entry is string => typeof entry === "string"
    );
    return {
      sceneIndex: parsed.sceneIndex,
      choiceHistory,
    };
  } catch {
    return null;
  }
}

export function clearProgress(chapterId: string): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  try {
    storage.removeItem(keyFor(chapterId));
  } catch {
    // Fail silently — same rationale as saveProgress.
  }
}

// Returns the first chapter with saved progress (scanning the input list in
// order) along with that chapter's saved sceneIndex, or null if none do.
// Designed for the landing page's "Continue" affordance — it returns the
// minimum information needed to deep-link into the right place, so callers
// can keep resume decisions local to their own flow.
export function findResumeProgress(
  chapterIds: ReadonlyArray<string>
): { chapterId: string; sceneIndex: number } | null {
  for (const chapterId of chapterIds) {
    const saved = loadProgress(chapterId);
    if (saved) {
      return { chapterId, sceneIndex: saved.sceneIndex };
    }
  }
  return null;
}
