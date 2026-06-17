import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CESDState, CESDCategory } from '../types/all.types';
import { REVERSE_SCORED_ITEMS, getCategoryFromScore, getReverseScore } from '../types/all.types';

/**
 * CES-D Assessment State
 * Privacy-focused: NO localStorage persistence
 * All state exists only in memory for the current session
 */
export const initialCESDState: CESDState = {
  answers: {},
  currentQuestion: 0,
  completed: false,
  score: null,
  category: null,
  started: false,
};

/**
 * Calculate CES-D total score and category
 * Implements reverse-scoring for positively worded items (4, 8, 12, 16)
 */
const calculateScoreAndCategory = (answers: Record<number, number>): { score: number; category: CESDCategory } => {
  let total = 0;

  for (let i = 1; i <= 20; i++) {
    const value = answers[i] ?? 0;

    // Reverse scoring for positively worded items
    if (REVERSE_SCORED_ITEMS.includes(i as 4 | 8 | 12 | 16)) {
      total += getReverseScore(value);
    } else {
      total += value;
    }
  }

  const category = getCategoryFromScore(total);

  return { score: total, category };
};

const cesdSlice = createSlice({
  name: 'cesd',
  initialState: initialCESDState,
  reducers: {
    /**
     * Start the assessment after user accepts disclaimer
     */
    startAssessment: (state) => {
      state.started = true;
      state.currentQuestion = 0;
    },

    /**
     * Set answer for a specific question
     */
    setAnswer: (state, action: PayloadAction<{ questionId: number; value: number }>) => {
      const { questionId, value } = action.payload;
      state.answers[questionId] = value;
    },

    /**
     * Move to next question
     */
    nextQuestion: (state) => {
      state.currentQuestion = Math.min(19, state.currentQuestion + 1);
    },

    /**
     * Move to previous question
     */
    previousQuestion: (state) => {
      state.currentQuestion = Math.max(0, state.currentQuestion - 1);
    },

    /**
     * Go to specific question
     */
    goToQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = Math.max(0, Math.min(19, action.payload));
    },

    /**
     * Calculate final score and complete assessment
     */
    calculateAndComplete: (state) => {
      const { score, category } = calculateScoreAndCategory(state.answers);
      state.score = score;
      state.category = category;
      state.completed = true;
    },

    /**
     * Reset assessment to initial state
     */
    reset: () => initialCESDState,

    /**
     * Set started state (for navigating back to disclaimer)
     */
    setStarted: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
  },
});

export const {
  startAssessment,
  setAnswer,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  calculateAndComplete,
  reset,
  setStarted,
} = cesdSlice.actions;

export default cesdSlice.reducer;
