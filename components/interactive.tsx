"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const brandMarkRef = useRef<HTMLSpanElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const closeMenu = () => setOpen(false);

  useLayoutEffect(() => {
    if (!brandMarkRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const animation = brandMarkRef.current.animate(
      [
        { opacity: 0, transform: "translateY(100%)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 650,
        delay: 60,
        easing: "cubic-bezier(.23,1,.32,1)",
        fill: "backwards",
      },
    );

    return () => animation.cancel();
  }, []);

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
    <a className="brand" href="#main" aria-label="319Junk home">
      <span className="brand-mark" ref={brandMarkRef}>
        <Image src="/brand/319junk-white.svg" alt="319Junk" width={150} height={93} priority />
      </span>
    </a>
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

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animations: Animation[] = [];
    const ease = "cubic-bezier(.23,1,.32,1)";
    const scrollEase = "cubic-bezier(.3,.35,.4,1)";
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
        const variant = entry.target.getAttribute("data-scroll-reveal");
        const keyframes = variant === "mark"
          ? [
              { opacity: .08, transform: "translateX(-18px) scale(.985)" },
              { opacity: 1, transform: "translateX(0) scale(1)" },
            ]
          : variant === "settle"
            ? [
                { opacity: .08, transform: "translateY(10px) scale(.985)" },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ]
            : [
                { opacity: .08, transform: "translateY(14px)" },
                { opacity: 1, transform: "translateY(0)" },
              ];
        animate(entry.target, keyframes, {
          duration: variant === "mark" ? 950 : variant === "settle" ? 950 : 800,
          easing: scrollEase,
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px 15% 0px" });

    root.current.querySelectorAll("[data-section-intro], [data-scroll-reveal]").forEach((element) => observer.observe(element));

    const groupObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll("[data-reveal-item]").forEach((element, index) => {
          animate(element, [
            { opacity: .08, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 800, delay: index * 80, easing: scrollEase });
        });
        groupObserver.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px 15% 0px" });

    root.current.querySelectorAll("[data-reveal-group]").forEach((element) => groupObserver.observe(element));

    const phoneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-revealed", "true");
        phoneObserver.unobserve(entry.target);
      });
    }, { threshold: .45 });

    root.current.querySelectorAll("[data-phone-reveal]").forEach((element) => phoneObserver.observe(element));
    return () => {
      observer.disconnect();
      groupObserver.disconnect();
      phoneObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return <div ref={root} className="motion-root">{children}</div>;
}
