import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";
import { getClientIp, hashIdentifier } from "@/lib/rate-limit";

type AnalyticsValue = string | number | boolean | null;

type RecordAnalyticsEventOptions = {
  eventName: string;
  path: string;
  referrer?: string | null;
  sessionId?: string | null;
  properties?: Record<string, unknown>;
};

const maxProperties = 20;
const maxStringLength = 240;

function cleanText(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[\r\n\t]/g, " ").trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function cleanPath(value: unknown, fallback: string) {
  const path = cleanText(value, fallback, 320);
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) return fallback;
  return path;
}

function cleanReferrer(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return cleanText(value, "", 500) || null;
  }
}

function cleanProperties(properties: Record<string, unknown> | undefined) {
  const output: Record<string, AnalyticsValue> = {};

  Object.entries(properties ?? {})
    .slice(0, maxProperties)
    .forEach(([key, value]) => {
      const cleanKey = key.replace(/[^\w.-]/g, "_").slice(0, 50);
      if (!cleanKey) return;

      if (typeof value === "string") output[cleanKey] = value.slice(0, maxStringLength);
      else if (typeof value === "number" && Number.isFinite(value)) output[cleanKey] = value;
      else if (typeof value === "boolean") output[cleanKey] = value;
      else if (value === null) output[cleanKey] = null;
    });

  return output;
}

export async function recordAnalyticsEvent(req: Request, options: RecordAnalyticsEventOptions) {
  if (!hasSupabaseAdminConfig()) return;

  const url = new URL(req.url);
  const eventName = cleanText(options.eventName, "Unknown Event", 80);
  const path = cleanPath(options.path, url.pathname);
  const referrer = cleanReferrer(options.referrer);
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent");
  const sessionId = cleanText(options.sessionId, "", 160);

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("analytics_events").insert({
    event_name: eventName,
    path,
    referrer,
    properties: cleanProperties(options.properties),
    session_hash: sessionId ? hashIdentifier(sessionId) : null,
    ip_hash: hashIdentifier(ip),
    user_agent_hash: userAgent ? hashIdentifier(userAgent) : null,
  });

  if (error) {
    console.error(JSON.stringify({ level: "error", msg: "analytics_event_insert_failed", eventName, path, error: error.message }));
  }
}
