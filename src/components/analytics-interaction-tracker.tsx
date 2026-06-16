"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null;

const propertyMap: Record<string, string> = {
  analyticsPack: "pack",
  analyticsAsset: "asset",
  analyticsAssetType: "asset_type",
  analyticsCategory: "category",
  analyticsDownloadType: "download_type",
  analyticsLocation: "location",
  analyticsReturnTo: "return_to",
  analyticsValue: "value",
};

export function AnalyticsInteractionTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!target?.dataset.analyticsEvent) return;

      const properties: Record<string, AnalyticsValue> = {
        path: window.location.pathname,
      };

      Object.entries(propertyMap).forEach(([datasetKey, propertyKey]) => {
        const value = target.dataset[datasetKey];
        if (value) properties[propertyKey] = value;
      });

      track(target.dataset.analyticsEvent, properties);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
