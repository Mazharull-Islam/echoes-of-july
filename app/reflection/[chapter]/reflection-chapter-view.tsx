"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadProgress } from "@/lib/save-system";
import { cn } from "@/lib/utils";

type ReflectionChapterViewProps = {
  chapter: string;
};

// PLACEHOLDER / DRAFT — final reflective wording is pending product-owner
// review. Subject matter is sensitive; do not ship without that review.
const PLACEHOLDER_PROMPTS: ReadonlyArray<string> = [
  "What stayed with you from this chapter, and why?",
  "Where in the path you followed did you find yourself hesitating?",
  "Whose voices did you notice most, and whose were missing for you?",
];

export function ReflectionChapterView({ chapter }: ReflectionChapterViewProps) {
  const [choiceLabels, setChoiceLabels] = useState<string[] | null>(null);
  const [hasSave, setHasSave] = useState(false);

  // localStorage is unavailable on the server and may be unavailable on the
  // client. Defer the lookup until after mount so SSR shows the no-save
  // baseline cleanly.
  useEffect(() => {
    const saved = loadProgress(chapter);
    if (!saved) {
      return;
    }
    setHasSave(true);
    // choiceHistory entries are stored as "id:label" pairs. Surface the
    // human-readable label so the reflection summary reads naturally.
    setChoiceLabels(
      saved.choiceHistory
        .map((entry) => {
          const colonAt = entry.indexOf(":");
          return colonAt >= 0 ? entry.slice(colonAt + 1) : entry;
        })
        .filter((label) => label.length > 0)
    );
  }, [chapter]);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:gap-6">
      <header className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Reflection
        </h1>
        <p className="text-xs text-muted-foreground">
          A moment to sit with what you just witnessed.
        </p>
      </header>

      <Card className="w-full">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your path through this chapter
          </p>
          <CardTitle>What you chose</CardTitle>
          <CardDescription>
            {hasSave && choiceLabels && choiceLabels.length > 0
              ? `You followed ${choiceLabels.length} ${choiceLabels.length === 1 ? "choice" : "choices"} in this chapter.`
              : "You moved through this chapter without a recorded choice."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasSave && choiceLabels && choiceLabels.length > 0 ? (
            <ul className="flex flex-col gap-2 text-sm sm:text-base" role="list">
              {choiceLabels.map((label, index) => (
                <li
                  key={`${index}-${label}`}
                  className="rounded-md border border-dashed border-border/70 px-3 py-2 text-muted-foreground"
                >
                  {label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground sm:text-base">
              No recorded choices for this chapter — this page will surface
              them automatically once a playthrough saves progress.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Questions to sit with
          </p>
          <CardTitle>Reflection prompts</CardTitle>
          <CardDescription>
            There are no right answers here. Sit with whichever question feels
            most present.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3" role="list">
            {PLACEHOLDER_PROMPTS.map((prompt, index) => (
              <li
                key={`prompt-${index}`}
                className="rounded-md bg-muted/40 px-3 py-2 text-base leading-relaxed sm:px-4 sm:py-3 sm:text-lg"
              >
                {prompt}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-end gap-2">
          <Link
            href="/timeline"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" })
            )}
          >
            Return to timeline
          </Link>
          <Link
            href={`/history/${chapter}`}
            className={cn(buttonVariants({ variant: "default", size: "default" }))}
          >
            Read further context
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}