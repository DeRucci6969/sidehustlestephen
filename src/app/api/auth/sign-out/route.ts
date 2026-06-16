import { NextResponse } from "next/server";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import { rejectCrossOriginRequest } from "@/lib/request-security";

export async function POST(req: Request) {
  const crossOriginResponse = rejectCrossOriginRequest(req);
  if (crossOriginResponse) return crossOriginResponse;

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
