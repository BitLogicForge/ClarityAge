import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AppState = "idle" | "in-progress" | "completed" | "error";

interface QuestionsState {
  answers: Record<number, string>;
  checkedQuestions: number[];
  hasBeenChecked: boolean;
  appState: AppState;
}

const initialState: QuestionsState = {
  answers: {},
  checkedQuestions: [],
  hasBeenChecked: false,
  appState: "idle",
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
      if (state.appState === "idle") {
        state.appState = "in-progress";
      }
    },
    checkAnswers: (state) => {
      // Mark all answered questions as checked
      state.checkedQuestions = Object.keys(state.answers).map(Number);
      state.hasBeenChecked = true;
      state.appState = "completed";
    },
    clearAnswers: (state) => {
      state.answers = {};
      state.checkedQuestions = [];
      state.hasBeenChecked = false;
      state.appState = "idle";
    },
    setError: (state) => {
      state.appState = "error";
    },
    resetToInProgress: (state) => {
      state.hasBeenChecked = false;
      state.appState = "in-progress";
    },
  },
});

export const {
  setAnswer,
  checkAnswers,
  clearAnswers,
  setError,
  resetToInProgress,
} = questionsSlice.actions;
export default questionsSlice.reducer;
