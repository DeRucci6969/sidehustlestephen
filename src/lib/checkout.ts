import type { SupabaseClient, User } from "@supabase/supabase-js";
import { absoluteUrl } from "@/lib/utils";
import { getStripe } from "@/lib/stripe";

type CheckoutOptions = {
  supabase: SupabaseClient;
  user: User;
  returnTo: string;
  customerEmail?: string | null;
};

export async function createMembershipCheckoutUrl({ supabase, user, returnTo, customerEmail }: CheckoutOptions) {
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id,status,current_period_end")
    .eq("supabase_user_id", user.id)
    .not("stripe_customer_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id,membership_status")
    .eq("id", user.id)
    .maybeSingle();

  const subscriptionIsActive =
    (subscription?.status === "active" || subscription?.status === "trialing") &&
    (!subscription.current_period_end || new Date(subscription.current_period_end).getTime() > Date.now());

  if (subscriptionIsActive || profile?.membership_status === "active") {
    return absoluteUrl(returnTo);
  }

  const existingCustomerId = subscription?.stripe_customer_id ?? profile?.stripe_customer_id ?? null;

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    ...(existingCustomerId ? { customer: existingCustomerId } : { customer_email: customerEmail ?? user.email ?? undefined }),
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

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL");
  }

  return session.url;
}
