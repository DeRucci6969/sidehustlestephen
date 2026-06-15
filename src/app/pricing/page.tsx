import { Check, ShieldCheck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { packs } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Pricing | Side Hustle Stephen",
  description: "Unlock every Side Hustle Stephen launch pack and asset for $9/month.",
};

export default function PricingPage() {
  const totalAssets = packs.reduce((total, pack) => total + pack.assets.length, 0);
  const included = ["Full backlog access", "Launch assets and scripts", "Member-only playbooks", "Private download links"];
  const faqs = [
    ["Is this one pack or all packs?", "One membership unlocks every current and future business pack in the archive."],
    ["Can I cancel?", "Yes. Active subscribers can manage billing and cancellation through the Stripe Customer Portal."],
    ["Are results guaranteed?", "No. The packs provide execution support, assets, and playbooks, not income guarantees."],
  ];

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <section className="grid min-h-[60vh] items-center gap-8 lg:grid-cols-[0.9fr_0.7fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Membership</p>
            <h1 className="display-type mt-3 text-5xl sm:text-[64px]">Every pack. Every asset. {siteConfig.priceLabel}.</h1>
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
          </div>
          <div className="liquid-panel glass rounded-lg p-7 orange-focus">
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-normal text-[var(--navy-ink)]">{siteConfig.priceLabel.split("/")[0]}</span>
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
            <div className="mt-8">
              <JoinButton label="Unlock Packs" returnTo="/packs" className="w-full" />
            </div>
            <div className="mt-5 flex items-start gap-3 rounded bg-[rgba(28,32,28,0.045)] p-4 ring-1 ring-[rgba(28,32,28,0.08)]">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
              <p className="text-sm leading-6 text-[var(--graphite)]">No income guarantees. The value is practical execution structure and downloadable launch assets.</p>
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
      </main>
      <Footer />
    </>
  );
}
