import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"
import { campaigns, messages, affiliates } from "@/lib/schema"
import { eq, count, sum } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any
    const userId = decoded.userId

    // Get dashboard stats
    const [campaignStats, messageStats, affiliateStats, totalSpent] = await Promise.all([
      db.select({ count: count() }).from(campaigns).where(eq(campaigns.userId, userId)),
      db.select({ count: count() }).from(messages).where(eq(messages.userId, userId)),
      db.select({ count: count() }).from(affiliates).where(eq(affiliates.userId, userId)),
      db
        .select({ total: sum(campaigns.spent) })
        .from(campaigns)
        .where(eq(campaigns.userId, userId)),
    ])

    return NextResponse.json({
      totalCampaigns: campaignStats[0]?.count || 0,
      totalMessages: messageStats[0]?.count || 0,
      totalAffiliates: affiliateStats[0]?.count || 0,
      totalSpent: totalSpent[0]?.total || 0,
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
