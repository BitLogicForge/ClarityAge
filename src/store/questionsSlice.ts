import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { questions } from "../config/base";

export const APPSTATE = {
  IDLE: "idle",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  ERROR: "error",
};

export type AppState = (typeof APPSTATE)[keyof typeof APPSTATE];

interface QuestionsState {
  answers: Record<number, string>;
  checkedQuestions: number[];
  hasBeenChecked: boolean;
  appState: AppState;
  expandedQuestion: number | null;
}

const initialState: QuestionsState = {
  answers: {},
  checkedQuestions: [],
  hasBeenChecked: false,
  appState: APPSTATE.IDLE,
  expandedQuestion: 1, // Start with first question expanded
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ questionId: number; value: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.value;
      // Update app state to in-progress when first answer is given
      if (state.appState === APPSTATE.IDLE) {
        state.appState = APPSTATE.IN_PROGRESS;
      }

      // Auto-expand next unanswered question
      const currentQuestionId = action.payload.questionId;
      const answeredQuestions = Object.keys(state.answers).map(Number);

      // Find next unanswered question
      const nextUnansweredQuestion = questions
        .map((q) => q.id)
        .find(
          (id) => !answeredQuestions.includes(id) && id !== currentQuestionId
        );

      state.expandedQuestion = nextUnansweredQuestion || null;
    },
    checkAnswers: (state) => {
      // Mark all answered questions as checked
      state.checkedQuestions = Object.keys(state.answers).map(Number);
      state.hasBeenChecked = true;
      state.appState = APPSTATE.COMPLETED;
    },
    clearAnswers: (state) => {
      state.answers = {};
      state.checkedQuestions = [];
      state.hasBeenChecked = false;
      state.appState = APPSTATE.IDLE;
      state.expandedQuestion = 1; // Reset to first question
    },
    setError: (state) => {
      state.appState = APPSTATE.ERROR;
    },
    resetToInProgress: (state) => {
      state.hasBeenChecked = false;
      state.appState = APPSTATE.IN_PROGRESS;
    },
    setExpandedQuestion: (state, action: PayloadAction<number | null>) => {
      state.expandedQuestion = action.payload;
    },
  },
});

export const {
  setAnswer,
  checkAnswers,
  clearAnswers,
  setError,
  resetToInProgress,
  setExpandedQuestion,
} = questionsSlice.actions;
export default questionsSlice.reducer;
