"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { FAQItem } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuIcon = useRef<HTMLSpanElement>(null);
  const menuTimeline = useRef<{ play: () => unknown; reverse: () => unknown; progress: (value: number) => unknown } | null>(null);
  const openRef = useRef(open);

  useEffect(() => { document.body.classList.toggle("menu-open", open); return () => document.body.classList.remove("menu-open"); }, [open]);
  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    void import("gsap").then(({ gsap }) => {
      if (cancelled || !menuIcon.current) return;
      const context = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".menu-line");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const timeline = gsap.timeline({ paused: true, defaults: { duration: reduceMotion ? 0 : 0.32, ease: "power3.inOut" } })
          .to(lines[0], { y: 0, rotation: 45 }, 0)
          .to(lines[1], { y: 0, rotation: -45 }, 0);
        timeline.progress(openRef.current ? 1 : 0);
        menuTimeline.current = timeline;
      }, menuIcon);
      cleanup = () => { menuTimeline.current = null; context.revert(); };
    });
    return () => { cancelled = true; cleanup(); };
  }, []);

  useEffect(() => {
    if (open) menuTimeline.current?.play();
    else menuTimeline.current?.reverse();
  }, [open]);

  return <header className="site-header">
    <a className="brand" href="#main" aria-label="319Junk home"><Image src="/brand/319junk-white.svg" alt="319Junk" width={150} height={93} priority /></a>
    <a className="header-phone" href={siteConfig.phoneHref}><span>Call now</span><strong>{siteConfig.phoneDisplay}</strong></a>
    <nav className="desktop-nav" aria-label="Main navigation">{siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<a className="nav-cta" href="#contact">Contact</a></nav>
    <button className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
      <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
      <span className="menu-icon" ref={menuIcon} aria-hidden="true"><span className="menu-line" /><span className="menu-line" /></span>
    </button>
    <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {siteConfig.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      <div className="mobile-menu-contact" aria-label="Quick contact">
        <a href={siteConfig.phoneHref}>Call</a>
        <a href={siteConfig.smsGeneralHref}>Text</a>
      </div>
    </nav>
  </header>;
}

export function FAQList({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(0);
  return <div className="faq-list" data-reveal>{items.map((item, index) => <div className="faq-item" key={item.question}>
    <h3><button aria-expanded={open === index} aria-controls={`faq-panel-${index}`} onClick={() => setOpen(open === index ? -1 : index)}><span>{item.question}</span><i aria-hidden="true">{open === index ? "−" : "+"}</i></button></h3>
    <div id={`faq-panel-${index}`} className="faq-panel" data-open={open === index} aria-hidden={open !== index}>
      <div className="faq-panel-inner"><p>{item.answer}</p></div>
    </div>
  </div>)}</div>;
}

export function MotionController({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    void import("gsap").then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const context = gsap.context(() => {
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.from(".hero-copy > *", { y: 32, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "all" });
          const heroLandscape = root.current?.querySelector(".hero-landscape");
          if (heroLandscape) gsap.from(heroLandscape, { scale: 1.035, autoAlpha: 0, duration: 1.2, delay: 0.1, ease: "power3.out", clearProps: "all" });
          const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { gsap.fromTo(entry.target, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out", clearProps: "all" }); observer.unobserve(entry.target); } }), { threshold: 0.12 });
          root.current?.querySelectorAll("[data-reveal]:not(.hero-copy)").forEach((el) => observer.observe(el));
          return () => observer.disconnect();
        });
        cleanup = () => media.revert();
      }, root);
      cleanup = () => context.revert();
    });
    return () => { cancelled = true; cleanup(); };
  }, []);
  return <div ref={root} className="motion-root">{children}</div>;
}
