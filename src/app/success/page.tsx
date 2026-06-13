import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { safeInternalPath } from "@/lib/utils";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const params = await searchParams;
  const returnTo = safeInternalPath(params.return_to);

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-5 py-12 sm:px-8">
        <div className="glass rounded-[2rem] p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--orange-glass)] text-[var(--safety-orange)]">
            <CheckCircle2 size={30} />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Success</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">Membership activation is in progress.</h1>
          <p className="mt-5 leading-7 text-[var(--graphite)]">
            If Stripe webhooks and Supabase sync are configured, your member access should be available shortly. Continue back to the pack and refresh if the unlock state is still updating.
          </p>
          <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
            {["Payment received", "Webhook sync", "Assets unlock"].map((step, index) => (
              <div key={step} className="rounded-2xl bg-white/70 p-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">Step {index + 1}</p>
                <p className="mt-2 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
          <Link href={returnTo} className="accent-cta mt-8 inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5">
            Continue
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
