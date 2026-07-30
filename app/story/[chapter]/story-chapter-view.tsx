"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clearProgress,
  loadProgress,
  saveProgress,
} from "@/lib/save-system";
import type { Story } from "@/types/story";

import { EvidenceList } from "./evidence-list";
import { ResumePromptDialog } from "./resume-prompt-dialog";
import { SceneFooter } from "./scene-footer";
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

  const [currentSceneId, setCurrentSceneId] = useState<string | null>(firstSceneId);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const [returnToChoiceSceneId, setReturnToChoiceSceneId] = useState<string | null>(null);
  const [previousSceneId, setPreviousSceneId] = useState<string | null>(null);
  const [resumePrompt, setResumePrompt] = useState<{ sceneId: string; history: string[]; sceneNumber: number } | null>(null);

  const currentScene = useMemo(
    () =>
      currentSceneId
        ? scenes.find((scene) => scene.id === currentSceneId) ?? null
        : null,
    [scenes, currentSceneId]
  );

  useEffect(() => {
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;
    if (totalScenes === 0 || !firstSceneId) return;
    const saved = loadProgress(chapter);
    if (!saved) return;
    const clampedOffset = Math.min(Math.max(saved.sceneIndex, 0), totalScenes - 1);
    if (clampedOffset === 0 && saved.choiceHistory.length === 0) return;
    setResumePrompt({
      sceneId: scenes[clampedOffset].id,
      history: saved.choiceHistory,
      sceneNumber: clampedOffset + 1,
    });
  }, [chapter, totalScenes, firstSceneId, scenes]);

  function handleResume() {
    if (!resumePrompt) return;
    setCurrentSceneId(resumePrompt.sceneId);
    setChoiceHistory(resumePrompt.history);
    setResumePrompt(null);
  }

  function handleStartOver() {
    clearProgress(chapter);
    setResumePrompt(null);
  }

  useEffect(() => {
    if (!hasHydratedRef.current || !currentSceneId) return;
    const offset = scenes.findIndex((scene) => scene.id === currentSceneId);
    if (offset >= 0) saveProgress(chapter, offset, choiceHistory);
  }, [chapter, scenes, currentSceneId, choiceHistory]);

  const goToSceneById = useCallback((sceneId: string) => {
    setCurrentSceneId((prev) => {
      if (prev) setPreviousSceneId(prev);
      return sceneId;
    });
  }, []);

  if (totalScenes === 0 || !currentScene) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{story.title}</h1>
        <p className="text-sm text-muted-foreground">No scenes available for this chapter yet.</p>
      </section>
    );
  }

  const sceneType = effectiveSceneType(currentScene);
  const isChoiceScene = sceneType === "choice" && !!currentScene.choice;
  const isEvidenceScene = sceneType === "evidence" && Array.isArray(currentScene.evidence) && currentScene.evidence.length > 0;

  const nextSceneId = isChoiceScene ? null : returnToChoiceSceneId ?? resolveNextSceneId(scenes, currentScene, null);
  const isAtChapterEnd = nextSceneId === null;

  function handleContinue() {
    if (isAtChapterEnd) {
      clearProgress(chapter);
      router.push(`/reflection/${chapter}`);
      return;
    }
    if (!nextSceneId) return;
    if (returnToChoiceSceneId && nextSceneId === returnToChoiceSceneId) setReturnToChoiceSceneId(null);
    goToSceneById(nextSceneId);
  }

  function handleChoice(optionId: string, label: string, leadsTo: string) {
    setChoiceHistory((prev) => [...prev, `${optionId}:${label}`]);
    setReturnToChoiceSceneId(currentSceneId);
    goToSceneById(leadsTo);
  }

  function handleBack() {
    if (!previousSceneId) return;
    const target = previousSceneId;
    setPreviousSceneId(currentSceneId);
    setCurrentSceneId(target);
  }

  function handleTimeline() {
    router.push("/timeline");
  }

  const currentSceneNumber = scenes.findIndex((scene) => scene.id === currentSceneId) + 1;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:gap-6">
      <header className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {story.title}
        </h1>
        <p className="font-mono text-xs text-muted-foreground">
          Scene {currentSceneNumber} of {totalScenes}
        </p>
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
        </CardContent>
        <SceneFooter
          isChoiceScene={isChoiceScene}
          isAtChapterEnd={isAtChapterEnd}
          previousSceneId={previousSceneId}
          onBack={handleBack}
          onContinue={handleContinue}
          onTimeline={handleTimeline}
        />
      </Card>
      <ResumePromptDialog
        open={resumePrompt !== null}
        sceneNumber={resumePrompt?.sceneNumber ?? null}
        totalScenes={totalScenes}
        onResume={handleResume}
        onStartOver={handleStartOver}
        onOpenChange={(open) => {
          if (!open) setResumePrompt(null);
        }}
      />
    </section>
  );
}