import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // API routes that don't require authentication
  const publicApiRoutes = ["/api/auth/login", "/api/auth/register"]
  const isPublicApiRoute = publicApiRoutes.some((route) => pathname.startsWith(route))

  // If it's a public route or public API route, allow access
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next()
  }

  // For protected routes, check if user is authenticated
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.NEXTAUTH_SECRET!)
    return NextResponse.next()
  } catch (error) {
    // Invalid token
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/auth", request.url))
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}
