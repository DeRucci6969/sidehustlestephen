"use client";

import { useState } from "react";
import { ArrowRight, Mail, X } from "lucide-react";
import { cx } from "@/lib/utils";

type JoinButtonProps = {
  label?: string;
  returnTo?: string;
  className?: string;
};

export function JoinButton({ label = "Unlock The Launchpad", returnTo, className }: JoinButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "setup" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, returnTo: returnTo ?? window.location.pathname }),
      });
      const data = (await res.json()) as { ok?: boolean; mode?: string; error?: string };
      if (data.mode === "setup_required") setStatus("setup");
      else if (data.ok) setStatus("sent");
      else throw new Error(data.error ?? "Magic link failed");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cx(
          "accent-cta inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5",
          className,
        )}
      >
        <span className="truncate">{label}</span>
        <ArrowRight size={16} />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 px-5 backdrop-blur-xl">
          <div className="glass relative w-full max-w-lg rounded-[2rem] p-7" role="dialog" aria-modal="true" aria-labelledby="join-title">
            <button
              aria-label="Close join modal"
              className="absolute right-5 top-5 rounded-full p-2 text-[var(--graphite)] hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--orange-glass)] text-[var(--safety-orange)]">
              <Mail size={24} />
            </div>
            <h2 id="join-title" className="text-3xl font-semibold tracking-tight">
              Unlock The Launchpad
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">
              Enter your email and we will send a secure sign-in link. Then you can unlock every business pack and asset for $12/month.
            </p>
            <form onSubmit={submit} className="mt-7 space-y-3">
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-13 w-full rounded-2xl border border-[var(--vapor-line)] bg-white/80 px-4 text-base outline-none ring-[var(--safety-orange)] transition focus:ring-2"
              />
              <button
                disabled={status === "sending"}
                className="accent-cta flex h-13 w-full items-center justify-center gap-2 rounded-2xl px-5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending secure link" : "Send secure link"}
                <ArrowRight size={17} />
              </button>
            </form>
            {status === "sent" ? (
              <p className="mt-4 text-sm text-[var(--graphite)]">
                Check your email for the secure sign-in link. It will return you to checkout after sign-in.
              </p>
            ) : null}
            {status === "setup" ? (
              <p className="mt-4 text-sm text-[var(--graphite)]">
                Auth is in setup mode, so no email was sent. Add Supabase environment variables to enable secure sign-in links.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-[var(--amber-risk)]">Something went wrong. Check environment variables and try again.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
