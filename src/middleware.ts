import { JwtPayload, jwtDecode } from "jwt-decode";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//import toast from "react-hot-toast";
export type MyJWTPayLoad = {
  isAdmin: boolean;
  isDeleted: boolean;
  email: string;
  id: string;
};
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Checking Request Object
  // ----------------------------
  const path = request.nextUrl.pathname;
  const url = new URL("/auth/login", request.url);
  url.searchParams.append("callback", request.url);

  try {
    // const token = request.cookies.get("token");
    // console.log(token);
    // const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(token?.value));

    const nextAuthToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production" ? true : false,
    });

    const token = nextAuthToken?.token;
    const _decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(token));

    // Logics
    const notLoginPage = path !== "/auth/login";
    const isTokenInvalid = Date.now() >= Number(_decoded.exp) * 1000;
    const isUserDeleted = nextAuthToken?.isDeleted;

    // Admin Logics
    const isAdminRoute = path.includes("/dashboard/admin");
    const isAdmin = nextAuthToken?.isAdmin;

    if (isUserDeleted) {
      url.searchParams.append("isDeleted", "1");
      return NextResponse.redirect(url);
    }

    if (isAdminRoute && !isAdmin) {
      url.searchParams.append("isAdmin", "0");
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
  matcher: [
    "/lost-items/:path*",
    "/dashboard/:path*",
    "/report-lost-item",
    "/report-found-item",
  ],
};
