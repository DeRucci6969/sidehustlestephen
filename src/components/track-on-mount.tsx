"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type TrackValue = string | number | boolean | null;

type TrackOnMountProps = {
  event: string;
  properties?: Record<string, TrackValue>;
};

export function TrackOnMount({ event, properties }: TrackOnMountProps) {
  useEffect(() => {
    track(event, {
      ...properties,
      path: window.location.pathname,
    });
  }, [event, properties]);

  return null;
}
