import { Stack } from "@mui/material";
import { questions } from "../config/base";
import Question from "./Question";

export default function QuestionList() {
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
