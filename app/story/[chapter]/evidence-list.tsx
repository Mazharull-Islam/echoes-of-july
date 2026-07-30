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

import { EvidenceStamp } from "@/components/evidence-stamp";
import type { EvidenceItem } from "@/types/story";

const PLACEHOLDER_LOOKUP_EXTENSIONS = ["svg", "jpg", "jpeg", "webp", "png"] as const;

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
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
          <EvidenceFigure item={item} />
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
    </ul>
  );
}

// Photographs and documents always render through the figure path. Newspaper
// and witness-statement items can also opt in by setting `assetUrl` (a
// scan of the clipping, a press photo accompanying a statement, etc.); the
// figure renders above the blockquote in that case.
function EvidenceFigure({ item }: { item: EvidenceItem }) {
  const isPrimaryFigure =
    item.type === "photograph" || item.type === "document";
  const isSecondaryFigure =
    (item.type === "newspaper" || item.type === "witness-statement") &&
    typeof item.assetUrl === "string";
  if (!isPrimaryFigure && !isSecondaryFigure) {
    return null;
  }
  const src = item.assetUrl ?? placeholderUrlFor(item.id);
  return (
    <figure className="flex flex-col gap-2">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={item.title}
          className="max-h-80 w-full rounded-sm object-contain"
          loading="lazy"
        />
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
  }
}