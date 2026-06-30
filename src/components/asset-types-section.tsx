import { Bot, Calculator, ClipboardCheck, FileText, MailPlus, MessageSquareText, Repeat2 } from "lucide-react";
import { JoinButton } from "@/components/join-modal";

const assetTypes = [
  {
    title: "AI prompt packs",
    description: "Reusable prompts for research, positioning, copy, audits, and client delivery so you are not starting from a blank chat window.",
    outcome: "Think faster",
    icon: Bot,
  },
  {
    title: "AI automation packs",
    description: "Scheduled agent prompts for prospecting, follow-up, delivery QA, reporting, and proof repurposing with human approval built in.",
    outcome: "Run weekly",
    icon: Repeat2,
  },
  {
    title: "Outreach scripts",
    description: "Message templates for first contact, follow-up, and objection handling so you can start conversations without overthinking the wording.",
    outcome: "Find buyers",
    icon: MailPlus,
  },
  {
    title: "Pricing sheets",
    description: "Simple pricing ladders and package structures that help you quote the work clearly without inventing a number on the spot.",
    outcome: "Quote cleanly",
    icon: Calculator,
  },
  {
    title: "Client intake forms",
    description: "Question sets that collect the right inputs upfront, reduce back-and-forth, and make delivery feel professional from day one.",
    outcome: "Scope the job",
    icon: ClipboardCheck,
  },
  {
    title: "Delivery checklists",
    description: "Step-by-step completion lists for turning the sale into a finished client handoff with fewer missed details.",
    outcome: "Ship reliably",
    icon: FileText,
  },
  {
    title: "Email templates",
    description: "Polished client communication for onboarding, updates, revisions, and delivery so every touchpoint feels considered.",
    outcome: "Look credible",
    icon: MessageSquareText,
  },
];

export function AssetTypesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
      <div className="mb-7 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Member assets</p>
        <h2 className="display-type mt-3 text-4xl sm:text-5xl">What you actually unlock.</h2>
        <p className="premium-copy mt-4 text-base leading-7 sm:text-lg">
          Each pack is built around the same practical path: choose a buyer, make a clear offer, start outreach, price the work, and deliver without guessing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assetTypes.map((asset) => {
          const Icon = asset.icon;

          return (
            <article
              key={asset.title}
              className="glass group flex min-h-[230px] flex-col rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(0,0,0,0.14)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--obsidian)] text-white shadow-[0_14px_32px_rgba(10,12,16,0.16)]">
                  <Icon size={19} strokeWidth={2.1} />
                </span>
                <span className="rounded-full border border-[rgba(22,32,50,0.1)] bg-white/76 px-3 py-1 text-xs font-bold text-[var(--graphite)]">
                  {asset.outcome}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-normal text-[var(--navy-ink)]">{asset.title}</h3>
              <p className="premium-copy mt-3 text-sm leading-6">{asset.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-[rgba(22,32,50,0.1)] bg-white/72 p-4 shadow-[0_16px_36px_rgba(22,32,50,0.06)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold leading-6 text-[var(--navy-ink)]">
          The goal is not more theory. It is a set of files that helps you make the first real move today.
        </p>
        <JoinButton label="Unlock assets" className="w-full sm:w-auto" />
      </div>
    </section>
  );
}
