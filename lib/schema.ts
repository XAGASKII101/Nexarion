import { pgTable, text, timestamp, integer, boolean, decimal, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import type { z } from "zod"

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Integrations table
export const integrations = pgTable("integrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  platform: text("platform").notNull(), // 'whatsapp', 'instagram', 'email'
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  isActive: boolean("is_active").notNull().default(true),
  settings: text("settings"), // JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"), // 'draft', 'active', 'paused', 'completed'
  platform: text("platform").notNull(),
  targetAudience: text("target_audience"), // JSON string
  budget: decimal("budget", { precision: 10, scale: 2 }),
  spent: decimal("spent", { precision: 10, scale: 2 }).default("0"),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Automations table
export const automations = pgTable("automations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  trigger: text("trigger").notNull(), // JSON string
  actions: text("actions").notNull(), // JSON string
  isActive: boolean("is_active").notNull().default(true),
  executionCount: integer("execution_count").default(0),
  lastExecuted: timestamp("last_executed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Affiliates table
export const affiliates = pgTable("affiliates", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  affiliateCode: text("affiliate_code").notNull().unique(),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).notNull().default("20.00"),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default("0"),
  totalReferrals: integer("total_referrals").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Payments table
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  affiliateId: uuid("affiliate_id").references(() => affiliates.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  paymentMethod: text("payment_method"),
  transactionId: text("transaction_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Messages table
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  platform: text("platform").notNull(),
  recipient: text("recipient").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'sent', 'delivered', 'failed'
  sentAt: timestamp("sent_at"),
  deliveredAt: timestamp("delivered_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const insertIntegrationSchema = createInsertSchema(integrations)
export const selectIntegrationSchema = createSelectSchema(integrations)
export const insertCampaignSchema = createInsertSchema(campaigns)
export const selectCampaignSchema = createSelectSchema(campaigns)
export const insertAutomationSchema = createInsertSchema(automations)
export const selectAutomationSchema = createSelectSchema(automations)
export const insertAffiliateSchema = createInsertSchema(affiliates)
export const selectAffiliateSchema = createSelectSchema(affiliates)
export const insertPaymentSchema = createInsertSchema(payments)
export const selectPaymentSchema = createSelectSchema(payments)
export const insertMessageSchema = createInsertSchema(messages)
export const selectMessageSchema = createSelectSchema(messages)

// Types
export type User = z.infer<typeof selectUserSchema>
export type NewUser = z.infer<typeof insertUserSchema>
export type Integration = z.infer<typeof selectIntegrationSchema>
export type NewIntegration = z.infer<typeof insertIntegrationSchema>
export type Campaign = z.infer<typeof selectCampaignSchema>
export type NewCampaign = z.infer<typeof insertCampaignSchema>
export type Automation = z.infer<typeof selectAutomationSchema>
export type NewAutomation = z.infer<typeof insertAutomationSchema>
export type Affiliate = z.infer<typeof selectAffiliateSchema>
export type NewAffiliate = z.infer<typeof insertAffiliateSchema>
export type Payment = z.infer<typeof selectPaymentSchema>
export type NewPayment = z.infer<typeof insertPaymentSchema>
export type Message = z.infer<typeof selectMessageSchema>
export type NewMessage = z.infer<typeof insertMessageSchema>
