"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Gauge, TimerReset, WalletCards, type LucideIcon } from "lucide-react";
import type { BusinessPack } from "@/data/packs";

type Preference = {
  budget: "zero" | "low" | "any";
  speed: "fast" | "patient";
  lane: "local" | "online" | "b2b";
};

const options = {
  budget: [
    { value: "zero", label: "$0 start" },
    { value: "low", label: "$1-$500 ok" },
    { value: "any", label: "Any budget" },
  ],
  speed: [
    { value: "fast", label: "First sale this week" },
    { value: "patient", label: "Better recurring upside" },
  ],
  lane: [
    { value: "local", label: "Local businesses" },
    { value: "online", label: "Online brands" },
    { value: "b2b", label: "B2B operators" },
  ],
} as const;

type MatcherGroup = {
  key: keyof Preference;
  label: string;
  Icon: LucideIcon;
  options: ReadonlyArray<{ value: Preference[keyof Preference]; label: string }>;
};

const matcherGroups: MatcherGroup[] = [
  { key: "budget", label: "Startup cost", Icon: WalletCards, options: options.budget },
  { key: "speed", label: "Timeline", Icon: TimerReset, options: options.speed },
  { key: "lane", label: "Buyer lane", Icon: Gauge, options: options.lane },
];

function scorePack(pack: BusinessPack, preference: Preference) {
  let score = pack.popularityScore;

  if (preference.budget === "zero" && pack.startupCost === "$0") score += 14;
  if (preference.budget === "low" && ["$1-$50", "$0-$50", "$1-$500", "$0-$500"].includes(pack.startupCost)) score += 8;
  if (preference.speed === "fast" && pack.timeToFirstSale === "1-7 days") score += 16;
  if (preference.speed === "patient" && pack.timeToFirstSale === "2-4 weeks") score += 10;
  if (preference.lane === "local" && pack.category === "Local Service") score += 16;
  if (preference.lane === "online" && ["Ecommerce", "Creator Business"].includes(pack.category)) score += 16;
  if (preference.lane === "b2b" && ["B2B Service", "AI Tool"].includes(pack.category)) score += 16;

  return score;
}

export function PackMatcher({ packs }: { packs: BusinessPack[] }) {
  const [preference, setPreference] = useState<Preference>({
    budget: "zero",
    speed: "fast",
    lane: "local",
  });

  const matches = useMemo(
    () =>
      [...packs]
        .sort((a, b) => scorePack(b, preference) - scorePack(a, preference))
        .slice(0, 3),
    [packs, preference],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1fr]">
        <div className="liquid-panel glass rounded-[2.2rem] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Pack matcher</p>
          <h2 className="display-type mt-3 text-4xl sm:text-5xl">Find the cleanest first move.</h2>
          <p className="premium-copy mt-4 text-sm leading-6">
            Pick the constraints that match the viewer. The matcher surfaces the packs most likely to feel immediately actionable.
          </p>
          <div className="mt-6 space-y-5">
            {matcherGroups.map(({ key, label, Icon, options: group }) => (
              <fieldset key={key}>
                <legend className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Icon size={16} className="text-[var(--safety-orange)]" />
                  {label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {group.map((option) => {
                    const active = preference[key] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPreference((current) => ({ ...current, [key]: option.value }))}
                        className={
                          active
                            ? "accent-cta h-10 rounded-full px-4 text-sm font-semibold"
                            : "frosted-pill h-10 rounded-full px-4 text-sm font-semibold text-[var(--graphite)]"
                        }
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {matches.map((pack, index) => (
            <Link key={pack.slug} href={`/packs/${pack.slug}`} className="glass-soft group grid gap-4 rounded-[1.75rem] p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className="accent-cta flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold">0{index + 1}</span>
              <span className="min-w-0">
                <span className="block text-xl font-bold leading-none tracking-[-0.035em] text-[var(--navy-ink)]">{pack.title}</span>
                <span className="premium-copy mt-1 block text-sm leading-6">{pack.hook}</span>
                <span className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[var(--navy-ink)]">
                  <span className="rounded-full border border-[rgba(5,8,20,0.08)] bg-white/90 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_8px_22px_rgba(32,48,62,0.07)]">{pack.buyer}</span>
                  <span className="rounded-full border border-[rgba(5,8,20,0.08)] bg-white/90 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_8px_22px_rgba(32,48,62,0.07)]">{pack.timeToFirstSale}</span>
                  <span className="rounded-full border border-[rgba(5,8,20,0.08)] bg-white/90 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_8px_22px_rgba(32,48,62,0.07)]">{pack.startupCost}</span>
                </span>
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--obsidian)] ring-1 ring-white/90 transition group-hover:translate-x-0.5">
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
