import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PackCard } from "@/components/pack-card";
import { getPacksByCategorySlug, packCategories } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

const categoryCopy: Record<string, string> = {
  "Local Service": "Simple local services with visible buyer pain, clear proof, and practical first-client outreach.",
  "B2B Service": "Business-to-business services built around measurable operational problems and recurring delivery potential.",
  Ecommerce: "Store support services for founders who need clearer checkout, trust, content, and conversion assets.",
  "Creator Business": "Creator-adjacent services that turn content needs into sellable briefs, templates, and production systems.",
  "AI Tool": "AI-assisted services that keep humans in control while turning messy workflows into useful outputs.",
};

export function generateStaticParams() {
  return packCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const result = getPacksByCategorySlug(categoryParam);
  if (!result) return {};

  const title = `${result.category.name} Business Packs | Side Hustle Stephen`;
  const description = `${categoryCopy[result.category.name] ?? "Browse practical launch packs with scripts, pricing, delivery files, and first-client plans."} Unlock the execution assets with membership.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/packs/categories/${result.category.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/packs/categories/${result.category.slug}`,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${result.category.name} launch packs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function PackCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const result = getPacksByCategorySlug(categoryParam);
  if (!result) notFound();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${result.category.name} Business Packs`,
    description: categoryCopy[result.category.name] ?? "Practical launch packs for simple businesses.",
    url: `${siteConfig.url}/packs/categories/${result.category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: result.packs.map((pack, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/packs/${pack.slug}`,
        name: pack.title,
        description: pack.summary,
      })),
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Business Pack Archive",
        item: `${siteConfig.url}/packs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: result.category.name,
        item: `${siteConfig.url}/packs/categories/${result.category.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([collectionSchema, breadcrumbSchema]) }}
      />
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
        <Link href="/packs" className="frosted-pill mb-6 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[var(--text-primary)]">
          <ArrowLeft size={16} />
          Back to archive
        </Link>
        <section className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div className="min-w-0 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Category</p>
            <h1 className="display-type balanced mt-3 break-words text-[clamp(2.35rem,11.5vw,4rem)] leading-[1.03]">
              {result.category.name} business packs.
            </h1>
            <p className="premium-copy mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
              {categoryCopy[result.category.name] ?? "Browse practical launch packs with scripts, pricing, delivery files, and first-client plans."}
            </p>
          </div>
          <div className="liquid-panel glass rounded-lg p-5">
            <p className="text-sm font-semibold text-[var(--graphite)]">Category snapshot</p>
            <p className="mt-3 text-4xl font-bold tracking-normal text-[var(--navy-ink)]">{result.packs.length}</p>
            <p className="mt-1 text-sm font-bold text-[var(--graphite)]">{result.packs.length === 1 ? "launch pack" : "launch packs"}</p>
          </div>
        </section>
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {result.packs.map((pack) => (
            <PackCard key={pack.slug} pack={pack} featured={pack.featured} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
