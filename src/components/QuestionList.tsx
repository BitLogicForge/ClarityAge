import { Stack } from "@mui/material";
import { questions } from "../config/base";
import { useAppSelector } from "../store/hooks";
import Question from "./Question";

export default function QuestionList() {
  const { appState } = useAppSelector((state) => state.questions);

  // Hide questions when questionnaire is completed
  if (appState === "completed") {
    return null;
  }

  return (
    <Stack
      direction={{ xs: "column" }}
      spacing={{ xs: 2, sm: 3 }}
      sx={{ mt: { xs: 2, sm: 4 } }}
    >
      {questions.map((question) => (
        <Question key={question.title} {...question} />
      ))}
    </Stack>
  );
}
