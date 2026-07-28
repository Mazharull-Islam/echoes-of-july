// types/story.ts

export interface StoryScene {
  id: string;
  speaker: string;
  dialogue: string;
}

export interface Story {
  id: string;
  title: string;
  scenes: StoryScene[];
}