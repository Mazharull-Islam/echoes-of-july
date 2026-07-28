"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Story } from "@/types/story";

type StoryChapterViewProps = {
  chapter: string;
  story: Story;
};

export function StoryChapterView({ chapter, story }: StoryChapterViewProps) {
  const router = useRouter();
  const scenes = story.scenes;
  const totalScenes = scenes.length;
  const [sceneIndex, setSceneIndex] = useState(0);

  if (totalScenes === 0) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{story.title}</h1>
        <p className="text-sm text-muted-foreground">
          No scenes available for this chapter yet.
        </p>
      </section>
    );
  }

  const isAtFinalScene = sceneIndex >= totalScenes - 1;
  const currentScene = scenes[sceneIndex];

  function handleContinue() {
    if (isAtFinalScene) {
      router.push(`/history/${chapter}`);
      return;
    }
    setSceneIndex((prev) => prev + 1);
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:gap-6">
      <header className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {story.title}
        </h1>
        <p className="text-xs text-muted-foreground">
          Scene {sceneIndex + 1} of {totalScenes}
        </p>
      </header>

      <Card className="w-full">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {currentScene.speaker}
          </p>
          <CardTitle>{story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed sm:text-lg">
            {currentScene.dialogue}
          </p>
        </CardContent>
        <CardFooter className="justify-end">
          <button
            type="button"
            onClick={handleContinue}
            className={cn(buttonVariants({ variant: "default", size: "default" }))}
          >
            Continue
          </button>
        </CardFooter>
      </Card>
    </section>
  );
}