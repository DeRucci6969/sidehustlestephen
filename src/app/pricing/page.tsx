import Link from "next/link";
import { ArrowRight, Check, Crown, ShieldCheck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { newlyAddedPacks, packs } from "@/data/packs";
import { getMembershipContext } from "@/lib/membership";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Pricing | Side Hustle Stephen",
  description: `Unlock every Side Hustle Stephen launch pack, outreach script, pricing file, delivery checklist, prompt pack, and member asset for ${siteConfig.priceLabel}.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | Side Hustle Stephen",
    description: "Unlock every launch pack, outreach script, pricing file, delivery checklist, prompt pack, and member asset.",
    url: "/pricing",
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Side Hustle Stephen pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Side Hustle Stephen",
    description: `Unlock every launch pack and member asset for ${siteConfig.priceLabel}.`,
    images: [siteConfig.ogImage],
  },
};

export default async function PricingPage() {
  const viewer = await getMembershipContext();
  const totalAssets = packs.reduce((total, pack) => total + pack.assets.length, 0);
  const includedToday = newlyAddedPacks.slice(0, 4);
  const included = ["Full backlog access", "Launch assets and scripts", "Member-only playbooks", "Private download links"];
  const assetExamples = [
    ["Outreach", "Cold emails, DMs, call scripts, follow-ups, and first-buyer pitch angles."],
    ["Pricing", "Quote calculators, starter ranges, retainer ladders, and scope boundaries."],
    ["Delivery", "Checklists, SOPs, intake forms, client handoff copy, and QA notes."],
    ["AI support", "Prompt packs for research, outreach, delivery, reporting, and proof repurposing."],
  ];
  const firstActions = [
    "Pick one launch pack that matches a buyer you can reach this week.",
    "Use the pricing and outreach assets to send the first 20 messages.",
    "Deliver the first narrow version before trying to build a bigger offer.",
  ];
  const faqs = [
    ["Is this one pack or all packs?", "One membership unlocks every current and future business pack in the archive."],
    ["Can I cancel?", "Yes. Active subscribers can manage billing and cancellation through the Stripe Customer Portal."],
    ["What can I do after joining?", "Use ready-made prompts, scripts, pricing tools, and delivery files to turn a simple business idea into a client-ready offer."],
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <Header viewer={viewer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <section className="grid min-h-[60vh] items-center gap-8 lg:grid-cols-[0.9fr_0.7fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Membership</p>
            <h1 className="display-type mt-3 break-words text-[clamp(2.35rem,11vw,4rem)] leading-[1.02]">Every pack. Every asset. {siteConfig.priceLabel}.</h1>
            <p className="premium-copy mt-6 max-w-2xl text-lg leading-8">
              All-access membership to the business pack archive, including {packs.length} business packs and every new pack added after launch.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[`${packs.length} launch packs`, `${totalAssets} assets`, "All-access only"].map((item) => (
                <div key={item} className="glass-soft rounded-lg p-4 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 max-w-2xl rounded-lg bg-[rgba(28,32,28,0.045)] p-4 ring-1 ring-[rgba(28,32,28,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Included today</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {includedToday.map((pack) => (
                  <Link
                    key={pack.slug}
                    href={`/packs/${pack.slug}`}
                    className="group rounded-lg bg-white/64 p-3 ring-1 ring-[rgba(28,32,28,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <span className="block text-sm font-bold leading-5 tracking-normal text-[var(--navy-ink)]">{pack.title}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--graphite)]">
                      {pack.buyer} - {pack.assets.length} assets
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--safety-orange)]">
                      View pack
                      <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="liquid-panel glass rounded-lg p-5 orange-focus sm:p-7">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-7xl">{siteConfig.priceLabel.split("/")[0]}</span>
              <span className="text-[var(--graphite)]">/ month</span>
            </div>
            <div className="mt-7 space-y-4">
              {included.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(28,32,28,0.06)] text-[var(--obsidian)]">
                    <Check size={16} />
                  </span>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
            {viewer.isMember ? (
              <div className="mt-8 rounded-lg bg-[var(--deep-forest)] p-4 text-white">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Crown size={17} className="text-[var(--orange-hot)]" />
                  Member access active
                </div>
                <p className="mt-2 text-sm leading-6 text-white/68">You already have access to every pack and asset in the archive.</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <Link href="/packs" className="accent-cta inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold">
                    Browse packs
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/account" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15">
                    Account
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <JoinButton label={viewer.isAuthenticated ? "Continue checkout" : "Unlock Packs"} returnTo="/packs" className="w-full" />
              </div>
            )}
            <div className="mt-5 flex items-start gap-3 rounded bg-[rgba(28,32,28,0.045)] p-4 ring-1 ring-[rgba(28,32,28,0.08)]">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
              <p className="text-sm leading-6 text-[var(--graphite)]">Built for practical execution: prompts, scripts, pricing tools, and downloadable launch assets in one place.</p>
            </div>
          </div>
        </section>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {faqs.map(([question, answer]) => (
            <div key={question} className="glass-soft rounded-lg p-5">
              <h2 className="font-bold tracking-normal text-[var(--navy-ink)]">{question}</h2>
              <p className="premium-copy mt-3 text-sm leading-6">{answer}</p>
            </div>
          ))}
        </section>
        <section className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_0.55fr]">
          <div className="glass-soft rounded-lg p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">What unlocks</p>
            <h2 className="mt-3 text-3xl font-bold leading-none tracking-normal text-[var(--navy-ink)]">Not a folder of ideas. A stack of launch files.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {assetExamples.map(([title, copy]) => (
                <div key={title} className="rounded-lg bg-white/70 p-4 ring-1 ring-[rgba(28,32,28,0.08)]">
                  <h3 className="font-bold tracking-normal text-[var(--navy-ink)]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--graphite)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="dark-pack-panel rounded-lg p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">First move</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-normal text-white">What to do after joining</h2>
            <div className="mt-5 space-y-3">
              {firstActions.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--orange-glass)] text-sm font-black text-[var(--orange-hot)]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-6 text-white/76">{item}</p>
                </div>
              ))}
            </div>
            {!viewer.isMember ? (
              <div className="mt-6">
                <JoinButton label={viewer.isAuthenticated ? "Continue checkout" : "Unlock the archive"} returnTo="/packs" className="w-full" />
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
