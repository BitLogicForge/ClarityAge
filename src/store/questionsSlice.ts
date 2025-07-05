import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
  answers: Record<number, string>;
  checkedQuestions: number[];
  hasBeenChecked: boolean;
}

const initialState: QuestionsState = {
  answers: {},
  checkedQuestions: [],
  hasBeenChecked: false,
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
    },
    checkAnswers: (state) => {
      // Mark all answered questions as checked
      state.checkedQuestions = Object.keys(state.answers).map(Number);
      state.hasBeenChecked = true;
    },
    clearAnswers: (state) => {
      state.answers = {};
      state.checkedQuestions = [];
      state.hasBeenChecked = false;
    },
  },
});

export const { setAnswer, checkAnswers, clearAnswers } = questionsSlice.actions;
export default questionsSlice.reducer;
