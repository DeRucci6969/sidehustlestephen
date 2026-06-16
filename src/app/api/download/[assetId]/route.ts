import { NextResponse } from "next/server";
import { track as trackServer } from "@vercel/analytics/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { packs } from "@/data/packs";
import { getMembershipContext } from "@/lib/membership";
import { safeAttachmentFilename } from "@/lib/request-security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { recordMemberDownload } from "@/lib/download-audit";
import { recordAnalyticsEvent } from "@/lib/first-party-analytics";
import assetManifest from "../../../../../content/member-assets/manifest.json";

type AssetManifestEntry = {
  id: string;
  packSlug: string;
  title: string;
  type: string;
  filename: string;
};

const contentTypes: Record<string, string> = {
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  PDF: "application/pdf",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export async function GET(req: Request, { params }: { params: Promise<{ assetId: string }> }) {
  const start = Date.now();
  const requestId = req.headers.get("x-vercel-id");
  const { assetId } = await params;
  const ipRateLimitResponse = await checkRateLimit({
    action: "download_attempt",
    rules: [{ scope: "ip", identifier: getClientIp(req), limit: 120, windowSeconds: 10 * 60 }],
  });
  if (ipRateLimitResponse) return ipRateLimitResponse;

  const asset = packs.flatMap((pack) => pack.assets).find((item) => item.id === assetId);

  if (!asset) {
    console.warn(JSON.stringify({ level: "warn", msg: "asset_download_not_found", route: "/api/download/[assetId]", requestId, assetId, ms: Date.now() - start }));
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  const viewer = await getMembershipContext();
  if (!viewer.isMember) {
    console.warn(JSON.stringify({ level: "warn", msg: "asset_download_membership_required", route: "/api/download/[assetId]", requestId, assetId, ms: Date.now() - start }));
    return NextResponse.json(
      {
        error: "Membership required",
        message: "This asset unlocks after an active membership is linked to your account.",
        asset,
      },
      { status: 402 },
    );
  }

  const memberRateLimitResponse = await checkRateLimit({
    action: "asset_download",
    rules: [
      { scope: "user", identifier: viewer.userId, limit: 80, windowSeconds: 60 * 60 },
      { scope: "user", identifier: viewer.userId, limit: 200, windowSeconds: 24 * 60 * 60 },
      { scope: "ip", identifier: getClientIp(req), limit: 160, windowSeconds: 60 * 60 },
    ],
  });
  if (memberRateLimitResponse) return memberRateLimitResponse;

  const manifestEntry = (assetManifest as AssetManifestEntry[]).find((item) => item.id === assetId);
  if (!manifestEntry) {
    console.error(JSON.stringify({ level: "error", msg: "asset_download_manifest_missing", route: "/api/download/[assetId]", requestId, assetId, ms: Date.now() - start }));
    return NextResponse.json({ error: "Asset file not found" }, { status: 404 });
  }

  const assetPath = path.join(process.cwd(), "content", "member-assets", manifestEntry.packSlug, manifestEntry.filename);

  try {
    const file = await readFile(assetPath);
    console.log(JSON.stringify({ level: "info", msg: "asset_download_served", route: "/api/download/[assetId]", requestId, assetId, pack: manifestEntry.packSlug, type: manifestEntry.type, ms: Date.now() - start }));
    void trackServer("Asset Download Served", { asset: assetId, pack: manifestEntry.packSlug, asset_type: manifestEntry.type }, { request: req });
    await recordMemberDownload(req, {
      userId: viewer.userId,
      downloadType: "asset",
      packSlug: manifestEntry.packSlug,
      assetId,
      assetCount: 1,
    });
    void recordAnalyticsEvent(req, {
      eventName: "Asset Download Served",
      path: `/api/download/${assetId}`,
      properties: { asset: assetId, pack: manifestEntry.packSlug, asset_type: manifestEntry.type },
    });
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypes[manifestEntry.type] ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${safeAttachmentFilename(manifestEntry.filename)}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(JSON.stringify({ level: "error", msg: "asset_download_file_unavailable", route: "/api/download/[assetId]", requestId, assetId, error: error instanceof Error ? error.message : String(error), ms: Date.now() - start }));
    return NextResponse.json({ error: "Asset file is unavailable" }, { status: 404 });
  }
}
