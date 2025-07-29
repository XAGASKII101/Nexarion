import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { registerSchema } from "@/lib/schema"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const users = await sql`
      INSERT INTO users (name, email, password_hash, role, created_at, updated_at)
      VALUES (${name}, ${email}, ${passwordHash}, 'user', NOW(), NOW())
      RETURNING id, name, email, role, created_at, updated_at
    `

    const user = users[0]

    // Create session token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SESSION_SECRET || "fallback-secret", {
      expiresIn: "7d",
    })

    // Create session in database
    await sql`
      INSERT INTO sessions (user_id, session_token, expires)
      VALUES (${user.id}, ${token}, ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
    `

    // Create affiliate record for new user
    const referralCode = `REF${user.id.slice(0, 8).toUpperCase()}`
    await sql`
      INSERT INTO affiliates (user_id, referral_code, commission_rate, status)
      VALUES (${user.id}, ${referralCode}, 20.00, 'active')
    `

    const response = NextResponse.json({
      user,
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
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
