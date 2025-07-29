import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value

    if (!sessionToken) {
      return NextResponse.json({ user: null })
    }

    // Verify token
    const decoded = jwt.verify(sessionToken, process.env.SESSION_SECRET || "fallback-secret") as {
      userId: string
      email: string
    }

    // Get user from database
    const users = await sql`
      SELECT id, name, email, role, subscription_status, subscription_plan, created_at, updated_at
      FROM users 
      WHERE id = ${decoded.userId} 
      LIMIT 1
    `

    const user = users[0]
    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("User fetch error:", error)
    return NextResponse.json({ user: null })
  }
}
