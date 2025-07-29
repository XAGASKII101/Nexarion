import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(sessionToken, process.env.SESSION_SECRET || "fallback-secret") as { userId: string }

    const userId = decoded.userId

    // Get dashboard statistics
    const [campaigns, automations, messages, conversions] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM campaigns WHERE user_id = ${userId}`,
      sql`SELECT COUNT(*) as count FROM automations WHERE user_id = ${userId} AND is_active = true`,
      sql`SELECT COUNT(*) as count FROM messages WHERE user_id = ${userId}`,
      sql`SELECT COUNT(*) as count FROM conversions WHERE user_id = ${userId}`,
    ])

    // Get recent activity
    const recentActivity = await sql`
      SELECT 'campaign' as type, name, created_at FROM campaigns WHERE user_id = ${userId}
      UNION ALL
      SELECT 'automation' as type, name, created_at FROM automations WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 10
    `

    // Get campaign performance data
    const campaignPerformance = await sql`
      SELECT 
        c.name,
        COUNT(m.id) as messages_sent,
        COUNT(conv.id) as conversions
      FROM campaigns c
      LEFT JOIN messages m ON c.id = m.campaign_id
      LEFT JOIN conversions conv ON c.id = conv.campaign_id
      WHERE c.user_id = ${userId}
      GROUP BY c.id, c.name
      ORDER BY messages_sent DESC
      LIMIT 5
    `

    return NextResponse.json({
      stats: {
        totalCampaigns: Number(campaigns[0]?.count || 0),
        activeAutomations: Number(automations[0]?.count || 0),
        totalMessages: Number(messages[0]?.count || 0),
        totalConversions: Number(conversions[0]?.count || 0),
      },
      recentActivity,
      campaignPerformance,
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
