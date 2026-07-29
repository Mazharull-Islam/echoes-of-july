import Image from "next/image";
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
    <section className="flex flex-col gap-8 sm:gap-12">
      <div className="relative -mx-4 -mt-8 h-[70vh] min-h-[480px] w-screen overflow-hidden sm:-mx-6 sm:-mt-12 lg:-mx-8">
        {/*
          PLACEHOLDER IMAGE — unconfirmed rights, must be replaced with a
          licensed/owned photo before public submission.
        */}
        <Image
          src="/hero-placeholder.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center opacity-70"
        />
        {/* Slate-to-transparent overlay. The image is intentionally shown
            at higher opacity than the first pass — the slate layer sits
            just behind the copy to keep it readable, not in front of the
            picture. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-slate/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-slate/25 via-slate/15 to-slate/55"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col justify-center gap-4 px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/70">
            An interactive documentary
          </p>
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
            Echoes of July
          </h1>
          <p className="max-w-xl font-sans text-base text-paper/80 sm:text-lg">
            {/* PLACEHOLDER / DRAFT COPY — final wording is pending product-owner review before ship. */}
            A narrative experience that invites you to understand, observe, and
            reflect on the events of July 2024 through the words of those who
            lived them — alongside the historical record.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 sm:gap-8">
        <Card className="w-full">
          <CardHeader>
            <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Where to begin
            </p>
            <CardTitle>Begin the experience</CardTitle>
            <CardDescription>
              {/* PLACEHOLDER / DRAFT COPY — pending product-owner review. */}
              The timeline lists each chapter in chronological order. Move
              through them at your own pace; there is nothing to win and no
              score to keep.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LandingContinue chapterIds={chapterIds} />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-2">
            <Link
              href="/timeline"
              className={buttonVariants({
                variant: "default",
                size: "default",
              })}
            >
              Open the timeline
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
