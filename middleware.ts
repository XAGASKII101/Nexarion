import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = ["/", "/auth", "/api/auth/login", "/api/auth/register"]

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for session token
  const sessionToken = request.cookies.get("session-token")?.value

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  try {
    // Verify the token
    jwt.verify(sessionToken, process.env.SESSION_SECRET || "fallback-secret")
    return NextResponse.next()
  } catch (error) {
    // Invalid token, redirect to auth
    const response = NextResponse.redirect(new URL("/auth", request.url))
    response.cookies.delete("session-token")
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
