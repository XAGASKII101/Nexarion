import { pgTable, text, timestamp, boolean, decimal, jsonb } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import type { z } from "zod"

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Integrations table
export const integrations = pgTable("integrations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  platform: text("platform").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  isActive: boolean("is_active").notNull().default(true),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  type: text("type").notNull(),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Automations table
export const automations = pgTable("automations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(),
  actions: jsonb("actions").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Affiliates table
export const affiliates = pgTable("affiliates", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  referralCode: text("referral_code").notNull().unique(),
  commissionRate: decimal("commission_rate").notNull().default("0.20"),
  totalEarnings: decimal("total_earnings").notNull().default("0"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Payments table
export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// Messages table
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  campaignId: text("campaign_id").references(() => campaigns.id),
  platform: text("platform").notNull(),
  recipient: text("recipient").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull().default("pending"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

// Zod schemas
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
