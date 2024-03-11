import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const homeURL = new URL("/", request.url);
  const dashboardURL = new URL("/dashboard", request.url);
  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(homeURL);
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
