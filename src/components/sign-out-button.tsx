"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { LogOut } from "lucide-react";
import { cx } from "@/lib/utils";

type SignOutButtonProps = {
  className?: string;
  compact?: boolean;
};

export function SignOutButton({ className, compact = false }: SignOutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    track("Sign Out Requested");

    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } finally {
      window.location.href = "/";
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      title="Sign out"
      aria-label="Sign out"
      className={cx(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[rgba(28,32,28,0.12)] bg-white/80 px-4 text-sm font-bold text-[var(--navy-ink)] shadow-[0_12px_32px_rgba(10,12,16,0.08)] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-wait disabled:opacity-60",
        compact && "w-11 px-0",
        className,
      )}
    >
      <LogOut size={16} />
      {compact ? null : <span>{loading ? "Signing out" : "Sign out"}</span>}
    </button>
  );
}
