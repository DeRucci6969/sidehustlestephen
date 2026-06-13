import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { packs } from "@/data/packs";
import { getMembershipStatus } from "@/lib/membership";
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

export async function GET(_req: Request, { params }: { params: Promise<{ assetId: string }> }) {
  const { assetId } = await params;
  const asset = packs.flatMap((pack) => pack.assets).find((item) => item.id === assetId);

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  const status = await getMembershipStatus();
  if (status !== "active") {
    return NextResponse.json(
      {
        error: "Membership required",
        message: "This asset unlocks after an active membership is linked to your account.",
        asset,
      },
      { status: 402 },
    );
  }

  const manifestEntry = (assetManifest as AssetManifestEntry[]).find((item) => item.id === assetId);
  if (!manifestEntry) {
    return NextResponse.json({ error: "Asset file not found" }, { status: 404 });
  }

  const assetPath = path.join(process.cwd(), "content", "member-assets", manifestEntry.packSlug, manifestEntry.filename);
  const file = await readFile(assetPath);
  return new NextResponse(file, {
    headers: {
      "Content-Type": contentTypes[manifestEntry.type] ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${manifestEntry.filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
