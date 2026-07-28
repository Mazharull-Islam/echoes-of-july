"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { History } from "@/types/history";

type HistoryChapterViewProps = {
  history: History;
};

export function HistoryChapterView({ history }: HistoryChapterViewProps) {
  const router = useRouter();
  const entries = history.entries;

  function handleBackToTimeline() {
    router.push("/timeline");
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:gap-6">
      <header className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {history.title}
        </h1>
      </header>

      <div className="flex flex-col gap-4 sm:gap-5">
        {entries.map((entry, index) => (
          <Card key={`${entry.title}-${index}`} className="w-full">
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {entry.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleBackToTimeline}>Back to Timeline</Button>
      </div>
    </section>
  );
}