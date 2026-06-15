"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, Mail, X } from "lucide-react";
import { cx } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type JoinButtonProps = {
  label?: string;
  returnTo?: string;
  className?: string;
};

export function JoinButton({ label = "Unlock Packs", returnTo, className }: JoinButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "setup" | "error">("idle");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function openModal() {
    track("Join Modal Opened", { returnTo: returnTo ?? "current_path" });
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    emailRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    track("Magic Link Requested", { returnTo: returnTo ?? window.location.pathname });
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, returnTo: returnTo ?? window.location.pathname }),
      });
      const data = (await res.json()) as { ok?: boolean; mode?: string; error?: string };
      if (data.mode === "setup_required") {
        track("Magic Link Setup Required");
        setStatus("setup");
      } else if (data.ok) {
        track("Magic Link Sent");
        setStatus("sent");
      }
      else throw new Error(data.error ?? "Magic link failed");
    } catch {
      track("Magic Link Failed");
      setStatus("error");
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openModal}
        className={cx(
          "accent-cta inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5",
          className,
        )}
      >
        <span className="truncate">{label}</span>
        <ArrowRight size={16} />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#162032]/72 px-5 backdrop-blur-xl"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="glass relative w-full max-w-lg rounded-lg p-7" role="dialog" aria-modal="true" aria-labelledby="join-title">
            <button
              aria-label="Close join modal"
              className="absolute right-5 top-5 rounded-full p-2 text-[var(--graphite)] hover:bg-black/5"
              onClick={closeModal}
            >
              <X size={18} />
            </button>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--orange-glass)] text-[var(--safety-orange)] ring-1 ring-[rgba(0,148,255,0.16)]">
              <Mail size={24} />
            </div>
            <h2 id="join-title" className="text-3xl font-semibold tracking-normal text-[var(--navy-ink)]">
              Unlock every pack
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--graphite)]">
              Enter your email and we will send a secure sign-in link. Then you can unlock every business pack and asset for {siteConfig.priceLabel}.
            </p>
            <form onSubmit={submit} className="mt-7 space-y-3">
              <input
                ref={emailRef}
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-13 w-full rounded-lg border border-[rgba(22,32,50,0.14)] bg-white/80 px-4 text-base text-[var(--navy-ink)] outline-none ring-[var(--safety-orange)] transition placeholder:text-[var(--graphite)] focus:ring-1"
              />
              <button
                disabled={status === "sending"}
                className="accent-cta flex h-13 w-full items-center justify-center gap-2 rounded px-5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
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
                Secure sign-in is temporarily unavailable. Try again shortly.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-[var(--amber-risk)]">Something went wrong. Try again shortly.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
