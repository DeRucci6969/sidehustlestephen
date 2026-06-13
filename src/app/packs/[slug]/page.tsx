import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeDollarSign, CheckCircle2, ClipboardList, Download, FileQuestion, FileText, LockKeyhole, Mail, Rocket, ShieldCheck, Sparkles, Table2, Target } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { getPack, memberAssetDetails, packPageDetails, packs } from "@/data/packs";
import { getMembershipStatus } from "@/lib/membership";

function getAssetPresentation(title: string, type: string) {
  if (title.includes("Intake")) return { label: "Scope", Icon: ClipboardList, tone: "bg-[#fff1e7] text-[var(--safety-orange)]" };
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

  return {
    title: `${pack.title} | Side Hustle Stephen - The Launchpad`,
    description: `${pack.hook} Get the full launch pack, assets, and playbook inside The Launchpad.`,
  };
}

export function generateStaticParams() {
  return packs.map((pack) => ({ slug: pack.slug }));
}

export default async function PackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pack = getPack(slug);
  if (!pack) notFound();
  const detail = packPageDetails[pack.slug];
  const membership = await getMembershipStatus();
  const isMember = membership === "active";
  const offerLadder = [
    { name: "Starter", price: "$99-$249", detail: `A focused first version for ${pack.buyer.toLowerCase()}.` },
    { name: "Standard", price: "$300-$750", detail: "Adds polish, revisions, templates, and a sharper delivery package." },
    { name: "Retainer", price: "$250-$1k/mo", detail: "Turns the one-off service into recurring maintenance or reporting." },
  ];
  const launchSprint = detail?.launchSprintDetails ?? ["Pick a tight buyer segment", ...pack.firstSteps, "Package proof and follow up"].slice(0, 5);
  const assetTypes = Array.from(new Set(pack.assets.map((asset) => asset.type))).join(", ");
  const firstAssetTitle = pack.assets[0]?.title ?? "launch asset";
  const assetWorkflow = [
    ["Scope", "Collect clean inputs"],
    ["Sell", "Send specific outreach"],
    ["Deliver", "Use checklists and templates"],
    ["Follow up", "Turn delivery into the next offer"],
  ];

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-10 sm:px-8">
        <Link href="/packs" className="frosted-pill mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--graphite)]">
          <ArrowLeft size={16} />
          Back to archive
        </Link>
        <section className="liquid-panel glass overflow-hidden rounded-[2.5rem] p-7 sm:p-10">
          <div className="flex flex-wrap gap-2">
            {[pack.category, pack.startupCost, pack.timeToFirstSale, pack.difficulty].map((chip) => (
              <span key={chip} className="frosted-pill rounded-full px-3 py-2 text-xs font-semibold text-[var(--graphite)] sm:px-4 sm:text-sm">
                {chip}
              </span>
            ))}
          </div>
          <h1
            className="display-type balanced mt-8 max-w-4xl break-words"
            style={{ fontSize: "clamp(2.8rem, 10vw, 6.2rem)" }}
          >
            {pack.title}
          </h1>
          <p className="premium-copy mt-6 max-w-2xl text-lg leading-8 sm:text-xl">{pack.hook}</p>
          <div className="mt-7 max-w-3xl rounded-[2rem] bg-white/45 p-4 ring-1 ring-white/60 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">What you are unlocking</p>
            <p className="mt-2 text-lg font-bold leading-7 tracking-[-0.025em] text-[var(--navy-ink)]">
              A sellable offer for {pack.buyer.toLowerCase()}, with the scripts, checklists, workbooks, and handoff material to pitch it, deliver it, and turn the first job into a repeatable service.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Buyer", pack.buyer],
              ["Cost", pack.startupCost],
              ["First sale", pack.timeToFirstSale],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/45 p-4 ring-1 ring-white/60">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">{label}</p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <JoinButton label="Unlock this launch pack" returnTo={`/packs/${pack.slug}`} className="w-full sm:w-auto" />
            <a href="#member-assets" className="frosted-pill inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--obsidian)] sm:w-auto">
              Preview assets
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_0.55fr]">
          <div className="space-y-6">
            <div className="glass-ink rounded-[2rem] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Startable offer</p>
              <h2 className="mt-3 text-4xl font-bold leading-none tracking-[-0.055em] text-white">Sell the first version before you build anything bigger.</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  ["What to sell", `A focused ${pack.title.toLowerCase()} starter package.`],
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
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">Overview</h2>
              <div className="mt-5 grid gap-3">
                {[
                  ["The problem", detail?.problem ?? pack.summary],
                  ["The solution", detail?.solution ?? pack.summary],
                  ["How you deliver it", detail?.delivery ?? "Turn the idea into a narrow first deliverable, get buyer approval, and hand off the finished asset with a clear next step."],
                  ["How to find first clients", detail?.firstClients ?? "Start with buyers who visibly have the problem, send a specific observation, and offer a small paid first version."],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/45 p-4 ring-1 ring-white/60">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--safety-orange)]">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--graphite)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">Why it works</h2>
              <p className="mt-4 leading-7 text-[var(--graphite)]">{pack.whyItWorks}</p>
              <div className="mt-5 space-y-3">
                {(detail?.whyDetails ?? []).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/45 p-4 ring-1 ring-white/60">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <p className="text-sm font-semibold leading-6 text-[var(--graphite)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="member-assets" className="liquid-panel glass relative scroll-mt-24 overflow-hidden rounded-[2rem] p-6 shadow-[0_0_0_1px_rgba(201,71,0,0.28),0_0_60px_rgba(201,71,0,0.22),0_28px_90px_rgba(32,48,62,0.16)]">
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-[rgba(255,152,86,0.46)]" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Member assets</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">
                      {isMember ? "Ready to download" : "Unlock the files that make this launchable"}
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--obsidian)] text-white shadow-lg">
                    <LockKeyhole size={20} />
                  </div>
                </div>
                <p className="max-w-2xl text-sm font-medium leading-6 text-[var(--graphite)]">
                  These are the practical files that turn the idea into an offer you can sell: scripts, workbooks, scorecards, checklists, examples, delivery runbooks, and client handoff material. You are not starting from a blank page.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Formats", assetTypes],
                    ["Included", `${pack.assets.length} member assets`],
                    ["Use them to", "Pitch, deliver, and follow up"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white/45 p-3 ring-1 ring-white/60">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">{label}</p>
                      <p className="mt-1 text-sm font-bold text-[var(--navy-ink)]">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-4">
                  {assetWorkflow.map(([label, copy]) => (
                    <div key={label} className="rounded-2xl bg-white/46 px-4 py-3 ring-1 ring-white/70">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--safety-orange)]">{label}</p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-[var(--graphite)]">{copy}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  {pack.assets.map((asset) => {
                    const assetPresentation = getAssetPresentation(asset.title, asset.type);
                    const Icon = assetPresentation.Icon;
                    return (
                    <div key={asset.id} className="group rounded-[1.25rem] bg-white/68 p-4 ring-1 ring-white/80 transition duration-200 hover:-translate-y-0.5 hover:bg-white/82 hover:shadow-[0_18px_45px_rgba(32,48,62,0.12)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ring-white/75 ${assetPresentation.tone}`}>
                            <Icon size={18} />
                          </span>
                          <div className="min-w-0">
                            <span className="block text-base font-bold leading-5 tracking-[-0.02em] text-[var(--navy-ink)]">{asset.title}</span>
                            <span className="mt-1 inline-flex rounded-full bg-white/75 px-2 py-0.5 text-[0.68rem] font-black uppercase tracking-[0.13em] text-[var(--graphite)]">
                              {assetPresentation.label}
                            </span>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-[var(--obsidian)] px-2.5 py-1 text-xs font-bold text-white">{asset.type}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--graphite)]">{memberAssetDetails[asset.id] ?? asset.description}</p>
                      {isMember ? (
                        <a href={`/api/download/${asset.id}`} className="accent-cta mt-3 inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-bold">
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
                  <div className="mt-5 rounded-2xl bg-[rgba(5,8,20,0.9)] p-4 text-white shadow-[0_18px_55px_rgba(5,8,20,0.22)]">
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
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">First moves</h2>
              <div className="mt-5 space-y-3">
                {(detail?.firstMoveAnalysis ?? pack.firstSteps).map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl bg-white/70 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--orange-glass)] font-bold text-[var(--safety-orange)]">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm font-semibold leading-6">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">What the full pack adds</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["A first offer you can actually sell", `Position the starter version for ${pack.buyer.toLowerCase()} without inventing a whole agency.`],
                  ["Client-ready sales material", "Use the scripts, pitch framing, and follow-up prompts to start outreach with specificity."],
                  ["Delivery confidence", "Work from checklists, workbooks, scorecards, examples, and handoff notes instead of improvising."],
                  ["A path to repeat revenue", "Use the first delivery to identify the standard package, retainer, or next sprint."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-2xl bg-white/70 p-4">
                    <p className="text-sm font-bold tracking-[-0.02em] text-[var(--navy-ink)]">{title}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--graphite)]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">Offer ladder</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {offerLadder.map((offer) => (
                  <div key={offer.name} className="rounded-2xl bg-white/70 p-4">
                    <p className="text-sm font-bold text-[var(--safety-orange)]">{offer.name}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{offer.price}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">{offer.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">Launch sprint</h2>
              <div className="mt-5 space-y-3">
                {launchSprint.map((step, index) => (
                  <div key={`${step}-${index}`} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">Step {index + 1}</p>
                      <p className="mt-1 font-semibold">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="glass-ink rounded-[2rem] p-6">
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
              <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">{pack.buyer}</p>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <BadgeDollarSign className="text-[var(--safety-orange)]" size={20} />
                <h3 className="font-semibold">What to charge first</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">
                Start with the {offerLadder[0].name.toLowerCase()} version at {offerLadder[0].price}. Keep scope narrow, deliver fast, then use the result to pitch the standard package or retainer.
              </p>
            </div>
            <div className="liquid-panel glass rounded-[2rem] p-6 orange-focus">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--orange-glass)] text-[var(--safety-orange)]">
                <LockKeyhole size={22} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Unlock the full launch pack</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">
                Become a member to access the complete playbook, asset downloads, outreach scripts, and launch checklist.
              </p>
              <div className="mt-6">
                <JoinButton label="Unlock this pack" returnTo={`/packs/${pack.slug}`} className="w-full" />
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[var(--validation-green)]" size={20} />
                <h3 className="font-semibold">The catch</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">{pack.caveat}</p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
