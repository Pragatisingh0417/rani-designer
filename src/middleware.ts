import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const admin = req.cookies.get("admin");

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // ✅ Allow login page
  if (req.nextUrl.pathname === "/admin-login") {
    return NextResponse.next();
  }

  // ✅ Protect admin routes
  if (isAdminRoute && !admin) {
    return NextResponse.redirect(
      new URL("/admin-login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};