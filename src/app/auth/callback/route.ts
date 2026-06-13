import { NextResponse } from "next/server";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnTo = safeInternalPath(url.searchParams.get("return_to"));
  const checkout = url.searchParams.get("checkout") === "1";

  if (!hasSupabaseConfig()) {
    return NextResponse.redirect(absoluteUrl(checkout ? `/join/continue?return_to=${encodeURIComponent(returnTo)}` : returnTo));
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(absoluteUrl(checkout ? `/join/continue?return_to=${encodeURIComponent(returnTo)}` : returnTo));
}
