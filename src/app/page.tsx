import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { PackMatcher } from "@/components/pack-matcher";
import { QuoteCarousel } from "@/components/quote-carousel";
import { packs, popularPacks } from "@/data/packs";

export default function Home() {
  const totalAssets = packs.reduce((total, pack) => total + pack.assets.length, 0);

  return (
    <>
      <Header />
      <main>
        <section className="launch-shell flex w-full items-start px-4 pb-14 pt-12 sm:px-8 lg:min-h-[min(900px,calc(100svh-5rem))] lg:items-center lg:pb-20 lg:pt-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="mobile-frame min-w-0">
              <h1
                className="display-type balanced max-w-4xl break-words"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6.8rem)" }}
              >
                <span className="block">Start a</span>
                <span className="block">simple business</span>
                <span className="block">today.</span>
              </h1>
              <p className="premium-copy mt-7 max-w-xs text-base leading-8 sm:max-w-2xl sm:text-lg">
                Choose one service idea, unlock the assets behind it, and use the prompts, pricing, outreach, and delivery files to start selling with less guesswork.
              </p>
              <form
                action="/packs"
                className="mt-8 flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(10,12,16,0.1)] bg-[rgba(255,253,248,0.86)] p-2 shadow-[0_14px_36px_rgba(10,12,16,0.06)] backdrop-blur-sm"
                style={{ width: "min(100%, calc(100vw - 2rem))", maxWidth: "36rem" }}
              >
                <Search size={18} className="ml-3 shrink-0 text-[var(--graphite)]" />
                <label htmlFor="hero-business-search" className="sr-only">
                  Find a business
                </label>
                <input
                  id="hero-business-search"
                  name="search"
                  type="search"
                  placeholder="Find a business"
                  className="h-10 min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--navy-ink)] outline-none placeholder:text-[var(--graphite)]"
                />
                <button
                  type="submit"
                  aria-label="Search business packs"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--obsidian)] text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(10,12,16,0.2)]"
                >
                  <ArrowRight size={17} />
                </button>
              </form>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <JoinButton label="Unlock Packs" className="w-full sm:w-auto" />
                <Link
                  href="/packs"
                  className="frosted-pill inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--text-primary)] sm:w-auto"
                >
                  Browse archive
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[var(--graphite)]">
                <span>{packs.length} launch packs</span>
                <span className="h-1 w-1 rounded-full bg-[var(--safety-orange)]" />
                <span>{totalAssets} member assets</span>
                <span className="h-1 w-1 rounded-full bg-[var(--safety-orange)]" />
                <span>Prompts, scripts, pricing, delivery files</span>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["1", "2", "3", "4"].map((initial, index) => (
                    <span
                      key={initial}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--studio-white)] text-xs font-bold text-white shadow-[0_8px_18px_rgba(10,12,16,0.12)]"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(135deg, #0b0d10, #1688ff)"
                            : "linear-gradient(135deg, #4ca8ff, #0f172a)",
                      }}
                    >
                      {initial}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-[var(--navy-ink)]">
                  Start with one buyer, one offer, one outreach script, and one delivery checklist.
                </p>
              </div>
            </div>

            <div className="hero-image-stage mobile-frame relative min-h-[420px] lg:min-h-[680px]">
              <Image
                src="/visuals/hero/side-hustle-stephen-character-hero.png"
                alt="A Side Hustle Stephen creator working from a laptop with coffee."
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="hero-character-image"
              />
            </div>
          </div>
        </section>

        <PackMatcher packs={packs} />
        <QuoteCarousel />
        <PackMatcher packs={popularPacks} eyebrow="Most popular" title="Most popular." sortByPopularity />
      </main>
      <Footer />
    </>
  );
}
