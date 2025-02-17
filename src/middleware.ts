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
  const loginUrl = new URL("/auth/login", request.url);
  // url.searchParams.append("callback", request.url);

  // const token = request.cookies.get("token");
  // console.log(token);
  // const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(token?.value));

  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" ? true : false,
  });

  let token: string | undefined;
  let _decoded: (JwtPayload & MyJWTPayLoad) | undefined;
  try {
    token = nextAuthToken?.token;
    _decoded = jwtDecode(String(token));
  } catch (error) {
    console.log("MIDDLEWARE", "HIT 4");
    console.log(error);
    return NextResponse.rewrite(loginUrl);
    // return NextResponse.next();
  }

  // Logics
  const notLoginPage = path !== "/auth/login";
  const isTokenInvalid = Date.now() >= Number(_decoded?.exp) * 1000;
  const isUserDeleted = nextAuthToken?.isDeleted;

  // Admin Logics
  const isAdminRoute = path.startsWith("/dashboard/admin");
  const isAdmin = nextAuthToken?.isAdmin;

  // ===================
  // For Testing
  // const LOGICS = {
  //   notLoginPage,
  //   isTokenInvalid,
  //   isUserDeleted,
  //   isAdminRoute,
  //   isAdmin,
  // };

  // console.log("MIDDLEWARE", LOGICS);
  // ===================

  if (isUserDeleted) {
    console.log("MIDDLEWARE", "HIT 1");
    return NextResponse.rewrite(loginUrl);
  }

  if (isAdminRoute && !isAdmin) {
    console.log("MIDDLEWARE", "HIT 2");
    return NextResponse.rewrite(loginUrl);
  }

  if (notLoginPage && isTokenInvalid) {
    console.log("MIDDLEWARE", "HIT 3");
    return NextResponse.rewrite(loginUrl);
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
