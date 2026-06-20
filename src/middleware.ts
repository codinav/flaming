import { NextResponse, type NextRequest } from "next/server";

// Protect the admin panel with HTTP Basic Auth when credentials are configured.
// Set ADMIN_USER and ADMIN_PASSWORD in production. If unset (e.g. local dev),
// access is allowed so you can work without a login flow.
export const config = { matcher: ["/admin/:path*"] };

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      const u = decoded.slice(0, sep);
      const p = decoded.slice(sep + 1);
      if (u === user && p === pass) return NextResponse.next();
    } catch {
      // fall through to challenge
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Flaming Admin", charset="UTF-8"' },
  });
}
