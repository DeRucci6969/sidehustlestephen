from __future__ import annotations

import json
import math
import os
import re
import zipfile
from datetime import date
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "content" / "member-assets"
BRAND = "Side Hustle Stephen"

# Visual system aligned to the ElevenLabs brand: warm off-white surfaces,
# black-first monochrome structure, a single functional blue highlight, and
# warm "stone" greys. Type is a clean grotesque (Arial) for guaranteed
# cross-platform rendering in Word / Google Docs / Pages / LibreOffice.
FONT = "Arial"            # body + headings (universally available grotesque)
FONT_DISPLAY = "Arial"    # display weight handled via bold, not a custom face
ACCENT = "0A59D2"         # functional blue: key numbers, links, active states
ACCENT_DARK = "052F70"    # deep blue for secondary emphasis
ACCENT_SOFT = "EEF4FF"    # light blue tint for callout fills
BLACK = "0A0A0A"          # ElevenLabs near-black: header bands, primary rules
TEXT = "0A0A0A"           # primary body text
MUTED = "57534E"          # stone-600 muted text / labels
INK = "0A0A0A"            # headings (monochrome, not navy)
LINE = "E0DFDD"           # warm hairline borders
PANEL = "F5F3F1"          # warm stone panel fill
BG = "FDFCFC"             # warm off-white page/surface background


@dataclass
class Asset:
    id: str
    title: str
    type: str
    description: str


@dataclass
class Pack:
    slug: str
    title: str
    hook: str
    category: str
    buyer: str
    startup_cost: str
    time_to_first_sale: str
    difficulty: str
    summary: str
    why_it_works: str
    first_steps: list[str]
    caveat: str
    assets: list[Asset]


PACKS: list[Pack] = [
    Pack(
        "cafe-menu-refresh-package",
        "Cafe Menu Refresh Package",
        "If you can use Canva, sell this to local cafes.",
        "Local Service",
        "Independent cafes",
        "$0-$50",
        "1-7 days",
        "Easy",
        "A productized local service that refreshes cafe menus across print, Instagram, Google Business, and QR assets.",
        "Cafes change specials, prices, and hours constantly, but their customer-facing menus are often outdated in several places.",
        ["Find outdated menus", "Send one fixed mockup", "Offer a monthly refresh"],
        "Fast turnaround matters more than fancy design.",
        [
            Asset("asset-cafe-script", "Cafe Outreach Script", "DOCX", "Cold DM and email scripts for first contact."),
            Asset("asset-cafe-pricing", "Menu Refresh Pricing Sheet", "XLSX", "Starter, standard, and retainer pricing ladder."),
            Asset("asset-cafe-checklist", "Delivery Checklist", "PDF", "What to check before sending final assets."),
            Asset("asset-cafe-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for cafe audits, menu copy, outreach, handoff notes, and monthly refresh ideas."),
            Asset("asset-cafe-intake", "Client Intake Form", "DOCX", "Editable client intake questions for menu source files, brand details, approvals, and delivery formats."),
            Asset("asset-cafe-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for outreach, intake, approvals, delivery, follow-up, and monthly refresh offers."),
            Asset("asset-cafe-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain scope, turnaround, approvals, files, and what is not included."),
        ],
    ),
    Pack(
        "google-business-profile-rescue",
        "Google Business Profile Rescue",
        "Most local businesses lose trust before people visit.",
        "Local Service",
        "Local service businesses",
        "$0",
        "1-7 days",
        "Easy",
        "A fast audit-and-fix sprint for photos, services, categories, hours, FAQs, and review prompts.",
        "Google Business Profiles influence local trust, but many small businesses leave obvious profile issues unfixed.",
        ["Audit one profile", "Record visible fixes", "Pitch a rescue sprint"],
        "Do not promise rankings; sell profile hygiene and clarity.",
        [
            Asset("asset-gbp-audit", "Profile Audit Checklist", "PDF", "A scan list for profile photos, categories, hours, and FAQs."),
            Asset("asset-gbp-pitch", "Rescue Sprint Pitch", "DOCX", "Email and Loom pitch structure."),
            Asset("asset-gbp-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for profile audits, service descriptions, FAQs, review prompts, and rescue sprint delivery."),
            Asset("asset-gbp-intake", "Client Intake Form", "DOCX", "Editable intake questions for profile access, services, hours, photos, FAQs, review rules, and approval owners."),
            Asset("asset-gbp-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for mini audits, rescue sprint sales, owner approvals, delivery, and review requests."),
            Asset("asset-gbp-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain profile rescue scope, ranking disclaimers, access, approvals, and maintenance."),
        ],
    ),
    Pack(
        "airbnb-photo-refresh-service",
        "Airbnb Photo Refresh Service",
        "Turn flat listing photos into bookable lifestyle scenes.",
        "Local Service",
        "Short-term rental hosts",
        "$0-$50",
        "1-7 days",
        "Easy",
        "An AI-assisted listing photo refresh that improves lighting, ambience, composition, and adds realistic lifestyle models enjoying the space.",
        "Hosts already know photos drive clicks, but many listings feel empty, flat, or sterile. A strong before/after sample makes the value obvious before a sales call.",
        ["Find flat listing photos", "Create one lifestyle sample", "Pitch a fixed refresh pack"],
        "Preserve the real property and amenities; sell ambience and lifestyle context, not misleading edits.",
        [
            Asset("asset-airbnb-photo-prompts", "Photo Improvement Prompt Pack", "DOCX", "Copy-paste prompts for GPT Image 2, Nano Banana, and other image tools to improve ambience, lighting, composition, and add realistic adults enjoying the space."),
            Asset("asset-airbnb-photo-audit", "Listing Photo Audit Checklist", "PDF", "A visual audit worksheet for spotting low-appeal listing photos, sample opportunities, edit risks, and before/after proof points."),
            Asset("asset-airbnb-photo-pricing", "Photo Refresh Pricing Calculator", "XLSX", "Starter, standard, premium, and retainer pricing calculator for per-photo and per-listing refresh packages."),
            Asset("asset-airbnb-photo-outreach", "Host Outreach Scripts", "DOCX", "Cold email, DM, Loom, and follow-up scripts built around sending a proactive before/after sample to hosts."),
            Asset("asset-airbnb-photo-intake", "Client Intake Form", "DOCX", "Editable intake questions for listing URL, source photos, approved edit boundaries, model direction, rooms, usage, and host approvals."),
            Asset("asset-airbnb-photo-email-templates", "Client Email Templates", "DOCX", "Emails for sample delivery, paid refresh scope, source file requests, approval rounds, final handoff, and monthly/seasonal refresh offers."),
            Asset("asset-airbnb-photo-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs covering ethical edits, model usage, photo ownership, turnaround, platform-safe claims, revisions, and deliverables."),
        ],
    ),
    Pack(
        "drone-roof-photo-inspection",
        "Drone Roof Photo Inspection",
        "Clear roof photos and a simple visual report without anyone climbing a ladder.",
        "Local Service",
        "Roofers, agents, solar installers, and homeowners",
        "$251-$1k",
        "2-4 weeks",
        "Medium",
        "A drone-assisted roof photo documentation service that captures close-up roof images, short video, and a claim-safe visual report for people who need roof visibility.",
        "Roofs are high-stakes and hard to inspect from the ground. When a buyer sees clear overhead photos, the value is immediate without you claiming to certify structural condition.",
        ["Confirm local drone rules", "Offer one free sample roof", "Package the report"],
        "This is visual photo documentation, not a structural, engineering, safety, insurance, or building inspection.",
        [
            Asset("asset-drone-roof-outreach", "Drone Outreach Script", "DOCX", "Cold call, DM, email, and follow-up scripts for roofers, agents, solar installers, and property managers built around the free sample roof offer."),
            Asset("asset-drone-roof-report", "Roof Photo Report Template", "DOCX", "A client-ready visual report template with property details, photo grid, visible-area notes, video link, and visual-only disclaimer language."),
            Asset("asset-drone-roof-pricing", "Drone Roof Pricing Sheet", "XLSX", "Basic, standard, video, rush, and recurring partner pricing with quote builder and weekly capacity calculator."),
            Asset("asset-drone-roof-safety", "Safety & Legal Checklist", "PDF", "Pre-flight checklist covering local drone rules, permission, airspace, weather, privacy, insurance, hazards, and visual-only scope boundaries."),
            Asset("asset-drone-roof-prompts", "AI Prompt Pack", "DOCX", "Claim-safe prompts for report write-ups, visible issue notes, photo captions, free-sample pitches, agent blurbs, and delivery QA."),
            Asset("asset-drone-roof-intake", "Client Intake Form", "DOCX", "Editable intake questions for property details, owner permission, roof areas to capture, access constraints, intended use, and delivery format."),
            Asset("asset-drone-roof-email-templates", "Client Email Templates", "DOCX", "Emails for free sample offers, booking confirmation, pre-flight requirements, report delivery, follow-up, and recurring partner retainers."),
            Asset("asset-drone-roof-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs for visual-only scope, drone legality, owner permission, weather, turnaround, roof access, pricing, and recurring reports."),
        ],
    ),
    Pack(
        "power-washing-driveway-sprint",
        "Power Washing Driveway Sprint",
        "Dirty concrete is an easy before-and-after local service.",
        "Local Service",
        "Homeowners, landlords, property managers, and small commercial sites",
        "$101-$500",
        "1-7 days",
        "Medium",
        "A simple exterior cleaning service focused on driveways, paths, bins, small shopfronts, and other visible surfaces with fast before-and-after proof.",
        "Power washing has obvious visual proof, local buyer demand, and a clear first offer when you keep the scope narrow and quote by surface, access, and risk.",
        ["Rent or borrow a suitable washer", "Clean one sample surface", "Pitch neighbours and local properties"],
        "Check local water rules, surface suitability, runoff, insurance, and safety before accepting paid work.",
        [
            Asset("asset-powerwash-outreach", "Power Washing Outreach Scripts", "DOCX", "Door-hanger, neighbour note, DM, email, call, and follow-up scripts built around visible before-and-after proof."),
            Asset("asset-powerwash-pricing", "Power Washing Quote Calculator", "XLSX", "Starter, standard, add-on, travel, surface-risk, and recurring maintenance quote builder."),
            Asset("asset-powerwash-safety", "Job Safety & Surface Checklist", "PDF", "Pre-job checklist for water access, surface type, runoff, nearby hazards, photos, insurance, and no-damage scope boundaries."),
            Asset("asset-powerwash-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for quote notes, door-to-door scripts, photo-based estimates, surface-risk language, and maintenance upsells."),
            Asset("asset-powerwash-intake", "Client Intake Form", "DOCX", "Editable intake questions for address, surface type, water access, staining, drainage, photos, timing, and approval boundaries."),
            Asset("asset-powerwash-email-templates", "Client Email Templates", "DOCX", "Emails for sample offers, quote requests, booking confirmation, pre-job prep, completion handoff, and maintenance reminders."),
            Asset("asset-powerwash-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs for surfaces, water use, runoff, safety, damage limitations, weather, pricing, and recurring cleans."),
            Asset("asset-powerwash-proof", "Before & After Proof Kit", "DOCX", "Photo playbook for consistent before/after proof, plus permission, file-naming, and posting templates that turn results into referrals."),
        ],
    ),
    Pack(
        "gym-churn-report",
        "Boutique Gym Churn Report",
        "Gyms know members cancel, but not why.",
        "B2B Service",
        "Boutique gyms and studios",
        "$0",
        "2-4 weeks",
        "Medium",
        "A monthly retention report that turns messy cancellation reasons into three actionable fixes.",
        "Retention is directly tied to gym revenue, and small studios rarely have clean insight into churn reasons.",
        ["Define cancellation tags", "Build a simple report", "Pitch a monthly review"],
        "You need clean enough data and owner buy-in.",
        [
            Asset("asset-gym-report", "Churn Report Template", "XLSX", "A spreadsheet for tagging cancellations and surfacing trends."),
            Asset("asset-gym-call", "Retention Review Agenda", "PDF", "Monthly call structure and recommendations format."),
            Asset("asset-gym-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for cancellation analysis, retention recommendations, owner calls, and member-save experiments."),
            Asset("asset-gym-intake", "Client Intake Form", "DOCX", "Editable intake questions for cancellation exports, member privacy, churn tags, membership types, and owner goals."),
            Asset("asset-gym-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for gym owner outreach, data requests, report delivery, action follow-up, and renewal."),
            Asset("asset-gym-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain data needs, privacy, retention claims, monthly cadence, and staff involvement."),
        ],
    ),
    Pack(
        "shopify-cart-audit",
        "Shopify Cart Audit Pack",
        "Most small stores do not need more traffic first.",
        "Ecommerce",
        "Small Shopify stores",
        "$0",
        "1-7 days",
        "Medium",
        "An abandoned-cart and checkout trust audit for small ecommerce brands.",
        "Store owners already care about conversion, and a concrete audit is easier to buy than vague marketing help.",
        ["Review checkout friction", "Audit abandoned emails", "Send a priority fix list"],
        "Avoid promising revenue lift without data.",
        [
            Asset("asset-shopify-audit", "Cart Audit Checklist", "PDF", "A practical review checklist for cart and checkout friction."),
            Asset("asset-shopify-email", "Abandoned Cart Email Swipe", "DOCX", "Starter copy blocks for small stores."),
            Asset("asset-shopify-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for store audits, checkout objections, abandoned-cart copy, and fix prioritisation."),
            Asset("asset-shopify-intake", "Client Intake Form", "DOCX", "Editable intake questions for store access, products, policies, email platform, brand voice, and approval-sensitive claims."),
            Asset("asset-shopify-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for audit outreach, policy requests, findings delivery, implementation follow-up, and upsells."),
            Asset("asset-shopify-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain audit scope, conversion disclaimers, access, implementation, and email compliance."),
        ],
    ),
    Pack(
        "ugc-brief-generator",
        "UGC Brief Generator",
        "Brands do not need more creators. They need better briefs.",
        "Creator Business",
        "Ecommerce brands",
        "$0",
        "1-7 days",
        "Easy",
        "A productized service that creates product-specific creator briefs, hooks, shot lists, and usage notes.",
        "Short-form ad production breaks down when brands give creators vague instructions.",
        ["Pick one product", "Write five hooks", "Package a creator brief"],
        "The brief must be specific enough to improve output.",
        [
            Asset("asset-ugc-brief", "UGC Brief Template", "DOCX", "A complete structure for product-specific creator briefs."),
            Asset("asset-ugc-hooks", "Hook Bank", "PDF", "Reusable short-form ad hook patterns."),
            Asset("asset-ugc-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for product angles, creator briefs, hook variations, shot lists, and usage-rights checks."),
            Asset("asset-ugc-intake", "Client Intake Form", "DOCX", "Editable intake questions for product facts, buyer objections, proof points, creator constraints, and usage rights."),
            Asset("asset-ugc-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for ecommerce brand outreach, product info requests, brief delivery, revision requests, and monthly brief retainers."),
            Asset("asset-ugc-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain brief scope, creator responsibilities, claim safety, usage rights, and revisions."),
        ],
    ),
    Pack(
        "realtor-suburb-snapshot",
        "Realtor Suburb Snapshot Reports",
        "Real estate agents need local content every week.",
        "B2B Service",
        "Real estate agents",
        "$0",
        "2-4 weeks",
        "Medium",
        "A recurring local market snapshot agents can post, email, or use in lead nurture.",
        "Agents already pay for local positioning and lead generation; suburb-specific reports are repeatable.",
        ["Choose one suburb", "Create a sample report", "Pitch local agents"],
        "Use public data carefully and cite sources.",
        [
            Asset("asset-realtor-report", "Suburb Snapshot Template", "XLSX", "A repeatable structure for local market summaries."),
            Asset("asset-realtor-pitch", "Agent Pitch Script", "DOCX", "Outreach script for agents and principals."),
            Asset("asset-realtor-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for suburb summaries, agent content, source-safe commentary, and appraisal lead nurture."),
            Asset("asset-realtor-intake", "Client Intake Form", "DOCX", "Editable intake questions for target suburbs, data sources, agency tone, compliance approval, and posting cadence."),
            Asset("asset-realtor-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for agent outreach, sample delivery, source requests, weekly handoff, and retainer renewal."),
            Asset("asset-realtor-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain source use, compliance, market commentary limits, cadence, and deliverables."),
        ],
    ),
    Pack(
        "ai-inbox-triage-trades",
        "AI Inbox Triage for Trades",
        "Plumbers do not need an AI agent. They need inbox triage.",
        "AI Tool",
        "Trades businesses",
        "$1-$50",
        "2-4 weeks",
        "Medium",
        "A lightweight lead triage workflow that labels requests, drafts replies, and summarizes quote opportunities.",
        "Trades businesses lose leads when messages sit unanswered or arrive without clear job details.",
        ["Map inquiry types", "Create reply templates", "Set up approval workflow"],
        "Keep human approval in the loop.",
        [
            Asset("asset-trades-map", "Inbox Workflow Map", "PDF", "A simple lead triage workflow diagram."),
            Asset("asset-trades-replies", "Reply Template Pack", "DOCX", "Common quote and follow-up response templates."),
            Asset("asset-trades-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for lead classification, missing-info replies, quote triage, and owner-approved workflows."),
            Asset("asset-trades-intake", "Client Intake Form", "DOCX", "Editable intake questions for inquiry types, emergency rules, quote fields, approval roles, and communication channels."),
            Asset("asset-trades-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for trades owner outreach, workflow setup, approval rules, weekly summaries, and ongoing triage."),
            Asset("asset-trades-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain human approval, emergency handling, inbox access, template setup, and automation limits."),
        ],
    ),
    Pack(
        "review-testimonial-service",
        "Review Reply + Testimonial Clips",
        "Turn boring customer reviews into sales assets.",
        "B2B Service",
        "Local businesses",
        "$1-$50",
        "1-7 days",
        "Easy",
        "A monthly service that replies to reviews, extracts testimonial claims, and creates simple trust graphics.",
        "Businesses collect trust signals but rarely package them into reusable marketing assets.",
        ["Audit recent reviews", "Write reply examples", "Create testimonial cards"],
        "Do not invent claims; only repackage real customer language.",
        [
            Asset("asset-reviews-replies", "Review Reply Swipe File", "DOCX", "Tone-safe reply examples for positive and negative reviews."),
            Asset("asset-reviews-cards", "Testimonial Card Specs", "PDF", "Formats for turning reviews into social proof graphics."),
            Asset("asset-reviews-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for review replies, testimonial extraction, trust-card copy, and escalation-safe language."),
            Asset("asset-reviews-intake", "Client Intake Form", "DOCX", "Editable intake questions for review platforms, reply tone, escalation rules, proof claims, and design approvals."),
            Asset("asset-reviews-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for local business outreach, review approval, monthly delivery, escalation notes, and testimonial usage."),
            Asset("asset-reviews-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain review reply scope, testimonial permissions, escalation, claim safety, and monthly cadence."),
        ],
    ),
    Pack(
        "manual-workflow-concierge",
        "Manual Workflow Concierge",
        "Do not build the AI app. Sell the manual workflow first.",
        "AI Tool",
        "Niche B2B operators",
        "$0",
        "2-4 weeks",
        "Hard",
        "A validation-first startup wedge: sell a manual workflow service before automating the repeated parts.",
        "Manual delivery proves buyer demand and exposes the real automation requirements before software spend.",
        ["Pick one niche", "Deliver one weekly outcome", "Automate only repeated steps"],
        "This requires sales and niche discipline.",
        [
            Asset("asset-manual-score", "Manual Validation Scorecard", "PDF", "Criteria for deciding whether to automate."),
            Asset("asset-manual-workflow", "Workflow Concierge Template", "DOCX", "Offer structure and delivery map."),
            Asset("asset-manual-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for niche selection, workflow mapping, manual SOPs, client reports, and automation backlog decisions."),
            Asset("asset-manual-intake", "Client Intake Form", "DOCX", "Editable intake questions for workflow pain, current process, inputs, approvals, exceptions, and success criteria."),
            Asset("asset-manual-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for niche outreach, pilot setup, input requests, weekly reporting, and renewal after validation."),
            Asset("asset-manual-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain manual-first delivery, software boundaries, pilot scope, data handling, and automation timing."),
        ],
    ),
    Pack(
        "airbnb-guest-guide-refresh",
        "Airbnb Guest Guide Refresh",
        "Hosts forget the easiest guest-experience upgrade.",
        "Local Service",
        "Short-term rental hosts",
        "$0",
        "1-7 days",
        "Easy",
        "A polished digital guest guide with local tips, house rules, arrival info, and upsell opportunities.",
        "Hosts need fewer repetitive questions and better guest experience without installing new software.",
        ["Audit one listing", "Draft a guide outline", "Offer a refresh package"],
        "Local recommendations need to stay current.",
        [
            Asset("asset-airbnb-outline", "Guest Guide Outline", "DOCX", "Sections and prompts for a polished guest guide."),
            Asset("asset-airbnb-upsell", "Host Upsell Ideas", "PDF", "Simple optional add-ons hosts can include."),
            Asset("asset-airbnb-prompts", "AI Prompt Pack", "DOCX", "Practical prompts for guest-guide copy, local recommendations, house-rule clarity, and host upsell ideas."),
            Asset("asset-airbnb-intake", "Client Intake Form", "DOCX", "Editable intake questions for listing details, check-in steps, house rules, local recommendations, and host approvals."),
            Asset("asset-airbnb-email-templates", "Client Email Templates", "DOCX", "Ready-to-adapt emails for host outreach, guest-guide intake, fact approvals, final handoff, and refresh reminders."),
            Asset("asset-airbnb-faqs", "Client FAQs", "DOCX", "Buyer-facing FAQs that explain guide scope, host approvals, local recommendation checks, guest messaging, and refresh cadence."),
        ],
    ),
]


_AUTOMATION_DESC = (
    "Scheduled AI-agent prompts for this service: daily lead triage, weekly prospecting, outreach drafting, "
    "follow-ups, delivery QA, weekly reporting, and proof repurposing - each ready to paste into an agent and "
    "run on a cadence with human approval."
)


def _pack_token(assets: list[Asset]) -> str:
    common = os.path.commonprefix([asset.id[len("asset-"):] for asset in assets])
    return common.rsplit("-", 1)[0]


# Every pack leads with a scheduled-automation pack - the most appealing asset for buyers.
for _pack in PACKS:
    _token = _pack_token(_pack.assets)
    _pack.assets.insert(0, Asset(f"asset-{_token}-automation", "AI Automation Pack", "DOCX", _AUTOMATION_DESC))


def find_pack_for_asset(asset_id: str) -> tuple[Pack, Asset]:
    for pack in PACKS:
        for asset in pack.assets:
            if asset.id == asset_id:
                return pack, asset
    raise KeyError(asset_id)


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def rel_path(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def core_sections(pack: Pack) -> list[tuple[str, list[str]]]:
    return [
        ("Pack Snapshot", [
            f"Buyer: {pack.buyer}",
            f"Category: {pack.category}",
            f"Startup cost: {pack.startup_cost}",
            f"Time to first sale: {pack.time_to_first_sale}",
            f"Difficulty: {pack.difficulty}",
            f"Positioning hook: {pack.hook}",
        ]),
        ("Asset objective", [
            pack.why_it_works,
            f"Keep the promise concrete: {pack.caveat}",
            "Use this asset to create a buyer-ready deliverable, not as a generic brainstorming note.",
        ]),
    ]


def premium_handoff_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    return [
        ("Buyer-ready deliverable standard", [
            f"This asset is for {pack.buyer.lower()}; remove generic language before sending it to a prospect or client.",
            "The finished version should name the buyer context, the visible problem, the exact output, and the next decision required.",
            "Use concrete operational language. Replace broad promises with observable improvements: clearer menu, faster reply, cleaner handoff, fewer repeat questions, better approval trail.",
            "Keep one owner-facing summary at the top and one implementation checklist at the end so the buyer can act without a second explanation.",
        ]),
        ("Inputs to collect before delivery", [
            "Business name, owner or approver, preferred contact channel, and deadline.",
            "Current source material: screenshots, URLs, exports, menus, customer messages, reviews, product pages, or public market data depending on the pack.",
            "Brand constraints: logo, tone, colors, prohibited claims, legal-sensitive statements, and examples they already like.",
            "Approval constraints: who signs off, what can be changed without approval, and what must stay untouched.",
            "Delivery format: editable working file, final PDF/export, implementation checklist, and optional follow-up message.",
        ]),
        ("Evidence capture for renewal or case study", [
            "Save the before state with dated screenshots or source files.",
            "Record the exact changes made and why they were prioritized.",
            "Track buyer response time, approval friction, and implementation date.",
            "Ask for permission before using any quote, logo, review, screenshot, market data, or client result in a portfolio.",
            "If the buyer does not approve public proof, keep an anonymized internal case note for improving future pitches.",
        ]),
        ("Client handoff message", [
            f"Here is the finished {asset.title.lower()} for [business]. I included the working file, final export, and the short checklist for approval.",
            "The items marked [APPROVAL NEEDED] are the only parts I would not publish/send until you confirm them.",
            "My recommended next step is [specific next action]. If you want me to handle that as well, I can package it as [starter/standard/retainer option].",
        ]),
        ("Pricing and scope guardrails", [
            "Starter scope: one focused deliverable, one input list, one approval round, final export.",
            "Standard scope: deeper audit, 2-3 deliverables, implementation notes, and two approval rounds.",
            "Retainer scope: recurring refresh, monthly report, or ongoing response/review workflow with a fixed cadence.",
            "Out of scope unless priced separately: photography, ad spend, legal review, complex integrations, custom software, printing, and guaranteed performance outcomes.",
        ]),
        ("Final QA before sending", [
            "All bracketed placeholders are replaced or intentionally marked for buyer approval.",
            "Every link, date, price, hour, policy, claim, and contact detail is checked against a source.",
            "The final file opens on another machine and the filename clearly identifies the buyer, asset, and date.",
            "The buyer can tell what to do next within the first 30 seconds of opening the asset.",
            "No income, ranking, revenue, health, legal, or advertising performance guarantee is implied.",
        ]),
    ]


def shared_standard_pointer(pack: Pack) -> tuple[str, list[str]]:
    """Compact reference replacing the long repeated handoff block on every asset.

    The full delivery standards live once per pack, in the AI Prompt Pack, so the
    other assets stay focused on their unique content instead of repeating ~6
    identical sections."""
    return ("Delivery standards (shared)", [
        f"This asset is for {pack.buyer.lower()}; replace bracketed fields with their specifics before sending.",
        "Full delivery standards - inputs to collect, evidence capture, pricing and scope guardrails, and the pre-send QA list - live once in this pack's AI Prompt Pack.",
        "Verify every fact, price, date, hour, link, and claim against a source, and keep approvals in writing.",
        "Never imply guaranteed revenue, rankings, bookings, retention, or ad performance.",
    ])


ASSET_POLISH_SECTIONS: dict[str, list[tuple[str, list[str]]]] = {
    "asset-cafe-script": [
        ("Worked prospect example", [
            "Prospect: Laneway cafe with old Google menu photos, handwritten price changes, and active weekly specials on Instagram.",
            "Observation to lead with: your specials look current on Instagram, but the Google menu still shows older prices and a blurry counter photo.",
            "Starter offer: one-page counter menu refresh plus square/story specials panels and QR menu link check.",
            "Best next step: send a one-category mockup and ask for approval to refresh the full menu within 48 hours.",
        ]),
        ("Fulfillment notes", [
            "Create the first sample from publicly visible menu details only; do not invent prices or allergens.",
            "Use the owner's final menu file as the source of truth before delivery.",
            "Package the final handoff as: editable design link, print PDF, social exports, QR test screenshot, and owner approval list.",
        ]),
    ],
    "asset-cafe-pricing": [
        ("Pricing calibration", [
            "Starter price should feel like a paid test, not a full rebrand.",
            "Standard package should include the formats most cafes actually use: print, Instagram, QR, and Google menu link.",
            "Retainer only makes sense if the cafe changes specials, seasonal items, or prices at least monthly.",
            "Raise price when there are multiple locations, poor source files, rush turnaround, or more than one approval stakeholder.",
        ]),
    ],
    "asset-cafe-checklist": [
        ("Before-after evidence list", [
            "Before screenshot: old menu photo, missing QR destination, or inconsistent Instagram special.",
            "After screenshot: refreshed menu section, export list, and mobile QR test.",
            "Renewal evidence: number of future menu changes already identified by owner.",
        ]),
    ],
    "asset-gbp-audit": [
        ("Profile rescue example", [
            "Prospect: local electrician with correct phone number but weak service descriptions, stale photos, and no FAQs.",
            "Top fix: replace generic service labels with customer-language service descriptions and add five job-type FAQs.",
            "Owner approval required: categories, operating hours, service area, emergency wording, and review prompt.",
            "Proof to save: before screenshots of categories, services, photos, reviews, and FAQ section.",
        ]),
    ],
    "asset-gbp-pitch": [
        ("Risk-safe offer framing", [
            "Say: profile clarity, trust signals, current information, and easier customer decisions.",
            "Do not say: guaranteed ranking lift, more calls, map pack placement, or review growth.",
            "Sell the sprint as a visible hygiene cleanup with an approval checklist, not SEO magic.",
        ]),
    ],
    "asset-gym-report": [
        ("Report interpretation guide", [
            "Treat price objections differently from schedule objections; the owner should not discount when the real issue is timetable fit.",
            "Separate life-event churn from controllable churn before assigning actions.",
            "Use the save rate as a coaching metric, not a vanity metric.",
            "The monthly call should end with three owner-assigned actions max.",
        ]),
    ],
    "asset-gym-call": [
        ("Sample retention recommendation", [
            "Finding: price appears as the top reason, but comments mention schedule conflict and lack of progress check-ins.",
            "Recommendation 1: add a 14-day save flow before cancellation is finalized.",
            "Recommendation 2: call members who attended fewer than four times in the last 30 days.",
            "Recommendation 3: test one class time adjustment before offering discounts.",
        ]),
    ],
    "asset-shopify-audit": [
        ("Priority scoring example", [
            "High impact / low effort: clarify delivery timing near cart button.",
            "High impact / medium effort: rewrite abandoned-cart email 2 around trust objections.",
            "Medium impact / low effort: add returns reassurance below product price.",
            "Low priority: visual redesign that does not remove a buying objection.",
        ]),
    ],
    "asset-shopify-email": [
        ("Brand approval pack", [
            "Send the email copy with subject line, preview text, body, CTA, timing, and policy claims highlighted.",
            "Ask the brand to approve delivery timing, returns wording, discount use, testimonials, and unsubscribe/template compliance.",
            "Keep a changelog of approved copy so future email tests do not re-litigate claims.",
        ]),
    ],
    "asset-ugc-brief": [
        ("Finished brief example", [
            "Product: compact desk lamp for renters and remote workers.",
            "Audience: people with small desks who want better video-call lighting without a bulky setup.",
            "Primary hook: I fixed my dark desk setup without buying a giant ring light.",
            "Proof shot: before/after video-call frame, brightness dial close-up, folded storage shot.",
        ]),
    ],
    "asset-ugc-hooks": [
        ("Hook selection rules", [
            "Choose problem-aware hooks for cold audiences.",
            "Choose proof hooks when the brand has specific reviews or strong product evidence.",
            "Choose demo hooks when the product is visually obvious within three seconds.",
            "Reject hooks that could apply to any product in the category.",
        ]),
    ],
    "asset-realtor-report": [
        ("Source discipline", [
            "Every metric needs a source name or URL and a date captured.",
            "Use plain-English movement, not predictions.",
            "Separate factual market data from the agent's opinion.",
            "Flag missing data rather than filling gaps with guesses.",
        ]),
    ],
    "asset-realtor-pitch": [
        ("Sample weekly deliverable", [
            "One-page suburb snapshot with listing movement, rent movement, auction result context, and three agent talking points.",
            "One email intro for warm appraisal leads.",
            "Two social captions: one seller-focused, one buyer-focused.",
            "Source log included for agency approval.",
        ]),
    ],
    "asset-trades-map": [
        ("Triage rule examples", [
            "Emergency: gas smell, active leak, electrical hazard, lockout, or no essential service.",
            "Quote: non-urgent job with photos, suburb, access, timing, and scope.",
            "Missing info: request details before booking or quoting.",
            "Complaint: acknowledge, do not debate, escalate to owner before reply.",
        ]),
    ],
    "asset-trades-replies": [
        ("Approval workflow", [
            "AI drafts only after the message is classified.",
            "Office admin checks missing details and safety language.",
            "Owner approves urgent, complaint, warranty, and price-sensitive replies.",
            "All templates should keep the business phone number visible for urgent jobs.",
        ]),
    ],
    "asset-reviews-replies": [
        ("Public reply tone rules", [
            "Lead with thanks or acknowledgement.",
            "Reference the service only if it does not expose private customer information.",
            "Move disputes, refunds, and staff-specific issues to a private channel.",
            "Use the review language as a testimonial only after owner approval.",
        ]),
    ],
    "asset-reviews-cards": [
        ("Card production system", [
            "Create one master square card, one story card, and one website banner per approved review.",
            "Use one quote, one proof context, and one business mark per card.",
            "Keep typography large enough for mobile feeds.",
            "File naming: review-source_claim-format_date.",
        ]),
    ],
    "asset-manual-score": [
        ("Decision examples", [
            "16/25: stop or reposition; the pain is not proven enough.",
            "19/25: keep selling manually and improve delivery SOP.",
            "22/25 with three paid deliveries: automate one repeated low-risk step.",
            "Do not automate unclear intake, subjective judgment, or high-risk customer communication first.",
        ]),
    ],
    "asset-manual-workflow": [
        ("Operator dashboard fields", [
            "Requests received, requests completed, exceptions, manual minutes, approval delays, and repeated steps.",
            "Track what broke before building software; failure patterns define product requirements.",
            "Send the client a weekly summary that proves the workflow is being handled, not just completed.",
        ]),
    ],
    "asset-airbnb-outline": [
        ("Guest experience standard", [
            "A guest should be able to arrive, connect to Wi-Fi, park, use essentials, and check out without messaging the host.",
            "Local recommendations should include distance, best-use case, and when to double-check opening hours.",
            "House rules should be firm, short, and specific.",
        ]),
    ],
    "asset-airbnb-upsell": [
        ("Upsell approval standard", [
            "Upsells must be optional, transparent, easy to fulfill, and clearly priced.",
            "Do not add an upsell that creates operational stress for the cleaner or host.",
            "Best upsells solve arrival, celebration, convenience, or local planning friction.",
            "Track which upsells guests actually request before making them prominent.",
        ]),
    ],
    "asset-drone-roof-report": [
        ("Visual-only report language standard", [
            "Use visible, appears, shown in Photo [x], and may be worth qualified review.",
            "Avoid damaged, unsafe, failed, compliant, repair required, waterproof, structurally sound, claimable, or certified.",
            "Mark limitations clearly when shadows, tree cover, pitch, access, privacy, or flight safety prevents full visibility.",
            "Every report should make the next step obvious without pretending to replace a qualified professional.",
        ]),
    ],
    "asset-drone-roof-safety": [
        ("Commercial readiness standard", [
            "Treat permission, airspace, weather, privacy, and insurance as go/no-go items, not admin details.",
            "Document who authorised the flight before arrival.",
            "Keep a simple log of flight date, property, weather, limitations, and report delivery.",
            "If a paid job requires rules you cannot confidently comply with, decline or refer it out.",
        ]),
    ],
    "asset-drone-roof-prompts": [
        ("Prompting standard", [
            "Ask AI to rewrite for claim safety, not to diagnose the roof.",
            "Ask for tables when turning photo notes into a report so every observation is tied to an image number.",
            "Run a legal-risk pass before delivery and remove any sentence that sounds like certification.",
            "Keep a reusable prompt log for each roof type, buyer type, and report use case.",
        ]),
    ],
    "asset-powerwash-outreach": [
        ("Sample prospect example", [
            "Prospect: homeowner with a visibly dirty driveway beside two cleaner neighbouring properties.",
            "Observation to lead with: the driveway has clear before/after potential and water access appears simple from the front tap.",
            "Starter offer: one driveway or path clean with a test patch, before/after photos, and a fixed quote after photo review.",
            "Best next step: send the sample photo and ask whether they want a quick estimate from driveway photos.",
        ]),
        ("Offer boundaries", [
            "Sell one simple visible surface first: driveway, front path, patio, bin pad, or shopfront entry.",
            "Do not offer delicate surfaces, roofs, painted areas, cracked pavers, electrical areas, heavy oil remediation, or chemical work until properly equipped and insured.",
            "Use before/after proof, not income claims or vague exterior-cleaning promises.",
            "Cluster-book adjacent jobs only when travel, setup, and water access still make the numbers work.",
        ]),
    ],
    "asset-powerwash-pricing": [
        ("Pricing calibration", [
            "Quote by surface size, surface risk, staining, travel, setup time, water access, drainage, and pack-down time.",
            "A small first job still needs a minimum fee; do not underquote because the surface looks easy from the street.",
            "Charge more for oil staining, chewing gum, poor drainage, awkward access, rush jobs, or multi-surface bundles.",
            "Recurring maintenance is strongest for shopfront entries, bin pads, strata/common areas, rentals, and pre-listing refreshes.",
        ]),
    ],
    "asset-powerwash-safety": [
        ("Surface and safety standard", [
            "Start every job with photos, a test patch, water-access confirmation, drainage review, and clear no-damage boundaries.",
            "Use lower-risk surfaces first: basic concrete driveways, paths, and bin pads. Avoid delicate surfaces until trained.",
            "Check runoff, nearby drains, gardens, pets, electrical points, loose stones, old paint, cracked surfaces, and people walking through the work area.",
            "If local water restrictions, runoff rules, insurance, or surface suitability are unclear, do not accept the paid job.",
        ]),
    ],
    "asset-powerwash-prompts": [
        ("Prompting standard", [
            "Use AI for quote notes, outreach, and handoff language, not for deciding whether a surface is safe to clean.",
            "Ask the model to separate visible facts, assumptions, client approval items, and job risks.",
            "Keep all buyer-facing copy practical: surface, quote range, water access, weather window, and before/after proof.",
            "Remove any sentence that sounds like guaranteed restoration, permanent stain removal, or zero damage risk.",
        ]),
    ],
}


def asset_polish_sections(asset: Asset) -> list[tuple[str, list[str]]]:
    return ASSET_POLISH_SECTIONS.get(asset.id, [])


def script_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    base_offer = {
        "cafe-menu-refresh-package": "a menu refresh across print, Instagram, Google Business, and QR menus",
        "google-business-profile-rescue": "a profile rescue sprint for photos, services, hours, FAQs, and review prompts",
        "airbnb-photo-refresh-service": "an AI-assisted Airbnb listing photo refresh with before/after samples, edit-risk notes, and host-approved lifestyle scenes",
        "drone-roof-photo-inspection": "a visual drone roof photo report with labelled photos, a short video, and claim-safe handoff notes",
        "power-washing-driveway-sprint": "a fixed-scope driveway, path, patio, bin-area, or shopfront power washing sprint with before/after proof and surface-safety checks",
        "shopify-cart-audit": "a checkout friction and abandoned-cart email audit",
        "realtor-suburb-snapshot": "a weekly suburb snapshot agents can post, email, and send to warm leads",
        "ai-inbox-triage-trades": "an inbox triage workflow that labels leads and drafts human-approved replies",
        "review-testimonial-service": "a review reply and testimonial repackaging service",
        "manual-workflow-concierge": "a manual workflow concierge that proves demand before software build",
        "airbnb-guest-guide-refresh": "a guest guide refresh that reduces repeat questions and improves stay quality",
        "ugc-brief-generator": "a product-specific creator brief with hooks, shots, and usage notes",
    }[pack.slug]
    return [
        ("Cold email: direct audit opener", [
            f"Subject: quick {pack.title.lower()} idea",
            f"Hi [Name], I noticed [specific visible issue]. I put together a quick example of how I would improve it for {pack.buyer.lower()}.",
            f"The offer is simple: {base_offer}. It is built to be reviewed quickly, delivered quickly, and updated without adding work for your team.",
            "Worth me sending over the sample and a 3-point fix list?",
        ]),
        ("Cold email: value-first version", [
            "Subject: spotted one quick fix for [business]",
            f"Hi [Name], I was looking at [business] and noticed [specific gap]. For {pack.buyer.lower()}, this usually creates friction because customers cannot quickly decide what to do next.",
            f"I help with {base_offer}. I can send a short before/after sample first so you can see the practical difference before discussing any project.",
            "Would it be useful if I sent the sample this week?",
        ]),
        ("Cold email: referral version", [
            "Subject: who handles this?",
            f"Hi [Name], quick one - who looks after [specific operational/customer-facing area] for [business]?",
            f"I am putting together a small fix for {pack.buyer.lower()} around {base_offer}, and I think there may be a useful quick win here.",
            "If that is you, I can send the short version. If not, who is the best person to ask?",
        ]),
        ("DM opener", [
            f"Hey [Name] - quick idea for [business]. I noticed [specific observation]. I help {pack.buyer.lower()} with {base_offer}.",
            "I can send a tiny before/after mockup or checklist first. No pitch deck, just the visible fixes.",
        ]),
        ("Paid test offer", [
            "Offer one narrow outcome that can be delivered in 48-72 hours.",
            "Name exactly what the buyer receives, what input you need, and what is out of scope.",
            "Use this line: 'If it is useful, we can turn it into the full package. If not, you still keep the asset.'",
            "Price the test low enough to remove risk but high enough to prove buyer intent.",
        ]),
        ("Loom script", [
            "Open with the visible business context in the first 10 seconds.",
            "Show the gap: outdated, unclear, missing, slow, or hard to act on.",
            "Show one concrete improvement and explain why a customer or lead would notice it.",
            "Close with one option: a paid sprint, a monthly refresh, or a sample review call.",
        ]),
        ("Follow-up sequence", [
            "Day 2: send the sample again with one new observation.",
            "Day 5: ask if the issue is already handled internally.",
            "Day 10: offer a tiny paid test instead of the full package.",
            "Day 21: close the loop politely and ask permission to share one useful checklist.",
        ]),
        ("Objection handling", [
            "Too busy: offer a fixed input list and a single review window.",
            "Too expensive: cut scope to the highest-impact asset first.",
            "We already have someone: position this as a fast operational clean-up, not a replacement.",
            "Will this guarantee sales: say no; it improves clarity, response speed, and trust signals.",
        ]),
        ("Close and handoff copy", [
            "Thanks - I will send the first draft by [date/time]. I need [input 1], [input 2], and the best contact for approvals.",
            "I will mark anything uncertain instead of guessing. Once you approve, I will export the final files and include a short implementation checklist.",
            "For monthly work, I will send a refresh reminder on [day] with the exact items I need from you.",
        ]),
        ("Approval checklist", [
            "The buyer approved the visible facts, pricing, claims, hours, dates, names, and links.",
            "The final asset can be used without extra explanation from you.",
            "Any performance-sensitive claims are phrased as clarity, trust, speed, or operational improvements rather than guaranteed revenue.",
        ]),
    ]


def checklist_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    tailored = {
        "asset-cafe-checklist": [
            "Confirm all prices, item names, allergens, add-ons, and sold-out items with the owner.",
            "Export print menu as PDF with bleed-safe margins and readable item hierarchy.",
            "Export Instagram menu panels in square and story formats.",
            "Update QR menu link and test it on mobile data, not only Wi-Fi.",
            "Check Google Business hours, menu URL, and photos match the refresh.",
        ],
        "asset-gbp-audit": [
            "Primary category is specific and matches the money-making service.",
            "Opening hours, holiday hours, service area, phone, and booking link are correct.",
            "Recent photos show real work, premises, staff, and proof of activity.",
            "Services and descriptions use plain customer language, not internal jargon.",
            "Review request prompt is ethical, simple, and sent after a real service moment.",
        ],
        "asset-airbnb-photo-audit": [
            "Listing photos are bright enough to understand the room within three seconds.",
            "The first five photos show the strongest room, sleeping setup, bathroom, kitchen/living area, and lifestyle context.",
            "Any AI edit preserves real property layout, amenities, views, room size, furniture, and access details.",
            "Lifestyle models are realistic adults and do not imply amenities, parties, views, or experiences the property cannot provide.",
            "Before/after samples are labelled as visual refresh concepts and approved by the host before publication.",
        ],
        "asset-drone-roof-safety": [
            "Confirm local drone rules, registration/licensing requirements, airspace restrictions, and any permission or notification requirements before accepting paid work.",
            "Get property-owner or authorised-agent permission in writing before flying and avoid capturing neighbouring private areas where possible.",
            "Check weather, wind, visibility, battery level, return-to-home settings, obstacles, trees, power lines, birds, people, traffic, and safe launch/landing area.",
            "Carry or confirm suitable drone liability insurance for paid work before offering commercial reports.",
            "Label the service as visual photo documentation only; do not certify structural condition, safety, insurance coverage, code compliance, or repair urgency.",
        ],
        "asset-powerwash-safety": [
            "Confirm local water restrictions, runoff rules, insurance needs, and any site-specific permission before accepting paid work.",
            "Check surface type, condition, cracks, loose material, paint, sealant, drainage, staining, nearby gardens, pets, electrical outlets, and foot traffic.",
            "Confirm water access, parking/setup area, hose route, weather window, and where dirty water will flow.",
            "Take before photos from fixed angles, complete a small test patch, and get approval before continuing.",
            "Avoid delicate, painted, sealed, old, cracked, roof, electrical, or chemical-heavy surfaces unless properly trained, insured, and scoped.",
        ],
        "asset-gym-call": [
            "Start with churn count, churn rate, and top cancellation reasons.",
            "Separate controllable reasons from life-event reasons.",
            "Choose three actions max: one communication fix, one experience fix, one save-flow fix.",
            "Assign an owner and review date for each action.",
            "End with the question: what will we change before next month?",
        ],
        "asset-shopify-audit": [
            "Check product page trust: delivery clarity, returns, reviews, images, size/fit, FAQs.",
            "Check cart friction: surprise fees, coupon distraction, delivery estimate, payment options.",
            "Check checkout confidence on mobile using real test flow.",
            "Review abandoned-cart emails for timing, plain-language objection handling, and CTA clarity.",
            "Rank fixes by effort and likely buyer confidence impact.",
        ],
        "asset-ugc-hooks": [
            "Problem-aware hook: name the exact frustration the buyer already feels.",
            "Before/after hook: show the product state change in one sentence.",
            "Myth hook: challenge a lazy assumption in the category.",
            "Proof hook: lead with a result, review phrase, or repeated customer behavior.",
            "Demo hook: show the product in use before explaining anything.",
        ],
        "asset-trades-map": [
            "Label inquiry type: emergency, quote, follow-up, complaint, supplier, admin.",
            "Extract minimum job details: location, issue, urgency, access, photos, preferred time.",
            "Draft reply only after classification and missing-info check.",
            "Route urgent jobs to phone-first workflow.",
            "Keep human approval before any message is sent.",
        ],
        "asset-reviews-cards": [
            "Use only real review language; never invent claims.",
            "Choose one claim per graphic: speed, friendliness, quality, value, outcome.",
            "Pair quote with business proof: service type, suburb, or customer context.",
            "Export square, story, and website banner variants.",
            "Keep negative-review replies private unless the business approves public use.",
        ],
        "asset-manual-score": [
            "Score buyer pain based on current cost, frequency, and urgency.",
            "Score manual deliverability before considering software.",
            "Score willingness to pay from real conversations, not compliments.",
            "Score repeatability only after three delivered outcomes.",
            "Automate one repeated step at a time.",
        ],
        "asset-airbnb-upsell": [
            "Local breakfast basket with clear price and order deadline.",
            "Late checkout request with availability rules.",
            "Paid local itinerary for families, couples, or remote workers.",
            "Partner discount list for cafes, tours, gyms, and transport.",
            "Emergency convenience kit with replacement fee clarity.",
        ],
    }[asset.id]
    return core_sections(pack) + [
        ("Core checklist", tailored),
        ("Quality bar", [
            "The asset should be specific enough that a buyer can approve it without a meeting.",
            "Every recommendation must be visible, actionable, and easy to explain.",
            "Remove anything that sounds impressive but does not change buyer behavior.",
        ]),
        ("Delivery note", [
            "Send the finished asset with a short summary of what changed.",
            "Include the next recommended step, the owner input needed, and the review deadline.",
            "Keep a copy of before/after evidence for renewals and follow-ups.",
        ]),
    ]


DOCX_ASSET_SECTIONS: dict[str, list[tuple[str, list[str]]]] = {
    "asset-cafe-script": [
        ("Best prospects", [
            "Independent cafes with menu photos older than three months.",
            "Cafes posting specials on Instagram that are missing from Google or QR menus.",
            "Venues with handwritten changes, inconsistent pricing, or no mobile-friendly menu link.",
        ]),
        ("Cold email 1: visible menu gap", [
            "Subject: quick menu refresh idea for [Cafe]",
            "Hi [Name], I noticed [specific menu issue: old specials / blurry photo / missing QR link]. That is the kind of small friction customers notice before they order.",
            "I help cafes turn the existing menu into a clean print version, Instagram menu panels, a Google menu link, and a QR-ready version. I can mock up one section first so you can judge the style before committing.",
            "Would it be useful if I sent a quick before/after for one menu category?",
        ]),
        ("Cold email 2: specials refresh", [
            "Subject: easier weekly specials",
            "Hi [Name], your specials look active, but they seem to live in different places. I can package a weekly specials refresh so the printed counter menu, Instagram story, and QR menu all match.",
            "The simple version is a 48-hour refresh with one approval round. The monthly version includes two refreshes and a small emergency update window.",
            "Want me to send the tiny scope and price menu?",
        ]),
        ("DM script", [
            "Hey [Name], I saw [specific menu/specials issue]. I make quick menu refresh packs for cafes: print menu, Instagram panels, Google/QR link checks. I can send a one-section mockup first if useful.",
            "If you already have someone handling this, no stress. If not, I can turn it around quickly with your existing menu info.",
        ]),
        ("Loom structure", [
            "0:00-0:10 - Show the current menu issue and say why it matters to a customer.",
            "0:10-0:35 - Show one fixed example: clearer section title, readable price, better item hierarchy.",
            "0:35-0:55 - Explain the package: print, Instagram, Google menu link, QR-ready export.",
            "0:55-1:10 - Ask for permission to send a 48-hour paid refresh scope.",
        ]),
        ("Follow-up sequence", [
            "Day 2: send one extra menu observation and offer a one-section sample.",
            "Day 5: ask whether specials/menu updates are handled internally.",
            "Day 10: offer the starter refresh only, with no retainer.",
            "Day 21: send a short menu-preflight checklist and close the loop.",
        ]),
        ("Client intake prompts", [
            "Current menu file or clear photos.",
            "Confirmed item names, prices, add-ons, allergens, and sold-out items.",
            "Logo, brand colors, Instagram handle, Google profile link, and QR destination.",
            "Preferred final formats: A4, A3, square, story, website PDF, QR menu PDF.",
        ]),
    ],
    "asset-gbp-pitch": [
        ("Prospect triggers", [
            "Profile has missing or stale hours, weak categories, poor photos, unanswered reviews, or no services list.",
            "The business ranks visibly enough to care, but the profile does not build trust quickly.",
            "The owner is active on social but has neglected Google Business Profile basics.",
        ]),
        ("Email: profile hygiene opener", [
            "Subject: quick Google profile clean-up idea",
            "Hi [Name], I noticed your Google Business Profile has [specific issue]. That can create trust friction when people are comparing local options.",
            "I do a fixed-scope profile rescue: categories, services, hours, photos, FAQs, and review-request prompts. I do not promise rankings; the goal is profile clarity and trust.",
            "Would you like me to send a 3-point profile audit?",
        ]),
        ("Loom script", [
            "Show the profile as a customer would see it.",
            "Point out the specific trust gap: stale photo, unclear service, missing hours, weak FAQ, or unanswered review.",
            "Explain the rescue sprint and explicitly state no ranking guarantee.",
            "Close with a simple audit offer: one page, visible fixes, fixed fee.",
        ]),
        ("Proposal bullets", [
            "Audit current profile fields and visible trust gaps.",
            "Recommend primary and secondary category clean-up.",
            "Draft service descriptions in customer language.",
            "Prepare FAQ prompts, review request prompt, and photo checklist.",
            "Deliver an owner approval list before changes are made.",
        ]),
        ("Compliance language", [
            "Do not claim guaranteed rankings, map-pack placement, review volume, or revenue.",
            "Use ethical review prompts only; never ask for fake, gated, or incentivized reviews.",
            "Keep business owner approval for categories, claims, services, and hours.",
        ]),
    ],
    "asset-airbnb-photo-outreach": [
        ("Best prospects", [
            "Short-stay listings with good spaces but dim, empty, cold, cluttered, or sterile first-five photos.",
            "Hosts with strong reviews but weak hero photos; the product is good, the visual merchandising is underperforming.",
            "Property managers with multiple listings and inconsistent photo quality across similar properties.",
            "Avoid listings with already excellent professional photography unless you can offer seasonal refreshes or direct-booking crops.",
        ]),
        ("Cold email: proactive sample opener", [
            "Subject: quick visual refresh idea for [listing name]",
            "Hi [Name], I noticed [specific room/photo] in your [listing/location] property has good potential, but the image feels [flat/dim/empty/cold] compared with the stay it is selling.",
            "I made a small concept showing how that photo could feel warmer and more bookable while preserving the real property details. The final version would only be used with your approval.",
            "I offer a fixed 6-photo refresh: lighting, ambience, crop, and tasteful lifestyle scenes where appropriate. Want me to send the sample?",
        ]),
        ("Cold email: direct before/after attached", [
            "Subject: sample refresh for [listing]",
            "Hi [Name], I put together a quick before/after concept for your [room/photo]. I kept the property details intact and focused on ambience, light, and helping guests imagine using the space.",
            "If useful, I can refresh 6 listing photos in this style with one approval round and web-ready exports. The starter refresh is [price] and can be turned around in [timeframe].",
            "Would you like me to price the full set?",
        ]),
        ("DM version", [
            "Hey [Name], I saw your [listing/room] photo and made a quick concept showing how it could feel warmer and more lived-in while keeping the real space accurate.",
            "I do fixed Airbnb photo refreshes using host-approved AI edits: lighting, ambience, crop, and realistic lifestyle scenes. Want me to send the sample?",
        ]),
        ("Loom script", [
            "0:00-0:10 - Show the current listing photo and name the visible issue: dim, empty, cold, cluttered, weak crop, or missing lifestyle context.",
            "0:10-0:30 - Show the refreshed sample and explain what changed: light, warmth, composition, guest context, and visual appeal.",
            "0:30-0:45 - State the boundary: the edit must preserve real property facts and requires host approval before use.",
            "0:45-1:00 - Offer the fixed starter: 6 photos, one style direction, one revision round, web-ready exports.",
        ]),
        ("Follow-up sequence", [
            "Day 2: send one additional room idea, such as balcony coffee scene, bedroom arrival moment, or kitchen breakfast scene.",
            "Day 5: ask whether they already have a seasonal photo refresh process before peak booking periods.",
            "Day 10: offer a smaller paid starter: one approved hero image plus prompt/edit log.",
            "Day 21: close the loop with a short checklist: five photo issues that reduce listing appeal.",
        ]),
        ("Objection handling", [
            "Is this misleading? The offer preserves the real property and only uses host-approved edits. No fake amenities, views, room size, bed count, or layout changes.",
            "We already have photos. This is not a replacement shoot; it is a fast visual merchandising refresh for existing photos.",
            "Will Airbnb allow this? The host must approve and decide platform use. The service focuses on truthful, property-preserving enhancements.",
            "Why add people? People help guests imagine using the space. The model should support the room, not become the product.",
        ]),
        ("Close and handoff copy", [
            "Great. For the starter refresh I need the listing URL, original source photos where possible, the rooms you want prioritised, and any edit boundaries.",
            "I will return before/after files, a short edit log, usage notes, and any images that need explicit approval before publication.",
            "If any edit changes a property fact or feels too stylised, I will regenerate rather than ask you to publish it.",
        ]),
    ],
    "asset-drone-roof-outreach": [
        ("Best prospects", [
            "Roofers who quote residential repairs, gutter work, storm damage, roof restorations, or maintenance jobs.",
            "Real estate agents who need listing support, pre-sale condition context, or buyer-question documentation.",
            "Solar installers who need pre-quote roof visibility, panel context, or before/after job documentation.",
            "Property managers, strata managers, and landlords who need fast visual documentation without climbing access.",
        ]),
        ("Cold call: free sample roof", [
            "Hi [Name], I run a drone roof photo service for [roofers/agents/solar installers] who need clear roof visibility without sending someone up a ladder.",
            "I am offering one free sample roof for a local partner this week: a short flyover, labelled roof photos, and a simple visual report you can show a client.",
            "This is not a structural inspection or certification; it is clean photo documentation from above. Would a sample report be useful for one property you already have permission to access?",
        ]),
        ("Cold email: roofer partner", [
            "Subject: free sample roof report for your next quote",
            "Hi [Name], I noticed you handle [roof repairs/gutters/restoration] around [area]. I help roofers get clear drone photos and a simple visual roof report before quoting or documenting work.",
            "The useful part is speed: photos from above, visible areas flagged, and no one climbing a ladder just to get first-look images. It is visual documentation only, not a structural inspection.",
            "I am offering one free sample roof for a local roofer this week. Want me to send the sample report format?",
        ]),
        ("Cold email: agent or property manager", [
            "Subject: roof visibility for [listing/property]",
            "Hi [Name], roof questions can slow down a listing, maintenance decision, or owner update because the roof is hard to see from the ground.",
            "I provide drone roof photos, a short video, and a simple visual-only report that can be shared with the owner, seller, buyer, or tradesperson. No structural certification; just clear roof visibility.",
            "Would you like a sample report for one property where you already have owner permission?",
        ]),
        ("DM version", [
            "Hey [Name], I do drone roof photo reports for local [roofers/agents/solar installers]. It is a short flyover, clear roof photos, and a visual-only report - no structural certification. I am offering one free sample roof this week if you have a property with owner permission.",
        ]),
        ("Follow-up sequence", [
            "Day 2: send a sample report screenshot and ask which use case matters most: quoting, listing support, storm docs, solar pre-check, or owner update.",
            "Day 5: offer a tiny paid first job if they do not want to use the free sample slot.",
            "Day 10: share the pre-flight checklist to show professionalism: permission, airspace, weather, privacy, and visual-only scope.",
            "Day 21: close the loop with a recurring partner offer: 4 reports per month with priority scheduling.",
        ]),
        ("Objection handling", [
            "Is this an inspection? No. It is visual photo documentation only. A qualified roofer, engineer, builder, or assessor should interpret structural condition.",
            "Is this legal? Paid drone rules vary by country and location. Flights should only happen where the operator can comply with local drone, airspace, privacy, and permission requirements.",
            "Do you need to climb the roof? No. The point is to capture visibility from above without ladder access.",
            "Will it find every problem? No. It can show visible areas of interest from the captured angles; it cannot guarantee hidden damage detection.",
        ]),
        ("Close and booking copy", [
            "Great. To book the flyover I need written permission from the owner or authorised agent, the property address, any specific areas to capture, preferred timing, and any access or privacy notes.",
            "I will confirm weather and airspace before attending. If conditions are not suitable, I will reschedule rather than force the flight.",
            "The final delivery is a photo set, short video link, and visual-only report. Anything that looks like repair advice should be reviewed by a qualified professional.",
        ]),
    ],
    "asset-drone-roof-report": [
        ("Report cover", [
            "Property: [address]",
            "Client: [name / company]",
            "Date captured: [date]",
            "Operator: [business name]",
            "Purpose: visual roof photo documentation only.",
            "Delivery: photo set, short video link, and visual report.",
        ]),
        ("Scope statement", [
            "This report provides visual photo documentation captured by drone from accessible exterior angles.",
            "This is not a structural inspection, engineering report, building inspection, safety certification, insurance assessment, or repair recommendation.",
            "Visible areas of interest are noted only to help the client decide whether a qualified roofer, builder, engineer, installer, or assessor should review further.",
        ]),
        ("Photo grid fields", [
            "Photo number: [01]",
            "Area: [front roof plane / rear roof plane / gutter / valley / flashing / solar panel / penetration / ridge / debris]",
            "Observation: [visible-only note]",
            "Image file: [filename]",
            "Recommended next step: [monitor / ask roofer / provide to installer / no action from visual review]",
        ]),
        ("Visible-area note examples", [
            "Leaves or debris are visible in the gutter area shown in Photo 04.",
            "A colour or texture difference is visible on the roof plane shown in Photo 07; qualified review may be useful if this is a concern.",
            "Solar panels are visible from above in Photos 09-11. No electrical or performance assessment is provided.",
            "The valley area shown in Photo 06 is partially obscured by shadow; additional review may be needed if the client requires certainty.",
        ]),
        ("Video link section", [
            "Short flyover video: [link]",
            "Video purpose: orientation and context only.",
            "Notes: [wind/weather/shadow/access limitations].",
        ]),
        ("Client handoff note", [
            "Attached are the labelled roof photos, short video, and visual-only report.",
            "Please share this with your roofer, installer, agent, owner, or assessor if you need a professional interpretation.",
            "If you need additional angles, closer photos, or a repeat flyover after weather or repairs, I can quote a follow-up visit.",
        ]),
    ],
    "asset-powerwash-proof": [
        ("How to use this kit", [
            "Shoot the before photo the moment you arrive, before any water touches the surface.",
            "Use the same phone, the same spot, and the same framing for the after photo so the only thing that changes is the surface.",
            "Capture proof on every job, even small ones; the photo is the asset that wins the next neighbour and landlord.",
            "Never fake the result. Straightening, cropping, and light exposure fixes are fine; editing the surface itself is not.",
        ]),
        ("Matched before/after shots", [
            "Angle: stand in the same spot for both photos and mark it with a cone, pot, or chalk.",
            "Distance: frame the full surface plus one fixed landmark such as a gate, step, or drain.",
            "Height: shoot from chest height, not down at your feet, so the surface reads clearly.",
            "Lighting: use the same time of day where possible and avoid harsh shadow lines across the wet area.",
            "Reference: keep one unchanged object in frame so the viewer trusts the comparison.",
        ]),
        ("Test patch sequence", [
            "Step 1: photograph the dirtiest representative section before cleaning.",
            "Step 2: clean one small patch at your planned pressure and dwell time.",
            "Step 3: photograph the same patch and confirm no etching, lifting, or surface damage.",
            "Step 4: only then quote and clean the full surface, matching the proven settings.",
        ]),
        ("Photo permission", [
            "Ask before posting: 'Happy for me to share the before/after of your [surface]? I never show house numbers, faces, or anything identifying.'",
            "Get a yes in writing; a text reply is enough. Save it with the job file.",
            "Crop out house numbers, number plates, mailboxes, and people unless the owner specifically approves them.",
            "For landlords and strata, confirm who owns the right to approve public use before posting.",
        ]),
        ("File naming system", [
            "Format: suburb_surface_before-or-after_date.",
            "Example: northcote_driveway_before_2026-06-17.jpg.",
            "Folders: one folder per job holding the before, the after, and the permission reply together.",
            "Backup: keep originals and only ever post copies so the unedited proof survives.",
        ]),
        ("Caption copy templates", [
            "Before and after on a [suburb] driveway today. Same angle, same phone, no filters, just a proper clean. Booking [area] this week.",
            "This [path / bin pad / entry] took about [time]. If yours looks like the 'before', send me two photos for a quick range.",
            "Pre-listing clean for a [suburb] rental. Clean entries photograph better and show tenants the place is cared for.",
        ]),
        ("Turn proof into referrals", [
            "Send the owner the after photo within an hour, while they can still see the wet result.",
            "Ask one direct question: 'Know a neighbour whose driveway looks like your before photo?'",
            "Offer a small same-street discount if a neighbour books within the week.",
            "Reuse the strongest before/after as the sample image in your next round of outreach.",
        ]),
        ("Proof quality checklist", [
            "Before photo captured dry, on arrival, from the marked spot.",
            "After photo matches the angle, distance, height, and framing.",
            "A fixed landmark appears in both photos.",
            "Permission saved and identifying details cropped.",
            "Files named and backed up before anything is posted.",
        ]),
    ],
    "asset-powerwash-outreach": [
        ("Best prospects", [
            "Homeowners with visibly dirty but simple concrete driveways, paths, patios, or bin areas.",
            "Landlords and property managers preparing a rental for photos, inspections, or end-of-lease handover.",
            "Small shops with grimy entries, outdoor dining edges, bins, gum, or foot-traffic marks.",
            "Strata or common-area contacts with repeat paths, bin pads, car parks, and entrances.",
            "Avoid first-time prospects where the surface looks delicate, damaged, painted, sealed, steep, or poorly drained.",
        ]),
        ("Neighbour note", [
            "Hi [Name], I just cleaned [nearby sample / my driveway / a neighbour's path] and noticed your [driveway/path/bin area] has the same easy before-and-after potential.",
            "I do fixed-scope power washing for simple concrete and paved surfaces. I check water access, drainage, surface condition, and test a small patch before cleaning.",
            "If you send a couple of photos, I can give you a quick range and the next weather window.",
        ]),
        ("Door-hanger style copy", [
            "Your driveway/path has an easy clean-up opportunity.",
            "I clean simple concrete, paths, patios, bin pads, and shopfront entries with before/after photos and a clear quote before work starts.",
            "Text [phone] with two photos for a quick estimate. No roof work, no delicate surfaces, no guessing.",
        ]),
        ("DM script", [
            "Hey [Name], quick local note. I noticed the [driveway/path/shop entry] at [property] could probably be cleaned up with a simple power washing sprint.",
            "I can quote from photos first, then confirm water access and surface condition before booking. Want me to send the starter range?",
        ]),
        ("Property manager email", [
            "Subject: quick clean-up for paths, bin pads, and entries",
            "Hi [Name], I help local property managers with small power washing jobs: paths, bin pads, entries, patios, and pre-listing surface refreshes.",
            "The offer is simple: photo-based quote, surface check, before/after photos, and a short completion note. Useful for end-of-lease, inspections, and listing prep.",
            "Do you have one property where a small exterior clean-up would help this week?",
        ]),
        ("Small shop email", [
            "Subject: front entry clean-up idea",
            "Hi [Name], I noticed the front entry/bin area at [shop] has visible foot-traffic staining. That is a small thing customers see before they walk in.",
            "I do fixed-scope power washing for shopfront entries, paths, and bin pads. I can quote from photos, check water access, and work around quiet trading hours.",
            "Want me to send a quick range for that area?",
        ]),
        ("Call script", [
            "Hi [Name], I am local and do small power washing jobs for driveways, paths, bin pads, and shop entries.",
            "I am not pitching a full exterior clean. The starter version is one surface, a test patch, before/after photos, and a clear quote before I start.",
            "Would it be useful if I texted you a sample and you sent back a photo for a quick range?",
        ]),
        ("Follow-up sequence", [
            "Day 2: send the before/after sample again and ask whether they want a photo-based range.",
            "Day 5: mention the next good weather window and one practical prep note.",
            "Day 10: offer a smaller first surface such as front path, bin pad, or entry.",
            "Day 21: close the loop and ask whether a quarterly maintenance reminder would be useful.",
        ]),
        ("Objection handling", [
            "I can do it myself: true. The value is saving setup time, getting a cleaner result, and avoiding surface or runoff mistakes.",
            "Will it remove every stain? No. Some stains may fade rather than disappear. I will test a patch and set expectations first.",
            "Could it damage the surface? High pressure can damage the wrong surface. That is why I check surface type, condition, and test patch before continuing.",
            "Too expensive: reduce scope to the highest-visibility surface, not the whole property.",
        ]),
        ("Close and booking copy", [
            "Great. Please send the address, 3-5 photos, surface type if known, water access location, preferred timing, and any areas to avoid.",
            "I will confirm the quote range, weather window, and any risk notes before booking.",
            "After the job I will send before/after photos and a simple maintenance reminder if you want one.",
        ]),
    ],
    "asset-shopify-email": [
        ("Flow assumptions", [
            "Use only after the brand confirms consent and email platform rules.",
            "Keep the first email helpful, the second trust-building, and the third objection-focused.",
            "Do not use false scarcity, fake timers, or unsupported discount claims.",
        ]),
        ("Email 1: 1-3 hours after abandonment", [
            "Subject: still deciding on [Product]?",
            "Preview: Here is the quick version before you come back.",
            "Body: You left [Product] in your cart. The short version: [core benefit], [proof point], and [shipping/returns reassurance].",
            "CTA: Return to cart",
        ]),
        ("Email 2: 18-24 hours after abandonment", [
            "Subject: a couple of details people check before ordering",
            "Preview: Delivery, returns, and fit/use notes in one place.",
            "Body: If you paused because of [common concern], here are the details: [delivery detail], [return policy], [review or proof point].",
            "CTA: See your cart",
        ]),
        ("Email 3: 48-72 hours after abandonment", [
            "Subject: should we keep this aside?",
            "Preview: Last reminder about your cart.",
            "Body: If [Product] is still on your list, your cart is here. If not, no stress. The main reason customers choose it is [specific outcome/proof].",
            "CTA: Finish checkout",
        ]),
        ("Segment variants", [
            "High AOV: emphasize support, guarantees, delivery confidence, and proof.",
            "First-time buyer: explain trust signals and reduce perceived risk.",
            "Returning customer: reference previous category interest and speed.",
            "Discount-sensitive shopper: use value framing before discounting.",
        ]),
        ("Filled example: skincare product", [
            "Subject: still deciding on the Barrier Repair Cream?",
            "Preview: Texture, shipping, and returns in one place.",
            "Body: You left Barrier Repair Cream in your cart. The short version: it is fragrance-free, designed for dry sensitive skin, and ships free over $60. If it is not right for your skin, returns are accepted within 30 days.",
            "CTA: Return to cart",
        ]),
        ("Compliance checklist", [
            "Sender identity is clear.",
            "Unsubscribe link remains present in the platform template.",
            "Discounts, guarantees, delivery timing, and review claims match approved site language.",
            "Email frequency respects the brand's consent and suppression rules.",
        ]),
        ("Audit scoring", [
            "Timing is clear and not excessive.",
            "Each email answers a different objection.",
            "CTA language matches the buying stage.",
            "Claims are supported by product page, reviews, or policy language.",
        ]),
    ],
    "asset-ugc-brief": [
        ("Brief header", [
            "Product: [name, URL, price, variants]",
            "Audience: [buyer type, current frustration, desired outcome]",
            "Primary message: [one sentence only]",
            "Proof: [review quote, demo result, ingredient/material, guarantee, founder fact]",
        ]),
        ("Required deliverables", [
            "3 raw vertical videos, 20-35 seconds each.",
            "1 hook-only variant per video.",
            "Raw clips with natural sound where useful.",
            "No music baked in unless the brand approves the track.",
        ]),
        ("Shot list", [
            "Problem moment: show the buyer context before the product appears.",
            "Product reveal: clear packaging or product in use within first 5 seconds.",
            "Proof shot: texture, fit, setup, result, before/after, or comparison.",
            "Objection shot: sizing, setup time, cleaning, shipping, compatibility, or durability.",
            "CTA frame: one clear next action without hard selling.",
        ]),
        ("Hook bank for this brief", [
            "I did not expect [product] to fix [specific problem] this quickly.",
            "If you hate [problem], this is the part that matters.",
            "Three things I would want to know before buying [product].",
            "This looks simple, but the useful part is [proof point].",
            "I tried [old approach] and then tested [product].",
        ]),
        ("Usage rights", [
            "Organic usage: [yes/no, duration].",
            "Paid ad usage: [yes/no, duration, territory].",
            "Editing rights: [cutdowns, captions, hooks, whitelisting].",
            "Exclusivity: [category, duration, fee if applicable].",
        ]),
        ("Filled example: home fitness product", [
            "Product: Foldable under-desk walking pad, $349, black or white.",
            "Audience: remote workers who want low-impact movement without leaving calls.",
            "Primary message: add movement to the workday without turning the room into a gym.",
            "Proof: folds upright, speed controls on remote, customer review about using it during admin blocks.",
            "Shot sequence: desk before, walking pad reveal, remote speed close-up, walking while typing, folded storage shot.",
        ]),
        ("Approval notes", [
            "Creator must disclose paid relationship where required.",
            "No health, income, or performance claims unless the brand provides approved language.",
            "Paid usage, whitelisting, and edits require written agreement before delivery.",
        ]),
    ],
    "asset-realtor-pitch": [
        ("Who to pitch", [
            "Agents posting generic market updates without suburb-specific proof.",
            "Principals who want weekly nurture content for appraisal leads.",
            "Buyer agents or selling agents who need simple local education assets.",
        ]),
        ("Email: suburb content gap", [
            "Subject: weekly [Suburb] snapshot idea",
            "Hi [Name], I noticed your content talks about the market broadly, but not much about what changed in [Suburb] this week.",
            "I build a weekly suburb snapshot agents can post, email, or send to warm leads. It uses public data, cites sources, and turns the numbers into plain-English talking points.",
            "Would you like to see a one-page sample for [Suburb]?",
        ]),
        ("Principal pitch", [
            "This gives the team a repeatable local-content asset every week.",
            "It can be used by sales agents, buyer managers, and admin without rewriting from scratch.",
            "The value is consistency: one source-backed snapshot, multiple content uses.",
        ]),
        ("Compliance reminders", [
            "Cite sources for market data.",
            "Avoid investment advice and unsupported price predictions.",
            "Include agency approval before publishing branded market commentary.",
        ]),
        ("Filled example intro", [
            "Hi Sarah, I noticed your team posts strong auction content, but there is not a repeatable weekly snapshot for Paddington sellers.",
            "I put together a one-page sample that turns public listings, auction clearance, rent movement, and days-on-market data into three talking points your agents can use in email and social.",
            "No predictions, no investment advice, just source-backed local context.",
        ]),
        ("Follow-up offer", [
            "Offer one suburb sample first.",
            "Then package a weekly retainer by suburb or agent pod.",
            "Add a monthly vendor nurture email as the upsell.",
        ]),
    ],
    "asset-trades-replies": [
        ("Emergency job reply", [
            "Thanks for the message. If this is urgent or unsafe, please call [phone] now so we can triage it properly.",
            "To help us respond quickly, please send: suburb, issue, when it started, photos/video if safe, and whether water/power/gas is currently affected.",
        ]),
        ("Quote request reply", [
            "Thanks - we can help assess this. Please send your suburb, a short description, 2-3 photos, and your preferred timing.",
            "Once we have those details, we can confirm whether this needs a site visit or whether we can provide an indicative range first.",
        ]),
        ("Missing information reply", [
            "Thanks, we are missing a couple of details before we can book this properly: [missing field 1], [missing field 2], [photo/access detail].",
            "Reply with those and we will come back with the next step.",
        ]),
        ("Follow-up reply", [
            "Just checking whether you still need help with [job]. If yes, send the missing details and we can confirm the next available slot.",
            "If it is already sorted, no worries - thanks for letting us know.",
        ]),
        ("No-fit reply", [
            "Thanks for reaching out. This one is outside our current service area/scope, so we do not want to waste your time.",
            "The best next step is [referral type or recommended professional].",
        ]),
        ("Approval rules", [
            "AI can draft, but a human approves before sending.",
            "Urgent safety issues route to phone, not email.",
            "Never quote a final fixed price without the required job details.",
        ]),
        ("Trade type variants", [
            "Plumber: include water shutoff status, leak photos, fixture type, and access notes.",
            "Electrician: include safety warning, switchboard photos if safe, outage scope, and appliance affected.",
            "HVAC: include unit model, error code, room affected, last service date, and access constraints.",
            "Roofer: include leak location, ceiling stain photo, roof access note, and weather urgency.",
        ]),
    ],
    "asset-reviews-replies": [
        ("Positive review: simple", [
            "Thanks, [Name]. We really appreciate you taking the time to share this. Glad we could help with [specific service/outcome].",
        ]),
        ("Positive review: detailed", [
            "Thanks for the kind words, [Name]. It is great to hear that [specific detail from review] made the experience easier. We appreciate you choosing [Business].",
        ]),
        ("Neutral review", [
            "Thanks for the feedback, [Name]. We appreciate you sharing what worked and what could have been better. We will pass this to the team and use it to improve [specific area].",
        ]),
        ("Negative review: public response", [
            "Hi [Name], we are sorry this was your experience. That is not the standard we aim for. Please contact [contact] with your booking/order details so we can look into it properly.",
        ]),
        ("Negative review: do not say", [
            "Do not argue with the reviewer.",
            "Do not reveal private customer details.",
            "Do not offer compensation publicly unless approved.",
            "Do not invent facts that are not in the review or internal record.",
        ]),
        ("Testimonial extraction fields", [
            "Customer language: exact phrase from review.",
            "Claim category: speed, quality, trust, friendliness, result, value.",
            "Proof context: service/product/location/date if approved.",
            "Reusable asset: quote card, website snippet, email proof block, sales deck line.",
        ]),
        ("Escalation workflow", [
            "Potential legal, safety, discrimination, medical, or privacy issue: do not reply from the swipe file; escalate to owner.",
            "Refund or compensation request: acknowledge publicly only if approved, then move to private channel.",
            "Staff naming: remove or anonymize where required by policy.",
            "Repeat complaint theme: log it as operational feedback, not just reputation management.",
        ]),
    ],
    "asset-manual-workflow": [
        ("Offer definition", [
            "Niche: [buyer segment].",
            "Weekly outcome: [specific thing delivered].",
            "Input required: [files, access, approvals, decision rules].",
            "Delivery promise: [frequency, format, response window].",
            "Out of scope: [custom work, emergency work, unsupported channels].",
        ]),
        ("Manual SOP", [
            "Receive input and confirm completeness.",
            "Classify request using the decision rules.",
            "Produce first draft or operational output.",
            "Run quality check against acceptance criteria.",
            "Send to client with decisions needed and next deadline.",
            "Log repeated steps for possible automation.",
        ]),
        ("QA checklist", [
            "Output matches the buyer's actual workflow.",
            "No unsupported claims or invented data.",
            "Every exception is logged.",
            "Client approval is captured where risk exists.",
            "Delivery time is tracked for pricing and automation decisions.",
        ]),
        ("Automation backlog", [
            "Repeated low-risk task.",
            "Clear input format.",
            "Clear pass/fail output.",
            "Human review remains possible.",
            "Automation reduces delivery time without changing the offer promise.",
        ]),
        ("Client report", [
            "Volume handled this week.",
            "Exceptions found.",
            "Time saved estimate.",
            "Decisions needed from client.",
            "Recommended process improvement.",
        ]),
        ("Filled example: weekly vendor research workflow", [
            "Niche: boutique agencies that need a weekly list of new vendor signals.",
            "Weekly outcome: a ranked list of 20 properties with owner, likely motivation signal, source link, and suggested opener.",
            "Input: target suburbs, excluded property types, agency tone rules, CRM import format.",
            "Delivery promise: every Monday by 9am as CSV plus 5 recommended first calls.",
        ]),
        ("Pricing and handoff", [
            "Pilot: one weekly delivery for a fixed fee.",
            "Retainer: four weekly deliveries plus one refinement call.",
            "Automation review: after four deliveries, identify one repeated step to automate.",
        ]),
    ],
    "asset-airbnb-outline": [
        ("Guest guide sections", [
            "Welcome: property name, host contact, emergency-only contact, Wi-Fi.",
            "Arrival: address, parking, entry code, check-in photos, luggage note.",
            "House rhythm: heating/cooling, appliances, bins, quiet hours, pets, smoking.",
            "Local guide: breakfast, groceries, dinner, family activities, rainy-day options.",
            "Checkout: time, dishes, rubbish, linen, key return, late checkout request.",
        ]),
        ("Prompt set for hosts", [
            "What do guests ask repeatedly before arrival?",
            "What do guests misuse or struggle to find?",
            "Which local recommendations are genuinely current?",
            "What is the emergency process for lockouts, leaks, power, or medical issues?",
            "Which optional paid extras are approved and easy to fulfill?",
        ]),
        ("Guest-facing copy blocks", [
            "Wi-Fi: Network [name], password [password]. If it drops, restart [router location] and message us if it does not return.",
            "Bins: Collection is [day]. Please place [bin color] at [location] by [time].",
            "Checkout: Please leave by [time], lock [doors/windows], and return keys to [location].",
        ]),
        ("Quality checklist", [
            "A first-time guest can check in without messaging the host.",
            "Every recommendation has address, hours/check-needed note, and transport context.",
            "Rules are firm but not hostile.",
            "Emergency details are easy to find.",
        ]),
        ("Completed sample page", [
            "Welcome to Harbour Loft. Wi-Fi network: HarbourLoftGuest. Password: [password]. Message [host phone] for non-urgent questions between 8am and 8pm.",
            "Parking: use bay 14 behind the building. Do not park in visitor bays overnight; the strata manager fines cars after 10pm.",
            "Checkout: please leave by 10am, place rubbish in the ground-floor bin room, and return both keys to the lockbox.",
        ]),
        ("Host approval checklist", [
            "Access instructions tested by someone who has never visited.",
            "Emergency contacts are current.",
            "Local recommendations checked in the last 30 days.",
            "Upsells are optional, priced clearly, and operationally easy to fulfill.",
        ]),
    ],
}


PDF_ASSET_SECTIONS: dict[str, list[tuple[str, list[str]]]] = {
    "asset-cafe-checklist": checklist_sections(*find_pack_for_asset("asset-cafe-checklist")) + [
        ("Final export checklist", [
            "[ ] Print PDF exported with readable item hierarchy.",
            "[ ] Instagram square and story panels exported.",
            "[ ] QR code tested on mobile data.",
            "[ ] Google menu link checked.",
            "[ ] Owner has approved prices, allergens, and sold-out items.",
        ]),
    ],
    "asset-gbp-audit": checklist_sections(*find_pack_for_asset("asset-gbp-audit")) + [
        ("Scoring grid", [
            "Categories: correct / partial / missing.",
            "Photos: current / stale / weak / missing.",
            "Services: customer-language / internal jargon / incomplete.",
            "Reviews: replied / partly replied / ignored.",
            "FAQs: useful / thin / missing.",
        ]),
    ],
    "asset-gym-call": checklist_sections(*find_pack_for_asset("asset-gym-call")) + [
        ("30-minute agenda", [
            "0-5 min: churn count, save rate, revenue at risk.",
            "5-15 min: top reasons and representative member comments.",
            "15-25 min: choose three actions with owners.",
            "25-30 min: confirm next review date and data needed.",
        ]),
    ],
    "asset-shopify-audit": checklist_sections(*find_pack_for_asset("asset-shopify-audit")) + [
        ("Audit score categories", [
            "Product page trust: 0-5.",
            "Shipping and returns clarity: 0-5.",
            "Cart friction: 0-5.",
            "Checkout confidence: 0-5.",
            "Abandoned email recovery: 0-5.",
            "Mobile speed and readability: 0-5.",
        ]),
    ],
    "asset-ugc-hooks": checklist_sections(*find_pack_for_asset("asset-ugc-hooks")) + [
        ("Ready-to-use hooks", [
            "I bought this for [problem], but the useful part was [unexpected benefit].",
            "Three things I wish I knew before trying [product].",
            "If [common frustration] annoys you, watch this part.",
            "This is not for everyone, but it is useful if [specific buyer].",
            "I tested [old way] against [product], and here is the difference.",
            "The feature that looks boring is actually the reason I kept using it.",
            "Before you buy [category], check this one detail.",
            "I would skip this if [bad-fit buyer], but use it if [good-fit buyer].",
        ]),
    ],
    "asset-trades-map": checklist_sections(*find_pack_for_asset("asset-trades-map")) + [
        ("Workflow map", [
            "Inbound message -> classify type -> check missing details -> urgency route.",
            "Emergency -> phone-first instruction -> human dispatch decision.",
            "Quote -> gather suburb/photos/access/timing -> draft reply -> human approval.",
            "Complaint -> acknowledge -> escalate internally -> approved response only.",
            "Admin/supplier -> non-lead label -> route away from quote queue.",
        ]),
    ],
    "asset-reviews-cards": checklist_sections(*find_pack_for_asset("asset-reviews-cards")) + [
        ("Design specs", [
            "Square: 1080 x 1080 px, quote max 26 words, logo bottom right.",
            "Story: 1080 x 1920 px, quote max 34 words, large safe margins.",
            "Website banner: 1600 x 600 px, quote plus service/location context.",
            "Use one claim per card and keep original review language intact.",
        ]),
    ],
    "asset-manual-score": checklist_sections(*find_pack_for_asset("asset-manual-score")) + [
        ("Weighted scorecard", [
            "Pain frequency: 1-5, weight 20%.",
            "Current cost of pain: 1-5, weight 20%.",
            "Manual deliverability: 1-5, weight 20%.",
            "Willingness to pay evidence: 1-5, weight 25%.",
            "Repeatability: 1-5, weight 15%.",
            "Do not automate below 18/25 or before three paid deliveries.",
        ]),
    ],
    "asset-airbnb-upsell": checklist_sections(*find_pack_for_asset("asset-airbnb-upsell")) + [
        ("Guest-facing upsell copy", [
            "Breakfast basket: Want breakfast ready on arrival? Order by [time] for [$].",
            "Late checkout: If available, late checkout to [time] is [$]. Ask by [deadline].",
            "Local itinerary: We can send a custom half-day plan for [family/couple/work trip] for [$].",
            "Keep all upsells optional, transparent, and easy for the host to fulfill.",
        ]),
    ],
    "asset-drone-roof-safety": checklist_sections(*find_pack_for_asset("asset-drone-roof-safety")) + [
        ("Pre-flight decision gate", [
            "Do not fly if local rules, airspace status, owner permission, weather, visibility, battery condition, or launch area are unclear.",
            "Do not fly over people, traffic, neighbouring private areas, animals, power lines, or unsafe obstacles.",
            "Reschedule if wind, rain, glare, shadow, or visibility would make the photo set misleading or unsafe.",
            "Document any limitation in the report: tree cover, shadows, steep pitch, obstruction, access, privacy boundary, or weather.",
        ]),
        ("Shot list", [
            "Wide context photo of the property and roof orientation.",
            "Front, rear, left, and right roof planes where visible and permitted.",
            "Gutters, valleys, ridges, flashing, vents, chimneys, skylights, penetrations, and solar panels if present.",
            "Any client-requested area of interest, captured from multiple safe angles where possible.",
            "Short video flyover for orientation only, not diagnosis.",
        ]),
        ("Report boundary check", [
            "Say visible area of interest, not confirmed defect.",
            "Say qualified professional review may be useful, not repair required.",
            "Say visual photo documentation, not inspection certificate.",
            "Avoid hidden damage, waterproofing, electrical, structural, safety, or insurance conclusions.",
        ]),
    ],
    "asset-powerwash-safety": checklist_sections(*find_pack_for_asset("asset-powerwash-safety")) + [
        ("Go/no-go decision gate", [
            "Do not start if water access, permission, runoff path, surface type, local rules, insurance, weather, or safe work area are unclear.",
            "Do not clean delicate stone, old timber, painted surfaces, sealed surfaces, roofs, electrical areas, cracked surfaces, or heavy chemical stains without proper training and scope.",
            "Do not promise complete stain removal. Oil, rust, gum, paint, mould, and age marks may need specialist treatment or may only improve partially.",
            "Stop if the test patch lifts paint, loosens surface material, creates unsafe runoff, affects neighbouring property, or reveals a surface risk.",
        ]),
        ("Pre-job photo list", [
            "Wide photo of the whole surface from the client-facing angle.",
            "Close-up of stains, cracks, loose areas, drains, edges, gardens, and nearby walls or doors.",
            "Water access point and hose route.",
            "Runoff path and any drains, gardens, neighbouring boundaries, or footpaths affected.",
            "After photos from the same angles, plus one close-up proof area.",
        ]),
        ("Client prep checklist", [
            "Move cars, bins, furniture, mats, toys, and loose items from the work area.",
            "Keep pets and children away from the surface during work and drying.",
            "Confirm outdoor power points, doors, windows, and drainage areas that need protection.",
            "Confirm whether detergent is allowed or whether water-only cleaning is required.",
            "Approve the test patch before full cleaning continues.",
        ]),
        ("Completion handoff", [
            "Send before/after photos, any areas that did not fully lift, and any surface limitations noticed.",
            "Recommend drying time and when the client can move items back.",
            "Offer the next clean window: quarterly, pre-listing, end-of-lease, seasonal, or after heavy weather.",
        ]),
    ],
}


PROMPT_PACK_SECTIONS: dict[str, list[tuple[str, list[str]]]] = {
    "asset-cafe-prompts": [
        ("How to use these prompts", [
            "Paste one prompt at a time and replace every bracketed field with real cafe details.",
            "Ask the model to mark unknown facts instead of guessing prices, allergens, opening hours, or sold-out items.",
            "Use AI for drafts, structure, and QA; the owner must approve menu facts before anything is published.",
        ]),
        ("Cafe audit prompts", [
            "Act as a cafe menu operations reviewer. Review these menu photos, Instagram posts, Google Business details, and QR menu notes: [paste details]. Find mismatches in item names, prices, specials, hours, QR destination, and customer clarity. Return a table with Issue, Evidence, Customer impact, Fix, Owner approval needed.",
            "Turn this messy cafe menu into a clean hierarchy. Inputs: [menu items, prices, add-ons, categories]. Group items into sensible sections, flag unclear items, suggest short item descriptions only where helpful, and list all facts that need owner approval.",
            "Compare this cafe's Instagram specials against its Google/menu information: [paste]. Identify which specials need matching print, QR, Google, and story assets. Do not invent pricing.",
        ]),
        ("Menu copy and design prompts", [
            "Rewrite these menu item descriptions for a modern independent cafe. Keep copy short, appetising, and practical. Preserve exact ingredients and allergens. Return three tone options: minimal, warm, premium.",
            "Create a print-menu content plan for [cafe name]. Include section order, headline hierarchy, footer notes, QR callout, and the exact owner facts to verify before export.",
            "Create Instagram square and story copy for this weekly special: [details]. Include headline, short description, price line, dietary note placeholder, and CTA. Keep it readable on mobile.",
        ]),
        ("Outreach and sales prompts", [
            "Write a cold email to a cafe owner based on this visible issue: [issue]. Keep it friendly, specific, and under 120 words. Offer to send a one-section mockup, not a generic design service.",
            "Create a 60-second Loom script showing a cafe's outdated menu problem and one before/after improvement. Structure it as: observation, customer friction, sample fix, tiny paid next step.",
            "Generate three follow-up messages for a cafe owner who has not replied. Use Day 2, Day 5, Day 10. Each follow-up must add one useful observation and avoid sounding needy.",
        ]),
        ("Delivery and renewal prompts", [
            "Create an owner handoff note for a completed menu refresh. Include files delivered, items needing approval, QR test result, publishing checklist, and suggested next refresh date.",
            "Build a monthly refresh checklist for a cafe that changes specials often. Include inputs to collect, recurring assets to update, approval deadline, and optional retainer upsell.",
            "Turn this completed menu refresh into an anonymised case study note. Inputs: before state, after state, owner feedback, implementation date. Do not include private data or unapproved claims.",
        ]),
    ],
    "asset-airbnb-photo-prompts": [
        ("How to use these prompts", [
            "Use only host-owned, host-approved, or public listing photos for private sample concepts. Do not publish final images without written host approval.",
            "Preserve the real property: layout, furniture, windows, amenities, view, access, bed count, room size, and permanent finishes.",
            "Use bracketed placeholders before every generation: [room], [time_of_day], [lighting_style], [guest_type], [activity], [mood], [crop], [edit_boundary].",
            "Mark every AI-enhanced sample as a concept until the host approves publication and confirms the edited scene still represents the stay accurately.",
            "Use realistic adult lifestyle scenes only; avoid children, parties, unsafe behaviour, pets unless confirmed, fake amenities, fake views, or exaggerated luxury.",
        ]),
        ("Photo audit prompts", [
            "Act as a short-term-rental photo merchandising reviewer. Review these listing photos: [paste notes or image descriptions]. Return a table with Photo, Current weakness, Booking impact, Safe edit opportunity, Host approval needed, Risk.",
            "Review the first five photos of this listing: [paste]. Recommend the best order for clicks and guest understanding. Preserve true property facts and flag misleading edits.",
            "Identify which photos are candidates for AI-assisted lighting, ambience, composition, decluttering, or realistic adult lifestyle context. Do not suggest edits that change property facts.",
            "Score this listing photo from 1-5 for brightness, warmth, visual hierarchy, lifestyle context, perceived cleanliness, and booking appeal. Then recommend one safe edit that would create the strongest before/after sample.",
            "Find the single best proactive sample photo for this listing: [listing notes]. Prioritise a photo where the property has good bones but the image is flat, empty, dim, cold, cluttered, or poorly cropped.",
        ]),
        ("Universal image improvement prompt", [
            "Edit this [room] short-stay listing photo for [platform/use]. Preserve the exact property layout, furniture, windows, amenities, view, access points, room scale, architecture, bed count, and permanent finishes. Improve [lighting_style], [time_of_day] ambience, colour balance, cleanliness, crop, verticals, and visual hierarchy. Add [number] realistic adult [guest_type] naturally [activity] only if it makes the real space easier to imagine. Keep the result photorealistic, premium, warm, and booking-friendly. Do not add new amenities, fake views, extra furniture, extra space, text, logos, children, parties, unsafe behaviour, or distorted architecture.",
            "Create three tasteful variations of this same image: 1) [morning/bright] clarity, 2) [golden-hour/warm] lifestyle, 3) [evening/cosy] ambience. Keep property facts identical across all versions. Return a short note describing what changed and what the host must approve.",
            "Improve this listing photo without adding people. Preserve all property facts. Focus only on light, colour, composition, lens correction, perceived cleanliness, shadows, texture, and booking-platform polish. Keep the result realistic rather than over-staged.",
        ]),
        ("Living area prompts", [
            "Create a warm lifestyle version of this living room with [one/two] realistic adult guests [reading / drinking coffee / planning the day / relaxing after arrival]. Preserve sofa, furniture placement, windows, wall art, view, room size, and floor plan exactly. Lighting: [soft morning / golden hour / cosy evening]. Mood: welcoming, calm, premium, believable.",
            "Refresh this lounge image for the hero slot of a short-stay listing. Correct vertical lines, brighten shadows, warm the room, reduce visual clutter, and make the seating area feel inviting. If adding people, place [guest_type] naturally on existing seating without blocking important amenities.",
            "Turn this empty lounge into a subtle arrival moment: [two adults] setting down bags and settling in. Keep the room truthful, avoid hotel-ad exaggeration, and do not add new decor, furniture, fireplaces, views, or appliances.",
        ]),
        ("Bedroom prompts", [
            "Refresh this bedroom listing photo for higher booking appeal. Preserve bed size, layout, windows, furniture, wall positions, ceiling height, and floor area. Improve linen neatness, warmth, natural light, and composition. Add [one adult guest] [reading / placing luggage / opening curtains] only if realistic and non-intrusive.",
            "Create a calm premium bedroom scene at [time_of_day]. Make the bed look clean and inviting without changing the actual bed size or room scale. Keep decor, walls, lamps, wardrobe, and window positions accurate.",
            "Improve this bedroom image for a couple-friendly listing. Add two realistic adults only as a subtle lifestyle cue, such as one person reading near the bed and another unpacking. Do not imply additional amenities or make the room appear larger.",
        ]),
        ("Kitchen and dining prompts", [
            "Enhance this kitchen photo while preserving cabinet layout, appliances, benchtop size, sink position, windows, and finishes. Improve warmth, cleanliness, reflections, and crop. Add [one/two adult guests] naturally [making coffee / preparing breakfast / placing groceries] without adding appliances or changing the kitchen.",
            "Create a breakfast lifestyle scene in this dining area with [two adults] enjoying coffee and a simple meal. Preserve table size, chairs, lighting fixtures, room scale, and view. Keep styling realistic for a short-stay guest photo.",
            "Refresh this kitchen/dining image for a direct-booking website. Make the space feel usable and clean. Remove only minor visual clutter if safe; do not replace benchtops, add luxury appliances, or alter storage.",
        ]),
        ("Outdoor and balcony prompts", [
            "Improve this balcony/patio listing photo at [golden hour / morning / blue hour]. Preserve the real view, railing, furniture, plants, boundaries, neighbouring buildings, and outdoor space size. Add [one/two adult guests] [having coffee / reading / watching sunset] only if they fit naturally.",
            "Create a relaxing outdoor lifestyle scene for this short-stay photo. Do not improve the view beyond what exists. Do not add pools, fire pits, ocean, skyline, greenery, furniture, or privacy screens unless present in the source image.",
            "Refresh this outdoor entertaining photo for warmer ambience and better booking appeal. Preserve all permanent features and furniture placement. Correct exposure, colour, shadows, and composition; avoid making the space look larger.",
        ]),
        ("Bathroom and detail prompts", [
            "Refresh this bathroom image while preserving tile, vanity, mirror, shower, toilet, fixtures, window, and room scale. Improve brightness, cleanliness, reflections, verticals, and white balance. Do not add spa amenities, extra towels, plants, windows, or luxury finishes that are not present.",
            "Create a premium detail-crop version of this bathroom/kitchen/bedside image. Emphasise texture, cleanliness, light, and guest readiness. Do not change materials, brands, fixtures, or dimensions.",
            "Improve this amenities photo for clarity and warmth. Keep every object accurate. Remove only distracting shadows or minor mess; do not add products, appliances, labels, or extras the host does not provide.",
        ]),
        ("Lifestyle model insertion prompts", [
            "Add [one adult / two adults] into this photo as realistic guests enjoying the real space. Placement: [specific location]. Activity: [activity]. Wardrobe: neutral, modern, travel-appropriate. Pose: natural, candid, not promotional. Preserve property scale and do not obscure important features.",
            "Create a remote-work lifestyle scene in this listing photo with [one adult] using a laptop at the existing desk/table. Preserve desk size, chair, outlets, windows, and room layout. Do not imply dedicated office equipment unless present.",
            "Create a couple-weekend lifestyle scene in this [room] with two adults [activity]. Keep the scene quiet and premium, not party-focused. Maintain realistic body scale, shadows, reflections, and contact points with furniture.",
            "Create a solo-traveller lifestyle scene in this [room] with one adult [reading / making coffee / unpacking]. Keep the person secondary to the room so the property remains the product.",
        ]),
        ("Negative prompts and guardrails", [
            "Negative prompt: no architecture changes, no extra windows, no fake view, no additional rooms, no room enlargement, no added amenities, no extra furniture, no altered bed count, no changed appliances, no text, no logos, no unrealistic bodies, no warped hands, no duplicate limbs, no distorted reflections, no party scene, no children, no unsafe behaviour.",
            "If the tool changes property facts, regenerate with stronger constraints: preserve exact geometry, preserve all furniture, preserve existing view, keep camera angle, do not stylise, photorealistic edit only.",
            "If a model looks pasted in, regenerate with: realistic contact shadows, correct perspective, accurate scale, natural pose, matching light direction, matching lens depth, no fashion-shoot styling.",
            "If the room looks too luxurious, regenerate with: subtle improvement only, realistic short-stay listing style, no new decor, no premium materials, no exaggerated cleanliness, preserve original finishes.",
        ]),
        ("Before/after sample prompts", [
            "Create one sales sample from this public listing photo. Goal: show the host a tasteful improvement, not a finished publication file. Preserve property facts, improve lighting and ambience, optionally add [one adult guest] [activity], and output a short before/after note with: visible issue, safe edit, why it helps booking appeal, host approval needed.",
            "Write a 90-word explanation for this before/after sample. Avoid technical AI language. Emphasise that the edit keeps the property truthful while helping guests imagine using the space.",
            "Generate a low-pressure offer note attached to this sample: fixed package, photo count, turnaround, revision round, source files needed, and approval workflow.",
        ]),
        ("QA prompts", [
            "QA this edited listing photo against the original. Check property accuracy, model realism, lighting consistency, reflections, shadows, scale, furniture, windows, amenities, view, room size, safety, and platform-safe representation. Return Pass/Revise plus specific fixes.",
            "Compare original and edited image descriptions: [original] vs [edited]. List every property fact that changed, every possible guest-misleading risk, and the safest regeneration prompt.",
            "Create a final host approval checklist for this edited image: room, source file, prompt used, edit type, model added yes/no, property facts preserved, risks, approval status, final filename.",
        ]),
        ("Sales and delivery prompts", [
            "Write a host outreach email offering a one-photo before/after sample. Mention the specific listing-photo weakness and state that all edits preserve real property details and require host approval.",
            "Create a Loom script for showing a host one photo refresh sample: current photo issue, safe improvement, booking-confidence reason, edit boundaries, and fixed refresh offer.",
            "Create a final handoff note for a photo refresh package with before/after filenames, edit-risk notes, approved usage, platform-safe caveats, and recommended next refresh date.",
            "Write a follow-up to a host who opened the sample but did not reply. Add one more concrete room idea and keep the ask to a yes/no: should I price a 6-photo starter refresh?",
            "Write a property-manager version of the pitch for someone managing multiple listings. Position the service as a seasonal visual refresh system with consistent approval and edit-risk logs.",
        ]),
    ],
    "asset-drone-roof-prompts": [
        ("How to use these prompts", [
            "Use AI to draft report language, captions, outreach, and QA notes; do not let AI certify roof condition or diagnose structural issues.",
            "Paste only client-approved information and remove private details before using external AI tools.",
            "Replace every bracketed field before sending: [property], [client], [area], [photo number], [visible observation], [next step], [qualified professional].",
            "Keep language visual and cautious: visible, appears, shown in photo, area of interest, further review may be useful.",
            "Avoid absolute statements: safe, unsafe, compliant, failed, guaranteed, storm-damaged, insurable, repair required, structurally sound.",
        ]),
        ("Photo report write-up prompts", [
            "Act as a claim-safe visual documentation assistant. Turn these drone roof photo notes into a 1-2 page visual-only report: [paste notes]. Use sections: property details, flight summary, photo observations, video link, limitations, recommended next steps. Do not provide structural, engineering, insurance, or repair conclusions.",
            "Create concise captions for these roof photos: [paste photo notes]. Each caption must include Area, Visible observation, and Suggested professional follow-up if needed. Use cautious language and avoid diagnosing damage.",
            "Rewrite these rough roof observations into client-safe wording: [paste]. Replace certainty with visual language. Flag any sentence that sounds like a structural inspection or repair advice.",
        ]),
        ("Visible issue flagging prompts", [
            "Review these image descriptions from a drone roof flyover: [paste]. Identify visible areas of interest only. Return Photo, Area, What is visible, Why the client may care, Suggested qualified reviewer, Confidence based on visibility, and Limitations.",
            "Create a photo priority list from these roof images: [paste]. Put the clearest context photos first, then gutters/valleys/flashing/penetrations/panels/debris, then any limited-visibility images.",
            "Generate a limitations note for these flight conditions: [weather, shadows, wind, access limits, tree cover, privacy limits]. Keep it professional and short.",
        ]),
        ("Client-safe disclaimer prompts", [
            "Draft a plain-English visual-only disclaimer for a drone roof photo report. It must say this is not a structural inspection, engineering report, building inspection, safety certification, insurance assessment, or repair quote.",
            "Rewrite this report note so it does not imply certification: [paste note]. Keep the helpful observation but remove inspection, diagnosis, guarantee, safety, compliance, or repair certainty.",
            "Create three versions of a report footer disclaimer: concise, standard, and formal. Keep all versions readable for homeowners and agents.",
        ]),
        ("Outreach prompts", [
            "Write a cold email to a local roofer offering one free sample roof. Mention clear overhead photos, simple visual report, no ladder needed for first-look documentation, and no structural certification.",
            "Write a cold call script for a solar installer who may need roof visibility before quoting. Include permission, weather, and visual-only scope in natural language.",
            "Write a real estate agent pitch for roof visibility during listing preparation. Keep it practical and avoid promising sale outcomes.",
            "Create five follow-up messages after sending a sample report to a roofer, agent, solar installer, property manager, or homeowner.",
        ]),
        ("Report QA prompts", [
            "QA this drone roof report before sending: [paste report]. Check for unsupported claims, structural-certification language, repair advice, insurance promises, missing permission note, missing limitations, unclear photo labels, and vague next steps. Return a table of fixes and a polished version.",
            "Find every sentence that could create legal risk in this report: [paste]. Explain the risk and rewrite each sentence as visual documentation language.",
            "Create a final send checklist for this job using: [client, address, photos, video link, report]. Include owner permission, file naming, disclaimer, limitations, and follow-up offer.",
        ]),
    ],
    "asset-powerwash-prompts": [
        ("How to use these prompts", [
            "Use AI for sales copy, quote notes, handoff messages, and surface-risk language; do not use it as a substitute for training, insurance, local rules, or surface judgement.",
            "Replace every bracketed field with real property details before sending anything to a client.",
            "Ask the model to mark unknown facts instead of guessing water access, surface type, drainage, stain type, or safety boundaries.",
            "Avoid promising complete stain removal, zero damage risk, guaranteed restoration, or permanent cleanliness.",
            "Keep the service narrow: one visible surface, quote from photos, test patch, before/after proof, and clear maintenance option.",
        ]),
        ("Photo-based quote prompts", [
            "Act as a practical power washing quote assistant. Review these client photos and notes: [paste surface, size estimate, staining, access, drainage, water, hazards]. Return a table with Surface, Visible issue, Risk, Quote factor, Missing info, Recommended scope.",
            "Turn these property notes into a conservative quote range: [paste]. Include setup time, travel, water access, surface size, staining, drainage, risk, and what is excluded.",
            "Create a pre-job question list for this power washing lead: [paste property notes]. Separate must-have answers from nice-to-have details.",
            "Write a test-patch approval note for a client. Surface: [surface]. Risk: [risk]. Explain that the test patch confirms surface response before the full clean.",
        ]),
        ("Outreach prompts", [
            "Write a short neighbour note for a homeowner with this visible surface issue: [issue]. Mention a simple driveway/path clean, photo-based quote, test patch, and before/after proof. Keep it under 110 words.",
            "Write a DM to a local shop owner about cleaning their front entry or bin pad. Include trading-hour sensitivity and no pressure.",
            "Write a property manager email offering path, bin pad, common-area, and pre-listing power washing. Make the offer operational, not cosmetic fluff.",
            "Create five follow-up messages after sending a power washing sample photo. Each should add one useful note: weather, water access, test patch, cluster booking, or maintenance timing.",
        ]),
        ("Surface-risk language prompts", [
            "Rewrite this client message so it sets realistic expectations about staining and surface risk: [paste]. Avoid sounding scary, but do not promise complete stain removal.",
            "Create a plain-English exclusions list for a beginner power washing service. Exclude roofs, electrical areas, delicate stone, old timber, painted surfaces, sealed surfaces, cracked surfaces, and specialist chemical work unless scoped separately.",
            "Write a completion note for a job where some oil staining improved but did not fully disappear. Keep it professional and suggest the next realistic option.",
            "Create a client-safe runoff and water access note for this property: [details]. Mention local rules and client approval without legal overreach.",
        ]),
        ("Delivery prompts", [
            "Create a pre-job checklist from these details: [client, address, surface, water access, hazards, weather, scope]. Return client prep, operator prep, test patch, and completion photos.",
            "Write a booking confirmation email for a power washing job. Include arrival window, water access, cleared surface, pets/children, weather caveat, and payment terms.",
            "Create a final handoff message with before/after photos, what was cleaned, limitations, drying time, and a maintenance reminder.",
            "Generate three recurring maintenance offers for this buyer type: [homeowner / landlord / shop / property manager]. Keep the cadence realistic and easy to accept.",
        ]),
        ("QA prompts", [
            "QA this quote before I send it: [paste quote]. Check for missing water access, unclear surface scope, unsupported stain promises, underpriced travel/setup time, missing exclusions, and vague next steps.",
            "Review this client-facing power washing page copy: [paste]. Remove hype, income claims, guaranteed restoration, legal overreach, and unsafe promises. Return safer practical wording.",
            "Create a final job log from these notes: [paste]. Include before photos taken, test patch result, cleaned areas, limitations, client approval, after photos, and recommended next clean date.",
        ]),
    ],
    "asset-gbp-prompts": [
        ("How to use these prompts", [
            "Use screenshots and public profile data as inputs; do not claim access to ranking data you do not have.",
            "Frame outputs around clarity, trust, completeness, and customer decision-making, not guaranteed SEO performance.",
            "Keep owner approval for categories, services, hours, photos, claims, and review-request wording.",
        ]),
        ("Profile audit prompts", [
            "Act as a Google Business Profile hygiene auditor. Review this profile information: [paste categories, services, photos, reviews, hours, FAQs]. Return a prioritized audit with Trust issue, Evidence, Customer impact, Fix, Approval needed, Risk level.",
            "Identify missing or weak service descriptions for this local business: [business type and current services]. Rewrite each service in plain customer language, avoiding ranking claims and unsupported guarantees.",
            "Review these profile photos: [describe or paste list]. Recommend the next 10 photos the business should add, grouped by proof of work, premises, staff, customer confidence, and recency.",
        ]),
        ("FAQ and review prompts", [
            "Generate 10 useful Google Business Profile FAQs for a [business type] serving [location]. Make them buyer-facing, specific, and answerable without legal or medical risk. Mark any answer that needs owner approval.",
            "Create an ethical review request message for customers after [service moment]. Make it simple, non-incentivised, and compliant with review-platform norms.",
            "Draft owner-safe replies to these reviews: [paste reviews]. Keep responses concise, do not reveal private details, and move disputes to a private channel.",
        ]),
        ("Outreach and delivery prompts", [
            "Write a cold email offering a profile rescue sprint to [business type]. Mention this specific visible issue: [issue]. Include no ranking guarantee. Offer a 3-point audit.",
            "Create a Loom script for a profile rescue pitch. Show current profile issue, why it affects trust, the fixed-scope sprint, and the owner approval list.",
            "Create a profile rescue sprint handoff checklist with sections for categories, services, hours, photos, FAQs, reviews, approval notes, and post-delivery maintenance.",
        ]),
    ],
    "asset-gym-prompts": [
        ("How to use these prompts", [
            "Anonymise member data before using AI. Remove names, phone numbers, email addresses, and payment details.",
            "Treat outputs as retention insight and owner discussion material, not medical, legal, or guaranteed revenue advice.",
            "Separate controllable churn from life-event churn before recommending action.",
        ]),
        ("Churn analysis prompts", [
            "Act as a boutique gym retention analyst. Analyse these cancellation reasons and attendance notes: [paste anonymised data]. Tag each reason, separate controllable vs non-controllable churn, and identify the top three themes with evidence.",
            "Convert this messy cancellation feedback into a monthly retention report. Include churn themes, member quotes, revenue-at-risk estimate placeholder, recommended actions, and owner decisions needed.",
            "Find hidden reasons behind 'price' cancellations from these comments: [paste]. Identify whether price is likely true price sensitivity, schedule mismatch, low usage, weak progress visibility, or poor onboarding.",
        ]),
        ("Recommendation prompts", [
            "Generate three practical retention experiments for a boutique gym facing [theme]. Each experiment must include target members, owner effort, message script, success measure, and review date.",
            "Create a 14-day save-flow script for members about to cancel because of [reason]. Keep it empathetic, non-pushy, and operationally realistic for a small studio.",
            "Create a monthly owner call agenda based on this churn summary: [paste]. Keep it to 30 minutes and end with three actions max.",
        ]),
        ("Sales and delivery prompts", [
            "Write a pitch email to a boutique gym owner offering a monthly churn report. Mention this specific pain: [visible/researched observation]. Promise insight and action structure, not guaranteed retention.",
            "Create a data intake checklist for a gym churn report. Include exports, cancellation tags, attendance notes, membership types, and privacy requirements.",
            "Draft the client handoff message for a completed churn report. Include summary, three recommended actions, data caveats, and next review date.",
        ]),
    ],
    "asset-shopify-prompts": [
        ("How to use these prompts", [
            "Use the live store, product pages, checkout observations, and abandoned-cart emails as inputs.",
            "Do not promise conversion lifts. Rank fixes by likely buyer-confidence impact and implementation effort.",
            "Have the brand approve policy, delivery, discount, testimonial, and guarantee language.",
        ]),
        ("Store audit prompts", [
            "Act as a Shopify conversion-friction auditor. Review this product page, cart, checkout notes, policies, and email flow: [paste]. Return a prioritized table with Friction, Evidence, Buyer concern, Fix, Effort, Risk.",
            "Audit this product page for trust objections: [paste product page copy]. Identify missing delivery clarity, returns reassurance, review proof, sizing/fit details, FAQs, and CTA friction.",
            "Review this cart and checkout flow from a mobile shopper perspective: [paste observations]. Identify surprise costs, unclear delivery timing, discount-code distraction, payment concerns, and confidence gaps.",
        ]),
        ("Email and copy prompts", [
            "Rewrite this abandoned-cart email sequence for [brand/product]. Create Email 1, 2, and 3 with subject line, preview text, body, CTA, timing, and the objection each email answers.",
            "Generate product-page FAQ copy for [product] using these approved facts: [facts]. Focus on delivery, returns, fit/use, compatibility, care, and buyer hesitation. Do not invent policy details.",
            "Create five trust-building microcopy options for the cart page using these approved policies: [policies]. Keep each under 14 words.",
        ]),
        ("Sales and delivery prompts", [
            "Write a cold email to a small Shopify brand after noticing this checkout issue: [issue]. Offer a fixed cart audit and one abandoned-cart email improvement.",
            "Create a Loom script for a Shopify cart audit pitch. Show one friction point, explain the buyer concern, suggest a fix, and invite a paid audit.",
            "Create a client handoff note for a completed Shopify audit. Include quick wins, medium-effort fixes, copy snippets, implementation order, and approval-sensitive claims.",
        ]),
    ],
    "asset-ugc-prompts": [
        ("How to use these prompts", [
            "Use approved product facts, reviews, and usage-rights requirements as inputs.",
            "Keep each creator brief specific enough to film without another brand call.",
            "Do not make health, income, beauty, or performance claims unless the brand supplies approved wording.",
        ]),
        ("Angle and hook prompts", [
            "Act as a UGC strategist. Analyse this product page and reviews: [paste]. Generate 12 content angles grouped by problem-aware, proof, demo, objection, comparison, and lifestyle. Include buyer stage and required proof shot.",
            "Generate 25 short-form hooks for [product] aimed at [audience]. Each hook must be under 10 words and tied to a specific buyer frustration or proof point.",
            "Turn these customer reviews into UGC concepts: [paste reviews]. Extract exact customer language, claim category, hook, shot idea, and approved-proof requirement.",
        ]),
        ("Brief creation prompts", [
            "Create a complete UGC creator brief for [product]. Include audience, primary message, do-not-say list, shot list, three video concepts, hook variants, CTA, usage rights, and approval notes.",
            "Create a shot list for a creator filming [product] at home. Include first 3 seconds, proof close-up, objection shot, context shot, and final CTA frame.",
            "Rewrite this vague brand brief into a creator-ready brief: [paste]. Make it specific, filmable, and claim-safe.",
        ]),
        ("Sales and delivery prompts", [
            "Write a pitch email to an ecommerce brand offering a product-specific creator brief service. Mention that better briefs reduce vague creator output and wasted revisions.",
            "Create a client intake form for a UGC brief generator. Include product facts, target buyer, proof, prohibited claims, usage rights, creator constraints, and examples they like.",
            "Create a final handoff message for a completed UGC brief pack with files delivered, approval-sensitive claims, creator instructions, and next testing recommendation.",
        ]),
    ],
    "asset-realtor-prompts": [
        ("How to use these prompts", [
            "Use public data carefully, cite sources, and date every data point.",
            "Separate factual market observations from agent opinion. Avoid investment advice and unsupported predictions.",
            "Have the agent or agency approve branded market commentary before publishing.",
        ]),
        ("Market snapshot prompts", [
            "Act as a real estate content analyst. Turn these source notes for [suburb]: [paste sources/data] into a one-page weekly snapshot with key movements, plain-English interpretation, seller talking points, buyer talking points, and source log.",
            "Summarise this suburb data without making predictions: [paste]. Identify what changed, what stayed flat, what sellers may care about, what buyers may ask, and what needs source verification.",
            "Create three agent-safe talking points from this market data: [paste]. Use cautious language, cite the source/date, and avoid investment advice.",
        ]),
        ("Content and nurture prompts", [
            "Create a weekly content pack for a real estate agent in [suburb]. Include LinkedIn post, Instagram caption, email intro, appraisal lead follow-up, and a short video script using this source-backed snapshot: [paste].",
            "Write an appraisal lead nurture email using this suburb snapshot: [paste]. Keep it helpful and local, not pushy.",
            "Create a principal-facing pitch for a weekly suburb snapshot retainer. Emphasise consistency, source discipline, and reuse across social/email/sales.",
        ]),
        ("Sales and delivery prompts", [
            "Write a cold email to a real estate agent who posts generic market updates. Offer a one-suburb sample snapshot and mention source-backed local content.",
            "Create a client intake checklist for a suburb snapshot service. Include target suburbs, agency tone, compliance process, data sources, posting cadence, and approval workflow.",
            "Create a handoff note for a completed suburb snapshot with source log, publishable captions, caveats, and next week's data needs.",
        ]),
    ],
    "asset-trades-prompts": [
        ("How to use these prompts", [
            "Do not let AI send messages directly. Drafts must remain human-approved.",
            "Route urgent safety issues to phone-first workflows and owner/admin escalation.",
            "Avoid final pricing unless the business has approved quote rules and sufficient job details.",
        ]),
        ("Inbox triage prompts", [
            "Act as an inbox triage assistant for a [trade type] business. Classify these inbound messages: [paste anonymised messages]. Use categories Emergency, Quote, Missing info, Follow-up, Complaint, Supplier/Admin, No-fit. Return category, missing details, urgency, draft reply, and human approval flag.",
            "Extract job details from this message: [paste]. Return suburb, job type, urgency, access notes, photos needed, safety concerns, preferred time, and missing questions to ask.",
            "Create routing rules for [trade type] inquiries. Include emergency triggers, quote requirements, complaint escalation, no-fit criteria, and owner approval rules.",
        ]),
        ("Reply prompts", [
            "Draft a missing-information reply for this [trade type] lead: [message]. Ask only for the details needed to triage the job. Keep it short and helpful.",
            "Draft an emergency-safe reply for this message: [message]. If safety risk exists, tell them to call [phone] immediately and avoid detailed troubleshooting.",
            "Create five follow-up messages for quote leads who stopped replying. Vary tone: practical, friendly, urgency-aware, closing-loop, and referral/no-fit.",
        ]),
        ("Sales and delivery prompts", [
            "Write a pitch email to a trades business owner offering an AI-assisted inbox triage setup with human approval. Focus on faster lead response and fewer missed details.",
            "Create an implementation checklist for a trades inbox triage workflow. Include inquiry categories, templates, approval roles, emergency routing, and weekly review.",
            "Create a weekly client report for inbox triage. Include lead volume, response gaps, urgent jobs, missing-info patterns, template improvements, and owner decisions needed.",
        ]),
    ],
    "asset-reviews-prompts": [
        ("How to use these prompts", [
            "Use exact review language for testimonial material. Never invent customer claims.",
            "Escalate legal, privacy, safety, medical, discrimination, refund, and staff-specific issues to the owner.",
            "Move disputes to private channels and avoid revealing customer details publicly.",
        ]),
        ("Review reply prompts", [
            "Act as a reputation-management assistant. Draft public replies to these reviews: [paste]. Keep each reply concise, specific where safe, and privacy-aware. Flag any review that requires owner escalation.",
            "Rewrite these review replies to sound warmer and less defensive: [paste]. Preserve facts, remove arguments, and move sensitive details to private follow-up.",
            "Create three tone options for replying to this positive review: [review]. Options: simple, warm, premium. Keep each under 55 words.",
        ]),
        ("Testimonial extraction prompts", [
            "Extract reusable testimonial claims from these reviews: [paste]. Return exact quote, claim category, proof context, risk notes, suitable asset type, and approval needed.",
            "Turn this approved review into social proof copy for square card, story card, website banner, email proof block, and sales page snippet. Preserve the original claim and avoid exaggeration.",
            "Create a monthly testimonial content plan from these approved reviews: [paste]. Include quote cards, captions, website snippets, and follow-up questions for the owner.",
        ]),
        ("Sales and delivery prompts", [
            "Write a pitch email to a local business offering review replies plus testimonial clips. Mention that reviews already contain trust signals but are rarely repackaged.",
            "Create a client intake checklist for a review reply and testimonial service. Include review platforms, reply tone, escalation rules, brand voice, approval process, and design constraints.",
            "Create a monthly handoff note summarising replies drafted, reviews escalated, testimonials extracted, assets created, and next content opportunities.",
        ]),
    ],
    "asset-manual-prompts": [
        ("How to use these prompts", [
            "Use prompts to clarify the manual service before building software.",
            "Track repeated manual steps, exceptions, buyer approvals, and delivery time.",
            "Do not automate unclear judgment, risky communication, or unproven demand first.",
        ]),
        ("Niche and offer prompts", [
            "Act as a B2B manual-workflow strategist. Evaluate this niche idea: [idea]. Score pain frequency, current cost, willingness to pay, manual deliverability, repeatability, and automation potential. Give a go/no-go recommendation.",
            "Turn this vague AI app idea into a manual concierge offer: [idea]. Define buyer, painful workflow, weekly outcome, inputs needed, delivery cadence, pricing pilot, and out-of-scope items.",
            "Generate 10 niche wedges for a manual workflow concierge based on these skills/resources: [skills]. For each, include buyer, painful recurring task, manual deliverable, first client source, and risk.",
        ]),
        ("Workflow delivery prompts", [
            "Create a manual SOP for delivering [weekly outcome] to [buyer]. Include intake, classification, draft/output creation, QA, approval, handoff, exception log, and time tracking.",
            "Analyse this delivery log: [paste]. Identify repeated steps, exceptions, approval delays, manual minutes, and one safe automation candidate.",
            "Create a weekly client report for a manual workflow concierge. Include work completed, exceptions, decisions needed, time saved estimate, and next process improvement.",
        ]),
        ("Sales and validation prompts", [
            "Write a cold email pitching a manual workflow concierge to [niche]. Emphasise the weekly outcome and low-risk pilot, not a future AI app.",
            "Create a discovery-call script for validating [workflow pain]. Include questions about frequency, current process, cost of delay, existing tools, approval risks, and willingness to pay.",
            "Create a post-pilot renewal proposal after four manual deliveries. Include proof from delivery logs, recurring scope, pricing, and one optional automation review.",
        ]),
    ],
    "asset-airbnb-prompts": [
        ("How to use these prompts", [
            "Use host-approved facts for access, parking, rules, emergency contacts, and local recommendations.",
            "Keep guest copy clear and hospitable. Do not make harsh rules the first impression.",
            "Check local recommendations and opening hours before delivery.",
        ]),
        ("Guest guide prompts", [
            "Act as a short-term-rental guest-experience editor. Review this listing, house rules, guest messages, and local notes: [paste]. Identify repeat-question friction and propose guide sections to reduce host messages.",
            "Turn these messy host notes into a polished guest guide. Inputs: [arrival, parking, Wi-Fi, appliances, bins, checkout, local picks]. Return guest-facing copy, host approval flags, and missing facts.",
            "Rewrite these house rules to be firm, clear, and hospitable: [paste]. Keep rules specific and avoid hostile wording.",
        ]),
        ("Local recommendation prompts", [
            "Create a local recommendations page for guests staying at [property/suburb]. Include breakfast, groceries, dinner, family option, rainy-day option, transport note, and 'check hours first' reminders.",
            "Generate three guest personas for this Airbnb: [listing]. For each, suggest the most useful local recommendations and guide sections.",
            "Create a check-in page that a first-time guest can follow without messaging the host. Include arrival order, photos-needed placeholders, parking, lockbox/keypad, Wi-Fi, and emergency note.",
        ]),
        ("Upsell and delivery prompts", [
            "Brainstorm host-safe upsells for this property: [listing details]. Score each by guest value, host effort, margin, operational risk, and approval needed.",
            "Create guest-facing copy for these approved optional upsells: [list]. Keep prices transparent, deadlines clear, and fulfilment instructions simple.",
            "Create a final handoff message for a refreshed guest guide. Include files delivered, facts needing host approval, local recommendations to recheck monthly, and optional upsell ideas.",
        ]),
    ],
}


def prompt_pack_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    return PROMPT_PACK_SECTIONS[asset.id] + [
        ("Prompt quality rules", [
            "Always paste real context before asking for output.",
            "Ask for tables when comparing options, prioritising issues, or creating delivery checklists.",
            "Ask the model to separate known facts, assumptions, risks, and owner approval items.",
            "Run a final QA prompt before sending client-facing material.",
            "Keep a reusable prompt log and improve prompts after each paid delivery.",
        ]),
        ("Final QA prompt", [
            "Review this client-facing output before I send it: [paste output]. Check for unsupported claims, invented facts, vague advice, missing approval flags, privacy risk, tone issues, and unclear next steps. Return a table of fixes and a polished final version.",
        ]),
    ]


PACK_DELIVERABLES: dict[str, str] = {
    "cafe-menu-refresh-package": "menu files, specials, QR/menu links, Google details, and final export formats",
    "google-business-profile-rescue": "Google profile details, services, photos, FAQs, review rules, and approval owners",
    "airbnb-photo-refresh-service": "listing URL, source photos, approved edit boundaries, model direction, usage rights, and host approvals",
    "drone-roof-photo-inspection": "property address, owner permission, roof areas to capture, access constraints, local flight requirements, intended use, and delivery format",
    "power-washing-driveway-sprint": "property address, surface photos, water access, drainage, surface condition, stain type, hazards, timing, and client approval boundaries",
    "gym-churn-report": "cancellation exports, member privacy rules, churn tags, membership types, and retention goals",
    "shopify-cart-audit": "store URLs, priority products, policies, email platform details, brand voice, and approved claims",
    "ugc-brief-generator": "product facts, customer proof, buyer objections, creator constraints, and usage rights",
    "realtor-suburb-snapshot": "target suburbs, source preferences, agency tone, compliance process, and publishing cadence",
    "ai-inbox-triage-trades": "inquiry channels, emergency rules, quote fields, approval roles, and current response templates",
    "review-testimonial-service": "review platforms, reply tone, escalation rules, testimonial permissions, and design approvals",
    "manual-workflow-concierge": "workflow pain, current process, required inputs, approval risks, exceptions, and success criteria",
    "airbnb-guest-guide-refresh": "listing details, check-in steps, house rules, guest questions, local recommendations, and host approvals",
}


def client_intake_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    return [
        ("How to use this form", [
            f"Send this form before starting the {pack.title.lower()} so the client provides {PACK_DELIVERABLES[pack.slug]}.",
            "Ask the client to answer unknown items with 'not sure' rather than guessing.",
            "Mark every fact, claim, price, date, policy, and link that needs approval before publishing or sending.",
            "Keep this completed form with the delivery file so future refreshes do not restart from zero.",
        ]),
        ("Client details", [
            "Business name: [business]",
            "Primary contact: [name, role, email, phone]",
            "Best approval channel: [email / Slack / SMS / call]",
            "Approval deadline: [date and time]",
            "Preferred tone: [plain / premium / friendly / direct / other]",
        ]),
        ("Project scope", [
            f"Selected offer: starter / standard / retainer for {pack.buyer.lower()}.",
            "Primary outcome wanted from this project: [client answer]",
            "Most urgent visible problem: [client answer]",
            "What should not change: [client answer]",
            "Known risks or sensitive claims: [client answer]",
        ]),
        ("Source material request", [
            "Current files, screenshots, exports, links, messages, reviews, product pages, listing copy, or data sources relevant to this pack.",
            "Brand assets: logo, colors, fonts, examples the client likes, and examples they dislike.",
            "Approved wording for policies, guarantees, hours, prices, locations, service areas, and claims.",
            "Any previous version of this asset or workflow, even if messy.",
            "Access requirements and restrictions: who can log in, who approves, and what must remain view-only.",
        ]),
        ("Pack-specific intake prompts", [
            f"What does a successful {pack.title.lower()} look like for your business 30 days from now?",
            f"What do your customers or leads currently misunderstand about this area?",
            f"Which parts of {PACK_DELIVERABLES[pack.slug]} are already decided and which need review?",
            "Who has final say on customer-facing facts, pricing, claims, public replies, or instructions?",
            "What would make this project feel too risky or annoying for your team?",
        ]),
        ("Approval checklist", [
            "Facts approved: names, prices, dates, opening hours, policies, addresses, service areas, product details, and links.",
            "Claims approved: proof, reviews, market commentary, testimonials, guarantees, and performance-sensitive language.",
            "Access approved: logins, screenshots, exports, customer data, or public profile changes.",
            "Delivery approved: editable file, final export, implementation notes, and next-step recommendation.",
            "Renewal trigger approved: monthly refresh, weekly report, next sprint, or one-off closeout.",
        ]),
        shared_standard_pointer(pack),
    ]


def client_email_template_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    return [
        ("How to use these emails", [
            "Replace every bracketed field with buyer-specific context before sending.",
            "Lead with one visible issue or operational pain, not a broad agency pitch.",
            "Keep the first email short enough to read on a phone.",
            "Use the delivery and approval emails after payment to reduce back-and-forth.",
        ]),
        ("Cold outreach email", [
            f"Subject: quick {pack.title.lower()} idea for [business]",
            f"Hi [Name], I noticed [specific issue]. For {pack.buyer.lower()}, that can create friction because [customer/lead impact].",
            f"I put together a fixed-scope {pack.title.lower()} that helps with {PACK_DELIVERABLES[pack.slug]}.",
            "Want me to send a quick sample or 3-point fix list so you can see what I mean?",
        ]),
        ("Value-first sample email", [
            "Subject: spotted one practical fix",
            "Hi [Name], I made a quick note on [specific visible issue]. The simplest fix is [one practical recommendation].",
            f"If useful, I can package the full {pack.title.lower()} as a small paid sprint with one approval round and a clean handoff.",
            "Should I send the short scope?",
        ]),
        ("Client intake request", [
            f"Thanks for confirming the {pack.title.lower()}. To start cleanly, please send the intake details for {PACK_DELIVERABLES[pack.slug]}.",
            "If anything is uncertain, mark it as 'needs approval' rather than guessing.",
            "Once I have the inputs, I will send the first version by [date/time] and flag any approval-sensitive items.",
        ]),
        ("Approval request", [
            "I have finished the first version. Please review the items marked [APPROVAL NEEDED] before anything is published, sent, or implemented.",
            "The main decisions are: [decision 1], [decision 2], [decision 3].",
            "Reply with approved / changes needed / hold, and I will prepare the final version.",
        ]),
        ("Final delivery email", [
            f"Here is the completed {pack.title.lower()} for [business]. I included the working file, final export, and short implementation notes.",
            "Summary of what changed: [plain-English summary].",
            "Recommended next step: [specific action].",
            "Renewal or follow-up trigger: [monthly refresh / weekly report / next sprint / retainer option].",
        ]),
        ("Follow-up sequence", [
            "Day 2: send one additional observation or sample improvement.",
            "Day 5: ask whether this is handled internally or still worth fixing.",
            "Day 10: offer a smaller paid starter version.",
            "Day 21: close the loop and offer a useful checklist or example.",
        ]),
        shared_standard_pointer(pack),
    ]


def client_faq_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    if pack.slug == "drone-roof-photo-inspection":
        return [
            ("How to use these FAQs", [
                "Use these answers on the sales page, proposal, booking form, and delivery email for the drone roof photo service.",
                "Keep the service positioned as visual photo documentation, not a structural, engineering, safety, building, insurance, or repair inspection.",
                "Adjust the local drone-rule wording to your jurisdiction before publishing.",
                "Add one real client objection after every few sales calls so the FAQ becomes more useful over time.",
            ]),
            ("Buyer FAQs", [
                "What do I receive? You receive a set of roof photos, a short orientation video when scoped, and a simple visual report showing labelled roof areas that were visible from the drone.",
                "Is this a building or structural inspection? No. This is visual photo documentation only. It does not certify roof condition, safety, waterproofing, code compliance, insurance coverage, or repair urgency.",
                "Who is this for? Homeowners, roofers, real estate agents, solar installers, property managers, and anyone who needs clear roof visibility without climbing a ladder.",
                "Do you need permission to fly? Yes. The property owner or authorised representative must approve the flight, and the operator must follow applicable local drone rules and airspace restrictions.",
                "Can you fly anywhere? No. Weather, wind, airspace, nearby people, power lines, privacy boundaries, access, and local regulations may limit or prevent a flight.",
                "How fast can this be delivered? Many simple jobs can be booked and delivered within the pack's 2-4 week first-sale window, but actual turnaround depends on weather, access, approvals, and local flight requirements.",
                "What do you need from me? Property address, owner permission, areas of concern, safe access notes, intended use, preferred delivery format, and any privacy or access restrictions.",
                "Can the report be used for insurance or repair decisions? It can help a qualified person see visible roof areas, but it should not replace a licensed inspection, insurer assessment, engineer report, or roofer diagnosis.",
                "What if the drone cannot see part of the roof? The report should mark any limitations clearly, such as tree cover, shadows, steep pitch, access boundaries, privacy limits, or unsafe flight conditions.",
                "Can this become recurring? Yes. Agents, roofers, solar installers, and property managers may need recurring pre-listing, post-storm, maintenance, or project documentation reports.",
            ]),
            ("Objection-handling notes", [
                "If the buyer asks whether you can confirm damage, restate that you provide visibility and documentation for review, not diagnosis.",
                "If the buyer is worried about privacy, explain your permission process, shot boundaries, and how you avoid neighbouring private areas where possible.",
                "If the buyer wants a sample, offer one free or discounted sample roof with labelled photos and a visual-only note.",
                "If the buyer asks why they should not just use a roofer, position this as a fast documentation layer that can help them decide whether a qualified roofer should review the roof.",
            ]),
            ("Website preview copy", [
                "Use this FAQ pack to explain the service clearly before a homeowner, agent, roofer, or solar installer books.",
                "It helps buyers understand permission, safety, turnaround, scope, and report limitations before paying.",
                "Pair it with the intake form, safety checklist, and report template so every paid job starts with clean expectations.",
            ]),
            shared_standard_pointer(pack),
        ]
    return [
        ("How to use these FAQs", [
            "Place these on the sales page, in a proposal, or below the checkout section for this pack.",
            "Keep answers concrete and scope-based; avoid broad promises.",
            "Adapt wording to the niche before publishing.",
            "Add one pack-specific objection from real sales conversations after every few calls.",
        ]),
        ("Buyer FAQs", [
            f"What do I receive? You receive a focused {pack.title.lower()} with the agreed working file, final export or handoff notes, and a short implementation checklist.",
            f"Who is this for? This is built for {pack.buyer.lower()} who want a practical service asset without hiring a full agency or building custom software.",
            f"How fast can this be delivered? The starter version is scoped to fit the pack's first-sale window of {pack.time_to_first_sale}, assuming inputs and approvals arrive on time.",
            "What do you need from me? Source files, current links or screenshots, brand preferences, policy/claim approvals, and one clear approval owner.",
            "Can you work without full access? Usually yes for the first audit, sample, or draft. Implementation may require access or owner-side publishing.",
            "What is not included? Printing, photography, ad spend, legal review, complex integrations, custom software, and guaranteed performance outcomes are outside the default scope.",
            "Do you guarantee results? No. This improves clarity, handoff quality, response speed, trust signals, or operational consistency; it does not guarantee revenue, rankings, bookings, retention, or ad performance.",
            "How do revisions work? The starter version includes one approval round. Extra rounds or new scope should be priced separately.",
            "Can this become recurring? Yes, if the client has a natural refresh cadence: weekly updates, monthly reports, ongoing replies, new products, changing offers, or repeated workflows.",
            "How do approvals work? Anything involving facts, prices, policies, claims, reviews, public replies, market commentary, or customer data must be approved before use.",
        ]),
        ("Objection-handling notes", [
            "If the buyer says they are too busy, reduce the required inputs and offer one clear review window.",
            "If the buyer asks for guaranteed outcomes, restate the operational benefit and avoid performance claims.",
            "If the buyer already has someone, position the pack as a narrow cleanup, sample, or sprint rather than a replacement.",
            "If the buyer worries about access, start with public information or a read-only sample before requesting logins.",
        ]),
        ("Website preview copy", [
            f"Use this FAQ pack to answer the common questions a {pack.buyer.lower()} buyer asks before paying.",
            "It helps customers understand scope, turnaround, approvals, and risk before they unlock the full pack.",
            "Pair it with the intake form and email templates so the buyer can move from browsing to starting.",
        ]),
        shared_standard_pointer(pack),
    ]


def automation_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    buyer = pack.buyer
    service = pack.title.lower()
    return [
        ("How to use these automations", [
            "Each automation below is a ready prompt you can paste into an AI agent (ChatGPT, Claude, or an agent platform) and run on a schedule.",
            "Give the agent only the inputs shown in [brackets], and keep a human approval step before anything is sent, published, or billed.",
            "Start with one automation, prove it for a week, then add the next so you learn to trust each output.",
            "Send each output to where you already work: inbox drafts, your CRM, or a shared job doc.",
        ]),
        ("Automation schedule", [
            "Daily lead triage: every weekday morning.",
            "Weekly prospect list: every Monday.",
            "Outreach drafting: twice a week.",
            "Follow-up sequencer: every weekday.",
            "Delivery QA: before every handoff.",
            "Weekly report and client update: every Friday.",
            "Proof and referral repurposing: after each completed job.",
        ]),
        ("Daily lead triage — runs every weekday morning", [
            f"You are an intake assistant for a {service} serving {buyer.lower()}. Here are the new enquiries from the last 24 hours: [paste messages]. "
            "For each one, return a row with: sender, channel, intent (new job / question / complaint / spam), urgency (high/medium/low), the single missing detail to ask for, and a one-line suggested reply. "
            "Do not send anything. Put any urgent or safety-related message at the top for immediate human review.",
        ]),
        ("Weekly prospect list — runs every Monday", [
            f"You are a local lead researcher for a {service}. Target buyer: {buyer}. "
            "Using [area / suburb / list source], produce 10 prospects who visibly have the problem this service solves. "
            "Return a table: name, location, the visible problem you would reference, the best first channel, and a one-line opener. Exclude anyone who looks high-risk, delicate, or out of scope.",
        ]),
        ("Outreach drafting prompt — runs twice a week", [
            f"You write first-contact outreach for a {service} aimed at {buyer.lower()}. Here is the prospect list: [paste rows]. "
            "For each prospect, draft a short, specific message that names the visible problem, offers the fixed-scope starter, and asks one easy yes/no question. "
            "Keep it under 90 words, with no hype and no guarantees. Return each draft labelled by prospect for human review before sending.",
        ]),
        ("Follow-up sequencer prompt — runs every weekday", [
            "You manage polite follow-ups. Here are prospects with no reply and the days since first contact: [paste]. "
            "For each, draft the next message based on the gap: day 2 adds one new observation or sample, day 5 asks if it is handled internally, day 10 offers a smaller paid starter, day 21 closes the loop. "
            "Group drafts by prospect, never chase more than four times, and hold anything that should get a personal human note.",
        ]),
        ("Delivery QA prompt — runs before every handoff", [
            f"You are a delivery reviewer for a {service}. Here is the draft deliverable: [paste]. "
            "Check it against this standard: every fact, price, date, and claim is verifiable; nothing promises guaranteed results; the buyer can act within 30 seconds; every bracketed placeholder is replaced. "
            "Return a pass/fix list with the exact lines to change, then return it to the human owner instead of sending.",
        ]),
        ("Weekly report and client update — runs every Friday", [
            f"You report on a {service}. Here is this week's activity: [prospects contacted, replies, jobs booked, jobs delivered, revenue, issues]. "
            "Produce two outputs: (1) an internal summary with the top three numbers and the one bottleneck to fix next week; (2) a short, friendly update for each active client stating what was done, what is next, and any approval needed. "
            "Keep every claim factual and flag anything that needs owner approval.",
        ]),
        ("Proof and referral repurposing — runs after each completed job", [
            f"You repurpose finished work for a {service}. Here are the job details and before/after notes: [paste]. "
            "Draft: one social caption with the result and a soft call to action, one short message asking the client for a referral or review, and one line to add this example to the outreach sample library. "
            "Do not invent results or show identifying details without approval.",
        ]),
        shared_standard_pointer(pack),
    ]


def docx_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    if asset.id.endswith("-automation"):
        return automation_sections(pack, asset)
    if asset.id in PROMPT_PACK_SECTIONS:
        # The AI Prompt Pack is the single home for the full shared standards.
        return prompt_pack_sections(pack, asset) + premium_handoff_sections(pack, asset)
    if asset.id.endswith("-intake"):
        return client_intake_sections(pack, asset)
    if asset.id.endswith("-email-templates"):
        return client_email_template_sections(pack, asset)
    if asset.id.endswith("-faqs"):
        return client_faq_sections(pack, asset)
    if asset.id in DOCX_ASSET_SECTIONS:
        return DOCX_ASSET_SECTIONS[asset.id] + asset_polish_sections(asset) + [shared_standard_pointer(pack)]
    if any(token in asset.title for token in ["Script", "Swipe", "Template", "Outline", "Pitch", "Pack"]):
        sections = script_sections(pack, asset)
    else:
        sections = core_sections(pack)
    if asset.id == "asset-ugc-brief":
        sections += [
            ("Creator brief fields", [
                "Product: [name, price, link, core proof point]",
                "Audience: [who buys, what they already believe, what stops them]",
                "Angle: [problem, transformation, objection, demo, comparison]",
                "Shots: product in hand, problem moment, close-up proof, result state, CTA frame",
                "Usage rights: define organic, paid, duration, territory, and edit rights.",
            ]),
            ("Brief quality checks", [
                "One primary message per video.",
                "Shots are specific enough to film without a brand call.",
                "The hook can be said in under four seconds.",
                "Claims are supportable by product proof, reviews, or customer behavior.",
            ]),
        ]
    if asset.id == "asset-manual-workflow":
        sections += [
            ("Manual workflow map", [
                "Input: what the customer sends and what format is acceptable.",
                "Decision rules: how requests are sorted, prioritized, and rejected.",
                "Delivery cadence: when outcomes are sent and what review window exists.",
                "Automation candidate: one repeated step that is boring, frequent, and low-risk.",
            ]),
            ("Validation milestones", [
                "3 paid customers: prove pain and delivery.",
                "10 repeated deliveries: prove process stability.",
                "30 days retained: prove recurring value.",
                "Only then: automate the smallest step that reduces delivery time.",
            ]),
        ]
    if asset.id == "asset-airbnb-outline":
        sections += [
            ("Guest guide structure", [
                "Arrival: address, parking, entry code, Wi-Fi, check-in photos.",
                "House rhythm: heating/cooling, bins, noise, appliances, checkout.",
                "Local picks: breakfast, groceries, family options, rainy-day activities.",
                "Emergency: host contact, urgent repairs, medical, transport.",
                "Upsells: keep optional, transparent, and genuinely useful.",
            ]),
        ]
    return sections + [shared_standard_pointer(pack)]


def pdf_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    if asset.id in PDF_ASSET_SECTIONS:
        return PDF_ASSET_SECTIONS[asset.id] + asset_polish_sections(asset) + [shared_standard_pointer(pack)]
    return checklist_sections(pack, asset) + asset_polish_sections(asset) + [shared_standard_pointer(pack)]


def p(text: str, style: str | None = None) -> str:
    style_attr = f' w:val="{style}"' if style else ""
    return (
        "<w:p>"
        + (f"<w:pPr><w:pStyle{style_attr}/></w:pPr>" if style else "")
        + f"<w:r><w:t xml:space=\"preserve\">{escape(text)}</w:t></w:r>"
        + "</w:p>"
    )


def tc(text: str, width: int, style: str = "TableCell", fill: str | None = None) -> str:
    fill_xml = f'<w:shd w:fill="{fill}"/>' if fill else ""
    return (
        f'<w:tc><w:tcPr><w:tcW w:w="{width}" w:type="dxa"/>{fill_xml}'
        f'<w:tcMar><w:top w:w="120" w:type="dxa"/><w:left w:w="150" w:type="dxa"/>'
        f'<w:bottom w:w="120" w:type="dxa"/><w:right w:w="150" w:type="dxa"/></w:tcMar>'
        f'<w:vAlign w:val="center"/></w:tcPr>{p(text, style)}</w:tc>'
    )


def table(rows: list[list[str]], widths: list[int], header: bool = True,
          label_col: bool = False, min_row_h: int | None = None) -> str:
    grid = "".join(f'<w:gridCol w:w="{width}"/>' for width in widths)
    out = [
        '<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblInd w:w="0" w:type="dxa"/>'
        '<w:tblBorders>'
        f'<w:top w:val="single" w:sz="6" w:color="{LINE}"/>'
        f'<w:left w:val="single" w:sz="6" w:color="{LINE}"/>'
        f'<w:bottom w:val="single" w:sz="6" w:color="{LINE}"/>'
        f'<w:right w:val="single" w:sz="6" w:color="{LINE}"/>'
        f'<w:insideH w:val="single" w:sz="4" w:color="{LINE}"/>'
        f'<w:insideV w:val="single" w:sz="4" w:color="{LINE}"/>'
        '</w:tblBorders><w:tblLook w:firstRow="1" w:noHBand="0" w:noVBand="1"/></w:tblPr>'
        f'<w:tblGrid>{grid}</w:tblGrid>'
    ]
    for r_idx, row in enumerate(rows):
        is_head = header and r_idx == 0
        data_index = (r_idx - 1) if header else r_idx
        cells = []
        for c_idx, value in enumerate(row):
            if is_head:
                style, fill = "TableHeader", BLACK
            elif label_col and c_idx == 0:
                style, fill = "TableLabel", PANEL
            else:
                style = "TableCell"
                fill = PANEL if data_index % 2 == 0 else None
            cells.append(tc(value, widths[c_idx], style, fill))
        tr_pr = f'<w:trPr><w:trHeight w:val="{min_row_h}" w:hRule="atLeast"/></w:trPr>' if (min_row_h and not is_head) else ""
        out.append(f'<w:tr>{tr_pr}{"".join(cells)}</w:tr>')
    out.append("</w:tbl>")
    return "".join(out)


def page_break() -> str:
    return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'


def bullet(text: str) -> str:
    return (
        '<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>'
        f'<w:r><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
    )


def checkbox(text: str) -> str:
    return (
        '<w:p><w:pPr><w:pStyle w:val="Checklist"/></w:pPr>'
        f'<w:r><w:t xml:space="preserve">[ ]  {escape(text)}</w:t></w:r></w:p>'
    )


def rule() -> str:
    return (
        '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="1" '
        f'w:color="{BLACK}"/></w:pBdr><w:spacing w:before="70" w:after="210"/></w:pPr></w:p>'
    )


def toc_field() -> str:
    # Auto-building table of contents from Heading 1 section titles. Word/Pages
    # populate on open or on field update; the placeholder shows until then.
    return (
        '<w:p><w:pPr><w:pStyle w:val="Kicker"/></w:pPr><w:r><w:t>IN THIS DOCUMENT</w:t></w:r></w:p>'
        '<w:p><w:pPr><w:rPr><w:color w:val="' + MUTED + '"/><w:sz w:val="18"/></w:rPr></w:pPr>'
        '<w:r><w:fldChar w:fldCharType="begin"/></w:r>'
        '<w:r><w:instrText xml:space="preserve"> TOC \\o "1-1" \\h \\z \\u </w:instrText></w:r>'
        '<w:r><w:fldChar w:fldCharType="separate"/></w:r>'
        '<w:r><w:rPr><w:color w:val="' + MUTED + '"/><w:sz w:val="18"/></w:rPr>'
        '<w:t xml:space="preserve">Right-click and choose Update Field to build the contents.</w:t></w:r>'
        '<w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>'
    )


def _smart_trim(text: str, limit: int) -> str:
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(" ,.;:-")
    return f"{cut or text[:limit]}…"


def static_contents(sections: list[tuple[str, list[str]]]) -> list[str]:
    rows = [["Section", "What it covers"]]
    for index, (heading, items) in enumerate(sections, start=1):
        preview = items[0] if items else "Reference section"
        rows.append([f"{index:02d}", f"{heading} — {_smart_trim(preview, 92)}"])
    return [
        p("In this document", "Kicker"),
        table(rows, [1180, 7940], header=True),
    ]


def render_section_item(section_heading: str, item: str) -> list[str]:
    if item.startswith("Subject:"):
        return [p(item, "EmailSubject")]
    if "faq" in section_heading.lower() and "? " in item:
        question, answer = item.split("? ", 1)
        return [p(f"{question}?", "Heading3"), p(answer)]
    if any(token in section_heading.lower() for token in ["email", "prompt", "script", "example", "copy", "reply"]):
        return [p(item, "ExampleBlock")]
    if len(item) > 180:
        return [p(item, "ExampleBlock")]
    return [bullet(item)]


_DEF_SKIP_TOKENS = ("email", "prompt", "script", "example", "copy", "reply", "swipe", "loom", "how to use", "preview")
_DEF_HEADER_MAP: list[tuple[tuple[str, ...], tuple[str, str]]] = [
    (("schedule",), ("Automation", "When to run")),
    (("follow-up", "sequence"), ("When", "What to send")),
    (("objection",), ("Objection", "How to respond")),
    (("snapshot",), ("Attribute", "Value")),
    (("milestone",), ("Milestone", "Gate before next step")),
    (("pricing", "scope", "guardrail"), ("Scope", "What it includes")),
    (("usage", "rights"), ("Right", "Detail")),
    (("prospect",), ("Prospect", "Why they fit")),
    (("variant",), ("Variant", "What to include")),
    (("step", "sop"), ("Step", "Action")),
    (("field",), ("Field", "Detail")),
    (("recommendation",), ("Recommendation", "Detail")),
]
_DEF_RE = re.compile(r"^([^:]{2,40}):\s+(\S.*)$")


def maybe_definition_table(heading: str, items: list[str]) -> tuple[list[str], list[list[str]]] | None:
    """Render-time conversion of `Label: value` definition lists into 2-col tables.

    Returns (headers, rows) when a section is predominantly label/value pairs, else
    None so the section keeps its bullet/callout rendering."""
    hl = heading.lower()
    if any(token in hl for token in _DEF_SKIP_TOKENS) or len(items) < 3:
        return None
    rows: list[list[str]] = []
    matched = 0
    for item in items:
        m = _DEF_RE.match(item)
        if m and "." not in m.group(1):
            rows.append([m.group(1).strip(), m.group(2).strip()])
            matched += 1
        else:
            rows.append(["", item])
    if matched / len(items) < 0.8:
        return None
    headers = ("Field", "Detail")
    for keys, hdr in _DEF_HEADER_MAP:
        if any(k in hl for k in keys):
            headers = hdr
            break
    return list(headers), rows


def make_docx(path: Path, pack: Pack, asset: Asset, sections: list[tuple[str, list[str]]]) -> None:
    quick_start = [
        "Replace bracketed fields.",
        "Verify facts and claims.",
        "Send for approval before publishing.",
    ]
    action_board = [
        ["Move", "What to check", "Output"],
        ["1. Scope", "Buyer, input files, sensitive claims, approval owner", "Clean project brief"],
        ["2. Build", "Use the template, prompts, checklist, or workbook sections", "Buyer-specific asset"],
        ["3. Approve", "Facts, prices, dates, links, policies, and public claims", "Approved final version"],
        ["4. Follow up", "Next refresh, retainer, or second sprint", "Clear paid next step"],
    ]
    snapshot_table = [
        ["Buyer", pack.buyer],
        ["Category", pack.category],
        ["Startup cost", pack.startup_cost],
        ["First sale", pack.time_to_first_sale],
        ["Difficulty", pack.difficulty],
    ]
    body = [
        p(BRAND.upper(), "BrandBand"),
        p(asset.title, "Title"),
        p(pack.title, "Heading2"),
        p(asset.description, "Lead"),
        p(pack.hook, "Tagline"),
        rule(),
        table(snapshot_table, [2200, 6980], header=False, label_col=True),
        p("Operator standard", "Kicker"),
        p("Use this as a working asset. Replace bracketed details with buyer-specific information, verify every sensitive fact, and keep approvals in writing.", "IntenseQuote"),
        p("Launch action board", "Kicker"),
        table(action_board, [1620, 3960, 3600], header=True),
        *static_contents(sections),
        p("Before sending", "Heading3"),
        *[checkbox(item) for item in quick_start],
    ]
    is_intake = asset.title.lower().endswith("intake form") or "intake" in asset.id
    intake_field_headings = {"client details", "project scope", "pack-specific intake prompts"}
    for index, (heading, items) in enumerate(sections, start=1):
        body.append(p(f"{index:02d} / {heading}", "Heading1"))
        heading_key = heading.lower()
        if is_intake and heading_key in intake_field_headings:
            rows = [["Field", "Your answer"]]
            for item in items:
                if ": " in item:
                    label = item.split(": ", 1)[0]
                elif "? " in item:
                    label = item.split("? ", 1)[0] + "?"
                else:
                    label = item
                rows.append([label, ""])
            body.append(table(rows, [4180, 5000], header=True, min_row_h=560))
            continue
        if is_intake and heading_key == "approval checklist":
            body.extend(checkbox(item) for item in items)
            continue
        definition_table = maybe_definition_table(heading, items)
        if definition_table is not None:
            headers, rows = definition_table
            body.append(table([headers, *rows], [3000, 6180], header=True, label_col=True))
            continue
        for item in items:
            body.extend(render_section_item(heading, item))
    body.append(p("Commercial use note", "Heading1"))
    body.append(p("These templates are practical launch materials. They do not guarantee revenue, rankings, retention, or advertising performance. Validate claims with buyer data and keep approvals in writing."))
    document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    {''.join(body)}
    <w:sectPr><w:footerReference w:type="default" r:id="rId3"/><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1180" w:right="1440" w:bottom="1000" w:left="1440" w:footer="432"/><w:cols w:space="720"/></w:sectPr>
  </w:body>
</w:document>"""
    styles_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="21"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:after="150" w:line="300" w:lineRule="auto"/><w:widowControl/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="BrandBand"><w:name w:val="BrandBand"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:caps/><w:sz w:val="15"/><w:color w:val="{BLACK}"/><w:spacing w:val="30"/></w:rPr><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="18" w:space="6" w:color="{BLACK}"/></w:pBdr><w:spacing w:before="0" w:after="240"/><w:jc w:val="left"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:rFonts w:ascii="{FONT_DISPLAY}" w:hAnsi="{FONT_DISPLAY}"/><w:b/><w:sz w:val="56"/><w:color w:val="{INK}"/><w:spacing w:val="-10"/></w:rPr><w:pPr><w:spacing w:before="60" w:after="60" w:line="300" w:lineRule="auto"/><w:keepNext/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:caps/><w:sz w:val="16"/><w:color w:val="{MUTED}"/></w:rPr><w:pPr><w:spacing w:after="120"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Tagline"><w:name w:val="Tagline"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="22"/><w:color w:val="{ACCENT}"/></w:rPr><w:pPr><w:spacing w:before="0" w:after="150" w:line="300" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Lead"><w:name w:val="Lead"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="24"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:before="80" w:after="60" w:line="340" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Kicker"><w:name w:val="Kicker"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:caps/><w:sz w:val="15"/><w:color w:val="{MUTED}"/><w:spacing w:val="24"/></w:rPr><w:pPr><w:spacing w:before="180" w:after="70"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:rFonts w:ascii="{FONT_DISPLAY}" w:hAnsi="{FONT_DISPLAY}"/><w:b/><w:sz w:val="30"/><w:color w:val="{INK}"/><w:spacing w:val="-6"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="360" w:after="140"/><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="7" w:color="{BLACK}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:sz w:val="24"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:spacing w:after="70"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:sz w:val="22"/><w:color w:val="{ACCENT}"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="190" w:after="70"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Meta"><w:name w:val="Meta"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:sz w:val="18"/><w:color w:val="{MUTED}"/></w:rPr><w:pPr><w:spacing w:after="95"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="20"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:after="110" w:line="292" w:lineRule="auto"/><w:ind w:left="540" w:hanging="220"/><w:widowControl/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Checklist"><w:name w:val="Checklist"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:sz w:val="20"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:spacing w:after="92" w:line="280" w:lineRule="auto"/><w:shd w:fill="{ACCENT_SOFT}"/><w:pBdr><w:left w:val="single" w:sz="18" w:space="8" w:color="{ACCENT}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="IntenseQuote"><w:name w:val="Intense Quote"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:color w:val="{INK}"/><w:sz w:val="21"/></w:rPr><w:pPr><w:spacing w:before="90" w:after="170" w:line="292" w:lineRule="auto"/><w:shd w:fill="{PANEL}"/><w:pBdr><w:left w:val="single" w:sz="24" w:space="10" w:color="{BLACK}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="ExampleBlock"><w:name w:val="Example Block"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="21"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:before="60" w:after="120" w:line="288" w:lineRule="auto"/><w:shd w:fill="{ACCENT_SOFT}"/><w:pBdr><w:left w:val="single" w:sz="14" w:space="8" w:color="{ACCENT}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="EmailSubject"><w:name w:val="Email Subject"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:sz w:val="21"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="150" w:after="0" w:line="284" w:lineRule="auto"/><w:shd w:fill="{ACCENT_SOFT}"/><w:pBdr><w:top w:val="single" w:sz="14" w:space="6" w:color="{ACCENT}"/><w:left w:val="single" w:sz="14" w:space="8" w:color="{ACCENT}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableHeader"><w:name w:val="Table Header"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:caps/><w:sz w:val="18"/><w:color w:val="FFFFFF"/><w:spacing w:val="14"/></w:rPr><w:pPr><w:spacing w:before="0" w:after="0" w:line="250" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableCell"><w:name w:val="Table Cell"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="20"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:before="0" w:after="0" w:line="262" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableLabel"><w:name w:val="Table Label"/><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:b/><w:sz w:val="20"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:spacing w:before="0" w:after="0" w:line="262" w:lineRule="auto"/></w:pPr></w:style>
</w:styles>"""
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/word/footer.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>"""
    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""
    doc_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer.xml"/>
</Relationships>"""
    numbering_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="1">
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/>
      <w:numFmt w:val="bullet"/>
      <w:lvlText w:val="–"/>
      <w:pPr><w:ind w:left="540" w:hanging="220"/></w:pPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>"""
    core_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/">
  <dc:title>{escape(asset.title)}</dc:title>
  <dc:creator>{escape(BRAND)}</dc:creator>
  <dc:subject>{escape(pack.title)}</dc:subject>
  <dc:description>{escape(asset.description)}</dc:description>
</cp:coreProperties>"""
    app_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Side Hustle Stephen Asset Generator</Application></Properties>"""
    footer_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="3" w:color="{LINE}"/></w:pBdr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="16"/><w:color w:val="{MUTED}"/></w:rPr><w:t xml:space="preserve">{escape(BRAND)} / {escape(pack.title)} / Page </w:t></w:r><w:r><w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}"/><w:sz w:val="16"/><w:color w:val="{MUTED}"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>
</w:ftr>"""
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", rels)
        z.writestr("word/document.xml", document_xml)
        z.writestr("word/styles.xml", styles_xml)
        z.writestr("word/numbering.xml", numbering_xml)
        z.writestr("word/footer.xml", footer_xml)
        z.writestr("word/_rels/document.xml.rels", doc_rels)
        z.writestr("docProps/core.xml", core_xml)
        z.writestr("docProps/app.xml", app_xml)


_PDF_UNICODE = {
    "‘": "'", "’": "'", "“": '"', "”": '"',
    "–": "-", "—": "-", "−": "-", "…": "...",
    " ": " ", "•": "-", "☐": "[ ]", "☑": "[x]",
}


def pdf_sanitize(text: str) -> str:
    """Fold curly punctuation / dashes / bullets to ASCII so the latin-1 PDF
    stream never emits a stray '?' replacement character."""
    for src, dst in _PDF_UNICODE.items():
        text = text.replace(src, dst)
    return text


def pdf_escape(text: str) -> str:
    text = pdf_sanitize(text)
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def pdf_text(x: int, y: int, size: int, text: str) -> str:
    return f"BT /F1 {size} Tf {x} {y} Td ({pdf_escape(text)}) Tj ET"


def pdf_text_bold(x: int, y: int, size: int, text: str) -> str:
    return f"BT /F2 {size} Tf {x} {y} Td ({pdf_escape(text)}) Tj ET"


def pdf_box(x: int, y: int, w: int, h: int) -> str:
    return f"{x} {y} {w} {h} re S"


def pdf_fill(x: int, y: int, w: int, h: int, rgb: tuple[float, float, float]) -> str:
    r, g, b = rgb
    return f"{r:.3f} {g:.3f} {b:.3f} rg\n{x} {y} {w} {h} re f"


def pdf_stroke_line(x1: int, y1: int, x2: int, y2: int, rgb: tuple[float, float, float] = (0.84, 0.87, 0.9)) -> str:
    r, g, b = rgb
    return f"{r:.3f} {g:.3f} {b:.3f} RG\n{x1} {y1} m {x2} {y2} l S"


def pdf_flow_notes(start_y: int, notes: list[str], x: int = 72, size: int = 10, width: int = 92, leading: int = 13) -> list[str]:
    """Emit one or more wrapped note lines flowing downward, so long strings on
    the worksheet pages never run off the right edge of the page."""
    out: list[str] = []
    y = start_y
    for note in notes:
        for line in wrap(note, width):
            out.append(pdf_text(x, y, size, line))
            y -= leading
        y -= 4
    return out


def pdf_grid(headers: list[str], rows: list[list[str]], widths: list[int],
             x0: int = 72, y0: int = 648, row_h: int = 30,
             header_size: int = 9, body_size: int = 9) -> list[str]:
    """Draw a styled table: panel header band with blue caps text, zebra body rows,
    hairline borders, wrapped cell text. Returns PDF content ops."""
    ops: list[str] = [f"{_LINE[0]:.3f} {_LINE[1]:.3f} {_LINE[2]:.3f} RG"]
    total_w = sum(widths)
    ops.append(pdf_fill(x0, y0, total_w, row_h, _PANEL))
    x = x0
    for label, w in zip(headers, widths):
        ops.append(pdf_box(x, y0, w, row_h))
        ops.append(f"{_BLUE[0]:.3f} {_BLUE[1]:.3f} {_BLUE[2]:.3f} rg")
        ops.append(pdf_text_bold(x + 8, y0 + row_h - 13, header_size, label))
        x += w
    for r, row in enumerate(rows, start=1):
        y = y0 - row_h * r
        if r % 2 == 0:
            ops.append(pdf_fill(x0, y, total_w, row_h, _PANEL))
        ops.append(f"{_LINE[0]:.3f} {_LINE[1]:.3f} {_LINE[2]:.3f} RG")
        x = x0
        for val, w in zip(row, widths):
            ops.append(pdf_box(x, y, w, row_h))
            ops.append("0.039 0.039 0.039 rg")
            for i, line in enumerate(wrap(str(val), max(6, int(w / 5.4)))[:2]):
                ops.append(pdf_text(x + 8, y + row_h - 13 - i * 11, body_size, line))
            x += w
    return ops


def pdf_arrow(x1: int, y1: int, x2: int, y2: int, rgb: tuple[float, float, float] = (0.341, 0.325, 0.306)) -> str:
    r, g, b = rgb
    ang = math.atan2(y2 - y1, x2 - x1)
    head = 6.0
    lx, ly = x2 - head * math.cos(ang - 0.5), y2 - head * math.sin(ang - 0.5)
    rx, ry = x2 - head * math.cos(ang + 0.5), y2 - head * math.sin(ang + 0.5)
    return (
        f"{r:.3f} {g:.3f} {b:.3f} RG\n{x1} {y1} m {x2} {y2} l S\n"
        f"{x2} {y2} m {lx:.1f} {ly:.1f} l S\n{x2} {y2} m {rx:.1f} {ry:.1f} l S"
    )


def special_pdf_pages(asset: Asset) -> list[bytes]:
    ops: list[str] = []
    if asset.id == "asset-trades-map":
        ops += [pdf_text(72, 744, 22, "Inbox Workflow Map"), pdf_text(72, 720, 10, "Route every inbound message through this approval-first flow.")]
        boxes = [
            (72, 620, 120, 48, "Inbound message"),
            (232, 620, 120, 48, "Classify type"),
            (392, 620, 120, 48, "Missing details?"),
            (72, 520, 120, 48, "Emergency"),
            (232, 520, 120, 48, "Quote request"),
            (392, 520, 120, 48, "Complaint/admin"),
            (72, 420, 120, 48, "Phone-first"),
            (232, 420, 120, 48, "Draft reply"),
            (392, 420, 120, 48, "Human approval"),
        ]
        for x, y, w, h, label in boxes:
            ops += [pdf_box(x, y, w, h), pdf_text(x + 12, y + 26, 10, label)]
        ops += [
            pdf_arrow(192, 644, 230, 644),
            pdf_arrow(352, 644, 390, 644),
            pdf_arrow(132, 620, 132, 570),
            pdf_arrow(292, 620, 292, 570),
            pdf_arrow(452, 620, 452, 570),
            pdf_arrow(132, 520, 132, 470),
            pdf_arrow(292, 520, 292, 470),
            pdf_arrow(452, 520, 452, 470),
            pdf_arrow(392, 634, 356, 634),
        ]
        ops += [f"{_MUTED[0]:.3f} {_MUTED[1]:.3f} {_MUTED[2]:.3f} rg", pdf_text(358, 626, 7, "need info: reclassify")]
        ops += pdf_flow_notes(360, ["Rule: AI may draft, but urgent/safety issues and all outbound messages require human approval."])
    elif asset.id == "asset-manual-score":
        ops += [pdf_text(72, 744, 22, "Manual Validation Scorecard"), pdf_text(72, 720, 10, "Score each criterion from 1 to 5. Add them for a total out of 25.")]
        ops += pdf_grid(["Criterion", "Score (1-5)"], [
            ["Pain frequency", ""],
            ["Current cost of the pain", ""],
            ["Manual deliverability", ""],
            ["Willingness-to-pay evidence", ""],
            ["Repeatability", ""],
            ["Total score (out of 25)", ""],
        ], [330, 150], x0=72, y0=648, row_h=32)
        ops += [f"{_INK[0]:.3f} {_INK[1]:.3f} {_INK[2]:.3f} rg", pdf_text_bold(72, 430, 11, "Decision guide")]
        ops += pdf_grid(["Total score", "Decision"], [
            ["Below 18 / 25", "Keep manual, or stop - demand is not proven yet"],
            ["18 - 21 / 25", "Keep selling manually and improve the delivery SOP"],
            ["22+ / 25", "After 3 paid deliveries, automate one low-risk step"],
        ], [120, 360], x0=72, y0=408, row_h=30)
    elif asset.id == "asset-reviews-cards":
        ops += [pdf_text(72, 744, 22, "Testimonial Card Layout Specs"), pdf_text(72, 720, 10, "Use exact review language. One claim per card.")]
        specs = [
            (72, 500, 160, 160, "Square 1080x1080"),
            (272, 420, 120, 220, "Story 1080x1920"),
            (72, 330, 420, 110, "Website banner 1600x600"),
        ]
        for x, y, w, h, label in specs:
            ops += [pdf_box(x, y, w, h), pdf_text(x + 10, y + h - 22, 10, label), pdf_text(x + 10, y + 20, 8, "Quote + source context + logo")]
        ops += pdf_grid(["Format", "Pixel size", "Safe margin", "Max quote words"], [
            ["Square", "1080 x 1080", "90 px", "26 words"],
            ["Story", "1080 x 1920", "90 px", "34 words"],
            ["Website banner", "1600 x 600", "90 px", "22 words"],
        ], [140, 120, 110, 140], x0=72, y0=300, row_h=30)
    elif asset.id == "asset-airbnb-upsell":
        ops += [pdf_text(72, 744, 22, "Host Upsell Matrix"), pdf_text(72, 720, 10, "Choose optional add-ons that are easy to fulfill and transparent for guests.")]
        ops += pdf_grid(["Offer", "Guest trigger", "Effort", "Margin", "Approved?"], [
            ["Breakfast basket", "Late arrival / first morning", "Low", "$", ""],
            ["Late checkout", "Evening flight / weekend stay", "Low", "$$", ""],
            ["Local itinerary", "Family / couple / work trip", "Medium", "$$", ""],
            ["Celebration setup", "Birthday / anniversary", "Medium", "$$", ""],
            ["Pantry restock", "Long stay / remote worker", "Medium", "$", ""],
        ], [130, 170, 70, 70, 80], x0=72, y0=650, row_h=34)
        ops += pdf_flow_notes(420, [
            "Rules: disclose price before purchase, confirm host fulfillment capacity, and avoid promises outside platform policy.",
            "Default message: I can arrange [offer] for [$] if you would like it ready by [time].",
        ])
    elif asset.id == "asset-ugc-hooks":
        ops += [pdf_text(72, 744, 22, "Hook Bank"), pdf_text(72, 720, 10, "Pick one hook angle per video, then match it to the audience temperature.")]
        ops += pdf_grid(["Hook type", "Pattern", "Best for"], [
            ["Problem-aware", "Name the exact frustration the buyer already feels", "Cold audiences"],
            ["Before / after", "Show the product state change in one sentence", "Visual products"],
            ["Myth", "Challenge a lazy assumption in the category", "Educating buyers"],
            ["Proof", "Lead with a result, review phrase, or repeat behaviour", "Strong reviews"],
            ["Demo", "Show the product in use before explaining anything", "Obvious-use products"],
        ], [130, 250, 110], x0=72, y0=648, row_h=42)
    elif asset.id in {"asset-cafe-checklist", "asset-gbp-audit", "asset-shopify-audit", "asset-gym-call"}:
        ops += [pdf_text(72, 744, 22, asset.title), pdf_text(72, 720, 10, "Working checklist page. Mark each item before client handoff.")]
        y = 660
        labels = [
            "Inputs confirmed", "Evidence captured", "Claims checked", "Owner approval", "Final export reviewed", "Next step sent",
        ]
        for label in labels:
            ops += [pdf_box(72, y, 14, 14), pdf_text(96, y + 3, 11, label)]
            y -= 36
    else:
        ops += [pdf_text(72, 744, 22, asset.title), pdf_text(72, 720, 10, "Client worksheet: use this page while turning the asset into a buyer-ready deliverable.")]
        ops += pdf_grid(["Area", "Decision", "Owner", "Done?"], [
            ["Buyer context", "Specific business, segment, and visible pain", "You", ""],
            ["Source proof", "Screenshots, URLs, reviews, data, or examples saved", "You", ""],
            ["Approval risk", "Claims, prices, hours, legal-sensitive facts checked", "Client", ""],
            ["Delivery", "Working file, final export, and next step included", "You", ""],
            ["Follow-up", "Renewal angle or paid next step identified", "You", ""],
        ], [150, 210, 80, 80], x0=72, y0=650, row_h=34)
        ops += pdf_flow_notes(420, [
            "Rule: if a buyer could misunderstand the recommendation, rewrite it as a clear operational next step.",
            "Handoff: summarize what changed, what needs approval, and what you recommend doing next.",
        ])
    ops.append(pdf_text(72, 32, 8, f"{BRAND}  /  Visual worksheet"))
    return ["\n".join(ops).encode("latin-1", "replace")]


_BLACK = (0.039, 0.039, 0.039)
_BLUE = (0.039, 0.349, 0.824)
_BG = (0.992, 0.988, 0.988)
_PANEL = (0.961, 0.953, 0.945)
_LINE = (0.878, 0.875, 0.867)
_MUTED = (0.341, 0.325, 0.306)
_INK = (0.039, 0.039, 0.039)


def pdf_cover_page(pack: Pack, asset: Asset) -> bytes:
    ops = [
        pdf_fill(0, 0, 612, 792, _BG),
        # ElevenLabs-style full-bleed black header band
        pdf_fill(0, 720, 612, 72, _BLACK),
        # restrained blue accent block, top-right
        pdf_fill(516, 736, 40, 40, _BLUE),
        "1 1 1 rg",
        pdf_text_bold(54, 752, 11, BRAND.upper()),
        "0.78 0.80 0.82 rg",
        pdf_text(54, 734, 9, "MEMBER ASSET"),
    ]
    # Title block
    ops += [f"{_INK[0]:.3f} {_INK[1]:.3f} {_INK[2]:.3f} rg"]
    title_y = 636
    for line in wrap(asset.title, 30):
        ops.append(pdf_text_bold(54, title_y, 30, line))
        title_y -= 34
    ops += [
        f"{_MUTED[0]:.3f} {_MUTED[1]:.3f} {_MUTED[2]:.3f} rg",
        pdf_text_bold(54, title_y - 2, 13, pack.title),
    ]
    # thin rule under the title
    ops.append(pdf_stroke_line(54, title_y - 18, 558, title_y - 18, _LINE))
    desc_y = title_y - 44
    ops.append(f"{_INK[0]:.3f} {_INK[1]:.3f} {_INK[2]:.3f} rg")
    for line in wrap(asset.description, 78):
        ops.append(pdf_text(54, desc_y, 11, line))
        desc_y -= 15
    # Snapshot chips (warm panels, full buyer text, no truncation)
    chip_y = 392
    chips = [("BUYER", pack.buyer), ("CATEGORY", pack.category), ("FIRST SALE", pack.time_to_first_sale), ("DIFFICULTY", pack.difficulty)]
    cx = 54
    cw = 123
    for label, value in chips:
        ops.append(pdf_fill(cx, chip_y, cw - 9, 58, _PANEL))
        ops.append(pdf_fill(cx, chip_y, 3, 58, _BLACK))
        ops.append(f"{_MUTED[0]:.3f} {_MUTED[1]:.3f} {_MUTED[2]:.3f} rg")
        ops.append(pdf_text_bold(cx + 12, chip_y + 40, 8, label))
        ops.append(f"{_INK[0]:.3f} {_INK[1]:.3f} {_INK[2]:.3f} rg")
        for i, line in enumerate(wrap(value, 16)):
            ops.append(pdf_text(cx + 12, chip_y + 22 - i * 12, 9, line))
        cx += cw
    # Before-sending note on a warm panel
    ops.append(pdf_fill(54, 96, 504, 86, _PANEL))
    ops.append(pdf_fill(54, 96, 3, 86, _BLUE))
    ops.append(f"{_INK[0]:.3f} {_INK[1]:.3f} {_INK[2]:.3f} rg")
    ops.append(pdf_text_bold(70, 158, 9, "BEFORE SENDING"))
    note_y = 140
    for line in wrap("Replace placeholders, verify facts, keep approvals in writing, and avoid guaranteed revenue, ranking, retention, booking, or ad-performance claims.", 80):
        ops.append(pdf_text(70, note_y, 10, line))
        note_y -= 14
    ops.append(f"{_MUTED[0]:.3f} {_MUTED[1]:.3f} {_MUTED[2]:.3f} rg")
    ops.append(pdf_text(54, 40, 8, f"{BRAND}  /  Cover"))
    return "\n".join(ops).encode("latin-1", "replace")


def wrap(text: str, width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if len(test) > width and current:
            lines.append(current)
            current = word
        else:
            current = test
    if current:
        lines.append(current)
    return lines


def _pdf_line_step(text: str, size: int, bold: bool) -> int:
    if text == "":
        return 14
    return max(14, size + 5) + (6 if (bold and size >= 15) else 0)


def make_pdf(path: Path, pack: Pack, asset: Asset, sections: list[tuple[str, list[str]]]) -> None:
    # Prepend a visible contents list so long PDFs have navigation (E4).
    contents = ("Inside this document", [f"{i:02d}  {heading}" for i, (heading, _items) in enumerate(sections, start=1)])
    sections = [contents, *sections]

    lines: list[tuple[str, int, bool]] = [(BRAND, 10, False), (asset.title, 22, True), (pack.title, 13, False), (asset.description, 11, False), ("", 11, False)]
    for heading, items in sections:
        lines.append((heading, 15, True))
        for item in items:
            prefix = "- "
            for idx, line in enumerate(wrap(item, 82)):
                lines.append(((prefix if idx == 0 else "  ") + line, 10, False))
        lines.append(("", 10, False))
    pages: list[list[tuple[str, int, bool]]] = []
    current: list[tuple[str, int, bool]] = []
    y = 760
    for line in lines:
        step = _pdf_line_step(*line)
        if y - step < 54:
            pages.append(current)
            current = []
            y = 760
        current.append(line)
        y -= step
    if current:
        pages.append(current)

    content_streams = [pdf_cover_page(pack, asset), *special_pdf_pages(asset)]
    objects: list[bytes] = []
    page_ids = []
    font_id = 3
    bold_font_id = 4
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    objects.append(b"")
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    total_pages = len(content_streams) + len(pages)
    for page_index, page in enumerate(pages, start=1 + len(content_streams)):
        content_ops = [
            pdf_fill(0, 0, 612, 792, _BG),
            pdf_fill(0, 760, 612, 32, _BLACK),
            "1 1 1 rg",
            pdf_text_bold(54, 774, 8, BRAND.upper()),
            f"{_MUTED[0]:.3f} {_MUTED[1]:.3f} {_MUTED[2]:.3f} rg",
            pdf_text(430, 774, 8, f"PAGE {page_index} OF {total_pages}"),
        ]
        cursor_y = 718
        for text, size, bold in page:
            if text == "":
                cursor_y -= 11
                continue
            font = "F2" if bold else "F1"
            is_heading = bold and size >= 15
            is_bullet = text.startswith("- ")
            is_cont = text.startswith("  ") and not is_bullet
            if is_heading:
                content_ops.append(pdf_fill(54, cursor_y - 10, 504, 28, _PANEL))
                content_ops.append(pdf_fill(54, cursor_y - 10, 4, 28, _BLUE))
                content_ops.append(pdf_stroke_line(54, cursor_y - 14, 558, cursor_y - 14, _LINE))
            elif is_bullet:
                content_ops.append(pdf_fill(72, cursor_y - 4, 6, 6, _BLUE))
            heading_color = f"{_BLUE[0]} {_BLUE[1]} {_BLUE[2]} rg"
            content_ops.append(heading_color if is_heading else "0.039 0.039 0.039 rg")
            text_x = 88 if (is_bullet or is_cont) else 72
            rendered_text = text[2:] if (is_bullet or is_cont) else text
            content_ops.append(f"BT /{font} {size} Tf {text_x} {cursor_y} Td ({pdf_escape(rendered_text)}) Tj ET")
            cursor_y -= max(14, size + 6)
            if is_heading:
                cursor_y -= 8
        content_ops.append(f"{_MUTED[0]:.3f} {_MUTED[1]:.3f} {_MUTED[2]:.3f} rg")
        content_ops.append(pdf_stroke_line(72, 44, 540, 44, _LINE))
        content_ops.append(f"BT /F1 8 Tf 72 28 Td ({pdf_escape(BRAND)}  /  {pdf_escape(asset.title)}  /  Page {page_index} of {total_pages}) Tj ET")
        content_streams.append("\n".join(content_ops).encode("latin-1", "replace"))
    for content in content_streams:
        content_id = len(objects) + 1
        objects.append(b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream")
        page_id = len(objects) + 1
        page_ids.append(page_id)
        objects.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 {font_id} 0 R /F2 {bold_font_id} 0 R >> >> /Contents {content_id} 0 R >>".encode())
    kids = " ".join(f"{pid} 0 R" for pid in page_ids)
    objects[1] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>".encode()
    out = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(out))
        out.extend(f"{i} 0 obj\n".encode())
        out.extend(obj)
        out.extend(b"\nendobj\n")
    xref = len(out)
    out.extend(f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n".encode())
    for offset in offsets[1:]:
        out.extend(f"{offset:010d} 00000 n \n".encode())
    out.extend(f"trailer << /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode())
    path.write_bytes(out)


def col_letter(index: int) -> str:
    letters = ""
    while index:
        index, rem = divmod(index - 1, 26)
        letters = chr(65 + rem) + letters
    return letters


# Cell style ids (must match the cellXfs order in the XLSX styles part below):
#   0 body text   1 header   2 panel text   3 currency$   4 number   5 percent
_CUR_KW = ("price", "fee", "cost", "revenue", "retainer", "rent", "quote", "deposit", "at risk", "budget", "spend")
_PCT_KW = ("rate", "clearance", "percent", "weight", "margin %")
_PCT_RE = re.compile(r"^\s*-?\d+(?:\.\d+)?\s*%\s*$")


def _cell_format(header: str, rowlabel: str, value: Any) -> str:
    """Return 'cur' | 'pct' | 'num' | 'text' for a data cell, using both the
    column header and the row's first-column label (sheets are mixed-orientation)."""
    text = f"{header} {rowlabel}".lower()
    if isinstance(value, str) and _PCT_RE.match(value):
        return "pct"
    is_formula = isinstance(value, str) and value.startswith("=")
    numeric = isinstance(value, (int, float)) or is_formula
    if not numeric:
        return "text"
    if any(k in text for k in _PCT_KW):
        return "pct"
    if any(k in text for k in _CUR_KW):
        return "cur"
    return "num"


_ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _excel_serial(value: str) -> int:
    y, m, d = (int(part) for part in value.split("-"))
    return (date(y, m, d) - date(1899, 12, 30)).days


def cell_xml(row: int, col: int, value: Any, header: str = "", rowlabel: str = "") -> str:
    ref = f"{col_letter(col)}{row}"
    if row == 1:
        return f'<c r="{ref}" t="inlineStr" s="1"><is><t>{escape(str(value))}</t></is></c>'
    # Real Excel dates (sortable/filterable) instead of text strings.
    if isinstance(value, str) and _ISO_DATE_RE.match(value):
        return f'<c r="{ref}" s="{"11" if row % 2 == 0 else "10"}"><v>{_excel_serial(value)}</v></c>'
    fmt = _cell_format(header, rowlabel, value)
    # Zebra banding: even data rows render on white (no fill), odd on panel.
    white = row % 2 == 0
    text_s = "6" if white else "2"
    pct_s = "9" if white else "5"
    fmt_s = {"cur": "7" if white else "3", "num": "8" if white else "4", "pct": pct_s}.get(fmt, text_s)
    if isinstance(value, str) and value.startswith("="):
        return f'<c r="{ref}" s="{fmt_s}"><f>{escape(value[1:])}</f></c>'
    if fmt == "pct" and isinstance(value, str) and _PCT_RE.match(value):
        num = float(value.strip().rstrip("%")) / 100
        return f'<c r="{ref}" s="{pct_s}"><v>{num}</v></c>'
    if isinstance(value, (int, float)):
        return f'<c r="{ref}" s="{fmt_s}"><v>{value}</v></c>'
    return f'<c r="{ref}" t="inlineStr" s="{text_s}"><is><t>{escape(str(value))}</t></is></c>'


def sheet_xml(rows: list[list[Any]], sheet_name: str = "") -> str:
    headers_row = [str(v) for v in rows[0]] if rows else []
    row_xml = []
    for r_idx, row in enumerate(rows, start=1):
        rowlabel = str(row[0]) if row else ""
        cells = "".join(
            cell_xml(r_idx, c_idx, value,
                     header=headers_row[c_idx - 1] if c_idx - 1 < len(headers_row) else "",
                     rowlabel=rowlabel)
            for c_idx, value in enumerate(row, start=1)
        )
        height = 26 if r_idx == 1 else 42
        row_xml.append(f'<row r="{r_idx}" ht="{height}" customHeight="1">{cells}</row>')
    max_cols = max((len(row) for row in rows), default=1)
    max_rows = max(len(rows), 1)
    # Only put a filter on real record tables, not vertical key/value sheets.
    is_record_table = max_cols >= 3 and max_rows >= 5
    filter_ref = f"A1:{col_letter(max_cols)}{max_rows}"
    # Per-sheet column widths derived from content length (clamped), not one profile.
    col_widths = []
    for c in range(max_cols):
        longest = max((len(str(row[c])) for row in rows if c < len(row)), default=10)
        col_widths.append(min(58, max(12, longest + 3)))
    cols_xml = "".join(
        f'<col min="{i + 1}" max="{i + 1}" width="{w}" customWidth="1"/>'
        for i, w in enumerate(col_widths)
    )
    validations = ""
    headers = [str(value).lower() for value in rows[0]] if rows else []
    validation_nodes = []
    conditional_nodes = []
    for idx, header in enumerate(headers, start=1):
        if header in {"status", "required?", "saved?"}:
            col = col_letter(idx)
            validation_nodes.append(
                f'<dataValidation type="list" allowBlank="1" sqref="{col}2:{col}200"><formula1>"Open,In progress,Done,Yes,No,Approved"</formula1></dataValidation>'
            )
            conditional_nodes.append(
                f'<conditionalFormatting sqref="{col}2:{col}200">'
                f'<cfRule type="containsText" operator="containsText" text="Done" dxfId="0" priority="{idx * 3 - 2}"><formula>NOT(ISERROR(SEARCH("Done",{col}2)))</formula></cfRule>'
                f'<cfRule type="containsText" operator="containsText" text="Approved" dxfId="0" priority="{idx * 3 - 1}"><formula>NOT(ISERROR(SEARCH("Approved",{col}2)))</formula></cfRule>'
                f'<cfRule type="containsText" operator="containsText" text="Open" dxfId="1" priority="{idx * 3}"><formula>NOT(ISERROR(SEARCH("Open",{col}2)))</formula></cfRule>'
                f'</conditionalFormatting>'
            )
    if validation_nodes:
        validations = f'<dataValidations count="{len(validation_nodes)}">{"".join(validation_nodes)}</dataValidations>'
    sheet_note = f"Side Hustle Stephen - {sheet_name}" if sheet_name else "Side Hustle Stephen"
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetPr><tabColor rgb="FF{BLACK}"/></sheetPr>
  <sheetFormatPr defaultRowHeight="30"/>
  <cols>{cols_xml}</cols>
  <sheetViews><sheetView workbookViewId="0" showGridLines="0" zoomScale="85" zoomScaleNormal="85"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetData>{''.join(row_xml)}</sheetData>
  {f'<autoFilter ref="{filter_ref}"/>' if is_record_table else ''}
  {''.join(conditional_nodes)}
  {validations}
  <pageMargins left="0.45" right="0.45" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>
  <pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/>
  <headerFooter><oddHeader>&amp;L{escape(sheet_note)}&amp;R&amp;D</oddHeader><oddFooter>&amp;LVerify facts before client use&amp;RPage &amp;P of &amp;N</oddFooter></headerFooter>
</worksheet>"""


def workbook_for(asset_id: str) -> dict[str, list[list[Any]]]:
    if asset_id == "asset-cafe-pricing":
        return {
            "Instructions": [
                ["Step", "What to do"],
                [1, "Update the Pricing Ladder with your local market prices and delivery scope."],
                [2, "Use Quote Builder for one-off jobs; only edit the input values in column B."],
                [3, "Use Retainer Tracker monthly to monitor included refreshes and extra revenue."],
                [4, "Send Client Inputs to the owner before starting work."],
            ],
            "Pricing Ladder": [
                ["Package", "Deliverables", "One-time Price", "Monthly Retainer", "Best For"],
                ["Starter Refresh", "1 print menu + 1 Instagram menu panel", 149, 0, "Tiny cafes testing demand"],
                ["Standard Refresh", "Print, QR menu, Google menu link, 3 social panels", 349, 99, "Most cafes"],
                ["Full Menu System", "Full redesign, QR flow, specials template, launch posts", 699, 199, "Multi-location or high-change menus"],
                ["Monthly Specials", "Specials board, story graphic, menu link update", 0, 149, "Cafes that change offers weekly"],
                ["Multi-location Add-on", "Replicate final system across each extra location", 249, 75, "Small cafe groups"],
            ],
            "Quote Builder": [
                ["Input", "Value"],
                ["Base package price", 349],
                ["Rush fee", 75],
                ["Extra menu page count", 2],
                ["Price per extra page", 35],
                ["Extra social panels", 3],
                ["Price per social panel", 25],
                ["Estimated quote", "=B2+B3+(B4*B5)+(B6*B7)"],
                ["Deposit due at 50%", "=B8*0.5"],
            ],
            "Retainer Tracker": [
                ["Month", "Client", "Refreshes Included", "Refreshes Used", "Extra Refresh Fee", "Extra Revenue"],
                ["July", "Example Cafe", 2, 3, 45, "=MAX(0,D2-C2)*E2"],
                ["August", "", 2, 0, 45, "=MAX(0,D3-C3)*E3"],
                ["September", "", 2, 0, 45, "=MAX(0,D4-C4)*E4"],
            ],
            "Client Inputs": [
                ["Input", "Owner", "Required?", "Status"],
                ["Current menu file or photos", "Client", "Yes", "Open"],
                ["Confirmed prices and sold-out items", "Client", "Yes", "Open"],
                ["Logo, fonts, brand colors", "Client", "No", "Open"],
                ["Google Business Profile access or menu link", "Client", "No", "Open"],
            ],
            "Proposal Copy": [
                ["Section", "Client-facing copy"],
                ["Scope", "I will refresh your customer-facing menu assets across the agreed formats and return final files ready to use."],
                ["Approval", "You approve item names, prices, allergens, sold-out items, and final exports before publishing."],
                ["Not included", "Photography, new brand identity, paid ads, printing costs, and menu engineering are not included unless scoped separately."],
            ],
        }
    if asset_id == "asset-airbnb-photo-pricing":
        return {
            "Instructions": [
                ["Step", "What to do"],
                [1, "Use Pricing Ladder to choose a package based on photo count and edit risk."],
                [2, "Use Quote Builder for one listing. Edit only input rows in column B."],
                [3, "Use Edit Risk Log to flag any change that could mislead guests."],
                [4, "Use Retainer Tracker for seasonal or monthly photo refresh clients."],
            ],
            "Pricing Ladder": [
                ["Package", "Deliverables", "One-time Price", "Per Extra Photo", "Best For"],
                ["Sample Refresh", "1 before/after concept + edit-risk notes", 49, 25, "Cold outreach proof"],
                ["Starter Listing", "5 refreshed photos + handoff notes", 199, 30, "Small hosts testing demand"],
                ["Standard Listing", "12 refreshed photos + reorder notes + captions", 399, 25, "Most listings"],
                ["Premium Listing", "20 refreshed photos + seasonal scene variants", 699, 20, "High-value listings"],
                ["Seasonal Retainer", "6 monthly/seasonal refreshes + approval log", 249, 20, "Hosts updating regularly"],
            ],
            "Quote Builder": [
                ["Input", "Value"],
                ["Base package price", 399],
                ["Included photos", 12],
                ["Requested photos", 15],
                ["Per extra photo", 25],
                ["Rush fee", 75],
                ["Edit-risk review fee", 50],
                ["Estimated quote", "=B2+MAX(0,B4-B3)*B5+B6+B7"],
                ["Deposit due at 50%", "=B8*0.5"],
            ],
            "Edit Risk Log": [
                ["Photo", "Proposed edit", "Risk", "Host approval", "Status"],
                ["Living room", "Improve light and add two adults relaxing", "Low", "Required", "Open"],
                ["Bedroom", "Tidy bedding and warm lighting", "Low", "Required", "Open"],
                ["Balcony", "Do not alter view or furniture", "High", "Required", "Open"],
                ["Kitchen", "Declutter bench only", "Medium", "Required", "Open"],
            ],
            "Retainer Tracker": [
                ["Month", "Client", "Refreshes Included", "Refreshes Used", "Extra Photo Fee", "Extra Revenue"],
                ["July", "Example Host", 6, 8, 20, "=MAX(0,D2-C2)*E2"],
                ["August", "", 6, 0, 20, "=MAX(0,D3-C3)*E3"],
                ["September", "", 6, 0, 20, "=MAX(0,D4-C4)*E4"],
            ],
            "Client Inputs": [
                ["Input", "Owner", "Required?", "Status"],
                ["Listing URL", "Client", "Yes", "Open"],
                ["Original source photos", "Client", "Yes", "Open"],
                ["Approved edit boundaries", "Client", "Yes", "Open"],
                ["Model direction and usage limits", "Client", "Yes", "Open"],
                ["Rooms to prioritise", "Client", "Yes", "Open"],
            ],
        }
    if asset_id == "asset-drone-roof-pricing":
        return {
            "Instructions": [
                ["Step", "What to do"],
                [1, "Choose a package based on report depth, video, travel, turnaround, and flight complexity."],
                [2, "Use Quote Builder for one property. Edit only the input values in column B."],
                [3, "Use Partner Retainer for agents, roofers, solar installers, and property managers who can send repeat work."],
                [4, "Keep all pricing language illustrative and avoid guaranteed inspection, insurance, repair, or revenue outcomes."],
            ],
            "Pricing Ladder": [
                ["Package", "Deliverables", "Price", "Best For", "Notes"],
                ["Sample Roof", "1 short flyover + 6 labelled photos + sample visual note", 0, "Partner proof", "Use selectively for high-fit prospects"],
                ["Basic Report", "12 photos + 1-page visual report", 149, "Homeowner peace of mind", "Visual documentation only"],
                ["Standard Report", "20 photos + short video + 2-page visual report", 249, "Most buyers", "Core offer"],
                ["Priority Report", "Standard report + 24-hour priority scheduling", 349, "Urgent owner or agent need", "Weather and airspace permitting"],
                ["Partner Pack", "4 reports per month", 799, "Agents, roofers, solar installers", "Priority booking slots"],
                ["Extra Property", "Additional nearby property same day", 125, "Route efficiency", "Same area and same flight conditions only"],
            ],
            "Quote Builder": [
                ["Input", "Value"],
                ["Base package price", 249],
                ["Travel surcharge", 35],
                ["Extra photos", 8],
                ["Price per extra photo", 5],
                ["Rush fee", 75],
                ["Video add-on", 50],
                ["Estimated quote", "=B2+B3+(B4*B5)+B6+B7"],
                ["Deposit due at 50%", "=B8*0.5"],
            ],
            "Partner Retainer": [
                ["Partner", "Reports Included", "Monthly Fee", "Reports Used", "Extra Report Fee", "Extra Revenue"],
                ["Example Roofer", 4, 799, 5, 175, "=MAX(0,D2-B2)*E2"],
                ["Example Agent", 2, 449, 2, 175, "=MAX(0,D3-B3)*E3"],
                ["Example Solar Installer", 6, 1099, 7, 150, "=MAX(0,D4-B4)*E4"],
                ["Example Property Manager", 8, 1399, 9, 150, "=MAX(0,D5-B5)*E5"],
            ],
            "Unit Economics": [
                ["Metric", "Illustrative Value", "Formula/Note"],
                ["Reports per week", 10, "Illustrative capacity only"],
                ["Average report price", 250, "Use around/roughly language in sales copy"],
                ["Weekly revenue", "=B2*B3", ""],
                ["Monthly revenue", "=B4*4", ""],
                ["Annual revenue", "=B5*12", ""],
                ["Drone cost", 750, "Replace with actual purchase or rental cost"],
                ["Reports to recover drone cost", "=ROUNDUP(B7/B3,0)", ""],
                ["Insurance, licensing, training, software, and travel", "Add actuals", "Do not ignore operating costs"],
            ],
            "Client Inputs": [
                ["Input", "Owner", "Required?", "Status"],
                ["Property address", "Client", "Yes", "Open"],
                ["Owner or authorised-agent permission", "Client", "Yes", "Open"],
                ["Roof areas of interest", "Client", "No", "Open"],
                ["Access and launch notes", "Client", "Yes", "Open"],
                ["Report recipients and intended use", "Client", "Yes", "Open"],
                ["Privacy boundaries or neighbouring-property restrictions", "Client", "Yes", "Open"],
            ],
            "Proposal Copy": [
                ["Section", "Client-facing copy"],
                ["Scope", "I will capture roof photos from permitted drone angles and deliver a labelled visual report with a short handoff note."],
                ["Boundary", "This is visual photo documentation only, not a structural, engineering, safety, insurance, or repair inspection."],
                ["Approval", "The property owner or authorised representative confirms permission, access, intended use, and any privacy limits before the flight."],
                ["Not included", "Repairs, roof access by ladder, insurance claim advice, engineering opinion, code compliance, and guaranteed damage detection are not included."],
            ],
        }
    if asset_id == "asset-powerwash-pricing":
        return {
            "Instructions": [
                ["Step", "What to do"],
                [1, "Choose a package based on surface type, size, staining, access, drainage, and weather window."],
                [2, "Use Quote Builder for one property. Edit only the input values in column B."],
                [3, "Use Recurring Maintenance for quarterly, shopfront, bin-pad, strata, and property-manager work."],
                [4, "Use Job Log after each delivery to track proof, limitations, and referral opportunities."],
            ],
            "Pricing Ladder": [
                ["Package", "Deliverables", "Price", "Best For", "Notes"],
                ["Sample Strip", "Small test patch + before/after photo", 0, "Proof for neighbour or landlord", "Use selectively, not as free labour"],
                ["Starter Path", "Front path or small entry clean", 89, "Tiny paid first job", "Keep scope tight"],
                ["Driveway Sprint", "Single driveway or patio + before/after photos", 179, "Most homeowners", "Core offer"],
                ["Driveway + Path", "Driveway plus front path/entry", 249, "Higher visible impact", "Check water and drainage"],
                ["Shopfront Entry", "Entry, footpath edge, bin pad, or small frontage", 199, "Small local shops", "Schedule around quiet hours"],
                ["Property Manager Bundle", "2-3 simple surfaces same property", 399, "Rentals and inspections", "Photo handoff included"],
                ["Quarterly Maintenance", "Repeat clean reminder and priority slot", 149, "Shops, bin areas, strata", "Price by surface and access"],
            ],
            "Quote Builder": [
                ["Input", "Value"],
                ["Base package price", 179],
                ["Travel/setup fee", 35],
                ["Surface risk fee", 25],
                ["Heavy staining add-on", 45],
                ["Extra surface count", 1],
                ["Price per extra surface", 60],
                ["Cluster booking discount", 25],
                ["Estimated quote", "=B2+B3+B4+B5+(B6*B7)-B8"],
                ["Deposit due at 30%", "=B9*0.3"],
            ],
            "Recurring Maintenance": [
                ["Client Type", "Cadence", "Included Area", "Suggested Fee", "Best Trigger"],
                ["Homeowner", "Quarterly", "Driveway or front path", 149, "Seasonal grime or pre-event clean"],
                ["Landlord", "Per tenancy", "Driveway/path/patio", 199, "End-of-lease or pre-listing"],
                ["Shop", "Monthly", "Entry and bin area", 149, "Foot traffic and customer impression"],
                ["Strata/common area", "Monthly or quarterly", "Paths/bin pads/entries", 299, "Shared-area complaints"],
                ["Property manager", "As needed", "Rental refresh bundle", 399, "Inspection or listing prep"],
            ],
            "Job Profit Check": [
                ["Metric", "Illustrative Value", "Formula/Note"],
                ["Quote", "='Quote Builder'!B9", "From quote builder"],
                ["Equipment rental", 60, "Use actual rental or depreciation"],
                ["Fuel/transport", 20, "Use actual"],
                ["Cleaning supplies", 10, "Use actual"],
                ["Total hard cost", "=B3+B4+B5", ""],
                ["Gross margin", "=B2-B6", ""],
                ["Job hours", 2.5, "Travel, setup, cleaning, pack-down, handoff"],
                ["Hourly gross", "=IF(B8=0,\"\",B7/B8)", ""],
            ],
            "Client Inputs": [
                ["Input", "Owner", "Required?", "Status"],
                ["Property address", "Client", "Yes", "Open"],
                ["Photos of each surface", "Client", "Yes", "Open"],
                ["Water access location", "Client", "Yes", "Open"],
                ["Surface type and known sealant/paint", "Client", "Yes", "Open"],
                ["Drainage/runoff concerns", "Client", "Yes", "Open"],
                ["Heavy stains, oil, gum, rust, mould, or paint", "Client", "No", "Open"],
                ["Pets, children, parking, or access constraints", "Client", "No", "Open"],
            ],
            "Job Log": [
                ["Job", "Before photos?", "Test patch?", "Limitations", "After photos?", "Referral asked?", "Next reminder"],
                ["Example driveway", "Yes", "Passed", "Old oil mark improved only", "Yes", "Yes", "3 months"],
                ["", "", "", "", "", "", ""],
                ["", "", "", "", "", "", ""],
                ["", "", "", "", "", "", ""],
            ],
            "Proposal Copy": [
                ["Section", "Client-facing copy"],
                ["Scope", "I will clean the agreed surface, complete a test patch first, and send before/after photos after the job."],
                ["Boundary", "Some staining may improve rather than disappear completely, and delicate or damaged surfaces may be excluded."],
                ["Approval", "You confirm water access, surface area, items to move, hazards, and any areas to avoid before work starts."],
                ["Not included", "Roof cleaning, delicate surfaces, specialist chemical treatment, repairs, water supply issues, and guaranteed stain removal are not included unless scoped separately."],
            ],
        }
    if asset_id == "asset-gym-report":
        return {
            "Instructions": [
                ["Step", "What to do"],
                [1, "Paste every cancellation into Raw Cancellations."],
                [2, "Keep Reason Tag consistent so the summary formulas work."],
                [3, "Review Dashboard before the monthly retention call."],
                [4, "Move agreed actions into Action Plan and assign owners."],
            ],
            "Raw Cancellations": [
                ["Date", "Member Type", "Reason Tag", "Monthly Fee", "Save Offered", "Saved?"],
                ["2026-06-01", "Unlimited", "Price", 189, "Pause plan", "No"],
                ["2026-06-03", "2x Week", "Schedule", 129, "Class swap", "Yes"],
                ["2026-06-05", "Unlimited", "Experience", 189, "Owner call", "No"],
                ["2026-06-07", "Foundations", "Moved away", 99, "None", "No"],
                ["2026-06-10", "Unlimited", "Injury", 189, "Freeze", "Yes"],
                ["2026-06-12", "2x Week", "Price", 129, "Downgrade", "No"],
            ],
            "Tag Summary": [
                ["Reason Tag", "Count", "Revenue At Risk"],
                ["Price", '=COUNTIF(\'Raw Cancellations\'!C:C,A2)', '=SUMIF(\'Raw Cancellations\'!C:C,A2,\'Raw Cancellations\'!D:D)'],
                ["Schedule", '=COUNTIF(\'Raw Cancellations\'!C:C,A3)', '=SUMIF(\'Raw Cancellations\'!C:C,A3,\'Raw Cancellations\'!D:D)'],
                ["Experience", '=COUNTIF(\'Raw Cancellations\'!C:C,A4)', '=SUMIF(\'Raw Cancellations\'!C:C,A4,\'Raw Cancellations\'!D:D)'],
                ["Moved away", '=COUNTIF(\'Raw Cancellations\'!C:C,A5)', '=SUMIF(\'Raw Cancellations\'!C:C,A5,\'Raw Cancellations\'!D:D)'],
                ["Injury", '=COUNTIF(\'Raw Cancellations\'!C:C,A6)', '=SUMIF(\'Raw Cancellations\'!C:C,A6,\'Raw Cancellations\'!D:D)'],
            ],
            "Action Plan": [
                ["Priority", "Issue", "Action", "Owner", "Due Date", "Status"],
                [1, "Top churn tag", "Create save script for highest-risk reason", "Owner", "2026-07-05", "Open"],
                [2, "Member feedback", "Call 5 recently cancelled members", "Manager", "2026-07-12", "Open"],
                [3, "Class timing", "Compare cancelled members against attendance windows", "Coach", "2026-07-19", "Open"],
            ],
            "Dashboard": [
                ["Metric", "Value"],
                ["Total cancellations", '=COUNTA(\'Raw Cancellations\'!A2:A100)'],
                ["Saved members", '=COUNTIF(\'Raw Cancellations\'!F:F,"Yes")'],
                ["Save rate", '=IF(B2=0,"",B3/B2)'],
                ["Revenue at risk", '=SUM(\'Raw Cancellations\'!D2:D100)'],
                ["Top controllable reason", "Review Tag Summary"],
                ["Next review date", "Enter date"],
            ],
            "Call Notes": [
                ["Topic", "Notes", "Decision"],
                ["Top churn reason", "", ""],
                ["Save offer performance", "", ""],
                ["Action owner", "", ""],
                ["Data quality issue", "", ""],
            ],
        }
    return {
        "Instructions": [
            ["Step", "What to do"],
            [1, "Replace all Snapshot Inputs values with current public-source data."],
            [2, "Enter the source name or URL for every metric."],
            [3, "Use Weekly Snapshot for agent talking points."],
            [4, "Use Content Calendar and Lead Follow-up to turn the snapshot into outreach."],
        ],
        "Snapshot Inputs": [
            ["Field", "Value", "Source", "Date captured"],
            ["Suburb", "Example Suburb", "Public market source", "2026-06-12"],
            ["Median sale price", 850000, "Replace with current data", "2026-06-12"],
            ["Listings this week", 42, "Replace with current data", "2026-06-12"],
            ["Auction clearance", "62%", "Replace with current data", "2026-06-12"],
            ["Median rent", 620, "Replace with current data", "2026-06-12"],
            ["Days on market", 31, "Replace with current data", "2026-06-12"],
        ],
        "Weekly Snapshot": [
            ["Metric", "Current", "Previous", "Change"],
                ["Median sale price", "='Snapshot Inputs'!B3", 825000, '=IF(B2="","",B2-C2)'],
                ["Listings", "='Snapshot Inputs'!B4", 39, '=IF(B3="","",B3-C3)'],
                ["Median rent", "='Snapshot Inputs'!B6", 600, '=IF(B4="","",B4-C4)'],
                ["Days on market", "='Snapshot Inputs'!B7", 35, '=IF(B5="","",B5-C5)'],
        ],
        "Content Calendar": [
            ["Day", "Post Angle", "CTA"],
            ["Monday", "What changed in the suburb this week", "Ask for the full snapshot"],
            ["Wednesday", "Buyer question answered from public data", "Book an appraisal chat"],
            ["Friday", "One street or property-type insight", "Reply for the PDF"],
            ["Sunday", "Open-home question from the week", "Send a suburb question"],
        ],
        "Lead Follow-up": [
            ["Lead Type", "Message Angle", "Next Step"],
            ["Seller", "What changed in comparable listings", "Book pricing conversation"],
            ["Buyer", "What new supply means for negotiation", "Send inspection shortlist"],
            ["Investor", "Rent and days-on-market movement", "Send yield snapshot"],
        ],
        "Compliance Log": [
            ["Check", "Status", "Notes"],
            ["Sources cited", "Open", "Add source for every metric"],
            ["No price prediction language", "Open", "Review before publishing"],
            ["Agency approval", "Open", "Principal or licensee approval if required"],
            ["No investment advice", "Open", "Keep commentary informational"],
        ],
    }


def enrich_workbook(asset: Asset, sheets: dict[str, list[list[Any]]]) -> dict[str, list[list[Any]]]:
    enriched = dict(sheets)
    polish_items = [item for _heading, items in asset_polish_sections(asset) for item in items]
    enriched.setdefault("Worked Example", [
        ["Item", "Example value", "How to use"],
        ["Asset", asset.title, "Use this as the named deliverable in the proposal and handoff."],
        ["Prospect context", polish_items[0] if polish_items else "Replace with the buyer's visible problem.", "Rewrite this for the actual buyer before sending."],
        ["Priority decision", polish_items[1] if len(polish_items) > 1 else "Choose the highest-confidence next step.", "Use this to keep the delivery focused."],
        ["Approval point", polish_items[2] if len(polish_items) > 2 else "Mark facts, claims, and prices that need approval.", "Never publish uncertain details."],
        ["Upsell path", polish_items[3] if len(polish_items) > 3 else "Convert the first delivery into a retainer or next sprint.", "Use after the first asset is approved."],
    ])
    # One consolidated operating sheet instead of four near-identical filler tabs
    # (Delivery Runbook + Client Handoff + QA Checklist + Renewal Tracker).
    enriched.setdefault("Delivery & QA", [
        ["Stage", "Do this", "Owner", "Status"],
        ["1. Collect", "Gather source material and visible proof before editing.", "You", "Open"],
        ["2. Draft", "Create the first buyer-specific draft using only verified inputs.", "You", "Open"],
        ["3. Flag", "Mark every uncertain fact, price, or claim for client approval.", "You", "Open"],
        ["4. Approve", "Client confirms facts, prices, dates, claims, and policy details.", "Client", "Open"],
        ["5. Deliver", "Send working file, final export, and a summary of what changed.", "You", "Open"],
        ["6. Renew", "Log before/after evidence and the next recommended paid step.", "You", "Open"],
        ["QA - placeholders removed or marked", "Required before sending", "You", "Open"],
        ["QA - links, prices, dates, hours, claims verified", "Required before sending", "You", "Open"],
        ["QA - no guaranteed revenue/ranking/performance claims", "Required before sending", "You", "Open"],
        ["QA - filename includes buyer, asset, and date", "Recommended", "You", "Open"],
    ])
    return enriched


def make_xlsx(path: Path, pack: Pack, asset: Asset) -> None:
    start_here = {
        "Start Here": [
            ["Side Hustle Stephen - The Launchpad"],
            ["Asset", asset.title],
            ["Pack", pack.title],
            ["What this is", asset.description],
            ["Buyer", pack.buyer],
            ["Category", pack.category],
            ["Startup cost", pack.startup_cost],
            ["Time to first sale", pack.time_to_first_sale],
            ["Difficulty", pack.difficulty],
            ["How to use", "Work left to right through the tabs. Replace the sample values, keep the formulas, and verify every fact before client use."],
            ["Delivery standards", "Full delivery standards, inputs, and QA live once in this pack's AI Prompt Pack."],
        ]
    }
    sheets = {**start_here, **enrich_workbook(asset, workbook_for(asset.id))}
    workbook_sheets = []
    rels = []
    content_overrides = []
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for idx, (name, rows) in enumerate(sheets.items(), start=1):
            z.writestr(f"xl/worksheets/sheet{idx}.xml", sheet_xml(rows, name))
            workbook_sheets.append(f'<sheet name="{escape(name)}" sheetId="{idx}" r:id="rId{idx}"/>')
            rels.append(f'<Relationship Id="rId{idx}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{idx}.xml"/>')
            content_overrides.append(f'<Override PartName="/xl/worksheets/sheet{idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>')
        rels.append('<Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>')
        workbook_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>{''.join(workbook_sheets)}</sheets></workbook>"""
        workbook_rels = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{''.join(rels)}</Relationships>"""
        content_types = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  {''.join(content_overrides)}
</Types>"""
        root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>"""
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", root_rels)
        z.writestr("xl/workbook.xml", workbook_xml)
        z.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        z.writestr("xl/styles.xml", f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="4"><numFmt numFmtId="164" formatCode="&quot;$&quot;#,##0"/><numFmt numFmtId="165" formatCode="#,##0"/><numFmt numFmtId="166" formatCode="0%"/><numFmt numFmtId="167" formatCode="yyyy-mm-dd"/></numFmts>
  <fonts count="3"><font><sz val="10"/><name val="{FONT}"/><color rgb="FF{TEXT}"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="10"/><name val="{FONT}"/></font><font><sz val="9"/><name val="{FONT}"/><color rgb="FF{TEXT}"/></font></fonts>
  <fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF{BLACK}"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF{PANEL}"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="2"><border/><border><left style="thin"><color rgb="FF{LINE}"/></left><right style="thin"><color rgb="FF{LINE}"/></right><top style="thin"><color rgb="FF{LINE}"/></top><bottom style="thin"><color rgb="FF{LINE}"/></bottom></border></borders>
  <cellXfs count="12">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="2" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="165" fontId="2" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="166" fontId="2" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="2" fillId="0" borderId="1" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="165" fontId="2" fillId="0" borderId="1" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="166" fontId="2" fillId="0" borderId="1" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="167" fontId="2" fillId="3" borderId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="167" fontId="2" fillId="0" borderId="1" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
  </cellXfs>
  <dxfs count="2">
    <dxf><fill><patternFill patternType="solid"><fgColor rgb="FFEAF8F0"/></patternFill></fill><font><color rgb="FF0F6B3F"/><b/></font></dxf>
    <dxf><fill><patternFill patternType="solid"><fgColor rgb="FFFFF4E8"/></patternFill></fill><font><color rgb="FF8A4B00"/><b/></font></dxf>
  </dxfs>
</styleSheet>""")


def generate() -> list[dict[str, Any]]:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: list[dict[str, Any]] = []
    for pack in PACKS:
        pack_dir = OUT_DIR / pack.slug
        pack_dir.mkdir(parents=True, exist_ok=True)
        for asset in pack.assets:
            ext = asset.type.lower()
            filename = f"{slugify(asset.title)}.{ext}"
            path = pack_dir / filename
            if asset.type == "DOCX":
                make_docx(path, pack, asset, docx_sections(pack, asset))
            elif asset.type == "PDF":
                make_pdf(path, pack, asset, pdf_sections(pack, asset))
            elif asset.type == "XLSX":
                make_xlsx(path, pack, asset)
            else:
                raise ValueError(asset.type)
            manifest.append({
                "id": asset.id,
                "packSlug": pack.slug,
                "packTitle": pack.title,
                "title": asset.title,
                "type": asset.type,
                "description": asset.description,
                "path": rel_path(path),
                "filename": filename,
                "bytes": path.stat().st_size,
            })
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


if __name__ == "__main__":
    generated = generate()
    print(f"Generated {len(generated)} assets in {OUT_DIR}")
