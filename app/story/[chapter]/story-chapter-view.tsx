"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clearProgress,
  loadProgress,
  saveProgress,
} from "@/lib/save-system";
import { cn } from "@/lib/utils";
import type { EvidenceItem, Story, StoryScene } from "@/types/story";

type StoryChapterViewProps = {
  chapter: string;
  story: Story;
};

function indexOfScene(scenes: StoryScene[], id: string): number {
  return scenes.findIndex((scene) => scene.id === id);
}

export function StoryChapterView({ chapter, story }: StoryChapterViewProps) {
  const router = useRouter();
  const scenes = story.scenes;
  const totalScenes = scenes.length;
  const [sceneIndex, setSceneIndex] = useState(0);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const hasHydratedRef = useRef(false);

  // On mount: if saved progress exists for this chapter, offer to resume.
  // Both sceneIndex and choiceHistory are restored together so the experience
  // is continuous.
  useEffect(() => {
    if (hasHydratedRef.current) {
      return;
    }
    hasHydratedRef.current = true;
    if (totalScenes === 0) {
      return;
    }
    const saved = loadProgress(chapter);
    if (!saved) {
      return;
    }
    const clamped = Math.min(Math.max(saved.sceneIndex, 0), totalScenes - 1);
    if (clamped === 0 && saved.choiceHistory.length === 0) {
      return;
    }
    const wantsToResume =
      typeof window !== "undefined" &&
      typeof window.confirm === "function" &&
      window.confirm(
        `Resume from scene ${clamped + 1} of ${totalScenes}?`
      );
    if (wantsToResume) {
      setSceneIndex(clamped);
      setChoiceHistory(saved.choiceHistory);
    }
  }, [chapter, totalScenes]);

  // Autosave on every scene or choice-history change after hydration.
  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }
    saveProgress(chapter, sceneIndex, choiceHistory);
  }, [chapter, sceneIndex, choiceHistory]);

  const goToSceneById = useCallback(
    (sceneId: string) => {
      const target = indexOfScene(scenes, sceneId);
      if (target >= 0) {
        setSceneIndex(target);
      }
    },
    [scenes]
  );

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
  const isChoiceScene = currentScene.type === "choice" && currentScene.choice;
  const isEvidenceScene =
    currentScene.type === "evidence" &&
    Array.isArray(currentScene.evidence) &&
    currentScene.evidence.length > 0;

  function handleContinue() {
    if (isAtFinalScene) {
      clearProgress(chapter);
      router.push(`/reflection/${chapter}`);
      return;
    }
    setSceneIndex((prev) => prev + 1);
  }

  function handleChoice(optionId: string, label: string, leadsTo: string) {
    setChoiceHistory((prev) => [...prev, `${optionId}:${label}`]);
    goToSceneById(leadsTo);
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
            {isChoiceScene
              ? "A moment of reflection"
              : isEvidenceScene
                ? "Evidence"
                : currentScene.speaker}
          </p>
          <CardTitle>{story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isChoiceScene ? (
            <div className="flex flex-col gap-4">
              <p className="text-base leading-relaxed sm:text-lg">
                {currentScene.choice?.prompt}
              </p>
              <ul className="flex flex-col gap-2" role="list">
                {currentScene.choice?.options.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() =>
                        handleChoice(option.id, option.label, option.leadsTo)
                      }
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-auto w-full justify-start whitespace-normal rounded-lg px-4 py-3 text-left text-sm font-normal leading-snug sm:text-base"
                      )}
                    >
                      <span className="block">{option.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : isEvidenceScene ? (
            <EvidenceList items={currentScene.evidence ?? []} />
          ) : (
            <p className="text-base leading-relaxed sm:text-lg">
              {currentScene.dialogue}
            </p>
          )}
        </CardContent>
        {!isChoiceScene ? (
          <CardFooter className="justify-end">
            <button
              type="button"
              onClick={handleContinue}
              className={cn(
                buttonVariants({ variant: "default", size: "default" })
              )}
            >
              Continue
            </button>
          </CardFooter>
        ) : null}
      </Card>
    </section>
  );
}

function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <ul className="flex flex-col gap-5" role="list">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-2 rounded-md border border-dashed border-border/70 p-3 sm:p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {labelForEvidenceType(item.type)}
          </p>
          <h4 className="text-base font-semibold leading-snug sm:text-lg">
            {item.title}
          </h4>
          {item.type === "photograph" || item.type === "document" ? (
            <figure className="flex flex-col gap-2">
              {item.assetUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.assetUrl}
                  alt={item.title}
                  className="max-h-80 w-full rounded-sm object-contain"
                  loading="lazy"
                />
              ) : null}
              <figcaption className="text-xs italic leading-snug text-muted-foreground">
                {item.sourceCaption}
              </figcaption>
            </figure>
          ) : null}
          {item.type === "newspaper" || item.type === "witness-statement" ? (
            <blockquote className="flex flex-col gap-2 border-l-2 border-border pl-3 sm:pl-4">
              {item.text ? (
                <p className="text-base leading-relaxed whitespace-pre-line sm:text-lg">
                  {item.text}
                </p>
              ) : null}
              <cite className="text-xs not-italic text-muted-foreground">
                — {item.sourceCaption}
              </cite>
            </blockquote>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function labelForEvidenceType(
  type: EvidenceItem["type"]
): string {
  switch (type) {
    case "photograph":
      return "Photograph";
    case "document":
      return "Document";
    case "newspaper":
      return "Newspaper excerpt";
    case "witness-statement":
      return "Witness statement";
  }
}