# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/portfolio website for FlyingDolly (a web development agency in Mt Maunganui, NZ), built with Next.js App Router. Pages: home (`/`), photography galleries (`/photography`, `/photography/portraits`, `/photography/go-freek-2026-tauranga`), and a contact form that sends email via SMTP.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`; ignore the stray `package-lock.json`).

```bash
pnpm dev              # start dev server
pnpm build            # production build
pnpm start            # serve production build
pnpm lint             # eslint .
pnpm format           # prettier --write .
pnpm format:check     # prettier --check .
pnpm test             # run full jest suite (coverage collected by default)
pnpm test:watch       # jest --watch
```

Run a single test file or test name directly with jest, e.g.:

```bash
pnpm jest __tests__/nav/Header.test.tsx
pnpm jest -t "closes mobile menu"
```

There is no CI workflow file yet, but the local convention (see `.github/copilot-instructions.md`) is: every change should pass lint, type check, tests, and build before being considered done. TDD is expected (see `.github/skills/test-driven-development/SKILL.md`) — for bug fixes, write a failing reproduction test first (Prove-It pattern).

## Environment variables

Required in `.env.local` (not committed):

- `toEmail`, `fromEmail`, `password` — used by `/api/send-email` (Zoho SMTP via nodemailer)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER` — used by the photography routes

`src/app/utils/cloudinary.ts` exports `requiredEnv(name)`, which throws if a variable is missing — use this pattern rather than silently defaulting when adding new server-side env reads.

## Architecture

- **App Router structure**: pages live under `src/app/**/page.tsx`. `src/app/layout.tsx` is the root layout — it wraps every page with `Header`, `FooterSection`, a `Toaster` (react-hot-toast), and `GoogleAnalytics` (`@next/third-parties`). Don't duplicate these in individual pages.
- **`src/app/utils/`** holds server- and client-side utilities: `cloudinary.ts` (lazy-configured Cloudinary client, server-only), `photography.ts` (fetches/caches Cloudinary photos via `unstable_cache`, 1hr revalidate), `analytics.ts` (thin wrapper around `window.gtag` for GA4 events — `trackSelectContent`, `trackGenerateLead`), `cookies-functions.ts` (client-side cookie helpers, SSR-safe), `navigation-links.ts` (single source of truth for header nav, including nested `subLinks` for flyout/mobile menus), `app-constants.ts` (shared string constants like company name).
- **Photography galleries** are server-rendered: each page under `src/app/photography/**` calls `getCloudinaryPhotosByFolder` (server-only, cached) and passes the resulting `PhotographyImage[]` into the client component `PhotographyGallery`.
- **Contact form flow**: `ContactForm` (client component) validates input client-side, POSTs JSON to `src/app/api/send-email/route.ts` (a Next.js Route Handler using nodemailer), then uses `useFlashMessages` (react-hot-toast wrapper) for success/error feedback and `cookies-functions.ts` to rate-limit repeat submissions (1hr cookie). GA lead-tracking events (`trackGenerateLead`) are fired at attempt/success/error.
- **Header/nav** (`src/components/nav/Header.tsx`) drives both the desktop hover flyout (`NavFlyout`, via Headless UI `Popover`) and the mobile slide-in menu from the same `NavigationLinks` data structure — when adding a nav item, add it once to `navigation-links.ts` and both menus pick it up.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Import order is enforced by prettier (`@trivago/prettier-plugin-sort-imports`): react → third-party → `@/components/*` → `@/lib/*` → relative imports.

## Testing

- Tests live in `__tests__/`, mirroring `src/` structure, using Jest + `@testing-library/react` + jsdom (config in `jest.config.ts`, `jest.setup.ts`).
- Server-only modules (Cloudinary, email) are exercised via mocks at the route/module boundary — check existing tests in `__tests__/api/` and `__tests__/photography/` for the established mocking pattern before adding new ones.
