import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";

function unixToIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}

async function syncSubscription(subscription: Stripe.Subscription, fallbackUserId?: string | null) {
  if (!hasSupabaseAdminConfig()) return;

  const supabaseUserId = subscription.metadata?.supabase_user_id || fallbackUserId;
  if (!supabaseUserId) return;

  const admin = createSupabaseAdminClient();
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const currentPeriodEnd = "current_period_end" in subscription ? unixToIso(subscription.current_period_end as number | undefined) : null;

  await admin.from("subscriptions").upsert(
    {
      supabase_user_id: supabaseUserId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  await admin.from("profiles").upsert(
    {
      id: supabaseUserId,
      membership_status: ["active", "trialing"].includes(subscription.status) ? "active" : "inactive",
      stripe_customer_id: customerId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
}

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      if (subscriptionId) {
        const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
        await syncSubscription(subscription, session.client_reference_id ?? session.metadata?.supabase_user_id ?? null);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await syncSubscription(event.data.object as Stripe.Subscription);
      break;
    }
    case "invoice.payment_succeeded":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
