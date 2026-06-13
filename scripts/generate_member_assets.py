from __future__ import annotations

import json
import math
import os
import re
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "content" / "member-assets"
BRAND = "Side Hustle Stephen - The Launchpad"
ACCENT = "D94A00"
ACCENT_DARK = "A53A00"
ACCENT_SOFT = "FFF1E7"
TEXT = "070A0F"
MUTED = "5E6774"
INK = "12172A"
LINE = "D7DEE6"
PANEL = "F7FAFC"


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
}


def asset_polish_sections(asset: Asset) -> list[tuple[str, list[str]]]:
    return ASSET_POLISH_SECTIONS.get(asset.id, [])


def script_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    base_offer = {
        "cafe-menu-refresh-package": "a menu refresh across print, Instagram, Google Business, and QR menus",
        "google-business-profile-rescue": "a profile rescue sprint for photos, services, hours, FAQs, and review prompts",
        "shopify-cart-audit": "a checkout friction and abandoned-cart email audit",
        "realtor-suburb-snapshot": "a weekly suburb snapshot agents can post, email, and send to warm leads",
        "ai-inbox-triage-trades": "an inbox triage workflow that labels leads and drafts human-approved replies",
        "review-testimonial-service": "a review reply and testimonial repackaging service",
        "manual-workflow-concierge": "a manual workflow concierge that proves demand before software build",
        "airbnb-guest-guide-refresh": "a guest guide refresh that reduces repeat questions and improves stay quality",
        "ugc-brief-generator": "a product-specific creator brief with hooks, shots, and usage notes",
    }[pack.slug]
    return core_sections(pack) + [
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
    return core_sections(pack) + PROMPT_PACK_SECTIONS[asset.id] + [
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
    return core_sections(pack) + [
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
    ] + premium_handoff_sections(pack, asset)


def client_email_template_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    return core_sections(pack) + [
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
    ] + premium_handoff_sections(pack, asset)


def client_faq_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    return core_sections(pack) + [
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
    ] + premium_handoff_sections(pack, asset)


def docx_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    if asset.id in PROMPT_PACK_SECTIONS:
        return prompt_pack_sections(pack, asset) + premium_handoff_sections(pack, asset)
    if asset.id.endswith("-intake"):
        return client_intake_sections(pack, asset)
    if asset.id.endswith("-email-templates"):
        return client_email_template_sections(pack, asset)
    if asset.id.endswith("-faqs"):
        return client_faq_sections(pack, asset)
    if asset.id in DOCX_ASSET_SECTIONS:
        return core_sections(pack) + DOCX_ASSET_SECTIONS[asset.id] + asset_polish_sections(asset) + premium_handoff_sections(pack, asset) + [
            ("Commercial use note", [
                "Review every bracketed field before sending.",
                "Do not claim guaranteed revenue, rankings, bookings, retention, or ad performance.",
                "Keep buyer approval for facts, claims, prices, legal-sensitive statements, and final exports.",
            ]),
        ]
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
    return sections


def pdf_sections(pack: Pack, asset: Asset) -> list[tuple[str, list[str]]]:
    if asset.id in PDF_ASSET_SECTIONS:
        return PDF_ASSET_SECTIONS[asset.id] + asset_polish_sections(asset) + premium_handoff_sections(pack, asset)
    return checklist_sections(pack, asset) + asset_polish_sections(asset) + premium_handoff_sections(pack, asset)


def p(text: str, style: str | None = None) -> str:
    style_attr = f' w:val="{style}"' if style else ""
    return (
        "<w:p>"
        + (f"<w:pPr><w:pStyle{style_attr}/></w:pPr>" if style else "")
        + f"<w:r><w:t xml:space=\"preserve\">{escape(text)}</w:t></w:r>"
        + "</w:p>"
    )


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
        f'<w:r><w:t xml:space="preserve">[ ] {escape(text)}</w:t></w:r></w:p>'
    )


def rule() -> str:
    return (
        '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="1" '
        f'w:color="{ACCENT}"/></w:pBdr><w:spacing w:before="70" w:after="210"/></w:pPr></w:p>'
    )


def make_docx(path: Path, pack: Pack, asset: Asset, sections: list[tuple[str, list[str]]]) -> None:
    quick_start = [
        "Replace bracketed fields.",
        "Verify facts and claims.",
        "Send for approval before publishing.",
    ]
    body = [
        p(BRAND, "Subtitle"),
        p(asset.title, "Title"),
        p(pack.title, "Heading2"),
        p(asset.description, "Lead"),
        rule(),
        p(f"Buyer: {pack.buyer}", "Meta"),
        p(f"Category: {pack.category} | Startup cost: {pack.startup_cost} | First sale: {pack.time_to_first_sale} | Difficulty: {pack.difficulty}", "Meta"),
        p("Operator standard", "Kicker"),
        p("Use this as a working asset. Replace bracketed details with buyer-specific information, verify every sensitive fact, and keep approvals in writing.", "IntenseQuote"),
        p("Before sending", "Heading3"),
        *[checkbox(item) for item in quick_start],
        page_break(),
    ]
    for index, (heading, items) in enumerate(sections, start=1):
        body.append(p(f"{index:02d} / {heading}", "Heading1"))
        for item in items:
            body.append(bullet(item))
    body.append(p("Commercial use note", "Heading1"))
    body.append(p("These templates are practical launch materials. They do not guarantee revenue, rankings, retention, or advertising performance. Validate claims with buyer data and keep approvals in writing."))
    document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    {''.join(body)}
    <w:sectPr><w:footerReference w:type="default" r:id="rId3"/><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1008" w:right="936" w:bottom="864" w:left="936" w:footer="432"/><w:cols w:space="720"/></w:sectPr>
  </w:body>
</w:document>"""
    styles_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="21"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:after="150" w:line="300" w:lineRule="auto"/><w:widowControl/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="50"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:spacing w:before="90" w:after="140" w:line="920" w:lineRule="auto"/><w:keepNext/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:caps/><w:sz w:val="16"/><w:color w:val="{ACCENT_DARK}"/></w:rPr><w:pPr><w:spacing w:after="120"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Lead"><w:name w:val="Lead"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="24"/><w:color w:val="{MUTED}"/></w:rPr><w:pPr><w:spacing w:before="80" w:after="160" w:line="340" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Kicker"><w:name w:val="Kicker"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:caps/><w:sz w:val="15"/><w:color w:val="{ACCENT_DARK}"/></w:rPr><w:pPr><w:spacing w:before="180" w:after="70"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="25"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="320" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="5" w:color="{LINE}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:sz w:val="23"/><w:color w:val="{MUTED}"/></w:rPr><w:pPr><w:spacing w:after="130"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:sz w:val="20"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:spacing w:before="150" w:after="80"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Meta"><w:name w:val="Meta"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:sz w:val="18"/><w:color w:val="{MUTED}"/></w:rPr><w:pPr><w:spacing w:after="95"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="20"/><w:color w:val="{TEXT}"/></w:rPr><w:pPr><w:spacing w:after="110" w:line="292" w:lineRule="auto"/><w:ind w:left="540" w:hanging="220"/><w:widowControl/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Checklist"><w:name w:val="Checklist"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:b/><w:sz w:val="20"/><w:color w:val="{INK}"/></w:rPr><w:pPr><w:spacing w:after="92" w:line="280" w:lineRule="auto"/><w:shd w:fill="{PANEL}"/><w:pBdr><w:left w:val="single" w:sz="10" w:space="8" w:color="{LINE}"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="IntenseQuote"><w:name w:val="Intense Quote"/><w:rPr><w:i/><w:color w:val="{INK}"/><w:sz w:val="20"/></w:rPr><w:pPr><w:spacing w:before="90" w:after="170" w:line="292" w:lineRule="auto"/><w:shd w:fill="{ACCENT_SOFT}"/><w:pBdr><w:left w:val="single" w:sz="18" w:space="8" w:color="{ACCENT}"/></w:pBdr></w:pPr></w:style>
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
      <w:lvlText w:val="•"/>
      <w:pPr><w:ind w:left="720" w:hanging="240"/></w:pPr>
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
  <w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="3" w:color="{LINE}"/></w:pBdr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="16"/><w:color w:val="{MUTED}"/></w:rPr><w:t xml:space="preserve">{escape(BRAND)} | {escape(pack.title)} | Verify facts before client use</w:t></w:r></w:p>
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


def pdf_escape(text: str) -> str:
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
            "192 644 m 232 644 l S", "352 644 m 392 644 l S",
            "132 620 m 132 568 l S", "292 620 m 292 568 l S", "452 620 m 452 568 l S",
            "132 520 m 132 468 l S", "292 520 m 292 468 l S", "452 520 m 452 468 l S",
            pdf_text(72, 360, 10, "Rule: AI may draft, but urgent/safety issues and all outbound messages require human approval."),
        ]
    elif asset.id == "asset-manual-score":
        ops += [pdf_text(72, 744, 22, "Manual Validation Scorecard"), pdf_text(72, 720, 10, "Score before automating. Do not automate weak demand.")]
        headers = ["Criterion", "Weight", "Score 1-5", "Weighted"]
        widths = [240, 80, 100, 100]
        x0, y0, row_h = 72, 660, 32
        x = x0
        for label, width in zip(headers, widths):
            ops += [pdf_box(x, y0, width, row_h), pdf_text(x + 8, y0 + 19, 9, label)]
            x += width
        rows = [
            ("Pain frequency", "20%", "", ""),
            ("Current cost of pain", "20%", "", ""),
            ("Manual deliverability", "20%", "", ""),
            ("Willingness to pay evidence", "25%", "", ""),
            ("Repeatability", "15%", "", ""),
            ("Total /25", "100%", "", ""),
        ]
        for r, row in enumerate(rows, start=1):
            x = x0
            y = y0 - row_h * r
            for label, width in zip(row, widths):
                ops += [pdf_box(x, y, width, row_h), pdf_text(x + 8, y + 19, 9, label)]
                x += width
        ops += [pdf_text(72, 405, 10, "Decision: below 18/25 = keep manual or stop. 18-21 = keep manual. 22+ after 3 paid deliveries = automate one step.")]
    elif asset.id == "asset-reviews-cards":
        ops += [pdf_text(72, 744, 22, "Testimonial Card Layout Specs"), pdf_text(72, 720, 10, "Use exact review language. One claim per card.")]
        specs = [
            (72, 500, 160, 160, "Square 1080x1080"),
            (272, 420, 120, 220, "Story 1080x1920"),
            (72, 330, 420, 110, "Website banner 1600x600"),
        ]
        for x, y, w, h, label in specs:
            ops += [pdf_box(x, y, w, h), pdf_text(x + 10, y + h - 22, 10, label), pdf_text(x + 10, y + 20, 8, "Quote + source context + logo")]
        ops += [pdf_text(72, 270, 10, "Safe margins: 90 px minimum. Quote length: square 26 words, story 34 words, banner 22 words.")]
    elif asset.id == "asset-airbnb-upsell":
        ops += [pdf_text(72, 744, 22, "Host Upsell Matrix"), pdf_text(72, 720, 10, "Choose optional add-ons that are easy to fulfill and transparent for guests.")]
        headers = ["Offer", "Guest trigger", "Effort", "Margin", "Approved?"]
        widths = [130, 170, 70, 70, 80]
        x0, y0, row_h = 72, 660, 34
        x = x0
        for label, width in zip(headers, widths):
            ops += [pdf_box(x, y0, width, row_h), pdf_text(x + 8, y0 + 20, 9, label)]
            x += width
        rows = [
            ("Breakfast basket", "Late arrival / first morning", "Low", "$", ""),
            ("Late checkout", "Evening flight / weekend stay", "Low", "$$", ""),
            ("Local itinerary", "Family / couple / work trip", "Medium", "$$", ""),
            ("Celebration setup", "Birthday / anniversary", "Medium", "$$", ""),
            ("Pantry restock", "Long stay / remote worker", "Medium", "$", ""),
        ]
        for r, row in enumerate(rows, start=1):
            x = x0
            y = y0 - row_h * r
            for label, width in zip(row, widths):
                ops += [pdf_box(x, y, width, row_h), pdf_text(x + 8, y + 20, 8, label)]
                x += width
        ops += [
            pdf_text(72, 420, 10, "Rules: disclose price before purchase, confirm host fulfillment capacity, and avoid promises outside platform policy."),
            pdf_text(72, 396, 10, "Default message: I can arrange [offer] for [$] if you would like it ready by [time]."),
        ]
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
        headers = ["Area", "Decision", "Owner", "Done?"]
        widths = [150, 210, 80, 80]
        x0, y0, row_h = 72, 660, 34
        x = x0
        for label, width in zip(headers, widths):
            ops += [pdf_box(x, y0, width, row_h), pdf_text(x + 8, y0 + 20, 9, label)]
            x += width
        rows = [
            ("Buyer context", "Specific business, segment, and visible pain", "You", ""),
            ("Source proof", "Screenshots, URLs, reviews, data, or examples saved", "You", ""),
            ("Approval risk", "Claims, prices, hours, legal-sensitive facts checked", "Client", ""),
            ("Delivery", "Working file, final export, and next step included", "You", ""),
            ("Follow-up", "Renewal angle or paid next step identified", "You", ""),
        ]
        for r, row in enumerate(rows, start=1):
            x = x0
            y = y0 - row_h * r
            for label, width in zip(row, widths):
                ops += [pdf_box(x, y, width, row_h), pdf_text(x + 8, y + 20, 8, label)]
                x += width
        ops += [
            pdf_text(72, 420, 10, "Rule: if a buyer could misunderstand the recommendation, rewrite it as a clear operational next step."),
            pdf_text(72, 396, 10, "Handoff: summarize what changed, what needs approval, and what you recommend doing next."),
        ]
    ops.append(pdf_text(72, 32, 8, f"{BRAND} | Visual worksheet"))
    return ["\n".join(ops).encode("latin-1", "replace")]


def pdf_cover_page(pack: Pack, asset: Asset) -> bytes:
    ops = [
        pdf_fill(0, 0, 612, 792, (0.985, 0.99, 0.99)),
        pdf_fill(54, 636, 504, 7, (0.85, 0.29, 0)),
        pdf_fill(54, 104, 504, 78, (1.0, 0.945, 0.905)),
        pdf_fill(420, 500, 96, 96, (0.82, 0.9, 0.92)),
        pdf_fill(440, 520, 96, 96, (1.0, 0.61, 0.34)),
        "0 0 0 RG",
        "0.03 0.04 0.08 rg",
        pdf_text(72, 724, 10, BRAND.upper()),
        pdf_text_bold(72, 604, 30, asset.title),
        pdf_text_bold(72, 566, 13, pack.title),
    ]
    desc_y = 536
    for line in wrap(asset.description, 78):
        ops.append(pdf_text(72, desc_y, 10, line))
        desc_y -= 14
    ops += [
        pdf_fill(72, 418, 132, 54, (1.0, 1.0, 1.0)),
        pdf_fill(222, 418, 132, 54, (1.0, 1.0, 1.0)),
        pdf_fill(372, 418, 132, 54, (1.0, 1.0, 1.0)),
        pdf_text_bold(84, 452, 8, "BUYER"),
        pdf_text(84, 434, 9, pack.buyer[:24]),
        pdf_text_bold(234, 452, 8, "CATEGORY"),
        pdf_text(234, 434, 9, pack.category),
        pdf_text_bold(384, 452, 8, "FIRST SALE"),
        pdf_text(384, 434, 9, pack.time_to_first_sale),
        pdf_text_bold(92, 150, 9, "Before sending"),
    ]
    note_y = 132
    for line in wrap("Replace placeholders, verify facts, keep approvals in writing, and avoid guaranteed revenue, ranking, retention, booking, or ad-performance claims.", 74):
        ops.append(pdf_text(92, note_y, 10, line))
        note_y -= 13
    ops.append(pdf_text(72, 32, 8, f"{BRAND} | Cover"))
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


def make_pdf(path: Path, pack: Pack, asset: Asset, sections: list[tuple[str, list[str]]]) -> None:
    lines: list[tuple[str, int, bool]] = [(BRAND, 10, False), (asset.title, 22, True), (pack.title, 13, False), (asset.description, 11, False), ("", 11, False)]
    for heading, items in sections:
        lines.append((heading, 15, True))
        for item in items:
            prefix = "- "
            for idx, line in enumerate(wrap(item, 88)):
                lines.append(((prefix if idx == 0 else "  ") + line, 10, False))
        lines.append(("", 10, False))
    pages: list[list[tuple[str, int, bool]]] = []
    current: list[tuple[str, int, bool]] = []
    y = 760
    for line in lines:
        step = max(14, line[1] + 5)
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
        content_ops = []
        cursor_y = 760
        for text, size, bold in page:
            if text == "":
                cursor_y -= 14
                continue
            font = "F2" if bold else "F1"
            color = "0.07 0.09 0.16 rg" if bold else "0.03 0.04 0.08 rg"
            safe = pdf_escape(text)
            if bold and size >= 15:
                content_ops.append(pdf_fill(54, cursor_y - 9, 504, 24, (1.0, 0.965, 0.94)))
                content_ops.append(pdf_stroke_line(54, cursor_y - 12, 558, cursor_y - 12))
            content_ops.append(color)
            content_ops.append(f"BT /{font} {size} Tf 72 {cursor_y} Td ({safe}) Tj ET")
            cursor_y -= max(14, size + 5)
            if bold and size >= 15:
                cursor_y -= 6
        content_ops.append("0.36 0.40 0.45 rg")
        content_ops.append(pdf_stroke_line(72, 44, 540, 44))
        content_ops.append(f"BT /F1 8 Tf 72 28 Td ({pdf_escape(BRAND)} | {pdf_escape(asset.title)} | Page {page_index} of {total_pages}) Tj ET")
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


def cell_xml(row: int, col: int, value: Any) -> str:
    ref = f"{col_letter(col)}{row}"
    style = ' s="1"' if row == 1 else ' s="2"'
    if isinstance(value, str) and value.startswith("="):
        return f'<c r="{ref}" s="2"><f>{escape(value[1:])}</f></c>'
    if isinstance(value, (int, float)):
        return f'<c r="{ref}"{style}><v>{value}</v></c>'
    return f'<c r="{ref}" t="inlineStr"{style}><is><t>{escape(str(value))}</t></is></c>'


def sheet_xml(rows: list[list[Any]]) -> str:
    row_xml = []
    for r_idx, row in enumerate(rows, start=1):
        cells = "".join(cell_xml(r_idx, c_idx, value) for c_idx, value in enumerate(row, start=1))
        height = 26 if r_idx == 1 else 42
        row_xml.append(f'<row r="{r_idx}" ht="{height}" customHeight="1">{cells}</row>')
    max_cols = max((len(row) for row in rows), default=1)
    max_rows = max(len(rows), 1)
    filter_ref = f"A1:{col_letter(max_cols)}{max_rows}"
    validations = ""
    headers = [str(value).lower() for value in rows[0]] if rows else []
    validation_nodes = []
    for idx, header in enumerate(headers, start=1):
        if header in {"status", "required?", "saved?"}:
            col = col_letter(idx)
            validation_nodes.append(
                f'<dataValidation type="list" allowBlank="1" sqref="{col}2:{col}200"><formula1>"Open,In progress,Done,Yes,No,Approved"</formula1></dataValidation>'
            )
    if validation_nodes:
        validations = f'<dataValidations count="{len(validation_nodes)}">{"".join(validation_nodes)}</dataValidations>'
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetPr><tabColor rgb="FFD94A00"/></sheetPr>
  <sheetFormatPr defaultRowHeight="30"/>
  <cols><col min="1" max="1" width="20" customWidth="1"/><col min="2" max="2" width="52" customWidth="1"/><col min="3" max="3" width="30" customWidth="1"/><col min="4" max="8" width="24" customWidth="1"/></cols>
  <sheetViews><sheetView workbookViewId="0" showGridLines="0" zoomScale="85" zoomScaleNormal="85"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetData>{''.join(row_xml)}</sheetData>
  <autoFilter ref="{filter_ref}"/>
  {validations}
  <pageMargins left="0.45" right="0.45" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>
  <pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/>
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
            ["Field", "Value", "Source"],
            ["Suburb", "Example Suburb", "Public market source"],
            ["Median sale price", 850000, "Replace with current data"],
            ["Listings this week", 42, "Replace with current data"],
            ["Auction clearance", "62%", "Replace with current data"],
            ["Median rent", 620, "Replace with current data"],
            ["Days on market", 31, "Replace with current data"],
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
    enriched.setdefault("Delivery Runbook", [
        ["Step", "Action", "Owner", "Status"],
        [1, "Collect source material and visible proof before editing.", "You", "Open"],
        [2, "Create the first buyer-specific draft using only verified inputs.", "You", "Open"],
        [3, "Mark every uncertain fact or claim for approval.", "You", "Open"],
        [4, "Send working file, final export, and summary of changes.", "You", "Open"],
        [5, "Log before/after evidence and next recommended paid step.", "You", "Open"],
    ])
    enriched.setdefault("Client Handoff", [
        ["Section", "Client-facing detail", "Owner", "Status"],
        ["What changed", f"Summarize the finished {asset.title.lower()} in plain language.", "You", "Open"],
        ["Approval needed", "List facts, prices, dates, claims, or policy details the client must confirm.", "Client", "Open"],
        ["Files delivered", "Name the editable file, final export, and any screenshots or source notes.", "You", "Open"],
        ["Recommended next step", "State the next paid step or implementation action.", "You", "Open"],
        ["Renewal trigger", "Define when to follow up: weekly, monthly, or after a measurable event.", "You", "Open"],
    ])
    enriched.setdefault("QA Checklist", [
        ["Check", "Required?", "Status", "Notes"],
        ["All placeholders removed or marked", "Yes", "Open", ""],
        ["Links, prices, dates, hours, and claims verified", "Yes", "Open", ""],
        ["Buyer approval captured for sensitive details", "Yes", "Open", ""],
        ["Final export opens correctly", "Yes", "Open", ""],
        ["No guaranteed revenue/ranking/performance claims", "Yes", "Open", ""],
        ["Filename includes buyer, asset, and date", "No", "Open", ""],
    ])
    enriched.setdefault("Renewal Tracker", [
        ["Date", "Client", "Delivered Asset", "Measured Signal", "Next Offer", "Status"],
        ["2026-07-01", "Example Client", asset.title, "Approval received", "Monthly refresh", "Open"],
        ["", "", "", "", "", "Open"],
        ["", "", "", "", "", "Open"],
    ])
    return enriched


def make_xlsx(path: Path, asset: Asset) -> None:
    sheets = enrich_workbook(asset, workbook_for(asset.id))
    workbook_sheets = []
    rels = []
    content_overrides = []
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for idx, (name, rows) in enumerate(sheets.items(), start=1):
            z.writestr(f"xl/worksheets/sheet{idx}.xml", sheet_xml(rows))
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
        z.writestr("xl/styles.xml", """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3"><font><sz val="10"/><name val="Aptos"/><color rgb="FF070A0F"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="10"/><name val="Aptos"/></font><font><sz val="9"/><name val="Aptos"/><color rgb="FF12172A"/></font></fonts>
  <fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF12172A"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFF7F1"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF7FAFC"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="2"><border/><border><left style="thin"><color rgb="FFD7DEE6"/></left><right style="thin"><color rgb="FFD7DEE6"/></right><top style="thin"><color rgb="FFD7DEE6"/></top><bottom style="thin"><color rgb="FFD7DEE6"/></bottom></border></borders>
  <cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf></cellXfs>
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
                make_xlsx(path, asset)
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
