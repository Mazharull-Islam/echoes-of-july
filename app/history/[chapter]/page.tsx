import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";

import { HistoryChapterView } from "@/components/history-chapter-view";
import type { History } from "@/types/history";

type HistoryChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

async function loadHistory(chapterId: string): Promise<History | null> {
  const filePath = path.join(
    process.cwd(),
    "data",
    "history",
    `${chapterId}.json`
  );
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as History;
  } catch {
    return null;
  }
}

export default async function HistoryChapterPage({
  params,
}: HistoryChapterPageProps) {
  const { chapter } = await params;
  const history = await loadHistory(chapter);
  if (!history) {
    notFound();
  }

  return <HistoryChapterView history={history} />;
}
