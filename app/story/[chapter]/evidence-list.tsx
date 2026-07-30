"use client";

// app/story/[chapter]/evidence-list.tsx
//
// Renders an array of evidence items for an evidence-type scene.
//
// Each item gets a visual:
//
//   - photograph / document  → <figure> with an <img> + captioned source line
//   - newspaper / witness    → <blockquote> with body text + cited source
//
// If an item has no `assetUrl` of its own, we fall back to a placeholder tile
// served from `/evidence/<item.id>.<svg|jpg|webp|png>` so the chapter reads as
// a populated archive even before real scans/photos are sourced. To swap a
// placeholder for a real asset, drop the file into `public/evidence/` with the
// same `<item.id>` stem (e.g. `evidence-02.jpg`) and the lookup will pick it
// up — no JSON edit required when the fallback convention is followed.
//
// Each card carries an "entered into the record" stamp — the one place in
// the app that gets expressive motion.
//
// Images are clickable — clicking opens <ImageLightbox>, a Facebook-style
// modal that supports wheel-to-zoom, drag-to-pan, double-click-to-reset, and
// keyboard shortcuts (+ / − / 0 / arrows / Esc).

import { useState } from "react";

import { EvidenceStamp } from "@/components/evidence-stamp";
import { ImageLightbox } from "@/components/image-lightbox";
import type { EvidenceItem } from "@/types/story";

const PLACEHOLDER_LOOKUP_EXTENSIONS = ["svg", "jpg", "jpeg", "webp", "png"] as const;

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  return (
    <ul className="flex flex-col gap-5" role="list">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex flex-col gap-3 rounded-md border border-dashed border-border/70 p-3 sm:p-4"
        >
          <EvidenceStamp
            label={labelForEvidenceType(item.type)}
            index={index}
          />
          <h4 className="text-base font-semibold leading-snug sm:text-lg">
            {item.title}
          </h4>
          <EvidenceFigure
            item={item}
            onImageClick={(src, alt) =>
              setLightbox({ src, alt, caption: item.sourceCaption })
            }
          />
          {item.archiveNote ? (
            <div className="flex flex-col gap-1 rounded-sm border-l-2 border-border/60 pl-3 sm:pl-4">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Archive Note
              </span>
              <p className="font-serif text-sm leading-relaxed text-foreground/90 sm:text-base">
                {item.archiveNote}
              </p>
            </div>
          ) : null}
          {item.type === "newspaper" || item.type === "witness-statement" ? (
            <blockquote className="flex flex-col gap-2 border-l-2 border-border pl-3 sm:pl-4">
              {item.text ? (
                <p className="font-serif text-base leading-relaxed whitespace-pre-line sm:text-lg">
                  {item.text}
                </p>
              ) : null}
              <cite className="font-mono text-xs not-italic text-muted-foreground">
                — {item.sourceCaption}
              </cite>
            </blockquote>
          ) : null}
        </li>
      ))}

      <ImageLightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? ""}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />
    </ul>
  );
}

// Photographs and documents always render through the figure path. Newspaper
// and witness-statement items can also opt in by setting `assetUrl` (a
// scan of the clipping, a press photo accompanying a statement, etc.); the
// figure renders above the blockquote in that case.
//
// Videos render their own native <video> element with controls. No autoplay,
// muted by default so the page never speaks at the user; preload="metadata"
// so the player shows the first frame and duration without downloading the
// whole file.
function EvidenceFigure({
  item,
  onImageClick,
}: {
  item: EvidenceItem;
  onImageClick: (src: string, alt: string) => void;
}) {
  const isPrimaryFigure =
    item.type === "photograph" || item.type === "document";
  const isSecondaryFigure =
    (item.type === "newspaper" || item.type === "witness-statement") &&
    typeof item.assetUrl === "string";
  const isVideo = item.type === "video";
  if (!isPrimaryFigure && !isSecondaryFigure && !isVideo) {
    return null;
  }
  const src = item.assetUrl ?? placeholderUrlFor(item.id);
  return (
    <figure className="flex flex-col gap-2">
      {src && isVideo ? (
        <video
          src={src}
          controls
          preload="metadata"
          muted
          playsInline
          className="max-h-96 w-full rounded-sm bg-black"
        >
          {/* eslint-disable-next-line @next/next/no-html-link-for-pager */}
          <a href={src}>Download the video</a>
        </video>
      ) : src ? (
        // Wrap the <img> in a <button> so it's keyboard-accessible too.
        <button
          type="button"
          onClick={() => onImageClick(src, item.title)}
          aria-label={`Open ${item.title} in full view`}
          className="group cursor-zoom-in overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={item.title}
            className="max-h-80 w-full rounded-sm object-contain transition group-hover:brightness-95"
            loading="lazy"
          />
        </button>
      ) : null}
      <figcaption className="font-mono text-xs italic leading-snug text-muted-foreground">
        {item.sourceCaption}
      </figcaption>
    </figure>
  );
}

// Convention: every item id maps to a placeholder file in `public/evidence/`.
// We try the most common web extensions in order so swapping from a quick
// SVG draft to a JPG/AVIF final is just a file rename.
function placeholderUrlFor(itemId: string): string | null {
  for (const ext of PLACEHOLDER_LOOKUP_EXTENSIONS) {
    return `/evidence/${itemId}.${ext}`;
  }
  return null;
}

function labelForEvidenceType(type: EvidenceItem["type"]): string {
  switch (type) {
    case "photograph":
      return "Photograph";
    case "document":
      return "Document";
    case "newspaper":
      return "Newspaper excerpt";
    case "witness-statement":
      return "Witness statement";
    case "video":
      return "Video";
  }
}