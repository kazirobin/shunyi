import { auth } from "@/lib/auth-edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/admin/login"];
const adminRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { nextUrl } = req;
  const isLoggedIn = !!session;
  const userRole = (session?.user as any)?.role;

  const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => nextUrl.pathname.startsWith(route));

  if (isAdminRoute && !isPublicRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (nextUrl.pathname === "/admin/users" && userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
    }

    if (nextUrl.pathname.startsWith("/admin/payroll") && !["SUPER_ADMIN", "ADMIN", "ACCOUNTS"].includes(userRole)) {
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
    }

    if (nextUrl.pathname.startsWith("/admin/workers") && !["SUPER_ADMIN", "ADMIN", "HR_MANAGER"].includes(userRole)) {
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
    }
  }

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};