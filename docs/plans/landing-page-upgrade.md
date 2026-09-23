# Landing page upgrade — implementation plan

Source: marketing audit dated 2026-09-20 (score 38/100). Branch: `upgrade-landing-page`.

## Decisions (made by the site owner)

1. **No invented content.** Testimonials, pricing, email and phone live in
   `src/app/utils/site-content.ts`, which starts empty. Every component that
   reads it renders **nothing** while its data is empty. Never add
   placeholder testimonials, prices, or contact details.
2. **CTA copy is renamed** from "Book a free call" to **"Get a free quote"**.
   Its behaviour stays the same: it scrolls to the contact form (or goes to
   `/#contact-form-section` from other pages).
3. **Scope:** quick wins plus the homepage rewrite. This branch adds no new
   `/services`, `/pricing`, or `/contact` pages.
4. **Privacy:** add a `/privacy-policy` page (NZ Privacy Act 2020) and a
   cookie consent banner. **GA4 only loads after the visitor accepts.**

## Positioning (use this copy direction everywhere)

FlyingDolly is **one team for websites, automation, and photography/video**,
built as a single system that grows Bay of Plenty businesses. It is not
"just a web shop".

- Hero H1: "We build the websites, automation, and content that grow Bay of
  Plenty businesses." (keep the existing `<mark>` highlight style on a key
  phrase)
- Hero subhead: "One team handling your web design, back-office automation,
  and photography/video — so your online presence and your operations grow
  together, not in silos."
- Tone: relaxed, coastal NZ, benefit-led, NZ English spelling (optimise,
  organisation).

## Shared contract (already created, do not change the shapes)

- `src/app/utils/site-content.ts`: types `Testimonial`, `PricingTier`, and
  `ContactDetails`; exports `testimonials: []`, `pricingTiers: []`, and
  `contactDetails`.
- Stub components (default export, **no props**), currently `return null`:
  - `src/components/Testimonials.tsx`
  - `src/components/PricingSection.tsx`
  - `src/components/ContactDetails.tsx`
- Consent cookie: name `fd_consent`, value `granted` | `denied`, 365 days,
  `path=/`, `SameSite=Lax`.
- The privacy page URL is `/privacy-policy`.

## Rules for every agent

- **Only edit files your workstream owns** (listed below). If you need a
  change in a file you don't own, don't make it. Put it in your final report
  instead.
- Use TDD: write or adjust tests in `__tests__/` (mirroring `src/`) first,
  then implement.
- Before finishing, run: `pnpm jest <your test files>`,
  `pnpm exec tsc --noEmit`, `pnpm lint`, and
  `pnpm exec prettier --write <only your files>`.
- **Do NOT** run `pnpm build`, `pnpm format`, or `git commit`/`git add`.
  Other agents are editing the same working tree at the same time.
- Every new page sets `alternates.canonical` to its own path. The root layout
  sets `/`, and child pages inherit it, which is the canonical bug the audit
  found.
- Next.js here is v16 and may differ from what you remember. Check
  `node_modules/next/dist/docs/` before using metadata or script APIs.
- Match the existing Tailwind styling (green-600 accents, dark mode variants,
  and the `Reveal` motion wrapper).

---

## Workstream A — SEO and photography pages

**Owns:** `src/app/photography/**`, `src/components/FooterSection.tsx`,
new `src/components/ServicesCrossSell.tsx`, `__tests__/photography/**`,
new `__tests__/components/Footer.test.tsx`.

1. Add `alternates.canonical` to each photography page, pointing at itself
   (`/photography`, `/photography/portraits`,
   `/photography/go-freek-2026-tauranga`).
2. Write unique, keyword-specific titles and meta descriptions for each page.
   `/photography` and `/portraits` currently share one. Mention Mount
   Maunganui / Tauranga photography, portraits, and event photography.
3. Improve each page's intro copy so it ties into the FlyingDolly system
   (1–2 sentences, keep it short).
4. Build `ServicesCrossSell`, a server component section, and render it at the
   bottom of all three photography pages. Suggested heading: "Photos are one
   part of the system". It has two short cards: "Websites that show off your
   work" and "Automation that follows up your leads". Each card links to
   `/#services-section` (the homepage services section, built by B), and a
   secondary link goes to `/about`. Use `next/link`.
5. Footer: add **server-rendered, crawlable** text links: Home, Photography,
   Portraits, Go Freek 2026 Tauranga, About, and Privacy policy
   (`/privacy-policy`). Add a small line "Mount Maunganui, Bay of Plenty, NZ".
   Keep the social icons. The header flyout only renders links client-side,
   which is why the footer links matter.
6. Tests: canonical and description per page (import `metadata` from each
   page), cross-sell links present, and footer links present with correct
   hrefs. Don't edit `__tests__/components/FooterAndContactUs.test.tsx`
   (owned by B). If your footer change breaks an assertion there, report it.

## Workstream B — Homepage rewrite and CTA rename

**Owns:** `src/app/page.tsx`, `src/components/HeroSection.tsx`,
`src/components/ContactUsButton.tsx`, `src/app/about/page.tsx`,
`__tests__/page.test.jsx`, `__tests__/components/FooterAndContactUs.test.tsx`.

1. Hero: use the new H1 and subhead from "Positioning" above.
2. Replace the "Deploy faster" section with a **services section**
   (`id="services-section"`, keep `id="features-section"` on a wrapper or
   update any references; grep for it). Use three benefit-led cards:
   - **Websites**: custom design, fast, SEO-ready, built to convert.
   - **Automation**: booking, lead follow-up, invoicing and admin workflows
     that save hours each week.
   - **Photography & Video**: product, portrait and event content, with a
     link to `/photography`.
   Add a short "why one team beats three vendors" line. Each card gets a
   cross-sell link (e.g. "Already have a website? Add automation →").
3. Update the "How we work" copy so it covers all three services, not just
   "a website".
4. Mid-page CTA section: rewrite the copy for the systems positioning.
5. Insert `<Testimonials />` immediately **above** the contact form section,
   and `<PricingSection />` after the process section. Both are no-prop
   default exports from `@/components/...` and may render null. That's
   expected; don't implement them (C owns them).
6. Rename the `ContactUsButton` label to **"Get a free quote"**. Update the
   "free call" wording in `page.tsx` (process step 01) and `about/page.tsx`
   to match (e.g. "a free, no-obligation chat / quote").
7. Tests: update `FooterAndContactUs.test.tsx` for the new label, and extend
   `page.test.jsx` for the new H1, the three service cards, the
   `/photography` link, and `#services-section`.

## Workstream C — Social proof, pricing and contact details

**Owns:** `src/app/utils/site-content.ts` (keep the types, and keep the data
empty), `src/components/Testimonials.tsx`, `src/components/PricingSection.tsx`,
`src/components/ContactDetails.tsx`, `src/components/ContactForm.tsx`, and
new tests `__tests__/components/Testimonials.test.tsx`,
`PricingSection.test.tsx`, `ContactDetails.test.tsx`, plus
`__tests__/components/ContactForm.test.tsx`.

1. `Testimonials`: if `testimonials.length === 0`, return `null`. Otherwise
   render a section with the heading "What our clients say" and cards
   showing the quote, name and business, with an optional `next/image`
   avatar. Use a `<figure>`/`<blockquote>`/`<figcaption>` structure.
2. `PricingSection`: if it's empty, return `null`. Otherwise render
   `id="pricing-section"` with the heading "Transparent starting prices",
   one card per tier ("From {startingFrom}"), an optional link, and a note
   that final quotes depend on scope.
3. `ContactDetails`: always show the suburb. Show `mailto:` and `tel:` links
   only when `email`/`phone` are set. Keep it compact, since it sits next to
   the form.
4. `ContactForm`: render `<ContactDetails />` beside or below the form
   heading. Fix the conflicting reply promises: the copy currently says both
   "We reply within 24 hours" and "within one business day". Use "one
   business day" in both places. Change the subheading to mention websites,
   automation and photography/video. Don't change the form logic.
5. Tests: the empty-data case renders nothing (or only the suburb), and the
   populated case renders correctly. Use `jest.mock` of
   `@/app/utils/site-content` (or its relative path) to inject data.
   `ContactForm` tests keep passing.

## Workstream D — Privacy policy, cookie consent and site metadata

**Owns:** `src/app/layout.tsx`, `src/app/sitemap.ts`, new
`src/app/privacy-policy/page.tsx`, new `src/components/CookieConsent.tsx`,
new `src/components/ConsentAwareAnalytics.tsx` (or merge both into one
client component), new `src/app/utils/consent.ts`,
`src/app/utils/analytics.ts` (only if needed for the no-GA case),
`__tests__/layout.metadata.test.ts`, and new tests under
`__tests__/components/` and `__tests__/utils/`.

1. `consent.ts`: SSR-safe get and set for the `fd_consent` cookie (follow
   the style in `cookies-functions.ts`).
2. Consent UI (client): a bottom banner shown when no choice has been made,
   with "Accept" and "Decline" buttons and a link to `/privacy-policy`.
   Accessible: `role="region"` with an `aria-label`, and keyboard-focusable
   buttons. It must not overlap the `react-hot-toast` bottom-right toasts
   badly.
3. Load GA (`@next/third-parties` `GoogleAnalytics gaId="G-SBMJ2GKDC1"`)
   **only** when consent is `granted`: on mount if a granted cookie already
   exists, and immediately after the visitor clicks Accept. Replace the
   unconditional `<GoogleAnalytics>` in `layout.tsx`. Make sure
   `analytics.ts` helpers are harmless no-ops when `window.gtag` is
   undefined (check, and add a test if you change it).
4. `/privacy-policy` page: set `alternates.canonical` to `/privacy-policy`
   and add metadata. Write a plain-English NZ Privacy Act 2020 policy
   covering: who we are (FlyingDolly, Mount Maunganui); what we collect
   (contact form name/email/message, GA4 analytics only with consent); why;
   storage and disclosure (Zoho email, Google Analytics, Vercel hosting,
   Cloudinary for images); retention; rights to access and correction; the
   Privacy Commissioner; and contact via the site's contact form. Include a
   "Change cookie preferences" button that clears the choice and re-shows
   the banner. Add a visible note in a code comment (not on the page) that
   the owner should review the policy before merging. Use the About page's
   layout and styles.
5. `layout.tsx` metadata and JSON-LD: update the default `title` and
   `description` to the systems positioning, e.g. title
   "Web Design, Automation & Photography in Mt Maunganui | FlyingDolly".
   Update the description to match, and add 'Business automation' and
   'Video production' to `knowsAbout`. Keep `canonical: '/'`.
6. `sitemap.ts`: add `/privacy-policy` (priority 0.3, yearly).
7. Tests: consent get/set, banner show/hide/accept/decline, GA rendered only
   after accept (mock `@next/third-parties/google`), privacy page metadata
   and canonical, sitemap includes the route, and updated layout metadata
   test.

---

## Integration (lead agent, after A–D finish)

1. `pnpm exec tsc --noEmit && pnpm lint && pnpm test && pnpm build`
2. Resolve anything the agents reported as outside their ownership.
3. Smoke-test in the browser: `/`, `/photography`, `/privacy-policy`, the
   consent flow, and `view-source` canonical tags.

## Deferred (needs the owner, or a later branch)

- Real testimonials, pricing and contact details go into `site-content.ts`.
- Case studies, a "How the system works" page, `/services`, `/pricing` and
  `/contact` pages, and Service/Breadcrumb/WebSite schema.
- Blog/local content engine, a bundle offer, a referral program, and a lead
  magnet.
