export const SS_DEFAULTS = {
  activeId: "residential",
  panelDurationMs: 260,
  tabDurationMs: 280,
  borderRadiusPx: 0,
  spacingScale: 1,
  imageMode: "auto" as const,
  animationEnabled: true,
} as const;

/** Shared layoutId so the active pill animates across tab remounts within one showcase. */
export const SS_PILL_LAYOUT_ID = "ss-active-pill";
