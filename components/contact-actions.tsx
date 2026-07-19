"use client";
import { contactActions } from "@/lib/site-config";

export function ContactActions({ location }: { location: "hero" | "footer" }) {
  return <div className={`contact-actions contact-${location}`}>
    {contactActions.map((action, index) => <span className={`contact-action ${index ? "secondary" : "primary"}`} key={action.label}>
      <a className="mobile-action" href={action.mobileHref}>{action.label}</a>
      <a className="desktop-action" href={action.desktopHref}>{action.label}</a>
    </span>)}
  </div>;
}
