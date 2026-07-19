"use client";
import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const [position, setPosition] = useState(50);
  return <figure className="comparison" style={{ "--position": `${position}%` } as React.CSSProperties}>
    <Image src={after} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 50vw" />
    <div className="comparison-before"><Image src={before} alt={beforeAlt} fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
    <label><span className="sr-only">Drag to reveal before and after</span><input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
    <span className="before-label">Before</span><span className="after-label">After</span>
  </figure>;
}
