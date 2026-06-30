import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Crown, UserCircle2 } from "lucide-react";
import { JoinButton } from "@/components/join-modal";
import { SignOutButton } from "@/components/sign-out-button";
import { getMembershipContext, type MembershipContext } from "@/lib/membership";

type HeaderProps = {
  viewer?: MembershipContext;
};

export async function Header({ viewer: providedViewer }: HeaderProps = {}) {
  const viewer = providedViewer ?? (await getMembershipContext());
  const navItems = [
    ["Archive", "/packs"],
    ["Blog", "/blog"],
    ["Pricing", "/pricing"],
    ["Account", "/account"],
  ];
  const mobileNavItems = viewer.isAuthenticated ? navItems : navItems.filter(([label]) => label !== "Account");

  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-8 sm:py-4">
      <Link
        href="/"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(10,12,16,0.1)] bg-white/[0.86] p-1.5 shadow-[0_12px_34px_rgba(10,12,16,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(10,12,16,0.18)] sm:h-14 sm:w-14"
        aria-label="Side Hustle Stephen home"
      >
        <Image
          src="/visuals/brand/side-hustle-stephen-logo.png"
          alt="Side Hustle Stephen"
          width={96}
          height={107}
          priority
          className="h-full w-full object-contain"
        />
      </Link>
      <nav className="frosted-pill hidden items-center gap-2 rounded-full p-1 text-sm font-semibold text-[var(--text-secondary)] md:flex">
        {navItems.map(([label, href]) => (
          <Link key={label} href={href} className="rounded-full px-4 py-2 transition hover:bg-[rgba(0,148,255,0.1)] hover:text-[var(--navy-ink)]">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-3">
        <nav className="flex min-w-0 items-center gap-1 text-xs font-semibold text-[var(--navy-ink)] sm:gap-2 sm:text-sm md:hidden">
          {mobileNavItems.map(([label, href]) => (
            <Link key={label} href={href} className="inline-flex h-11 items-center rounded-full px-2 transition hover:bg-white/70 hover:text-[var(--safety-orange)] sm:px-3">
              {label}
            </Link>
          ))}
        </nav>
        {viewer.isMember ? (
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/account"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--obsidian)] px-4 text-sm font-bold text-white shadow-[0_16px_42px_rgba(7,10,15,0.2)] transition hover:-translate-y-0.5"
            >
              <Crown size={16} className="text-[var(--orange-hot)]" />
              Member
            </Link>
            <SignOutButton compact />
          </div>
        ) : viewer.isAuthenticated ? (
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/account"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[rgba(28,32,28,0.12)] bg-white/80 px-4 text-sm font-bold text-[var(--navy-ink)] shadow-[0_12px_32px_rgba(10,12,16,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <UserCircle2 size={16} />
              Signed in
            </Link>
            <JoinButton label="Continue checkout" returnTo="/packs" className="h-11 px-4 sm:px-5" />
          </div>
        ) : (
          <span className="hidden sm:block">
            <JoinButton label="Unlock" className="h-11 px-4 sm:px-5" />
          </span>
        )}
        {viewer.isMember ? (
          <Link
            href="/account"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--obsidian)] text-white shadow-[0_16px_42px_rgba(7,10,15,0.2)] sm:hidden"
            aria-label="Member account"
          >
            <CheckCircle2 size={18} />
          </Link>
        ) : viewer.isAuthenticated ? (
          <Link
            href="/account"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(28,32,28,0.12)] bg-white/86 text-[var(--navy-ink)] shadow-[0_12px_32px_rgba(10,12,16,0.08)] sm:hidden"
            aria-label="Account"
          >
            <UserCircle2 size={18} />
          </Link>
        ) : (
          <span className="sm:hidden">
            <JoinButton label="Unlock" className="h-11 px-3 text-xs" />
          </span>
        )}
      </div>
    </header>
  );
}
