# Quality assurance

## Automated checks

Validated July 13, 2026.

- [x] ESLint — passed
- [x] Production build — passed
- [x] Rendered HTML tests — 2 passed, 0 failed

## Functional and responsive

- [x] Header anchors and skip link
- [x] Mobile menu open, close, focus, and navigation
- [x] Call links and prefilled SMS links inspected without sending
- [x] Desktop phone fallback shown when email is absent
- [x] FAQ pointer and native-button keyboard behavior
- [x] 320, 375, 390, 430, 768, 1024, 1280, and 1440px layouts
- [x] No horizontal overflow or clipped primary content at tested widths
- [x] Mobile Call/Text controls appear only inside the open menu
- [x] No missing images, local 404s, or site console errors

## Accessibility, SEO, and performance

- [x] Logical headings and landmarks inspected in the accessibility tree
- [x] Keyboard navigation and visible focus styles
- [x] Minimum 44px touch targets
- [x] High-contrast monochrome palette
- [x] Reduced-motion CSS and GSAP media-query handling
- [x] Useful image alt text and decorative-image handling
- [x] Metadata, canonical URL, Open Graph, robots, sitemap, and conservative JSON-LD
- [x] Responsive image dimensions and lazy loading below the fold

## Audit notes

The July 13 Service Showcase port copied the nine requested portable files from `masermediagroup-stack/maser-lab` at source revision `b2182cf5671ea26dba90324904a129957f1a5f0d`; `service-showcase-demo.tsx` was not copied. The component was adapted to Geist Sans, the `#FEFEFE` paper token, square geometry, and the existing no-arrow rule. `framer-motion` now powers the scoped tab and panel transitions, and a local `cn()` utility supports the portable class composition.

The three visible panels use verified 319Junk service copy from `lib/site-config.ts` and owner-supplied photography. Residential and Commercial activate the comparison control with matched project pairs; Trailer Rentals uses a branded trailer image. Showcase CTAs lead to the responsive contact section so the existing mobile SMS and desktop phone fallback behavior remains authoritative.

Browser checks confirmed pointer selection and Arrow-key navigation across the service tabs, the correct active tab/panel relationship, zero console errors, and no page-level horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280, and 1440px. On narrow screens the tab list scrolls inside its own container. The final validation passed ESLint, the vinext production build, and both rendered-HTML tests.

The combined desktop/mobile design pass found strong hierarchy, clear above-the-fold service context, obvious conversion actions, and consistent monochrome branding. The mobile menu keeps calls/texts discoverable without adding a persistent overlay to the landing page.

The July 13 pass applied the installed `web-design-guidelines` and `compact-landing` skills across the production interface. It tightened the section rhythm while preserving the established editorial-utility direction; moved hover-only treatments behind fine-pointer media queries; added balanced headings, pretty body wrapping, tabular numerals, touch-action defaults, active feedback, menu overscroll containment, and larger inline-link targets; and added a browser theme color. The GSAP hero mark reveal now uses transform and opacity only. The comparison component has a visible focus-within state and touch-safe drag behavior.

The updated layout was rechecked at 320, 375, 390, 430, 768, 1024, 1280, and 1440px. All tested widths reported a page scroll width equal to the viewport width. Navigation switched at the intended breakpoint, FAQ disclosure state changed correctly, the menu locked body scrolling while open, lazy images loaded when brought into view, and the browser console reported no warnings or errors.

The latest mobile-contact pass removed the standalone sticky Call/Text navigation and verified that the same controls exist only within the opened mobile menu. The service-highlight strip now uses a continuous CSS marquee with no internal borders, no wrapped labels, no page-level overflow at 455px, and a static overflow fallback under `prefers-reduced-motion`.

The FAQ alignment pass verified a centered, single-line desktop heading above a centered 1050px question column at 1066px. At 390px the heading wraps normally, the FAQ list remains within its 350px content area, and page width stays equal to the viewport. Selected service-tab text resolves to `#FEFEFE`; inactive tabs remain black on transparent and underline on hover-capable pointers.

The FAQ motion pass replaced instant `hidden` toggling with an accessible grid-height, translate, and opacity transition. Browser inspection confirmed the panel exposes 420ms/240ms transition durations and passes through an intermediate height and opacity before settling. Reduced-motion CSS continues to reduce all transition durations to near-zero.

The service-tab contrast fix replaced the animated pill's escaping negative layer with an isolated stacking context: the ink background now paints at layer 0 and the label at layer 10. After switching to Commercial, browser inspection confirmed the visible label is opaque `#FEFEFE` above the pill background.

The marquee-spacing pass replaced compounded label and group padding with one shared gap token. Browser measurements reported eleven consecutive 84px gaps at desktop and eleven consecutive 44px gaps at 390px, including the repeated-sequence seam; mobile document width remained equal to its viewport width.

The Residential and Commercial tabs now render the comparison control with owner-supplied, matched before/after project photos. The redundant Cleanouts tab was removed, and Trailer Rentals now uses the supplied 319Junk trailer image. Local browser QA previously confirmed correct Before/After labeling and keyboard adjustment from 50% to 52% with Arrow Right; the updated local assets retain the same interaction component.

The comparison divider now mounts directly at its 50% value. The former intersection intro that temporarily moved it to 42% was removed, so switching between Residential and Commercial no longer makes the handle travel into the center; pointer dragging and keyboard adjustment remain unchanged.

The initial-scroll fix removed `scrollIntoView()` from the service-tab hydration effect because it could move the entire document to the Services section. The replacement adjusts only the tab scroller's horizontal `scrollLeft` when an active tab is clipped. A fresh load of `http://localhost:3000/` remained at `scrollY: 0` immediately and after one second, with an empty hash, the hero at the top beneath the 72px header, tab scroll-left at 0, and no console errors.

The Services introduction now centers its heading and supporting copy at the 700px mobile breakpoint while retaining the existing desktop alignment. The responsive rule also centers the copy block itself with auto inline margins.

The July 13 typography pass applied the installed `better-typography` skill. It removed all eyebrow labels, section and service indices, hero micro-copy, mobile-navigation indices, field-note captions, and the small uppercase photo disclaimer. Geist Sans is now the sole interface typeface. The rendered system uses three weights (400, 600, and 800), consistent semantic size tokens, 16px body copy, 14px UI copy, controlled 60–65 character measures, font smoothing, disabled synthetic weights, and normalized wrapping, tracking, and line heights. Desktop and 390px mobile checks confirmed descending heading sizes, no remaining micro-label elements, and no horizontal overflow.

Outlined text was removed from the hero and prohibited in the design system. A source scan confirmed there are no remaining text-stroke or text-clipped display treatments.

The final CTA phone number was moved directly beneath the action buttons. Its decorative top rule and extra top padding were removed to tighten the conversion group.

The July 13 anti-slop pass applied the installed `design-taste-frontend` skill with design variance 6, motion intensity 4, and visual density 3. It replaced the mobile navigation word and decorative dot with a two-line hamburger that transitions to an X, centered the complete mobile hero conversion block, shortened the hero supporting copy, unified desktop and mobile CTA labels, tightened the sticky header, stacked section introductions, and prohibited recurring AI-template decoration. The Service Showcase now uses owner-supplied 319Junk project photography.

Screenshot review cannot establish complete WCAG 2.2 AA compliance. Automated accessibility tooling and assistive-technology testing remain useful before a custom-domain launch.

`npm audit --omit=dev` reports two moderate PostCSS advisories nested under the current Next.js dependency. The suggested automated fix would downgrade Next.js to an incompatible major version, so no forced mutation was applied. Recheck when the framework publishes a compatible patched dependency.

## Launch blockers and limitations

- Add a verified owner email to `NEXT_PUBLIC_CONTACT_EMAIL` for desktop email CTAs.
- Set `NEXT_PUBLIC_SITE_URL` when the final domain is known.
- Continue adding owner-approved 319Junk photography as new projects are documented; no unverified Facebook images are used.
