"use client";

// components/image-lightbox.tsx
//
// A Facebook-style image lightbox. Renders the image in a modal overlay with
// click-to-open, ESC-to-close, click-outside-to-close, wheel-to-zoom,
// double-click-to-reset, and drag-to-pan when zoomed.
//
// Uses the native <dialog> element so we get focus-trapping and `Esc` close
// for free, plus full screen-reader semantics. The dialog is mounted
// imperatively (dialog.showModal()) from the parent via the `open` prop.
//
// Zoom transform is a single CSS `transform: translate(x,y) scale(s)` on the
// <img>, with `cursor: grab` / `grabbing` while dragging. We clamp scale to
// [1, 6] and clamp pan so the image always covers the viewport at any zoom.

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const ZOOM_STEP = 1.25;

type ImageLightboxProps = {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
};

export function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; baseTx: number; baseTy: number }>(
    { active: false, startX: 0, startY: 0, baseTx: 0, baseTy: 0 }
  );

  // Reset transform when the src changes (i.e. opening a new image).
  useEffect(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, [src]);

  // Imperative show/hide — parent only renders us with a non-null src.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (src && !dlg.open) dlg.showModal();
    if (!src && dlg.open) dlg.close();
  }, [src]);

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, s * ZOOM_STEP));
  }, []);
  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = s / ZOOM_STEP;
      if (next <= MIN_SCALE) {
        setTx(0);
        setTy(0);
        return MIN_SCALE;
      }
      return next;
    });
  }, []);

  // Wheel-zoom — listens on the dialog so the page underneath doesn't scroll.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onWheel = (e: WheelEvent) => {
      if (!src) return;
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    };
    dlg.addEventListener("wheel", onWheel, { passive: false });
    return () => dlg.removeEventListener("wheel", onWheel);
  }, [src, zoomIn, zoomOut]);

  // Keyboard: +, -, 0, arrows to pan, Esc is handled by the dialog natively.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (!src) return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        reset();
      } else if (e.key === "ArrowLeft") {
        setTx((v) => v + 40);
      } else if (e.key === "ArrowRight") {
        setTx((v) => v - 40);
      } else if (e.key === "ArrowUp") {
        setTy((v) => v + 40);
      } else if (e.key === "ArrowDown") {
        setTy((v) => v - 40);
      }
    };
    dlg.addEventListener("keydown", onKey);
    return () => dlg.removeEventListener("keydown", onKey);
  }, [src, zoomIn, zoomOut, reset]);

  // Drag-to-pan — only active when zoomed in.
  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= 1) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseTx: tx,
      baseTy: ty,
    };
    (e.currentTarget as HTMLElement).style.cursor = "grabbing";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current.active) return;
    setTx(dragRef.current.baseTx + (e.clientX - dragRef.current.startX));
    setTy(dragRef.current.baseTy + (e.clientY - dragRef.current.startY));
  };
  const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    (e.currentTarget as HTMLElement).style.cursor = "grab";
  };

  // Click on the dialog backdrop (outside the image) closes.
  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={onDialogClick}
      className="fixed inset-0 m-0 h-screen max-h-screen w-screen max-w-screen border-0 bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      aria-label={alt}
    >
      {/* Close button — top right, always visible above the image. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Zoom controls — bottom right. */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          disabled={scale <= MIN_SCALE}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5 10h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset zoom"
          className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-black/60 px-3 font-mono text-xs text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          disabled={scale >= MAX_SCALE}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Image stage — centered, fills viewport, overflow-hidden so pan doesn't reveal empty backdrop. */}
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden p-4 sm:p-8">
        {src ? (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            draggable={false}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={reset}
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              cursor: scale > 1 ? "grab" : "zoom-in",
              transition: dragRef.current.active ? "none" : "transform 120ms ease-out",
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            className="select-none rounded-sm shadow-2xl"
          />
        ) : null}
      </div>

      {/* Caption strip — bottom of viewport, doesn't move with pan/zoom. */}
      {caption ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-16 sm:pb-20">
          <p className="max-w-3xl rounded-sm bg-black/60 px-4 py-2 text-center font-mono text-xs italic text-white/90 sm:text-sm">
            {caption}
          </p>
        </div>
      ) : null}
    </dialog>
  );
}