import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { blogPosts, getBlogPost } from "@/data/blog";
import type { BusinessPack } from "@/data/packs";
import { getPack, popularPacks } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${post.title} article`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPacks = post.relatedPackSlugs
    .map((packSlug) => getPack(packSlug))
    .filter((pack): pack is BusinessPack => Boolean(pack));
  const relatedPosts = blogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);
  const bottomCtaPacks = popularPacks.slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]) }}
      />
      <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-8 sm:px-8 sm:py-10">
        <Link href="/blog" className="frosted-pill mb-5 inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[var(--text-primary)] sm:mb-7">
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <article className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.42fr)] lg:items-start">
          <div className="min-w-0 space-y-6">
            <section className="liquid-panel glass rounded-lg p-5 sm:rounded-[2rem] sm:p-10">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--orange-glass)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-[var(--safety-orange)]">
                  {post.category}
                </span>
                <span className="frosted-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                  {post.readingTime}
                </span>
                <span className="frosted-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">
                  Updated {post.updatedAt}
                </span>
              </div>
              <h1
                className="display-type balanced mt-5 max-w-4xl break-words sm:mt-8"
                style={{ fontSize: "clamp(2.35rem, 11vw, 4.6rem)", lineHeight: 1.02 }}
              >
                {post.title}
              </h1>
              <p className="premium-copy mt-5 max-w-2xl text-base leading-7 sm:text-xl sm:leading-8">{post.description}</p>
            </section>

            <section className="dark-pack-panel rounded-lg p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Short answer</p>
              <p className="mt-3 text-xl font-bold leading-8 tracking-normal text-white">{post.shortAnswer}</p>
            </section>

            {relatedPacks[0] ? (
              <section className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Use the matching launch pack</p>
                <div className="mt-3 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">{relatedPacks[0].title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">
                      Want the scripts, pricing file, and delivery checklist? Open the launch pack and use the working files with this guide.
                    </p>
                  </div>
                  <Link
                    href={`/packs/${relatedPacks[0].slug}`}
                    data-analytics-event="Blog Top Pack CTA Clicked"
                    data-analytics-pack={relatedPacks[0].slug}
                    data-analytics-location="blog_top_cta"
                    className="accent-cta inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold md:w-auto"
                  >
                    Open pack
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </section>
            ) : null}

            <section className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
              <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">Key points</h2>
              <div className="mt-5 grid gap-3">
                {post.keyPoints.map((point) => (
                  <div key={point} className="pack-detail-tile-strong flex items-start gap-3 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--validation-green)]" />
                    <p className="text-sm font-semibold leading-6 text-[var(--text-primary)]">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {post.body.map((section) => (
              <section key={section.heading} className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
                <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base font-semibold leading-7 text-[var(--text-primary)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
              <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">{post.practicalExample.title}</h2>
              <div className="mt-5 grid gap-3">
                {post.practicalExample.steps.map((step, index) => (
                  <div key={step} className="pack-detail-tile-strong flex items-start gap-4 rounded-2xl p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--orange-glass)] font-bold text-[var(--safety-orange)]">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm font-semibold leading-6 text-[var(--text-primary)]">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              <div className="glass-soft rounded-lg p-5 sm:p-6">
                <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)]">First action checklist</h2>
                <ul className="mt-5 space-y-3">
                  {post.firstActionChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--text-primary)]">
                      <CheckCircle2 size={17} className="mt-1 shrink-0 text-[var(--validation-green)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-soft rounded-lg p-5 sm:p-6">
                <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)]">Common mistakes</h2>
                <ul className="mt-5 space-y-3">
                  {post.commonMistakes.map((item) => (
                    <li key={item} className="rounded-lg bg-white/64 p-3 text-sm font-semibold leading-6 text-[var(--text-primary)] ring-1 ring-[rgba(28,32,28,0.08)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="glass-soft rounded-lg p-5 sm:rounded-[1.75rem] sm:p-6">
              <h2 className="text-2xl font-bold tracking-normal text-[var(--navy-ink)] sm:text-3xl">FAQ</h2>
              <div className="mt-5 grid gap-3">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="pack-detail-tile rounded-2xl p-4">
                    <h3 className="text-sm font-bold tracking-normal text-[var(--navy-ink)]">{faq.question}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg bg-[rgba(28,32,28,0.045)] p-5 ring-1 ring-[rgba(28,32,28,0.08)]">
              <p className="text-sm font-semibold leading-6 text-[var(--graphite)]">{post.disclaimer}</p>
            </section>

            <section className="dark-pack-panel rounded-lg p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Next step</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-normal text-white">
                Turn the article into a launch plan.
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/72">
                The blog gives you the thinking. The launch packs give you the outreach scripts, pricing files, prompts, checklists, and delivery assets to make the first move.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {bottomCtaPacks.map((pack) => (
                  <Link
                    key={pack.slug}
                    href={`/packs/${pack.slug}`}
                    className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--orange-hot)]">{pack.category}</p>
                    <h3 className="mt-2 text-sm font-bold leading-5 text-white">{pack.title}</h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-white/65">{pack.assets.length} launch assets included</p>
                  </Link>
                ))}
              </div>
              <Link href="/packs" className="accent-cta mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold sm:w-auto">
                Check out popular launch packs
                <ArrowRight size={16} />
              </Link>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="dark-pack-panel rounded-lg p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Related launch packs</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight tracking-normal text-white">Use the guide with a pack.</h2>
              <div className="mt-5 grid gap-3">
                {relatedPacks.map((pack) => (
                  <Link
                    key={pack.slug}
                    href={`/packs/${pack.slug}`}
                    className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--orange-hot)]">{pack.category}</p>
                    <p className="mt-2 text-sm font-bold leading-5 text-white">{pack.title}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-white/65">{pack.hook}</p>
                  </Link>
                ))}
              </div>
              <Link href="/packs" className="accent-cta mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold">
                Browse archive
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-soft rounded-lg p-5 sm:p-6">
              <h2 className="text-xl font-bold tracking-normal text-[var(--navy-ink)]">More practical guides</h2>
              <div className="mt-4 grid gap-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="pack-detail-tile group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--safety-orange)]">{relatedPost.category}</p>
                    <p className="mt-2 text-sm font-bold leading-5 text-[var(--navy-ink)]">{relatedPost.title}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-[var(--graphite)]">{relatedPost.readingTime}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--safety-orange)]">
                      Read guide
                      <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
