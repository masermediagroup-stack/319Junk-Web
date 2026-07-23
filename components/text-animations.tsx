"use client";

import { motion, useReducedMotion, type Easing } from "framer-motion";
import type { CSSProperties } from "react";

export type LetterFlipAxis = "x" | "y";
export type LetterFlipPhase = "in" | "out";
export type LetterFlipDirection = "forward" | "backward";

export type LetterFlipFrameProps = {
  text: string;
  phase?: LetterFlipPhase;
  flipSpeed?: number;
  stagger?: number;
  flipAxis?: LetterFlipAxis;
  perspective?: number;
  ease?: string | Easing;
  direction?: LetterFlipDirection;
  className?: string;
  style?: CSSProperties;
};

type LetterToken = {
  char: string;
  lineIndex: number;
  charIndex: number;
  index: number;
};

const DEFAULT_EASE: Easing = [0.22, 1, 0.36, 1];

function parseEase(ease: string | Easing): Easing {
  if (typeof ease !== "string") return ease;

  const match = ease.match(
    /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/i,
  );
  if (!match) return DEFAULT_EASE;

  const values = match.slice(1, 5).map((value) => Number(value));
  if (values.some((value) => Number.isNaN(value))) return DEFAULT_EASE;

  return values as [number, number, number, number];
}

function tokenize(text: string): { lines: string[]; letters: LetterToken[] } {
  const lines = text.split("\n");
  const letters: LetterToken[] = [];

  lines.forEach((line, lineIndex) => {
    Array.from(line).forEach((char, charIndex) => {
      letters.push({
        char,
        lineIndex,
        charIndex,
        index: letters.length,
      });
    });
  });

  return { lines, letters };
}

/**
 * Per-letter 3D flip entrance/exit for display headings.
 * Preserves line breaks via `\n` in `text`. Animated glyphs are aria-hidden;
 * a screen-reader-only copy keeps the full string available.
 */
export function LetterFlipFrame({
  text,
  phase = "in",
  flipSpeed = 1050,
  stagger = 60,
  flipAxis = "x",
  perspective = 800,
  ease = "cubic-bezier(0.22, 1, 0.36, 1)",
  direction = "forward",
  className,
  style,
}: LetterFlipFrameProps) {
  const reduceMotion = useReducedMotion();
  const { lines, letters } = tokenize(text);
  const totalLetters = letters.length;
  const parsedEase = parseEase(ease);
  const duration = Math.max(flipSpeed, 0) / 1000;
  const staggerSeconds = Math.max(stagger, 0) / 1000;
  const accessibleText = text.replace(/\n/g, " ");
  const rotateProp = flipAxis === "y" ? "rotateY" : "rotateX";
  const hiddenRotation = phase === "in" ? 90 : -90;

  if (reduceMotion || totalLetters === 0) {
    return (
      <span className={className} style={style}>
        {lines.map((line, lineIndex) => (
          <span className="letter-flip-line" key={`static-${lineIndex}`}>
            {line.length === 0 ? "\u00A0" : line}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    );
  }

  const lettersByLine = lines.map((_, lineIndex) =>
    letters.filter((letter) => letter.lineIndex === lineIndex),
  );

  return (
    <span className={className} style={style}>
      <span className="sr-only">{accessibleText}</span>
      <span
        aria-hidden="true"
        className="letter-flip-frame"
        style={{ perspective: `${perspective}px` }}
      >
        {lettersByLine.map((lineLetters, lineIndex) => (
          <span className="letter-flip-line" key={`line-${lineIndex}`}>
            {lineLetters.length === 0 ? (
              <span className="letter-flip-char">{"\u00A0"}</span>
            ) : (
              lineLetters.map((letter) => {
                const staggerIndex =
                  direction === "backward"
                    ? totalLetters - 1 - letter.index
                    : letter.index;
                const delay = staggerIndex * staggerSeconds;
                const hidden = { opacity: 0, [rotateProp]: hiddenRotation };
                const shown = { opacity: 1, [rotateProp]: 0 };

                return (
                  <motion.span
                    className="letter-flip-char"
                    key={`char-${letter.lineIndex}-${letter.charIndex}`}
                    initial={phase === "in" ? hidden : shown}
                    animate={phase === "in" ? shown : hidden}
                    transition={{
                      duration,
                      delay,
                      ease: parsedEase,
                    }}
                  >
                    {letter.char === " " ? "\u00A0" : letter.char}
                  </motion.span>
                );
              })
            )}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    </span>
  );
}
