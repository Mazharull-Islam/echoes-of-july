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

  // localStorage is unavailable on the server and may be unavailable on the
  // client (private browsing, disabled storage). Defer the lookup until after
  // mount so SSR renders the no-save baseline and the Continue affordance
  // appears only when a real save is found.
  useEffect(() => {
    const found = findResumeProgress(chapterIds);
    if (found) {
      setResume(found);
    }
  }, [chapterIds]);

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