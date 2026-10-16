import { NextResponse, type NextRequest } from "next/server";

/** demo.<domain> serves the interactive demo at its root. */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("demo.") && req.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/demo", req.url));
  }
}

export const config = { matcher: "/" };
