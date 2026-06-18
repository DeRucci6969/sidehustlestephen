import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TrackOnMount } from "@/components/track-on-mount";
import { safeInternalPath } from "@/lib/utils";

export const metadata = {
  title: "Membership Activating | Side Hustle Stephen",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const params = await searchParams;
  const returnTo = safeInternalPath(params.return_to);

  return (
    <>
      <TrackOnMount event="Checkout Success Page Viewed" properties={{ return_to: returnTo }} />
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-8 sm:px-8 sm:py-12">
        <div className="glass rounded-lg p-5 text-center sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--orange-glass)] text-[var(--safety-orange)]">
            <CheckCircle2 size={30} />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Success</p>
          <h1 className="mt-3 break-words text-[clamp(2.35rem,11vw,3rem)] font-semibold leading-[1.02] tracking-normal sm:text-5xl">Your membership is activating.</h1>
          <p className="mt-5 leading-7 text-[var(--graphite)]">
            Your access should be available shortly. Continue back to the pack and refresh if the unlock state is still updating.
          </p>
          <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
            {["Payment received", "Access update", "Assets unlock"].map((step, index) => (
              <div key={step} className="rounded-lg bg-white/70 p-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">Step {index + 1}</p>
                <p className="mt-2 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
          <Link
            href={returnTo}
            data-analytics-event="Success Continue Clicked"
            data-analytics-return-to={returnTo}
            className="accent-cta mt-8 inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 sm:w-auto"
          >
            Continue
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
