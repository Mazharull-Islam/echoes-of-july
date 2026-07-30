// app/story/[chapter]/scene-views.tsx
//
// Per-scene-type renderers used by StoryChapterView. Extracted so the
// orchestration component stays under the project's component-size cap.

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StoryScene } from "@/types/story";

type DialogueSceneProps = {
  speaker: string | undefined;
  dialogue: string | undefined;
};

export function DialogueScene({ speaker, dialogue }: DialogueSceneProps) {
  const hasDialogue = typeof dialogue === "string" && dialogue.length > 0;
  return (
    <div className="flex flex-col gap-2">
      {hasDialogue ? (
        <p className="font-serif text-base leading-relaxed sm:text-lg">
          {dialogue}
        </p>
      ) : (
        <p className="font-serif text-base italic leading-relaxed text-muted-foreground sm:text-lg">
          No dialogue available for this scene yet.
        </p>
      )}
      {!speaker ? (
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Narrator
        </p>
      ) : null}
    </div>
  );
}

type ChoiceSceneProps = {
  prompt: string;
  options: NonNullable<StoryScene["choice"]>["options"];
  onChoose: (optionId: string, label: string, leadsTo: string) => void;
};

export function ChoiceScene({ prompt, options, onChoose }: ChoiceSceneProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-serif text-base leading-relaxed sm:text-lg">
        {prompt}
      </p>
      <ul className="flex flex-col gap-2" role="list">
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onChoose(option.id, option.label, option.leadsTo)}
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
  );
}
