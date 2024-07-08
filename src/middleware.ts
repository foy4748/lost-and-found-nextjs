import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const path = request.nextUrl.pathname;
  const url = new URL("/auth/login", request.url);
  url.searchParams.append("callback", request.url);
  try {
    const decoded = jwtDecode(String(token?.value));
    if (path !== "/auth/login" && Date.now() >= Number(decoded.exp) * 1000) {
      return NextResponse.redirect(url);
    }
  } catch (error) {
    return NextResponse.redirect(url);
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/report-lost-item", "/report-found-item"],
};
