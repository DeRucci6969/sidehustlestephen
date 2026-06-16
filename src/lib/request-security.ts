import { NextResponse } from "next/server";

function getRequestOrigin(req: Request) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  return host ? `${proto}://${host}` : null;
}

function getConfiguredOrigin() {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (!configured) return null;

  try {
    return new URL(configured).origin;
  } catch {
    return null;
  }
}

export function rejectCrossOriginRequest(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return null;

  const allowedOrigins = new Set([getConfiguredOrigin(), getRequestOrigin(req)].filter(Boolean));

  if (allowedOrigins.has(origin)) return null;

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export function safeAttachmentFilename(filename: string) {
  return filename.replace(/[\r\n"]/g, "").replace(/[\\/]/g, "-").trim() || "download";
}
