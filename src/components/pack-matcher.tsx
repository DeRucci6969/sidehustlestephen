"use client";

import Link from "next/link";
import type { KeyboardEvent } from "react";
import { useMemo, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, LockKeyhole } from "lucide-react";
import type { BusinessPack } from "@/data/packs";

type PackMatcherProps = {
  packs: BusinessPack[];
  eyebrow?: string;
  title?: string;
  sortByPopularity?: boolean;
};

export function PackMatcher({
  packs,
  eyebrow = "Business packs",
  title = "Browse practical starts.",
  sortByPopularity = false,
}: PackMatcherProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselPacks = useMemo(
    () => (sortByPopularity ? [...packs].sort((a, b) => b.popularityScore - a.popularityScore) : packs),
    [packs, sortByPopularity],
  );

  function scrollCarousel(direction: -1 | 1) {
    trackRef.current?.scrollBy({
      left: direction * 420,
      behavior: "smooth",
    });
  }

  function onTrackKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollCarousel(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollCarousel(1);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">{eyebrow}</p>
          <h2 className="display-type mt-3 text-4xl sm:text-5xl">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            aria-label="Scroll business packs left"
            className="frosted-pill grid h-11 w-11 place-items-center rounded-full text-[var(--navy-ink)] transition hover:-translate-y-0.5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            aria-label="Scroll business packs right"
            className="accent-cta grid h-11 w-11 place-items-center rounded-full transition hover:-translate-y-0.5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        aria-label={`${title} carousel`}
        onKeyDown={onTrackKeyDown}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3"
      >
        {carouselPacks.map((pack) => (
          <Link
            key={pack.slug}
            href={`/packs/${pack.slug}`}
            data-analytics-event="Pack Card Opened"
            data-analytics-pack={pack.slug}
            data-analytics-category={pack.category}
            data-analytics-location={sortByPopularity ? "popular_carousel" : "homepage_carousel"}
            className="glass pack-card-surface group flex min-h-[390px] w-[min(88vw,21rem)] flex-none snap-start flex-col rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(0,0,0,0.18)] sm:w-[min(82vw,22rem)]"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <span className="rounded-full border border-[rgba(22,32,50,0.12)] bg-white/76 px-3 py-1 text-xs font-bold text-[var(--graphite)]">
                {pack.category}
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--safety-orange)] text-white shadow-[0_12px_30px_rgba(0,148,255,0.18)] transition group-hover:rotate-12">
                <ArrowRight size={16} />
              </span>
            </div>

            <div className="dark-pack-panel rounded-lg p-5">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Launch pack</p>
              <h3 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-normal text-white">{pack.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/70">{pack.hook}</p>
            </div>

            <div className="mb-6 mt-5 flex flex-wrap gap-2 text-xs font-bold text-[var(--navy-ink)]">
              {pack.assets.slice(0, 4).map((asset) => (
                <span key={asset.id} className="rounded-full border border-[rgba(22,32,50,0.1)] bg-white/72 px-3 py-2">
                  {asset.title}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(22,32,50,0.1)] pt-5">
              <span className="flex items-center gap-2 text-xs font-semibold text-[var(--graphite)]">
                <LockKeyhole size={14} />
                {pack.assets.length} assets
              </span>
              <span className="text-xs font-bold text-[var(--safety-orange)]">View pack</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
