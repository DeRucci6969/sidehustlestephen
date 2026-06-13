import { Check, ShieldCheck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";

export const metadata = {
  title: "Pricing | Side Hustle Stephen - The Launchpad",
  description: "Unlock every Side Hustle Stephen launch pack and asset for $12/month.",
};

export default function PricingPage() {
  const included = ["Full backlog access", "Launch assets and scripts", "Member-only playbooks", "Private download links"];
  const faqs = [
    ["Is this one pack or all packs?", "One membership unlocks every current and future business pack in the archive."],
    ["Can I cancel?", "Yes. Billing will be managed through Stripe Customer Portal once the live integration is configured."],
    ["Are results guaranteed?", "No. The packs provide execution support, assets, and playbooks, not income guarantees."],
  ];

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <section className="grid min-h-[60vh] items-center gap-8 lg:grid-cols-[0.9fr_0.7fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Membership</p>
          <h1 className="display-type mt-3 text-6xl sm:text-7xl">Every pack. Every asset. $12/month.</h1>
          <p className="premium-copy mt-6 max-w-2xl text-lg leading-8">
            All-access membership to the Launchpad archive, including the first 10 business packs and every new pack added after launch.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["10 launch packs", "31 assets", "All-access only"].map((item) => (
              <div key={item} className="glass-soft rounded-2xl p-4 text-sm font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="liquid-panel glass rounded-[2.35rem] p-7 orange-focus">
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-bold tracking-[-0.06em] text-[var(--navy-ink)]">$12</span>
            <span className="text-[var(--graphite)]">/ month</span>
          </div>
          <div className="mt-7 space-y-4">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--orange-glass)] text-[var(--safety-orange)]">
                  <Check size={16} />
                </span>
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <JoinButton label="Unlock The Launchpad" returnTo="/packs" className="w-full" />
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white/45 p-4 ring-1 ring-white/60">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
            <p className="text-sm leading-6 text-[var(--graphite)]">No income guarantees. The value is practical execution structure and downloadable launch assets.</p>
          </div>
        </div>
        </section>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {faqs.map(([question, answer]) => (
            <div key={question} className="glass-soft rounded-[1.75rem] p-5">
              <h2 className="font-bold tracking-[-0.025em] text-[var(--navy-ink)]">{question}</h2>
              <p className="premium-copy mt-3 text-sm leading-6">{answer}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
