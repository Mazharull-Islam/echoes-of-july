import { cn } from "@/lib/utils";

type MetadataRailProps = {
  chapterId: string;
  /** Optional 0-based scene index — shown as "Scene N of M" if provided. */
  sceneIndex?: number;
  /** Total scene count. Required if `sceneIndex` is passed. */
  totalScenes?: number;
  className?: string;
};

/**
 * Margin-note rail. Sits as a slim vertical column to the left of the
 * main reading content on `lg:` viewports and collapses to a single
 * mono line on smaller viewports. Quiet by design — no border, no box,
 * just small mono text in `--color-mist`. Renders the chapter id and
 * (optionally) the current scene counter.
 */
export function MetadataRail({
  chapterId,
  sceneIndex,
  totalScenes,
  className,
}: MetadataRailProps) {
  const id = formatChapterId(chapterId);
  const sceneLine =
    typeof sceneIndex === "number" && typeof totalScenes === "number"
      ? `Scene ${sceneIndex + 1} of ${totalScenes}`
      : null;

  return (
    <aside
      aria-label="Chapter metadata"
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.18em] text-mist",
        "flex flex-col gap-1",
        "lg:sticky lg:top-20 lg:h-fit",
        className
      )}
    >
      <span>{id}</span>
      {sceneLine ? (
        <span className="lg:[writing-mode:vertical-rl] lg:rotate-180 lg:mt-1">
          {sceneLine}
        </span>
      ) : null}
    </aside>
  );
}

function formatChapterId(raw: string): string {
  const trimmed = raw.replace(/^chapter[-_]?/i, "");
  const padded = trimmed.padStart(2, "0");
  return `Chapter-${padded}`.toUpperCase();
}
