import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArchiveBrowser } from "@/components/archive-browser";
import { packs } from "@/data/packs";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Business Pack Archive | Side Hustle Stephen",
  description: "Browse practical launch packs with buyer profiles, first-client plans, pricing guidance, outreach scripts, and member-only startup assets.",
  alternates: {
    canonical: "/packs",
  },
  openGraph: {
    title: "Business Pack Archive | Side Hustle Stephen",
    description: "Browse practical launch packs built around simple first-client businesses, outreach scripts, delivery files, and member assets.",
    url: "/packs",
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Side Hustle Stephen business pack archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Pack Archive | Side Hustle Stephen",
    description: "Browse practical launch packs, first-client plans, scripts, pricing files, and delivery assets.",
    images: [siteConfig.ogImage],
  },
};

export default function PacksPage() {
  const totalAssets = packs.reduce((total, pack) => total + pack.assets.length, 0);
  const archiveSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Business Pack Archive",
    description: metadata.description,
    url: `${siteConfig.url}/packs`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: packs.map((pack, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/packs/${pack.slug}`,
        name: pack.title,
        description: pack.summary,
      })),
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveSchema) }}
      />
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-6 grid min-w-0 gap-6 sm:mb-10 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div className="min-w-0 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Archive</p>
            <h1 className="display-type balanced mt-3 break-words text-[clamp(2.35rem,11.5vw,4rem)] leading-[1.03]">Business packs you can actually launch.</h1>
            <p className="premium-copy mt-4 max-w-2xl text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8">
              Browse {packs.length} business packs. Public previews are open; full playbooks and downloads unlock with membership.
            </p>
          </div>
          <div className="liquid-panel glass hidden min-w-0 rounded-lg p-4 sm:block sm:p-5">
            <p className="text-sm font-semibold text-[var(--graphite)]">Archive snapshot</p>
            <div className="mt-4 grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-2 text-center">
              <div className="min-w-0 rounded-lg bg-white/55 p-3 ring-1 ring-white/70">
                <p className="text-2xl font-bold tracking-normal sm:text-3xl">{packs.length}</p>
                <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--graphite)] sm:text-[0.68rem] sm:tracking-[0.14em]">Packs</p>
              </div>
              <div className="min-w-0 rounded-lg bg-white/55 p-3 ring-1 ring-white/70">
                <p className="text-2xl font-bold tracking-normal sm:text-3xl">{totalAssets}</p>
                <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--graphite)] sm:text-[0.68rem] sm:tracking-[0.14em]">Assets</p>
              </div>
              <div className="min-w-0 rounded-lg bg-white/55 p-3 ring-1 ring-white/70">
                <p className="text-2xl font-bold tracking-normal sm:text-3xl">All</p>
                <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--graphite)] sm:text-[0.68rem] sm:tracking-[0.14em]">Access</p>
              </div>
            </div>
          </div>
        </div>
        <ArchiveBrowser packs={packs} />
      </main>
      <Footer />
    </>
  );
}
