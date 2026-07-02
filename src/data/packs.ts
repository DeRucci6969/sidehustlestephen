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
  seoTitle?: string;
  seoDescription?: string;
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
  ogImage?: string;
  assets: PackAsset[];
};

export type PackPageDetail = {
  problem: string;
  solution: string;
  delivery: string;
  firstClients: string;
  startableOffer?: string;
  publicPreview?: {
    title: string;
    intro: string;
    steps: string[];
    lockedAssetTease: string;
  };
  whyDetails: string[];
  firstMoveAnalysis: string[];
  launchSprintDetails: string[];
  firstTenLeadsPlan?: string[];
  offerLadder?: { name: string; price: string; detail: string }[];
};

const basePacks: BusinessPack[] = [
  {
    slug: "cafe-menu-refresh-package",
    title: "Cafe Menu Refresh Package",
    hook: "If you can use Canva, sell this to local cafes.",
    seoTitle: "Cafe Menu Refresh Launch Pack | Outreach Scripts and Pricing Sheet",
    seoDescription:
      "Start a cafe menu refresh service with local cafe outreach scripts, pricing sheet, delivery checklist, client intake form, prompt pack, and handoff templates.",
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
      { id: "asset-cafe-quote", title: "Cafe Proposal & Quote Template", type: "DOCX", description: "Copyable proposal, quote, scope, approval, and monthly refresh wording for cafe owners." },
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
    seoTitle: "Google Business Profile Rescue Launch Pack | Audit Checklist and Outreach Scripts",
    seoDescription:
      "Start a Google Business Profile rescue service with a practical audit checklist, local business outreach scripts, pricing guidance, FAQ prompts, and delivery assets.",
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
      { id: "asset-gbp-pricing", title: "Profile Rescue Pricing Calculator", type: "XLSX", description: "Mini audit, rescue sprint, and monthly hygiene pricing with quote builder and scope guardrails." },
      { id: "asset-gbp-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for profile audits, service descriptions, FAQs, review prompts, and rescue sprint delivery." },
      { id: "asset-gbp-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for profile access, services, hours, photos, FAQs, and approvals." },
      { id: "asset-gbp-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for mini audits, rescue sprint sales, owner approvals, delivery, and review requests." },
      { id: "asset-gbp-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for profile scope, ranking disclaimers, access, approvals, and maintenance." },
    ],
  },
  {
    slug: "airbnb-photo-refresh-service",
    title: "Airbnb Photo Refresh Service",
    hook: "Turn flat listing photos into bookable lifestyle scenes.",
    seoTitle: "Airbnb Photo Refresh Launch Pack | Host Outreach Scripts and Photo Prompts",
    seoDescription:
      "Start an Airbnb photo refresh service with host outreach scripts, listing photo audit checklist, pricing calculator, photo prompts, and client templates.",
    category: "Local Service",
    buyer: "Short-term rental hosts",
    startupCost: "$0-$50",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "An AI-assisted listing photo refresh that improves lighting, ambience, composition, and adds realistic lifestyle models enjoying the space.",
    whyItWorks: "Hosts already know photos drive clicks, but many listings feel empty, flat, or sterile. A strong before/after sample makes the value obvious before a sales call.",
    firstSteps: ["Find flat listing photos", "Create one lifestyle sample", "Pitch a fixed refresh pack"],
    caveat: "Preserve the real property and amenities; sell ambience and lifestyle context, not misleading edits.",
    featured: true,
    popularityScore: 97,
    publishedAt: "2026-06-15",
    assets: [
      { id: "asset-airbnb-photo-prompts", title: "Photo Improvement Prompt Pack", type: "DOCX", description: "Copy-paste prompts for GPT Image 2, Nano Banana, and other image tools to improve ambience, lighting, composition, and add realistic adults enjoying the space." },
      { id: "asset-airbnb-photo-audit", title: "Listing Photo Audit Checklist", type: "PDF", description: "A visual audit worksheet for spotting low-appeal listing photos, sample opportunities, edit risks, and before/after proof points." },
      { id: "asset-airbnb-photo-pricing", title: "Photo Refresh Pricing Calculator", type: "XLSX", description: "Starter, standard, premium, and retainer pricing calculator for per-photo and per-listing refresh packages." },
      { id: "asset-airbnb-photo-outreach", title: "Host Outreach Scripts", type: "DOCX", description: "Cold email, DM, Loom, and follow-up scripts built around sending a proactive before/after sample to hosts." },
      { id: "asset-airbnb-photo-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for listing URL, source photos, approved edit boundaries, model direction, rooms, usage, and host approvals." },
      { id: "asset-airbnb-photo-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for sample delivery, paid refresh scope, source file requests, approval rounds, final handoff, and monthly/seasonal refresh offers." },
      { id: "asset-airbnb-photo-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs covering ethical edits, model usage, photo ownership, turnaround, platform-safe claims, revisions, and deliverables." },
    ],
  },
  {
    slug: "drone-roof-photo-inspection",
    title: "Drone Roof Photo Inspection",
    hook: "Clear roof photos and a simple visual report without anyone climbing a ladder.",
    seoTitle: "Drone Roof Photo Inspection Launch Pack | Report Template and Pricing Sheet",
    seoDescription:
      "Start a visual drone roof photo service with outreach scripts, roof photo report template, safety checklist, pricing sheet, prompt pack, and client forms.",
    category: "Local Service",
    buyer: "Roofers, agents, solar installers, and homeowners",
    startupCost: "$251-$1k",
    timeToFirstSale: "2-4 weeks",
    difficulty: "Medium",
    summary: "A drone-assisted roof photo documentation service that captures close-up roof images, short video, and a claim-safe visual report for people who need roof visibility.",
    whyItWorks: "Roofs are high-stakes and hard to inspect from the ground. When a buyer sees clear overhead photos, the value is immediate without you claiming to certify structural condition.",
    firstSteps: ["Buy or borrow a compliant drone", "Offer one free sample roof", "Package the report"],
    caveat: "This is visual photo documentation, not a structural, engineering, safety, insurance, or building inspection.",
    featured: true,
    popularityScore: 96,
    publishedAt: "2026-06-15",
    assets: [
      { id: "asset-drone-roof-outreach", title: "Drone Outreach Script", type: "DOCX", description: "Cold call, DM, email, and follow-up scripts for roofers, agents, solar installers, and property managers built around the free sample roof offer." },
      { id: "asset-drone-roof-report", title: "Roof Photo Report Template", type: "DOCX", description: "A client-ready visual report template with property details, photo grid, visible-area notes, video link, and visual-only disclaimer language." },
      { id: "asset-drone-roof-pricing", title: "Drone Roof Pricing Sheet", type: "XLSX", description: "Basic, standard, video, rush, and recurring partner pricing with quote builder and weekly capacity calculator." },
      { id: "asset-drone-roof-safety", title: "Safety & Legal Checklist", type: "PDF", description: "Pre-flight checklist covering local drone rules, permission, airspace, weather, privacy, insurance, hazards, and visual-only scope boundaries." },
      { id: "asset-drone-roof-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Claim-safe prompts for report write-ups, visible issue notes, photo captions, free-sample pitches, agent blurbs, and delivery QA." },
      { id: "asset-drone-roof-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for property details, owner permission, roof areas to capture, access constraints, intended use, and delivery format." },
      { id: "asset-drone-roof-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for free sample offers, booking confirmation, pre-flight requirements, report delivery, follow-up, and recurring partner retainers." },
      { id: "asset-drone-roof-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for visual-only scope, drone legality, owner permission, weather, turnaround, roof access, pricing, and recurring reports." },
    ],
  },
  {
    slug: "power-washing-driveway-sprint",
    title: "Power Washing Driveway Sprint",
    hook: "Dirty concrete is an easy before-and-after local service.",
    seoTitle: "Power Washing Driveway Launch Pack | Quote Calculator and Outreach Scripts",
    seoDescription:
      "Start a driveway power washing service with local outreach scripts, quote calculator, job safety checklist, proof kit, prompts, and client templates.",
    category: "Local Service",
    buyer: "Homeowners, landlords, property managers, and small commercial sites",
    startupCost: "$101-$500",
    timeToFirstSale: "1-7 days",
    difficulty: "Medium",
    summary: "A simple exterior cleaning service focused on driveways, paths, bins, small shopfronts, and other visible surfaces with fast before-and-after proof.",
    whyItWorks: "Power washing has obvious visual proof, local buyer demand, and a clear first offer when you keep the scope narrow and quote by surface, access, and risk.",
    firstSteps: ["Rent or borrow a suitable washer", "Clean one sample surface", "Pitch neighbours and local properties"],
    caveat: "Check local water rules, surface suitability, runoff, insurance, and safety before accepting paid work.",
    featured: true,
    popularityScore: 94,
    publishedAt: "2026-06-17",
    assets: [
      { id: "asset-powerwash-outreach", title: "Power Washing Outreach Scripts", type: "DOCX", description: "Door-hanger, neighbour note, DM, email, call, and follow-up scripts built around visible before-and-after proof." },
      { id: "asset-powerwash-pricing", title: "Power Washing Quote Calculator", type: "XLSX", description: "Starter, standard, add-on, travel, surface-risk, and recurring maintenance quote builder." },
      { id: "asset-powerwash-safety", title: "Job Safety & Surface Checklist", type: "PDF", description: "Pre-job checklist for water access, surface type, runoff, nearby hazards, photos, insurance, and no-damage scope boundaries." },
      { id: "asset-powerwash-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for quote notes, door-to-door scripts, photo-based estimates, surface-risk language, and maintenance upsells." },
      { id: "asset-powerwash-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for address, surface type, water access, staining, drainage, photos, timing, and approval boundaries." },
      { id: "asset-powerwash-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for sample offers, quote requests, booking confirmation, pre-job prep, completion handoff, and maintenance reminders." },
      { id: "asset-powerwash-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for surfaces, water use, runoff, safety, damage limitations, weather, pricing, and recurring cleans." },
      { id: "asset-powerwash-proof", title: "Before & After Proof Kit", type: "DOCX", description: "A photo playbook for consistent before/after proof, plus permission, file-naming, and posting templates that turn results into referrals." },
    ],
  },
  {
    slug: "garage-shelf-installation",
    title: "Garage Shelf Installation",
    hook: "Turn a cluttered garage into an organised wall of storage in one afternoon.",
    seoTitle: "Garage Shelf Installation Launch Pack | Quote Calculator and Outreach Scripts",
    seoDescription:
      "Start a garage shelf installation service with a quote calculator, neighbour outreach scripts, safety checklist, intake form, prompt pack, and client email templates.",
    category: "Local Service",
    buyer: "Homeowners, renters, landlords, and property managers",
    startupCost: "$101-$500",
    timeToFirstSale: "1-7 days",
    difficulty: "Medium",
    summary: "A simple install service that mounts manufactured shelving, overhead racks, and hooks to clear a garage floor, with fast before-and-after proof that sells the next job.",
    whyItWorks: "Almost every garage is cluttered, the fix is highly visible, and a few hundred dollars of tools lets you deliver a result owners happily pay for and neighbours instantly want.",
    firstSteps: ["Buy a drill, stud finder and level", "Organise one garage for proof", "Pitch the street with the before-and-after"],
    caveat: "You install manufactured shelving and racks, not structural or load-bearing modifications. Locate wiring and pipes before drilling and respect product weight ratings.",
    featured: true,
    popularityScore: 95,
    publishedAt: "2026-06-19",
    assets: [
      { id: "asset-garage-outreach", title: "Garage Outreach Scripts", type: "DOCX", description: "Door-hanger, neighbour note, DM, email, call, and follow-up scripts built around the before-and-after garage transformation." },
      { id: "asset-garage-pricing", title: "Garage Install Quote Calculator", type: "XLSX", description: "Single-bay, double, and premium install tiers with add-ons, materials, travel, quote builder, profit check, and recurring-organising options." },
      { id: "asset-garage-install", title: "Install & Safety Checklist", type: "PDF", description: "Pre-install checklist for wall type, locating wiring/pipes, anchor selection, load ratings, level mounting, before/after photos, and clean scope boundaries." },
      { id: "asset-garage-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for photo-based quotes, wall-layout suggestions, anchor/load notes, local-group posts, and referral follow-ups." },
      { id: "asset-garage-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for garage size, what to store, wall material, access, budget, photos, and approval boundaries." },
      { id: "asset-garage-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for sample offers, quote requests, booking confirmation, pre-install prep, completion handoff, and referral/maintenance reminders." },
      { id: "asset-garage-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for wall types, weight limits, what is included, materials, timeline, mess, and structural/safety boundaries." },
    ],
  },
  {
    slug: "mobile-headlight-restoration",
    title: "Mobile Headlight Restoration",
    hook: "Cloudy headlights are a small fix with obvious before-and-after proof.",
    seoTitle: "Mobile Headlight Restoration Launch Pack | Pricing, Outreach Scripts, and Safety Checklist",
    seoDescription:
      "Start a mobile headlight restoration service with a pricing calculator, car-owner outreach scripts, safety checklist, intake form, proof kit, prompts, and client templates.",
    category: "Local Service",
    buyer: "Car owners, used-car sellers, landlords with fleets, and local dealers",
    startupCost: "$51-$150",
    timeToFirstSale: "1-7 days",
    difficulty: "Easy",
    summary: "A mobile car-care service that restores cloudy plastic headlights using a fixed process, clear scope boundaries, and strong before-and-after photos.",
    whyItWorks: "The problem is visible in daylight, the result is easy to show, and many owners want the car to look cleaner before selling, inspecting, or driving at night.",
    firstSteps: ["Buy a starter restoration kit", "Restore one permissioned car for proof", "Pitch owners with cloudy headlights"],
    caveat: "Do not promise like-new results, roadworthiness, legal compliance, or permanent restoration. Some lenses need replacement.",
    popularityScore: 93,
    publishedAt: "2026-06-28",
    assets: [
      { id: "asset-headlight-outreach", title: "Headlight Outreach Scripts", type: "DOCX", description: "Neighbour note, marketplace, dealer, DM, email, call, and follow-up scripts built around cloudy-headlight before-and-after proof." },
      { id: "asset-headlight-pricing", title: "Headlight Restoration Quote Calculator", type: "XLSX", description: "Single-car, two-car, dealer batch, add-on, travel, material cost, and profit-check pricing workbook." },
      { id: "asset-headlight-safety", title: "Restoration Safety Checklist", type: "PDF", description: "Pre-job checklist for lens condition, masking, sanding grit sequence, UV sealant, PPE, weather, paint protection, and result boundaries." },
      { id: "asset-headlight-prompts", title: "AI Prompt Pack", type: "DOCX", description: "Practical prompts for photo-based lead scoring, quote notes, marketplace posts, follow-ups, safety language, and handoff copy." },
      { id: "asset-headlight-intake", title: "Client Intake Form", type: "DOCX", description: "Editable intake questions for car make/model, lens condition, photos, location, access, weather window, expectations, and approval boundaries." },
      { id: "asset-headlight-email-templates", title: "Client Email Templates", type: "DOCX", description: "Emails for sample-led outreach, quote requests, booking confirmation, pre-job prep, completion handoff, referral asks, and dealer batch follow-ups." },
      { id: "asset-headlight-faqs", title: "Client FAQs", type: "DOCX", description: "Buyer-facing FAQs for what restoration can and cannot fix, sealant, weather, timing, price, safety, and when replacement is better." },
      { id: "asset-headlight-proof", title: "Before & After Proof Kit", type: "DOCX", description: "A photo playbook for matched headlight shots, consent wording, file naming, marketplace captions, and referral follow-ups." },
    ],
  },
  {
    slug: "gym-churn-report",
    title: "Boutique Gym Churn Report",
    hook: "Gyms know members cancel, but not why.",
    seoTitle: "Boutique Gym Churn Report Launch Pack | Retention Report Template",
    seoDescription:
      "Start a boutique gym churn report service with retention review agenda, churn report spreadsheet, gym owner outreach emails, intake form, and AI prompts.",
    category: "B2B Service",
    buyer: "Boutique gyms and studios",
    startupCost: "$0",
    timeToFirstSale: "2-4 weeks",
    difficulty: "Medium",
    summary: "A monthly retention report that turns messy cancellation reasons into three actionable fixes.",
    whyItWorks: "Retention is directly tied to gym revenue, and small studios rarely have clean insight into churn reasons.",
    firstSteps: ["Find 10 retention-active studios", "Send a dummy churn snapshot", "Pitch an anonymized one-month review"],
    caveat: "You need clean enough data and owner buy-in.",
    featured: true,
    popularityScore: 92,
    publishedAt: "2026-06-07",
    assets: [
      { id: "asset-gym-report", title: "Churn Report Template", type: "XLSX", description: "A spreadsheet for tagging cancellations and surfacing trends." },
      { id: "asset-gym-outreach", title: "Gym Owner Outreach Scripts", type: "DOCX", description: "Email, DM, call, and follow-up scripts built around public retention clues and anonymized-data starter offers." },
      { id: "asset-gym-pricing", title: "Churn Report Pricing Calculator", type: "XLSX", description: "Snapshot, sprint, and monthly report pricing with quote builder, data-scope guardrails, and profit check." },
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
    seoTitle: "Shopify Cart Audit Launch Pack | Checklist, Pricing, and Email Swipe",
    seoDescription:
      "Start a Shopify cart audit service with checkout friction checklist, abandoned-cart email swipe, pricing calculator, client intake form, and outreach templates.",
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
      { id: "asset-shopify-pricing", title: "Cart Audit Pricing Calculator", type: "XLSX", description: "Starter audit, full audit, implementation, and monthly cleanup pricing with quote builder and profit check." },
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
    seoTitle: "UGC Brief Generator Launch Pack | Creator Brief Template and Hook Bank",
    seoDescription:
      "Start a UGC brief service for ecommerce brands with creator brief templates, hook bank, client intake form, outreach emails, and AI prompt pack.",
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
    seoTitle: "Realtor Suburb Snapshot Launch Pack | Agent Pitch Script and Report Template",
    seoDescription:
      "Start a suburb snapshot report service for real estate agents with pitch scripts, report spreadsheet, client intake form, source-safe prompts, and emails.",
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
      { id: "asset-realtor-pricing", title: "Suburb Snapshot Pricing Calculator", type: "XLSX", description: "Sample, weekly, and monthly retainer pricing with quote builder, source-scope guardrails, and compliance-safe proposal copy." },
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
    seoTitle: "AI Inbox Triage for Trades Launch Pack | Reply Templates and Workflow Map",
    seoDescription:
      "Start an AI-assisted inbox triage service for trades with workflow map, reply templates, intake form, owner-approved prompts, and client emails.",
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
    seoTitle: "Review Reply and Testimonial Clips Launch Pack | Swipe File and Specs",
    seoDescription:
      "Start a review reply and testimonial asset service with reply swipe file, testimonial card specs, client intake form, approval emails, and AI prompts.",
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
    seoTitle: "Manual Workflow Concierge Launch Pack | Workflow Template and Scorecard",
    seoDescription:
      "Start a manual workflow concierge service with validation scorecard, workflow template, client intake form, outreach emails, and automation prompts.",
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
    seoTitle: "Airbnb Guest Guide Refresh Launch Pack | Host Guide Template and Upsells",
    seoDescription:
      "Start an Airbnb guest guide refresh service with guest guide outline, host upsell ideas, client intake form, host outreach emails, and AI prompts.",
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

const AUTOMATION_ASSET_DESCRIPTION =
  "Scheduled AI-agent prompts for this service: daily lead triage, weekly prospecting, outreach drafting, follow-ups, delivery QA, weekly reporting, and proof repurposing — each ready to paste into an agent and run on a cadence with human approval.";

const packOgImages: Record<string, string> = {
  "ai-inbox-triage-trades": "/visuals/pack-cards/ai-inbox-triage-trades-v2.jpg",
  "airbnb-guest-guide-refresh": "/visuals/pack-cards/airbnb-guest-guide-refresh-v2.jpg",
  "cafe-menu-refresh-package": "/visuals/pack-cards/cafe-menu-refresh-package-v2.jpg",
  "google-business-profile-rescue": "/visuals/pack-cards/google-business-profile-rescue-v2.jpg",
  "gym-churn-report": "/visuals/pack-cards/gym-churn-report-v2.jpg",
  "manual-workflow-concierge": "/visuals/pack-cards/manual-workflow-concierge-v2.jpg",
  "realtor-suburb-snapshot": "/visuals/pack-cards/realtor-suburb-snapshot-v2.jpg",
  "review-testimonial-service": "/visuals/pack-cards/review-testimonial-service-v2.jpg",
  "shopify-cart-audit": "/visuals/pack-cards/shopify-cart-audit-v2.jpg",
  "ugc-brief-generator": "/visuals/pack-cards/ugc-brief-generator-v2.jpg",
};

function automationAssetFor(assets: PackAsset[]): PackAsset {
  const parts = assets.map((asset) => asset.id.replace(/^asset-/, ""));
  let prefix = parts[0] ?? "";
  for (const part of parts) {
    while (prefix && !part.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  const token = prefix.replace(/-[^-]*$/, "").replace(/-$/, "");
  return {
    id: `asset-${token}-automation`,
    title: "AI Automation Pack",
    type: "DOCX",
    description: AUTOMATION_ASSET_DESCRIPTION,
  };
}

// Every pack leads with a scheduled-automation pack — the most appealing asset for buyers.
export const packs: BusinessPack[] = basePacks.map((pack) => ({
  ...pack,
  ogImage: packOgImages[pack.slug],
  assets: [automationAssetFor(pack.assets), ...pack.assets],
}));

export function getPack(slug: string) {
  return packs.find((pack) => pack.slug === slug);
}

export function categorySlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const packCategories = Array.from(new Set(packs.map((pack) => pack.category))).map((category) => ({
  name: category,
  slug: categorySlug(category),
  count: packs.filter((pack) => pack.category === category).length,
}));

export function getPacksByCategorySlug(slug: string) {
  const category = packCategories.find((item) => item.slug === slug);
  if (!category) return null;

  return {
    category,
    packs: packs.filter((pack) => pack.category === category.name),
  };
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
    startableOffer:
      "A 48-hour cafe menu refresh for one menu section, one Instagram specials tile, and one QR or Google menu check, delivered with owner approval and final export notes.",
    publicPreview: {
      title: "Free preview: cafe menu issue scan",
      intro:
        "Use this quick scan before pitching. It helps you find a visible cafe menu problem and turn it into a useful sample without giving away the full outreach and pricing workflow.",
      steps: [
        "Visible issue: find one mismatch between the printed menu, Instagram specials, Google menu photo, QR menu, opening hours, or current pricing.",
        "Tiny sample: redesign one menu section or specials tile only, using the cafe's current wording and avoiding fake prices or unapproved claims.",
        "Starter pitch: offer a fixed 48-hour refresh with one approval round, final files, and a monthly specials option after delivery.",
      ],
      lockedAssetTease:
        "Members get the cafe outreach script, pricing sheet, delivery checklist, prompt pack, intake form, client emails, FAQs, and automation prompts.",
    },
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
    offerLadder: [
      { name: "Starter menu fix", price: "$99-$249", detail: "One menu section, specials tile, or QR menu cleanup with one approval round and final web-ready export." },
      { name: "Full menu refresh", price: "$300-$750", detail: "Print menu, Instagram tiles, QR/menu link check, Google menu note, and a clean owner handoff." },
      { name: "Monthly specials retainer", price: "$150-$500 / mo", detail: "Recurring specials, price changes, event menus, seasonal items, and menu-file maintenance." },
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
    startableOffer:
      "A fixed-fee Google profile rescue sprint with a 3-point public audit, owner-approved service copy, FAQ drafts, photo checklist, and review-request wording that avoids ranking promises.",
    publicPreview: {
      title: "Free preview: 3-point profile rescue audit",
      intro:
        "Use this small public preview to decide whether a business is worth pitching. It gives the owner a useful observation without giving away the full member workflow.",
      steps: [
        "Trust gap: note one thing a buyer checks before calling, such as hours, services, photos, reviews, or FAQs.",
        "Visible fix: write the exact customer-facing improvement, for example a clearer service description or missing FAQ.",
        "Safe pitch: frame the offer as profile clarity and approval-ready cleanup, not a promise to rank higher.",
      ],
      lockedAssetTease:
        "Members get the full profile audit checklist, rescue sprint pitch, pricing calculator, intake form, approval emails, FAQ prompts, and handoff wording.",
    },
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
    firstTenLeadsPlan: [
      "Pick one local service category where trust matters before the call: plumbers, electricians, dentists, accountants, mechanics, cleaners, or salons.",
      "Search Google Maps in one suburb and save 25 profiles with weak photos, missing services, stale hours, thin descriptions, unanswered reviews, or no FAQs.",
      "Prioritise owner-operated businesses with a website, recent reviews, and signs they are still active. Skip abandoned profiles and large chains.",
      "For each prospect, capture three screenshots only: one visible issue, one missed trust-builder, and one quick win the owner can approve.",
      "Build a tiny audit note for the 10 best leads using plain customer language, not SEO jargon.",
      "Write one sample service description, FAQ, or review-request line so the owner sees the work before you ask for a call.",
      "Send the mini-audit to the owner with a fixed rescue sprint price, a no-ranking-guarantee caveat, and a 48-hour handoff promise.",
      "Follow up with one extra screenshot or customer-facing observation, not a generic bump message.",
      "Close the smallest version first: public profile audit, approval-ready copy, photo checklist, FAQ drafts, and implementation notes.",
      "After delivery, offer a monthly profile hygiene check for new photos, hours, services, FAQs, and review-response prompts.",
    ],
    offerLadder: [
      { name: "Mini rescue audit", price: "$99-$199", detail: "A 3-point public profile audit with screenshots, owner-safe recommendations, and one approval-ready copy sample." },
      { name: "Profile rescue sprint", price: "$250-$600", detail: "Services, FAQs, photo checklist, review-request wording, approval notes, and a no-ranking-guarantee handoff." },
      { name: "Monthly profile hygiene", price: "$100-$350 / mo", detail: "A light monthly check for hours, photos, services, FAQs, review replies, and seasonal updates." },
    ],
  },
  "airbnb-photo-refresh-service": {
    problem:
      "Many short-stay listings have technically accurate photos that still feel empty, cold, dark, or hard to imagine using. Rooms are photographed without people, lighting is flat, the best lifestyle moments are missing, and the listing blends into every other property in the area. Hosts often know photos matter, but they do not want to book a photographer for every seasonal refresh or small improvement.",
    solution:
      "You sell an AI-assisted listing photo refresh: improve lighting, warmth, ambience, crop, visual hierarchy, and add realistic adult lifestyle models using the space in a platform-safe way. The core offer is a small set of before/after images that make the stay feel more desirable while preserving the real property, layout, amenities, view, and host-approved facts.",
    delivery:
      "Start from the public listing photos or host-supplied originals. Pick the weakest high-impact rooms, write room-specific enhancement prompts, generate sample edits, QA for realism and property accuracy, then deliver before/after files with a short usage and approval note. Keep a strict edit log so the host can see what changed and approve anything that affects representation.",
    firstClients:
      "Search Airbnb, Stayz, direct-booking sites, and property manager portfolios for listings with good spaces but flat photos. Improve one public photo as a tasteful sample, watermark it if needed, and send it with a fixed-fee refresh offer for 6-12 images.",
    startableOffer:
      "A 6-photo AI listing refresh with one proactive before/after sample, warmer ambience, realistic lifestyle-model scenes, an edit-risk log, and host-approved final exports.",
    publicPreview: {
      title: "Free preview: listing photo sample check",
      intro:
        "Use this public check to decide whether a listing is worth pitching. The goal is one tasteful before/after sample, not a misleading property makeover.",
      steps: [
        "Photo gap: choose one listing photo that is accurate but flat, dim, empty, cold, cluttered, or poorly cropped.",
        "Safe edit: improve light, warmth, crop, ambience, and visual focus without adding amenities, views, furniture, room size, or unapproved claims.",
        "Host pitch: send one low-res sample with a fixed 6-photo refresh offer and a clear note that final images need host approval.",
      ],
      lockedAssetTease:
        "Members get the photo improvement prompt pack, listing audit checklist, pricing calculator, host outreach scripts, intake form, emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "The sales proof is visual. A host does not need to understand AI workflows; they can compare the old photo to a warmer, more bookable lifestyle version.",
      "The work is fast to sample because listing photos are public and the first pitch can be built around one proactive before/after.",
      "The offer has natural expansion paths: seasonal refreshes, new hero photos, direct-booking website images, social promos, and listing-wide visual consistency.",
    ],
    firstMoveAnalysis: [
      "Do not start by promising higher occupancy. Start by showing that the current listing feels less inviting than the space deserves.",
      "Only add models in ways that make the real space easier to imagine: sitting on the balcony, reading in the lounge, making coffee, unpacking luggage, or enjoying breakfast. Do not add amenities, views, furniture, or room size that are not there.",
      "Lead with one polished sample and a tight offer: refresh 6 images, one style direction, one revision round, final web-ready exports.",
    ],
    launchSprintDetails: [
      "Day 1: find 30 listings with strong locations but flat, empty, poorly lit, or sterile photos.",
      "Day 2: create 5 tasteful before/after samples using the prompt pack and save exact prompts for repeatability.",
      "Day 3-4: send sample-led outreach to hosts and property managers with a fixed 6-photo starter offer.",
      "Day 5-6: close one paid refresh, collect source files and edit boundaries, then deliver the first sample set within 48 hours.",
      "Day 7: package before/after proof, ask for approval, and offer a seasonal or listing-wide refresh as the next step.",
    ],
    firstTenLeadsPlan: [
      "Search one city or holiday region and filter for entire homes with 10+ reviews and average-looking photos.",
      "Prioritise listings where the physical space is good but the first five photos feel empty, dim, cold, cluttered, or poorly cropped.",
      "Avoid luxury listings with professional photography; they are harder to improve and less likely to need a starter refresh.",
      "Save the listing URL, host/property manager name, first photo issue, and one room that would benefit from a model enjoying the space.",
      "Create only one sample per prospect so the pitch stays fast and scalable.",
      "Use gentle edits first: light, warmth, ambience, crop, declutter, then add one realistic adult model only where it makes sense.",
      "Watermark or low-res the sample if sending publicly, and state that final files require host approval.",
      "Send a short message: one observation, one before/after sample, one fixed package price, one turnaround window.",
      "Follow up with a second room idea, not a generic reminder.",
      "After the first paid job, ask whether they want a seasonal hero-photo refresh before their next peak booking period.",
    ],
    offerLadder: [
      { name: "6-photo starter refresh", price: "$99-$249", detail: "Six host-approved images with one style direction, one revision round, and a simple edit-risk log." },
      { name: "Listing-wide refresh", price: "$300-$750", detail: "A full listing photo pass with hero image options, room-by-room edits, and before/after handoff notes." },
      { name: "Seasonal refresh retainer", price: "$150-$500 / update", detail: "Quarterly or pre-peak refreshes for seasonal scenes, direct-booking assets, and new hero photos." },
    ],
  },
  "drone-roof-photo-inspection": {
    problem:
      "Homeowners, property managers, agents, roofers, and solar installers often need to see roof condition, gutters, panels, tiles, flashing, or storm-affected areas without sending someone up a ladder. Ground-level photos are weak, trades do not always want to attend before quoting, and agents or owners need clear documentation fast. The risk is that buyers want visibility, but they do not need an expensive structural inspection for every first look.",
    solution:
      "You sell a drone roof photo documentation service: fly with permission, capture a clean photo set and short video, then deliver a tidy 1-2 page visual report that flags visible areas of interest. The offer is deliberately claim-safe: you are not certifying structural condition, diagnosing damage, or replacing a roofer, engineer, surveyor, or insurance assessor. You are giving people clear visual evidence from angles they cannot safely capture themselves.",
    delivery:
      "Confirm permission, local drone rules, airspace, weather, access, privacy boundaries, and insurance before booking. On site, capture wide roof context, each roof plane, gutters, valleys, flashing, penetrations, solar panels, visible debris, and any client-requested areas. Deliver same-day where possible with labelled photos, a short video link, and a visual-only report that separates observable facts from recommendations to contact a qualified professional.",
    firstClients:
      "Start with roofers, real estate agents, solar installers, property managers, and storm-prone suburbs. Offer one free sample roof to a partner so they can see the report format and reuse it in a quote, listing conversation, or client update. One useful flyover gives you a concrete before/after sales asset and a referral path into repeat partners.",
    startableOffer:
      "A one-roof drone flyover with 12-20 labelled photos, a short video, and a visual-only report that helps the client see roof areas without climbing.",
    publicPreview: {
      title: "Free preview: roof photo scope check",
      intro:
        "Use this check before pitching or flying. It keeps the offer focused on visual documentation and avoids drifting into inspection claims.",
      steps: [
        "Buyer use case: choose one need, such as pre-quote roof visibility, listing support, solar panel photo documentation, storm documentation, or job closeout proof.",
        "Permission and rules: confirm owner permission, local drone rules, airspace, weather, privacy boundaries, and insurance before any paid flight.",
        "Visual-only scope: offer labelled photos and a short report, not structural certification, damage diagnosis, safety advice, or insurance conclusions.",
      ],
      lockedAssetTease:
        "Members get the drone outreach script, roof photo report template, pricing sheet, safety checklist, prompt pack, intake form, emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "The buyer feels the problem immediately: the roof is valuable, hard to see, and inconvenient or unsafe to inspect casually.",
      "A consumer or prosumer drone creates a clear capability gap. You can do something most homeowners and many service sellers cannot do quickly themselves.",
      "The deliverable is tangible. A labelled photo report is easier to buy, forward, and reuse than a vague inspection service pitch.",
      "Partner channels are natural: roofers, agents, solar installers, and property managers all see repeat situations where roof visibility helps the next conversation.",
    ],
    firstMoveAnalysis: [
      "Do not position this as a building inspection. Lead with visual documentation, close-up photos, and a report that helps a qualified person decide the next step.",
      "Use the free sample roof as proof. Pick a willing owner, agent, roofer, or installer and create a polished sample report before asking for repeat work.",
      "Start with partner buyers before one-off homeowners. A roofer or agent who likes the report can refer multiple jobs; a homeowner is usually a single transaction.",
      "Make compliance part of the offer. Permission, airspace, weather, privacy, and visual-only disclaimers should sound professional, not like fine print.",
    ],
    launchSprintDetails: [
      "Day 1: confirm the local drone requirements that apply to paid work, including registration, licensing, airspace, privacy, and liability insurance.",
      "Day 2: build one sample report using a permissioned roof and practise the flight shot list: wide context, roof planes, gutters, valleys, flashing, penetrations, panels, and visible debris.",
      "Day 3-4: contact 30 roofers, agents, solar installers, and property managers with a free sample roof offer and a one-page example report.",
      "Day 5-6: complete one free sample or discounted first report, deliver it same day, and ask which client conversation it helps them with.",
      "Day 7: turn the sample into a partner offer: per-report pricing, recurring monthly allocation, rush add-on, and before/after job documentation.",
    ],
    firstTenLeadsPlan: [
      "List 10 roofers who quote residential roof repairs, gutter cleaning, roof restoration, or storm damage work.",
      "List 5 solar installers who need pre-quote roof visibility, panel checks, or before/after job documentation.",
      "List 5 real estate agents with active listings in suburbs where roof condition questions commonly slow buyer confidence.",
      "List 5 property managers or strata managers responsible for maintenance documentation across multiple properties.",
      "Find one permissioned sample roof and create a clean report before sending broad outreach.",
      "Call or email each lead with one specific use case: pre-quote photos, listing support, storm documentation, or job closeout proof.",
      "Offer one free sample roof to the best partner prospect, not to everyone.",
      "Track whether each prospect cares about price, turnaround, compliance, report format, or recurring volume.",
      "After the sample, ask who else in their workflow needs this visibility: estimator, owner, seller, buyer, insurer, tenant, or installer.",
      "Convert the strongest response into a simple recurring offer: 4 reports per month, priority scheduling, consistent report format, and optional video add-on.",
    ],
    offerLadder: [
      { name: "Basic roof photo set", price: "$150-$250", detail: "One permissioned flyover with 12-20 labelled photos and visual-only delivery notes." },
      { name: "Photo report plus video", price: "$250-$450", detail: "Photo set, short video link, 1-2 page visual report, and client-safe handoff language." },
      { name: "Partner report bundle", price: "$800-$2k / mo", detail: "Recurring monthly reports for roofers, agents, installers, or property managers with priority scheduling." },
    ],
  },
  "power-washing-driveway-sprint": {
    problem:
      "Driveways, paths, bin areas, patios, small shopfronts, and exterior walls get visibly dirty, but most owners ignore them until they look bad in person or in listing photos. The problem is obvious, local, and easy to prove with one clean strip, but beginners often make the offer too broad, underquote the job, or ignore water, runoff, surface, and damage risks.",
    solution:
      "You sell a fixed-scope power washing sprint for one visible surface: driveway, path, bin pad, patio, small storefront, or property-manager common area. The starter offer includes a photo-based quote, pre-job surface check, one clean area, before/after photos, and a maintenance reminder.",
    delivery:
      "Confirm water access, drainage, surface type, staining, nearby hazards, local water rules, weather, and owner approval before booking. Take before photos, test a small patch, clean from low-risk to higher-risk areas, avoid delicate surfaces unless qualified, and send after photos with a short care note and recurring maintenance option.",
    firstClients:
      "Start with visible dirty driveways, paths, shopfronts, bin pads, and small rental properties in one local area. Clean one permissioned sample strip or one discounted first job, photograph the before/after, then pitch nearby owners with the exact same narrow service.",
    startableOffer:
      "A driveway or path clean for one property, quoted from photos, with a pre-job surface check, one approval boundary, before/after proof, and an optional 3-month maintenance reminder.",
    publicPreview: {
      title: "Free preview: surface quote safety check",
      intro:
        "Use this quick check before quoting. It helps you find a visible first job while avoiding risky surfaces that can turn a simple clean into a costly mistake.",
      steps: [
        "Obvious proof: choose one dirty but simple surface where a before/after photo will be clear, such as concrete, pavers, a path, bin pad, or shopfront entrance.",
        "Risk screen: avoid painted, sealed, cracked, delicate, electrical, roof, poor-drainage, oil-heavy, or sensitive landscaping areas until you know the rules and equipment.",
        "Quote boundary: ask for photos, water access, surface type, size, staining, drainage, and timing before giving the final price.",
      ],
      lockedAssetTease:
        "Members get the outreach scripts, quote calculator, job safety checklist, before/after proof kit, intake form, emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "The proof is visual. A buyer can understand the difference from one before/after photo without a long sales explanation.",
      "The equipment can be rented or borrowed for the first jobs, so the beginner can test demand before buying a commercial setup.",
      "The offer works street by street: one visible clean surface can create neighbour referrals, landlord work, shopfront refreshes, and property-manager maintenance leads.",
      "Recurring work is natural when you sell quarterly paths, bin areas, shopfront entries, strata/common areas, and pre-listing cleanups.",
    ],
    firstMoveAnalysis: [
      "Do not pitch exterior cleaning broadly. Start with one surface, one clear price range, and one result the buyer can see.",
      "Do not touch delicate, painted, sealed, cracked, electrical, roof, or high-risk surfaces until you understand equipment, pressure, detergents, insurance, and local rules.",
      "Use a test patch and before photos on every job. The goal is a clean visible result without creating damage, runoff issues, or neighbour complaints.",
      "Quote the first jobs conservatively: travel, setup, water access, surface size, staining, drainage, and pack-down time all count.",
    ],
    launchSprintDetails: [
      "Day 1: confirm local water restrictions, runoff rules, insurance needs, equipment rental options, and surfaces you will not clean yet.",
      "Day 2: clean one permissioned sample area and capture strong before/after photos from the same angle.",
      "Day 3: list 40 nearby homes, rentals, shopfronts, and small commercial properties with visibly dirty but simple surfaces.",
      "Day 4-5: send neighbour notes, DMs, emails, or door-hanger style messages with your sample photo and a fixed starter range.",
      "Day 6: book one paid driveway/path clean, confirm water access and surface risk, and deliver with before/after proof.",
      "Day 7: ask for two neighbour referrals and offer a quarterly maintenance reminder or bundled adjacent-property discount.",
    ],
    firstTenLeadsPlan: [
      "Pick one tight area: your street, one suburb loop, a row of small shops, or a group of rental properties.",
      "Find 10 prospects with visible concrete, pavers, paths, bin pads, patios, or entrances that look dirty but not damaged or delicate.",
      "Avoid high-risk first jobs: painted surfaces, old timber, soft stone, roofs, electrical areas, heavy oil, bad drainage, or surfaces near sensitive landscaping.",
      "For each lead, note the surface type, visible issue, likely water access, parking/setup access, and one safe starter scope.",
      "Create one proof photo from a permissioned sample clean, using the same before/after angle and no exaggerated editing.",
      "Send a short note: the visible issue, the simple starter clean, the expected range, and a request for photos or a quick look before quoting.",
      "Offer a small cluster discount if two neighbours book the same day, but do not discount below your travel and setup costs.",
      "Follow up after two days with one practical note: weather window, water access reminder, or how the test patch works.",
      "For landlords and property managers, pitch pre-listing, end-of-lease, bin-area, or common-area refreshes rather than one-off driveway vanity.",
      "After the first paid job, ask for a referral to the next neighbour, landlord, strata contact, or shop owner while the before/after result is fresh.",
    ],
    offerLadder: [
      { name: "Single surface clean", price: "$80-$250", detail: "One driveway, path, patio, or bin pad, quoted from photos with a pre-job surface check and before/after proof." },
      { name: "Full exterior refresh", price: "$300-$750", detail: "Driveway plus paths, entry, and one or two extra surfaces, with a care note and a tidy completion handoff." },
      { name: "Quarterly maintenance", price: "$80-$200 / visit", detail: "A recurring clean of priority surfaces for homes, rentals, strata, or shopfronts on a fixed schedule." },
    ],
  },
  "garage-shelf-installation": {
    problem:
      "Almost every garage becomes a graveyard of boxes, bikes, and bins that the owner can't even walk through. People hate it but never fix it because they don't know where to start, which shelving to buy, or how to mount it safely. Beginners often make the offer too broad, undercharge for labour, confuse materials with labour, or ignore wall type, wiring, and weight limits.",
    solution:
      "You sell a fixed-scope install: mount manufactured shelving, overhead racks, and hooks to get everything off the floor in a single afternoon. The starter offer includes a photo-based quote, a wall and service check, a clear layout, a level install, and before/after photos that sell the next job.",
    delivery:
      "Confirm garage size, wall material, ceiling height, what's being stored, who supplies materials, and any wiring or pipes before booking. Take before photos, scan for studs and services, mount into suitable fixings within product weight ratings, keep walkways and the car clear, clean up, and hand off with after photos and weight guidance.",
    firstClients:
      "Start with visibly cluttered single and double garages in one local area. Organise one garage cheap or free, photograph the before/after, then pitch the same narrow service to neighbours, local groups, landlords, and new-build owners.",
    startableOffer:
      "A single-wall shelving install for one garage, quoted from photos, with a wall and service check, a clear layout, a level install within weight ratings, and before/after proof.",
    publicPreview: {
      title: "Free preview: garage install lead check",
      intro:
        "Use this quick check before pitching. It helps you spot a safe, simple first job without giving away the quote calculator, outreach scripts, and install checklist.",
      steps: [
        "Visible pain: choose a garage with cluttered floors, unused wall space, or storage boxes that make the result obvious in a before/after photo.",
        "Safe starter scope: confirm the first offer is manufactured shelving or hooks only, with no structural work, heavy ceiling loads, or unknown wall risks.",
        "Quote boundary: ask for photos, wall type, garage size, what needs storing, and who supplies materials before giving a final price.",
      ],
      lockedAssetTease:
        "Members get the full quote calculator, neighbour outreach scripts, install and safety checklist, intake form, prompt pack, emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "The proof is visual. One before/after photo of a transformed garage sells the result without a long pitch.",
      "The toolkit is cheap. A drill, stud finder, and level let a beginner deliver a premium-looking result and test demand before scaling.",
      "It works street by street: one clean garage creates neighbour referrals, landlord work, and new-build leads.",
      "It scales with people. When leads outpace you, a trained second installer follows the same fixed-scope checklist.",
    ],
    firstMoveAnalysis: [
      "Do not offer 'garage organising' broadly. Sell one clear install, one price structure, and one visible result.",
      "Separate labour from materials in every quote so margins stay clear and clients aren't surprised.",
      "Always locate wiring and pipes and confirm wall type before drilling; mount into studs or rated anchors within weight limits.",
      "Refer structural changes, load-bearing work, and heavy ceiling-mounted loads to a qualified trade.",
    ],
    launchSprintDetails: [
      "Day 1: buy or confirm a drill, stud + live-wire detector, level, and a basic anchor kit; decide who supplies shelving.",
      "Day 2: organise one permissioned garage and capture strong before/after photos from the same angle.",
      "Day 3: list 40 nearby homes, rentals, and new builds with cluttered or empty garages.",
      "Day 4-5: post the before/after in local groups and send neighbour notes, DMs, and door-hangers with a fixed starter range.",
      "Day 6: book one paid single-wall install, confirm wall type and services, and deliver with before/after proof.",
      "Day 7: ask for two neighbour referrals and offer a premium storage-wall upgrade or a per-property landlord bundle.",
    ],
    firstTenLeadsPlan: [
      "Pick one tight area: your street, one suburb loop, a new-build estate, or a group of rentals.",
      "Find 10 prospects with cluttered single/double garages or bare walls that need storage.",
      "Avoid high-risk first jobs: unknown wall types, suspected wiring/pipe runs, heavy ceiling loads, or structural requests.",
      "For each lead, note garage size, wall material, what they want stored, ceiling height, and one safe starter scope.",
      "Create one proof photo from a permissioned sample install using the same before/after angle.",
      "Send a short note: the cluttered-garage problem, the one-afternoon fix, the expected range, and a request for photos before quoting.",
      "Offer a small cluster discount if two neighbours book the same week, but never below your travel and setup cost.",
      "Follow up after two days with one useful note: wall type, what to store, or how the layout will work.",
      "For landlords and builders, pitch per-property install bundles for rentals, end-of-build handovers, and display homes.",
      "After the first paid job, ask for a referral to the next neighbour or landlord while the before/after is fresh.",
    ],
    offerLadder: [
      { name: "Single-wall install", price: "$300-$450", detail: "One wall of manufactured shelving in a single-car garage, quoted from photos with a wall/service check and before/after proof." },
      { name: "Full storage wall", price: "$500-$900", detail: "Shelving plus an overhead rack, pegboard, and hooks for a full transformation, with a tidy completion handoff." },
      { name: "Per-property bundle", price: "POA / unit", detail: "Repeat installs for landlords and builders across rentals, new builds, and display homes on a fixed per-unit scope." },
    ],
  },
  "mobile-headlight-restoration": {
    problem:
      "Cloudy plastic headlights make a car look neglected and can reduce light clarity at night. Owners notice the yellow haze but often ignore it because the job feels fiddly, messy, or too small for a mechanic. Used-car sellers, rideshare drivers, family-car owners, and small dealers all have a visible problem that can be improved without turning it into a full detailing business.",
    solution:
      "You sell a mobile headlight restoration service with a narrow scope: inspect the lens, mask paint, wet sand through the right grit sequence, polish, apply UV protection, and send matched before/after photos. The offer is deliberately honest: improve clarity and appearance where the lens is restorable, but do not promise like-new lights or legal compliance.",
    delivery:
      "Confirm photos, car make/model, lens condition, weather, workspace, water/power access, and owner expectations before booking. On site, clean the lens, mask surrounding paint, test a small area where appropriate, sand and polish carefully, apply UV sealant, photograph the result from the same angle, and give the owner aftercare and replacement warnings if the lens is too damaged.",
    firstClients:
      "Start with one permissioned car, then use the matched before/after proof in local Facebook groups, marketplace listings, driveway notes, rideshare groups, used-car seller searches, and small dealer outreach. Lead with the visible cloudy headlight, not a generic car-detailing pitch.",
    startableOffer:
      "A same-day mobile headlight restoration for one car, with lens condition check, paint masking, sanding/polish sequence, UV sealant, before/after photos, and honest result boundaries.",
    publicPreview: {
      title: "Free preview: cloudy headlight lead check",
      intro:
        "Use this quick check before pitching. It helps you find an easy first job without promising a result the lens cannot support.",
      steps: [
        "Visible pain: choose a car with cloudy, yellowed plastic headlights where the haze is easy to see in daylight photos.",
        "Safe starter scope: offer restoration only when the lens is plastic and not cracked, full of moisture, deeply crazed, or better suited to replacement.",
        "Proof pitch: send a matched before/after sample and quote a fixed pair-of-headlights price with clear result and weather boundaries.",
      ],
      lockedAssetTease:
        "Members get the outreach scripts, quote calculator, restoration safety checklist, proof kit, prompt pack, intake form, client emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "The sales proof is obvious. A cloudy headlight beside a restored headlight makes the value visible without a long explanation.",
      "The startup cost is low compared with larger detailing or mechanical services, and the first jobs can be done with a basic restoration kit, PPE, and careful process control.",
      "The offer fits several buyer lanes: private car owners, used-car sellers, rideshare drivers, small dealers, fleet owners, and mobile detailers who want a simple add-on.",
      "The work creates local proof fast because every job can produce a matched before/after photo and a referral ask.",
    ],
    firstMoveAnalysis: [
      "Do not pitch full car detailing. Sell one narrow result: clearer-looking headlights with a UV-protection handoff and honest limits.",
      "Do not promise compliance, permanent restoration, or like-new output. Some lenses are too cracked, moisture-filled, or damaged and need replacement.",
      "Use matched photos from the same angle and lighting. The proof should be clean, not exaggerated.",
      "Quote the first jobs by pair, travel distance, lens condition, materials, and weather window so the job stays profitable.",
    ],
    launchSprintDetails: [
      "Day 1: buy a starter restoration kit, PPE, masking tape, microfiber cloths, compound, and UV sealant; write your no-cracked-lens boundary.",
      "Day 2: restore one permissioned car and capture matched before/after photos from the same angle.",
      "Day 3: list 40 local prospects: cars for sale, rideshare drivers, neighbours, marketplace sellers, small dealers, and family-car owners.",
      "Day 4-5: send sample-led outreach with the before/after photo, fixed starter price, weather window, and clear result boundary.",
      "Day 6: book one paid car, confirm lens photos and access, restore the pair, and send aftercare notes.",
      "Day 7: ask for two referrals, post the proof in one local group if approved, and pitch a dealer or fleet batch price.",
    ],
    firstTenLeadsPlan: [
      "Pick one tight area: your suburb, workplace car park, local marketplace listings, rideshare group, or used-car dealer strip.",
      "Find 10 cars with visibly cloudy plastic headlights and no obvious cracks, heavy moisture, or severe internal damage.",
      "Prioritise private sellers, older family cars, rideshare drivers, delivery drivers, and small dealers where cleaner lights improve presentation.",
      "Create one permissioned before/after sample first so the outreach is visual.",
      "Send a short note: the visible headlight haze, the fixed pair price, the approximate job time, and the honest boundary that some lenses need replacement.",
      "Offer a two-car neighbour or household bundle only when travel and setup still make sense.",
      "Follow up after two days with one useful note about UV sealant and aftercare, not a generic bump.",
      "For used-car sellers, frame the service around better presentation before photos and inspections, not guaranteed sale price.",
      "For dealers and fleets, pitch a batch morning with a per-car rate and before/after photo log.",
      "After the first paid job, ask whether the owner has a second car, family member, neighbour, driver group, or dealer contact with the same issue.",
    ],
    offerLadder: [
      { name: "Single-car restoration", price: "$79-$149", detail: "One pair of plastic headlights with cleaning, masking, sanding/polish sequence, UV sealant, and before/after proof." },
      { name: "Two-car household bundle", price: "$140-$250", detail: "Two cars at the same address or nearby, with shared setup and aftercare notes." },
      { name: "Dealer or fleet batch", price: "$50-$100 / car", detail: "Half-day batch work for small dealers, rideshare groups, delivery fleets, or property operators with photo logs." },
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
    startableOffer:
      "A one-month churn snapshot for one boutique gym, using exported cancellation notes, simple reason tags, revenue-at-risk estimates, and three owner-approved retention actions.",
    publicPreview: {
      title: "Free preview: churn clue check",
      intro:
        "Use this public preview before pitching. It helps you find a credible retention angle without asking for private member data in the first message.",
      steps: [
        "Public clue: find one sign the studio already cares about retention, such as intro offers, class-pack discounts, timetable changes, win-back posts, or review complaints.",
        "Dummy snapshot: build a tiny example using realistic sample data so the owner understands the report before sharing any private cancellation notes.",
        "Safe pitch: offer an anonymized one-month churn review with three owner-approved actions, not a promise to reduce cancellations.",
      ],
      lockedAssetTease:
        "Members get the churn report workbook, gym owner outreach scripts, pricing calculator, retention agenda, prompt pack, intake form, client emails, FAQs, and automation prompts.",
    },
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
    firstTenLeadsPlan: [
      "List 10 boutique gyms, pilates studios, martial arts gyms, yoga studios, or small group training businesses with active membership offers.",
      "Prioritise studios that post intro offers, timetable changes, win-back offers, or member challenges because they already care about retention.",
      "Skip large chains first. You want an owner or manager who can approve a small manual report quickly.",
      "Capture one public retention clue for each lead: intro offer, class-pack discount, cancellation wording, review complaint, or schedule-change post.",
      "Prepare a sample churn snapshot with dummy data so the owner understands the deliverable without sharing private member data.",
      "Send a short pitch asking who reviews cancellations and offering a fixed one-month manual report.",
      "Offer to start with anonymized cancellation reasons, not full system access.",
      "Follow up with one retention question tied to their studio, such as onboarding, class times, injury pauses, pricing, or member communication.",
      "Close the first version as a manual report plus a 30-minute review call.",
      "After delivery, propose a monthly cadence that tracks changes, actions taken, and next retention experiments.",
    ],
    offerLadder: [
      { name: "One-month churn snapshot", price: "$250-$500", detail: "A manual report from exported or anonymized cancellation notes with tags, themes, and three owner-approved actions." },
      { name: "Retention review sprint", price: "$600-$1.2k", detail: "Churn report, revenue-at-risk view, save-script ideas, onboarding fixes, and a 30-minute owner review call." },
      { name: "Monthly retention report", price: "$500-$1.5k / mo", detail: "Recurring trend tracking, cancellation tags, action follow-up, and a monthly retention agenda." },
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
    startableOffer:
      "A 48-hour Shopify cart and trust audit with five screenshot-backed fixes, abandoned-cart email copy, and a priority list the owner can implement without a redesign.",
    publicPreview: {
      title: "Free preview: mobile cart friction check",
      intro:
        "Use this quick check before pitching. It gives the store owner one useful observation while keeping the full scoring sheet, pricing calculator, and email swipe for members.",
      steps: [
        "Buyer hesitation: add one product to cart on mobile and find the clearest moment where a buyer might pause, such as shipping, returns, trust proof, payment, discount code, or delivery timing.",
        "Tiny fix: write one improved line of copy the store could test without a redesign.",
        "Safe pitch: offer a fixed 48-hour audit with screenshot-backed fixes, not a promised conversion or revenue lift.",
      ],
      lockedAssetTease:
        "Members get the cart audit checklist, abandoned-cart swipe, pricing calculator, prompt pack, intake form, client emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "Store owners already care about conversion, so the offer maps to an existing priority.",
      "The audit is easier to buy than vague marketing help because the deliverable is a concrete list of fixes and copy.",
      "You can deliver manually without needing access to the store at first; screenshots and public flows reveal enough for a paid diagnostic.",
      "The new pricing calculator makes the offer easier to quote without drifting into unpaid implementation work.",
    ],
    firstMoveAnalysis: [
      "Lead with one friction screenshot, not a claim about conversion lift.",
      "Avoid revenue guarantees. Frame recommendations around confidence, clarity, and reduced hesitation.",
      "Prioritize fixes the owner can implement quickly before suggesting deeper redesign.",
      "Separate audit, copywriting, and implementation in the quote so the first paid job stays clean.",
    ],
    launchSprintDetails: [
      "Day 1: audit 20 small Shopify stores on mobile and save screenshots.",
      "Day 2: write 5 short teardown emails with one cart issue and one abandoned-email idea.",
      "Day 3-5: pitch a fixed-fee audit with a 48-hour turnaround.",
      "Day 6-7: deliver one audit with prioritized fixes, email swipe copy, and a retest checklist.",
    ],
    firstTenLeadsPlan: [
      "Find 10 small Shopify stores that are actively posting, running ads, or launching products but still feel founder-operated.",
      "Prioritise stores with unclear shipping, buried returns, weak product proof, generic abandoned-cart copy, or mobile checkout friction.",
      "Add one product to cart on mobile and capture only the most obvious hesitation point.",
      "Check whether the store has email capture, abandoned-cart messaging, trust badges, reviews, and visible delivery expectations.",
      "Write one screenshot-backed observation for each lead in plain buyer language.",
      "Draft one improved cart line, shipping note, or abandoned-cart subject line as the sample.",
      "Send the sample to the founder or ecommerce manager with a fixed audit offer and 48-hour turnaround.",
      "Avoid promising revenue lift. Frame the audit around reducing hesitation and making the next purchase step clearer.",
      "Follow up with a second practical fix, such as returns wording, product proof, or delivery timing.",
      "After the first audit, offer implementation support or a monthly conversion cleanup for new products and campaigns.",
    ],
    offerLadder: [
      { name: "Mini cart teardown", price: "$99-$199", detail: "Three screenshot-backed fixes, one improved cart line, and one abandoned-cart subject line." },
      { name: "Full cart audit", price: "$300-$750", detail: "Mobile cart review, trust copy, abandoned-cart email rewrite, priority list, and implementation notes." },
      { name: "Monthly conversion cleanup", price: "$250-$1k / mo", detail: "Recurring product-launch checks, cart copy updates, email refreshes, and post-campaign friction reviews." },
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
    startableOffer:
      "A creator brief sprint for one product, including five hooks, a shot list, claim boundaries, objection angles, usage notes, and creator handoff copy.",
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
    firstTenLeadsPlan: [
      "List 10 ecommerce brands that already post UGC-style videos or run creator ads.",
      "Pick brands where one product has clear reviews, objections, use cases, and visual demo potential.",
      "Skip brands with polished agency-level creative systems at first. Look for messy but active creator output.",
      "Review one product page, three reviews, and recent social posts for each lead.",
      "Write one sample hook and three-shot outline that is more specific than their current creator instructions.",
      "Note one claim or usage-rights boundary so the sample feels commercially careful.",
      "Send the mini-brief to the founder, marketing lead, or creator manager with a fixed one-product brief offer.",
      "Position the service as better creator direction, not content strategy.",
      "Follow up with a second hook based on a customer objection or review phrase.",
      "After delivery, pitch a monthly brief pack for new products, seasonal campaigns, or ad tests.",
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
    startableOffer:
      "A weekly suburb snapshot for one agent, with sourced local notes, three plain-English talking points, one email intro, and two social captions for approval.",
    publicPreview: {
      title: "Free preview: suburb content sample check",
      intro:
        "Use this check before pitching an agent. It keeps the sample useful, source-backed, and small enough that you are not doing a full weekly report for free.",
      steps: [
        "Suburb lane: choose one suburb the agent already farms through listings, open homes, appraisal content, or local social posts.",
        "Source note: collect two or three public data points with source names and dates. If a metric is missing, say so instead of guessing.",
        "Sample output: write one talking point, one email intro, and one caption for approval. Do not predict prices, appraisals, yields, listings, or leads.",
      ],
      lockedAssetTease:
        "Members get the suburb snapshot workbook, agent pitch script, pricing calculator, prompt pack, intake form, client emails, FAQs, and automation prompts.",
    },
    whyDetails: [
      "Agents already pay for positioning and content; this gives them a recurring local asset.",
      "The deliverable is repeatable by suburb, agency, or agent pod.",
      "Source discipline makes the service feel professional and reduces risk around unsupported market claims.",
      "A fixed pricing ladder makes the first sale easier because agents can buy one sample before committing to weekly local content.",
    ],
    firstMoveAnalysis: [
      "Do not pitch national market commentary. Pick one suburb and one agent's existing audience.",
      "Use sources and dates. If a metric is missing, say so rather than guessing.",
      "Make the output immediately publishable: one snapshot, one email intro, two captions.",
      "Sell a one-suburb sample first, then move to a four-week content retainer once the agent sees the handoff and approval workflow.",
    ],
    launchSprintDetails: [
      "Week 1: build one source-backed sample for a suburb with active agents.",
      "Week 1-2: pitch 25 agents or principals with the sample.",
      "Week 2-3: deliver one paid weekly snapshot and get approval feedback.",
      "Week 4: propose a four-week content retainer for one suburb.",
    ],
    firstTenLeadsPlan: [
      "Choose one suburb with active listings, recent sales, and several agents posting online.",
      "List 10 agents who consistently post listings, auctions, open homes, or market updates.",
      "Skip agents who already publish polished data-backed suburb reports every week.",
      "For each lead, identify their core suburb and one missing content angle buyers or sellers would care about.",
      "Build one sample snapshot using public sources and include source names or dates.",
      "Write one email intro and two caption options in the agent's likely tone.",
      "Send the sample with a fixed weekly snapshot offer for one suburb.",
      "Avoid unsupported market predictions. Make it clear that the agent approves all commentary before publishing.",
      "Follow up with one extra local talking point or source the agent could use this week.",
      "After the first paid snapshot, offer a four-week retainer for the agent's main suburb or listing farm area.",
    ],
    offerLadder: [
      { name: "Paid sample snapshot", price: "$99-$199", detail: "One suburb sample with source log, one talking point, one email intro, and two social captions." },
      { name: "Weekly suburb snapshot", price: "$200-$350", detail: "Source-backed weekly report, publish-ready captions, email copy, and approval handoff for one suburb." },
      { name: "Four-week content retainer", price: "$750-$1.5k / mo", detail: "Weekly snapshots, source logs, lead-nurture prompts, extra captions, and recurring approval workflow." },
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
    startableOffer:
      "A trades inbox triage setup with inquiry labels, missing-info reply templates, urgent-message rules, and a daily owner-approved lead summary.",
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
    firstTenLeadsPlan: [
      "List 10 local trades businesses with visible enquiry channels: website forms, Facebook pages, Instagram DMs, email addresses, or service request pages.",
      "Prioritise plumbers, electricians, roofers, cleaners, landscapers, and HVAC operators where missed messages can cost real jobs.",
      "Look for signs of admin strain: slow replies in reviews, vague quote forms, multiple contact channels, or owner-run social pages.",
      "Map the likely inquiry types for each lead: emergency, quote, missing info, supplier, complaint, or no-fit request.",
      "Draft one missing-information reply template for a common job type in that trade.",
      "Send the owner a short note about faster lead handling, not AI automation.",
      "Offer a fixed setup: labels, templates, urgent rules, and a daily summary format.",
      "Keep human approval central. Say clearly that nothing customer-facing is sent automatically without owner approval.",
      "Follow up with one practical example of a cleaner quote request message for their trade.",
      "After setup, offer weekly triage maintenance or automation of only the lowest-risk repeated steps.",
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
    startableOffer:
      "A monthly review hygiene sprint with reply drafts, escalation notes, testimonial quote extraction, and simple card copy using only real customer language.",
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
    firstTenLeadsPlan: [
      "List 10 local businesses with recent Google reviews, Facebook reviews, or marketplace reviews.",
      "Prioritise businesses with good reviews that are unanswered, unevenly answered, or not repackaged anywhere else.",
      "Skip sensitive disputes, medical claims, legal claims, or anything that needs specialist review.",
      "For each lead, choose two reviews: one positive review worth replying to and one proof quote worth repackaging.",
      "Write two tone-safe reply drafts and one testimonial card idea using the customer's exact public language.",
      "Send the sample to the owner with a fixed monthly review hygiene offer.",
      "State clearly that all replies, quotes, and proof assets need owner approval before posting.",
      "Follow up with one missed trust asset, such as a website snippet, story post, or sales-page quote block.",
      "Close the first batch around a small number of recent reviews, not the entire review history.",
      "After delivery, offer a monthly cadence for new reviews, reply drafts, testimonial cards, and escalation notes.",
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
    startableOffer:
      "A two-week manual workflow pilot that delivers one repeated business outcome, logs exceptions, and produces a simple automation backlog after paid demand is proven.",
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
    firstTenLeadsPlan: [
      "Pick one narrow operator type with a repeated weekly workflow, such as recruiters, brokers, agencies, clinic admins, or niche consultants.",
      "List 10 operators who visibly publish, hire, sell, or serve enough volume to have repeated admin pain.",
      "Choose one weekly outcome they likely care about: lead list cleanup, report drafting, inbox summary, quote prep, or client update assembly.",
      "Do not mention building software. Frame the offer as a manual pilot that proves whether the outcome is worth paying for.",
      "Write a one-sentence pilot promise with inputs, output, cadence, and approval step.",
      "Send a short note asking how they currently handle that repeated workflow.",
      "Offer to run the first version manually for two weeks with a capped scope.",
      "Track every exception, missing input, approval delay, and repeated step during delivery.",
      "After the pilot, present the result, time saved, failure points, and automation backlog.",
      "Only pitch automation after the buyer has paid for and used the manual outcome.",
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
    startableOffer:
      "A guest guide refresh for one short-term rental, covering arrival, Wi-Fi, parking, house rules, local picks, checkout, and a host approval checklist.",
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
    firstTenLeadsPlan: [
      "List 10 short-term rental hosts or property managers with active listings in one destination or suburb.",
      "Prioritise listings with reviews mentioning check-in, parking, rules, Wi-Fi, noise, amenities, local tips, or communication.",
      "Skip listings run by polished property managers with strong branded guidebooks at first.",
      "For each lead, note one guest question the listing does not answer clearly.",
      "Draft one sample guide section, such as arrival, parking, Wi-Fi, checkout, or local breakfast picks.",
      "Send the sample to the host with a fixed guest guide refresh offer.",
      "Frame the service around fewer repeated questions and a smoother guest experience, not guaranteed better reviews.",
      "Ask for host-approved facts before writing anything guests will rely on.",
      "Follow up with one practical improvement based on a public review or listing gap.",
      "After delivery, offer a seasonal refresh for local recommendations, rules, amenities, and upsell options.",
    ],
  },
};

export const memberAssetDetails: Record<string, string> = {
  "asset-cafe-automation":
    "A DOCX automation pack with scheduled agent prompts for cafe lead spotting, owner-specific outreach drafts, monthly specials follow-ups, delivery QA, and before-after proof repurposing.",
  "asset-cafe-script":
    "A DOCX outreach pack with cold email, DM, Loom, follow-up, objection handling, intake prompts, a worked cafe prospect example, and handoff copy you can adapt before contacting owners.",
  "asset-cafe-pricing":
    "An XLSX workbook with pricing ladder, quote builder, retainer tracker, client input checklist, worked example, delivery runbook, QA checklist, and renewal tracker.",
  "asset-cafe-quote":
    "A DOCX proposal and quote template with cafe owner summary copy, starter/full/retainer scopes, approval terms, exclusions, timeline, invoice wording, and monthly refresh upsell language.",
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
  "asset-gbp-pricing":
    "An XLSX workbook with mini-audit, rescue sprint, and monthly profile hygiene pricing, a quote builder, scope guardrails, profit check, and proposal wording that avoids ranking guarantees.",
  "asset-gbp-prompts":
    "A DOCX AI prompt pack for Google Business Profile rescue work, including profile audit prompts, service-description prompts, FAQ prompts, ethical review-request prompts, and sprint handoff prompts.",
  "asset-gbp-intake":
    "A DOCX client intake form for profile access, categories, services, hours, photos, FAQs, review rules, approval owners, and maintenance preferences.",
  "asset-gbp-email-templates":
    "A DOCX email template pack for profile mini-audits, rescue sprint pitches, owner approval requests, final handoffs, and ethical review-request copy.",
  "asset-gbp-faqs":
    "A DOCX buyer FAQ pack covering profile rescue scope, ranking disclaimers, access requirements, owner approvals, review rules, and ongoing maintenance.",
  "asset-gbp-automation":
    "A DOCX automation pack with scheduled agent prompts for local profile scans, mini-audit drafting, rescue sprint follow-ups, approval reminders, and monthly profile hygiene reports.",
  "asset-airbnb-photo-automation":
    "A DOCX automation pack with scheduled agent prompts for weak-listing scans, sample-led outreach, edit-boundary checks, refresh QA, seasonal follow-ups, and proof repurposing.",
  "asset-airbnb-photo-prompts":
    "A DOCX prompt system with room-specific image enhancement prompts, realistic lifestyle-model insertion prompts, ambience and lighting variations, negative prompts, before/after sample copy, QA prompts, and edit-boundary rules for GPT Image 2, Nano Banana, and similar tools.",
  "asset-airbnb-photo-audit":
    "A PDF listing-photo audit worksheet for scoring weak images, identifying lifestyle-model opportunities, preserving property accuracy, ranking hero-photo candidates, and deciding which proactive sample to send first.",
  "asset-airbnb-photo-pricing":
    "An XLSX pricing workbook with per-photo and per-listing packages, rush fees, revision allowances, sample tracking, seasonal refresh options, quote formulas, and edit-risk logging.",
  "asset-airbnb-photo-outreach":
    "A DOCX outreach kit with sample-led cold emails, DMs, Loom scripts, property-manager angles, follow-ups, objection handling, and approval-safe positioning for AI-assisted listing photo refreshes.",
  "asset-airbnb-photo-intake":
    "A DOCX client intake form for listing links, source-photo ownership, edit permissions, model direction, rooms to prioritise, property accuracy boundaries, usage rights, and host approval workflow.",
  "asset-airbnb-photo-email-templates":
    "A DOCX email template pack for proactive sample delivery, paid refresh scope, source file requests, edit-boundary approvals, final before/after handoff, revision requests, and seasonal refresh upsells.",
  "asset-airbnb-photo-faqs":
    "A DOCX buyer FAQ pack covering ethical AI edits, model usage, representation accuracy, photo rights, platform-safe listing claims, revision rounds, turnaround, and what should not be changed.",
  "asset-drone-roof-automation":
    "A DOCX automation pack with scheduled agent prompts for partner prospecting, permission reminders, weather-delay messages, visual-report QA, recurring partner follow-ups, and referral proof posts.",
  "asset-drone-roof-outreach":
    "A DOCX outreach kit with cold call scripts, emails, DMs, free-sample roof positioning, partner pitches for roofers/agents/solar installers, follow-ups, and claim-safe objection handling.",
  "asset-drone-roof-report":
    "A DOCX visual report template with property details, flight summary, photo grid, visible-area notes, short video link, recommended next-step language, and visual-only disclaimer blocks.",
  "asset-drone-roof-pricing":
    "An XLSX pricing workbook with basic, standard, video, rush, partner retainer, and weekly capacity calculators plus quote builder and illustrative unit-economics sheets.",
  "asset-drone-roof-safety":
    "A PDF pre-flight checklist covering local drone regulations, owner permission, airspace, weather, site hazards, privacy, insurance, battery checks, shot list, and no-structural-inspection boundaries.",
  "asset-drone-roof-prompts":
    "A DOCX AI prompt pack for visual report write-ups, visible issue flagging, photo captions, client-safe disclaimers, agent/roofer blurbs, outreach copy, and final report QA.",
  "asset-drone-roof-intake":
    "A DOCX client intake form for property address, owner permission, roof areas to capture, access notes, flight restrictions, intended use, report recipients, and delivery format.",
  "asset-drone-roof-email-templates":
    "A DOCX email template pack for free sample offers, partner outreach, booking confirmation, permission/weather checks, report delivery, follow-up, and recurring report offers.",
  "asset-drone-roof-faqs":
    "A DOCX buyer FAQ pack covering visual-only scope, what is not certified, whether anyone climbs the roof, local drone compliance, weather delays, turnaround, pricing, and recurring work.",
  "asset-powerwash-automation":
    "A DOCX automation pack with scheduled agent prompts for neighbour prospecting, quote follow-ups, pre-job reminders, completion handoffs, maintenance reminders, and before-after proof distribution.",
  "asset-powerwash-outreach":
    "A DOCX outreach kit with neighbour notes, door-hanger copy, DMs, emails, call scripts, cluster-booking angles, follow-ups, and objection handling for visible dirty surfaces.",
  "asset-powerwash-pricing":
    "An XLSX quote calculator with driveway/path packages, add-ons, travel, surface-risk fees, cluster discounts, recurring maintenance, and job-profit checks.",
  "asset-powerwash-safety":
    "A PDF job checklist for water access, surface type, drainage, runoff, hazards, before/after photos, test patches, weather, insurance, and surfaces to avoid.",
  "asset-powerwash-prompts":
    "A DOCX AI prompt pack for photo-based quote notes, local outreach, surface-risk wording, completion messages, maintenance reminders, and final job QA.",
  "asset-powerwash-intake":
    "A DOCX client intake form for address, surface photos, water access, drainage, stains, nearby hazards, timing, pets, parking, and approval boundaries.",
  "asset-powerwash-email-templates":
    "A DOCX email template pack for sample-led outreach, quote requests, booking confirmation, pre-job prep, completion handoff, referrals, and maintenance reminders.",
  "asset-powerwash-faqs":
    "A DOCX buyer FAQ pack covering surfaces, water use, runoff, test patches, weather delays, damage limitations, safety boundaries, pricing, and recurring cleans.",
  "asset-powerwash-proof":
    "A DOCX before/after proof playbook: how to frame matched shots, lighting and angle rules, a test-patch sequence, photo permission wording, a file-naming system, and caption templates that turn each result into neighbour and landlord referrals.",
  "asset-garage-automation":
    "A DOCX automation pack with scheduled agent prompts for street-by-street prospecting, photo quote triage, booking reminders, install handoff messages, referral asks, and landlord follow-ups.",
  "asset-garage-outreach":
    "A DOCX outreach kit with neighbour notes, local-group posts, DMs, emails, call scripts, follow-ups, and before/after proof angles for selling one-afternoon garage shelf installs.",
  "asset-garage-pricing":
    "An XLSX quote calculator with single-wall, full storage wall, add-on, travel, materials handling, profit check, proposal copy, and per-property bundle pricing.",
  "asset-garage-install":
    "A PDF install and safety checklist for wall type, service locating, stud/fixing selection, load ratings, layout, level mounting, cleanup, and no-structural-work boundaries.",
  "asset-garage-prompts":
    "A DOCX AI prompt pack for photo-based quotes, garage layout suggestions, safe scope wording, local outreach, completion handoff copy, and referral follow-ups.",
  "asset-garage-intake":
    "A DOCX client intake form for garage size, wall material, ceiling height, storage needs, supplied materials, access, budget, approval boundaries, and known service runs.",
  "asset-garage-email-templates":
    "A DOCX email template pack for sample offers, quote requests, booking confirmation, pre-install prep, completion handoff, referral asks, and landlord or builder follow-up.",
  "asset-garage-faqs":
    "A DOCX buyer FAQ pack covering wall types, weight limits, manufactured shelving scope, materials, installation time, mess, exclusions, and when a qualified trade is required.",
  "asset-headlight-automation":
    "A DOCX automation pack with scheduled agent prompts for cloudy-headlight lead spotting, sample-led outreach, quote follow-ups, booking reminders, completion handoffs, proof posts, and dealer batch follow-ups.",
  "asset-headlight-outreach":
    "A DOCX outreach kit with neighbour notes, marketplace messages, DMs, emails, call scripts, dealer batch pitches, follow-ups, and before/after proof angles for selling mobile headlight restoration.",
  "asset-headlight-pricing":
    "An XLSX quote calculator with single-car, two-car, dealer batch, travel, material cost, lens-condition, quote builder, job profit, and referral tracking sheets.",
  "asset-headlight-safety":
    "A PDF restoration checklist for lens condition, masking, grit sequence, polishing, UV sealant, PPE, weather, paint protection, before/after photos, and no-like-new-result boundaries.",
  "asset-headlight-prompts":
    "A DOCX AI prompt pack for photo-based lead scoring, quote notes, marketplace posts, safety wording, completion handoffs, referral asks, and dealer batch outreach.",
  "asset-headlight-intake":
    "A DOCX client intake form for car make/model, lens photos, damage, moisture, location, access, weather window, expectations, and approval boundaries.",
  "asset-headlight-email-templates":
    "A DOCX email template pack for sample-led outreach, quote requests, booking confirmation, pre-job prep, completion handoff, aftercare, referrals, and dealer batch follow-up.",
  "asset-headlight-faqs":
    "A DOCX buyer FAQ pack covering what restoration can fix, what needs replacement, sealant, timing, weather, price, aftercare, and safety boundaries.",
  "asset-headlight-proof":
    "A DOCX before/after proof playbook with matched photo angles, lens condition notes, consent wording, file naming, marketplace captions, and referral messages.",
  "asset-gym-automation":
    "A DOCX automation pack with scheduled agent prompts for churn data requests, cancellation-tag reviews, owner-call prep, monthly report QA, action follow-ups, and renewal prompts.",
  "asset-gym-report":
    "An XLSX retention workbook with raw cancellation tagging, dashboard formulas, revenue-at-risk summary, action plan, call notes, worked example, QA, and renewal tracking.",
  "asset-gym-outreach":
    "A DOCX outreach kit with boutique gym owner emails, DMs, call scripts, Loom structure, follow-ups, objection handling, public retention-clue examples, and privacy-safe starter-offer language.",
  "asset-gym-pricing":
    "An XLSX pricing workbook with dummy sample, one-month snapshot, retention sprint, monthly report, multi-location add-on, quote builder, data-scope guardrails, profit check, and proposal copy.",
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
  "asset-shopify-automation":
    "A DOCX automation pack with scheduled agent prompts for store prospecting, cart audit notes, abandoned-cart copy drafts, client follow-ups, implementation checks, and post-audit upsell ideas.",
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
  "asset-ugc-automation":
    "A DOCX automation pack with scheduled agent prompts for ecommerce prospecting, product-angle research, creator brief drafts, claim-safety checks, revision follow-ups, and retainer prompts.",
  "asset-realtor-automation":
    "A DOCX automation pack with scheduled agent prompts for suburb source checks, weekly snapshot drafting, agent outreach, compliance review reminders, delivery handoffs, and renewal prompts.",
  "asset-realtor-report":
    "An XLSX suburb snapshot workbook with source log, weekly snapshot formulas, content calendar, lead follow-up prompts, compliance log, worked example, and QA sheets.",
  "asset-realtor-pitch":
    "A DOCX pitch kit for agents and principals with suburb-content outreach, sample weekly deliverable, compliance reminders, follow-up offer, and filled example intro.",
  "asset-realtor-pricing":
    "An XLSX pricing calculator with sample snapshot, weekly, four-week retainer, extra suburb, rush, and source-scope pricing, plus quote builder, profit check, guardrails, and compliance-safe proposal copy.",
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
  "asset-trades-automation":
    "A DOCX automation pack with scheduled agent prompts for inbox summaries, lead classification checks, missing-info reply drafts, owner approval queues, weekly reports, and workflow improvements.",
  "asset-reviews-automation":
    "A DOCX automation pack with scheduled agent prompts for review monitoring, reply drafting, testimonial extraction, escalation checks, monthly proof delivery, and renewal follow-ups.",
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
  "asset-manual-automation":
    "A DOCX automation pack with scheduled agent prompts for niche prospecting, manual delivery logs, weekly client reports, exception reviews, automation backlog scoring, and renewal follow-ups.",
  "asset-airbnb-automation":
    "A DOCX automation pack with scheduled agent prompts for listing-gap scans, guest-guide sample sections, host outreach, fact approval reminders, seasonal refresh checks, and upsell follow-ups.",
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
