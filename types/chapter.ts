export interface Chapter {
  id: string;
  title: string;
  startScene: string;
}

export interface Scene {
  id: string;
  speaker: string;
  dialogue: string;
  next: string | null;
}

export interface Story {
  id: string;
  title: string;
  startScene: string;
  scenes: ReadonlyArray<Scene>;
}