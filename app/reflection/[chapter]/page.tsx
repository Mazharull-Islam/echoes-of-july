import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";

import { ReflectionChapterView } from "@/app/reflection/[chapter]/reflection-chapter-view";

type ReflectionChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

async function chapterExists(chapterId: string): Promise<boolean> {
  const filePath = path.join(
    process.cwd(),
    "data",
    "stories",
    `${chapterId}.json`
  );
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export default async function ReflectionChapterPage({
  params,
}: ReflectionChapterPageProps) {
  const { chapter } = await params;
  if (!(await chapterExists(chapter))) {
    notFound();
  }
  return <ReflectionChapterView chapter={chapter} />;
}