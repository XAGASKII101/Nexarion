import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth"]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Protected routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }

    try {
      jwt.verify(token, process.env.NEXTAUTH_SECRET!)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}
