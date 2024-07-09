import { JwtPayload, jwtDecode } from "jwt-decode";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import toast from "react-hot-toast";
export type MyJWTPayLoad = {
  isAdmin: boolean;
  isDeleted: boolean;
  email: string;
  id: string;
};
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const url = new URL("/auth/login", request.url);
  url.searchParams.append("callback", request.url);

  try {
    const token = request.cookies.get("token");
    const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(token?.value));
    // Logics
    const notLoginPage = path !== "/auth/login";
    const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;

    // Admin Logics
    const isAdminRoute = path.includes("/dashboard/admin");
    const isAdmin = decoded?.isAdmin;
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(url);
    }

    if (notLoginPage && isTokenInvalid) {
      return NextResponse.redirect(url);
    }
  } catch (error) {
    return NextResponse.redirect(url);
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/report-lost-item", "/report-found-item"],
};
