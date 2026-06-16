import { NextResponse } from "next/server";
import { track as trackServer } from "@vercel/analytics/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { zipSync } from "fflate";
import { getPack } from "@/data/packs";
import { getMembershipContext } from "@/lib/membership";
import { safeAttachmentFilename } from "@/lib/request-security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { recordMemberDownload } from "@/lib/download-audit";
import { recordAnalyticsEvent } from "@/lib/first-party-analytics";
import assetManifest from "../../../../../../content/member-assets/manifest.json";

type AssetManifestEntry = {
  id: string;
  packSlug: string;
  packTitle: string;
  title: string;
  type: string;
  filename: string;
};

function zipFilename(slug: string) {
  return `side-hustle-stephen-${slug}-assets.zip`;
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const start = Date.now();
  const requestId = req.headers.get("x-vercel-id");
  const { slug } = await params;
  const ipRateLimitResponse = await checkRateLimit({
    action: "download_attempt",
    rules: [{ scope: "ip", identifier: getClientIp(req), limit: 120, windowSeconds: 10 * 60 }],
  });
  if (ipRateLimitResponse) return ipRateLimitResponse;

  const pack = getPack(slug);

  if (!pack) {
    console.warn(JSON.stringify({ level: "warn", msg: "pack_zip_not_found", route: "/api/download/pack/[slug]", requestId, pack: slug, ms: Date.now() - start }));
    return NextResponse.json({ error: "Pack not found" }, { status: 404 });
  }

  const viewer = await getMembershipContext();
  if (!viewer.isMember) {
    console.warn(JSON.stringify({ level: "warn", msg: "pack_zip_membership_required", route: "/api/download/pack/[slug]", requestId, pack: slug, ms: Date.now() - start }));
    return NextResponse.json(
      {
        error: "Membership required",
        message: "This zip unlocks after an active membership is linked to your account.",
      },
      { status: 402 },
    );
  }

  const memberRateLimitResponse = await checkRateLimit({
    action: "pack_zip_download",
    rules: [
      { scope: "user", identifier: viewer.userId, limit: 8, windowSeconds: 60 * 60 },
      { scope: "user", identifier: viewer.userId, limit: 20, windowSeconds: 24 * 60 * 60 },
      { scope: "ip", identifier: getClientIp(req), limit: 20, windowSeconds: 60 * 60 },
    ],
  });
  if (memberRateLimitResponse) return memberRateLimitResponse;

  const entries = (assetManifest as AssetManifestEntry[]).filter((item) => item.packSlug === slug);

  if (!entries.length) {
    console.error(JSON.stringify({ level: "error", msg: "pack_zip_manifest_missing", route: "/api/download/pack/[slug]", requestId, pack: slug, ms: Date.now() - start }));
    return NextResponse.json({ error: "Asset files not found" }, { status: 404 });
  }

  try {
    const files = Object.fromEntries(
      await Promise.all(
        entries.map(async (entry) => {
          const assetPath = path.join(process.cwd(), "content", "member-assets", entry.packSlug, entry.filename);
          const file = await readFile(assetPath);
          return [entry.filename, new Uint8Array(file)];
        }),
      ),
    );
    const zip = zipSync(files, { level: 6 });

    console.log(JSON.stringify({ level: "info", msg: "pack_zip_served", route: "/api/download/pack/[slug]", requestId, pack: slug, assetCount: entries.length, ms: Date.now() - start }));
    void trackServer("Pack Zip Served", { pack: slug, asset_count: entries.length }, { request: req });
    await recordMemberDownload(req, {
      userId: viewer.userId,
      downloadType: "pack_zip",
      packSlug: slug,
      assetCount: entries.length,
    });
    void recordAnalyticsEvent(req, {
      eventName: "Pack Zip Served",
      path: `/api/download/pack/${slug}`,
      properties: { pack: slug, asset_count: entries.length },
    });
    return new NextResponse(Buffer.from(zip), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeAttachmentFilename(zipFilename(slug))}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(JSON.stringify({ level: "error", msg: "pack_zip_file_unavailable", route: "/api/download/pack/[slug]", requestId, pack: slug, error: error instanceof Error ? error.message : String(error), ms: Date.now() - start }));
    return NextResponse.json({ error: "One or more asset files are unavailable" }, { status: 404 });
  }
}
