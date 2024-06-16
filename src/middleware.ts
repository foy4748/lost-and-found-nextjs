import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const path = request.nextUrl.pathname;
  try {
    const decoded = jwtDecode(String(token?.value));
    if (path !== "/auth/login" && Date.now() >= Number(decoded.exp) * 1000) {
      console.log("HIT", decoded);
      return NextResponse.rewrite(new URL("/auth/login", request.url), {
        status: 303,
      });
    }
  } catch (error) {
    return NextResponse.rewrite(new URL("/auth/login", request.url), {
      status: 303,
    });
  }
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
