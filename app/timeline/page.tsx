import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TimelineItem } from "@/types/timeline";
import timelineData from "@/data/timeline.json";

const items: ReadonlyArray<TimelineItem> = timelineData;

export default function TimelinePage() {
  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Timeline
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Relive the events of July 2024 through an interactive narrative.
        </p>
      </header>

      <ul
        aria-label="Timeline entries"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        {items.map((item) => (
          <li key={item.id} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.date}
                </p>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/story/${item.chapter}`}
                  className={buttonVariants({ variant: "default", size: "default" })}
                >
                  Open Chapter
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
