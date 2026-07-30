// app/story/[chapter]/evidence-list.tsx
//
// Renders an array of evidence items for an evidence-type scene. Photograph
// and document items get an image (assetUrl) with a captioned source line;
// newspaper and witness-statement items get a styled blockquote with the
// text and an attributed cite. No progress counter — these read as
// archive placards, not game collectibles.

import type { EvidenceItem } from "@/types/story";

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <ul className="flex flex-col gap-5" role="list">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-2 rounded-md border border-dashed border-border/70 p-3 sm:p-4"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {labelForEvidenceType(item.type)}
          </p>
          <h4 className="text-base font-semibold leading-snug sm:text-lg">
            {item.title}
          </h4>
          {item.type === "photograph" || item.type === "document" ? (
            <figure className="flex flex-col gap-2">
              {item.assetUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.assetUrl}
                  alt={item.title}
                  className="max-h-80 w-full rounded-sm object-contain"
                  loading="lazy"
                />
              ) : null}
              <figcaption className="font-mono text-xs italic leading-snug text-muted-foreground">
                {item.sourceCaption}
              </figcaption>
            </figure>
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
    </ul>
  );
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