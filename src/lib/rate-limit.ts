import { createHmac, createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";

type RateLimitScope = "ip" | "email" | "user";

type RateLimitRule = {
  scope: RateLimitScope;
  identifier: string | null | undefined;
  limit: number;
  windowSeconds: number;
};

type RateLimitOptions = {
  action: string;
  rules: RateLimitRule[];
};

type MemoryEvent = {
  action: string;
  scope: RateLimitScope;
  identifierHash: string;
  createdAt: number;
};

const memoryEvents: MemoryEvent[] = [];

function getHashSecret() {
  return process.env.RATE_LIMIT_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.STRIPE_SECRET_KEY ?? "side-hustle-stephen-rate-limit";
}

export function hashIdentifier(value: string) {
  const normalized = value.trim().toLowerCase();
  try {
    return createHmac("sha256", getHashSecret()).update(normalized).digest("hex");
  } catch {
    return createHash("sha256").update(normalized).digest("hex");
  }
}

export function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "unknown";
}

function retryAfterSeconds(oldestEventIso: string | null | undefined, windowSeconds: number) {
  if (!oldestEventIso) return windowSeconds;
  const oldestMs = new Date(oldestEventIso).getTime();
  if (!Number.isFinite(oldestMs)) return windowSeconds;
  return Math.max(1, Math.ceil((oldestMs + windowSeconds * 1000 - Date.now()) / 1000));
}

function rateLimitedResponse(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests. Try again shortly." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "Cache-Control": "no-store",
      },
    },
  );
}

async function checkWithSupabase({ action, rules }: RateLimitOptions) {
  const admin = createSupabaseAdminClient();
  const now = new Date();
  const eventsToInsert: Array<{ action: string; scope: RateLimitScope; identifier_hash: string }> = [];

  for (const rule of rules) {
    if (!rule.identifier) continue;

    const identifierHash = hashIdentifier(rule.identifier);
    const windowStart = new Date(now.getTime() - rule.windowSeconds * 1000).toISOString();
    const { count, data, error } = await admin
      .from("rate_limit_events")
      .select("created_at", { count: "exact" })
      .eq("action", action)
      .eq("scope", rule.scope)
      .eq("identifier_hash", identifierHash)
      .gte("created_at", windowStart)
      .order("created_at", { ascending: true })
      .limit(1);

    if (error) {
      console.error(JSON.stringify({ level: "error", msg: "rate_limit_check_failed", action, scope: rule.scope, error: error.message }));
      continue;
    }

    if ((count ?? 0) >= rule.limit) {
      const retryAfter = retryAfterSeconds(data?.[0]?.created_at, rule.windowSeconds);
      console.warn(JSON.stringify({ level: "warn", msg: "rate_limited", action, scope: rule.scope, retryAfter }));
      return rateLimitedResponse(retryAfter);
    }

    eventsToInsert.push({ action, scope: rule.scope, identifier_hash: identifierHash });
  }

  if (eventsToInsert.length) {
    const { error } = await admin.from("rate_limit_events").insert(eventsToInsert);
    if (error) {
      console.error(JSON.stringify({ level: "error", msg: "rate_limit_insert_failed", action, error: error.message }));
    }
  }

  const longestWindowSeconds = Math.max(...rules.map((rule) => rule.windowSeconds), 0);
  if (longestWindowSeconds > 0 && Math.random() < 0.03) {
    const cleanupBefore = new Date(now.getTime() - longestWindowSeconds * 2 * 1000).toISOString();
    await admin.from("rate_limit_events").delete().lt("created_at", cleanupBefore);
  }

  return null;
}

function checkWithMemory({ action, rules }: RateLimitOptions) {
  const now = Date.now();
  const longestWindowMs = Math.max(...rules.map((rule) => rule.windowSeconds * 1000), 0);
  const cutoff = now - longestWindowMs * 2;

  for (let index = memoryEvents.length - 1; index >= 0; index -= 1) {
    if (memoryEvents[index].createdAt < cutoff) memoryEvents.splice(index, 1);
  }

  const eventKeys = new Set<string>();

  for (const rule of rules) {
    if (!rule.identifier) continue;

    const identifierHash = hashIdentifier(rule.identifier);
    const windowStart = now - rule.windowSeconds * 1000;
    const matching = memoryEvents
      .filter((event) => event.action === action && event.scope === rule.scope && event.identifierHash === identifierHash && event.createdAt >= windowStart)
      .sort((a, b) => a.createdAt - b.createdAt);

    if (matching.length >= rule.limit) {
      const retryAfter = Math.max(1, Math.ceil((matching[0].createdAt + rule.windowSeconds * 1000 - now) / 1000));
      return rateLimitedResponse(retryAfter);
    }

    eventKeys.add(`${rule.scope}:${identifierHash}`);
  }

  eventKeys.forEach((key) => {
    const [scope, identifierHash] = key.split(":");
    memoryEvents.push({ action, scope: scope as RateLimitScope, identifierHash, createdAt: now });
  });

  return null;
}

export async function checkRateLimit(options: RateLimitOptions) {
  const activeRules = options.rules.filter((rule) => rule.identifier && rule.limit > 0 && rule.windowSeconds > 0);
  if (!activeRules.length) return null;

  if (hasSupabaseAdminConfig()) {
    return checkWithSupabase({ ...options, rules: activeRules });
  }

  return checkWithMemory({ ...options, rules: activeRules });
}
