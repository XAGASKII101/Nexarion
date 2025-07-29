import { 
  users, 
  integrations, 
  campaigns, 
  campaignAnalytics, 
  automations, 
  affiliateTracking, 
  payments, 
  messages,
  type User, 
  type InsertUser,
  type Integration,
  type InsertIntegration,
  type Campaign,
  type InsertCampaign,
  type CampaignAnalytics,
  type Automation,
  type InsertAutomation,
  type AffiliateTracking,
  type Payment,
  type InsertPayment,
  type Message
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: any;
  
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByAffiliateCode(code: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Integration methods
  getUserIntegrations(userId: string): Promise<Integration[]>;
  createIntegration(integration: InsertIntegration): Promise<Integration>;
  updateIntegration(id: string, updates: Partial<Integration>): Promise<Integration | undefined>;
  deleteIntegration(id: string): Promise<boolean>;

  // Campaign methods
  getUserCampaigns(userId: string): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;

  // Campaign Analytics methods
  getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics[]>;
  updateCampaignAnalytics(campaignId: string, analytics: Partial<CampaignAnalytics>): Promise<void>;

  // Automation methods
  getUserAutomations(userId: string): Promise<Automation[]>;
  createAutomation(automation: InsertAutomation): Promise<Automation>;
  updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation | undefined>;

  // Affiliate methods
  getAffiliateStats(userId: string): Promise<any>;
  createAffiliateTracking(tracking: Partial<AffiliateTracking>): Promise<AffiliateTracking>;
  updateAffiliateTracking(id: string, updates: Partial<AffiliateTracking>): Promise<void>;

  // Payment methods
  getUserPayments(userId: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | undefined>;

  // Message methods
  createMessage(message: Partial<Message>): Promise<Message>;
  getCampaignMessages(campaignId: string): Promise<Message[]>;

  // Dashboard stats
  getDashboardStats(userId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByAffiliateCode(code: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.affiliateCode, code));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getUserIntegrations(userId: string): Promise<Integration[]> {
    return await db
      .select()
      .from(integrations)
      .where(eq(integrations.userId, userId));
  }

  async createIntegration(integration: InsertIntegration): Promise<Integration> {
    const [result] = await db
      .insert(integrations)
      .values(integration)
      .returning();
    return result;
  }

  async updateIntegration(id: string, updates: Partial<Integration>): Promise<Integration | undefined> {
    const [result] = await db
      .update(integrations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(integrations.id, id))
      .returning();
    return result || undefined;
  }

  async deleteIntegration(id: string): Promise<boolean> {
    const result = await db
      .delete(integrations)
      .where(eq(integrations.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getUserCampaigns(userId: string): Promise<Campaign[]> {
    return await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.userId, userId))
      .orderBy(desc(campaigns.createdAt));
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    const [campaign] = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, id));
    return campaign || undefined;
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [result] = await db
      .insert(campaigns)
      .values(campaign)
      .returning();
    return result;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const [result] = await db
      .update(campaigns)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(campaigns.id, id))
      .returning();
    return result || undefined;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    const result = await db
      .delete(campaigns)
      .where(eq(campaigns.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics[]> {
    return await db
      .select()
      .from(campaignAnalytics)
      .where(eq(campaignAnalytics.campaignId, campaignId))
      .orderBy(desc(campaignAnalytics.date));
  }

  async updateCampaignAnalytics(campaignId: string, analytics: Partial<CampaignAnalytics>): Promise<void> {
    await db
      .insert(campaignAnalytics)
      .values({ campaignId, ...analytics })
      .onConflictDoUpdate({
        target: [campaignAnalytics.campaignId, campaignAnalytics.date],
        set: analytics,
      });
  }

  async getUserAutomations(userId: string): Promise<Automation[]> {
    return await db
      .select()
      .from(automations)
      .where(eq(automations.userId, userId))
      .orderBy(desc(automations.createdAt));
  }

  async createAutomation(automation: InsertAutomation): Promise<Automation> {
    const [result] = await db
      .insert(automations)
      .values(automation)
      .returning();
    return result;
  }

  async updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation | undefined> {
    const [result] = await db
      .update(automations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(automations.id, id))
      .returning();
    return result || undefined;
  }

  async getAffiliateStats(userId: string): Promise<any> {
    const [stats] = await db
      .select({
        totalEarnings: sql<number>`COALESCE(SUM(${affiliateTracking.commission}), 0)`,
        totalReferrals: sql<number>`COALESCE(SUM(${affiliateTracking.signups}), 0)`,
        totalConversions: sql<number>`COALESCE(SUM(${affiliateTracking.conversions}), 0)`,
        totalClicks: sql<number>`COALESCE(SUM(${affiliateTracking.clicks}), 0)`,
      })
      .from(affiliateTracking)
      .where(eq(affiliateTracking.affiliateId, userId));

    return stats || {
      totalEarnings: 0,
      totalReferrals: 0,
      totalConversions: 0,
      totalClicks: 0,
    };
  }

  async createAffiliateTracking(tracking: Partial<AffiliateTracking>): Promise<AffiliateTracking> {
    const [result] = await db
      .insert(affiliateTracking)
      .values(tracking as any)
      .returning();
    return result;
  }

  async updateAffiliateTracking(id: string, updates: Partial<AffiliateTracking>): Promise<void> {
    await db
      .update(affiliateTracking)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(affiliateTracking.id, id));
  }

  async getUserPayments(userId: string): Promise<Payment[]> {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [result] = await db
      .insert(payments)
      .values(payment)
      .returning();
    return result;
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | undefined> {
    const [result] = await db
      .update(payments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result || undefined;
  }

  async createMessage(message: Partial<Message>): Promise<Message> {
    const [result] = await db
      .insert(messages)
      .values(message as any)
      .returning();
    return result;
  }

  async getCampaignMessages(campaignId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.campaignId, campaignId))
      .orderBy(desc(messages.sentAt));
  }

  async getDashboardStats(userId: string): Promise<any> {
    // Get total messages sent
    const [messageStats] = await db
      .select({
        totalSent: sql<number>`COUNT(*)`,
      })
      .from(messages)
      .innerJoin(campaigns, eq(messages.campaignId, campaigns.id))
      .where(eq(campaigns.userId, userId));

    // Get campaign analytics
    const [analyticsStats] = await db
      .select({
        totalDelivered: sql<number>`COALESCE(SUM(${campaignAnalytics.messagesDelivered}), 0)`,
        totalRead: sql<number>`COALESCE(SUM(${campaignAnalytics.messagesRead}), 0)`,
        totalResponses: sql<number>`COALESCE(SUM(${campaignAnalytics.responses}), 0)`,
        totalConversions: sql<number>`COALESCE(SUM(${campaignAnalytics.conversions}), 0)`,
      })
      .from(campaignAnalytics)
      .innerJoin(campaigns, eq(campaignAnalytics.campaignId, campaigns.id))
      .where(eq(campaigns.userId, userId));

    // Get active automations count
    const [automationStats] = await db
      .select({
        activeAutomations: sql<number>`COUNT(*)`,
      })
      .from(automations)
      .where(and(eq(automations.userId, userId), eq(automations.isActive, true)));

    // Get affiliate earnings
    const affiliateStats = await this.getAffiliateStats(userId);

    const responseRate = messageStats?.totalSent > 0 
      ? ((analyticsStats?.totalResponses || 0) / messageStats.totalSent) * 100 
      : 0;

    return {
      messagesSent: messageStats?.totalSent || 0,
      responseRate: responseRate.toFixed(1),
      affiliateEarnings: affiliateStats.totalEarnings,
      activeAutomations: automationStats?.activeAutomations || 0,
    };
  }
}

export const storage = new DatabaseStorage();
