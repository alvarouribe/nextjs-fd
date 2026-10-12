# Analytics fixes and local SEO for Bay of Plenty leads — plan

Source: analytics and keyword audit dated 2026-10-12. Branch:
`growth/analytics-seo-plan`.

Goal: start promoting the site and measure real leads from medium-sized Bay
of Plenty businesses (roughly 20–200 staff: horticulture, port and logistics,
trades, hospitality and tourism, professional services).

## Audit summary

Working, verified on the live site on 2026-10-12:

- GA4 (`G-SBMJ2GKDC1`) loads after the visitor accepts cookies. The
  `page_view` and custom events reach `google-analytics.com/g/collect`.
- The apex domain redirects to www (308). `robots.txt` and `sitemap.xml` are
  valid. Each public page has its own title, description and canonical URL.
- `ProfessionalService` JSON-LD is in the root layout.

Problems:

1. `generate_lead` fires for four different things: a CTA button click, a
   form attempt, a form success and a form error. Marked as a key event, it
   would count every button click as a lead.
2. Clicks on the `mailto:` and `tel:` links in `ContactDetails.tsx` are not
   tracked.
3. Visitors who decline or ignore the cookie banner are not counted. This is
   a deliberate owner decision (see `landing-page-upgrade.md`, decision 4),
   so reports undercount traffic.
4. There are no service pages or location pages. Searches like "web design
   Tauranga" have no page that matches them.
5. The JSON-LD has no `telephone`, and its `areaServed` leaves out the wider
   Bay of Plenty.

## Decisions needed from the site owner

- [ ] **Consent Mode v2?** Keep the strict opt-in (current), or load GA with
      Consent Mode defaults set to `denied`. That still respects a decline
      but sends anonymous, cookieless pings so totals are closer to reality.
- [ ] **Starting prices.** Add real "from" prices to `pricingTiers` in
      `site-content.ts`, or keep pricing hidden.
- [ ] **Which service page to build first.** Recommended: web design in
      Tauranga.
- [ ] **Case study numbers.** Ask BOP Gutter CleaNZ whether we can publish
      before/after enquiry numbers.

The rule from the previous plan still applies: **no invented content.** No
placeholder testimonials, prices, statistics or client names.

---

## Phase 1 — Fix measurement (code, this branch)

Do this before spending anything on promotion. TDD: write a failing test
first for each change.

### 1.1 Split the lead events — `src/app/utils/analytics.ts`

- Add `trackCtaClick({ location })` that sends `cta_click`.
- Add `trackFormError({ source })` that sends `form_error`.
- Send `generate_lead` **only** when the form sends successfully. Add
  `currency: 'NZD'` and `value` (an estimated lead value, optional) so it can
  feed Google Ads later.
- Optional: send `form_start` the first time someone focuses a field in the
  form, to measure drop-off.

Files: `ContactUsButton.tsx` (use `trackCtaClick`), `ContactForm.tsx`
(remove the `attempt` event, use `trackFormError` for errors). Tests in
`__tests__/` for both components and for `analytics.ts`.

### 1.2 Track email and phone clicks — `src/components/ContactDetails.tsx`

- Add `trackContactClick({ method: 'email' | 'phone' })`, which sends
  `contact_click`. Call it from the `mailto:` and `tel:` links.
- `ContactDetails` is probably a Server Component. If so, move the links into
  a small client component.

### 1.3 Fill in the business JSON-LD — `src/app/layout.tsx`

- Add `telephone` and `email` from `contactDetails`. Read them from
  `site-content.ts` rather than copying the values.
- Add to `areaServed`: `{ '@type': 'AdministrativeArea', name: 'Bay of
Plenty' }`, plus Papamoa, Te Puke, Katikati, Rotorua and Whakatane.
- Add `priceRange` once the starting prices are decided.

### 1.4 (Only if the owner chooses Consent Mode v2) — `ConsentAwareAnalytics.tsx`

- Always load GA. Before `config`, run `gtag('consent', 'default', {
analytics_storage: 'denied', ad_storage: 'denied', ad_user_data:
'denied', ad_personalization: 'denied' })`.
- On Accept, send `gtag('consent', 'update', { ...: 'granted' })`.
- Update `/privacy-policy` to describe this.

Definition of done: `pnpm lint`, `tsc`, `pnpm test` and `pnpm build` all pass.
In the GA4 DebugView, one successful form send produces exactly one
`generate_lead`.

---

## Phase 2 — Google account setup (owner, no code)

- [ ] **GA4 → Admin → Events:** mark `generate_lead` as a key event (and
      `contact_click` too, if wanted). Do not mark `cta_click`.
- [ ] **GA4 → Admin → Data retention:** set it to 14 months.
- [ ] **GA4 → Admin → Data filters:** filter out internal traffic (your home
      and office IP addresses).
- [ ] **Search Console:** verify the domain property `flyingdolly.co.nz`
      through DNS. Submit `https://www.flyingdolly.co.nz/sitemap.xml`. Link
      it to GA4 (GA4 Admin → Product links).
- [ ] **Google Business Profile:** set it up as "FlyingDolly", primary
      category "Website designer", secondary categories "Photographer" and
      "Video production service". Make it a service-area business covering
      the Bay of Plenty. Add photos and the website link (with UTM tags:
      `?utm_source=google&utm_medium=organic&utm_campaign=gbp`).
- [ ] **Reviews:** ask Glenn (BOP Gutter CleaNZ) and Jose (Euphoria Events)
      for reviews on Google.
- [ ] **Keyword Planner:** using a Google Ads account (no spend needed), get
      search volumes for the keyword list below, with the location set to
      Bay of Plenty. Record the results in this file.

---

## Phase 3 — Pages that match local searches (code, a branch per page)

Each page is a Server Component and uses `pageMetadata()`. Each one gets
`Service` JSON-LD, `BreadcrumbList` JSON-LD, an entry in the sitemap, a link
from the homepage service card and footer, and the contact form at the
bottom.

Page template:

1. An H1 with the keyword and place in it ("Web design in Tauranga & the Bay
   of Plenty").
2. The outcome for a medium business, not a list of features.
3. Local proof: a case study card and a testimonial.
4. What's included, the process and the starting price.
5. Frequently asked questions (with `FAQPage` JSON-LD), written from real
   questions customers have asked.
6. A CTA and the contact form.

Pages, in priority order:

| Route                                  | Main keyword                            |
| -------------------------------------- | --------------------------------------- |
| `/web-design-tauranga`                 | web design Tauranga                     |
| `/business-automation-bay-of-plenty`   | business automation Bay of Plenty       |
| `/commercial-photography-tauranga`     | commercial / corporate photography      |
| `/work/bop-gutter-cleanz` (case study) | (proof page; link to it from the above) |

Add them to `navigation-links.ts` once (so they appear in both menus) under a
"Services" item.

### Keywords to check in Keyword Planner (not checked yet — no volume data)

High intent (people looking to buy now):

- web design Tauranga · website designer Tauranga · web developer Bay of
  Plenty · website redesign Tauranga · Mount Maunganui web design
- business automation NZ · Xero automation · workflow automation small
  business NZ · CRM setup Tauranga
- corporate photography Tauranga · commercial photographer Bay of Plenty ·
  headshots Tauranga · business video production Tauranga

Problem-led (good for case studies and articles later):

- "website not getting enquiries" · "automate quote follow-up" · "how much
  does a website cost NZ"

---

## Phase 4 — Outreach and paid tests (owner, after Phases 1–3)

- **Industry pages:** one page each for horticulture and kiwifruit,
  trades, and hospitality and tourism. Only once there is a real client in
  that industry.
- **LinkedIn:** a short weekly post (a case study, a before/after, a local
  shoot). Send direct messages to operations and marketing managers at
  Tauranga companies with 20–200 staff, linking to the matching service page
  with UTM tags.
- **Local networks:** Priority One, Tauranga Business Chamber, BNI Tauranga.
- **Google Ads test** (only after `generate_lead` is clean):
  - $15–20 a day for 4 weeks
  - exact and phrase match on the 5–10 high-intent keywords, located in the
    Bay of Plenty
  - each ad goes to the matching service page
  - import `generate_lead` from GA4 as the conversion
  - stop or change any keyword that has no leads after about $150 spent

## What to measure each month

- Leads (`generate_lead` + `contact_click`) by source and medium.
- Search Console: impressions and clicks for the target keywords, average
  position per service page.
- Google Business Profile: calls, website clicks, direction requests.
- Cost per lead (once ads are running).
