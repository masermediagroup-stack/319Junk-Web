# Quality assurance

Validated July 19, 2026.

## Automated checks

- [x] `npm install`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm test`: 2 tests passed, 0 failed
- [x] `git diff --check`

The install removed 153 unused vinext, Vite, Cloudflare, Wrangler, and Drizzle packages and synchronized the lockfile. `npm audit --omit=dev` reports two moderate advisories in PostCSS nested under Next.js. The automated fix proposes an incompatible Next.js downgrade, so no forced fix was applied.

## Vercel deployment remediation

- The failed production deployment `dpl_6t1c6E2oo8g8AYmZK38kBZywuM6z` built vinext successfully but failed because Vercel's Next.js preset could not find the required `.next` output directory.
- Runtime scripts now use native `next dev`, `next build`, and `next start`.
- OpenAI Sites metadata, Sign in with ChatGPT helpers, Cloudflare worker/build integration, unused D1 examples, and generic starter assets were removed.
- The project remains a single native Next.js App Router application; Vercel Services configuration is neither present nor required.
- The native production build now prerenders `/`, `/_not-found`, `/robots.txt`, and `/sitemap.xml` successfully.
- The public production alias is `https://319-junk-web.vercel.app`; it returns HTTP 200 and is the fallback canonical origin when `NEXT_PUBLIC_SITE_URL` is absent.
- Production deployment `dpl_dVcWEnATNuEFAQBXS2epHenXRXnS` completed with Vercel state `READY`. A post-deploy fetch returned HTTP 200, the expected landing-page title, and canonical URL `https://319-junk-web.vercel.app`.
- Local `vercel build --prod` completed the application build but Windows blocked Vercel's final local symlink packaging with `EPERM`; the authoritative remote Linux build completed successfully.

## Responsive visual baseline

Before-edit and after-edit screenshots were captured from localhost at 1440x900, 1024x768, 390x844, and 320x568. The after-edit document reported no page-level horizontal overflow at all four widths.

- Desktop confirms the final Hero, Services, About, FAQ, and Contact order and distinct section compositions.
- The 390px and 320px heroes keep both conversion actions inside the first usable viewport beneath the sticky header.
- Loaded images completed with nonzero natural dimensions.
- The final phone number remains readable and visually connected to the conversion actions.
- Focus visibility, contrast, sticky-header offsets, and section anchors were inspected in-browser.

The desktop hero spacing follow-up moved the Iowa mark into the same content grid as the copy instead of positioning it against the viewport. At 1440px the measured copy-to-logo grid gap is 87px; at 1024px it is 56px. The headline-to-deck and deck-to-action gaps are both 28px, document overflow remains zero, and the 390px mobile hero remains unchanged with both CTAs visible.

## Interaction checks

### Mobile navigation

- The mounted menu reverses cleanly during a rapid open and close. Browser sampling observed opacity at 0.93 while opening and 0 after the immediate reversal completed.
- Opening moves focus to Services and locks body scrolling.
- Shift+Tab from Services wraps to Text; Tab from Text wraps to Services.
- Escape closes the menu and restores focus to the menu trigger.
- Navigation links close the menu.
- The CSS hamburger transform remained interruptible during rapid toggling.

### Service Showcase

- Pointer selection and Arrow, Home, and End navigation update the selected tab, focus, and associated panel.
- Keyboard panel content settles with opacity 1 and no transform, so keyboard changes do not receive panel choreography.
- The browser session exercised the reduced-motion branch, which reported zero-duration service motion.
- Narrow-screen tab scrolling stays inside the component rather than moving the page.
- Service CTAs act directly and no longer introduce an extra scroll-to-contact step.

### Comparison slider

- The handle measures 44px by 44px.
- Arrow Right changed 50 to 52.
- Shift+Arrow Right changed 52 to 62.
- Home changed the value to 0; End changed it to 100.
- A pointer press on the handle updated the ARIA value, clipped image, divider, and handle transform.
- Source inspection confirms pointer movement writes directly to refs and DOM styles at most once per animation frame rather than setting React state on every event.

### FAQ

- `aria-expanded` and `aria-hidden` remain synchronized on open and close.
- Computed timing is 260ms for grid height, 180ms for opacity, and 220ms for the vertical transform.
- FAQ content remains immediately available and does not use a page-entrance reveal.

### Contact intents

- With `NEXT_PUBLIC_CONTACT_EMAIL` unset, visible desktop actions use explicit telephone labels such as "Call for a free estimate" and "Call about trailer rentals."
- With it set to a test address, every desktop intent uses a prefilled `mailto:` URL.
- In both configurations, every mobile intent remains a prefilled SMS URL.
- Contact behavior is centralized in `lib/site-config.ts` through the estimate, general, and trailer intents.

## Production Lighthouse

The production bundle was previously served through its generated Wrangler worker with `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for this Lighthouse snapshot. The current deployment target is native Next.js on Vercel; rerun Lighthouse against the Vercel production URL after deployment.

- Performance: 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- Largest Contentful Paint: 1540ms
- Cumulative Layout Shift: 0
- Total Blocking Time: 0ms
- First Contentful Paint: 300ms
- Console errors: 0

The LCP and CLS targets passed. Lighthouse does not produce a field INP value, so the requested INP-under-200ms target cannot be claimed from this lab run; zero TBT and the direct interaction checks are supporting evidence only. Lighthouse produced a complete valid report, then Chrome Launcher logged a Windows `EPERM` warning while removing its temporary profile.

The earlier vinext preview limitation is no longer applicable because the Sites/vinext runtime has been removed. Native `next build` now completes successfully and the rendered-HTML tests read the prerendered Next.js page output.

## Reduced motion and pointer rules

- Marketing entrances exit early when `prefers-reduced-motion: reduce` matches.
- Service tab, panel, comparison, FAQ, control, and menu transitions reduce to effectively zero duration.
- The service marquee becomes a static horizontal list.
- Hover-only treatments are scoped to fine pointers.
- The marquee remains the page's only perpetual animation.

The infinite-marquee follow-up corrected a loop segment that was shorter than the desktop viewport. Each segment now contains two service-highlight sequences, has a minimum width of one viewport, and is paired with an identical segment for the 50 percent translation seam. Browser measurements reported equal 1988px segments inside the 1425px desktop viewport, equal 2560px segments at the ultrawide check, equal 1508px segments inside the 375px mobile layout, and zero page overflow at every checked width.

The FAQ motion regression follow-up restored the original 420ms accordion easing and 240ms opacity fade. FAQ buttons were removed from the global press-scale selector so question titles remain stationary during pointer activation. A localhost interaction check confirmed that all seven question buttons retained `transform: none`, only the selected disclosure reported `aria-expanded="true"`, the opening and closing panels animated concurrently, and page overflow remained zero.

The About Facebook-link follow-up removed the persistent border and scoped a 240ms left-to-right underline reveal to the word “Facebook.” The same reveal is available through `:focus-visible`. Localhost computed-style checks confirmed a zero-width resting transform, no link border, the expected transition duration, stable text dimensions, and zero page overflow.

The hero typography follow-up changed the display line-height ratio from `.88` to `.93`, replaced the mobile deck’s incidental wrapping with four controlled text segments, and increased the entrance cadence from 60ms to 160ms. The stagger now runs heading, deck, primary CTA, and secondary CTA from top to bottom; the decorative landscape and desktop logo retain their own fades. At 390×844 and 320×568, all four deck segments measured as single lines. At 320px the CTA group ended 71px above the hero bottom. The 1440×900 check retained a two-line desktop deck, and all three checks reported zero page overflow.

The icon-system follow-up used ChatGPT built-in Imagegen to establish eight monochrome pictograms, then translated the selected silhouettes into accessible inline SVGs. At the 319px mobile preview, all four navigation links contained one icon and measured 69.6px tall; Call and Text each contained one icon and measured 56px tall; initial menu focus still landed on Services. At 1440×900, all three service tabs contained one icon and measured 50.2px tall, both visible hero CTAs contained one icon and measured 56px tall, the Facebook action contained its external arrow, page overflow was zero, and the console reported no errors.

The mobile quick-action follow-up gives Call and Text identical paper-and-ink styling, equal widths, matching icons, and the same hover inversion. A two-pixel ink divider preserves separation without creating a primary and secondary hierarchy.

The mobile-menu simplification removes the redundant Contact navigation row because Call and Text remain directly available beneath the three section links. A focused online reference scan found hauling trucks, cargo boxes, and waste pickup as the most common service pictograms; ChatGPT built-in Imagegen then produced an original dolly-and-box concept, which was translated into a new 24px `services` SVG rather than copying a marketplace asset. At 390×844, the menu exposed exactly Services, About, and FAQ at 69.6px tall, followed by Call and Text; the Services SVG measured 24px, initial focus landed on Services, Contact was absent, overflow was zero, and the console reported no errors.

The mobile-hero height follow-up changes the hero minimum to `max(370px, calc(100dvh - 270px))` and adds a compact-height fallback below 650px. At 390x844, the hero measured 574px tall, both CTAs retained 96px of bottom clearance, 70px of the "One call. More space." heading was visible in the initial viewport, and horizontal overflow was zero. At 319x562, the content-driven hero measured 379.6px tall, both CTAs retained 12px of bottom clearance, 54.4px of the next heading was visible, and horizontal overflow was zero. The temporary responsive viewport override was reset after verification.

The post-change repository gates passed: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

The comparison-handle alignment follow-up removed a duplicate Tailwind translate from the transform-driven slider handle. At 390x844, the divider and visible arrow box both centered at 187.5px with a zero-pixel delta. The mobile handle retained a 48px interaction target and 32px visible control, remained positioned at 70 percent of the image height, and produced no horizontal overflow. The live screenshot confirmed that the arrow box now intersects the divider rather than floating to its left.

The post-change repository gates passed again: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

The Commercial service CTA now uses the same centralized `estimate` contact intent as Residential. In the live mobile layout, both tabs rendered the same "Get a free estimate" label, estimate SMS URL, phone icon, CSS classes, 546.3px available width, and 58.8px height. With email unset, both desktop tabs derive the same explicit "Call for a free estimate" phone fallback. No business facts or contact destinations were duplicated outside `lib/site-config.ts`.

The post-change repository gates passed again: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

The hero-photo follow-up replaces the previous landscape with the owner-supplied 2160x1388 Iowa cornfield image at `public/images/iowa-cornfield-hero.jpg`. The hero now uses the responsive Next.js image pipeline while preserving the existing decorative alt treatment, priority loading, overlay, and viewport-specific crop. Localhost checks at 1440x900 and 390x844 confirmed that the image completed loading through `/_next/image`, the mobile crop retained its 58 percent horizontal focal point, and horizontal overflow remained zero.

The post-change repository gates passed again: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

The mobile hero-overlay follow-up reduces the paper wash at the top from 70 percent to 42 percent and at the midpoint from 82 percent to 70 percent, while retaining the full paper fade at the bottom for the section transition. The desktop overlay is unchanged. A live 390x844 computed-style check confirmed the updated gradient, successful hero-image loading, and zero horizontal overflow.

The mobile FAQ-heading follow-up uses two intentional text rows and a narrower fluid display size below 700px, keeping “Straight answers,” and “honest work.” on separate lines rather than allowing a three-line wrap. The final phone number now reveals a two-pixel underline from left to right once 45 percent of the link enters the viewport; hover and keyboard focus expose the same underline, while reduced-motion users receive the completed underline immediately. The interaction uses a scoped `IntersectionObserver`, transforms only, and disconnects on teardown.

The post-change repository gates passed: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

The scroll-choreography follow-up applies Emil Kowalski’s frequency, purpose, speed, and function gate to the remaining marketing surface. It adds one-time transform-and-opacity entrances to the Services heading and showcase, About brand mark and process story, FAQ heading, final conversion group, and footer columns. Group entrances use a 55ms stagger; the Service Showcase settles without bounce; the About mark receives a directional entrance. Navigation, FAQ disclosures, the comparison slider, service tabs, and the marquee were deliberately excluded from new scroll animation because they are frequent, functional, information-dense, or already animated. Reduced-motion users bypass every new entrance.

At 443x1272, a live Services check captured the heading and showcase mid-transition, then confirmed both settled at opacity 1 and `transform: none`; a separate About check captured the brand mark mid-entry and confirmed its final settled state. Both checks reported zero page-level horizontal overflow.

The post-change repository gates passed: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

The entrance-pacing follow-up addresses a visible flash caused by observer-driven keyframes being attached after the first paint. `MotionController` now prepares animation work in `useLayoutEffect`, and scroll observers use a positive 15 percent bottom root margin so entrances begin just before content reaches the viewport. Scroll motion starts at 8 percent opacity with reduced displacement, uses a more measured `cubic-bezier(.3,.35,.4,1)` curve, and runs for 800ms on grouped copy or 950ms on image/showcase holders. The stagger increased to 80ms. Hero sequencing, interaction feedback, FAQ disclosures, navigation, and reduced-motion behavior remain unchanged.

A 443x1272 localhost timing check confirmed the Services heading and showcase were visibly progressing at the early and middle samples, then settled at opacity 1 and `transform: none`; horizontal overflow remained zero.

The post-change repository gates passed: `npm run lint`, `npm run build`, and `npm test`. The test command completed a second production build and both rendered-HTML tests passed.

Before publication, local `main` was fast-forwarded to merged PR #2 (`5002e99`). Its “Serving Eastern &amp; Southeast Iowa” hero line, title-cased service names, and unhyphenated minimum-charge FAQ wording were preserved. The only overlap resolved in favor of the local UX work was the Commercial service contact intent, which remains `estimate` so its CTA matches Residential as requested.

After the PR #2 synchronization, `npm run lint`, `npm run build`, and `npm test` passed. The test command completed a second production build and both rendered-HTML tests passed.

The estimate-contact follow-up routes every `estimate` CTA directly to `tel:+13194616329` on mobile and desktop. This affects the hero, Residential and Commercial service panels, and final conversion block through the centralized `contactIntentActions.estimate` record. Trailer-rental and explicit Text actions retain their existing SMS behavior.

The production HTML contains six rendered `estimate` links, all targeting `tel:+13194616329`, with zero estimate links targeting `sms:`. A regression assertion now protects the centralized mobile and desktop phone destinations. `npm run lint`, `npm run build`, and `npm test` passed; the test command completed a second production build and both rendered-HTML tests passed.

## Launch blockers and limitations

- Add the verified owner email to `NEXT_PUBLIC_CONTACT_EMAIL` if desktop email actions are desired.
- Set `NEXT_PUBLIC_SITE_URL` when the final domain is known. The current configured production placeholder does not resolve.
- Lighthouse is a lab audit and does not replace field Core Web Vitals, assistive-technology testing, or a complete WCAG 2.2 AA audit.
- Continue using only owner-approved photography and matched same-project before-and-after pairs.
