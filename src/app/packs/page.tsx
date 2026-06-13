import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArchiveBrowser } from "@/components/archive-browser";
import { packs } from "@/data/packs";

export const metadata = {
  title: "Business Pack Archive | Side Hustle Stephen - The Launchpad",
  description: "Browse the full archive of business launch packs, side hustle playbooks, and member assets.",
};

export default function PacksPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Archive</p>
          <h1 className="display-type mt-3 text-6xl sm:text-7xl">Business packs you can actually launch.</h1>
          <p className="premium-copy mt-5 text-lg leading-8">
            Browse the first 10 Launchpad packs. Public previews are open; full playbooks and downloads unlock with membership.
          </p>
          </div>
          <div className="liquid-panel glass rounded-[2rem] p-5">
            <p className="text-sm font-semibold text-[var(--graphite)]">Archive snapshot</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-white/45 p-3 ring-1 ring-white/60">
                <p className="text-3xl font-bold tracking-[-0.04em]">{packs.length}</p>
                <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--graphite)]">Packs</p>
              </div>
              <div className="rounded-2xl bg-white/45 p-3 ring-1 ring-white/60">
                <p className="text-3xl font-bold tracking-[-0.04em]">{packs.reduce((total, pack) => total + pack.assets.length, 0)}</p>
                <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--graphite)]">Assets</p>
              </div>
              <div className="rounded-2xl bg-white/45 p-3 ring-1 ring-white/60">
                <p className="text-3xl font-bold tracking-[-0.04em]">$12</p>
                <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--graphite)]">Monthly</p>
              </div>
            </div>
          </div>
        </div>
        <ArchiveBrowser packs={packs} />
      </main>
      <Footer />
    </>
  );
}
