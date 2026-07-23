# Project brief

## Business and objective

319Junk provides residential, commercial, and industrial junk removal, estate/property cleanouts, and trailer rentals across Eastern and Southeast Iowa. The site should turn high-intent local visitors into calls or texts while presenting the company as direct, capable, and premium without becoming corporate.

Primary audiences are homeowners, families managing estates, property managers, businesses, facilities, and project owners. Primary conversions are junk-removal estimate requests and trailer-rental inquiries. Secondary conversions are direct calls, general texts, Facebook visits, and service education.

## Confirmed information

- Phone: 319-461-6329
- Eastern and Southeast Iowa coverage
- Residential, commercial, and industrial removal
- Estate/property cleanouts and trailer rentals
- Free estimates and loading handled by 319Junk
- Same-day or next-day availability when possible, not guaranteed
- $140 minimum junk-removal charge

## Architecture and strategy

One mobile-first landing page: sticky navigation, hero, value strip, services (interactive showcase with owner photography), about, FAQ, final conversion block, and footer. Mobile booking and rental actions open prefilled SMS messages. Desktop actions use a verified email when configured and otherwise visibly fall back to phone.

Stack: Next.js App Router, React, TypeScript, Tailwind CSS, `next/image`, Framer Motion for scoped entrances, semantic HTML, and static marketing content. No CMS, database, authentication, analytics, cookies, paid APIs, forms, or customer data storage.

## Launch inputs

The verified owner email and final production domain are not yet available. They are replaceable through `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL`. Owner-approved service photography is live in `public/services/`; additional project photos can be added through `components/service-showcase/data.ts`.
