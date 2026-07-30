"use client";

import { useId } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResumeDialogProps = {
  /** Whether the dialog is currently open. */
  open: boolean;
  /** Human-readable scene position (1-based), e.g. "Scene 4 of 6". */
  scenePosition: string;
  /** Fired when the reader chooses to resume from the saved position. */
  onResume: () => void;
  /** Fired when the reader chooses to discard the save and start fresh. */
  onStartOver: () => void;
  /**
   * Fired when the dialog closes via Escape, backdrop click, or any other
   * dismissal that isn't an explicit action. Treated as "stay where you
   * are" — i.e. same as Start over from a state standpoint.
   */
  onDismiss?: () => void;
};

/**
 * Styled replacement for the previous `window.confirm()` resume prompt.
 *
 * Tone: documentary, plain, calm — the same register as the landing page
 * intro. Two explicit actions: a marigold "Resume" (affirmative) and a
 * quiet outline "Start over" (alternate, not destructive). No close X in
 * the corner — readers must choose.
 *
 * Rendered as a controlled component so the parent can gate it on its own
 * mount-time conditions (saved progress exists, position is meaningful).
 */
export function ResumeDialog({
  open,
  scenePosition,
  onResume,
  onStartOver,
  onDismiss,
}: ResumeDialogProps) {
  // Generated id lets DialogDescription stay associated with DialogTitle
  // for screen readers without leaking any visual string into the DOM.
  const descriptionId = useId();

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen, _eventDetails) => {
        if (!nextOpen) {
          onDismiss?.();
        }
      }}
    >
      <DialogContent aria-describedby={descriptionId}>
        <DialogHeader>
          <DialogTitle>Resume where you left off?</DialogTitle>
          <DialogDescription id={descriptionId}>
            You were on {scenePosition}. You can pick up from there, or start
            the chapter again from the beginning.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            onClick={onStartOver}
            className={cn(
              buttonVariants({ variant: "outline", size: "default" })
            )}
          >
            Start over
          </button>
          <button
            type="button"
            onClick={onResume}
            className={cn(
              buttonVariants({ variant: "default", size: "default" })
            )}
          >
            Resume
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
