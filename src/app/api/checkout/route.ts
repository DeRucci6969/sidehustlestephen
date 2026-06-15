import { NextResponse } from "next/server";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";
import { getStripe, hasStripeConfig } from "@/lib/stripe";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    returnTo?: string;
  };

  const returnTo = safeInternalPath(body.returnTo);

  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      mode: "setup_required",
      message: "Supabase env vars are not configured yet. Checkout requires an authenticated magic-link session.",
    });
  }

  if (!hasStripeConfig()) {
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
    return NextResponse.json({ error: "Authentication required before checkout." }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("supabase_user_id", user.id)
    .not("stripe_customer_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const existingCustomerId = existing?.stripe_customer_id ?? null;

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    ...(existingCustomerId
      ? { customer: existingCustomerId }
      : { customer_email: user.email ?? body.email }),
    client_reference_id: user.id,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: absoluteUrl(`/success?return_to=${encodeURIComponent(returnTo)}`),
    cancel_url: absoluteUrl(returnTo),
    metadata: {
      return_to: returnTo,
      supabase_user_id: user.id,
    },
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
