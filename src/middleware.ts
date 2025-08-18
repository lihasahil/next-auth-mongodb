import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/signup", "/verifyEmail"];
  const token = request.cookies.get("token")?.value || "";

  // If user has token and tries to visit login/signup/verifyEmail → redirect to home
  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user has no token and tries to visit a private route → redirect to login
  const isPrivatePath = !publicPaths.includes(path);
  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyEmail"],
};
