import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy | Side Hustle Stephen - The Launchpad",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Who this policy applies to",
      body: [
        "This Privacy Policy explains how Side Hustle Stephen - The Launchpad collects, uses, stores, and discloses personal information when you visit the website, create an account, subscribe, download assets, contact us, or interact with our marketing.",
        "This policy is intended to be conservative and transparent. It should be reviewed by a qualified lawyer before public launch, especially if analytics, advertising pixels, email marketing tools, affiliates, community features, or additional data collection are added.",
      ],
    },
    {
      title: "2. What we collect",
      body: [
        "We collect the minimum personal information reasonably needed to provide the service, operate the website, communicate with you, improve The Launchpad, comply with law, and market our own products and services.",
        "This may include your name if you provide it, email address, account details, login and authentication records, subscription status, billing identifiers, Stripe customer or subscription IDs, download and access records, support messages, marketing preferences, device and browser information, IP address, approximate location derived from technical data, referral source, pages viewed, and interactions with emails or website features.",
        "We do not intentionally collect sensitive information such as health information, government identifiers, racial or ethnic origin, political opinions, religious beliefs, biometric data, precise location, or information about children. Please do not send us sensitive information unless we specifically request it and have explained why.",
      ],
    },
    {
      title: "3. Payment information",
      body: [
        "Payments and subscription billing are processed by Stripe or another payment processor we may use in the future. We do not intend to store raw card numbers, CVV codes, or full payment card details on our own servers.",
        "We may receive and store limited billing-related information from the payment processor, such as your email address, customer ID, subscription status, plan, payment status, invoice status, billing country, and timestamps needed to manage access, support, refunds, disputes, and records.",
      ],
    },
    {
      title: "4. How we collect information",
      body: [
        "We collect information directly from you when you enter your email, request a magic link, create an account, purchase a subscription, contact us, complete a form, download an asset, or otherwise interact with the service.",
        "We may also collect information automatically through cookies, server logs, authentication systems, payment systems, analytics tools, email tools, and security tools. We may receive limited information from service providers such as Supabase, Stripe, hosting providers, analytics providers, and email providers.",
      ],
    },
    {
      title: "5. How we use information",
      body: [
        "We use personal information to provide and operate The Launchpad, authenticate users, send login links, process payments, manage subscriptions, provide member access, deliver downloads, respond to support requests, maintain records, prevent fraud and abuse, secure the service, troubleshoot errors, improve content and product decisions, and comply with legal obligations.",
        "We may also use your contact details and usage information to send service updates, product announcements, educational content, launch pack updates, offers, surveys, and marketing about The Launchpad or closely related products and services. You can opt out of promotional emails at any time.",
      ],
    },
    {
      title: "6. Marketing communications",
      body: [
        "We only intend to use your personal information for our own marketing where permitted by law, where you have consented, or where you would reasonably expect to receive communications from us because you signed up, subscribed, downloaded assets, or asked for information.",
        "Every promotional email should include an unsubscribe option or another simple way to opt out. If you opt out, we may still send non-promotional messages about your account, subscription, payments, security, legal notices, service changes, or support requests.",
        "We do not intend to sell your personal information or give it to unrelated third parties so they can market their own products to you.",
      ],
    },
    {
      title: "7. Cookies and analytics",
      body: [
        "We may use cookies, local storage, pixels, logs, and similar technologies to keep you signed in, remember preferences, measure website performance, understand which pages and packs are useful, detect abuse, and improve the service.",
        "If we use analytics tools, they may collect technical information such as device type, browser, operating system, pages viewed, referral source, approximate location, and interaction events. We aim to use analytics in a proportionate way and avoid collecting more personal information than reasonably needed.",
      ],
    },
    {
      title: "8. Disclosure to service providers",
      body: [
        "We may disclose personal information to trusted service providers that help us operate The Launchpad, including hosting providers, database providers, authentication providers, payment processors, email providers, analytics providers, customer support tools, security tools, professional advisers, and contractors.",
        "These providers may process information on our behalf or as independent providers under their own terms and privacy policies. We only intend to share information that is reasonably necessary for the relevant service.",
      ],
    },
    {
      title: "9. Legal, safety, and business disclosures",
      body: [
        "We may use or disclose personal information if required or permitted by law, court order, subpoena, regulator request, tax obligation, payment dispute, chargeback, fraud investigation, security incident, rights enforcement, or to protect the rights, safety, property, or security of us, users, service providers, or the public.",
        "If The Launchpad is involved in a merger, acquisition, financing, restructure, asset sale, or similar business transaction, personal information may be disclosed as part of due diligence or transferred as part of that transaction, subject to reasonable confidentiality and legal safeguards.",
      ],
    },
    {
      title: "10. International processing",
      body: [
        "We may use service providers located in Australia, the United States, the European Union, the United Kingdom, or other countries. This means personal information may be stored or processed outside your country of residence.",
        "Where required, we will take reasonable steps to use appropriate safeguards for cross-border disclosures and international processing, such as using reputable providers, contractual protections, security controls, and compliance mechanisms offered by those providers.",
      ],
    },
    {
      title: "11. Data retention",
      body: [
        "We keep personal information for as long as reasonably needed for the purposes described in this policy, including to provide the service, maintain your account, manage subscriptions, resolve disputes, keep business and tax records, enforce terms, prevent abuse, and comply with legal obligations.",
        "When information is no longer reasonably needed, we will take reasonable steps to delete, de-identify, or securely archive it, unless we are required or permitted to keep it for longer.",
      ],
    },
    {
      title: "12. Security",
      body: [
        "We take reasonable technical and organisational steps to protect personal information from misuse, interference, loss, unauthorised access, modification, and disclosure. These steps may include access controls, reputable hosting and payment providers, encrypted connections, limited admin access, and monitoring for abuse.",
        "No internet service, email system, payment system, database, or storage method is completely secure. You are responsible for keeping your email account, device, and login links secure because access to your email may allow access to your Launchpad account.",
      ],
    },
    {
      title: "13. Your choices and rights",
      body: [
        "Depending on where you live, you may have rights to request access to, correction of, deletion of, portability of, restriction of, or objection to certain processing of your personal information. You may also have the right to withdraw consent where processing is based on consent.",
        "You can unsubscribe from promotional emails using the unsubscribe link or by contacting us. You can also request that we stop using your personal information for direct marketing.",
        "We may need to verify your identity before responding to privacy requests. Some requests may be limited by law, fraud prevention, security needs, legal claims, tax and accounting obligations, payment disputes, or the need to provide the service.",
      ],
    },
    {
      title: "14. Australian privacy rights",
      body: [
        "If the Australian Privacy Act 1988 and Australian Privacy Principles apply to us, you may request access to personal information we hold about you and request correction if it is inaccurate, out of date, incomplete, irrelevant, or misleading.",
        "You may also complain about how we handle personal information. We will take reasonable steps to respond to privacy complaints within a reasonable time.",
      ],
    },
    {
      title: "15. European and UK users",
      body: [
        "If GDPR or UK GDPR applies, the legal bases for processing may include performance of a contract, legitimate interests, consent, compliance with legal obligations, and steps taken before entering into a contract.",
        "Our legitimate interests may include operating and improving the service, securing the website, preventing fraud and misuse, communicating with users, marketing similar products and services, maintaining business records, and enforcing legal rights, provided those interests are not overridden by your rights and interests.",
      ],
    },
    {
      title: "16. California users",
      body: [
        "If California privacy law applies to us, California residents may have rights to know what personal information is collected, used, disclosed, sold, or shared; to request deletion or correction; to opt out of sale or sharing; to limit certain sensitive information use; and to not be discriminated against for exercising privacy rights.",
        "We do not intend to sell personal information. We also do not intentionally collect sensitive personal information for the purpose of inferring characteristics.",
      ],
    },
    {
      title: "17. Children",
      body: [
        "The Launchpad is intended for adults and is not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided personal information to us, contact us so we can take appropriate steps.",
      ],
    },
    {
      title: "18. Third-party links and tools",
      body: [
        "The website may link to third-party websites, services, tools, platforms, payment pages, AI tools, social platforms, or external resources. Their privacy practices are governed by their own policies, not this Privacy Policy.",
        "You should review the privacy policies of any third-party service before providing information to them.",
      ],
    },
    {
      title: "19. Changes to this policy",
      body: [
        "We may update this Privacy Policy from time to time. The updated version will apply from the date it is posted or from any later date stated on the page. If changes are material, we may take additional steps to notify users where required by law.",
      ],
    },
    {
      title: "20. Contact",
      body: [
        "To ask a privacy question, make a request, opt out of marketing, or make a privacy complaint, contact us through the contact method provided on the website or by replying to official account emails from The Launchpad.",
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-4 py-12 sm:px-8">
        <article className="glass rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Privacy</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--navy-ink)] sm:text-5xl">Privacy policy</h1>
          <p className="premium-copy mt-4 text-sm font-semibold">Last updated: 11 June 2026</p>
          <div className="mt-6 rounded-[1.5rem] bg-white/58 p-4 text-sm leading-7 text-[var(--graphite)] ring-1 ring-white/70 sm:p-5">
            <p>
              We use personal information to provide The Launchpad, manage accounts and subscriptions, improve the service, keep it secure, respond to users, and market our own related products and services. We do not intend to sell personal information or use it for unrelated third-party marketing.
            </p>
          </div>
          <div className="mt-8 space-y-7 leading-7 text-[var(--graphite)]">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-[rgba(5,8,20,0.09)] pt-6">
                <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--navy-ink)]">{section.title}</h2>
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
