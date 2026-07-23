# 319Junk design system

## Direction

319Junk uses an editorial-utility system: field-manual directness with premium restraint. The Iowa-shaped logo is the central brand device. Oversized headlines, hard black rules, strict alignment, monochrome contrast, square geometry, and purposeful whitespace communicate capability without adopting the visual language of a generic local-service template.

The current calibration is `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, and `VISUAL_DENSITY 3`. This is an evolution of the established identity, not a visual overhaul.

## Core tokens

- Ink: `#090909`
- Paper: `#FEFEFE`
- Secondary text: `#5A5A56`
- Borders: `#D8D8D3`
- Font: Geist Sans only
- Weights: 400 for body copy, 600 for headings and UI, 800 for display and section headings
- Content width: 1380px with fluid 20px to 64px gutters
- Section spacing: fluid 76px to 132px
- Controls: square, minimum 44px touch target, 1px to 2px rules, no decorative rounding
- Focus: 3px current-color outline with 4px offset
- Motion easing: `cubic-bezier(.23, 1, .32, 1)`

Paper is the only light interface color. Do not introduce pure white, cream, warm-white, or alternate light surfaces. All website text uses a solid foreground fill; do not use text stroke, transparent fills, outlined glyphs, or text-clipped backgrounds.

## Icon system

The icon family began as ChatGPT Imagegen concepts and was translated into deterministic inline SVGs for production clarity. Icons use the interface’s current color, a 24px square viewBox, 1.8px strokes, blunt square caps, mitered joins, and no containing circles or decorative tiles. The family covers residential, commercial, trailer, phone, message, loading services, boxes, local team, and external action.

Icons are reserved for contact-intent CTAs, Service Showcase tabs, mobile navigation, mobile Call/Text actions, and the external Facebook link. They remain decorative with `aria-hidden="true"`; adjacent visible labels preserve accessible names. Do not add icons to long-form content, FAQ rows, or footer navigation unless they improve a specific scanning problem.

The mobile menu contains Services, About, and FAQ followed by the Call/Text action row. A separate Contact menu item is intentionally omitted because the two direct contact actions are always present below the navigation. Mobile Call and Text actions share one visual treatment: paper background, ink text and icons, equal-width columns, and equal 56px target heights. Neither quick action receives primary emphasis.

## Layout and hierarchy

Document order is Hero, Services, About, FAQ, and Contact. Navigation follows that same sequence.

- Hero: asymmetric landscape and conversion split, with the headline aligned to the logo field. The display heading uses a `.93` line-height ratio. The deck forms two intentional lines on desktop and four shorter lines on mobile. On mobile it occupies approximately one usable viewport beneath the header while keeping both CTAs visible.
- Services: left-stacked introduction and a single Service Showcase. The highlight strip is the page's only perpetual animation.
- About: split composition with the Iowa phone mark and three unnumbered process rows.
- FAQ: centered introduction over a constrained disclosure list. FAQ content is immediately available and does not receive an entrance animation.
- Contact: concentrated final conversion block with explicit actions and a highly readable phone number.

The layout becomes single-column according to content needs near 1000px. Mobile conversion behavior begins at 700px: CTAs stack and navigation becomes a full-screen overlay.

## Motion tokens and rules

- Press feedback: `scale(.97)` over 125ms
- High-frequency controls: 180ms to 200ms
- CTA fill and color changes: 240ms
- Panel transitions: 220ms to 280ms, with exits shorter than entrances
- Marketing entrances: 550ms to 900ms
- Mobile navigation: 200ms opacity and 12px translate

Meaningful entrances are limited to these moments:

- Header brand mark slides up into the clipped nav frame from `translateY(100%)` over 650ms after a 60ms delay. Reduced-motion users see it in place immediately.
- Hero heading uses a per-letter 3D X-axis flip entrance (`LetterFlipFrame`, 1050ms per glyph, 60ms stagger, `cubic-bezier(0.22, 1, 0.36, 1)`). Reduced-motion users see the static headline immediately.
- Hero deck and CTAs rise 24px over 700ms in a top-to-bottom sequence after the heading. The sequence begins after 120ms and uses a 160ms stagger.
- Landscape fades while settling from `scale(1.02)` over 900ms.
- Hero logo fades while settling from `scale(.97)` over 800ms after a 220ms delay.
- Section introductions rise 20px and fade once over 550ms.
- Scroll entrances use a measured `cubic-bezier(.3,.35,.4,1)` curve and begin slightly visible at `.08` opacity to avoid a hard flash as content crosses the viewport edge.
- Selected marketing groups reveal their children from 12px below over 800ms with an 80ms stagger. This is reserved for the Services introduction, About story/process, final conversion block, and footer columns.
- The Service Showcase settles from `scale(.985)` and 10px below over 950ms. The About brand mark enters once from 18px left and `scale(.985)` over 950ms.
- Only the FAQ heading receives a 14px rise and fade over 800ms; disclosure rows and answers remain immediately available and do not participate in scroll choreography.
- The final phone number draws a two-pixel underline from left to right over 650ms the first time it enters the viewport. Reduced-motion users see the underline immediately.

FAQ disclosures, navigation, and frequently used controls remain immediately available. All nonessential movement is removed under `prefers-reduced-motion`. Hover-only effects are gated behind a fine-pointer media query. The service marquee becomes a static horizontal list for reduced-motion users.

## Components and interaction

Primary buttons invert to ink; secondary buttons stay outlined. CTA labels are intent-specific. Every `estimate` action opens the phone dialer on mobile and desktop. General and trailer mobile actions use prefilled SMS; their desktop actions use prefilled email when `NEXT_PUBLIC_CONTACT_EMAIL` exists and explicit phone labels when it does not.

The About Facebook link has no resting underline. Only the word “Facebook” receives a one-pixel line that reveals from left to right over 240ms on hover or keyboard focus, without changing layout.

The mobile menu remains mounted so opening and closing can reverse cleanly. The two-line hamburger uses interruptible CSS transforms. The menu locks body scrolling, moves focus to the first link, contains Tab navigation, closes with Escape or navigation, and restores focus to the trigger.

The Service Showcase keeps a square tab row, a single editorial image field, and a compact copy panel. Pointer changes use a zero-bounce shared-layout spring under 300ms. Arrow keys plus Home and End update selection without smooth scrolling or panel choreography. Panel changes use a short concurrent opacity and 3 percent vertical transition, with faster exits. Showcase CTAs act directly instead of scrolling to Contact.

Residential and Commercial use matched, owner-approved before-and-after image pairs. The comparison slider updates its clip, divider, handle, and ARIA values directly in the DOM. Pointer capture is preserved, pointer movement is limited to one update per animation frame, and keyboard control supports Arrow keys, Shift increments, Home, and End.

FAQ answers use the original 420ms grid-height and vertical transition with a 240ms opacity fade and `cubic-bezier(.2,.75,.25,1)` easing. FAQ disclosure buttons do not scale on press, keeping question titles visually fixed. The disclosure button owns state through `aria-expanded`, while the panel mirrors it with `aria-hidden`.

## Guardrails

Avoid gradients, glass effects, rounded card grids, generic decorative icons, unsupported testimonials, fake metrics, parallax, scroll hijacking, custom cursors, decorative 3D, additional marquees, and new business claims. Do not add eyebrow systems, section numbering, image pagination, decorative dots, version labels, status strips, ornamental captions, or scroll cues. Keep every visual device tied to brand, hierarchy, navigation, or conversion, and use only owner-approved 319Junk photography.
