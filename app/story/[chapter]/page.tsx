import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";

import { StoryChapterView } from "@/app/story/[chapter]/story-chapter-view";
import type { Story } from "@/types/story";

type StoryChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

async function loadStory(chapterId: string): Promise<Story | null> {
  const filePath = path.join(
    process.cwd(),
    "data",
    "stories",
    `${chapterId}.json`
  );
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as Story;
  } catch {
    return null;
  }
}

export default async function StoryChapterPage({ params }: StoryChapterPageProps) {
  const { chapter } = await params;
  const story = await loadStory(chapter);
  if (!story) {
    notFound();
  }

  return <StoryChapterView chapter={chapter} story={story} />;
}
