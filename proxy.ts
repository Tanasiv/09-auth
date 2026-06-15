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

  if (accessToken) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 2. Refresh flow
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      const setCookie = session?.headers?.["set-cookie"];

      if (setCookie) {
        const response = NextResponse.next();

        response.headers.set(
          "set-cookie",
          Array.isArray(setCookie)
            ? setCookie.join(",")
            : setCookie
        );

        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        return response;
      }
    } catch {
      // fallthrough → treat as unauthenticated
    }
  }

  // 3. No auth → block private routes
  if (isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}