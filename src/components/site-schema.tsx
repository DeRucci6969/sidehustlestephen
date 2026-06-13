const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Side Hustle Stephen - The Launchpad",
    url: baseUrl,
    description: "A membership archive of side hustle and startup launch packs with playbooks, scripts, and downloadable assets.",
    publisher: {
      "@type": "Organization",
      name: "Side Hustle Stephen",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/packs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
