import type { ReactNode, SVGProps } from "react";

export type SiteIconName =
  | "residential"
  | "commercial"
  | "trailer"
  | "phone"
  | "message"
  | "services"
  | "boxes"
  | "team"
  | "arrow-up-right";

const paths: Record<SiteIconName, ReactNode> = {
  residential: <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h9M19 9.5v5" />
    <path d="m14 16 3.5-1.5L21 16v5h-7Z" />
    <path d="m14 16 3.5 1.6L21 16M17.5 17.6V21" />
  </>,
  commercial: <>
    <path d="M4 21V3h13v18M2.5 21h19" />
    <path d="M7 6h2.5v2.5H7zM12 6h2.5v2.5H12zM7 11h2.5v2.5H7zM12 11h2.5v2.5H12z" />
    <path d="M8 21v-4h5v4M17 15h4v6h-4" />
  </>,
  trailer: <>
    <path d="M3 7h14l-2 8H5Z" />
    <path d="M5 10h10M15 13h5l1.5 2" />
    <circle cx="7.5" cy="18" r="2" />
    <circle cx="14.5" cy="18" r="2" />
  </>,
  phone: <path d="M7.1 3.5 10 7.8 7.9 10a16.2 16.2 0 0 0 6.1 6.1l2.2-2.1 4.3 2.9-.7 3.3c-.2.9-1 1.5-2 1.4A17.2 17.2 0 0 1 2.4 6.2c-.1-1 .5-1.8 1.4-2Z" />,
  message: <>
    <path d="M3 4h18v13H9l-5 4v-4H3Z" />
    <path d="M7 9h10M7 13h7" />
  </>,
  services: <>
    <path d="M3 3h3l2.5 15H21" />
    <path d="M8 8h10l2 10H8.5" />
    <path d="M12 8v3h4V8" />
    <circle cx="10" cy="21" r="1.5" />
    <circle cx="18.5" cy="21" r="1.5" />
  </>,
  boxes: <>
    <path d="m8 4 4-2 4 2-4 2Z" />
    <path d="M8 4v5l4 2 4-2V4M12 6v5" />
    <path d="m3 13 4-2 4 2-4 2Z" />
    <path d="M3 13v5l4 2 4-2v-5M7 15v5" />
    <path d="m13 13 4-2 4 2-4 2Z" />
    <path d="M13 13v5l4 2 4-2v-5M17 15v5" />
  </>,
  team: <>
    <circle cx="8" cy="7" r="3" />
    <circle cx="16.5" cy="8" r="2.5" />
    <path d="M2.5 21v-3.5A5.5 5.5 0 0 1 8 12a5.5 5.5 0 0 1 5.5 5.5V21ZM13.5 14.2a4.7 4.7 0 0 1 8 3.3V21h-4.5" />
  </>,
  "arrow-up-right": <>
    <path d="M6 18 18 6" />
    <path d="M9 6h9v9" />
  </>,
};

interface SiteIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: SiteIconName;
  size?: number;
}

export function SiteIcon({ name, size = 20, className, ...props }: SiteIconProps) {
  return <svg
    aria-hidden="true"
    className={`site-icon ${className ?? ""}`.trim()}
    fill="none"
    focusable="false"
    height={size}
    stroke="currentColor"
    strokeLinecap="square"
    strokeLinejoin="miter"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    {paths[name]}
  </svg>;
}
