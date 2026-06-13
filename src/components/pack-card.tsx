import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, LockKeyhole, Target } from "lucide-react";
import type { BusinessPack } from "@/data/packs";

export function PackCard({ pack, featured = false }: { pack: BusinessPack; featured?: boolean }) {
  return (
    <Link
      href={`/packs/${pack.slug}`}
      className="glass group relative block h-full overflow-hidden rounded-[2rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_84px_rgba(32,48,62,0.18)]"
    >
      <div className="mini-visual absolute inset-x-4 top-4 h-36 overflow-hidden rounded-[1.5rem] transition duration-300 group-hover:scale-[1.015]">
        <Image
          src={`/visuals/pack-cards/${pack.slug}-v2.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, calc(100vw - 4rem)"
          className="object-cover contrast-[1.04] saturate-[0.98]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/18 via-transparent to-white/20" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/65" />
      </div>
      <div className="relative pt-44">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="frosted-pill rounded-full px-3 py-1 text-xs font-semibold text-[var(--graphite)]">{pack.category}</span>
            {featured ? <span className="rounded-full bg-[var(--orange-glass)] px-3 py-1 text-xs font-semibold text-[var(--safety-orange)]">Featured</span> : null}
          </div>
          <span className="rounded-full bg-[var(--obsidian)] p-2 text-white shadow-lg transition group-hover:rotate-12">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-none tracking-[-0.035em] text-[var(--navy-ink)]">{pack.title}</h3>
        <p className="premium-copy mt-3 min-h-12 text-sm leading-6">{pack.hook}</p>
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 rounded-2xl bg-white/58 px-3 py-3 text-xs font-semibold ring-1 ring-white/70">
            <Target size={14} className="shrink-0 text-[var(--safety-orange)]" />
            <span className="truncate">{pack.buyer}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
            <span className="rounded-2xl bg-white/58 px-3 py-3 ring-1 ring-white/70">{pack.startupCost}</span>
            <span className="flex items-center gap-1 rounded-2xl bg-white/58 px-3 py-3 ring-1 ring-white/70">
              <Clock3 size={13} className="shrink-0 text-[var(--graphite)]" />
              <span>{pack.timeToFirstSale}</span>
            </span>
            <span className="rounded-2xl bg-white/58 px-3 py-3 ring-1 ring-white/70">{pack.difficulty}</span>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--graphite)]">
          <LockKeyhole size={14} />
          {pack.assets.length} member assets included
        </div>
      </div>
    </Link>
  );
}
