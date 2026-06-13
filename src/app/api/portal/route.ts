import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { getStripe, hasStripeConfig } from "@/lib/stripe";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

export async function POST() {
  if (!hasStripeConfig()) {
    return NextResponse.json({
      mode: "setup_required",
      message: "Stripe env vars are not configured yet.",
    });
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      mode: "setup_required",
      message: "Supabase env vars are not configured yet.",
    });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("supabase_user_id", user.id)
    .not("stripe_customer_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  const customer = subscription?.stripe_customer_id ?? profile?.stripe_customer_id ?? "";
  if (!customer) {
    return NextResponse.json({ error: "No Stripe customer is linked to this account yet." }, { status: 400 });
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer,
    return_url: absoluteUrl("/account"),
  });

  return NextResponse.json({ url: session.url });
}
