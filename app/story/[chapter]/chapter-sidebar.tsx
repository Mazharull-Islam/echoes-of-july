// app/story/[chapter]/chapter-sidebar.tsx
//
// Compact timeline sidebar rendered alongside the chapter content. Lets a
// reader jump from one chapter to another without going back to the full
// /timeline page. Collapses into a <details> disclosure on small screens.

import Link from "next/link";

import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/types/timeline";

type ChapterSidebarProps = {
  items: ReadonlyArray<TimelineItem>;
  activeChapter: string;
};

export function ChapterSidebar({ items, activeChapter }: ChapterSidebarProps) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="w-full lg:sticky lg:top-6 lg:self-start"
    >
      <details className="group rounded-lg border border-border bg-card text-card-foreground open:shadow-sm lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          <span>Jump to another chapter</span>
          <span
            aria-hidden="true"
            className="text-muted-foreground transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <ChapterList items={items} activeChapter={activeChapter} />
      </details>

      <div className="hidden lg:block">
        <div className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          All chapters
        </div>
        <ChapterList items={items} activeChapter={activeChapter} />
      </div>
    </nav>
  );
}

function ChapterList({
  items,
  activeChapter,
}: {
  items: ReadonlyArray<TimelineItem>;
  activeChapter: string;
}) {
  return (
    <ul className="flex flex-col divide-y divide-border border-t border-border lg:divide-y-0 lg:border lg:rounded-lg">
      {items.map((item) => {
        const isActive = item.chapter === activeChapter;
        return (
          <li key={item.id}>
            <Link
              href={`/story/${item.chapter}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col gap-0.5 px-4 py-3 text-sm transition-colors hover:bg-muted/60",
                isActive && "bg-muted font-medium"
              )}
            >
              <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                {item.date}
              </span>
              <span className="line-clamp-2 leading-snug">{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}