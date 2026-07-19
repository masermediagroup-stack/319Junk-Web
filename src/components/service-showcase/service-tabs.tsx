"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { SiteIcon, type SiteIconName } from "@/components/site-icon";
import { cn } from "@/lib/utils";
import { SS_PILL_LAYOUT_ID } from "./constants";
import type { ServiceChangeSource, ServiceItem } from "./types";

type ServiceTabsProps = {
  items: ServiceItem[];
  activeId: string;
  onChange: (id: string, source: ServiceChangeSource) => void;
  tabDurationMs: number;
  reducedMotion: boolean;
  panelIdPrefix: string;
  instant: boolean;
};

const tabIcons: Record<string, SiteIconName> = {
  residential: "residential",
  commercial: "commercial",
  "trailer-rentals": "trailer",
};

export function ServiceTabs({
  items,
  activeId,
  onChange,
  tabDurationMs,
  reducedMotion,
  panelIdPrefix,
  instant,
}: ServiceTabsProps) {
  const listId = useId();
  const prefersReduced = useReducedMotion();
  const reduce = reducedMotion || !!prefersReduced;
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = tabRefs.current.get(activeId);
    const scroller = scrollRef.current;
    if (!node || !scroller) return;

    const nodeRect = node.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    let nextLeft = scroller.scrollLeft;

    if (nodeRect.left < scrollerRect.left) {
      nextLeft -= scrollerRect.left - nodeRect.left;
    } else if (nodeRect.right > scrollerRect.right) {
      nextLeft += nodeRect.right - scrollerRect.right;
    } else {
      return;
    }

    scroller.scrollTo({
      left: nextLeft,
      behavior: reduce || instant ? "auto" : "smooth",
    });
  }, [activeId, instant, reduce]);

  const activeIndex = items.findIndex((item) => item.id === activeId);

  const focusTab = (index: number) => {
    const next = items[index];
    if (!next) return;
    onChange(next.id, "keyboard");
    requestAnimationFrame(() => {
      tabRefs.current.get(next.id)?.focus();
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (items.length === 0) return;
    const current = activeIndex < 0 ? 0 : activeIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab((current + 1) % items.length);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab((current - 1 + items.length) % items.length);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="service-showcase__tabs -mx-1 overflow-x-auto px-1"
      role="presentation"
    >
      <div
        role="tablist"
        aria-label="Service types"
        aria-orientation="horizontal"
        id={listId}
        className="relative flex w-max min-w-full gap-1.5 border-b border-[var(--ss-border)] pb-[calc(0.875rem*var(--ss-space-scale))]"
        onKeyDown={onKeyDown}
      >
        {items.map((item) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                if (el) tabRefs.current.set(item.id, el);
                else tabRefs.current.delete(item.id);
              }}
              type="button"
              role="tab"
              id={`${panelIdPrefix}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${panelIdPrefix}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "service-showcase__tab relative z-10 isolate shrink-0 overflow-hidden rounded-none",
                "px-[var(--ss-tab-pad-x)] py-[var(--ss-tab-pad-y)]",
                "text-sm font-medium tracking-[-0.01em] transition-colors",
                "duration-[var(--ss-tab-duration)]",
                selected ? "text-[var(--ss-bg)]" : "text-[var(--ss-fg)]",
              )}
              onClick={(event) => onChange(item.id, event.detail === 0 ? "keyboard" : "pointer")}
            >
              {selected ? (
                <motion.span
                  layoutId={SS_PILL_LAYOUT_ID}
                  className="absolute inset-0 z-0 rounded-none bg-[var(--ss-fg)]"
                  transition={
                    reduce || instant
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          duration: Math.min(tabDurationMs, 280) / 1000,
                          bounce: 0,
                        }
                  }
                  aria-hidden
                />
              ) : null}
              <span className="service-showcase__tab-label relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
                <SiteIcon className="service-showcase__tab-icon" name={tabIcons[item.id] ?? "boxes"} />
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
