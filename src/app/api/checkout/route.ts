import { NextResponse } from "next/server";
import { track as trackServer } from "@vercel/analytics/server";
import { safeInternalPath } from "@/lib/utils";
import { hasStripeConfig } from "@/lib/stripe";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import { createMembershipCheckoutUrl } from "@/lib/checkout";
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

  const returnTo = safeInternalPath(body.returnTo);
  const ipRateLimitResponse = await checkRateLimit({
    action: "checkout",
    rules: [{ scope: "ip", identifier: getClientIp(req), limit: 20, windowSeconds: 10 * 60 }],
  });
  if (ipRateLimitResponse) return ipRateLimitResponse;

  console.log(JSON.stringify({ level: "info", msg: "checkout_requested", route: "/api/checkout", requestId, returnTo, hasEmail: Boolean(body.email) }));
  void trackServer("Checkout Requested", { return_to: returnTo, has_email: Boolean(body.email) }, { request: req });

  if (!hasSupabaseConfig()) {
    console.warn(JSON.stringify({ level: "warn", msg: "checkout_setup_required", route: "/api/checkout", requestId, reason: "supabase_missing", ms: Date.now() - start }));
    return NextResponse.json({
      mode: "setup_required",
      message: "Supabase env vars are not configured yet. Checkout requires an authenticated magic-link session.",
    });
  }

  if (!hasStripeConfig()) {
    console.warn(JSON.stringify({ level: "warn", msg: "checkout_setup_required", route: "/api/checkout", requestId, reason: "stripe_missing", ms: Date.now() - start }));
    return NextResponse.json({
      mode: "setup_required",
      message: "Stripe env vars are not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID.",
    });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.warn(JSON.stringify({ level: "warn", msg: "checkout_auth_required", route: "/api/checkout", requestId, ms: Date.now() - start }));
    return NextResponse.json({ error: "Authentication required before checkout." }, { status: 401 });
  }

  const userRateLimitResponse = await checkRateLimit({
    action: "checkout",
    rules: [
      { scope: "user", identifier: user.id, limit: 10, windowSeconds: 60 * 60 },
      { scope: "user", identifier: user.id, limit: 30, windowSeconds: 24 * 60 * 60 },
    ],
  });
  if (userRateLimitResponse) return userRateLimitResponse;

  const url = await createMembershipCheckoutUrl({
    supabase,
    user,
    returnTo,
    customerEmail: body.email,
  });

  console.log(JSON.stringify({ level: "info", msg: "checkout_url_created", route: "/api/checkout", requestId, returnTo, ms: Date.now() - start }));
  void trackServer("Checkout URL Created", { return_to: returnTo }, { request: req });
  return NextResponse.json({ url });
}
