import { NextResponse } from "next/server";
import { createMembershipCheckoutUrl } from "@/lib/checkout";
import { hasStripeConfig } from "@/lib/stripe";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";
import { rejectCrossOriginRequest } from "@/lib/request-security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const crossOriginResponse = rejectCrossOriginRequest(req);
  if (crossOriginResponse) return crossOriginResponse;

  const body = (await req.json().catch(() => ({}))) as {
    accessToken?: string;
    refreshToken?: string;
    returnTo?: string;
    checkout?: boolean;
  };

  const returnTo = safeInternalPath(body.returnTo);
  const rateLimitResponse = await checkRateLimit({
    action: "session_handoff",
    rules: [{ scope: "ip", identifier: getClientIp(req), limit: 20, windowSeconds: 10 * 60 }],
  });
  if (rateLimitResponse) return rateLimitResponse;

  if (!body.accessToken || !body.refreshToken) {
    return NextResponse.json({ error: "Missing Supabase session tokens." }, { status: 400 });
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ url: absoluteUrl(`/join/continue?return_to=${encodeURIComponent(returnTo)}`) });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.setSession({
    access_token: body.accessToken,
    refresh_token: body.refreshToken,
  });

  if (error || !data.user) {
    console.error("Fragment session handoff failed", error?.message ?? "No user returned from setSession");
    return NextResponse.json({ url: absoluteUrl(`/join/continue?return_to=${encodeURIComponent(returnTo)}`) }, { status: 401 });
  }

  if (body.checkout && hasStripeConfig()) {
    try {
      const url = await createMembershipCheckoutUrl({
        supabase,
        user: data.user,
        returnTo,
        customerEmail: data.user.email,
      });

      return NextResponse.json({ url });
    } catch (checkoutError) {
      console.error("Checkout after fragment session handoff failed", checkoutError);
    }
  }

  return NextResponse.json({ url: absoluteUrl(body.checkout ? `/join/continue?return_to=${encodeURIComponent(returnTo)}` : returnTo) });
}
