# Agent instructions

- Preserve the Next.js App Router/vinext architecture and Sites metadata.
- `lib/site-config.ts` is the source of truth for business facts, contact behavior, navigation, FAQs, services, and work data.
- `design.md` and CSS custom properties define the brand. Preserve the monochrome editorial-utility direction and supplied logo proportions.
- Never invent owner details, address, hours, email, reviews, disposal claims, trailer specifications, item policies, or availability guarantees.
- Desktop estimate actions must fall back visibly to phone when `NEXT_PUBLIC_CONTACT_EMAIL` is absent. Mobile actions remain prefilled SMS.
- Use only owner-approved photos. Before/after images must show the same project.
- Maintain WCAG 2.2 AA, keyboard access, focus visibility, 44px targets, safe-area spacing, semantic HTML, and reduced motion.
- Prefer server components. Client code is reserved for genuine interaction or scoped motion.
- Before completion run `npm run lint`, `npm run build`, and `npm test`; update `qa.md` with truthful results.
