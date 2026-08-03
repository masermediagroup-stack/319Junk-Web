"use client";

import { LetterFlipFrame } from "@/components/text-animations";

const HERO_TITLE = "You call,\nWe haul!";

export function HeroTitle() {
  return (
    <h1 id="hero-title">
      <LetterFlipFrame
        className="hero-title-desktop"
        text={HERO_TITLE}
        phase="in"
        flipSpeed={600}
        stagger={60}
        flipAxis="x"
        perspective={800}
        ease="cubic-bezier(0.22, 1, 0.36, 1)"
        direction="forward"
      />
      <span className="hero-title-mobile" data-hero-sequence>
        You call,<br /><span>We haul!</span>
      </span>
    </h1>
  );
}
