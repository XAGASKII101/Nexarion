import { pgTable, text, timestamp, boolean, integer, decimal, jsonb, uuid, varchar, index } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

// Users table
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    role: varchar("role", { length: 20 }).default("user").notNull(),
    affiliateCode: varchar("affiliate_code", { length: 20 }).unique(),
    referredBy: uuid("referred_by").references(() => users.id),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    affiliateCodeIdx: index("users_affiliate_code_idx").on(table.affiliateCode),
  }),
)

// Integrations table
export const integrations = pgTable(
  "integrations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    platform: varchar("platform", { length: 50 }).notNull(), // whatsapp, instagram, email, stripe
    name: varchar("name", { length: 100 }).notNull(),
    credentials: jsonb("credentials").notNull(), // encrypted credentials
    isActive: boolean("is_active").default(true).notNull(),
    lastSync: timestamp("last_sync"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("integrations_user_id_idx").on(table.userId),
    platformIdx: index("integrations_platform_idx").on(table.platform),
  }),
)

// Campaigns table
export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    type: varchar("type", { length: 50 }).notNull(), // email, whatsapp, instagram
    status: varchar("status", { length: 20 }).default("draft").notNull(), // draft, active, paused, completed
    targetAudience: jsonb("target_audience"), // audience criteria
    content: jsonb("content").notNull(), // message content, templates
    schedule: jsonb("schedule"), // scheduling information
    settings: jsonb("settings"), // campaign settings
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("campaigns_user_id_idx").on(table.userId),
    statusIdx: index("campaigns_status_idx").on(table.status),
  }),
)

// Campaign Analytics table
export const campaignAnalytics = pgTable(
  "campaign_analytics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    campaignId: uuid("campaign_id")
      .references(() => campaigns.id, { onDelete: "cascade" })
      .notNull(),
    date: timestamp("date").defaultNow().notNull(),
    messagesSent: integer("messages_sent").default(0).notNull(),
    messagesDelivered: integer("messages_delivered").default(0).notNull(),
    messagesRead: integer("messages_read").default(0).notNull(),
    responses: integer("responses").default(0).notNull(),
    conversions: integer("conversions").default(0).notNull(),
    revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0.00"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    campaignIdIdx: index("campaign_analytics_campaign_id_idx").on(table.campaignId),
    dateIdx: index("campaign_analytics_date_idx").on(table.date),
  }),
)

// Automations table
export const automations = pgTable(
  "automations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    trigger: jsonb("trigger").notNull(), // trigger conditions
    actions: jsonb("actions").notNull(), // automation actions
    isActive: boolean("is_active").default(true).notNull(),
    lastRun: timestamp("last_run"),
    runCount: integer("run_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("automations_user_id_idx").on(table.userId),
    isActiveIdx: index("automations_is_active_idx").on(table.isActive),
  }),
)

// Affiliate Tracking table
export const affiliateTracking = pgTable(
  "affiliate_tracking",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    affiliateId: uuid("affiliate_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    referredUserId: uuid("referred_user_id").references(() => users.id, { onDelete: "cascade" }),
    clicks: integer("clicks").default(0).notNull(),
    signups: integer("signups").default(0).notNull(),
    conversions: integer("conversions").default(0).notNull(),
    commission: decimal("commission", { precision: 10, scale: 2 }).default("0.00"),
    status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, approved, paid
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    affiliateIdIdx: index("affiliate_tracking_affiliate_id_idx").on(table.affiliateId),
    referredUserIdIdx: index("affiliate_tracking_referred_user_id_idx").on(table.referredUserId),
  }),
)

// Payments table
export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: varchar("type", { length: 50 }).notNull(), // subscription, affiliate_payout, one_time
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("USD").notNull(),
    status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, completed, failed, refunded
    paymentMethod: varchar("payment_method", { length: 50 }),
    transactionId: varchar("transaction_id", { length: 100 }),
    metadata: jsonb("metadata"), // additional payment data
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("payments_user_id_idx").on(table.userId),
    statusIdx: index("payments_status_idx").on(table.status),
    transactionIdIdx: index("payments_transaction_id_idx").on(table.transactionId),
  }),
)

// Messages table
export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
    automationId: uuid("automation_id").references(() => automations.id, { onDelete: "cascade" }),
    platform: varchar("platform", { length: 50 }).notNull(), // whatsapp, instagram, email
    recipient: varchar("recipient", { length: 255 }).notNull(),
    content: jsonb("content").notNull(),
    status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, sent, delivered, read, failed
    sentAt: timestamp("sent_at"),
    deliveredAt: timestamp("delivered_at"),
    readAt: timestamp("read_at"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    campaignIdIdx: index("messages_campaign_id_idx").on(table.campaignId),
    automationIdIdx: index("messages_automation_id_idx").on(table.automationId),
    platformIdx: index("messages_platform_idx").on(table.platform),
    statusIdx: index("messages_status_idx").on(table.status),
  }),
)

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const insertIntegrationSchema = createInsertSchema(integrations)
export const selectIntegrationSchema = createSelectSchema(integrations)
export const insertCampaignSchema = createInsertSchema(campaigns)
export const selectCampaignSchema = createSelectSchema(campaigns)
export const insertAutomationSchema = createInsertSchema(automations)
export const selectAutomationSchema = createSelectSchema(automations)
export const insertPaymentSchema = createInsertSchema(payments)
export const selectPaymentSchema = createSelectSchema(payments)

// User schemas
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["user", "admin"]).default("user"),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Campaign schemas
export const campaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["email", "whatsapp", "instagram"]),
  status: z.enum(["draft", "active", "paused", "completed"]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Automation schemas
export const automationSchema = z.object({
  id: z.string(),
  name: z.string(),
  trigger: z.string(),
  actions: z.array(
    z.object({
      type: z.string(),
      config: z.record(z.any()),
    }),
  ),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Integration schemas
export const integrationSchema = z.object({
  id: z.string(),
  platform: z.enum(["whatsapp", "instagram", "email", "stripe"]),
  status: z.enum(["connected", "disconnected", "error"]),
  config: z.record(z.any()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Export types
export type User = z.infer<typeof userSchema>
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type Campaign = z.infer<typeof campaignSchema>
export type Automation = z.infer<typeof automationSchema>
export type Integration = z.infer<typeof integrationSchema>
