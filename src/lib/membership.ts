import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

export type MembershipStatus = "active" | "inactive" | "setup_required";

export type MembershipContext = {
  status: MembershipStatus;
  isAuthenticated: boolean;
  isMember: boolean;
  email: string | null;
  userId: string | null;
};

export async function getMembershipContext(): Promise<MembershipContext> {
  if (!hasSupabaseConfig()) {
    return {
      status: "setup_required",
      isAuthenticated: false,
      isMember: false,
      email: null,
      userId: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "inactive",
      isAuthenticated: false,
      isMember: false,
      email: null,
      userId: null,
    };
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
      return {
        status: "active",
        isAuthenticated: true,
        isMember: true,
        email: user.email ?? null,
        userId: user.id,
      };
    }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_status")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.membership_status === "active") {
    return {
      status: "active",
      isAuthenticated: true,
      isMember: true,
      email: user.email ?? null,
      userId: user.id,
    };
  }

  return {
    status: "inactive",
    isAuthenticated: true,
    isMember: false,
    email: user.email ?? null,
    userId: user.id,
  };
}

export async function getMembershipStatus(): Promise<MembershipStatus> {
  const context = await getMembershipContext();
  return context.status;
}
