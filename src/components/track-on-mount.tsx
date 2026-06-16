"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { trackFirstPartyEvent } from "@/lib/client-analytics";

type TrackValue = string | number | boolean | null;

type TrackOnMountProps = {
  event: string;
  properties?: Record<string, TrackValue>;
};

export function TrackOnMount({ event, properties }: TrackOnMountProps) {
  useEffect(() => {
    const nextProperties = {
      ...properties,
      path: window.location.pathname,
    };

    track(event, nextProperties);
    trackFirstPartyEvent(event, { properties: nextProperties });
  }, [event, properties]);

  return null;
}
