"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import { PackCard } from "@/components/pack-card";
import type { BusinessPack } from "@/data/packs";
import { trackFirstPartyEvent } from "@/lib/client-analytics";

type SortMode = "newest" | "popular" | "fastest";

const timeRank: Record<string, number> = {
  "1-7 days": 1,
  "2-4 weeks": 2,
};

export function ArchiveBrowser({ packs }: { packs: BusinessPack[] }) {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("search") ?? "";
  });
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("popular");
  const lastTrackedQueryRef = useRef("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextQuery = query.trim();
    if (nextQuery) params.set("search", nextQuery);
    else params.delete("search");
    const nextUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [query]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(packs.map((pack) => pack.category)))], [packs]);

  const filteredPacks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return packs
      .filter((pack) => {
        const matchesCategory = category === "All" || pack.category === category;
        const searchable = [pack.title, pack.hook, pack.category, pack.buyer, pack.summary].join(" ").toLowerCase();
        return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
      })
      .sort((a, b) => {
        if (sort === "newest") return b.publishedAt.localeCompare(a.publishedAt);
        if (sort === "fastest") return (timeRank[a.timeToFirstSale] ?? 9) - (timeRank[b.timeToFirstSale] ?? 9);
        return b.popularityScore - a.popularityScore;
      });
  }, [category, packs, query, sort]);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery.length < 2 || normalizedQuery === lastTrackedQueryRef.current) return;

    const timer = window.setTimeout(() => {
      lastTrackedQueryRef.current = normalizedQuery;
      track("Archive Search Used", {
        query: normalizedQuery,
        category,
        sort,
        result_count: filteredPacks.length,
      });
      trackFirstPartyEvent("Archive Search Used", {
        properties: {
          query: normalizedQuery,
          category,
          sort,
          result_count: filteredPacks.length,
        },
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [category, filteredPacks.length, query, sort]);

  return (
    <div>
      <div className="glass mb-5 grid min-w-0 gap-3 rounded-lg p-3 md:grid-cols-[1fr_auto]">
        <label className="flex h-12 min-w-0 items-center gap-3 rounded-full border border-[rgba(22,32,50,0.1)] bg-white/72 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
          <Search size={18} className="shrink-0 text-[var(--graphite)]" />
          <span className="sr-only">Search packs</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by buyer, category, or idea"
            className="h-full w-full min-w-0 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--graphite)]"
          />
        </label>
        <label className="flex h-12 min-w-0 items-center gap-3 rounded-full border border-[rgba(22,32,50,0.1)] bg-white/72 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
          <ArrowDownWideNarrow size={18} className="shrink-0 text-[var(--graphite)]" />
          <span className="sr-only">Sort packs</span>
          <select
            value={sort}
            onChange={(event) => {
              const nextSort = event.target.value as SortMode;
              setSort(nextSort);
              track("Archive Sort Changed", { sort: nextSort, category });
              trackFirstPartyEvent("Archive Sort Changed", { properties: { sort: nextSort, category } });
            }}
            className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
          >
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="fastest">Fastest to first sale</option>
          </select>
        </label>
      </div>

      <div className="mb-5 flex flex-wrap gap-2 pb-1">
        {categories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setCategory(item);
                track("Archive Category Selected", { category: item, sort });
                trackFirstPartyEvent("Archive Category Selected", { properties: { category: item, sort } });
              }}
              className={
                active
                  ? "accent-cta h-11 shrink-0 rounded-full px-4 text-sm font-semibold"
                  : "h-11 shrink-0 rounded-full border border-[rgba(22,32,50,0.1)] bg-white/72 px-4 text-sm font-semibold text-[var(--text-secondary)] shadow-[0_10px_28px_rgba(22,32,50,0.08)] transition hover:bg-[rgba(0,148,255,0.08)] hover:text-[var(--navy-ink)]"
              }
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[var(--graphite)]">
          {filteredPacks.length} {filteredPacks.length === 1 ? "pack" : "packs"}
        </p>
        <p className="hidden text-sm font-semibold text-[var(--graphite)] sm:block">All-access membership unlocks every asset.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredPacks.map((pack) => (
          <PackCard key={pack.slug} pack={pack} featured={pack.featured} />
        ))}
      </div>

      {filteredPacks.length === 0 ? (
        <div className="glass-soft rounded-lg p-6 text-center sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">No matching packs</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">Try a broader buyer, category, or business type.</p>
        </div>
      ) : null}
    </div>
  );
}
