import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/first-party-analytics";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { rejectCrossOriginRequest } from "@/lib/request-security";

type AnalyticsEventBody = {
  eventName?: string;
  path?: string;
  referrer?: string;
  sessionId?: string;
  properties?: Record<string, unknown>;
};

export async function POST(req: Request) {
  const crossOriginResponse = rejectCrossOriginRequest(req);
  if (crossOriginResponse) return crossOriginResponse;

  const body = (await req.json().catch(() => ({}))) as AnalyticsEventBody;
  const rateLimitResponse = await checkRateLimit({
    action: "analytics_event",
    rules: [
      { scope: "ip", identifier: getClientIp(req), limit: 240, windowSeconds: 10 * 60 },
      { scope: "ip", identifier: getClientIp(req), limit: 1000, windowSeconds: 24 * 60 * 60 },
      { scope: "user", identifier: body.sessionId, limit: 240, windowSeconds: 10 * 60 },
    ],
  });
  if (rateLimitResponse) return rateLimitResponse;

  await recordAnalyticsEvent(req, {
    eventName: body.eventName ?? "Unknown Event",
    path: body.path ?? new URL(req.url).pathname,
    referrer: body.referrer,
    sessionId: body.sessionId,
    properties: body.properties,
  });

  return new NextResponse(null, { status: 204 });
}
