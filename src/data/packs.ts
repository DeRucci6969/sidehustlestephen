export type PackAsset = {
  id: string;
  title: string;
  type: "PDF" | "XLSX" | "DOCX" | "ZIP" | "Template";
  description: string;
};

export type BusinessPack = {
  slug: string;
  title: string;
  hook: string;
  category: string;
  buyer: string;
  startupCost: string;
  timeToFirstSale: string;
  difficulty: "Easy" | "Medium" | "Hard";
  summary: string;
  whyItWorks: string;
  firstSteps: string[];
  caveat: string;
  featured?: boolean;
  popularityScore: number;
  publishedAt: string;
  assets: PackAsset[];
};

export type PackPageDetail = {
  problem: string;
  solution: string;
  delivery: string;
  firstClients: string;
  whyDetails: string[];
  firstMoveAnalysis: string[];
  launchSprintDetails: string[];
  firstTenLeadsPlan?: string[];
};

export const packs: BusinessPack[] = [
  {
    slug: "cafe-menu-refresh-package",
    title: "Cafe Menu Refresh Package",
    hook: "If you can use Canva, sell this to local cafes.",
    category: "Local Service",
    buyer: "Independent cafes",
    startupCost: "$0-$50",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "A productized local service that refreshes cafe menus across print, Instagram, Google Business, and QR assets.",
    whyItWorks: "Cafes change specials, prices, and hours constantly, but their customer-facing menus are often outdated in several places.",
    firstSteps: ["Find outdated menus", "Send one fixed mockup", "Offer a monthly refresh"],
    caveat: "Fast turnaround matters more than fancy design.",
    featured: true,
    popularityScore: 98,
    publishedAt: "2026-06-09",
    assets: [
      { id: "asset-cafe-script", title: "Cafe Outreach Script", type: "DOCX", description: "Cold DM and email scripts for first contact." },
      { id: "asset-cafe-pricing", title: "Menu Refresh Pricing Sheet", type: "XLSX", description: "Starter, standard, and retainer pricing ladder." },
      { id: "asset-cafe-checklist", title: "Delivery Checklist", type: "PDF", description: "What to check before sending final assets." },
      { id: "asset-cafe-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for cafe audits, menu copy, outreach, handoff notes, and monthly refresh ideas." },
      { id: "asset-cafe-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for menu files, brand details, approvals, and delivery formats." },
      { id: "asset-cafe-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for outreach, intake, approvals, delivery, follow-up, and monthly refresh offers." },
      { id: "asset-cafe-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for scope, turnaround, approvals, files, and exclusions." },
    ],
  },
  {
    slug: "google-business-profile-rescue",
    title: "Google Business Profile Rescue",
    hook: "Most local businesses lose trust before people visit.",
    category: "Local Service",
    buyer: "Local service businesses",
    startupCost: "$0",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "A fast audit-and-fix sprint for photos, services, categories, hours, FAQs, and review prompts.",
    whyItWorks: "Google Business Profiles influence local trust, but many small businesses leave obvious profile issues unfixed.",
    firstSteps: ["Audit one profile", "Record visible fixes", "Pitch a rescue sprint"],
    caveat: "Do not promise rankings; sell profile hygiene and clarity.",
    featured: true,
    popularityScore: 95,
    publishedAt: "2026-06-08",
    assets: [
      { id: "asset-gbp-audit", title: "Profile Audit Checklist", type: "PDF", description: "A scan list for profile photos, categories, hours, and FAQs." },
      { id: "asset-gbp-pitch", title: "Rescue Sprint Pitch", type: "DOCX", description: "Email and Loom pitch structure." },
      { id: "asset-gbp-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for profile audits, service descriptions, FAQs, review prompts, and rescue sprint delivery." },
      { id: "asset-gbp-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for profile access, services, hours, photos, FAQs, and approvals." },
      { id: "asset-gbp-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for mini audits, rescue sprint sales, owner approvals, delivery, and review requests." },
      { id: "asset-gbp-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for profile scope, ranking disclaimers, access, approvals, and maintenance." },
    ],
  },
  {
    slug: "gym-churn-report",
    title: "Boutique Gym Churn Report",
    hook: "Gyms know members cancel, but not why.",
    category: "B2B Service",
    buyer: "Boutique gyms and studios",
    startupCost: "$0",
    timeToFirstSale: "2-4 weeks",
    difficulty: "Medium",
    summary: "A monthly retention report that turns messy cancellation reasons into three actionable fixes.",
    whyItWorks: "Retention is directly tied to gym revenue, and small studios rarely have clean insight into churn reasons.",
    firstSteps: ["Define cancellation tags", "Build a simple report", "Pitch a monthly review"],
    caveat: "You need clean enough data and owner buy-in.",
    featured: true,
    popularityScore: 92,
    publishedAt: "2026-06-07",
    assets: [
      { id: "asset-gym-report", title: "Churn Report Template", type: "XLSX", description: "A spreadsheet for tagging cancellations and surfacing trends." },
      { id: "asset-gym-call", title: "Retention Review Agenda", type: "PDF", description: "Monthly call structure and recommendations format." },
      { id: "asset-gym-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for cancellation analysis, retention recommendations, owner calls, and member-save experiments." },
      { id: "asset-gym-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for cancellation exports, privacy, churn tags, memberships, and goals." },
      { id: "asset-gym-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for gym owner outreach, data requests, report delivery, action follow-up, and renewal." },
      { id: "asset-gym-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for data needs, privacy, retention claims, cadence, and staff involvement." },
    ],
  },
  {
    slug: "shopify-cart-audit",
    title: "Shopify Cart Audit Pack",
    hook: "Most small stores do not need more traffic first.",
    category: "Ecommerce",
    buyer: "Small Shopify stores",
    startupCost: "$0",
    timeToFirstSale: "1-7 days",
    difficulty: "Medium",
    summary: "An abandoned-cart and checkout trust audit for small ecommerce brands.",
    whyItWorks: "Store owners already care about conversion, and a concrete audit is easier to buy than vague marketing help.",
    firstSteps: ["Review checkout friction", "Audit abandoned emails", "Send a priority fix list"],
    caveat: "Avoid promising revenue lift without data.",
    popularityScore: 89,
    publishedAt: "2026-06-06",
    assets: [
      { id: "asset-shopify-audit", title: "Cart Audit Checklist", type: "PDF", description: "A practical review checklist for cart and checkout friction." },
      { id: "asset-shopify-email", title: "Abandoned Cart Email Swipe", type: "DOCX", description: "Starter copy blocks for small stores." },
      { id: "asset-shopify-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for store audits, checkout objections, abandoned-cart copy, and fix prioritisation." },
      { id: "asset-shopify-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for store access, products, policies, email platform, voice, and claims." },
      { id: "asset-shopify-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for audit outreach, policy requests, findings delivery, implementation follow-up, and upsells." },
      { id: "asset-shopify-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for audit scope, conversion disclaimers, access, implementation, and compliance." },
    ],
  },
  {
    slug: "ugc-brief-generator",
    title: "UGC Brief Generator",
    hook: "Brands do not need more creators. They need better briefs.",
    category: "Creator Business",
    buyer: "Ecommerce brands",
    startupCost: "$0",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "A productized service that creates product-specific creator briefs, hooks, shot lists, and usage notes.",
    whyItWorks: "Short-form ad production breaks down when brands give creators vague instructions.",
    firstSteps: ["Pick one product", "Write five hooks", "Package a creator brief"],
    caveat: "The brief must be specific enough to improve output.",
    popularityScore: 88,
    publishedAt: "2026-06-05",
    assets: [
      { id: "asset-ugc-brief", title: "UGC Brief Template", type: "DOCX", description: "A complete structure for product-specific creator briefs." },
      { id: "asset-ugc-hooks", title: "Hook Bank", type: "PDF", description: "Reusable short-form ad hook patterns." },
      { id: "asset-ugc-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for product angles, creator briefs, hook variations, shot lists, and usage-rights checks." },
      { id: "asset-ugc-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for product facts, objections, proof points, creator constraints, and rights." },
      { id: "asset-ugc-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for brand outreach, product info requests, brief delivery, revisions, and retainers." },
      { id: "asset-ugc-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for brief scope, creator responsibilities, claim safety, usage rights, and revisions." },
    ],
  },
  {
    slug: "realtor-suburb-snapshot",
    title: "Realtor Suburb Snapshot Reports",
    hook: "Real estate agents need local content every week.",
    category: "B2B Service",
    buyer: "Real estate agents",
    startupCost: "$0",
    timeToFirstSale: "2-4 weeks",
    difficulty: "Medium",
    summary: "A recurring local market snapshot agents can post, email, or use in lead nurture.",
    whyItWorks: "Agents already pay for local positioning and lead generation; suburb-specific reports are repeatable.",
    firstSteps: ["Choose one suburb", "Create a sample report", "Pitch local agents"],
    caveat: "Use public data carefully and cite sources.",
    popularityScore: 86,
    publishedAt: "2026-06-04",
    assets: [
      { id: "asset-realtor-report", title: "Suburb Snapshot Template", type: "XLSX", description: "A repeatable structure for local market summaries." },
      { id: "asset-realtor-pitch", title: "Agent Pitch Script", type: "DOCX", description: "Outreach script for agents and principals." },
      { id: "asset-realtor-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for suburb summaries, agent content, source-safe commentary, and appraisal lead nurture." },
      { id: "asset-realtor-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for suburbs, data sources, agency tone, compliance, and cadence." },
      { id: "asset-realtor-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for agent outreach, sample delivery, source requests, weekly handoff, and renewal." },
      { id: "asset-realtor-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for source use, compliance, market commentary limits, cadence, and deliverables." },
    ],
  },
  {
    slug: "ai-inbox-triage-trades",
    title: "AI Inbox Triage for Trades",
    hook: "Plumbers do not need an AI agent. They need inbox triage.",
    category: "AI Tool",
    buyer: "Trades businesses",
    startupCost: "$1-$50",
    timeToFirstSale: "2-4 weeks",
    difficulty: "Medium",
    summary: "A lightweight lead triage workflow that labels requests, drafts replies, and summarizes quote opportunities.",
    whyItWorks: "Trades businesses lose leads when messages sit unanswered or arrive without clear job details.",
    firstSteps: ["Map inquiry types", "Create reply templates", "Set up approval workflow"],
    caveat: "Keep human approval in the loop.",
    popularityScore: 84,
    publishedAt: "2026-06-03",
    assets: [
      { id: "asset-trades-map", title: "Inbox Workflow Map", type: "PDF", description: "A simple lead triage workflow diagram." },
      { id: "asset-trades-replies", title: "Reply Template Pack", type: "DOCX", description: "Common quote and follow-up response templates." },
      { id: "asset-trades-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for lead classification, missing-info replies, quote triage, and owner-approved workflows." },
      { id: "asset-trades-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for inquiry types, emergency rules, quote fields, roles, and channels." },
      { id: "asset-trades-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for owner outreach, workflow setup, approval rules, weekly summaries, and triage." },
      { id: "asset-trades-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for human approval, emergency handling, inbox access, setup, and limits." },
    ],
  },
  {
    slug: "review-testimonial-service",
    title: "Review Reply + Testimonial Clips",
    hook: "Turn boring customer reviews into sales assets.",
    category: "B2B Service",
    buyer: "Local businesses",
    startupCost: "$1-$50",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "A monthly service that replies to reviews, extracts testimonial claims, and creates simple trust graphics.",
    whyItWorks: "Businesses collect trust signals but rarely package them into reusable marketing assets.",
    firstSteps: ["Audit recent reviews", "Write reply examples", "Create testimonial cards"],
    caveat: "Do not invent claims; only repackage real customer language.",
    popularityScore: 82,
    publishedAt: "2026-06-02",
    assets: [
      { id: "asset-reviews-replies", title: "Review Reply Swipe File", type: "DOCX", description: "Tone-safe reply examples for positive and negative reviews." },
      { id: "asset-reviews-cards", title: "Testimonial Card Specs", type: "PDF", description: "Formats for turning reviews into social proof graphics." },
      { id: "asset-reviews-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for review replies, testimonial extraction, trust-card copy, and escalation-safe language." },
      { id: "asset-reviews-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for review platforms, reply tone, escalation, claims, and design approvals." },
      { id: "asset-reviews-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for outreach, review approval, monthly delivery, escalation notes, and testimonial usage." },
      { id: "asset-reviews-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for review replies, testimonial permissions, escalation, claim safety, and cadence." },
    ],
  },
  {
    slug: "manual-workflow-concierge",
    title: "Manual Workflow Concierge",
    hook: "Do not build the AI app. Sell the manual workflow first.",
    category: "AI Tool",
    buyer: "Niche B2B operators",
    startupCost: "$0",
    timeToFirstSale: "2-4 weeks",
    difficulty: "Hard",
    summary: "A validation-first startup wedge: sell a manual workflow service before automating the repeated parts.",
    whyItWorks: "Manual delivery proves buyer demand and exposes the real automation requirements before software spend.",
    firstSteps: ["Pick one niche", "Deliver one weekly outcome", "Automate only repeated steps"],
    caveat: "This requires sales and niche discipline.",
    featured: true,
    popularityScore: 91,
    publishedAt: "2026-06-01",
    assets: [
      { id: "asset-manual-score", title: "Manual Validation Scorecard", type: "PDF", description: "Criteria for deciding whether to automate." },
      { id: "asset-manual-workflow", title: "Workflow Concierge Template", type: "DOCX", description: "Offer structure and delivery map." },
      { id: "asset-manual-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for niche selection, workflow mapping, manual SOPs, client reports, and automation backlog decisions." },
      { id: "asset-manual-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for workflow pain, process, inputs, approvals, exceptions, and success criteria." },
      { id: "asset-manual-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for niche outreach, pilot setup, input requests, weekly reporting, and renewal." },
      { id: "asset-manual-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for manual-first delivery, software boundaries, pilot scope, data, and automation timing." },
    ],
  },
  {
    slug: "airbnb-guest-guide-refresh",
    title: "Airbnb Guest Guide Refresh",
    hook: "Hosts forget the easiest guest-experience upgrade.",
    category: "Local Service",
    buyer: "Short-term rental hosts",
    startupCost: "$0",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "A polished digital guest guide with local tips, house rules, arrival info, and upsell opportunities.",
    whyItWorks: "Hosts need fewer repetitive questions and better guest experience without installing new software.",
    firstSteps: ["Audit one listing", "Draft a guide outline", "Offer a refresh package"],
    caveat: "Local recommendations need to stay current.",
    popularityScore: 79,
    publishedAt: "2026-05-31",
    assets: [
      { id: "asset-airbnb-outline", title: "Guest Guide Outline", type: "DOCX", description: "Sections and prompts for a polished guest guide." },
      { id: "asset-airbnb-upsell", title: "Host Upsell Ideas", type: "PDF", description: "Simple optional add-ons hosts can include." },
      { id: "asset-airbnb-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for guest-guide copy, local recommendations, house-rule clarity, and host upsell ideas." },
      { id: "asset-airbnb-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for listing details, check-in steps, rules, recommendations, and approvals." },
      { id: "asset-airbnb-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for host outreach, guest-guide intake, fact approvals, final handoff, and refresh reminders." },
      { id: "asset-airbnb-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for guide scope, approvals, local checks, guest messaging, and refresh cadence." },
    ],
  },
];

export function getPack(slug: string) {
  return packs.find((pack) => pack.slug === slug);
}

export const packPageDetails: Record<string, PackPageDetail> = {
  "cafe-menu-refresh-package": {
    problem:
      "Independent cafes often update specials, prices, opening hours, and menu items in scattered places: a printed menu, an Instagram post, a Google profile, a QR menu, and sometimes a handwritten counter sign. Customers see mismatched information, staff answer the same questions repeatedly, and the owner keeps postponing a cleanup because it feels like design work.",
    solution:
      "You offer a fixed-scope menu refresh that turns the cafe's existing information into clean, matching customer-facing assets: print menu, Instagram panels, QR-ready menu, Google menu check, and a small update checklist.",
    delivery:
      "Start by collecting the current menu, prices, specials, logo, and Google profile link. Build one sample menu section first, get approval, then complete the final exports and send a short handoff showing what changed and what the owner must approve before publishing.",
    firstClients:
      "Walk or search a local cafe strip, identify outdated menu photos or inconsistent specials, create one visible before/after mockup, and send it directly to the owner with a tiny paid starter offer.",
    whyDetails: [
      "The pain is visible before a sales call, so prospecting is concrete: blurry menu photos, old specials, missing QR links, and mismatched pricing are easy to spot.",
      "The buyer already understands the value of menus because customers use them every day. You are not educating the market; you are removing a neglected operational annoyance.",
      "The work naturally becomes recurring when specials, seasonal items, prices, or hours change.",
    ],
    firstMoveAnalysis: [
      "Do not start by pitching a redesign. Start by finding one visible inconsistency and fixing a tiny section so the owner can judge taste and speed.",
      "Keep the first paid offer narrow: one menu refresh, one approval round, final files. Add monthly refresh only after the owner sees the first handoff.",
      "Photograph or screenshot the before state so renewal conversations are based on proof, not vague design preference.",
    ],
    launchSprintDetails: [
      "Day 1: list 30 cafes and capture one visible menu issue for each.",
      "Day 2: create 3 sample before/after menu sections for the best prospects.",
      "Day 3-4: send owner-specific DMs/emails with the sample and a fixed starter price.",
      "Day 5-7: close one paid refresh, collect source files, deliver the first version within 48 hours, and ask about a monthly specials retainer.",
    ],
    firstTenLeadsPlan: [
      "Search Google Maps for cafes within one suburb or walking strip.",
      "Prioritise independent cafes with active Instagram posts and older Google menu photos.",
      "Capture one screenshot of the outdated menu, price mismatch, missing QR link, or unclear specials board.",
      "Check whether the cafe posts specials, seasonal items, catering, or events at least monthly.",
      "Choose 10 cafes where the owner can see the issue without a long explanation.",
      "Make three small mockups only: one counter menu section, one Instagram specials tile, and one QR menu check note.",
      "Send the mockup to the owner or manager with a fixed starter offer and 48-hour turnaround.",
      "Follow up after two days with one extra observation, not a generic reminder.",
      "Offer the smallest paid version first: one menu section plus final export checklist.",
      "After delivery, ask whether they want a monthly specials refresh before the next menu change.",
    ],
  },
  "google-business-profile-rescue": {
    problem:
      "Local businesses lose trust on Google before a customer ever calls. Hours are stale, photos are weak, services are incomplete, FAQs are missing, and review replies are inconsistent. Owners know Google matters, but the profile is usually nobody's daily job.",
    solution:
      "You sell a profile rescue sprint: audit the public profile, prepare fixes for categories, services, photos, hours, FAQs, and review prompts, then hand the owner an approval-ready cleanup plan.",
    delivery:
      "Capture before screenshots, score the profile, write customer-language service descriptions, prepare FAQ/review prompt drafts, and give the owner a short implementation checklist. Avoid ranking promises; sell profile clarity.",
    firstClients:
      "Search local service categories in your area and find profiles with obvious trust gaps. Send a 3-point audit and offer a fixed-fee rescue sprint.",
    whyDetails: [
      "The buyer can see the problem immediately because Google is public and customer-facing.",
      "The work is bounded: you are improving completeness, clarity, and trust signals, not trying to become their full marketing agency.",
      "Owners are used to paying for local visibility, but this offer is easier to buy because it focuses on visible profile hygiene.",
    ],
    firstMoveAnalysis: [
      "Lead with screenshots, not theory. Show exactly what a customer sees and why it creates hesitation.",
      "Use no-guarantee language from the start. That makes the offer more credible and reduces compliance risk.",
      "Pick businesses where the owner is active elsewhere online; they already care, but Google is lagging.",
    ],
    launchSprintDetails: [
      "Day 1: pick one local category and audit 25 profiles.",
      "Day 2: create 5 mini-audits with screenshots and one recommended fix each.",
      "Day 3-5: send mini-audits with a fixed rescue sprint offer.",
      "Day 6-7: deliver the first sprint as an approval pack: profile score, copy drafts, photo checklist, FAQ prompts, and review prompt.",
    ],
  },
  "gym-churn-report": {
    problem:
      "Boutique gyms see cancellations every month but rarely know what is controllable. Cancellation notes sit in inboxes, spreadsheets, or staff memory. Owners react emotionally, discount too quickly, or miss patterns around timetable, onboarding, injury, price, and member experience.",
    solution:
      "You offer a monthly churn report that tags cancellations, separates controllable from non-controllable reasons, estimates revenue at risk, and turns the top patterns into three owner-assigned retention actions.",
    delivery:
      "Collect cancellation notes, tag each cancellation, summarize trends, calculate save rate and revenue at risk, then run a short monthly review call with a focused action plan.",
    firstClients:
      "Start with boutique studios that already run memberships and have public signs of retention pressure: class packs, intro offers, schedule changes, or heavy promotional posting.",
    whyDetails: [
      "Retention is directly tied to revenue, so the owner already feels the cost of churn.",
      "The service is not abstract analytics. It turns messy cancellation reasons into a short action plan the studio can use next month.",
      "It fits a retainer because cancellations are recurring and the value compounds as monthly trend data builds.",
    ],
    firstMoveAnalysis: [
      "Do not ask for full system access first. Offer a manual sample using anonymized cancellation reasons or a small exported list.",
      "The first report should be simple enough for an owner to read in 10 minutes.",
      "Recommendations must be operational: call this group, test this save script, adjust this class window, improve this onboarding step.",
    ],
    launchSprintDetails: [
      "Week 1: create a sample report with realistic dummy data and a one-page retention agenda.",
      "Week 1-2: contact 30 boutique gyms with a churn-review sample and ask who handles cancellations.",
      "Week 2-3: run one paid manual report from exported cancellation notes.",
      "Week 4: review results with the owner and propose a monthly retention report cadence.",
    ],
  },
  "shopify-cart-audit": {
    problem:
      "Small Shopify stores often chase more traffic while the cart and checkout still create hesitation. Delivery timing is unclear, returns are buried, product proof is weak, coupon boxes distract, and abandoned-cart emails repeat generic reminders instead of answering objections.",
    solution:
      "You offer a cart and trust audit that identifies the highest-confidence friction points, rewrites the abandoned-cart sequence, and gives the store owner a prioritized fix list.",
    delivery:
      "Review product pages, cart, checkout flow, shipping/returns language, mobile readability, and abandoned-cart emails. Rank each issue by impact and effort, then deliver copy blocks and implementation notes.",
    firstClients:
      "Find small stores running ads or posting actively, add products to cart on mobile, and capture three trust/friction observations. Pitch a paid audit using those screenshots.",
    whyDetails: [
      "Store owners already care about conversion, so the offer maps to an existing priority.",
      "The audit is easier to buy than vague marketing help because the deliverable is a concrete list of fixes and copy.",
      "You can deliver manually without needing access to the store at first; screenshots and public flows reveal enough for a paid diagnostic.",
    ],
    firstMoveAnalysis: [
      "Lead with one friction screenshot, not a claim about conversion lift.",
      "Avoid revenue guarantees. Frame recommendations around confidence, clarity, and reduced hesitation.",
      "Prioritize fixes the owner can implement quickly before suggesting deeper redesign.",
    ],
    launchSprintDetails: [
      "Day 1: audit 20 small Shopify stores on mobile and save screenshots.",
      "Day 2: write 5 short teardown emails with one cart issue and one abandoned-email idea.",
      "Day 3-5: pitch a fixed-fee audit with a 48-hour turnaround.",
      "Day 6-7: deliver one audit with prioritized fixes, email swipe copy, and a retest checklist.",
    ],
  },
  "ugc-brief-generator": {
    problem:
      "Brands ask creators for content but give vague briefs: show the product, make it feel natural, include a CTA. Creators then guess the angle, miss the proof points, and produce footage that is hard for the brand to use in organic or paid channels.",
    solution:
      "You create product-specific UGC briefs with audience insight, hooks, shot lists, proof points, objection angles, usage notes, and approval requirements.",
    delivery:
      "Pick one product, research the page and reviews, identify buyer objections, write hooks and shots, and package the brief so a creator can film without needing a long brand call.",
    firstClients:
      "Start with ecommerce brands already using creators or ads. Rewrite one weak product brief as a sample and send it to the founder or marketing lead.",
    whyDetails: [
      "Brands do not need to be convinced that content matters; they need better direction for the content they already commission.",
      "The deliverable is fast to understand because a good brief immediately feels more specific than a generic creator request.",
      "The service can expand into monthly briefs, hook testing, creator feedback, or ad concept libraries.",
    ],
    firstMoveAnalysis: [
      "Do not sell content strategy broadly. Sell one improved brief for one product.",
      "Mine reviews for exact customer language; that is where useful hooks and objections come from.",
      "Specify usage rights and claim boundaries so the brief is commercially usable.",
    ],
    launchSprintDetails: [
      "Day 1: choose 10 ecommerce brands with creator-style content.",
      "Day 2: create 3 sample mini-briefs for specific products.",
      "Day 3-5: send the sample and offer a paid full brief pack.",
      "Day 6-7: deliver one full brief with hooks, shot list, claims checklist, and approval notes.",
    ],
  },
  "realtor-suburb-snapshot": {
    problem:
      "Real estate agents need weekly local content, but many posts are generic, reactive, or not backed by useful suburb-specific data. Sellers and buyers want local context, while agents need repeatable material for social, email, and lead nurture.",
    solution:
      "You create a weekly suburb snapshot that turns public market data into plain-English talking points, social captions, email copy, and follow-up prompts.",
    delivery:
      "Choose one suburb, collect public data with sources, summarize movements carefully, write three talking points, and package the snapshot into content formats the agent can publish after approval.",
    firstClients:
      "Target agents who post regularly but lack consistent suburb-specific analysis. Send a one-page sample for their core suburb.",
    whyDetails: [
      "Agents already pay for positioning and content; this gives them a recurring local asset.",
      "The deliverable is repeatable by suburb, agency, or agent pod.",
      "Source discipline makes the service feel professional and reduces risk around unsupported market claims.",
    ],
    firstMoveAnalysis: [
      "Do not pitch national market commentary. Pick one suburb and one agent's existing audience.",
      "Use sources and dates. If a metric is missing, say so rather than guessing.",
      "Make the output immediately publishable: one snapshot, one email intro, two captions.",
    ],
    launchSprintDetails: [
      "Week 1: build one source-backed sample for a suburb with active agents.",
      "Week 1-2: pitch 25 agents or principals with the sample.",
      "Week 2-3: deliver one paid weekly snapshot and get approval feedback.",
      "Week 4: propose a four-week content retainer for one suburb.",
    ],
  },
  "ai-inbox-triage-trades": {
    problem:
      "Trades businesses miss leads because messages arrive across forms, email, SMS, and social channels with incomplete job details. Urgent jobs need phone handling, quote requests need structured follow-up, and admin/supplier messages clutter the queue.",
    solution:
      "You set up a lightweight inbox triage workflow that classifies inquiries, requests missing information, drafts replies, and keeps human approval before anything is sent.",
    delivery:
      "Map inquiry types, define required fields, write reply templates, build labels or folders, and create a daily summary of quote opportunities and urgent items.",
    firstClients:
      "Start with trades businesses that visibly use forms or social DMs and have slow or inconsistent response patterns. Pitch a manual triage setup before offering automation.",
    whyDetails: [
      "The buyer understands missed calls and unanswered messages as lost revenue.",
      "The service improves response quality without asking the business to trust a fully autonomous AI agent.",
      "Human approval makes the offer safer for urgent, price-sensitive, and complaint messages.",
    ],
    firstMoveAnalysis: [
      "Do not lead with AI. Lead with faster lead handling and cleaner quote information.",
      "Start with manual labels and templates before automating anything.",
      "Use urgent/safety rules from the start so the workflow does not create operational risk.",
    ],
    launchSprintDetails: [
      "Week 1: interview or observe one trades inbox workflow and map common inquiry types.",
      "Week 1-2: create reply templates for quote, emergency, missing info, follow-up, and no-fit messages.",
      "Week 2-3: sell a paid setup for labels, templates, and daily summary format.",
      "Week 4: propose ongoing triage or incremental automation for repeated low-risk steps.",
    ],
  },
  "review-testimonial-service": {
    problem:
      "Local businesses collect reviews but rarely turn them into reusable trust assets. Positive reviews sit on Google, negative reviews get inconsistent replies, and testimonial language is not repackaged into social, website, or sales material.",
    solution:
      "You offer a monthly review reply and testimonial repackaging service: write tone-safe replies, extract approved proof claims, and create simple card specs for reuse.",
    delivery:
      "Audit recent reviews, draft replies by sentiment, flag escalation risks, extract exact customer language, and package approved quotes into card formats and website snippets.",
    firstClients:
      "Find local businesses with recent reviews and inconsistent responses. Send two sample replies and one testimonial card idea using only approved public review language.",
    whyDetails: [
      "Reviews are already proof; the business just has not operationalized them.",
      "The monthly cadence matches how reviews arrive over time.",
      "The work combines reputation hygiene with marketing reuse, making the value easier to justify.",
    ],
    firstMoveAnalysis: [
      "Never invent claims. Use exact review language and ask approval before public repackaging.",
      "Escalate legal, privacy, safety, refund, or staff-specific issues instead of using a swipe file.",
      "Start with a small review batch so the owner can judge tone.",
    ],
    launchSprintDetails: [
      "Day 1: find 30 local businesses with unanswered or uneven review replies.",
      "Day 2: create 5 sample reply packs and testimonial card concepts.",
      "Day 3-5: pitch a monthly review hygiene and testimonial service.",
      "Day 6-7: deliver one batch: replies, escalation log, extracted claims, and card specs.",
    ],
  },
  "manual-workflow-concierge": {
    problem:
      "Founders often try to build AI software before proving that anyone will pay for the outcome. They automate too early, hide behind product work, and miss the messy human workflow that actually defines the business.",
    solution:
      "You sell the outcome manually first: a concierge workflow that delivers one repeated business result, logs exceptions, tracks delivery time, and reveals what should eventually be automated.",
    delivery:
      "Pick one niche, define one weekly outcome, collect inputs, deliver manually with a QA checklist, track repeated steps, and only automate the smallest low-risk task after paid demand is proven.",
    firstClients:
      "Find niche operators who already do the painful workflow manually or inconsistently. Sell a pilot outcome, not software access.",
    whyDetails: [
      "Manual delivery proves willingness to pay before engineering spend.",
      "The workflow exposes real edge cases that a speculative product brief would miss.",
      "The offer can generate revenue while producing the requirements for future automation.",
    ],
    firstMoveAnalysis: [
      "Avoid broad niches. Pick a narrow buyer with a repeated operational pain and a clear weekly output.",
      "Price the first pilot as a service. Compliments are not validation; paid delivery is.",
      "Track exceptions obsessively. Exceptions show where software will break later.",
    ],
    launchSprintDetails: [
      "Week 1: choose one niche and write a one-sentence weekly outcome.",
      "Week 1-2: interview 10 operators and sell one manual pilot.",
      "Week 2-3: deliver the outcome manually and log time, inputs, decisions, and exceptions.",
      "Week 4: decide whether to continue manually, raise price, narrow the niche, or automate one repeated step.",
    ],
  },
  "airbnb-guest-guide-refresh": {
    problem:
      "Short-term rental hosts answer the same guest questions repeatedly: parking, check-in, Wi-Fi, bins, appliances, local recommendations, and checkout. Existing guidebooks are often stale, scattered, or too vague to prevent messages.",
    solution:
      "You create a polished digital guest guide that clarifies arrival, house rules, local recommendations, emergency details, checkout, and optional host-approved upsells.",
    delivery:
      "Audit the listing and guest friction points, collect host rules and local picks, write guest-friendly instructions, organize the guide, and deliver a refresh checklist so the host can keep it current.",
    firstClients:
      "Start with hosts whose listings mention repeated rules or have reviews referencing communication, arrival, parking, or amenities. Offer a fixed guest guide refresh.",
    whyDetails: [
      "Hosts feel the cost through repeated guest messages and preventable confusion.",
      "The output is easy to judge because a good guide immediately feels clearer and more guest-friendly.",
      "Upsells and local recommendations create an obvious expansion path when they are operationally easy for the host.",
    ],
    firstMoveAnalysis: [
      "Do not start with design. Start by removing the top five guest questions.",
      "Test the access instructions with someone who has never visited.",
      "Keep rules firm but hospitable; harsh copy can damage guest experience.",
    ],
    launchSprintDetails: [
      "Day 1: audit 20 listings for repeated guest friction clues.",
      "Day 2: create one sample arrival/check-in page for a host.",
      "Day 3-5: pitch a fixed refresh with guide outline, local picks, and checkout instructions.",
      "Day 6-7: deliver the guide, approval checklist, and optional upsell ideas.",
    ],
  },
};

export const memberAssetDetails: Record<string, string> = {
  "asset-cafe-script":
    "A DOCX outreach pack with cold email, DM, Loom, follow-up, objection handling, intake prompts, a worked cafe prospect example, and handoff copy you can adapt before contacting owners.",
  "asset-cafe-pricing":
    "An XLSX workbook with pricing ladder, quote builder, retainer tracker, client input checklist, worked example, delivery runbook, QA checklist, and renewal tracker.",
  "asset-cafe-checklist":
    "A branded PDF checklist for final delivery: print/social/QR exports, owner approval, before-after evidence, quality checks, and client handoff standards.",
  "asset-cafe-prompts":
    "A DOCX AI prompt pack with cafe audit prompts, menu copy prompts, outreach prompts, refresh-retainer prompts, handoff prompts, and final QA checks for owner-approved delivery.",
  "asset-cafe-intake":
    "A DOCX client intake form for cafe source files, menu facts, brand details, QR/menu links, export formats, owner approvals, and renewal triggers.",
  "asset-cafe-email-templates":
    "A DOCX email template pack for cafe outreach, sample offers, client intake, approval requests, final delivery, follow-ups, and monthly refresh pitches.",
  "asset-cafe-faqs":
    "A DOCX buyer FAQ pack covering menu refresh scope, turnaround, source files, approval rules, deliverables, retainer options, and exclusions.",
  "asset-gbp-audit":
    "A PDF audit worksheet covering categories, services, photos, reviews, FAQs, profile trust gaps, profile rescue examples, and owner approval checkpoints.",
  "asset-gbp-pitch":
    "A DOCX pitch kit with email copy, Loom structure, proposal bullets, no-ranking-guarantee language, and risk-safe positioning for local business owners.",
  "asset-gbp-prompts":
    "A DOCX AI prompt pack for Google Business Profile rescue work, including profile audit prompts, service-description prompts, FAQ prompts, ethical review-request prompts, and sprint handoff prompts.",
  "asset-gbp-intake":
    "A DOCX client intake form for profile access, categories, services, hours, photos, FAQs, review rules, approval owners, and maintenance preferences.",
  "asset-gbp-email-templates":
    "A DOCX email template pack for profile mini-audits, rescue sprint pitches, owner approval requests, final handoffs, and ethical review-request copy.",
  "asset-gbp-faqs":
    "A DOCX buyer FAQ pack covering profile rescue scope, ranking disclaimers, access requirements, owner approvals, review rules, and ongoing maintenance.",
  "asset-gym-report":
    "An XLSX retention workbook with raw cancellation tagging, dashboard formulas, revenue-at-risk summary, action plan, call notes, worked example, QA, and renewal tracking.",
  "asset-gym-call":
    "A PDF agenda and recommendation guide for a monthly churn review, including save-rate discussion, controllable churn analysis, sample recommendations, and next-action ownership.",
  "asset-gym-prompts":
    "A DOCX AI prompt pack for boutique gym churn work, including anonymised cancellation analysis, retention experiments, save-flow copy, owner-call agendas, and monthly report handoff prompts.",
  "asset-gym-intake":
    "A DOCX client intake form for cancellation exports, anonymisation rules, churn tags, membership types, retention goals, staff involvement, and data caveats.",
  "asset-gym-email-templates":
    "A DOCX email template pack for gym owner outreach, churn data requests, report delivery, monthly action follow-up, and retainer renewal.",
  "asset-gym-faqs":
    "A DOCX buyer FAQ pack covering data needs, privacy, retention disclaimers, monthly cadence, owner calls, staff roles, and what the report can and cannot prove.",
  "asset-shopify-audit":
    "A PDF cart and checkout audit checklist with product-page trust scoring, shipping/returns checks, mobile checkout review, priority scoring, and fix ranking.",
  "asset-shopify-email":
    "A DOCX swipe file for abandoned-cart emails with subject lines, preview text, timing notes, segment variants, compliance checks, and a filled skincare example.",
  "asset-shopify-prompts":
    "A DOCX AI prompt pack for Shopify cart audits, covering store-friction analysis, checkout objection prompts, abandoned-cart email prompts, trust microcopy prompts, and client handoff QA.",
  "asset-shopify-intake":
    "A DOCX client intake form for Shopify access, product priorities, shipping and return policies, email platform details, brand voice, approved claims, and implementation constraints.",
  "asset-shopify-email-templates":
    "A DOCX email template pack for store audit outreach, policy requests, findings delivery, implementation follow-up, upsells, and post-audit next steps.",
  "asset-shopify-faqs":
    "A DOCX buyer FAQ pack covering audit scope, conversion disclaimers, store access, abandoned-cart email compliance, implementation limits, and revisions.",
  "asset-ugc-brief":
    "A DOCX creator brief template with audience, proof, claims, hook bank, shot list, usage rights, approval notes, and a finished product brief example.",
  "asset-ugc-hooks":
    "A PDF hook bank with reusable short-form ad hook patterns, selection rules, buyer-awareness guidance, quality checks, and delivery handoff notes.",
  "asset-ugc-prompts":
    "A DOCX AI prompt pack for UGC brief generation, including product-angle prompts, hook prompts, creator brief prompts, shot-list prompts, usage-rights prompts, and claim-safety checks.",
  "asset-ugc-intake":
    "A DOCX client intake form for product facts, target buyer, objections, proof points, prohibited claims, creator constraints, usage rights, and example content.",
  "asset-ugc-email-templates":
    "A DOCX email template pack for ecommerce brand outreach, product information requests, brief delivery, revision requests, creator handoff, and monthly brief retainers.",
  "asset-ugc-faqs":
    "A DOCX buyer FAQ pack covering brief scope, creator responsibilities, usage rights, claim safety, deliverables, revision rounds, and what the pack does not include.",
  "asset-realtor-report":
    "An XLSX suburb snapshot workbook with source log, weekly snapshot formulas, content calendar, lead follow-up prompts, compliance log, worked example, and QA sheets.",
  "asset-realtor-pitch":
    "A DOCX pitch kit for agents and principals with suburb-content outreach, sample weekly deliverable, compliance reminders, follow-up offer, and filled example intro.",
  "asset-realtor-prompts":
    "A DOCX AI prompt pack for realtor suburb reports, including source-backed snapshot prompts, agent content prompts, appraisal lead nurture prompts, compliance-safe commentary, and handoff prompts.",
  "asset-realtor-intake":
    "A DOCX client intake form for target suburbs, preferred sources, agency tone, compliance approval, lead nurture goals, posting cadence, and source caveats.",
  "asset-realtor-email-templates":
    "A DOCX email template pack for agent outreach, sample snapshot delivery, source requests, weekly content handoff, approval follow-up, and retainer renewal.",
  "asset-realtor-faqs":
    "A DOCX buyer FAQ pack covering source use, compliance, market commentary limits, publishing cadence, agency approvals, and recurring deliverables.",
  "asset-trades-map":
    "A PDF workflow map for trades inbox triage with inquiry categories, emergency routing, missing-info rules, approval flow, and client handoff guidance.",
  "asset-trades-replies":
    "A DOCX reply pack with emergency, quote, missing-info, follow-up, no-fit, and trade-specific variants plus human-approval workflow rules.",
  "asset-trades-prompts":
    "A DOCX AI prompt pack for trades inbox triage, including lead classification prompts, missing-information prompts, emergency-safe reply prompts, routing-rule prompts, and weekly report prompts.",
  "asset-trades-intake":
    "A DOCX client intake form for inquiry channels, emergency triggers, quote fields, service areas, approval roles, current templates, and workflow limits.",
  "asset-trades-email-templates":
    "A DOCX email template pack for trades owner outreach, inbox workflow setup, approval rule confirmation, weekly summaries, missing-info patterns, and ongoing triage.",
  "asset-trades-faqs":
    "A DOCX buyer FAQ pack covering human approval, emergency handling, inbox access, AI boundaries, quote rules, implementation, and ongoing workflow support.",
  "asset-reviews-replies":
    "A DOCX swipe file for review replies with positive, neutral, negative, escalation, privacy, testimonial extraction, and public tone rules.",
  "asset-reviews-cards":
    "A PDF testimonial card spec covering square, story, and website banner layouts, quote limits, source context, file naming, and production standards.",
  "asset-reviews-prompts":
    "A DOCX AI prompt pack for review and testimonial services, including reply prompts, escalation prompts, testimonial extraction prompts, social proof copy prompts, and monthly content-plan prompts.",
  "asset-reviews-intake":
    "A DOCX client intake form for review platforms, reply tone, escalation rules, testimonial permission, proof claims, design constraints, and monthly cadence.",
  "asset-reviews-email-templates":
    "A DOCX email template pack for local business outreach, review approval requests, escalation notes, monthly delivery, testimonial usage permission, and renewal.",
  "asset-reviews-faqs":
    "A DOCX buyer FAQ pack covering review reply scope, testimonial permissions, escalation, claim safety, public/private replies, and monthly content handoff.",
  "asset-manual-score":
    "A PDF validation scorecard for deciding whether to automate, including weighted scoring, decision examples, buyer pain criteria, and manual-first guardrails.",
  "asset-manual-workflow":
    "A DOCX concierge workflow template with offer definition, SOP, QA checklist, automation backlog, client report, pricing, and operator dashboard fields.",
  "asset-manual-prompts":
    "A DOCX AI prompt pack for manual workflow concierge launches, including niche scoring prompts, offer prompts, SOP prompts, delivery-log analysis, client report prompts, and automation-backlog prompts.",
  "asset-manual-intake":
    "A DOCX client intake form for workflow pain, current process, input requirements, approval risks, exception handling, delivery cadence, and success criteria.",
  "asset-manual-email-templates":
    "A DOCX email template pack for niche outreach, manual pilot setup, input requests, weekly client reporting, exception follow-up, and renewal after validation.",
  "asset-manual-faqs":
    "A DOCX buyer FAQ pack covering manual-first delivery, software boundaries, pilot scope, data handling, approvals, automation timing, and what validation means.",
  "asset-airbnb-outline":
    "A DOCX guest guide outline with arrival, house rhythm, local recommendations, emergency info, checkout copy, completed sample page, and host approval checklist.",
  "asset-airbnb-upsell":
    "A PDF upsell matrix for host-approved add-ons, including guest triggers, effort/margin scoring, fulfillment rules, guest-facing copy, and approval standards.",
  "asset-airbnb-prompts":
    "A DOCX AI prompt pack for Airbnb guide refreshes, including guest-friction audit prompts, house-rule rewrite prompts, local recommendation prompts, check-in page prompts, and upsell prompts.",
  "asset-airbnb-intake":
    "A DOCX client intake form for listing details, arrival instructions, parking, Wi-Fi, house rules, local recommendations, emergency contacts, and host approvals.",
  "asset-airbnb-email-templates":
    "A DOCX email template pack for host outreach, guest-guide intake, fact approval, final handoff, local recommendation checks, and refresh reminders.",
  "asset-airbnb-faqs":
    "A DOCX buyer FAQ pack covering guest guide scope, host approvals, local recommendation checks, guest messaging, upsells, refresh cadence, and exclusions.",
};

export const featuredPacks = packs.filter((pack) => pack.featured).slice(0, 4);
export const newlyAddedPacks = [...packs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6);
export const popularPacks = [...packs].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 6);
