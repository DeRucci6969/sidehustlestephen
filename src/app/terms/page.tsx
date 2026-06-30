import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms | Side Hustle Stephen",
  description: "Terms for using Side Hustle Stephen launch packs, member assets, subscriptions, downloads, and educational business templates.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of these terms",
      body: [
        "By accessing Side Hustle Stephen, creating an account, purchasing a subscription, downloading an asset, or otherwise using this website, you agree to these Terms of Use and any policies linked from this website, including our Privacy Policy.",
        "If you do not agree, do not use the website, purchase a subscription, download assets, or rely on any material provided through Side Hustle Stephen.",
      ],
    },
    {
      title: "2. Educational information only",
      body: [
        "Side Hustle Stephen provides educational business ideas, examples, templates, worksheets, prompts, scripts, calculators, playbooks, and related resources. The content is general information only. It is not legal, financial, accounting, tax, investment, employment, regulatory, insurance, professional, or other specialist advice.",
        "You are solely responsible for obtaining independent professional advice before acting on any idea, template, prompt, pricing suggestion, outreach script, workflow, claim, or business model. You are also responsible for checking whether any business activity is legal, licensed, insured, compliant, appropriate, and commercially viable in your location and circumstances.",
      ],
    },
    {
      title: "3. No business opportunity, franchise, or employment offer",
      body: [
        "Side Hustle Stephen is not selling a franchise, distributorship, agency, employment opportunity, investment, managed business, partnership, joint venture, or guaranteed business opportunity. Nothing on this website creates an employment, contractor, agency, partnership, fiduciary, or joint venture relationship between you and us.",
        "You remain fully responsible for your own business decisions, client relationships, pricing, delivery, taxes, insurance, compliance, marketing claims, and results.",
      ],
    },
    {
      title: "4. No earnings, revenue, or outcome guarantees",
      body: [
        "We do not guarantee that you will make money, obtain clients, recover costs, build a profitable business, receive replies, close sales, avoid disputes, or achieve any specific result. Any references to pricing, revenue, costs, timelines, demand, conversion, retention, sales, examples, case studies, or business outcomes are illustrative only.",
        "Past performance, example scenarios, estimated time-to-first-sale, popularity labels, featured labels, or sample pricing are not promises, projections, representations, or guarantees. Your results may differ materially and may be zero or negative.",
        "You should assume that every business idea requires validation, skill, effort, sales activity, legal review, operational work, and risk. You may lose money, time, reputation, or business opportunities by acting on an idea incorrectly or without proper validation.",
      ],
    },
    {
      title: "5. Your responsibility for compliance",
      body: [
        "You are responsible for complying with all laws, rules, regulations, platform terms, professional obligations, licensing requirements, advertising standards, privacy obligations, spam rules, consumer protection laws, tax obligations, workplace laws, and industry requirements that apply to your use of Side Hustle Stephen or any business you start.",
        "You must independently review and adapt all outreach scripts, prompts, templates, testimonials, claims, pricing, contracts, forms, reports, and deliverables before using them with prospects, clients, customers, employees, contractors, platforms, or the public.",
        "You must not use Side Hustle Stephen to make false, misleading, deceptive, unsubstantiated, unlawful, discriminatory, harassing, spammy, infringing, or harmful claims or communications.",
      ],
    },
    {
      title: "6. AI prompts, templates, and generated outputs",
      body: [
        "Some assets may include AI prompts, AI-assisted workflows, or examples designed to be used with third-party AI tools. AI outputs can be inaccurate, incomplete, biased, outdated, unsafe, infringing, or unsuitable for your use case.",
        "You are responsible for reviewing, fact-checking, editing, testing, and approving any AI output before using it. You must not rely on AI output as a substitute for professional advice, human judgment, legal review, source checking, or client approval.",
        "We are not responsible for any third-party AI model, platform, provider, outage, data use, policy change, output, or consequence arising from your use of prompts or AI tools.",
      ],
    },
    {
      title: "7. Member assets and license restrictions",
      body: [
        "Subject to your compliance with these terms and payment of applicable fees, we grant you a limited, revocable, non-exclusive, non-transferable license to access and use member-only assets for your own personal learning and your own internal business use.",
        "You must not resell, sublicense, redistribute, publish, upload, share, leak, gift, bundle, white-label, include in another product, train a model on, scrape, mirror, publicly post, or make member-only assets available to anyone else without our prior written permission.",
        "You may adapt templates and scripts for use in your own business with your own clients, but you may not sell Side Hustle Stephen assets themselves as standalone products or imply that we endorse, certify, supervise, or are responsible for your services.",
      ],
    },
    {
      title: "8. Intellectual property",
      body: [
        "The website, branding, copy, structure, design, templates, prompts, worksheets, playbooks, downloads, and other materials are owned by us or our licensors and are protected by intellectual property and other laws.",
        "Except for the limited license expressly granted in these terms, no rights are transferred to you. You must not copy, reverse engineer, reproduce, modify, distribute, create derivative products from, or commercially exploit any part of Side Hustle Stephen except as expressly allowed.",
      ],
    },
    {
      title: "9. Accounts, access, and security",
      body: [
        "You are responsible for maintaining the confidentiality and security of your account, email access, login links, devices, and any credentials used to access Side Hustle Stephen. You are responsible for activity under your account.",
        "You must provide accurate account and billing information and keep it current. We may suspend, restrict, or terminate access if we reasonably believe your account has been shared, misused, compromised, used fraudulently, or used in breach of these terms.",
      ],
    },
    {
      title: "10. Payments, subscriptions, and taxes",
      body: [
        "Paid access may be offered as a recurring subscription. By subscribing, you authorize our payment processor to charge the applicable fees, taxes, and recurring subscription amounts until you cancel.",
        "Prices, inclusions, plans, features, and billing intervals may change from time to time. If a price change applies to an existing subscription, we will handle it as required by applicable law and our payment processor.",
        "You are responsible for any taxes, duties, bank fees, currency conversion fees, payment method fees, or other charges that apply to your purchase or use of Side Hustle Stephen.",
      ],
    },
    {
      title: "11. Refunds and cancellations",
      body: [
        "All purchases and subscription payments are final and non-refundable to the maximum extent permitted by law. We do not offer refunds, credits, partial refunds, goodwill refunds, change-of-mind refunds, unused-time refunds, accidental-purchase refunds, or refunds because you did not use, download, implement, like, understand, or obtain results from Side Hustle Stephen.",
        "Because member assets are digital products that may be accessed, copied, and downloaded immediately, access is treated as delivered when your account is granted access to member-only content or downloads. Once access has been provided, fees are non-refundable to the maximum extent permitted by law.",
        "Cancellation stops future renewal charges but does not create a refund for amounts already paid. You are responsible for cancelling before your next renewal date if you do not want to be charged again.",
        "We may refuse or revoke access where a payment fails, is reversed, is disputed, is charged back, appears fraudulent, or breaches our payment processor's rules. Chargebacks or payment disputes may result in account suspension while the matter is investigated.",
        "Nothing in these terms excludes, restricts, or modifies any non-excludable consumer guarantee, refund right, or other mandatory legal right that applies to you.",
      ],
    },
    {
      title: "12. Third-party services and links",
      body: [
        "Side Hustle Stephen may link to, reference, or integrate with third-party services such as payment processors, authentication providers, AI tools, design tools, analytics tools, email tools, file services, social platforms, or external websites.",
        "We do not control third-party services and are not responsible for their content, security, privacy practices, pricing, availability, policies, outputs, disputes, charges, errors, or losses. Your use of third-party services is governed by their own terms and policies.",
      ],
    },
    {
      title: "13. Acceptable use",
      body: [
        "You must not use Side Hustle Stephen to break the law, infringe rights, harass others, send spam, scrape or harvest data, bypass access controls, attack the website, introduce malware, interfere with service operation, share paid access, misrepresent your relationship with us, or use assets in a way that could harm us, users, clients, consumers, or the public.",
        "We may investigate suspected misuse and may suspend, terminate, or restrict access without refund where we reasonably believe these terms have been breached.",
      ],
    },
    {
      title: "14. Availability and changes",
      body: [
        "The website and assets are provided on an as-available basis. We may modify, replace, remove, suspend, discontinue, restrict, or update any part of Side Hustle Stephen at any time, including packs, assets, prices, features, account flows, and download links.",
        "We do not guarantee uninterrupted availability, error-free operation, compatibility, security, or that any content will remain available permanently.",
      ],
    },
    {
      title: "15. Disclaimers",
      body: [
        "To the maximum extent permitted by law, Side Hustle Stephen and all content, assets, templates, prompts, examples, downloads, and services are provided as is and as available, without warranties of any kind, whether express, implied, statutory, or otherwise.",
        "To the maximum extent permitted by law, we disclaim all warranties of accuracy, completeness, reliability, timeliness, fitness for a particular purpose, merchantability, non-infringement, title, availability, security, and suitability for your circumstances.",
      ],
    },
    {
      title: "16. Limitation of liability",
      body: [
        "To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, exemplary, punitive, or economic loss; loss of profit, revenue, savings, goodwill, data, clients, business opportunity, reputation, or anticipated benefit; or any claim arising from your use of, reliance on, or inability to use Side Hustle Stephen.",
        "To the maximum extent permitted by law, our total aggregate liability for all claims connected with Side Hustle Stephen is limited to the amount you paid us for Side Hustle Stephen in the three months before the event giving rise to the claim, or AUD $100 if you have not paid us anything.",
        "Some laws do not allow certain exclusions or limitations. Where liability cannot be excluded, our liability is limited to the maximum extent permitted by law.",
      ],
    },
    {
      title: "17. Indemnity",
      body: [
        "To the maximum extent permitted by law, you agree to indemnify and hold harmless us and our officers, employees, contractors, creators, affiliates, suppliers, and licensors from any claim, loss, liability, damage, cost, or expense arising from your breach of these terms, your misuse of Side Hustle Stephen, your business activities, your client work, your marketing claims, your legal or regulatory non-compliance, your infringement of rights, or your use of any asset, template, prompt, output, or idea.",
      ],
    },
    {
      title: "18. Termination",
      body: [
        "We may suspend or terminate your access to Side Hustle Stephen if you breach these terms, fail to pay, share access, misuse assets, create risk for us or others, or if continued access would be unlawful or commercially impractical.",
        "Sections relating to intellectual property, license restrictions, disclaimers, limitation of liability, indemnity, payments owed, dispute resolution, and any other provisions intended to survive will survive termination.",
      ],
    },
    {
      title: "19. Governing law and disputes",
      body: [
        "These terms are governed by the laws of New South Wales, Australia, except to the extent mandatory laws in another jurisdiction apply and cannot be excluded.",
        "Before starting formal proceedings, you agree to contact us and try to resolve the dispute in good faith. Subject to any non-excludable legal rights, the courts of New South Wales, Australia will have jurisdiction over disputes connected with these terms or Side Hustle Stephen.",
      ],
    },
    {
      title: "20. Changes to these terms",
      body: [
        "We may update these terms from time to time. The updated version will apply from the date it is posted or from any later date stated on the page. Your continued use of Side Hustle Stephen after changes are posted means you accept the updated terms.",
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-4 py-12 sm:px-8">
        <article className="glass rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Terms</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--navy-ink)] sm:text-5xl">Terms of use</h1>
          <p className="premium-copy mt-4 text-sm font-semibold">Last updated: 11 June 2026</p>
          <div className="mt-6 rounded-[1.5rem] bg-white/58 p-4 text-sm leading-7 text-[var(--graphite)] ring-1 ring-white/70 sm:p-5">
            <p>
              These terms explain how Side Hustle Stephen works, what members can use, and the limits that apply to educational business content and digital downloads.
            </p>
          </div>
          <div className="mt-8 space-y-7 leading-7 text-[var(--graphite)]">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-[rgba(5,8,20,0.09)] pt-6">
                <h2 className="text-xl font-bold tracking-normal text-[var(--navy-ink)]">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
