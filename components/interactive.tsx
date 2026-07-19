"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { FAQItem } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";
import { SiteIcon, type SiteIconName } from "@/components/site-icon";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const mobileNavIcons: Record<string, SiteIconName> = {
  "#services": "services",
  "#about": "team",
  "#faq": "message",
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    if (!open) {
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
      return () => document.body.classList.remove("menu-open");
    }

    restoreFocusRef.current = menuButtonRef.current;
    const focusFrame = requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return <header className="site-header">
    <a className="brand" href="#main" aria-label="319Junk home"><Image src="/brand/319junk-white.svg" alt="319Junk" width={150} height={93} priority /></a>
    <a className="header-phone" href={siteConfig.phoneHref}><span className="header-phone-label"><SiteIcon className="header-phone-icon" name="phone" size={14} /><span>Call now</span></span><strong>{siteConfig.phoneDisplay}</strong></a>
    <nav className="desktop-nav" aria-label="Main navigation">{siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<a className="nav-cta" href="#contact">Contact</a></nav>
    <button
      ref={menuButtonRef}
      className="menu-button"
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={() => setOpen((current) => !current)}
    >
      <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
      <span className="menu-icon" aria-hidden="true"><span className="menu-line" /><span className="menu-line" /></span>
    </button>
    <nav
      ref={menuRef}
      id="mobile-menu"
      className="mobile-nav"
      aria-label="Mobile navigation"
      aria-hidden={!open}
      data-open={open}
      inert={!open}
    >
      {siteConfig.navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}><SiteIcon className="mobile-nav-icon" name={mobileNavIcons[item.href] ?? "arrow-up-right"} /><span>{item.label}</span></a>)}
      <div className="mobile-menu-contact" aria-label="Quick contact">
        <a href={siteConfig.phoneHref}><SiteIcon name="phone" /><span>Call</span></a>
        <a href={siteConfig.smsGeneralHref}><SiteIcon name="message" /><span>Text</span></a>
      </div>
    </nav>
  </header>;
}

export function FAQList({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{items.map((item, index) => <div className="faq-item" key={item.question}>
    <h3><button aria-expanded={open === index} aria-controls={`faq-panel-${index}`} onClick={() => setOpen(open === index ? -1 : index)}><span>{item.question}</span><i aria-hidden="true">{open === index ? "−" : "+"}</i></button></h3>
    <div id={`faq-panel-${index}`} className="faq-panel" data-open={open === index} aria-hidden={open !== index}>
      <div className="faq-panel-inner"><p>{item.answer}</p></div>
    </div>
  </div>)}</div>;
}

export function MotionController({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animations: Animation[] = [];
    const ease = "cubic-bezier(.23,1,.32,1)";
    const animate = (
      element: Element,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      const animation = element.animate(keyframes, { fill: "backwards", ...options });
      animations.push(animation);
    };

    root.current.querySelectorAll("[data-hero-sequence]").forEach((element, index) => {
      animate(element, [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 700, delay: 120 + index * 160, easing: ease });
    });

    const landscape = root.current.querySelector("[data-hero-landscape]");
    if (landscape) animate(landscape, [
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1 },
    ], { duration: 900, easing: ease });

    const logo = root.current.querySelector("[data-hero-logo]");
    if (logo) animate(logo, [
      { opacity: 0, scale: .97 },
      { opacity: 1, scale: 1 },
    ], { duration: 800, delay: 220, easing: ease });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target, [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 550, easing: ease });
        observer.unobserve(entry.target);
      });
    }, { threshold: .16 });

    root.current.querySelectorAll("[data-section-intro]").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return <div ref={root} className="motion-root">{children}</div>;
}
