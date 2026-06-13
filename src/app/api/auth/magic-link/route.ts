import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";
import { hasSupabaseConfig } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    returnTo?: string;
  };

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const returnTo = safeInternalPath(body.returnTo);

  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      ok: true,
      mode: "setup_required",
      message: "Supabase env vars are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const redirectTo = absoluteUrl(`/auth/callback?return_to=${encodeURIComponent(returnTo)}&checkout=1`);

  const { error } = await supabase.auth.signInWithOtp({
    email: body.email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
