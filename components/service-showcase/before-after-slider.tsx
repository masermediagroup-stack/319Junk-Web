"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { ServiceMedia } from "./types";

type BeforeAfterSliderProps = {
  before: ServiceMedia;
  after: ServiceMedia;
  borderRadiusPx: number;
  reducedMotion: boolean;
  priority?: boolean;
  className?: string;
};

export function BeforeAfterSlider({
  before,
  after,
  borderRadiusPx,
  reducedMotion,
  priority = false,
  className,
}: BeforeAfterSliderProps) {
  const prefersReduced = useReducedMotion();
  const reduce = reducedMotion || !!prefersReduced;
  const labelId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const positionRef = useRef(50);
  const frameRef = useRef<number | null>(null);
  const pendingClientXRef = useRef<number | null>(null);

  const renderPosition = useCallback((value: number) => {
    const next = Math.min(100, Math.max(0, value));
    const track = trackRef.current;
    const overlay = overlayRef.current;
    const divider = dividerRef.current;
    const handle = handleRef.current;
    if (!track || !overlay || !divider || !handle) return;

    positionRef.current = next;
    const x = track.getBoundingClientRect().width * (next / 100);
    overlay.style.clipPath = `inset(0 ${100 - next}% 0 0)`;
    divider.style.left = "0px";
    divider.style.transform = `translate3d(${x}px, 0, 0)`;
    handle.style.left = "0px";
    handle.style.transform = `translate3d(calc(${x}px - 50%), -50%, 0)`;
    handle.setAttribute("aria-valuenow", String(Math.round(next)));
    handle.setAttribute("aria-valuetext", `${Math.round(next)}% before visible`);
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return;
    renderPosition(((clientX - rect.left) / rect.width) * 100);
  }, [renderPosition]);

  useLayoutEffect(() => {
    renderPosition(positionRef.current);
    const observer = new ResizeObserver(() => renderPosition(positionRef.current));
    if (trackRef.current) observer.observe(trackRef.current);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [renderPosition]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    if (trackRef.current) trackRef.current.dataset.dragging = "true";
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    pendingClientXRef.current = event.clientX;
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (pendingClientXRef.current !== null) {
        updateFromClientX(pendingClientXRef.current);
        pendingClientXRef.current = null;
      }
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pendingClientXRef.current !== null) {
      updateFromClientX(pendingClientXRef.current);
      pendingClientXRef.current = null;
    }
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    draggingRef.current = false;
    if (trackRef.current) trackRef.current.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderPosition(positionRef.current - step);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      renderPosition(positionRef.current + step);
    } else if (event.key === "Home") {
      event.preventDefault();
      renderPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      renderPosition(100);
    }
  };

  return (
    <div
      ref={trackRef}
      className={cn(
        "service-showcase__comparison relative aspect-[4/3] w-full overflow-hidden border border-[var(--ss-border)] bg-[var(--ss-hover)]",
        "touch-none select-none",
        className,
      )}
      style={{ borderRadius: borderRadiusPx }}
      data-dragging="false"
      data-reduced-motion={reduce ? "true" : undefined}
      role="group"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">Before and after image comparison</span>

      <div className="absolute inset-0">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={priority}
          unoptimized
          className="object-cover"
        />
        <span className="pointer-events-none absolute right-3 top-3 rounded-none bg-[#090909]/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--ss-bg)]">After</span>
      </div>

      <div
        ref={overlayRef}
        className="service-showcase__ba-overlay absolute inset-0 overflow-hidden will-change-[clip-path]"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={priority}
          unoptimized
          className="object-cover"
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-none bg-[#090909]/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--ss-bg)]">Before</span>
      </div>

      <div
        className="absolute inset-0 z-[5] cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-hidden
      />

      <div
        ref={dividerRef}
        className="service-showcase__ba-divider pointer-events-none absolute inset-y-0 z-10 w-px bg-[var(--ss-bg)]"
        style={{ left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }}
        aria-hidden
      />

      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-valuetext="50% before visible"
        aria-label="Comparison position"
        className={cn(
          "service-showcase__ba-handle absolute top-[70%] z-20 md:top-1/2",
          "flex size-12 cursor-ew-resize items-center justify-center md:size-11",
          "touch-none",
        )}
        style={{ left: "50%", transform: "translate3d(-50%, -50%, 0)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span
          className={cn(
            "service-showcase__ba-handle-visual flex size-8 items-center justify-center gap-0.5",
            "rounded-none border border-[var(--ss-bg)] bg-[var(--ss-bg)] text-[var(--ss-fg)]",
            "shadow-[0_4px_18px_rgba(0,0,0,0.18)] md:size-11",
          )}
          aria-hidden
        >
          <ChevronLeftIcon />
          <ChevronRightIcon />
        </span>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M6.25 2.25 3.5 5l2.75 2.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ChevronRightIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M3.75 2.25 6.5 5 3.75 7.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
