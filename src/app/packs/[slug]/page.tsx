import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeDollarSign, CheckCircle2, ClipboardList, Crown, Download, FileQuestion, FileText, LockKeyhole, Mail, Repeat2, Rocket, ShieldCheck, Sparkles, Table2, Target } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { TrackOnMount } from "@/components/track-on-mount";
import { categorySlug, getPack, memberAssetDetails, packPageDetails, packs } from "@/data/packs";
import { getMembershipContext } from "@/lib/membership";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

function getAssetPresentation(title: string, type: string) {
  if (title.includes("Automation")) return { label: "Automate", Icon: Repeat2, tone: "bg-[#eaf8f0] text-[var(--validation-green)]" };
  if (title.includes("Intake")) return { label: "Scope", Icon: ClipboardList, tone: "bg-[rgba(28,32,28,0.06)] text-[var(--obsidian)]" };
  if (title.includes("Email") || title.includes("Script") || title.includes("Pitch") || title.includes("Swipe") || title.includes("Reply")) {
    return { label: "Sell", Icon: Mail, tone: "bg-[#eef6f8] text-[#1f6b83]" };
  }
  if (title.includes("FAQ")) return { label: "Answer", Icon: FileQuestion, tone: "bg-[#f4f0ff] text-[#6547a8]" };
  if (title.includes("Prompt")) return { label: "AI assist", Icon: Sparkles, tone: "bg-[#fff8db] text-[#8a6500]" };
  if (type === "XLSX") return { label: "Track", Icon: Table2, tone: "bg-[#eaf8f0] text-[var(--validation-green)]" };
  if (type === "PDF") return { label: "Check", Icon: ShieldCheck, tone: "bg-[#edf2f7] text-[var(--navy-ink)]" };
  return { label: "Deliver", Icon: FileText, tone: "bg-white text-[var(--navy-ink)]" };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) return {};
  const description = pack.seoDescription ?? `${pack.hook} A practical launch pack for ${pack.buyer.toLowerCase()} with outreach, pricing, delivery, and member assets.`;
  const socialImage = pack.ogImage ?? siteConfig.ogImage;

  return {
    title: pack.seoTitle ?? `${pack.title} | Side Hustle Stephen`,
    description,
    alternates: {
      canonical: `/packs/${pack.slug}`,
    },
    openGraph: {
      title: `${pack.title} | ${siteConfig.name}`,
      description,
      url: `/packs/${pack.slug}`,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${pack.title} launch pack`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pack.title} | ${siteConfig.name}`,
      description,
      images: [socialImage],
    },
  };
}

export function generateStaticParams() {
  return packs.map((pack) => ({ slug: pack.slug }));
}

function getPackFaqs(pack: NonNullable<ReturnType<typeof getPack>>, detail: (typeof packPageDetails)[string] | undefined) {
  return [
    [
      `Who should start the ${pack.title}?`,
      `This fits someone who wants a narrow service for ${pack.buyer.toLowerCase()} and is willing to do buyer research, outreach, client communication, and manual delivery before trying to scale.`,
    ],
    [
      "What should I do first?",
      detail?.firstMoveAnalysis?.[0] ?? `Start by finding ${pack.buyer.toLowerCase()} with the visible problem, then use the smallest version of the offer before building anything bigger.`,
    ],
    [
      "What is included for members?",
      `Members unlock ${pack.assets.length} assets for this pack, including ${pack.assets.slice(0, 3).map((asset) => asset.title).join(", ")}, plus the full playbook and download links.`,
    ],
    [
      "What should I avoid promising?",
      pack.caveat,
    ],
  ];
}

export default async function PackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) notFound();
  const detail = packPageDetails[pack.slug];
  const viewer = await getMembershipContext();
  const isMember = viewer.isMember;
  const offerLadder = detail?.offerLadder ?? [
    { name: "Starter", price: "$99-$249", detail: `A focused first version for ${pack.buyer.toLowerCase()}.` },
    { name: "Standard", price: "$300-$750", detail: "Adds polish, revisions, templates, and a sharper delivery package." },
    { name: "Retainer", price: "$250-$1k/mo", detail: "Turns the one-off service into recurring maintenance or reporting." },
  ];
  const relatedPacks = packs
    .filter((candidate) => candidate.slug !== pack.slug)
    .sort((a, b) => {
      const categoryScore = Number(b.category === pack.category) - Number(a.category === pack.category);
      if (categoryScore !== 0) return categoryScore;
      return b.popularityScore - a.popularityScore;
    })
    .slice(0, 3);
  const launchSprint = detail?.launchSprintDetails ?? ["Pick a tight buyer segment", ...pack.firstSteps, "Package proof and follow up"].slice(0, 5);
  const assetTypes = Array.from(new Set(pack.assets.map((asset) => asset.type))).join(", ");
  const firstAssetTitle = pack.assets.find((asset) => asset.title !== "AI Automation Pack")?.title ?? pack.assets[0]?.title ?? "launch asset";
  const startableOffer = detail?.startableOffer ?? `A focused ${pack.title} starter package.`;
  const packFaqs = getPackFaqs(pack, detail);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: packFaqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Business Pack Archive",
        item: `${siteConfig.url}/packs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pack.category,
        item: `${siteConfig.url}/packs/categories/${categorySlug(pack.category)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pack.title,
        item: `${siteConfig.url}/packs/${pack.slug}`,
      },
    ],
  };
  const packSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: pack.title,
    description: pack.summary,
    url: `${siteConfig.url}/packs/${pack.slug}`,
    image: pack.ogImage ? `${siteConfig.url}${pack.ogImage}` : `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished: pack.publishedAt,
    about: pack.category,
    audience: {
      "@type": "Audience",
      audienceType: pack.buyer,
    },
    hasPart: pack.assets.map((asset) => ({
      "@type": "CreativeWork",
      name: asset.title,
      description: asset.description,
      encodingFormat: asset.type,
      isAccessibleForFree: false,
    })),
    isPartOf: {
      "@type": "CollectionPage",
      name: "Business Pack Archive",
      url: `${siteConfig.url}/packs`,
    },
  };
  const assetWorkflow = [
    ["Scope", "Collect clean inputs"],
    ["Sell", "Send specific outreach"],
    ["Deliver", "Use checklists and templates"],
    ["Follow up", "Turn delivery into the next offer"],
  ];

  return (
    <>
      <TrackOnMount
        event="Pack Detail Viewed"
        properties={{
          pack: pack.slug,
          category: pack.category,
          member: isMember,
        }}
      />
      <Header viewer={viewer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, packSchema]) }}
      />
      <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-8 sm:px-8 sm:py-10">
        <Link href="/packs" className="frosted-pill mb-5 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[var(--text-primary)] sm:mb-7">
          <ArrowLeft size={16} />
          Back to archive
        </Link>
        <section className="liquid-panel glass overflow-hidden rounded-lg p-5 sm:rounded-[2rem] sm:p-10">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/packs/categories/${categorySlug(pack.category)}`}
              className="frosted-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:bg-white/82 sm:px-4 sm:py-2 sm:text-sm"
            >
              {pack.category}
            </Link>
            {[pack.startupCost, pack.timeToFirstSale, pack.difficulty].map((chip) => (
              <span key={chip} className="frosted-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] sm:px-4 sm:py-2 sm:text-sm">
                {chip}
              </span>
            ))}
          </div>
          <h1
            className="display-type balanced mt-5 max-w-4xl break-words sm:mt-8"
            style={{ fontSize: "clamp(2.35rem, 11vw, 4rem)" }}
          >
            {pack.title}
          </h1>
          <p className="premium-copy mt-4 max-w-2xl text-base leading-7 sm:mt-6 sm:text-xl sm:leading-8">{pack.hook}</p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            {isMember ? (
              <a
                href="#member-assets"
                data-analytics-event="Member Downloads Jump Clicked"
                data-analytics-pack={pack.slug}
                data-analytics-location="pack_hero"
                className="accent-cta inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold sm:w-auto"
              >
                <Crown size={16} />
                Member downloads
              </a>
            ) : (
              <JoinButton label="Unlock pack" returnTo={`/packs/${pack.slug}`} className="w-full sm:w-auto" />
            )}
            <a
              href="#member-assets"
              data-analytics-event={isMember ? "Member Downloads Jump Clicked" : "Asset Preview Jump Clicked"}
              data-analytics-pack={pack.slug}
              data-analytics-location="pack_hero"
              className="frosted-pill inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--text-primary)] sm:w-auto"
            >
              {isMember ? "View included assets" : "Preview assets"}
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-6 max-w-3xl rounded-lg bg-[rgba(28,32,28,0.045)] p-4 ring-1 ring-[rgba(28,32,28,0.08)] sm:mt-7 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">What you are unlocking</p>
            <p className="mt-2 text-base font-bold leading-6 tracking-normal text-[var(--navy-ink)] sm:text-lg sm:leading-7">
              A sellable offer for {pack.buyer.toLowerCase()}, with the scripts, checklists, workbooks, and handoff material to pitch it, deliver it, and turn the first job into a repeatable service.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-3">
            {[
              ["Buyer", pack.buyer],
              ["Cost", pack.startupCost],
              ["First sale", pack.timeToFirstSale],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-[rgba(28,32,28,0.045)] p-4 ring-1 ring-[rgba(28,32,28,0.08)]">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">{label}</p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_0.55fr]">
          <div className="space-y-6">
            <div className="dark-pack-panel rounded-lg p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Startable offer</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.04] tracking-normal text-white sm:text-4xl sm:leading-none">Sell the first version before you build anything bigger.</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  ["What to sell", startableOffer],
                  ["Who buys", pack.buyer],
                  ["First proof", `Use ${firstAssetTitle} to make the pitch tangible.`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/82">{value}</p>
                  </div>
                ))}
              </div>
              {!isMember ? (
                <div className="mt-6">
                  <JoinButton label="Get the scripts and assets" returnTo={`/packs/${pack.slug}`} className="w-full sm:w-auto" />
                </div>
              ) : null}
            </div>
            <div className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
              <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">Overview</h2>
              <div className="mt-5 grid gap-3">
                {[
                  ["The problem", detail?.problem ?? pack.summary],
                  ["The solution", detail?.solution ?? pack.summary],
                  ["How you deliver it", detail?.delivery ?? "Turn the idea into a narrow first deliverable, get buyer approval, and hand off the finished asset with a clear next step."],
                  ["How to find first clients", detail?.firstClients ?? "Start with buyers who visibly have the problem, send a specific observation, and offer a small paid first version."],
                ].map(([label, value]) => (
                  <div key={label} className="pack-detail-tile rounded-2xl p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--safety-orange)]">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-primary)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
              <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">Why it works</h2>
              <p className="mt-4 leading-7 text-[var(--text-primary)]">{pack.whyItWorks}</p>
              <div className="mt-5 space-y-3">
                {(detail?.whyDetails ?? []).map((item) => (
                  <div key={item} className="pack-detail-tile flex items-start gap-3 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <p className="text-sm font-semibold leading-6 text-[var(--text-primary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {detail?.publicPreview ? (
              <div className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Public preview</p>
                    <h2 className="mt-3 text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">{detail.publicPreview.title}</h2>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text-primary)]">{detail.publicPreview.intro}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-[var(--orange-glass)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-[var(--safety-orange)]">
                    Free sample
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  {detail.publicPreview.steps.map((step, index) => (
                    <div key={step} className="pack-detail-tile-strong flex items-start gap-4 rounded-2xl p-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--orange-glass)] font-bold text-[var(--safety-orange)]">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm font-semibold leading-6 text-[var(--text-primary)]">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-lg bg-[var(--deep-forest)] p-4 text-white">
                  <p className="text-sm font-semibold leading-6 text-white/78">{detail.publicPreview.lockedAssetTease}</p>
                  {!isMember ? (
                    <div className="mt-4">
                      <JoinButton label="Unlock the full workflow" returnTo={`/packs/${pack.slug}`} className="w-full sm:w-auto" />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div id="member-assets" className="liquid-panel glass relative scroll-mt-24 overflow-hidden rounded-lg p-5 shadow-[0_0_0_1px_rgba(246,245,242,0.18),0_28px_90px_rgba(0,0,0,0.28)] sm:p-6">
              <div className="absolute inset-0 rounded-lg ring-1 ring-[rgba(28,32,28,0.18)]" />
              <div className="relative">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Member assets</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">
                      {isMember ? "Ready to download" : "Unlock the files that make this launchable"}
                    </h2>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--obsidian)] text-white shadow-lg sm:h-12 sm:w-12">
                    {isMember ? <Download size={20} /> : <LockKeyhole size={20} />}
                  </div>
                </div>
                <p className="max-w-2xl text-sm font-medium leading-6 text-[var(--text-primary)]">
                  {isMember
                    ? "Your membership is active in this browser. Download the practical files below and come back whenever you need the latest version."
                    : "These are the practical files that turn the idea into an offer you can sell: scripts, workbooks, scorecards, checklists, examples, delivery runbooks, and client handoff material. You are not starting from a blank page."}
                </p>
                {isMember ? (
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[var(--deep-forest)] px-4 py-2 text-sm font-bold text-white">
                      <ShieldCheck size={16} className="text-[var(--validation-green)]" />
                      <span className="truncate">{viewer.email ? `Member: ${viewer.email}` : "Member access active"}</span>
                    </div>
                    <a
                      href={`/api/download/pack/${pack.slug}`}
                      data-analytics-event="Pack Zip Download Clicked"
                      data-analytics-pack={pack.slug}
                      data-analytics-category={pack.category}
                      data-analytics-download-type="zip"
                      data-analytics-location="member_asset_panel"
                      className="accent-cta inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold sm:w-auto"
                    >
                      <Download size={16} />
                      Download all assets
                    </a>
                  </div>
                ) : null}
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Formats", assetTypes],
                    ["Included", `${pack.assets.length} member assets`],
                    ["Use them to", "Pitch, deliver, and follow up"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded bg-[rgba(28,32,28,0.045)] p-3 ring-1 ring-[rgba(28,32,28,0.08)]">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">{label}</p>
                      <p className="mt-1 text-sm font-bold text-[var(--navy-ink)]">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-4">
                  {assetWorkflow.map(([label, copy]) => (
                    <div key={label} className="rounded bg-[rgba(28,32,28,0.045)] px-4 py-3 ring-1 ring-[rgba(28,32,28,0.08)]">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--safety-orange)]">{label}</p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-[var(--text-primary)]">{copy}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  {pack.assets.map((asset) => {
                    const assetPresentation = getAssetPresentation(asset.title, asset.type);
                    const Icon = assetPresentation.Icon;
                    return (
                    <div key={asset.id} className="group rounded-lg bg-[rgba(246,245,242,0.62)] p-4 ring-1 ring-[rgba(28,32,28,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(246,245,242,0.78)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ring-white/75 ${assetPresentation.tone}`}>
                            <Icon size={18} />
                          </span>
                          <div className="min-w-0">
                            <span className="block text-base font-bold leading-5 tracking-normal text-[var(--navy-ink)]">{asset.title}</span>
                            <span className="mt-1 inline-flex rounded-full bg-white/75 px-2 py-0.5 text-[0.68rem] font-black uppercase tracking-[0.13em] text-[var(--text-primary)]">
                              {assetPresentation.label}
                            </span>
                          </div>
                        </div>
                        <span className="w-fit shrink-0 rounded-full bg-[var(--obsidian)] px-2.5 py-1 text-xs font-bold text-white">{asset.type}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-primary)]">{memberAssetDetails[asset.id] ?? asset.description}</p>
                      {isMember ? (
                        <a
                          href={`/api/download/${asset.id}`}
                          data-analytics-event="Asset Download Clicked"
                          data-analytics-pack={pack.slug}
                          data-analytics-asset={asset.id}
                          data-analytics-asset-type={asset.type}
                          data-analytics-download-type="single_asset"
                          data-analytics-location="member_asset_panel"
                          className="accent-cta mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-bold sm:w-auto"
                        >
                          <Download size={15} />
                          Download
                        </a>
                      ) : (
                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--safety-orange)]">
                          <LockKeyhole size={15} />
                          Unlock to download
                        </span>
                      )}
                    </div>
                    );
                  })}
                </div>
                {!isMember ? (
                  <div className="mt-5 rounded-lg bg-[var(--deep-forest)] p-4 text-white shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
                    <p className="text-sm font-semibold leading-6 text-white/76">
                      Unlock this pack when you want the practical files, not just the idea. Use them to send the first pitch, scope the first paid job, and deliver with a clean handoff.
                    </p>
                    <div className="mt-4">
                    <JoinButton label="Unlock these assets" returnTo={`/packs/${pack.slug}`} className="w-full sm:w-auto" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">First moves</h2>
              <div className="mt-5 space-y-3">
                {(detail?.firstMoveAnalysis ?? pack.firstSteps).map((step, index) => (
                  <div key={step} className="pack-detail-tile-strong flex items-start gap-4 rounded-2xl p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--orange-glass)] font-bold text-[var(--safety-orange)]">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm font-semibold leading-6">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">What the full pack adds</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["A first offer you can actually sell", `Position the starter version for ${pack.buyer.toLowerCase()} without inventing a whole agency.`],
                  ["Client-ready sales material", "Use the scripts, pitch framing, and follow-up prompts to start outreach with specificity."],
                  ["Delivery confidence", "Work from checklists, workbooks, scorecards, examples, and handoff notes instead of improvising."],
                  ["A path to repeat revenue", "Use the first delivery to identify the standard package, retainer, or next sprint."],
                ].map(([title, copy]) => (
                  <div key={title} className="pack-detail-tile rounded-2xl p-4">
                    <p className="text-sm font-bold tracking-normal text-[var(--navy-ink)]">{title}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">Offer ladder</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {offerLadder.map((offer) => (
                  <div key={offer.name} className="pack-detail-tile rounded-2xl p-4">
                    <p className="text-sm font-bold text-[var(--safety-orange)]">{offer.name}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{offer.price}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">{offer.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">Questions before you start</h2>
              <div className="mt-5 grid gap-3">
                {packFaqs.map(([question, answer]) => (
                  <div key={question} className="pack-detail-tile rounded-2xl p-4">
                    <h3 className="text-sm font-bold tracking-normal text-[var(--navy-ink)]">{question}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">Launch sprint</h2>
              <div className="mt-5 space-y-3">
                {launchSprint.map((step, index) => (
                  <div key={`${step}-${index}`} className="pack-detail-tile-strong flex items-start gap-3 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">Step {index + 1}</p>
                      <p className="mt-1 font-semibold">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {detail?.firstTenLeadsPlan ? (
              <div className="glass-soft rounded-[1.75rem] p-6">
                <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">First 10 leads plan</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text-primary)]">
                  Use this as the first prospecting sprint. The point is not to spam prospects; it is to find 10 {pack.buyer.toLowerCase()} who can immediately see the problem.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {detail.firstTenLeadsPlan.map((step, index) => (
                    <div key={step} className="pack-detail-tile rounded-2xl p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--safety-orange)]">Lead step {index + 1}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-normal text-[var(--navy-ink)]">Related launch packs</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {relatedPacks.map((relatedPack) => (
                  <Link
                    key={relatedPack.slug}
                    href={`/packs/${relatedPack.slug}`}
                    className="pack-detail-tile group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--safety-orange)]">{relatedPack.category}</p>
                    <p className="mt-2 text-sm font-bold leading-5 text-[var(--navy-ink)]">{relatedPack.title}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-[var(--graphite)]">{relatedPack.hook}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--safety-orange)]">
                      View related pack
                      <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="dark-pack-panel rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Rocket className="text-[var(--orange-hot)]" size={20} />
                <h3 className="font-semibold text-white">Why start this now</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                This is designed as a small, sellable service: visible buyer pain, clear first deliverable, low startup cost, and assets that help you move from idea to outreach.
              </p>
              <div className="mt-5 grid gap-2">
                {[
                  ["Buyer", pack.buyer],
                  ["Starter range", offerLadder[0].price],
                  ["Time to first sale", pack.timeToFirstSale],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/42">{label}</p>
                    <p className="mt-1 text-sm font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
              {!isMember ? (
                <div className="mt-5">
                  <JoinButton label="Unlock and start" returnTo={`/packs/${pack.slug}`} className="w-full" />
                </div>
              ) : null}
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <Target className="text-[var(--safety-orange)]" size={20} />
                <h3 className="font-semibold">Best buyer</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">{pack.buyer}</p>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <BadgeDollarSign className="text-[var(--safety-orange)]" size={20} />
                <h3 className="font-semibold">What to charge first</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                Start with the {offerLadder[0].name.toLowerCase()} version at {offerLadder[0].price}. Keep scope narrow, deliver fast, then use the result to pitch the standard package or retainer.
              </p>
            </div>
            {isMember ? (
              <div className="liquid-panel glass rounded-[2rem] p-6 orange-focus">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--orange-glass)] text-[var(--safety-orange)]">
                  <Crown size={22} />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">Member access active</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                  This full launch pack is unlocked. Jump straight to the downloads or manage your membership from the account page.
                </p>
                <div className="mt-6 grid gap-2">
                  <a
                    href="#member-assets"
                    data-analytics-event="Member Downloads Jump Clicked"
                    data-analytics-pack={pack.slug}
                    data-analytics-location="pack_sidebar"
                    className="accent-cta inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                  >
                    Go to downloads
                    <Download size={16} />
                  </a>
                  <a
                    href={`/api/download/pack/${pack.slug}`}
                    data-analytics-event="Pack Zip Download Clicked"
                    data-analytics-pack={pack.slug}
                    data-analytics-category={pack.category}
                    data-analytics-download-type="zip"
                    data-analytics-location="pack_sidebar"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--obsidian)] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    Download zip
                    <Download size={16} />
                  </a>
                  <Link href="/account" className="frosted-pill inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--text-primary)]">
                    Account
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="liquid-panel glass rounded-[2rem] p-6 orange-focus">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--orange-glass)] text-[var(--safety-orange)]">
                  <LockKeyhole size={22} />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">Unlock the full launch pack</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                  Become a member to access the complete playbook, asset downloads, outreach scripts, and launch checklist.
                </p>
                <div className="mt-6">
                  <JoinButton label="Unlock this pack" returnTo={`/packs/${pack.slug}`} className="w-full" />
                </div>
              </div>
            )}
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[var(--validation-green)]" size={20} />
                <h3 className="font-semibold">The catch</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">{pack.caveat}</p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
