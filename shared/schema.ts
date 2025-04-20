import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  finCredScore: integer("fin_cred_score").default(300),
  level: integer("level").default(1),
  xp: integer("xp").default(0),
  streak: integer("streak").default(0),
  budgetAdherence: integer("budget_adherence").default(0),
  challengeCompletion: integer("challenge_completion").default(0),
  consistency: integer("consistency").default(0),
  savingsRate: integer("savings_rate").default(0),
  lastActivity: timestamp("last_activity").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Badges table
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

// User badges (many-to-many)
export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  badgeId: integer("badge_id").references(() => badges.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Challenges table
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  xpReward: integer("xp_reward").notNull(),
  icon: text("icon").notNull(),
});

// User challenges (many-to-many)
export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  challengeId: integer("challenge_id").references(() => challenges.id),
  status: text("status").notNull(), // 'incomplete', 'complete', 'in-progress'
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  xpReward: integer("xp_reward").notNull(),
  day: text("day").notNull(),
});

// User tasks (many-to-many)
export const userTasks = pgTable("user_tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  taskId: integer("task_id").references(() => tasks.id),
  status: text("status").notNull(), // 'completed', 'current', 'upcoming'
  completedAt: timestamp("completed_at"),
});

// Budget Categories
export const budgetCategories = pgTable("budget_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  isDefault: boolean("is_default").default(false),
});

// User Budget Categories (many-to-many)
export const userBudgetCategories = pgTable("user_budget_categories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  categoryId: integer("category_id").references(() => budgetCategories.id),
  monthlyBudget: integer("monthly_budget").default(0),
  currentSpending: integer("current_spending").default(0),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
});

// Bank Accounts
export const bankAccounts = pgTable("bank_accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  accountName: text("account_name").notNull(),
  accountType: text("account_type").notNull(), // 'checking', 'savings', 'credit'
  balance: integer("balance").default(0),
  masked_number: text("masked_number"), // Last 4 digits only
  isConnected: boolean("is_connected").default(false),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// User Agreements
export const userAgreements = pgTable("user_agreements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  agreementType: text("agreement_type").notNull(), // 'terms', 'privacy', 'bank_sync'
  signedAt: timestamp("signed_at").defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  isActive: boolean("is_active").default(true),
});

// PvP Duels
export const pvpDuels = pgTable("pvp_duels", {
  id: serial("id").primaryKey(),
  challengerId: integer("challenger_id").references(() => users.id),
  challengedId: integer("challenged_id").references(() => users.id),
  challengeType: text("challenge_type").notNull(), // 'savings', 'spending', 'streak'
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  challengerScore: integer("challenger_score").default(0),
  challengedScore: integer("challenged_score").default(0),
  winnerId: integer("winner_id").references(() => users.id),
  xpRewarded: integer("xp_rewarded").default(0),
  status: text("status").default("pending"), // 'pending', 'active', 'completed'
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  finCredScore: true,
  level: true,
  xp: true,
  streak: true,
  createdAt: true,
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({
  id: true,
  unlockedAt: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
});

export const insertUserChallengeSchema = createInsertSchema(userChallenges).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
});

export const insertUserTaskSchema = createInsertSchema(userTasks).omit({
  id: true,
  completedAt: true,
});

export const insertBudgetCategorySchema = createInsertSchema(budgetCategories).omit({
  id: true,
});

export const insertUserBudgetCategorySchema = createInsertSchema(userBudgetCategories).omit({
  id: true,
});

export const insertBankAccountSchema = createInsertSchema(bankAccounts).omit({
  id: true,
  lastUpdated: true,
});

export const insertUserAgreementSchema = createInsertSchema(userAgreements).omit({
  id: true,
  signedAt: true,
});

export const insertPvpDuelSchema = createInsertSchema(pvpDuels).omit({
  id: true,
  startDate: true,
  winnerId: true,
  xpRewarded: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;

export type UserChallenge = typeof userChallenges.$inferSelect;
export type InsertUserChallenge = z.infer<typeof insertUserChallengeSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type UserTask = typeof userTasks.$inferSelect;
export type InsertUserTask = z.infer<typeof insertUserTaskSchema>;

export type BudgetCategory = typeof budgetCategories.$inferSelect;
export type InsertBudgetCategory = z.infer<typeof insertBudgetCategorySchema>;

export type UserBudgetCategory = typeof userBudgetCategories.$inferSelect;
export type InsertUserBudgetCategory = z.infer<typeof insertUserBudgetCategorySchema>;

export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = z.infer<typeof insertBankAccountSchema>;

export type UserAgreement = typeof userAgreements.$inferSelect;
export type InsertUserAgreement = z.infer<typeof insertUserAgreementSchema>;

export type PvpDuel = typeof pvpDuels.$inferSelect;
export type InsertPvpDuel = z.infer<typeof insertPvpDuelSchema>;
