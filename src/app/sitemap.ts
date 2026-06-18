import type { MetadataRoute } from "next";
import { packs } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/packs", "/pricing", "/terms", "/privacy"];
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
    })),
    ...packs.map((pack) => ({
      url: `${siteConfig.url}/packs/${pack.slug}`,
      lastModified: new Date(pack.publishedAt),
    })),
  ];
}
