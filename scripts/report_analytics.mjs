import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const days = Number.parseInt(process.argv[2] ?? "30", 10);
const sinceLastRun = process.argv[3] ?? null;
const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
const sinceUnix = Math.floor(new Date(since).getTime() / 1000);

const [analyticsResult, downloadsResult, profilesResult, subscriptionsResult] = await Promise.all([
  supabase
    .from("analytics_events")
    .select("event_name,path,referrer,properties,created_at,session_hash")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(10_000),
  supabase
    .from("download_events")
    .select("download_type,pack_slug,asset_id,created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(10_000),
  supabase.from("profiles").select("id", { count: "exact", head: true }),
  supabase.from("subscriptions").select("status,created_at,updated_at"),
]);

for (const result of [analyticsResult, downloadsResult, profilesResult, subscriptionsResult]) {
  if (result.error) throw result.error;
}

const events = analyticsResult.data ?? [];
const downloads = downloadsResult.data ?? [];
const subscriptions = subscriptionsResult.data ?? [];

function tally(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item) || "(none)";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function uniqueSessions(items) {
  return new Set(items.map((item) => item.session_hash).filter(Boolean)).size;
}

function hostname(referrer) {
  if (!referrer) return "direct/unknown";
  try {
    return new URL(referrer).hostname;
  } catch {
    return "other";
  }
}

const pageViews = events.filter((event) => event.event_name === "Page Viewed");
const organicViews = pageViews.filter((event) => /google\.|bing\.|duckduckgo\.|yahoo\./i.test(event.referrer ?? ""));
const socialViews = pageViews.filter((event) => /instagram|tiktok|youtube|youtu\.be|facebook|threads|linkedin|x\.com|twitter/i.test(event.referrer ?? ""));
const recentEvents = sinceLastRun ? events.filter((event) => event.created_at >= sinceLastRun) : [];
let stripeSummary = null;

if (process.env.STRIPE_SECRET_KEY) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const stripeMode = process.env.STRIPE_SECRET_KEY.includes("_live_") ? "live" : "test";
  const sessions = await stripe.checkout.sessions.list({
    created: { gte: sinceUnix },
    limit: 100,
  });
  const completed = sessions.data.filter((session) => session.status === "complete");

  stripeSummary = {
    mode: stripeMode,
    totalSessions: sessions.data.length,
    byStatus: tally(sessions.data, (session) => session.status),
    byPaymentStatus: tally(sessions.data, (session) => session.payment_status),
    byCurrency: tally(sessions.data, (session) => session.currency),
    completedSessions: completed.length,
    completedAmountMinorUnits: completed.reduce((total, session) => total + (session.amount_total ?? 0), 0),
  };
}

const report = {
  range: { days, since, sinceLastRun },
  events: {
    total: events.length,
    uniqueSessions: uniqueSessions(events),
    sinceLastRun: recentEvents.length,
    sinceLastRunUniqueSessions: uniqueSessions(recentEvents),
    byName: tally(events, (event) => event.event_name).slice(0, 30),
  },
  pages: {
    top: tally(pageViews, (event) => event.path).slice(0, 20),
    organic: tally(organicViews, (event) => event.path).slice(0, 15),
    social: tally(socialViews, (event) => event.path).slice(0, 15),
    topReferrers: tally(pageViews, (event) => hostname(event.referrer)).slice(0, 15),
  },
  downloads: {
    total: downloads.length,
    byPack: tally(downloads, (download) => download.pack_slug),
    byAsset: tally(downloads, (download) => download.asset_id).slice(0, 20),
  },
  membership: {
    profiles: profilesResult.count ?? 0,
    subscriptions: tally(subscriptions, (subscription) => subscription.status),
    newSubscriptions: subscriptions.filter((subscription) => subscription.created_at >= since).length,
  },
  checkout: stripeSummary,
};

console.log(JSON.stringify(report, null, 2));
