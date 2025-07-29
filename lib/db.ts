import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database helper functions
export async function getUser(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `
  return result[0] || null
}

export async function createUser(name: string, email: string, passwordHash: string) {
  const result = await sql`
    INSERT INTO users (name, email, password_hash, role, created_at, updated_at)
    VALUES (${name}, ${email}, ${passwordHash}, 'user', NOW(), NOW())
    RETURNING *
  `
  return result[0]
}

export async function getUserCampaigns(userId: string) {
  const result = await sql`
    SELECT * FROM campaigns WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
  return result
}

export async function getUserAutomations(userId: string) {
  const result = await sql`
    SELECT * FROM automations WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
  return result
}

export async function getUserIntegrations(userId: string) {
  const result = await sql`
    SELECT * FROM integrations WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
  return result
}

export async function getDashboardStats(userId: string) {
  const [campaigns, automations, messages, conversions] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM campaigns WHERE user_id = ${userId}`,
    sql`SELECT COUNT(*) as count FROM automations WHERE user_id = ${userId} AND is_active = true`,
    sql`SELECT COUNT(*) as count FROM messages WHERE user_id = ${userId}`,
    sql`SELECT COUNT(*) as count FROM conversions WHERE user_id = ${userId}`,
  ])

  return {
    totalCampaigns: Number(campaigns[0]?.count || 0),
    activeAutomations: Number(automations[0]?.count || 0),
    totalMessages: Number(messages[0]?.count || 0),
    totalConversions: Number(conversions[0]?.count || 0),
  }
}
