# Pack Brief — Drone Roof Photo Inspection (SH-048)

Handoff context for building the full member-asset pack on The Launchpad. The
short-form reel is the top-of-funnel; this pack is what members unlock.

## Snapshot (from the content planner)

| Field | Value |
|---|---|
| Idea ID | SH-048 |
| Business | Drone Roof Photo Inspection |
| Category | Local Service |
| Target viewer | Drone owners and property service sellers |
| Core hook | Homeowners want roof visibility without climbing a ladder. |
| Startup cost | $251–$1k (one consumer/prosumer drone) |
| Time to first sale | 2–4 weeks |
| Difficulty | Medium |
| Monetization | Service fee (per report); optional recurring for agents/installers |
| Planner CTA | "Comment 'drone roof' for the report template." |
| Planner notes | Offer assets: photo report template, safety/legal checklist. |

## Positioning

**One drone. One niche. Premium photos from above.** A "small equipment
business": a single sub-$1k purchase gives you a capability most people don't
have, which lets you charge as a specialist rather than competing on price.

Buyer-facing one-liner: *Clear, close-up roof photos and a simple visual report —
without anyone climbing a ladder.*

Hooks that tested well in the reel:
- "Spend a few hundred dollars on one drone and charge as the specialist."
- "Roofs are high-stakes and impossible to see — the moment someone holds clear photos, the value is obvious."
- "One smart purchase becomes your entire edge."

## Ideal customer (who pays)

- **Real estate agents** — listing photos, pre-sale condition, buyer questions.
- **Roofers / solar installers** — pre-quote assessment, before/after, job docs.
- **Property managers / homeowners** — storm/insurance documentation, peace of mind.
Recurring potential is strongest with agents and installers (repeat volume).

## The offer & deliverable

Workflow: **Fly → Capture → AI report.** Fly the drone, capture a clean set of
roof photos + a short video, turn it into a simple visual report (problem spots
flagged) — AI assists the write-up/flagging. Deliver same-day, ready to use.

Deliverable = a tidy photo set + short video + a 1–2 page visual report.

## Pricing & unit economics (as stated in the reel)

- **~$250 per report.**
- 10 reports/week → **$2,500/week** → **~$10,000/month** → **~$120,000/year**.
- Drone pays for itself in a couple of jobs; after that it's near-pure margin on time.
(Numbers are illustrative — keep "around / roughly" framing in member assets.)

## ⚠️ Claim-safety & legal (critical for this niche)

This pack MUST stay claim-safe and is the main reason the reel says *"You're not
certifying anything structural — just giving people eyes on a roof they can't
otherwise see."* Bake the following into every asset:

- **Not a structural / engineering inspection.** Position strictly as *visual
  photo documentation*. No safety certifications, no "your roof is fine/failing."
- **Drone regulations vary by country.** In the US that means FAA Part 107 +
  registration + airspace (LAANC) awareness; other countries differ. The pack
  should tell members to check and comply with local rules, not assert specifics.
- **Privacy / property access** — only fly with owner permission; avoid neighbours.
- **Insurance** — recommend basic drone liability cover before paid work.
- Avoid guarantees of detecting damage, insurance outcomes, or sale results.

## First-client playbook (from the reel)

Call local **roofers, agents, and solar installers**; offer **one free sample
roof** (a short flyover + photos) to prove value before any payment. One good
flyover → referrals. This "free sample" is the core sales motion to emphasise in
the outreach assets.

## Proposed member-asset pack

Mirror the existing pack shape in `scripts/generate_member_assets.py` (each pack
≈ 7 assets), plus the two planner-specified drone assets:

| Asset | Type | Notes |
|---|---|---|
| Drone Outreach Script | DOCX | Cold call/DM/email to roofers, agents, solar installers; "free sample roof" pitch. |
| Roof Photo Report Template | DOCX/PDF | The core deliverable: cover, property details, photo grid with flagged areas, visual-only disclaimer. |
| Pricing Sheet | XLSX | Per-report tiers (basic / standard / + video), recurring agent retainer, quote builder. |
| Safety & Legal Checklist | PDF | Pre-flight: local drone rules/registration, airspace, weather, permission, insurance, no-fly/hazard check. |
| AI Prompt Pack | DOCX | Prompts for report write-ups, flagging visible issues from photos, listing blurbs, outreach copy — all claim-safe. |
| Client Intake Form | DOCX | Property address, roof type, access, what to look for, owner approval, delivery format. |
| Client Email Templates | DOCX | Outreach, free-sample offer, booking, report delivery, follow-up/retainer. |
| Client FAQs | DOCX | Scope, "is this a structural inspection?" (no), turnaround, access, weather, pricing, recurring. |

### FAQ seeds
- *Is this a structural inspection?* No — it's visual photo documentation; we don't certify roof condition.
- *Do you need to climb the roof?* No — everything is captured by drone.
- *What do I get?* A set of clear roof photos, a short video, and a simple report flagging visible areas of interest.
- *How fast?* Typically same-day after the flyover, weather permitting.
- *Is it legal?* We fly within local drone regulations and only with property-owner permission.

## Video reference

- **Reel:** `Social Media Content/launchpad-videos/renders/drone-roof-inspection-REEL-v2.mp4` (96.3s, 9:16). Structure: avatar intro -> Glacier-Glass middle -> avatar transition -> launch-pack CTA.
- **Composition source:** `Social Media Content/launchpad-videos/drone-build/` (`index.html`, `assets/audio/vo.mp3`, aerial b-roll in `assets/broll/`).
- **Style:** dark cinematic glass + ice-blue accent over aerial b-roll, with a drone-scan HUD motif, an animated Fly→Capture→AI-report flow, the money ladder, and referral notification toasts.
- **VO script (as recorded):**
  > Drone roof inspections. Every homeowner, real estate agent, and roofer needs to see the roof — gutters, solar panels, tiling, storm damage — but nobody wants to climb a ladder, and clear roof photos are surprisingly hard to get. You fly the drone, capture a clean set of roof photos and a short video, and turn it into a simple visual report using AI. Roofs are high-stakes and impossible to see; the moment someone holds clear photos of theirs, the value is obvious. You're not certifying anything structural — you're just giving people eyes on a roof they can't otherwise see. This is the real power of a small equipment business: one smart purchase becomes your entire edge. That single drone lets you do something most people can't, and that makes you the specialist — and specialists don't compete on price, they charge well for their time. You can charge around $250 per report; 10 reports a week is $2,500, $10,000 a month, or $120,000 a year. The drone pays for itself in a couple of jobs, and after that it's pure margin on your time. To get clients, call local roofers, agents, and solar installers and offer one free sample roof. One good flyover turns into a referral machine. One drone, one niche, premium photos from above — and a six-figure business.

## Build notes (web app)

To ship the pack: add a `Pack(...)` entry for `drone-roof-photo-inspection` to
`scripts/generate_member_assets.py` with the asset list above, add the matching
entry to `src/data/packs.ts`, then run `npm run assets:generate` && `npm run
assets:validate`. The generator already applies the ElevenLabs visual system and
the shared delivery-standards pointer; keep all copy claim-safe per the section above.
