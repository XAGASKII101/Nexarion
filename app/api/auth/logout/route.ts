import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value

    if (sessionToken) {
      // Delete session from database
      await sql`
        DELETE FROM sessions WHERE session_token = ${sessionToken}
      `
    }

    const response = NextResponse.json({ success: true })

    // Clear the session cookie
    response.cookies.delete("session-token")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
