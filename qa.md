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

## Launch blockers and limitations

- Add the verified owner email to `NEXT_PUBLIC_CONTACT_EMAIL` if desktop email actions are desired.
- Set `NEXT_PUBLIC_SITE_URL` when the final domain is known. The current configured production placeholder does not resolve.
- Lighthouse is a lab audit and does not replace field Core Web Vitals, assistive-technology testing, or a complete WCAG 2.2 AA audit.
- Continue using only owner-approved photography and matched same-project before-and-after pairs.
