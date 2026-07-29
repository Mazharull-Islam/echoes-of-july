import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LandingContinue } from "@/app/landing-continue";
import timelineData from "@/data/timeline.json";
import type { TimelineItem } from "@/types/timeline";

const items: ReadonlyArray<TimelineItem> = timelineData;
const chapterIds: ReadonlyArray<string> = items.map((item) => item.chapter);

export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 sm:gap-8">
      <header className="flex flex-col gap-3 text-center sm:text-left">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          An interactive documentary
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Echoes of July
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          {/* PLACEHOLDER / DRAFT COPY — final wording is pending product-owner review before ship. */}
          A narrative experience that invites you to understand, observe, and
          reflect on the events of July 2024 through the words of those who
          lived them — alongside the historical record.
        </p>
      </header>

      <Card className="w-full">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Where to begin
          </p>
          <CardTitle>Begin the experience</CardTitle>
          <CardDescription>
            {/* PLACEHOLDER / DRAFT COPY — pending product-owner review. */}
            The timeline lists each chapter in chronological order. Move through
            them at your own pace; there is nothing to win and no score to keep.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LandingContinue chapterIds={chapterIds} />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-2">
          <Link
            href="/timeline"
            className={buttonVariants({ variant: "default", size: "default" })}
          >
            Open the timeline
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
