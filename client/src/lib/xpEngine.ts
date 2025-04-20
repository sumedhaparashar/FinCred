/**
 * XP Engine for Fincread
 * Handles calculations for experience points based on financial activities
 */

export interface XPCalculationParams {
  baseXP: number;             // Base XP for the activity
  difficulty: number;         // 1-3 scale (easy, medium, hard)
  streak: number;             // Current user streak
  penalties?: number;         // Penalties for missed activities
  savingsBonus?: number;      // Bonus for savings activities
  budgetBonus?: number;       // Bonus for staying on budget
  consistencyBonus?: number;  // Bonus for consistent financial habits
}

/**
 * Calculate XP based on the formula: XP = BaseXP × Difficulty × Streak - Penalty + Bonuses
 */
export function calculateXP(params: XPCalculationParams): number {
  const {
    baseXP,
    difficulty,
    streak,
    penalties = 0,
    savingsBonus = 0,
    budgetBonus = 0,
    consistencyBonus = 0,
  } = params;

  // Calculate core XP
  const coreXP = baseXP * difficulty * (1 + streak * 0.1);
  
  // Apply penalties and bonuses
  const totalXP = Math.max(
    0,
    coreXP - penalties + savingsBonus + budgetBonus + consistencyBonus
  );
  
  // Round to nearest integer
  return Math.round(totalXP);
}

/**
 * Calculate FinCred Score based on user's financial activities and consistency
 * 
 * @param params Parameters for score calculation
 * @returns A score between 300-850
 */
export interface FinCredScoreParams {
  budgetAdherence: number;     // 0-1 scale (percentage of budget targets met)
  challengeCompletion: number; // 0-1 scale (percentage of challenges completed)
  consistency: number;         // 0-1 scale (login and activity consistency)
  savingsRate: number;         // 0-1 scale (savings as percentage of income)
  xpLevel: number;             // Current XP level
}

export function calculateFinCredScore(params: FinCredScoreParams): number {
  const { 
    budgetAdherence, 
    challengeCompletion, 
    consistency, 
    savingsRate,
    xpLevel
  } = params;
  
  // Base score starts at 300
  const baseScore = 300;
  
  // Each factor contributes to the final score
  const budgetScore = budgetAdherence * 150;
  const challengeScore = challengeCompletion * 150;
  const consistencyScore = consistency * 100;
  const savingsScore = savingsRate * 100;
  const xpLevelBonus = Math.min(xpLevel * 5, 50); // Cap at 50 points
  
  // Calculate total score (capped at 850)
  const totalScore = Math.min(
    850,
    baseScore + budgetScore + challengeScore + consistencyScore + savingsScore + xpLevelBonus
  );
  
  return Math.round(totalScore);
}

/**
 * Calculate XP level based on total XP
 * Uses a progressive scaling formula
 */
export function calculateLevel(totalXP: number): number {
  // Each level requires 20% more XP than the previous
  // Level 1: 0 XP
  // Level 2: 100 XP
  // Level 3: 220 XP (100 + 100*1.2)
  // and so on...
  
  if (totalXP < 100) return 1;
  
  let xpThreshold = 100;
  let level = 2;
  let remainingXP = totalXP;
  
  while (remainingXP >= xpThreshold) {
    remainingXP -= xpThreshold;
    xpThreshold = Math.floor(xpThreshold * 1.2);
    level++;
  }
  
  return level;
}

/**
 * Calculate XP progress towards next level
 */
export function calculateXPProgress(totalXP: number): { 
  currentLevel: number; 
  nextLevelXP: number; 
  progress: number;
  currentLevelXP: number;
} {
  const currentLevel = calculateLevel(totalXP);
  
  // Calculate the XP threshold for the current level
  let xpThreshold = 100;
  let accumulatedXP = 0;
  
  for (let i = 2; i < currentLevel; i++) {
    accumulatedXP += xpThreshold;
    xpThreshold = Math.floor(xpThreshold * 1.2);
  }
  
  const currentLevelXP = accumulatedXP;
  const nextLevelXP = accumulatedXP + xpThreshold;
  const progress = (totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP);
  
  return {
    currentLevel,
    nextLevelXP: xpThreshold,
    progress,
    currentLevelXP: totalXP - currentLevelXP
  };
}