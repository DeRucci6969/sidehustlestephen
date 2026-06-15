import Link from "next/link";
import { ArrowUpRight, Clock3, LockKeyhole, Target, WalletCards } from "lucide-react";
import type { BusinessPack } from "@/data/packs";

export function PackCard({ pack, featured = false }: { pack: BusinessPack; featured?: boolean }) {
  return (
    <Link
      href={`/packs/${pack.slug}`}
      className="glass pack-card-surface group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(0,0,0,0.2)]"
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[rgba(22,32,50,0.12)] bg-white/76 px-3 py-1 text-xs font-bold text-[var(--graphite)]">{pack.category}</span>
            {featured ? <span className="rounded-full border border-[rgba(0,148,255,0.16)] bg-[var(--orange-glass)] px-3 py-1 text-xs font-bold text-[var(--safety-orange)]">Featured</span> : null}
          </div>
          <span className="rounded-full bg-[var(--safety-orange)] p-2 text-white shadow-lg shadow-[rgba(0,148,255,0.18)] transition group-hover:rotate-12">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="dark-pack-panel rounded-lg p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Launch pack</p>
          <h3 className="mt-3 break-words text-3xl font-semibold leading-[1.02] tracking-normal text-white">{pack.title}</h3>
          <p className="mt-4 min-h-12 text-sm leading-6 text-white/70">{pack.hook}</p>
        </div>

        <div className="my-6 rounded-lg border border-[rgba(22,32,50,0.1)] bg-white/76 p-4 text-[var(--navy-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_12px_28px_rgba(22,32,50,0.06)]">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--graphite)]">First buyer</p>
          <div className="mt-3 flex items-start gap-3">
            <Target size={14} className="shrink-0 text-[var(--safety-orange)]" />
            <p className="text-sm font-semibold leading-5 text-[var(--navy-ink)]">{pack.buyer}</p>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-1 gap-2 text-xs font-bold text-[var(--graphite)] sm:grid-cols-3">
            <span className="rounded-lg bg-white/76 px-3 py-3 ring-1 ring-[rgba(22,32,50,0.08)]">
              <WalletCards size={13} className="mb-1 text-[var(--safety-orange)]" />
              {pack.startupCost}
            </span>
            <span className="rounded-lg bg-white/76 px-3 py-3 ring-1 ring-[rgba(22,32,50,0.08)]">
              <Clock3 size={13} className="mb-1 text-[var(--safety-orange)]" />
              {pack.timeToFirstSale}
            </span>
            <span className="rounded-lg bg-white/76 px-3 py-3 ring-1 ring-[rgba(22,32,50,0.08)]">
              <span className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--safety-orange)]">Level</span>
              {pack.difficulty}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[rgba(22,32,50,0.1)] pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--graphite)]">
              <LockKeyhole size={14} />
              {pack.assets.length} member assets
            </div>
            <span className="text-xs font-bold text-[var(--safety-orange)]">View pack</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
