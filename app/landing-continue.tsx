"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { findResumeProgress } from "@/lib/save-system";
import { cn } from "@/lib/utils";

type ResumeProgress = {
  chapterId: string;
  sceneIndex: number;
};

type LandingContinueProps = {
  chapterIds: ReadonlyArray<string>;
};

export function LandingContinue({ chapterIds }: LandingContinueProps) {
  const [resume, setResume] = useState<ResumeProgress | null>(null);
  const [resolved, setResolved] = useState(false);

  // localStorage is unavailable on the server and may be unavailable on the
  // client (private browsing, disabled storage). Defer the lookup until after
  // mount so SSR renders the loading baseline, then mark resolved once the
  // lookup finishes (whether a save was found or not).
  useEffect(() => {
    const found = findResumeProgress(chapterIds);
    if (found) {
      setResume(found);
    }
    setResolved(true);
  }, [chapterIds]);

  if (!resolved) {
    return (
      <p
        className="font-mono text-xs uppercase tracking-wide text-muted-foreground"
        aria-live="polite"
      >
        Checking for saved progress…
      </p>
    );
  }

  if (!resume) {
    return null;
  }

  return (
    <p className="text-sm text-muted-foreground sm:text-base">
      You have progress saved in this chapter.{" "}
      <Link
        href={`/story/${resume.chapterId}`}
        className={cn(
          buttonVariants({ variant: "link", size: "default" }),
          "h-auto p-0 text-sm sm:text-base"
        )}
      >
        Continue from scene {resume.sceneIndex + 1}
      </Link>
    </p>
  );
}