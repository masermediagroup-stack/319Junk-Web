export type ServiceMedia = {
  src: string;
  alt: string;
};

export type ServiceItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  contactIntent?: ContactIntent;
  image: ServiceMedia;
  comparison?: {
    before: ServiceMedia;
    after: ServiceMedia;
  };
};

export type ServiceImageMode = "auto" | "comparison" | "image";
export type ServiceChangeSource = "pointer" | "keyboard" | "programmatic";

export type ServiceShowcaseProps = {
  items?: ServiceItem[];
  defaultActiveId?: string;
  activeId?: string;
  onActiveChange?: (id: string) => void;
  forceReducedMotion?: boolean;
  animationEnabled?: boolean;
  panelDurationMs?: number;
  tabDurationMs?: number;
  borderRadiusPx?: number;
  spacingScale?: number;
  imageMode?: ServiceImageMode;
  className?: string;
};
import type { ContactIntent } from "@/lib/site-config";
