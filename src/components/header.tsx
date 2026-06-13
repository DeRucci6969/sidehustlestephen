import Link from "next/link";
import Image from "next/image";
import { JoinButton } from "@/components/join-modal";

export function Header() {
  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
      <Link href="/" className="frosted-pill flex min-w-0 items-center rounded-full px-3 py-2" aria-label="The Launchpad home">
        <Image
          src="/visuals/brand/the-launchpad-glass-wordmark.png"
          alt="The Launchpad"
          width={340}
          height={58}
          priority
          className="h-9 w-auto max-w-[11.5rem] object-contain sm:h-10 sm:max-w-[13.5rem]"
        />
      </Link>
      <nav className="frosted-pill hidden items-center gap-2 rounded-full p-1 text-sm font-semibold text-[var(--graphite)] md:flex">
        {[
          ["Archive", "/packs"],
          ["Pricing", "/pricing"],
          ["Account", "/account"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-[var(--obsidian)]">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-3">
        <Link href="/packs" className="text-sm font-semibold text-[var(--graphite)] md:hidden">
          Archive
        </Link>
        <span className="hidden sm:block">
          <JoinButton label="Unlock" className="h-10 px-4 sm:h-11 sm:px-5" />
        </span>
      </div>
    </header>
  );
}
