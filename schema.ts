import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users: any = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "user", "affiliate"] }).default("user").notNull(),
  plan: text("plan", { enum: ["starter", "pro", "business"] }).default("starter").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  affiliateCode: text("affiliate_code").unique(),
  referredBy: varchar("referred_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Integrations table
export const integrations = pgTable("integrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  platform: text("platform", { enum: ["whatsapp", "instagram", "email"] }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  credentials: jsonb("credentials").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  platform: text("platform", { enum: ["whatsapp", "instagram", "email", "all"] }).notNull(),
  status: text("status", { enum: ["draft", "active", "paused", "completed"] }).default("draft").notNull(),
  triggerType: text("trigger_type", { enum: ["keyword", "scheduled", "webhook"] }).notNull(),
  triggerConfig: jsonb("trigger_config").notNull(),
  messageTemplate: jsonb("message_template").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Campaign Analytics table
export const campaignAnalytics = pgTable("campaign_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => campaigns.id).notNull(),
  messagesSent: integer("messages_sent").default(0).notNull(),
  messagesDelivered: integer("messages_delivered").default(0).notNull(),
  messagesRead: integer("messages_read").default(0).notNull(),
  responses: integer("responses").default(0).notNull(),
  conversions: integer("conversions").default(0).notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

// Automations table
export const automations = pgTable("automations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  flowConfig: jsonb("flow_config").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Affiliate Tracking table
export const affiliateTracking = pgTable("affiliate_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").references(() => users.id).notNull(),
  referredUserId: varchar("referred_user_id").references(() => users.id),
  clicks: integer("clicks").default(0).notNull(),
  signups: integer("signups").default(0).notNull(),
  conversions: integer("conversions").default(0).notNull(),
  commission: decimal("commission", { precision: 10, scale: 2 }).default("0.00").notNull(),
  status: text("status", { enum: ["pending", "paid", "cancelled"] }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payments table
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency", { enum: ["USD", "NGN"] }).notNull(),
  status: text("status", { enum: ["pending", "completed", "failed", "refunded"] }).notNull(),
  gateway: text("gateway", { enum: ["paystack", "flutterwave"] }).notNull(),
  gatewayReference: text("gateway_reference"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  platform: text("platform", { enum: ["whatsapp", "instagram", "email"] }).notNull(),
  recipientId: text("recipient_id").notNull(),
  content: jsonb("content").notNull(),
  status: text("status", { enum: ["sent", "delivered", "read", "failed"] }).notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  referrer: one(users, {
    fields: [users.referredBy],
    references: [users.id],
  }),
  integrations: many(integrations),
  campaigns: many(campaigns),
  automations: many(automations),
  affiliateTracking: many(affiliateTracking),
  payments: many(payments),
}));

export const integrationsRelations = relations(integrations, ({ one }) => ({
  user: one(users, {
    fields: [integrations.userId],
    references: [users.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id],
  }),
  analytics: many(campaignAnalytics),
  messages: many(messages),
}));

export const campaignAnalyticsRelations = relations(campaignAnalytics, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [campaignAnalytics.campaignId],
    references: [campaigns.id],
  }),
}));

export const automationsRelations = relations(automations, ({ one }) => ({
  user: one(users, {
    fields: [automations.userId],
    references: [users.id],
  }),
}));

export const affiliateTrackingRelations = relations(affiliateTracking, ({ one }) => ({
  affiliate: one(users, {
    fields: [affiliateTracking.affiliateId],
    references: [users.id],
  }),
  referredUser: one(users, {
    fields: [affiliateTracking.referredUserId],
    references: [users.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [messages.campaignId],
    references: [campaigns.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  affiliateCode: true,
});

export const insertIntegrationSchema = createInsertSchema(integrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAutomationSchema = createInsertSchema(automations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type CampaignAnalytics = typeof campaignAnalytics.$inferSelect;
export type Automation = typeof automations.$inferSelect;
export type InsertAutomation = z.infer<typeof insertAutomationSchema>;
export type AffiliateTracking = typeof affiliateTracking.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Message = typeof messages.$inferSelect;
