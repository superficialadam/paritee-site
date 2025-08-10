Create a Next.js 15.4 TypeScript project (App Router) with:
- Tailwind CSS 4.1.x, ShadCN UI (latest), Framer Motion 12.23.x, GSAP 3.13.x, Lucide icons.
- React 19 support.
- Three prototype routes: /v1, /v2, /v3 (each with its own layout.tsx theme token set).

Global config:
- Fonts via next/font: "Montserrat" for headings, system UI for body.
- Tailwind: fluid type with clamp(), container paddings, CSS variables for theme tokens: --bg, --fg, --muted, --accent.
- Reduced motion: respect prefers-reduced-motion (disable transforms/animations).

Data (static, TS modules under /data) to cover sitemap:
- services.ts (id, name, blurb, icon)
- sectors.ts (id, name, description)
- geographies.ts (country, cities[])
- agencies.ts (id, name, logoUrl, blurb, locations[], sectors[])
- cases.ts (id, name, thumbnail, sectorId, serviceId, agencyId, excerpt)
- people.ts (id, name, role, location, avatarUrl, linkedin)
- news.ts (id, title, dateISO, excerpt, image)

Components (under /components) matching the sitemap:
- Header (logo left, nav right) with sticky + scroll hide/reveal; Footer (sitemap, legal/GDPR, newsletter).
- Hero (headline, subheadline, CTAs).
- MissionBlock (two-column editorial).
- NewsCarousel (scroll-snap with arrows).
- ServicesGrid (icons/cards).
- SectorsGrid (grid/list).
- GeoMapLite (2D list/map-like layout – no 3D, uses SVG pins or city list).
- AgenciesGrid (cards with logo + intro + “See Profile”).
- PeopleGrid (photo grid with hover states).
- CasesGallery (filter controls are stubbed but disabled; present visual gallery).
- ContactForm (Name/Email/Message only; no backend).
- Section (title/eyebrow/intro), CtaButtons, PullQuote.

Navigation (header):
Home, Services, Sector Specialisms, Geographies, Agencies, Cases, Team, News, Contact.
All are rendered as sections on the prototype pages (anchor links) rather than separate pages.

Project structure:
- /app/(prototypes)/v1, /v2, /v3 with page.tsx + layout.tsx
- /lib/animations.ts (Framer variants + GSAP helpers)
- /styles/globals.css (tokens, fluid type, reduced motion)
- /data/*.ts as above

Populate copy from client docs for:
- Hero (“No Compromise. Just Better.” + the trade-off copy),
- Mission paragraph,
- “Best of both worlds” bullet list.
