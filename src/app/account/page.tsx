import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ManageBillingButton } from "@/components/manage-billing-button";
import { getMembershipStatus } from "@/lib/membership";
import { CheckCircle2, LockKeyhole, Settings2 } from "lucide-react";

export const metadata = {
  title: "Account | Side Hustle Stephen - The Launchpad",
};

export default async function AccountPage() {
  const membership = await getMembershipStatus();
  const setupItems = [
    "Magic-link auth creates the member session",
    "Stripe Checkout starts the $12/month subscription",
    "Webhook sync marks the Supabase profile active",
    "Private asset links unlock from each pack page",
  ];

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_0.55fr]">
          <section className="glass rounded-[2rem] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Account</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">Membership dashboard</h1>
            <p className="mt-5 max-w-2xl leading-7 text-[var(--graphite)]">
              Your account will show membership status, renewal state, billing management, and asset access once Supabase and Stripe are configured.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Status", membership === "active" ? "Active" : membership === "setup_required" ? "Setup mode" : "Inactive"],
                ["Plan", "$12/month"],
                ["Access", "All packs"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/70 p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">{label}</p>
                  <p className="mt-2 font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ManageBillingButton />
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <Settings2 className="text-[var(--safety-orange)]" size={20} />
                <h2 className="font-semibold">Activation path</h2>
              </div>
              <div className="mt-5 space-y-3">
                {setupItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <p className="text-sm font-semibold leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3">
                <LockKeyhole className="text-[var(--safety-orange)]" size={20} />
                <h2 className="font-semibold">Setup note</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">
                Billing management remains disabled until Stripe customer records are synced through webhooks.
              </p>
            </div>
          </aside>
          </div>
      </main>
      <Footer />
    </>
  );
}
