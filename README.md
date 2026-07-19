# 319Junk website

Production-ready single-page marketing site for 319Junk, serving Eastern and Southeast Iowa. Built with Next.js, TypeScript, Tailwind CSS, React, and the Sites-compatible vinext runtime.

## Local development

Requires Node 22.13 or newer.

```bash
npm install
npm run dev
npm run lint
npm run build
npm test
```

## Configuration

All repeated business data and contact behavior lives in `lib/site-config.ts`.

- `NEXT_PUBLIC_CONTACT_EMAIL`: verified owner email. Until provided, desktop estimate and trailer buttons visibly fall back to calling `319-461-6329`.
- `NEXT_PUBLIC_SITE_URL`: final canonical domain. Until provided, the Sites URL is used.

Do not guess either value. The missing verified email is a launch blocker for email CTAs, though the site remains fully functional through calls and texts.

## Assets and work photos

Brand files live in `public/brand/`. Do not redraw, crop, stretch, or recolor the supplied logo.

The Service Showcase uses owner-supplied 319Junk photography. Residential and Commercial contain matched before/after pairs, and Trailer Rentals contains an approved trailer image. To add or replace project photography:

1. Add owner-approved images to `public/work/` with descriptive filenames.
2. Replace the `image` paths and alt text in `src/components/service-showcase/data.ts`; keep service titles, descriptions, and CTA labels in `lib/site-config.ts`.
3. Confirm both comparison photos show the same project, then replace the relevant `comparison` pair in `src/components/service-showcase/data.ts`. The reusable slider is `src/components/service-showcase/before-after-slider.tsx`.
4. Add factual alt text, image dimensions, and responsive `sizes`.

## Deployment and domain

The project builds for Sites and remains Vercel-compatible. For Vercel, import the Git repository, set the two optional public environment variables, and deploy with the default Next.js settings. To connect a custom domain, add it in the hosting dashboard, follow the provided DNS records, then set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin and redeploy.

## Launch checklist

- Add the verified owner email.
- Add owner-approved real work, trailer, and/or team photography.
- Replace the provisional canonical URL if a custom domain is purchased.
- Reconfirm services, service area, phone, minimum charge, and availability wording with the owner.
- Run lint, build, tests, keyboard QA, and responsive QA after content changes.
