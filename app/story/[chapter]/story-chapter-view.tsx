"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MetadataRail } from "@/components/metadata-rail";
import { ResumeDialog } from "@/components/resume-dialog";
import {
  clearProgress,
  loadProgress,
  saveProgress,
} from "@/lib/save-system";
import { cn } from "@/lib/utils";
import type { Story } from "@/types/story";

import { EvidenceList } from "./evidence-list";
import { ChoiceScene, DialogueScene } from "./scene-views";
import { effectiveSceneType, resolveNextSceneId } from "./story-helpers";

type StoryChapterViewProps = {
  chapter: string;
  story: Story;
};

export function StoryChapterView({ chapter, story }: StoryChapterViewProps) {
  const router = useRouter();
  const scenes = story.scenes;
  const totalScenes = scenes.length;
  const firstSceneId = scenes[0]?.id ?? null;
  const hasHydratedRef = useRef(false);

  const [currentSceneId, setCurrentSceneId] = useState<string | null>(
    firstSceneId
  );
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [pendingResume, setPendingResume] = useState<{
    sceneId: string;
    choiceHistory: string[];
    sceneNumber: number;
  } | null>(null);

  const currentScene = useMemo(
    () =>
      currentSceneId
        ? scenes.find((scene) => scene.id === currentSceneId) ?? null
        : null,
    [scenes, currentSceneId]
  );

  useEffect(() => {
    if (hasHydratedRef.current) {
      return;
    }
    hasHydratedRef.current = true;
    if (totalScenes === 0 || !firstSceneId) {
      return;
    }
    const saved = loadProgress(chapter);
    if (!saved) {
      return;
    }
    const clampedOffset = Math.min(
      Math.max(saved.sceneIndex, 0),
      totalScenes - 1
    );
    if (clampedOffset === 0 && saved.choiceHistory.length === 0) {
      return;
    }
    // Open the styled ResumeDialog so the reader can decide. We defer the
    // actual scene jump until they pick Resume; Start over / dismiss leaves
    // them at the first scene.
    setPendingResume({
      sceneId: scenes[clampedOffset].id,
      choiceHistory: saved.choiceHistory,
      sceneNumber: clampedOffset + 1,
    });
    setResumeDialogOpen(true);
  }, [chapter, totalScenes, firstSceneId, scenes]);

  function handleResume() {
    if (pendingResume) {
      setCurrentSceneId(pendingResume.sceneId);
      setChoiceHistory(pendingResume.choiceHistory);
    }
    setResumeDialogOpen(false);
    setPendingResume(null);
  }

  function handleStartOver() {
    setResumeDialogOpen(false);
    setPendingResume(null);
  }

  function handleResumeDismiss() {
    // Backdrop click or Escape — same as Start over from a state standpoint.
    setResumeDialogOpen(false);
    setPendingResume(null);
  }

  useEffect(() => {
    if (!hasHydratedRef.current || !currentSceneId) {
      return;
    }
    const offset = scenes.findIndex((scene) => scene.id === currentSceneId);
    if (offset >= 0) {
      saveProgress(chapter, offset, choiceHistory);
    }
  }, [chapter, scenes, currentSceneId, choiceHistory]);

  const goToSceneById = useCallback((sceneId: string) => {
    setCurrentSceneId(sceneId);
  }, []);

  if (totalScenes === 0 || !currentScene) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{story.title}</h1>
        <p className="text-sm text-muted-foreground">
          No scenes available for this chapter yet.
        </p>
      </section>
    );
  }

  const sceneType = effectiveSceneType(currentScene);
  const isChoiceScene = sceneType === "choice" && !!currentScene.choice;
  const isEvidenceScene =
    sceneType === "evidence" &&
    Array.isArray(currentScene.evidence) &&
    currentScene.evidence.length > 0;

  const nextSceneId = isChoiceScene
    ? null
    : resolveNextSceneId(scenes, currentScene, null);
  const isAtChapterEnd = nextSceneId === null;

  function handleContinue() {
    if (isAtChapterEnd) {
      clearProgress(chapter);
      router.push(`/reflection/${chapter}`);
      return;
    }
    if (nextSceneId) {
      setCurrentSceneId(nextSceneId);
    }
  }

  function handleChoice(optionId: string, label: string, leadsTo: string) {
    setChoiceHistory((prev) => [...prev, `${optionId}:${label}`]);
    goToSceneById(leadsTo);
  }

  const currentSceneIndex = scenes.findIndex(
    (scene) => scene.id === currentSceneId
  );
  const currentSceneNumber = currentSceneIndex + 1;

  const reduced = useReducedMotion();

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-[auto_1fr] lg:items-start lg:gap-x-8">
      <MetadataRail
        chapterId={chapter}
        sceneIndex={currentSceneIndex}
        totalScenes={totalScenes}
        className="hidden lg:flex"
      />

      <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
        {/* Compact metadata line on smaller viewports — the rail above
            handles it on lg+. */}
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist lg:hidden">
          {formatChapterId(chapter)} · Scene {currentSceneNumber} of{" "}
          {totalScenes}
        </p>
        <header className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {story.title}
          </h1>
        </header>

        <Card className="w-full">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {isChoiceScene
                ? "A moment of reflection"
                : isEvidenceScene
                  ? "Evidence"
                  : (currentScene.speaker ?? "Narrator")}
            </p>
            <CardTitle>{story.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSceneId ?? "none"}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
              >
                {isChoiceScene ? (
                  <ChoiceScene
                    prompt={currentScene.choice?.prompt ?? ""}
                    options={currentScene.choice?.options ?? []}
                    onChoose={handleChoice}
                  />
                ) : isEvidenceScene ? (
                  <EvidenceList items={currentScene.evidence ?? []} />
                ) : (
                  <DialogueScene
                    speaker={currentScene.speaker}
                    dialogue={currentScene.dialogue}
                  />
                )}
              </motion.div>
            </AnimatePresence>
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
                {isAtChapterEnd ? "Continue to reflection" : "Continue"}
              </button>
            </CardFooter>
          ) : null}
        </Card>
      </div>

      <ResumeDialog
        open={resumeDialogOpen}
        scenePosition={
          pendingResume
            ? `Scene ${pendingResume.sceneNumber} of ${totalScenes}`
            : `Scene 1 of ${totalScenes}`
        }
        onResume={handleResume}
        onStartOver={handleStartOver}
        onDismiss={handleResumeDismiss}
      />
    </section>
  );
}

function formatChapterId(raw: string): string {
  const trimmed = raw.replace(/^chapter[-_]?/i, "");
  const padded = trimmed.padStart(2, "0");
  return `Chapter-${padded}`.toUpperCase();
}