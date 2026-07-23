"use client";

import { LetterFlipFrame } from "@/components/text-animations";

const HERO_TITLE = "You call,\nWe haul!";

export function HeroTitle() {
  return (
    <h1 id="hero-title">
      <LetterFlipFrame
        text={HERO_TITLE}
        phase="in"
        flipSpeed={1050}
        stagger={60}
        flipAxis="x"
        perspective={800}
        ease="cubic-bezier(0.22, 1, 0.36, 1)"
        direction="forward"
      />
    </h1>
  );
}
