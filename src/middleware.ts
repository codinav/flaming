import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, getSessionToken, isAuthConfigured } from "@/lib/auth";

// Gate the admin panel behind a session cookie set by the /admin/login page.
// If credentials aren't configured (local dev without env), access is allowed.
export const config = { matcher: ["/admin", "/admin/:path*"] };

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page itself must stay public to avoid a redirect loop.
  if (pathname === "/admin/login") return NextResponse.next();
  if (!isAuthConfigured()) return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await getSessionToken();
  if (cookie && cookie === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}
