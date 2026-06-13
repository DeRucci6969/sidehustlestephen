"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import { PackCard } from "@/components/pack-card";
import type { BusinessPack } from "@/data/packs";

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

  return (
    <div>
      <div className="glass mb-7 grid gap-3 rounded-[2rem] p-3 md:grid-cols-[1fr_auto]">
        <label className="frosted-pill flex h-12 min-w-0 items-center gap-3 rounded-full px-4">
          <Search size={18} className="shrink-0 text-[var(--graphite)]" />
          <span className="sr-only">Search packs</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by buyer, category, or idea"
            className="w-full min-w-0 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--graphite)]"
          />
        </label>
        <label className="frosted-pill flex h-12 items-center gap-3 rounded-full px-4">
          <ArrowDownWideNarrow size={18} className="text-[var(--graphite)]" />
          <span className="sr-only">Sort packs</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            className="bg-transparent text-sm font-semibold outline-none"
          >
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="fastest">Fastest to first sale</option>
          </select>
        </label>
      </div>

      <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={
                active
                  ? "accent-cta h-10 shrink-0 rounded-full px-4 text-sm font-semibold"
                  : "frosted-pill h-10 shrink-0 rounded-full px-4 text-sm font-semibold text-[var(--graphite)]"
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
        <div className="glass-soft rounded-[1.75rem] p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">No matching packs</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">Try a broader buyer, category, or business type.</p>
        </div>
      ) : null}
    </div>
  );
}
