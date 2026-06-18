import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { safeInternalPath } from "@/lib/utils";
import { createMembershipCheckoutUrl } from "@/lib/checkout";
import { hasStripeConfig } from "@/lib/stripe";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

export const metadata = {
  title: "Continue Checkout | Side Hustle Stephen",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function ContinueCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const params = await searchParams;
  const returnTo = safeInternalPath(params.return_to);

  async function continueToCheckout() {
    "use server";

    if (hasSupabaseConfig() && hasStripeConfig()) {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const checkoutUrl = await createMembershipCheckoutUrl({
          supabase,
          user,
          returnTo,
          customerEmail: user.email,
        });

        redirect(checkoutUrl);
      }
    }

    redirect(`/pricing?setup_required=1&return_to=${encodeURIComponent(returnTo)}`);
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-8 sm:px-8 sm:py-12">
        <form action={continueToCheckout} className="glass w-full rounded-lg p-5 text-center sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--safety-orange)]">Secure link confirmed</p>
          <h1 className="mt-3 break-words text-[clamp(2.35rem,11vw,3rem)] font-semibold leading-[1.02] tracking-normal sm:text-5xl">Continue to checkout.</h1>
          <p className="mt-5 leading-7 text-[var(--graphite)]">
            Your account link is ready. Continue to Stripe to unlock every pack for $9/month.
          </p>
          <button
            type="submit"
            data-analytics-event="Continue To Stripe Clicked"
            data-analytics-return-to={returnTo}
            data-analytics-location="checkout_continue_page"
            className="accent-cta mt-8 inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 sm:w-auto"
          >
            Continue to Stripe
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
