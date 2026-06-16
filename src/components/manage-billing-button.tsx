"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowUpRight } from "lucide-react";
import { trackFirstPartyEvent } from "@/lib/client-analytics";

export function ManageBillingButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "setup" | "error">("idle");
  const [message, setMessage] = useState("");

  async function openPortal() {
    setStatus("loading");
    setMessage("");
    track("Billing Portal Requested");
    trackFirstPartyEvent("Billing Portal Requested");

    try {
      const response = await fetch("/api/portal", { method: "POST" });
      const data = (await response.json()) as { url?: string; mode?: string; message?: string; error?: string };

      if (data.url) {
        track("Billing Portal Opened");
        trackFirstPartyEvent("Billing Portal Opened");
        window.location.href = data.url;
        return;
      }

      if (data.mode === "setup_required") {
        setStatus("setup");
        setMessage("Billing management is temporarily unavailable. Try again shortly.");
        track("Billing Portal Setup Required");
        trackFirstPartyEvent("Billing Portal Setup Required");
        return;
      }

      setStatus("error");
      setMessage(data.error ?? "Billing portal is not available for this account yet.");
      track("Billing Portal Failed");
      trackFirstPartyEvent("Billing Portal Failed");
    } catch {
      setStatus("error");
      setMessage("Billing portal request failed. Try again shortly.");
      track("Billing Portal Failed");
      trackFirstPartyEvent("Billing Portal Failed");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={openPortal}
        disabled={status === "loading"}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--obsidian)] px-5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(7,10,15,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Opening..." : "Manage billing"}
        <ArrowUpRight size={16} />
      </button>
      {message ? (
        <p className="mt-3 text-sm leading-6 text-[var(--graphite)]" role={status === "error" ? "alert" : "status"} aria-live="polite">
          {message}
        </p>
      ) : null}
    </div>
  );
}
