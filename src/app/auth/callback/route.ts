import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";
import { hasStripeConfig } from "@/lib/stripe";
import { createMembershipCheckoutUrl } from "@/lib/checkout";

const allowedOtpTypes = new Set(["signup", "invite", "magiclink", "recovery", "email_change", "email"]);

function renderFragmentSessionHandoff({ returnTo, checkout }: { returnTo: string; checkout: boolean }) {
  const payload = JSON.stringify({ returnTo, checkout }).replaceAll("<", "\\u003c");

  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Continuing to checkout</title>
  </head>
  <body style="margin:0;background:#f7f4ee;color:#0b0d10;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center;">
      <div>
        <p style="margin:0 0 10px;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#ff5a1f;">Side Hustle Stephen</p>
        <h1 style="margin:0;font-size:32px;line-height:1.1;">Preparing checkout...</h1>
        <p style="margin:14px 0 0;color:#5f625d;">This should only take a moment.</p>
      </div>
    </main>
    <script>
      (async function () {
        const config = ${payload};
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");
        const fallbackUrl = config.checkout
          ? "/join/continue?return_to=" + encodeURIComponent(config.returnTo)
          : config.returnTo;

        if (!accessToken || !refreshToken) {
          window.location.replace(fallbackUrl);
          return;
        }

        try {
          const response = await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({
              accessToken,
              refreshToken,
              returnTo: config.returnTo,
              checkout: config.checkout,
            }),
          });

          const data = await response.json().catch(() => ({}));
          window.location.replace(data.url || fallbackUrl);
        } catch {
          window.location.replace(fallbackUrl);
        }
      })();
    </script>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const returnTo = safeInternalPath(url.searchParams.get("return_to"));
  const checkout = url.searchParams.get("checkout") === "1";

  const continueUrl = `/join/continue?return_to=${encodeURIComponent(returnTo)}`;

  if (!hasSupabaseConfig()) {
    return NextResponse.redirect(absoluteUrl(checkout ? continueUrl : returnTo));
  }

  const supabase = await createSupabaseServerClient();
  let user = null;

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      user = data.user ?? data.session?.user ?? null;
    } else {
      console.error("Auth code exchange failed", error.message);
    }
  } else if (tokenHash && type && allowedOtpTypes.has(type)) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    });

    if (!error) {
      user = data.user ?? data.session?.user ?? null;
    } else {
      console.error("Auth token hash verification failed", error.message);
    }
  }

  if (!code && !tokenHash) {
    return renderFragmentSessionHandoff({ returnTo, checkout });
  }

  if (checkout && user && hasStripeConfig()) {
    try {
      const checkoutUrl = await createMembershipCheckoutUrl({
        supabase,
        user,
        returnTo,
        customerEmail: user.email,
      });

      return NextResponse.redirect(checkoutUrl);
    } catch (error) {
      console.error("Direct checkout after auth failed", error);
    }
  }

  return NextResponse.redirect(absoluteUrl(checkout ? continueUrl : returnTo));
}
