import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:gap-6">
      {/* Metadata eyebrow in Plex Mono — mirrors the chapter-id
          treatment on every other page, so this stays part of the
          same archive instead of reading as a generic error. */}
      <p className="font-mono text-xs uppercase tracking-wide text-mist">
        404 · Archive
      </p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        This chapter doesn&rsquo;t exist.
      </h1>
      {/* Newsreader at reading size — same register as the history
          reference prose, calm and direct. No apology, no jokey 404
          copy. */}
      <p className="font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
        The route you followed doesn&rsquo;t lead anywhere in this archive.
      </p>
      <Link
        href="/timeline"
        className={cn(
          buttonVariants({ variant: "default", size: "default" })
        )}
      >
        Return to timeline
      </Link>
    </section>
  );
}
