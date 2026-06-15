import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

export type MembershipStatus = "active" | "inactive" | "setup_required";

export async function getMembershipStatus(): Promise<MembershipStatus> {
  if (!hasSupabaseConfig()) {
    return "setup_required";
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "inactive";
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status,current_period_end")
    .eq("supabase_user_id", user.id)
    .in("status", ["active", "trialing"])
    .order("current_period_end", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  if (subscription?.status === "active" || subscription?.status === "trialing") {
    if (!subscription.current_period_end || new Date(subscription.current_period_end).getTime() > Date.now()) {
      return "active";
    }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_status")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.membership_status === "active") {
    return "active";
  }

  return "inactive";
}
