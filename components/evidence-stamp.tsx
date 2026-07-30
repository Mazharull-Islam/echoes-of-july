"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type EvidenceStampProps = {
  /** Uppercase label e.g. "PHOTOGRAPH", "WITNESS STATEMENT". */
  label: string;
  /** Item index in the list, used for colour alternating and stagger. */
  index: number;
  /** Optional className passthrough for layout positioning. */
  className?: string;
};

/**
 * "Entered into the record" stamp. The one place in the app that gets
 * expressive motion — a small ink-stamp mark that drops into place when
 * an evidence item enters the page.
 *
 * Physics are intentionally hard and short: a slight initial overshoot in
 * scale and a final rotated angle so it reads as pressed onto paper, not
 * bounced into place. Total duration is under 240ms.
 *
 * Respects `prefers-reduced-motion: reduce` — the stamp appears in place
 * with no animation when the user has requested reduced motion.
 */
export function EvidenceStamp({
  label,
  index,
  className,
}: EvidenceStampProps) {
  const isAlternate = index % 2 === 1;
  const baseRotate = isAlternate ? 3 : -3;
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      initial={
        reduced
          ? false
          : { opacity: 0, scale: 1.6, rotate: isAlternate ? 10 : -10 }
      }
      animate={{ opacity: 1, scale: 1, rotate: baseRotate }}
      transition={{
        duration: reduced ? 0 : 0.22,
        delay: reduced ? 0 : index * 0.08,
        ease: [0.65, 0, 0.35, 1],
      }}
      className={cn(
        "inline-block self-start font-mono text-[10px] font-medium uppercase tracking-[0.22em]",
        "border px-2 py-0.5",
        isAlternate
          ? "border-marigold text-marigold"
          : "border-rust text-rust",
        className
      )}
    >
      {label}
    </motion.span>
  );
}
