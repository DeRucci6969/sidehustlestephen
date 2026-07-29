import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { packCategories, packs } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPackUpdatedAt = packs.reduce(
    (latest, pack) => {
      const packUpdatedAt = pack.updatedAt ?? pack.publishedAt;
      return packUpdatedAt > latest ? packUpdatedAt : latest;
    },
    packs[0]?.updatedAt ?? packs[0]?.publishedAt ?? "2026-06-09",
  );
  const latestBlogUpdatedAt = blogPosts.reduce(
    (latest, post) => (post.updatedAt > latest ? post.updatedAt : latest),
    blogPosts[0]?.updatedAt ?? latestPackUpdatedAt,
  );
  const archiveUpdatedAt = new Date(latestPackUpdatedAt);
  const blogUpdatedAt = new Date(latestBlogUpdatedAt);
  const staticRoutes = [
    { path: "", lastModified: archiveUpdatedAt },
    { path: "/packs", lastModified: archiveUpdatedAt },
    { path: "/blog", lastModified: blogUpdatedAt },
    { path: "/pricing", lastModified: undefined },
    { path: "/terms", lastModified: undefined },
    { path: "/privacy", lastModified: undefined },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: route.lastModified,
    })),
    ...packCategories
      .filter((category) => packs.filter((pack) => pack.category === category.name).length >= 3)
      .map((category) => ({
        url: `${siteConfig.url}/packs/categories/${category.slug}`,
        lastModified: archiveUpdatedAt,
      })),
    ...packs.map((pack) => ({
      url: `${siteConfig.url}/packs/${pack.slug}`,
      lastModified: new Date(pack.updatedAt ?? pack.publishedAt),
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    })),
  ];
}
