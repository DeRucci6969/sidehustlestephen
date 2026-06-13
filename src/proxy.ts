import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "sidehustlestephen.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.sidehustlestephen.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
