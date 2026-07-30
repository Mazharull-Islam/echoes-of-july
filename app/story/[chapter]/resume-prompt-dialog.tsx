// app/story/[chapter]/resume-prompt-dialog.tsx
//
// In-app modal shown when a chapter loads with saved progress. Replaces the
// earlier `window.confirm` so the resume prompt matches the project's design
// system. Kept separate from StoryChapterView to keep that file under the
// project's component-size cap.

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ResumePromptDialogProps = {
  open: boolean;
  onResume: () => void;
  onStartOver: () => void;
  onOpenChange: (open: boolean) => void;
};

export function ResumePromptDialog({
  open,
  onResume,
  onStartOver,
  onOpenChange,
}: ResumePromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Resume where you left off?</DialogTitle>
          <DialogDescription>
            Pick up where you stopped reading this chapter.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center justify-center rounded-none border border-border bg-transparent px-4 py-2 font-sans text-sm font-medium text-ink transition-colors hover:bg-mist/30"
          >
            Start over
          </button>
          <button
            type="button"
            onClick={onResume}
            className="inline-flex items-center justify-center rounded-none border border-ink bg-ink px-4 py-2 font-sans text-sm font-medium text-paper transition-colors hover:bg-slate"
          >
            Resume
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}