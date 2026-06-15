import Link from "next/link";
import { JoinButton } from "@/components/join-modal";

export function Header() {
  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
      <Link
        href="/"
        className="accent-cta flex min-w-0 items-center rounded-full px-5 py-3"
        aria-label="Side Hustle Stephen home"
      >
        <span className="text-sm font-semibold leading-none tracking-normal text-white sm:text-base">Side Hustle Stephen</span>
      </Link>
      <nav className="frosted-pill hidden items-center gap-2 rounded-full p-1 text-sm font-semibold text-[var(--text-secondary)] md:flex">
        {[
          ["Archive", "/packs"],
          ["Pricing", "/pricing"],
          ["Account", "/account"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="rounded-full px-4 py-2 transition hover:bg-[rgba(0,148,255,0.1)] hover:text-[var(--navy-ink)]">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-3">
        <nav className="flex items-center gap-3 text-sm font-semibold text-[var(--navy-ink)] md:hidden">
          {[
            ["Archive", "/packs"],
            ["Pricing", "/pricing"],
            ["Account", "/account"],
          ].map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-[var(--safety-orange)]">
              {label}
            </Link>
          ))}
        </nav>
        <span className="hidden sm:block">
          <JoinButton label="Unlock" className="h-10 px-4 sm:h-11 sm:px-5" />
        </span>
      </div>
    </header>
  );
}
