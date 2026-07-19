"use client";

import { LayoutGroup, useReducedMotion } from "framer-motion";
import { useId, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SS_DEFAULTS } from "./constants";
import { SERVICE_ITEMS } from "./data";
import { ServicePanel } from "./service-panel";
import { ServiceTabs } from "./service-tabs";
import type { ServiceChangeSource, ServiceShowcaseProps } from "./types";
import "./tokens.css";

export function ServiceShowcase({
  items = SERVICE_ITEMS,
  defaultActiveId = SS_DEFAULTS.activeId,
  activeId: controlledActiveId,
  onActiveChange,
  forceReducedMotion = false,
  animationEnabled = SS_DEFAULTS.animationEnabled,
  panelDurationMs = SS_DEFAULTS.panelDurationMs,
  tabDurationMs = SS_DEFAULTS.tabDurationMs,
  borderRadiusPx = SS_DEFAULTS.borderRadiusPx,
  spacingScale = SS_DEFAULTS.spacingScale,
  imageMode = SS_DEFAULTS.imageMode,
  className,
}: ServiceShowcaseProps) {
  const panelIdPrefix = useId().replace(/:/g, "");
  const prefersReduced = useReducedMotion();
  const [changeSource, setChangeSource] = useState<ServiceChangeSource>("programmatic");
  const [uncontrolledId, setUncontrolledId] = useState(() => {
    if (items.some((item) => item.id === defaultActiveId)) return defaultActiveId;
    return items[0]?.id ?? SS_DEFAULTS.activeId;
  });

  const activeId = controlledActiveId ?? uncontrolledId;
  const activeItem =
    items.find((item) => item.id === activeId) ?? items[0] ?? null;

  const reducedMotion =
    forceReducedMotion || !animationEnabled || !!prefersReduced;

  const onChange = (id: string, source: ServiceChangeSource) => {
    setChangeSource(source);
    if (controlledActiveId === undefined) {
      setUncontrolledId(id);
    }
    onActiveChange?.(id);
  };

  const style = {
    "--ss-radius": `${borderRadiusPx}px`,
    "--ss-space-scale": String(spacingScale),
    "--ss-tab-duration": reducedMotion ? "0ms" : `${tabDurationMs}ms`,
    "--ss-panel-duration": reducedMotion ? "0ms" : `${panelDurationMs}ms`,
  } as CSSProperties;

  if (!activeItem) return null;

  return (
    <div
      className={cn(
        "service-showcase w-full",
        className,
      )}
      style={style}
      data-reduced-motion={reducedMotion ? "true" : undefined}
    >
      <div className="px-[var(--ss-pad)] py-[calc(0.5rem*var(--ss-space-scale))]">
        <LayoutGroup id={`${panelIdPrefix}-tabs`}>
          <ServiceTabs
            items={items}
            activeId={activeItem.id}
            onChange={onChange}
            tabDurationMs={tabDurationMs}
            reducedMotion={reducedMotion}
            panelIdPrefix={panelIdPrefix}
            instant={changeSource !== "pointer"}
          />
        </LayoutGroup>
        <ServicePanel
          item={activeItem}
          panelIdPrefix={panelIdPrefix}
          panelDurationMs={panelDurationMs}
          borderRadiusPx={borderRadiusPx}
          reducedMotion={reducedMotion}
          imageMode={imageMode}
          isFirstPaint={activeItem.id === (items[0]?.id ?? "")}
          instant={changeSource !== "pointer"}
        />
      </div>
    </div>
  );
}
