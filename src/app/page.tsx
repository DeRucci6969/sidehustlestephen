import Link from "next/link";
import { ArrowRight, Download, Layers, Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { PackCard } from "@/components/pack-card";
import { PackMatcher } from "@/components/pack-matcher";
import { Section } from "@/components/section";
import { featuredPacks, newlyAddedPacks, packs, popularPacks } from "@/data/packs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 pb-10 pt-6 sm:px-8 sm:pb-14 lg:min-h-[760px] lg:grid-cols-[1.04fr_0.96fr]">
          <div className="mobile-frame min-w-0">
            <div className="frosted-pill mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--graphite)]">
              <Sparkles size={16} className="text-[var(--safety-orange)]" />
              The full packs behind the videos
            </div>
            <h1
              className="display-type balanced max-w-4xl break-words"
              style={{ fontSize: "clamp(2rem, 10vw, 8.2rem)" }}
            >
              <span className="block">Take the</span>
              <span className="block">first practical</span>
              <span className="block">step.</span>
            </h1>
            <p className="premium-copy mt-7 max-w-xs text-base leading-8 sm:max-w-2xl sm:text-lg">
              Pick a business idea, download the launch assets, and make the next move with scripts, pricing, and a simple first-week plan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <JoinButton label="Unlock all packs for $12/month" className="w-full sm:w-auto" />
              <Link
                href="/packs"
                className="frosted-pill inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--obsidian)] sm:w-auto"
              >
                Browse archive
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mobile-frame mt-10 grid grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-3">
              {[
                ["10", "launch packs"],
                ["31", "member assets"],
                ["1-7", "day starters"],
              ].map(([value, label]) => (
                <div key={label} className="glass-soft rounded-[1.35rem] p-4">
                  <p className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--graphite)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-frame grid min-h-[560px] gap-4 sm:grid-cols-2 sm:grid-rows-[1.08fr_0.92fr] lg:min-h-[620px]">
            <div className="liquid-panel glass relative overflow-hidden rounded-[2.4rem] p-6 sm:col-span-2">
              <div className="relative flex h-full min-h-[310px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="frosted-pill rounded-full px-4 py-2 text-sm font-bold text-[var(--safety-orange)]">All-access</span>
                  <span className="rounded-full bg-[var(--obsidian)] px-4 py-2 font-mono text-sm text-white">$12/mo</span>
                </div>
                <div className="max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Member archive</p>
                  <h2 className="mt-3 text-5xl font-bold leading-[0.92] tracking-[-0.05em] text-[var(--navy-ink)] sm:text-6xl">Every asset in one premium vault.</h2>
                </div>
              </div>
            </div>
            <div className="glass overflow-hidden rounded-[2rem] p-5">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--navy-ink)]">What unlocks</h2>
              <div className="mt-6 space-y-3">
                {[
                  ["Detailed playbooks", Layers],
                  ["Downloadable assets", Download],
                  ["Outreach scripts and pricing", Sparkles],
                ].map(([label, Icon]) => (
                  <div key={label as string} className="flex items-center gap-4 rounded-2xl bg-white/38 p-4 ring-1 ring-white/60">
                    <Icon className="text-[var(--safety-orange)]" size={20} />
                    <span className="font-semibold">{label as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-ink overflow-hidden rounded-[2rem] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Start here</p>
              <p className="mt-8 text-6xl font-bold tracking-[-0.06em]">01</p>
              <p className="mt-3 text-sm font-medium leading-6 text-white/70">Pick a pack by buyer, cost, and time-to-first-sale, then use the included assets to launch faster.</p>
            </div>
          </div>
          <div className="glass-soft rounded-[1.5rem] p-3 lg:hidden">
            <p className="px-2 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Latest packs</p>
            <div className="grid gap-3">
              {newlyAddedPacks.slice(0, 2).map((pack) => (
                <Link key={pack.slug} href={`/packs/${pack.slug}`} className="rounded-2xl bg-white/75 p-4">
                  <p className="text-sm font-semibold">{pack.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--graphite)]">{pack.hook}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PackMatcher packs={packs} />

        <Section eyebrow="Newly added" title="Fresh launch packs">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {newlyAddedPacks.map((pack) => (
              <PackCard key={pack.slug} pack={pack} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Featured" title="Best places to start">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredPacks.map((pack) => (
              <PackCard key={pack.slug} pack={pack} featured />
            ))}
          </div>
        </Section>

        <Section eyebrow="Most popular" title="What viewers are saving">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularPacks.map((pack) => (
              <PackCard key={pack.slug} pack={pack} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
