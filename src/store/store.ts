import { configureStore } from "@reduxjs/toolkit";
import questionsReducer, {
  initialQuestionsState,
  type QuestionsState,
} from "./questionsSlice";

const STORAGE_KEY = "clarityage:questions";

const isAppState = (value: unknown): value is QuestionsState["appState"] =>
  ["idle", "in-progress", "completed", "error"].includes(String(value));

const loadQuestionsState = (): QuestionsState | undefined => {
  try {
    if (typeof window === "undefined") {
      return undefined;
    }

    const savedState = window.localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      return undefined;
    }

    const parsed = JSON.parse(savedState) as Partial<QuestionsState>;

    return {
      ...initialQuestionsState,
      answers:
        parsed.answers && typeof parsed.answers === "object"
          ? parsed.answers
          : initialQuestionsState.answers,
      checkedQuestions: Array.isArray(parsed.checkedQuestions)
        ? parsed.checkedQuestions
        : initialQuestionsState.checkedQuestions,
      hasBeenChecked:
        typeof parsed.hasBeenChecked === "boolean"
          ? parsed.hasBeenChecked
          : initialQuestionsState.hasBeenChecked,
      appState: isAppState(parsed.appState)
        ? parsed.appState
        : initialQuestionsState.appState,
      expandedQuestion:
        typeof parsed.expandedQuestion === "number" ||
        parsed.expandedQuestion === null
          ? parsed.expandedQuestion
          : initialQuestionsState.expandedQuestion,
    };
  } catch {
    return undefined;
  }
};

const preloadedQuestionsState = loadQuestionsState();

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
  ...(preloadedQuestionsState
    ? { preloadedState: { questions: preloadedQuestionsState } }
    : {}),
});

store.subscribe(() => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().questions)
    );
  } catch {
    // Ignore storage failures; the in-memory questionnaire still works.
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
