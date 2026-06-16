import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendMemberWelcomeEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";
import { safeInternalPath } from "@/lib/utils";

function unixToIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}

type WebhookClaimStatus = "claimed" | "duplicate" | "busy";

async function claimWebhookEvent(event: Stripe.Event): Promise<WebhookClaimStatus> {
  if (!hasSupabaseAdminConfig()) return "claimed";

  const admin = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const { error: insertError } = await admin.from("stripe_webhook_events").insert({
    event_id: event.id,
    event_type: event.type,
    status: "processing",
    processing_started_at: now,
  });

  if (!insertError) return "claimed";

  if (insertError.code !== "23505") {
    console.error(JSON.stringify({ level: "error", msg: "stripe_webhook_claim_insert_failed", eventId: event.id, type: event.type, error: insertError.message }));
    return "claimed";
  }

  const { data, error: selectError } = await admin
    .from("stripe_webhook_events")
    .select("status,processing_started_at,attempts")
    .eq("event_id", event.id)
    .maybeSingle();

  if (selectError) {
    console.error(JSON.stringify({ level: "error", msg: "stripe_webhook_claim_select_failed", eventId: event.id, type: event.type, error: selectError.message }));
    return "claimed";
  }

  if (data?.status === "processed") return "duplicate";

  const processingStartedAt = data?.processing_started_at ? new Date(data.processing_started_at).getTime() : 0;
  const isStale = !Number.isFinite(processingStartedAt) || Date.now() - processingStartedAt > 10 * 60 * 1000;
  if (data?.status === "processing" && !isStale) return "busy";

  const { error: updateError } = await admin
    .from("stripe_webhook_events")
    .update({
      status: "processing",
      processing_started_at: now,
      processed_at: null,
      last_error: null,
      attempts: typeof data?.attempts === "number" ? data.attempts + 1 : 2,
    })
    .eq("event_id", event.id);

  if (updateError) {
    console.error(JSON.stringify({ level: "error", msg: "stripe_webhook_claim_update_failed", eventId: event.id, type: event.type, error: updateError.message }));
  }

  return "claimed";
}

async function markWebhookProcessed(event: Stripe.Event) {
  if (!hasSupabaseAdminConfig()) return;

  const { error } = await createSupabaseAdminClient()
    .from("stripe_webhook_events")
    .update({
      status: "processed",
      processed_at: new Date().toISOString(),
      last_error: null,
    })
    .eq("event_id", event.id);

  if (error) {
    console.error(JSON.stringify({ level: "error", msg: "stripe_webhook_mark_processed_failed", eventId: event.id, type: event.type, error: error.message }));
  }
}

async function markWebhookFailed(event: Stripe.Event, error: unknown) {
  if (!hasSupabaseAdminConfig()) return;

  const message = error instanceof Error ? error.message : String(error);
  const { error: updateError } = await createSupabaseAdminClient()
    .from("stripe_webhook_events")
    .update({
      status: "failed",
      last_error: message.slice(0, 1000),
    })
    .eq("event_id", event.id);

  if (updateError) {
    console.error(JSON.stringify({ level: "error", msg: "stripe_webhook_mark_failed_failed", eventId: event.id, type: event.type, error: updateError.message }));
  }
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

async function getCheckoutEmail(session: Stripe.Checkout.Session) {
  if (session.customer_details?.email) return session.customer_details.email;
  if (session.customer_email) return session.customer_email;

  if (typeof session.customer === "string") {
    const customer = await getStripe().customers.retrieve(session.customer);
    if (!customer.deleted && customer.email) return customer.email;
  }

  return null;
}

function getFirstName(session: Stripe.Checkout.Session) {
  const name = session.customer_details?.name?.trim();
  return name ? name.split(/\s+/)[0] : null;
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

  const claimStatus = await claimWebhookEvent(event);
  if (claimStatus === "duplicate") {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (claimStatus === "busy") {
    return NextResponse.json({ received: true, processing: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
        if (subscriptionId) {
          const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
          await syncSubscription(subscription, session.client_reference_id ?? session.metadata?.supabase_user_id ?? null);
        }

        const email = await getCheckoutEmail(session);
        if (email) {
          await sendMemberWelcomeEmail({
            to: email,
            firstName: getFirstName(session),
            accessPath: safeInternalPath(session.metadata?.return_to, "/packs"),
            idempotencyKey: `stripe-checkout-welcome-${session.id}`,
          }).catch((error: unknown) => {
            console.error(error);
          });
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

    await markWebhookProcessed(event);
  } catch (error) {
    await markWebhookFailed(event, error);
    console.error(JSON.stringify({ level: "error", msg: "stripe_webhook_processing_failed", eventId: event.id, type: event.type, error: error instanceof Error ? error.message : String(error) }));
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
