import { siteConfig } from "@/lib/site";

export function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: "Side Hustle Stephen",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/packs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
