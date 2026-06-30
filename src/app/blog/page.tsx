import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Blog | Practical Side Hustle Guides",
  description:
    "Practical side hustle guides for choosing simple business ideas, getting first clients, pricing starter offers, and using launch packs.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Side Hustle Stephen",
    description: "Practical guides for turning simple business ideas into first-client launch plans.",
    url: "/blog",
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Side Hustle Stephen blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Side Hustle Stephen",
    description: "Practical side hustle guides with first-client plans and launch pack links.",
    images: [siteConfig.ogImage],
  },
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Side Hustle Stephen Blog",
    description: metadata.description,
    url: `${siteConfig.url}/blog`,
    blogPost: sortedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      url: `${siteConfig.url}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.46fr] lg:items-end">
          <div className="min-w-0 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Blog</p>
            <h1 className="display-type balanced mt-3 break-words text-[clamp(2.35rem,11.5vw,4.5rem)] leading-[1.02]">
              Practical notes for getting the first buyer.
            </h1>
            <p className="premium-copy mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
              Short, direct guides for choosing startable ideas, finding first clients, pricing starter offers, and using launch packs without getting lost in planning.
            </p>
          </div>
          <div className="dark-pack-panel rounded-lg p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Use the archive</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-normal text-white">Read the guide, then open the matching pack.</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
              The blog explains the move. The archive gives you the scripts, pricing files, prompts, and delivery assets.
            </p>
            <Link href="/packs" className="accent-cta mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold sm:w-auto">
              Browse packs
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} featured={index === 0} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
