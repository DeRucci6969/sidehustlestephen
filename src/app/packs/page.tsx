import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArchiveBrowser } from "@/components/archive-browser";
import { packs } from "@/data/packs";

export const metadata = {
  title: "Business Pack Archive | Side Hustle Stephen",
  description: "Browse the full archive of business launch packs, side hustle playbooks, and member assets.",
};

export default function PacksPage() {
  const totalAssets = packs.reduce((total, pack) => total + pack.assets.length, 0);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-5 py-12 sm:px-8">
        <div className="mb-10 grid min-w-0 gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div className="min-w-0 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Archive</p>
            <h1 className="display-type balanced mt-3 break-words text-[clamp(2.7rem,13vw,4rem)]">Business packs you can actually launch.</h1>
            <p className="premium-copy mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
              Browse {packs.length} business packs. Public previews are open; full playbooks and downloads unlock with membership.
            </p>
          </div>
          <div className="liquid-panel glass min-w-0 rounded-lg p-4 sm:p-5">
            <p className="text-sm font-semibold text-[var(--graphite)]">Archive snapshot</p>
            <div className="mt-4 grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-2 text-center">
              <div className="min-w-0 rounded-lg bg-white/55 p-3 ring-1 ring-white/70">
                <p className="text-2xl font-bold tracking-normal sm:text-3xl">{packs.length}</p>
                <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--graphite)] sm:text-[0.68rem] sm:tracking-[0.14em]">Packs</p>
              </div>
              <div className="min-w-0 rounded-lg bg-white/55 p-3 ring-1 ring-white/70">
                <p className="text-2xl font-bold tracking-normal sm:text-3xl">{totalAssets}</p>
                <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--graphite)] sm:text-[0.68rem] sm:tracking-[0.14em]">Assets</p>
              </div>
              <div className="min-w-0 rounded-lg bg-white/55 p-3 ring-1 ring-white/70">
                <p className="text-2xl font-bold tracking-normal sm:text-3xl">All</p>
                <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--graphite)] sm:text-[0.68rem] sm:tracking-[0.14em]">Access</p>
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
