// app/story/[chapter]/scene-footer.tsx
//
// Footer rendered at the bottom of every story scene card. Hosts the
// primary "Continue" action and an optional "Back" affordance when the
// user has a previous scene to return to. Kept separate so the main
// StoryChapterView stays under the project's component-size cap.

import { CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SceneFooterProps = {
  isChoiceScene: boolean;
  isAtChapterEnd: boolean;
  previousSceneId: string | null;
  onBack: () => void;
  onContinue: () => void;
  onTimeline: () => void;
};

export function SceneFooter({
  isChoiceScene,
  isAtChapterEnd,
  previousSceneId,
  onBack,
  onContinue,
  onTimeline,
}: SceneFooterProps) {
  const backButton = previousSceneId ? (
    <button
      type="button"
      onClick={onBack}
      className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
    >
      Back
    </button>
  ) : (
    <span />
  );
  if (isChoiceScene) {
    return (
      <CardFooter className="justify-between gap-2">
        <button
          type="button"
          onClick={onTimeline}
          className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
        >
          Timeline
        </button>
        <span />
      </CardFooter>
    );
  }
  return (
    <CardFooter className="justify-between gap-2">
      {backButton}
      <button
        type="button"
        onClick={onContinue}
        className={cn(buttonVariants({ variant: "default", size: "default" }))}
      >
        {isAtChapterEnd ? "Return to timeline" : "Continue"}
      </button>
    </CardFooter>
  );
}