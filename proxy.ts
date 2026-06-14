import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  const isAuthRoute =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  const isPrivateRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/notes");

  // 🔄 refresh flow
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      const response = NextResponse.next();

      if (session) {
        return response;
      }
    } catch {
      // ignore
    }
  }

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if ((accessToken || refreshToken) && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}