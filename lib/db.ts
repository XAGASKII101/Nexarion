import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const sqlClient = neon(process.env.DATABASE_URL)
export const db = drizzle(sqlClient, { schema })

// Database helper functions
export async function getUser(email: string) {
  const result = await db.query.users.findFirst({
    where: (users) => users.email.eq(email),
  })
  return result || null
}

export async function createUser(name: string, email: string, passwordHash: string) {
  const result = await db
    .insert(schema.users)
    .values({
      name,
      email,
      password_hash: passwordHash,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning()
  return result[0]
}

export async function getUserCampaigns(userId: string) {
  const result = await db.query.campaigns.findMany({
    where: (campaigns) => campaigns.user_id.eq(userId),
    orderBy: (campaigns) => [campaigns.created_at.desc()],
  })
  return result
}

export async function getUserAutomations(userId: string) {
  const result = await db.query.automations.findMany({
    where: (automations) => automations.user_id.eq(userId) && automations.is_active.eq(true),
    orderBy: (automations) => [automations.created_at.desc()],
  })
  return result
}

export async function getUserIntegrations(userId: string) {
  const result = await db.query.integrations.findMany({
    where: (integrations) => integrations.user_id.eq(userId),
    orderBy: (integrations) => [integrations.created_at.desc()],
  })
  return result
}

export async function getDashboardStats(userId: string) {
  const [campaigns, automations, messages, conversions] = await Promise.all([
    db.query.campaigns.count({
      where: (campaigns) => campaigns.user_id.eq(userId),
    }),
    db.query.automations.count({
      where: (automations) => automations.user_id.eq(userId) && automations.is_active.eq(true),
    }),
    db.query.messages.count({
      where: (messages) => messages.user_id.eq(userId),
    }),
    db.query.conversions.count({
      where: (conversions) => conversions.user_id.eq(userId),
    }),
  ])

  return {
    totalCampaigns: Number(campaigns),
    activeAutomations: Number(automations),
    totalMessages: Number(messages),
    totalConversions: Number(conversions),
  }
}
