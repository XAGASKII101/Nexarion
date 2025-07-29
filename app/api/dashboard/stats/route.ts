import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"
import { campaigns, messages, integrations, affiliates } from "@/lib/schema"
import { eq, count } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { userId: string }

    // Get dashboard stats
    const [campaignCount] = await db
      .select({ count: count() })
      .from(campaigns)
      .where(eq(campaigns.userId, decoded.userId))
    const [messageCount] = await db.select({ count: count() }).from(messages).where(eq(messages.userId, decoded.userId))
    const [integrationCount] = await db
      .select({ count: count() })
      .from(integrations)
      .where(eq(integrations.userId, decoded.userId))
    const [affiliateCount] = await db
      .select({ count: count() })
      .from(affiliates)
      .where(eq(affiliates.userId, decoded.userId))

    return NextResponse.json({
      campaigns: campaignCount.count,
      messages: messageCount.count,
      integrations: integrationCount.count,
      affiliates: affiliateCount.count,
    })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
