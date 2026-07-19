"use client";
import {
  contactIntentActions,
  primaryContactIntents,
  siteConfig,
  type ContactIntent,
} from "@/lib/site-config";
import { SiteIcon, type SiteIconName } from "@/components/site-icon";

const intentIcons: Record<ContactIntent, SiteIconName> = {
  estimate: "phone",
  general: "boxes",
  trailer: "trailer",
};

export function ResponsiveContactLink({
  intent,
  className,
}: {
  intent: ContactIntent;
  className?: string;
}) {
  const action = contactIntentActions[intent];
  const desktopLabel = siteConfig.contactEmail
    ? action.label
    : action.phoneFallbackLabel;

  return (
    <>
      <a
        className={`mobile-action ${className ?? ""}`.trim()}
        data-contact-intent={intent}
        href={action.mobileHref}
      >
        <SiteIcon name={intentIcons[intent]} />
        <span>{action.label}</span>
      </a>
      <a
        className={`desktop-action ${className ?? ""}`.trim()}
        data-contact-intent={intent}
        href={action.desktopHref}
      >
        <SiteIcon name={intentIcons[intent]} />
        <span>{desktopLabel}</span>
      </a>
    </>
  );
}

export function ContactActions({ location }: { location: "hero" | "footer" }) {
  return <div className={`contact-actions contact-${location}`}>
    {primaryContactIntents.map((intent, index) => <span className={`contact-action ${index ? "secondary" : "primary"}`} data-hero-sequence={location === "hero" ? "" : undefined} key={intent}>
      <ResponsiveContactLink intent={intent} />
    </span>)}
  </div>;
}
