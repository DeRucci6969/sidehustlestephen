import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-5 py-12 text-sm text-[var(--graphite)] sm:px-8">
      <div className="glass-soft flex flex-col gap-5 rounded-lg p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(10,12,16,0.1)] bg-white/[0.84] p-1.5 shadow-[0_10px_28px_rgba(10,12,16,0.1)]">
            <Image
              src="/visuals/brand/side-hustle-stephen-logo.png"
              alt="Side Hustle Stephen"
              width={96}
              height={107}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="font-bold tracking-normal text-[var(--navy-ink)]">{siteConfig.name}</p>
            <p className="mt-1">Simple business ideas. Full launch packs.</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-2 font-semibold sm:gap-3">
          <Link className="inline-flex h-11 items-center rounded-full px-2 hover:bg-white/60 sm:px-3" href="/packs">Archive</Link>
          <Link className="inline-flex h-11 items-center rounded-full px-2 hover:bg-white/60 sm:px-3" href="/pricing">Pricing</Link>
          <Link className="inline-flex h-11 items-center rounded-full px-2 hover:bg-white/60 sm:px-3" href="/terms">Terms</Link>
          <Link className="inline-flex h-11 items-center rounded-full px-2 hover:bg-white/60 sm:px-3" href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
