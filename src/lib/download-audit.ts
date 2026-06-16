import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";
import { getClientIp, hashIdentifier } from "@/lib/rate-limit";

type DownloadType = "asset" | "pack_zip";

type RecordMemberDownloadOptions = {
  userId: string | null;
  downloadType: DownloadType;
  packSlug: string;
  assetId?: string | null;
  assetCount?: number | null;
};

const SUSPICIOUS_DISTINCT_IPS_PER_DAY = 5;
const SUSPICIOUS_DISTINCT_AGENTS_PER_DAY = 8;
const SUSPICIOUS_USERS_PER_IP_PER_DAY = 6;

export async function recordMemberDownload(req: Request, options: RecordMemberDownloadOptions) {
  if (!hasSupabaseAdminConfig() || !options.userId) return;

  const admin = createSupabaseAdminClient();
  const ipHash = hashIdentifier(getClientIp(req));
  const userAgent = req.headers.get("user-agent") ?? "unknown";
  const userAgentHash = hashIdentifier(userAgent);

  const { error } = await admin.from("download_events").insert({
    supabase_user_id: options.userId,
    download_type: options.downloadType,
    pack_slug: options.packSlug,
    asset_id: options.assetId ?? null,
    asset_count: options.assetCount ?? null,
    ip_hash: ipHash,
    user_agent_hash: userAgentHash,
  });

  if (error) {
    console.error(JSON.stringify({ level: "error", msg: "download_audit_insert_failed", downloadType: options.downloadType, pack: options.packSlug, error: error.message }));
    return;
  }

  await detectSuspiciousDownloadPatterns({
    userId: options.userId,
    ipHash,
    downloadType: options.downloadType,
    packSlug: options.packSlug,
  });
}

async function detectSuspiciousDownloadPatterns({
  userId,
  ipHash,
  downloadType,
  packSlug,
}: {
  userId: string;
  ipHash: string;
  downloadType: DownloadType;
  packSlug: string;
}) {
  const admin = createSupabaseAdminClient();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: userEvents, error: userEventsError } = await admin
    .from("download_events")
    .select("ip_hash,user_agent_hash")
    .eq("supabase_user_id", userId)
    .gte("created_at", since)
    .limit(500);

  if (userEventsError) {
    console.error(JSON.stringify({ level: "error", msg: "download_audit_user_pattern_check_failed", error: userEventsError.message }));
  } else {
    const distinctIps = new Set(userEvents?.map((event) => event.ip_hash).filter(Boolean));
    const distinctAgents = new Set(userEvents?.map((event) => event.user_agent_hash).filter(Boolean));

    if (distinctIps.size >= SUSPICIOUS_DISTINCT_IPS_PER_DAY || distinctAgents.size >= SUSPICIOUS_DISTINCT_AGENTS_PER_DAY) {
      console.warn(
        JSON.stringify({
          level: "warn",
          msg: "possible_account_sharing",
          reason: "many_network_or_browser_fingerprints",
          userId,
          distinctIps: distinctIps.size,
          distinctAgents: distinctAgents.size,
          downloadType,
          pack: packSlug,
        }),
      );
    }
  }

  const { data: ipEvents, error: ipEventsError } = await admin
    .from("download_events")
    .select("supabase_user_id")
    .eq("ip_hash", ipHash)
    .gte("created_at", since)
    .limit(500);

  if (ipEventsError) {
    console.error(JSON.stringify({ level: "error", msg: "download_audit_ip_pattern_check_failed", error: ipEventsError.message }));
    return;
  }

  const distinctUsers = new Set(ipEvents?.map((event) => event.supabase_user_id).filter(Boolean));
  if (distinctUsers.size >= SUSPICIOUS_USERS_PER_IP_PER_DAY) {
    console.warn(
      JSON.stringify({
        level: "warn",
        msg: "possible_shared_network_or_credential_abuse",
        reason: "many_users_same_network",
        distinctUsers: distinctUsers.size,
        downloadType,
        pack: packSlug,
      }),
    );
  }
}
