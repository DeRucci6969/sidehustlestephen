import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { packCategories, packs } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/packs", "/blog", "/pricing", "/terms", "/privacy"];
  const latestPackPublishedAt = packs.reduce(
    (latest, pack) => (pack.publishedAt > latest ? pack.publishedAt : latest),
    packs[0]?.publishedAt ?? "2026-06-09",
  );
  const archiveUpdatedAt = new Date(latestPackPublishedAt);

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: path === "/terms" || path === "/privacy" ? undefined : archiveUpdatedAt,
    })),
    ...packCategories.map((category) => ({
      url: `${siteConfig.url}/packs/categories/${category.slug}`,
      lastModified: archiveUpdatedAt,
    })),
    ...packs.map((pack) => ({
      url: `${siteConfig.url}/packs/${pack.slug}`,
      lastModified: new Date(pack.publishedAt),
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    })),
  ];
}
