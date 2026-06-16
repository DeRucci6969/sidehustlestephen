import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://api.stripe.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "frame-src https://js.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : []),
].join("; ");

const scannerPathPatterns = [
  /^\/wp(?:-|\/|$)/i,
  /^\/xmlrpc\.php$/i,
  /^\/(?:phpmyadmin|pma|mysqladmin)(?:\/|$)/i,
  /^\/(?:\.env|\.git|\.svn|vendor\/|composer\.(?:json|lock))(?:\/|$)/i,
  /\.(?:php|asp|aspx|jsp)$/i,
];

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

function isScannerPath(pathname: string) {
  return scannerPathPatterns.some((pattern) => pattern.test(pathname));
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "sidehustlestephen.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.sidehustlestephen.com";
    return withSecurityHeaders(NextResponse.redirect(url, 308));
  }

  if (isScannerPath(request.nextUrl.pathname)) {
    console.warn(JSON.stringify({ level: "warn", msg: "scanner_path_blocked", path: request.nextUrl.pathname }));
    return withSecurityHeaders(
      new NextResponse("Not found", {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      }),
    );
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: "/:path*",
};
