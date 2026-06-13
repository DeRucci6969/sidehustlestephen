import type { MetadataRoute } from "next";
import { packs } from "@/data/packs";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/packs", "/pricing", "/account", "/terms", "/privacy"];
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
    })),
    ...packs.map((pack) => ({
      url: `${baseUrl}/packs/${pack.slug}`,
      lastModified: new Date(pack.publishedAt),
    })),
  ];
}
