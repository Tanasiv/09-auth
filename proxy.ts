import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  const isPrivateRoute =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/notes");

 
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      const setCookie = session.headers?.["set-cookie"];

      if (setCookie) {
        const response = NextResponse.next();

        response.headers.set(
          "set-cookie",
          Array.isArray(setCookie)
            ? setCookie.join(", ")
            : String(setCookie)
        );

        return response;
      }
    } catch {
     
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