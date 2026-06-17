/**
 * CES-D (Center for Epidemiologic Studies Depression Scale) Types
 */

/**
 * CES-D Question Structure
 */
export interface TCESDQuestion {
  id: number;
  text: string; // Translation key for the question text
  isReverseScored: boolean; // Items 4, 8, 12, 16 are reverse-scored
}

/**
 * CES-D State Management
 */
export interface CESDState {
  answers: Record<number, number>; // questionId -> score (0-3)
  currentQuestion: number; // Current question being displayed (0-19)
  completed: boolean; // Whether assessment is completed
  score: number | null; // Calculated total score (0-60)
  category: CESDCategory | null; // Severity category
  started: boolean; // Whether user has accepted disclaimer
}

/**
 * CES-D Severity Categories
 */
export type CESDCategory = 'minimal' | 'mild' | 'moderate' | 'severe';

/**
 * CES-D Response Options (0-3 scale)
 */
export type CESDResponse = 0 | 1 | 2 | 3;

/**
 * CES-D Response Labels
 */
export const CESDResponses = {
  R0: 0, // Rarely or none of the time (less than 1 day)
  R1: 1, // Some or a little of the time (1-2 days)
  R2: 2, // Moderately or much of the time (3-4 days)
  R3: 3, // Most or all of the time (5-7 days)
} as const;

/**
 * CES-D Score Ranges
 */
export const CESDScoreRanges = {
  MINIMAL: { min: 0, max: 15 },
  MILD: { min: 16, max: 20 },
  MODERATE: { min: 21, max: 25 },
  SEVERE: { min: 26, max: 60 },
} as const;

/**
 * Reverse-scored items (positively worded)
 */
export const REVERSE_SCORED_ITEMS = [4, 8, 12, 16] as const;

/**
 * Calculate CES-D category from score
 */
export const getCategoryFromScore = (score: number): CESDCategory => {
  if (score < 16) return 'minimal';
  if (score <= 20) return 'mild';
  if (score <= 25) return 'moderate';
  return 'severe';
};

/**
 * Get reverse score for positively worded items
 */
export const getReverseScore = (value: number): number => {
  return 3 - value;
};
