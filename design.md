# 319Junk design system

## Direction

“Editorial utility” combines a field-manual directness with premium restraint. The Iowa-shaped logo is the central brand device. Oversized headlines, hard black rules, strict alignment, monochrome contrast, and purposeful whitespace communicate capability without the visual noise common to local-service templates.

## Tokens

- Ink: `#090909`
- Paper: `#FEFEFE`
- Secondary text: `#5A5A56`
- Borders: `#D8D8D3`
- Font: Geist Sans only
- Weights: 400 for body copy, 600 for headings and UI, 800 for display and section headings
- Semantic type scale: display, section, heading, large body, body, UI, caption, price, and phone
- Content width: 1380px with fluid 20–64px gutters
- Section spacing: fluid 76–132px
- Controls: square, minimum 44px touch targets, 1–2px rules, no decorative rounding
- Focus: 3px current-color outline with 4px offset
- Motion: 180ms control feedback, 420ms structural transition, 700–1100ms coordinated entrances

Layout becomes single-column based on content needs at 1000px; mobile conversion patterns begin at 700px. Mobile is not a compressed desktop layout: CTAs stack, navigation becomes full-screen, and the Call/Text controls appear directly beneath the mobile menu links only while that menu is open.

The current design-taste calibration is design variance 6, motion intensity 4, and visual density 3. Desktop keeps the deliberate asymmetric hero composition; the mobile hero centers its heading, supporting copy, conversion actions, and phone line as one focused conversion block. Section introductions stack heading over explanation instead of forcing unrelated split-column alignment.

## Components and behavior

Primary buttons invert to black; secondary buttons remain outlined. The Service Showcase uses a square tab row, one editorial image field, and a compact copy panel instead of a card grid. Its active tab uses the ink/paper tokens, its tab list scrolls horizontally inside the component on narrow screens, and Arrow keys plus Home/End change the active service. FAQ items continue to use rules instead of card containers. Residential and Commercial expose the pointer-, touch-, and keyboard-capable comparison control with an identical placeholder image on both sides; matched owner-approved same-project pairs must replace those placeholders before launch proof is claimed.

GSAP is limited to coordinated transform-and-opacity entrances and the two-line hamburger-to-X transition. Hover feedback remains CSS. All nonessential motion disappears under `prefers-reduced-motion`; content never depends on animation.

The service-highlight strip is a continuous, divider-free marquee. A single gap token controls every label interval, including the loop seam: 84px at the checked desktop width and 44px on mobile. Its duplicated visual sequence is hidden from assistive technology, and reduced-motion users receive a static, horizontally scrollable list instead of forced movement.

The FAQ is a centered single-column composition: its desktop heading stays on one centered line above a constrained question list, then wraps naturally on small screens. The selected service tab uses paper-white text against the animated ink pill; inactive tabs remain transparent and gain a simple underline on hover.

FAQ answers open and close with a 420ms grid-height and vertical-position transition plus a shorter opacity fade. The button remains the disclosure control, `aria-expanded` and `aria-hidden` track its state, and the global reduced-motion rule removes the visible transition.

Avoid gradients, glass effects, rounded card grids, generic icons, unsupported testimonials, busy parallax, scroll hijacking, cursor effects, and decorative 3D. Service Showcase imagery must remain owner-approved 319Junk photography, and comparison pairs must show the same project.

All website text uses a solid foreground fill. Do not use `text-stroke`, transparent text fills, outlined glyphs, hollow display type, or text-clipped backgrounds anywhere in the interface.

White rule: `#FEFEFE` is the only white used for interface backgrounds, light text, borders, and gradient endpoints. Do not introduce pure white or off-white surface colors. Light sections all use the paper token without alternate cream, gray, or warm-white backgrounds.

Anti-slop rule: do not add eyebrow systems, section numbering, image pagination, decorative dots, version labels, status strips, fake metrics, gradient text, glows, glass effects, ornamental captions, scroll cues, or visible em/en dashes. Keep CTA labels consistent for each intent and keep every visual device tied to brand, hierarchy, navigation, or conversion.
