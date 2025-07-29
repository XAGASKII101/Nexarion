import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { loginSchema } from "@/lib/schema"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Get user from database
    const users = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `

    const user = users[0]
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SESSION_SECRET || "fallback-secret", {
      expiresIn: "7d",
    })

    // Create session in database
    await sql`
      INSERT INTO sessions (user_id, session_token, expires)
      VALUES (${user.id}, ${token}, ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
    `

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = user

    const response = NextResponse.json({
      user: userWithoutPassword,
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
