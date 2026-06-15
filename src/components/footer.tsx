import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-5 py-12 text-sm text-[var(--graphite)] sm:px-8">
      <div className="glass-soft flex flex-col gap-5 rounded-lg p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-bold tracking-normal text-[var(--navy-ink)]">{siteConfig.name}</p>
          <p className="mt-1">Simple business ideas. Full launch packs.</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 font-semibold">
          <Link href="/packs">Archive</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
