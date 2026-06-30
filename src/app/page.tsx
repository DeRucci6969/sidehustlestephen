import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Header } from "@/components/header";
import { AssetTypesSection } from "@/components/asset-types-section";
import { Footer } from "@/components/footer";
import { JoinButton } from "@/components/join-modal";
import { PackMatcher } from "@/components/pack-matcher";
import { QuoteCarousel } from "@/components/quote-carousel";
import { featuredBlogPosts } from "@/data/blog";
import { packs, popularPacks } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Side Hustle Stephen | Practical Launch Packs for Simple Businesses",
  description: "Browse practical side hustle launch packs with outreach scripts, pricing files, prompts, delivery checklists, and first-client plans.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Side Hustle Stephen | Practical Launch Packs",
    description: "Simple business ideas backed by launch files, scripts, pricing tools, prompts, and delivery systems.",
    url: "/",
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Side Hustle Stephen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Side Hustle Stephen | Practical Launch Packs",
    description: "Launch packs for simple services you can pitch, price, and deliver.",
    images: [siteConfig.ogImage],
  },
};

export default function Home() {
  const totalAssets = packs.reduce((total, pack) => total + pack.assets.length, 0);

  return (
    <>
      <Header />
      <main>
        <section className="launch-shell flex w-full items-start px-4 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12 lg:min-h-[min(900px,calc(100svh-5rem))] lg:items-center lg:pb-20 lg:pt-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="mobile-frame min-w-0">
              <h1
                className="display-type balanced max-w-4xl break-words"
                style={{ fontSize: "clamp(2.65rem, 13vw, 6.8rem)" }}
              >
                <span className="block">Start a</span>
                <span className="block">simple business</span>
                <span className="block">today.</span>
              </h1>
              <p className="premium-copy mt-5 max-w-xs text-base leading-7 sm:mt-7 sm:max-w-2xl sm:text-lg sm:leading-8">
                Choose one service idea, unlock the assets behind it, and use the prompts, pricing, outreach, and delivery files to start selling with less guesswork.
              </p>
              <form
                action="/packs"
                className="mt-6 flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(10,12,16,0.1)] bg-[rgba(255,253,248,0.86)] p-2 shadow-[0_14px_36px_rgba(10,12,16,0.06)] backdrop-blur-sm sm:mt-8"
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
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--navy-ink)] outline-none placeholder:text-[var(--graphite)]"
                />
                <button
                  type="submit"
                  aria-label="Search business packs"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--obsidian)] text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(10,12,16,0.2)]"
                >
                  <ArrowRight size={17} />
                </button>
              </form>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <JoinButton label="Unlock Packs" returnTo="/packs" className="w-full sm:w-auto" />
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
              <div className="mt-5 rounded-lg bg-[rgba(28,32,28,0.045)] p-4 ring-1 ring-[rgba(28,32,28,0.08)]">
                <p className="mb-3 text-sm font-bold text-[var(--navy-ink)]">
                  Built for first-client operators
                </p>
                <p className="text-sm font-semibold leading-6 text-[var(--navy-ink)]">
                  No fake income promises. Just practical launch files for finding a buyer, making the offer, and delivering the first paid version.
                </p>
              </div>
            </div>

            <div className="hero-image-stage mobile-frame relative min-h-[320px] sm:min-h-[420px] lg:min-h-[680px]">
              <Image
                src="/visuals/hero/side-hustle-stephen-character-hero.png"
                alt="A Side Hustle Stephen creator working from a laptop with coffee."
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="hero-character-image"
              />
            </div>
          </div>
        </section>

        <PackMatcher packs={packs} />
        <QuoteCarousel />
        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Blog</p>
              <h2 className="display-type mt-3 text-4xl sm:text-5xl">Practical guides.</h2>
              <p className="premium-copy mt-3 text-sm font-semibold leading-6 sm:text-base sm:leading-7">
                Use the articles to pick the move, then open the matching launch pack for scripts, pricing, prompts, and delivery files.
              </p>
            </div>
            <Link
              href="/blog"
              className="frosted-pill inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--text-primary)] sm:w-auto"
            >
              Read the blog
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredBlogPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} featured={index === 0} />
            ))}
          </div>
        </section>
        <PackMatcher packs={popularPacks} eyebrow="Most popular" title="Most popular." sortByPopularity />
        <AssetTypesSection />
      </main>
      <Footer />
    </>
  );
}
