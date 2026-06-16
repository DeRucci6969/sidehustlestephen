"use client";

type AnalyticsValue = string | number | boolean | null;

type TrackOptions = {
  path?: string;
  referrer?: string;
  properties?: Record<string, AnalyticsValue>;
};

const sessionStorageKey = "shs_analytics_session";

function getSessionId() {
  try {
    const existing = window.localStorage.getItem(sessionStorageKey);
    if (existing) return existing;

    const next = crypto.randomUUID();
    window.localStorage.setItem(sessionStorageKey, next);
    return next;
  } catch {
    return null;
  }
}

export function trackFirstPartyEvent(eventName: string, options: TrackOptions = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    eventName,
    path: options.path ?? `${window.location.pathname}${window.location.search}`,
    referrer: options.referrer ?? document.referrer,
    sessionId: getSessionId(),
    properties: {
      ...options.properties,
      path: options.path ?? window.location.pathname,
    },
  };

  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/analytics/event", blob)) return;
    }
  } catch {
    // Fall back to fetch below.
  }

  void fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
