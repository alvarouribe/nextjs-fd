# Funnel Analysis: FlyingDolly
**URL:** https://www.flyingdolly.co.nz  
**Date:** 2026-05-06  
**Business Type:** Web Development Agency (Service Business)  
**Funnel Type:** Lead Gen (Consultation + Contact Form)  
**Overall Funnel Health: 70/100**

---

## Executive Summary
FlyingDolly is running a straightforward **lead-generation funnel**: homepage messaging drives visitors toward either a free call or a contact form submission. The site has strong visual polish, clear service positioning, and repeated consultation CTAs.

The current funnel is likely under-converting because the "middle" and "bottom" funnel steps are thin: there is no dedicated offer/pricing/qualification page, no visible testimonial layer near final conversion, and limited friction-reduction microcopy around the form ("response time," "what happens next," privacy reassurance).

Technically, the page includes Google Analytics (gtag) and social links, but no detected robots/sitemap/schema signals from the analyzer and no clear conversion-event setup for form completion or booking progression. This limits optimization speed because drop-off cannot be measured precisely.

Highest-impact gains are likely from: (1) a dedicated booking/offer step, (2) strengthening trust and objection handling at form/CTA points, and (3) instrumenting step-level conversion events. Combined, these can materially improve lead quality and lead-to-call rate.

---

## Funnel Map

```text
VISITOR JOURNEY MAP (Estimated)
===============================

Traffic Sources (organic, referral, social, direct)
  |
  v
[Homepage / Landing] ------------------------------ 100%
  Primary CTA: "Book a free call" / "Let's talk"
  |
  v
[Contact Form Submit] ------------------------------ ~3.5%
  (first name, last name, email, message)
  |
  v
[Qualified Conversation / Discovery Call] ---------- ~55% of leads
  |
  v
[Proposal / Scope Approval] ------------------------- ~45% of calls
  |
  v
[Client Closed] ------------------------------------- ~30% of proposals

Estimated Visitor -> Customer: ~0.26%
Biggest Bottleneck: Homepage -> Lead Capture
```

---

## Page-by-Page Analysis

### Step 1: Homepage / Primary Landing
- **Primary Action:** Click "Book a free call" or submit form
- **Strengths:** Clear agency positioning, strong design, repeated CTA presence, mobile viewport present, solid content depth
- **Friction Points:** No dedicated proof stack near primary CTA (case studies/testimonials/results), no explicit process timeline, title is too long, limited route depth for segmented intent (e.g., startup vs local business)
- **Trust Elements:** Social profiles present, polished visuals
- **Step Score (0-10):**  
  - Clarity: 8  
  - Continuity: 7  
  - Motivation: 7  
  - Friction: 6  
  - Trust: 6  
  - **Page Score: 6.8/10**

### Step 2: Contact Form (Bottom-of-Page)
- **Primary Action:** Submit project inquiry
- **Current Fields:** first name, last name, email, message
- **Strengths:** Low field count, single clear submit action ("Let's talk")
- **Friction Points:** No explicit SLA ("we reply in X hours"), no social proof beside form, no privacy/anti-spam reassurance, no qualification prompts to improve lead quality
- **Trust Elements:** Brand consistency and clear intent
- **Step Score (0-10):**  
  - Clarity: 7  
  - Continuity: 7  
  - Motivation: 6  
  - Friction: 7  
  - Trust: 5  
  - **Page Score: 6.4/10**

### Step 3: Post-Submit / Consultation Progression (Inferred)
- **Primary Action:** Lead progresses to call and proposal
- **Observed Gap:** No visible thank-you state, no calendar confirmation step, no automated nurture handoff shown
- **Risk:** Qualified leads can stall after form submit
- **Step Score (0-10):**  
  - Clarity: 4  
  - Continuity: 5  
  - Motivation: 5  
  - Friction: 5  
  - Trust: 5  
  - **Page Score: 4.8/10**

---

## Funnel Metrics

| Metric | Current (Estimated) | Benchmark (Lead Gen Agency) | Gap |
|---|---:|---:|---:|
| Visitor -> Lead | 3.5% | 5-10% | -1.5 to -6.5 pts |
| Lead -> Discovery Call | 55% | 60-75% | -5 to -20 pts |
| Discovery Call -> Client | 13.5% (30% of 45%) | 15-30% | -1.5 to -16.5 pts |
| Visitor -> Client | 0.26% | 0.5-3% | -0.24 to -2.74 pts |

---

## Revenue Impact Analysis

Assumption model:
- Monthly visitors: 1,500
- Current visitor->lead: 3.5% (53 leads)
- Close rate from lead to client: ~13.5%
- New clients/month: ~7
- Average project value: NZ$3,500

**Current monthly revenue from funnel:** ~NZ$24,500

Scenario after key fixes:
- Visitor->lead improved to 5.0%
- Lead->client improved from 13.5% to 16.0%
- New clients/month: ~12

**Projected monthly revenue:** ~NZ$42,000  
**Estimated upside:** **~NZ$17,500/month**

---

## Optimization Recommendations

### Priority 1 — Do Now (This Week)
1. Add a **proof block above and near CTAs** (3 results-based testimonials + mini case study cards).  
   - Est. lift: +15-25% lead conversion
2. Add conversion microcopy on form: **response SLA, privacy reassurance, next-step expectation**.  
   - Est. lift: +8-15% form completion
3. Track funnel events in GA4: CTA click, form start, form submit, thank-you view, booking confirmation.  
   - Est. lift: Indirect; enables fast iteration and channel-level optimization

### Priority 2 — Plan (This Month)
1. Create a dedicated **"Book a Free Strategy Call"** page with stronger qualification and proof.  
   - Est. lift: +10-20% lead quality and call attendance
2. Add a clear **"How we work" 3-step process** section before final CTA.  
   - Est. lift: +5-12% conversion confidence
3. Tighten SERP CTR by shortening title and adding stronger meta hook.  
   - Est. lift: +5-15% organic click-through

### Priority 3 — Strategic (This Quarter)
1. Build segmented landing pages (e.g., local business, tradies, professional services).  
2. Launch case-study content funnel to pre-sell value before contact.  
3. Implement lead scoring + nurture automation for non-immediate buyers.

---

## Pricing Page Assessment
No dedicated pricing page was found. For service businesses this is acceptable, but conversion improves when visitors see **pricing guidance** (e.g., "Typical website projects start from NZ$X" or package bands). Add price framing to reduce low-intent inquiries and improve call efficiency.

## Lead Magnet Assessment
No lead magnet detected. Consider a conversion bridge asset such as:  
- "Website Conversion Checklist for NZ Service Businesses"  
- "Homepage Copy Template + Wireframe Starter"

This can capture earlier-stage visitors not ready for a call.

## Email Nurture Integration
- **After form submit (0-5 min):** Confirmation + what happens next
- **Day 1:** Short case study with measurable outcome
- **Day 3:** Common objections (cost, timeline, process)
- **Day 5:** Clear CTA to book call
- **Day 7:** Final reminder + social proof

## Traffic Source Alignment
- **Organic SEO:** Send to homepage + relevant case-study/segment page
- **Social:** Send to proof-led landing page with one CTA
- **Referral/Direct:** Send to homepage with sticky "Book a free call"
- **Retargeting:** Send prior visitors to dedicated strategy-call page

## Next Steps
1. Add social proof and process clarity near primary CTA blocks.
2. Deploy GA4 funnel event tracking for CTA -> form -> booking stages.
3. Launch a dedicated booking/qualification page and route high-intent traffic there.
