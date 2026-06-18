import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { ManageBillingButton } from "@/components/manage-billing-button";
import { SignOutButton } from "@/components/sign-out-button";
import { getMembershipContext } from "@/lib/membership";
import { siteConfig } from "@/lib/site";
import { ArrowRight, CheckCircle2, Crown, LockKeyhole, Sparkles, UserCircle2 } from "lucide-react";

export const metadata = {
  title: "Account | Side Hustle Stephen",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function AccountPage() {
  const viewer = await getMembershipContext();
  const benefitItems = [
    "Pick a simple service idea and get the files behind it",
    "Use prompts, scripts, and pricing tools to shape the offer faster",
    "Download client-ready templates when you are ready to deliver",
    "Come back anytime as new launch packs and assets are added",
  ];

  return (
    <>
      <Header viewer={viewer} />
      <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.9fr_0.55fr]">
          <section className="glass min-w-0 rounded-lg p-5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Account</p>
                <h1 className="mt-3 break-words text-[clamp(2.35rem,11vw,3rem)] font-semibold leading-[1.02] tracking-tight sm:text-5xl">Membership dashboard</h1>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--obsidian)] px-4 py-2 text-sm font-bold text-white shadow-[0_18px_45px_rgba(7,10,15,0.18)]">
                {viewer.isMember ? <Crown size={16} className="text-[var(--orange-hot)]" /> : <UserCircle2 size={16} />}
                {viewer.isMember ? "Member access active" : viewer.isAuthenticated ? "Signed in" : "Not signed in"}
              </div>
            </div>
            <p className="mt-5 max-w-2xl leading-7 text-[var(--graphite)]">
              {viewer.isMember
                ? "Your membership is active. Use this page to manage billing or jump back into the archive."
                : viewer.isAuthenticated
                  ? "You are signed in, but this account does not have active membership access yet."
                  : "Sign in with a secure link to unlock the archive, downloads, and billing tools."}
            </p>
            <div className="mt-7 min-w-0 rounded-lg bg-[var(--deep-forest)] p-4 text-white shadow-[0_22px_70px_rgba(0,0,0,0.18)] sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/48">Current access</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="break-words text-2xl font-bold tracking-normal sm:text-3xl">
                    {viewer.isMember ? "All packs unlocked" : viewer.isAuthenticated ? "Checkout not complete" : "Login required"}
                  </p>
                  <p className="mt-2 break-words text-sm font-semibold leading-6 text-white/68">
                    {viewer.email ? viewer.email : "No active account session in this browser."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {viewer.isMember ? (
                    <Link href="/packs" className="accent-cta inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold">
                      Browse packs
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <JoinButton label={viewer.isAuthenticated ? "Continue checkout" : "Unlock membership"} returnTo="/packs" className="w-full sm:w-auto" />
                  )}
                  {viewer.isAuthenticated ? <SignOutButton className="border-white/15 bg-white/10 text-white shadow-none hover:bg-white/15" /> : null}
                </div>
              </div>
            </div>
            <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-3">
              {[
                ["Status", viewer.status === "active" ? "Active" : viewer.status === "setup_required" ? "Temporarily unavailable" : viewer.isAuthenticated ? "Signed in" : "Inactive"],
                ["Plan", siteConfig.priceLabel],
                ["Access", viewer.isMember ? "All packs" : "Locked"],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0 rounded-lg bg-white/70 p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">{label}</p>
                  <p className="mt-2 font-semibold">{value}</p>
                </div>
              ))}
            </div>
            {viewer.isMember ? (
              <div className="mt-8">
                <ManageBillingButton />
              </div>
            ) : null}
          </section>

          <aside className="min-w-0 space-y-6">
            <div className="glass-soft rounded-lg p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="text-[var(--safety-orange)]" size={20} />
                <h2 className="font-semibold">What membership helps with</h2>
              </div>
              <div className="mt-5 space-y-3">
                {benefitItems.map((item) => (
                  <div key={item} className="flex min-w-0 items-start gap-3 rounded-lg bg-white/70 p-4">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <p className="text-sm font-semibold leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-soft rounded-lg p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <LockKeyhole className="text-[var(--safety-orange)]" size={20} />
                <h2 className="font-semibold">Billing help</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">
                Billing opens through Stripe for active subscribers. If your payment just completed, give access a moment to sync and refresh this page.
              </p>
            </div>
          </aside>
          </div>
      </main>
      <Footer />
    </>
  );
}
