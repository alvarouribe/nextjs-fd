# Phase 4 — Outreach and a Google Ads test: playbook

Follows `analytics-and-local-seo.md`. Phases 1–3 are live: clean lead
tracking (`generate_lead` fires only on a sent enquiry), Consent Mode v2, and
three service pages:

- `/web-design-tauranga`
- `/business-automation-bay-of-plenty`
- `/commercial-photography-tauranga`

Goal: get the first enquiries from medium-sized Bay of Plenty businesses
(roughly 20–200 staff), and know which channel brought each one in.

Rules carried over:

- **No invented content.** Posts and messages use real clients and real work
  only.
- **Every link we share carries UTM tags**, so GA4 can attribute the lead.
- **Ads only start once the Phase 2 checklist is done** (see "Before you
  start").

---

## Before you start (checklist)

- [ ] GA4 → Admin → Events: `generate_lead` is marked as a **key event**.
- [ ] Send a test enquiry on the live site. Exactly one `generate_lead`
      appears in DebugView or Realtime.
- [ ] Search Console is verified, the sitemap is submitted, and indexing is
      requested for the three service pages.
- [ ] The Google Business Profile is live and links to
      `/web-design-tauranga`, using the UTM link below.
- [ ] **Decision needed before ads (see the end of this file):** should the
      cookie banner also ask for ad-measurement consent?

---

## 1. UTM links — use these, don't hand-type new ones

Convention: lowercase and hyphenated. `utm_source` = where, `utm_medium` =
what kind, `utm_campaign` = which push.

| Where it's used                   | Link                                                                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Google Business Profile website   | `https://www.flyingdolly.co.nz/web-design-tauranga?utm_source=google&utm_medium=organic&utm_campaign=gbp`                        |
| LinkedIn post (web design)        | `https://www.flyingdolly.co.nz/web-design-tauranga?utm_source=linkedin&utm_medium=social&utm_campaign=<post-slug>`               |
| LinkedIn post (automation)        | `https://www.flyingdolly.co.nz/business-automation-bay-of-plenty?utm_source=linkedin&utm_medium=social&utm_campaign=<post-slug>` |
| LinkedIn post (photography/video) | `https://www.flyingdolly.co.nz/commercial-photography-tauranga?utm_source=linkedin&utm_medium=social&utm_campaign=<post-slug>`   |
| LinkedIn direct message           | `https://www.flyingdolly.co.nz/<service-page>?utm_source=linkedin&utm_medium=dm&utm_campaign=outreach-q4-2026`                   |
| Email signature                   | `https://www.flyingdolly.co.nz/?utm_source=email&utm_medium=signature&utm_campaign=always-on`                                    |
| Business Chamber / BNI / events   | `https://www.flyingdolly.co.nz/?utm_source=<network-name>&utm_medium=referral&utm_campaign=networking`                           |
| Client referral (Glenn, Jose, …)  | `https://www.flyingdolly.co.nz/?utm_source=<client-name>&utm_medium=referral&utm_campaign=client-referral`                       |

Google Ads does **not** use UTMs. Turn on **auto-tagging** in Google Ads
instead (Admin → Account settings) and it attributes itself.

To see results: GA4 → Reports → Acquisition → Traffic acquisition. Set the
dimension to **Session source / medium**, then add the **generate_lead** key
event column.

---

## 2. LinkedIn — one post a week, six weeks of drafts

Post from your personal profile (it reaches further than a company page) and
share it to the FlyingDolly page. Every post is built on real work. Put the
link in the post; drop it into the first comment if reach looks low.

1. **BOP Gutter CleaNZ case study** (campaign `case-bop-gutter`, links to the
   web design page)

   > A Mount Maunganui gutter and roof specialist needed their website to
   > bring in work, not just exist. We built click-to-call, free-quote
   > enquiries, and clear service pages for Tauranga, Papamoa and the Mount.
   > Glenn's words: "We're getting more enquiries than ever and spending far
   > less time on admin." If your website looks fine but the phone doesn't
   > ring, that's usually fixable. [link]

2. **One team vs three vendors** (campaign `one-team`, links to the homepage)

   > Most businesses we meet have a web person, a photographer, and someone
   > who "sorted the booking system" — and none of them talk to each other.
   > Here's what changes when one team owns the whole system: … (two or three
   > concrete examples from your own projects)

3. **Event content: Euphoria Events** (campaign `case-euphoria`, links to
   the photography page)

   > Share 3–4 of your best photos from a Euphoria Events night, plus Jose's
   > quote about using them to promote upcoming parties and grow the
   > audience.

4. **"Where does your admin time go?"** (campaign `admin-time`, links to the
   automation page)

   > Ask a question: which admin task eats the most hours in your week —
   > quoting, chasing leads, invoicing or bookings? Reply in the comments
   > with the patterns you see. Comments make good leads for DMs.

5. **Local event shoot: Go Freek 2026 or The Crabs Beach Tennis Club**
   (campaign `case-local-events`, links to the photography page)

   > A carousel of 5–6 photos, tagging the organisers (ask them first).

6. **Pacific Share nonprofit site** (campaign `case-pacific-share`, links to
   the web design page)
   > The story: donated fishing and diving gear getting a second life in
   > Pacific Island communities, and how the site makes donating, delivering
   > and requesting gear simple.

After six weeks, repeat the formats that drove profile views or DMs.

---

## 3. LinkedIn direct outreach — 20 new connections a week

**Who:** Operations managers, marketing managers, general managers and
owners at Bay of Plenty companies with 11–200 staff.

LinkedIn search filters: Locations = Bay of Plenty / Tauranga; Company size
= 11–50 and 51–200. Priority sectors:

- horticulture and kiwifruit
- logistics and port services
- trades and construction (where we have proof: BOP Gutter CleaNZ)
- hospitality, tourism and events (where we have proof: Euphoria Events)
- professional services

**Qualify before connecting.** Look at their website on your phone for
30 seconds. Note one specific, fixable thing, such as:

- no click-to-call
- a slow first load
- a hard-to-find quote form
- stock photos
- a broken page

That note is your opener. Don't message anyone you have nothing specific to
say to.

**Connection request** (no pitch; keep it under 200 characters):

> Hi <first name> — I run FlyingDolly, a web and content studio at the Mount.
> Always keen to connect with people growing businesses around the Bay.

**First message** (only after they accept, and wait a day or two):

> Thanks for connecting, <first name>. I had a quick look at <company>'s
> site on my phone — <one specific observation, e.g. "the quote form is
> three taps deep on mobile">. It's a quick fix and usually lifts enquiries.
> Happy to send a short screen recording of what I'd change, no strings
> attached. Want me to?

**If yes:** send a 2–3 minute Loom or screen recording, then link the
relevant service page (with the DM UTM link above).

**One follow-up only**, 7–10 days later, then stop.

Track it in a simple sheet: name, company, role, sector, connection date,
message date, replied (y/n), next step. Review it weekly.

---

## 4. Local networks

Check each group's current events and membership costs on their own
websites before committing. These are starting points, not
recommendations to buy.

- **Priority One** — the Western Bay of Plenty economic development agency.
  Their events draw exactly the growing-business owners we want.
- **Tauranga Business Chamber** — membership, plus regular networking
  events.
- **BNI Tauranga** — referral groups with one seat per profession. Visit as
  a guest first.

Bring the referral UTM link on a QR code or business card.

Also ask Glenn and Jose directly:

- for a Google review
- "who else do you know who'd benefit?" A warm intro beats any ad.

---

## 5. Google Ads test — spec, ready to build

### Account setup

- Link Google Ads to GA4 (GA4 → Admin → Product links → Google Ads links).
- In Google Ads, import the GA4 key event `generate_lead` as the
  **primary** conversion (Goals → Conversions → Import → GA4). Import
  nothing else as primary.
- Turn on auto-tagging.

### Campaign

| Setting             | Value                                                                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Type                | Search only. Untick Display Network and Search Partners.                                                                                  |
| Location            | Bay of Plenty region. Targeting option: **Presence** (people in or regularly in), not interest.                                           |
| Budget              | NZ$15–20/day for 4 weeks (about NZ$420–560 total)                                                                                         |
| Bidding             | Maximise clicks with a max CPC cap for the first 2–3 weeks. Switch to Maximise conversions once there are 15+ conversions.                |
| Schedule            | Mon–Fri 7am–7pm to start (business buyers)                                                                                                |
| Ad groups at launch | **Web design only.** Add photography in week 3 if budget allows. Automation search volume is likely tiny, so check Keyword Planner first. |

### Ad group: Web design → `/web-design-tauranga`

Keywords (exact and phrase match):

- `[web design tauranga]`
- `[website design tauranga]`
- `[web designer tauranga]`
- `[web developer tauranga]`
- `[website redesign tauranga]`
- `[web design mount maunganui]`
- `"web design bay of plenty"`
- `"website designer tauranga"`

Responsive search ad. All lengths are checked: headlines are 30 characters
or fewer, descriptions 90 or fewer.

Headlines:

1. Web Design Tauranga _(pin to position 1)_
2. Websites That Bring Enquiries
3. Mount Maunganui Web Team
4. Free, No-Obligation Quote
5. Fast, SEO-Ready Websites
6. Local Bay of Plenty Team
7. Website Redesign Tauranga
8. Mobile-First Custom Websites
9. Click-to-Call & Quote Forms
10. Web, Photo & Video, One Team
11. See Our Local Client Work
12. Get Found by Local Customers

Descriptions:

1. Custom, fast websites for growing Bay of Plenty businesses. Free,
   no-obligation quote.
2. Built to turn visitors into enquiries: click-to-call, quote forms and
   local SEO.
3. One Mount Maunganui team for your website, automation, photography and
   video.
4. Analytics and Search Console set up, so you can see where your enquiries
   come from.

### Ad group: Photography & video → `/commercial-photography-tauranga` (week 3+)

Keywords:

- `[commercial photographer tauranga]`
- `[business photography tauranga]`
- `[product photography tauranga]`
- `[event photographer tauranga]`
- `[portrait photographer tauranga]`
- `[videographer tauranga]`
- `"video production tauranga"`

Headlines:

1. Commercial Photography BOP
2. Business Photography Tauranga
3. Portrait Photography Tauranga
4. Event Photography & Video
5. Product Photography Tauranga
6. Video for Web and Social
7. Free, No-Obligation Quote
8. Mount Maunganui Local Team
9. Team Photos & Portraits
10. See Our Recent Shoots

Descriptions:

1. Product, portrait and event photography and video for Bay of Plenty
   businesses.
2. Content made for your website, social media and ads. Free,
   no-obligation quote.
3. From the team that builds websites, so your photos and video fit your
   site.
4. Portraits, launches, events and highlight reels across Tauranga and the
   Mount.

### Ad group: Automation → `/business-automation-bay-of-plenty` (only if Keyword Planner shows volume)

Headlines:

1. Business Automation BOP
2. Automate Your Business Admin
3. Stop Chasing Leads by Hand
4. Automated Lead Follow-Up
5. Online Booking & Reminders
6. Invoicing That Runs Itself
7. Free, No-Obligation Quote
8. Mount Maunganui Local Team

Descriptions:

1. We automate lead follow-up, bookings, invoicing and admin for Bay of
   Plenty businesses.
2. Connect the tools you already use and get hours back every week. Free
   quote.

### Negative keywords (campaign level, phrase match)

free, diy, template, templates, wix, squarespace, course, courses,
training, tutorial, learn, jobs, job, career, salary, internship, cheap,
wedding, newborn, maternity, family photos, pet, school photos, passport

### Weekly routine (15 minutes)

1. **Search terms report:** add irrelevant searches as negatives.
2. **Check for keywords to pause:** any keyword with NZ$150 or more spent
   and no `generate_lead` gets paused.
3. **Check every lead in your inbox.** Mark junk or spam so you know the
   real cost per lead.

### End of the 4 weeks: decide

- **Cost per real lead** = spend ÷ genuine enquiries.
- Compare it with what one won client is worth to you. If one client covers
  several months of ad spend, keep going and add the photography ad group.
  If there are no genuine leads after about NZ$500, stop. Put the budget
  into outreach and networking, and revisit ads once the site has more
  proof (case studies, reviews).

---

## 6. Industry pages (code — when ready)

Only for sectors with a real client to show:

- **Trades and services:** BOP Gutter CleaNZ. Possible page
  `/websites-for-tradies-bay-of-plenty`.
- **Events and hospitality:** Euphoria Events.

Each one is a new entry in `src/app/utils/service-pages.ts` (same template).
Build them once outreach shows which sector replies most.

---

## Decision needed: ad-measurement consent

The cookie banner currently asks only about analytics. Accept grants
`analytics_storage` only, and `ad_storage` and `ad_user_data` stay denied.
That means Google Ads can't directly tie an enquiry back to the ad click
that caused it. It falls back to modelled estimates, which are unreliable
at small volumes.

- **Option A — keep it as is.** Simpler and more private. Ads conversion
  numbers will be estimates; judge the test by leads in your inbox instead.
- **Option B — ask for ad measurement too.** Change the banner text to
  cover "analytics and measuring our ads", and grant `ad_storage` and
  `ad_user_data` on Accept. Keep `ad_personalization` denied, so there's no
  remarketing. Update the privacy policy to match. This is a small code
  change.

Recommended: **Option B before the ads go live**, if you're comfortable
saying so in the banner and privacy policy.

## What to measure each month

- Leads (`generate_lead`) and `contact_click`, by session source / medium.
- LinkedIn: connections sent and accepted, replies, calls booked.
- Google Ads: spend, clicks, cost per genuine lead.
- Search Console: impressions and position for the service-page keywords.
- Google Business Profile: calls, website clicks, reviews.
