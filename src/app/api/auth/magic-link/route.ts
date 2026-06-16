import { NextResponse } from "next/server";
import { track as trackServer } from "@vercel/analytics/server";
import { createClient } from "@supabase/supabase-js";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";
import { recordAnalyticsEvent } from "@/lib/first-party-analytics";
import { getSupabasePublishableKey, hasSupabaseConfig } from "@/lib/supabase";
import { rejectCrossOriginRequest } from "@/lib/request-security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const crossOriginResponse = rejectCrossOriginRequest(req);
  if (crossOriginResponse) return crossOriginResponse;

  const start = Date.now();
  const requestId = req.headers.get("x-vercel-id");
  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    returnTo?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const emailLooksValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;
  if (!email || email.length > 254 || !emailLooksValid) {
    console.warn(JSON.stringify({ level: "warn", msg: "magic_link_missing_email", route: "/api/auth/magic-link", requestId, ms: Date.now() - start }));
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const rateLimitResponse = await checkRateLimit({
    action: "magic_link",
    rules: [
      { scope: "ip", identifier: getClientIp(req), limit: 8, windowSeconds: 10 * 60 },
      { scope: "ip", identifier: getClientIp(req), limit: 30, windowSeconds: 24 * 60 * 60 },
      { scope: "email", identifier: email, limit: 3, windowSeconds: 15 * 60 },
      { scope: "email", identifier: email, limit: 8, windowSeconds: 24 * 60 * 60 },
    ],
  });
  if (rateLimitResponse) return rateLimitResponse;

  const returnTo = safeInternalPath(body.returnTo);
  console.log(JSON.stringify({ level: "info", msg: "magic_link_requested", route: "/api/auth/magic-link", requestId, returnTo }));
  void trackServer("Magic Link Requested Server", { return_to: returnTo }, { request: req });
  void recordAnalyticsEvent(req, {
    eventName: "Magic Link Requested Server",
    path: "/api/auth/magic-link",
    properties: { return_to: returnTo },
  });

  if (!hasSupabaseConfig()) {
    console.warn(JSON.stringify({ level: "warn", msg: "magic_link_setup_required", route: "/api/auth/magic-link", requestId, reason: "supabase_missing", ms: Date.now() - start }));
    return NextResponse.json({
      ok: true,
      mode: "setup_required",
      message: "Supabase env vars are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, getSupabasePublishableKey()!);
  const redirectTo = absoluteUrl(`/auth/callback?return_to=${encodeURIComponent(returnTo)}&checkout=1`);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    console.error(JSON.stringify({ level: "error", msg: "magic_link_failed", route: "/api/auth/magic-link", requestId, error: error.message, ms: Date.now() - start }));
    return NextResponse.json({ error: "Unable to send sign-in link." }, { status: 400 });
  }

  console.log(JSON.stringify({ level: "info", msg: "magic_link_sent", route: "/api/auth/magic-link", requestId, returnTo, ms: Date.now() - start }));
  void trackServer("Magic Link Sent Server", { return_to: returnTo }, { request: req });
  void recordAnalyticsEvent(req, {
    eventName: "Magic Link Sent Server",
    path: "/api/auth/magic-link",
    properties: { return_to: returnTo },
  });
  return NextResponse.json({ ok: true });
}
