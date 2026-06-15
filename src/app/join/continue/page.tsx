import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";

export default async function ContinueCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const params = await searchParams;
  const returnTo = safeInternalPath(params.return_to);

  async function continueToCheckout() {
    "use server";

    const response = await fetch(absoluteUrl("/api/checkout"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ returnTo }),
      cache: "no-store",
    });
    const data = (await response.json()) as { url?: string };
    if (data.url) redirect(data.url);
    redirect(`/pricing?setup_required=1&return_to=${encodeURIComponent(returnTo)}`);
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-5 py-12 sm:px-8">
        <form action={continueToCheckout} className="glass w-full rounded-[2rem] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Secure link confirmed</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">Continue to checkout.</h1>
          <p className="mt-5 leading-7 text-[var(--graphite)]">
            Your account link is ready. Continue to Stripe to unlock every pack for $9/month.
          </p>
          <button className="accent-cta mt-8 inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5">
            Continue to Stripe
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
